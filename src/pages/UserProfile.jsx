import { toBritishEnglish } from '../utils/britishEnglish'
import { ukArticles } from '../data/ukArticles'
import { ArrowLeft, ArrowUpRight, Building2, CalendarDays, Globe2, Mail, MapPin, Phone, Terminal, MessageCircle } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getUser, getUserPosts } from '../services/postService'
import AlertBanner from '../components/AlertBanner'
import { UserCardSkeleton } from '../components/SkeletonLoader'

export default function UserProfile() {
  const { id } = useParams()
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState(ukArticles)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const loadProfile = useCallback(async () => {
    setLoading(true); setError('')
    try {
      const [u] = await Promise.all([getUser(id), getUserPosts(id)])
      setUser(u.data)
      // JSONPlaceholder post bodies are lorem-ipsum-like demo data, not real articles.
      // Show curated, meaningful British-English editorial content instead.
      setPosts(ukArticles)
    } catch { setError('This profile could not be loaded. It may not exist, or the service may be temporarily unavailable.') }
    finally { setLoading(false) }
  }, [id])
  useEffect(() => { loadProfile() }, [loadProfile])
  if (loading) return <div className="mx-auto max-w-7xl px-5 py-10"><div className="mb-5 h-4 w-28 animate-pulse rounded bg-slate-200"/><div className="surface animate-pulse rounded-3xl p-8"><div className="h-20 w-20 rounded-3xl bg-slate-100"/><div className="mt-5 h-5 w-48 rounded bg-slate-100"/><div className="mt-3 h-3 w-72 max-w-full rounded bg-slate-100"/></div><div className="mt-6 grid gap-4 sm:grid-cols-2">{[1,2].map(n=><UserCardSkeleton key={n}/>)}</div></div>
  if (error || !user) return <div className="mx-auto max-w-3xl px-5 py-14"><Link to="/users" className="mb-6 inline-flex items-center gap-2 text-xs font-bold text-muted"><ArrowLeft size={15}/> Back to directory</Link><AlertBanner title="Profile unavailable" message={error || 'The requested developer was not found.'} onRetry={loadProfile}/></div>
  const initials = user.name.split(' ').map(s=>s[0]).slice(0,2).join('').toUpperCase()
  return <div className="mx-auto max-w-7xl px-5 pb-16 pt-10">
    <Link to="/users" className="inline-flex items-center gap-2 text-xs font-extrabold text-muted transition hover:text-brand"><ArrowLeft size={15}/> All developers</Link>
    <section className="surface relative mt-5 overflow-hidden rounded-[28px] p-6 sm:p-9"><div className="absolute right-0 top-0 h-44 w-44 rounded-full bg-violet-100/60 blur-3xl"/><div className="relative flex flex-col gap-6 sm:flex-row sm:items-center"><div className="avatar h-24 w-24 rounded-[27px] text-2xl">{initials}</div><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><span className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-extrabold text-emerald-700">● Active member</span><span className="rounded-full bg-violet-50 px-3 py-1 text-[10px] font-extrabold text-violet-700">Developer #{user.id}</span></div><h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight">{user.name}</h1><p className="mt-1 text-sm text-muted">@{user.username} <span className="mx-1.5">·</span> {user.company?.catchPhrase || 'Building thoughtful software'}</p></div><a className="btn-secondary self-start sm:self-center" href={`https://${user.website}`} target="_blank" rel="noreferrer">Portfolio <ArrowUpRight size={15}/></a></div>
      <div className="mt-8 grid gap-3 border-t border-slate-100 pt-6 sm:grid-cols-2 lg:grid-cols-4"><div className="flex gap-3 rounded-2xl bg-[#fafaff] p-4"><Building2 size={17} className="mt-0.5 text-brand"/><div className="min-w-0"><p className="text-[10px] font-bold text-muted">COMPANY</p><p className="mt-1 truncate text-xs font-extrabold">{user.company?.name}</p></div></div><div className="flex gap-3 rounded-2xl bg-[#fafaff] p-4"><Mail size={17} className="mt-0.5 text-brand"/><div className="min-w-0"><p className="text-[10px] font-bold text-muted">EMAIL</p><p className="mt-1 break-all text-xs font-extrabold">{user.email}</p></div></div><div className="flex gap-3 rounded-2xl bg-[#fafaff] p-4"><MapPin size={17} className="mt-0.5 text-brand"/><div><p className="text-[10px] font-bold text-muted">LOCATION</p><p className="mt-1 text-xs font-extrabold">{user.address?.city}</p></div></div><div className="flex gap-3 rounded-2xl bg-[#fafaff] p-4"><Phone size={17} className="mt-0.5 text-brand"/><div><p className="text-[10px] font-bold text-muted">PHONE</p><p className="mt-1 text-xs font-extrabold">{user.phone?.split(' ')[0]}</p></div></div></div>
      <div className="mt-4 flex items-start gap-3 rounded-2xl border border-violet-100 bg-violet-50/60 p-4"><Terminal size={17} className="mt-0.5 text-brand"/><div><p className="text-xs font-extrabold">Team focus</p><p className="mt-1 text-xs leading-5 text-muted">{user.company?.bs || 'Collaborating on scalable, user-focused engineering.'} — {user.company?.catchPhrase || 'Building better software together.'}</p></div></div>
      <div className="mt-5 rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-4 sm:p-5">
        <div><p className="eyebrow">Connect & communicate</p><h2 className="mt-1 font-display text-lg font-extrabold">Connect with {user.name.split(' ')[0]}</h2><p className="mt-1 text-xs leading-5 text-muted">Reach out to discuss collaboration, projects, or shared engineering interests.</p></div>
        <div className="mt-4 flex flex-wrap gap-2.5">
          <a className="btn-primary" href={`mailto:${user.email}?subject=${encodeURIComponent(`Connection request for ${user.name}`)}&body=${encodeURIComponent(`Hi ${user.name},\n\nI found your profile on DevDirectory and would like to connect.\n\nRegards`)}`}><MessageCircle size={15}/> Message</a>
          <a className="btn-secondary" href={`tel:${(user.phone || '').split(' ')[0].replace(/[^+\d]/g, '')}`}><Phone size={15}/> Call</a>
          <a className="btn-secondary" href={`mailto:${user.email}`}><Mail size={15}/> Email</a>
        </div>
        <p className="mt-3 text-[10px] leading-4 text-muted">Message and Email open your default email app; Call opens your device’s calling app. Contact details come from demo directory data.</p>
      </div>
    </section>
    <div className="mt-10 flex items-end justify-between gap-3"><div><p className="eyebrow">Knowledge library</p><h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight">Developer articles<span className="text-brand">.</span></h2><p className="mt-2 text-xs text-muted">A curated knowledge library · written in British English</p></div><div className="rounded-xl bg-white px-3 py-2 text-xs font-extrabold text-muted shadow-card">{posts.length} articles</div></div>
    {posts.length ? <div className="mt-5 grid gap-4 md:grid-cols-2">{posts.map((post,i)=><article key={post.id} className="surface article-card animate-slide-up rounded-2xl p-5 sm:p-6" style={{animationDelay:`${i*55}ms`}}><div className="flex items-center justify-between gap-3"><span className="rounded-lg bg-sky-100/80 px-2.5 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-[#315f91]">{post.category || 'Engineering practice'}</span><span className="flex shrink-0 items-center gap-1.5 text-[10px] text-muted"><CalendarDays size={12}/> {post.readingTime || `${String(i+1).padStart(2,'0')} min read`}</span></div><h3 className="mt-4 font-display text-base font-extrabold leading-6">{toBritishEnglish(post.title)}</h3><p className="mt-3 text-xs leading-6 text-muted">{toBritishEnglish(post.body)}</p><div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4"><span className="text-[10px] font-semibold text-muted">Knowledge Library</span><span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-brand">Read article <ArrowUpRight size={13}/></span></div></article>)}</div> : <div className="surface mt-5 rounded-2xl p-8 text-center text-sm text-muted">No writeups found for this developer yet.</div>}
  </div>
}
