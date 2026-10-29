import { ArrowUpRight, Building2, Globe2, MapPin, Mail, MessageCircle, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'

const gradients = ['from-violet-100 to-indigo-100 text-violet-700','from-sky-100 to-cyan-100 text-sky-700','from-rose-100 to-orange-100 text-rose-700','from-emerald-100 to-teal-100 text-emerald-700','from-amber-100 to-yellow-100 text-amber-700']
export default function UserCard({ user, index = 0 }) {
  const initials = user.name?.split(' ').map(s => s[0]).slice(0,2).join('').toUpperCase()
  const phone = (user.phone || '').split(' ')[0].replace(/[^+\d]/g, '')
  const messageSubject = encodeURIComponent(`Connection request for ${user.name}`)
  const messageBody = encodeURIComponent(`Hi ${user.name},\n\nI found your profile on DevDirectory and would like to connect.\n\nRegards`)
  return (
    <article className="surface group animate-float-in rounded-[22px] p-5 transition duration-300 hover:-translate-y-1 hover:shadow-soft" style={{ animationDelay: `${Math.min(index * 55, 330)}ms` }}>
      <div className="flex items-start justify-between">
        <div className={`avatar h-[58px] w-[58px] rounded-[19px] bg-gradient-to-br ${gradients[index % gradients.length]} text-lg`}>{initials}</div>
        <span className="rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-1 text-[10px] font-extrabold text-emerald-700"><span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500"/>Available</span>
      </div>
      <div className="mt-5"><h3 className="font-display text-[16px] font-extrabold tracking-tight">{user.name}</h3><p className="mt-1 text-xs text-muted">@{user.username?.toLowerCase()}</p></div>
      <div className="mt-5 space-y-2.5 border-t border-slate-100 pt-4 text-xs text-muted">
        <p className="flex items-center gap-2"><Building2 size={14} className="text-brand"/><span className="truncate">{user.company?.name || 'Independent'}</span></p>
        <p className="flex items-center gap-2"><MapPin size={14} className="text-brand"/><span className="truncate">{user.address?.city || 'Remote'}</span></p>
        <p className="flex items-center gap-2"><Globe2 size={14} className="text-brand"/><span className="truncate">{user.website || 'Portfolio pending'}</span></p>
      </div>
      <Link to={`/users/${user.id}`} className="mt-5 flex w-full items-center justify-between rounded-xl bg-[#f7f7fc] px-4 py-3 text-xs font-extrabold text-[#5d53cb] transition group-hover:bg-lavender">View profile <ArrowUpRight size={15}/></Link>
      <div className="mt-2 grid grid-cols-3 gap-2">
        <a href={`mailto:${user.email}?subject=${messageSubject}&body=${messageBody}`} className="btn-secondary !justify-center !gap-1.5 !px-2 !py-2.5 text-[11px]" aria-label={`Message ${user.name}`}><MessageCircle size={14}/> Message</a>
        <a href={`tel:${phone}`} className={`btn-secondary !justify-center !gap-1.5 !px-2 !py-2.5 text-[11px] ${!phone ? 'pointer-events-none opacity-40' : ''}`} aria-label={`Call ${user.name}`}><Phone size={14}/> Call</a>
        <a href={`mailto:${user.email}`} className="btn-secondary !justify-center !gap-1.5 !px-2 !py-2.5 text-[11px]" aria-label={`Email ${user.name}`}><Mail size={14}/> Email</a>
      </div>
    </article>
  )
}
