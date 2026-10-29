import { useEffect, useState } from 'react'
import { ArrowLeft, BriefcaseBusiness, Check, Edit3, ExternalLink, Github, Linkedin, Save, UserRound, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const PROFILE_PREFIX = 'devdirectory-profile-'
const makeProfile = user => ({
  name: user?.name || '',
  headline: user?.role === 'admin' ? 'DevDirectory Administrator' : 'Developer',
  bio: '', skills: '', education: '', github: '', linkedin: '', portfolio: ''
})

export default function MyProfile() {
  const { user } = useAuth()
  const [form, setForm] = useState(() => makeProfile(user))
  const [saved, setSaved] = useState(false)
  const [editing, setEditing] = useState(false)
  const [notice, setNotice] = useState('')

  useEffect(() => {
    const defaults = makeProfile(user)
    try {
      const stored = JSON.parse(localStorage.getItem(PROFILE_PREFIX + user?.id) || 'null')
      setForm(stored ? { ...defaults, ...stored, name: stored.name || defaults.name } : defaults)
    } catch { setForm(defaults) }
    setEditing(false)
  }, [user?.id, user?.name, user?.role])

  const update = e => { setForm(current => ({ ...current, [e.target.name]: e.target.value })); setSaved(false); setNotice('') }
  const submit = e => {
    e.preventDefault()
    localStorage.setItem(PROFILE_PREFIX + user.id, JSON.stringify(form))
    setSaved(true)
    setEditing(false)
    setNotice('Your profile changes have been saved on this browser.')
  }
  const cancelEdit = () => {
    try {
      const stored = JSON.parse(localStorage.getItem(PROFILE_PREFIX + user?.id) || 'null')
      setForm({ ...makeProfile(user), ...(stored || {}) })
    } catch { setForm(makeProfile(user)) }
    setEditing(false)
    setSaved(false)
  }
  const displayName = form.name || user?.name || 'Developer'
  const initials = displayName.trim().split(/\s+/).map(part => part[0]).slice(0, 2).join('').toUpperCase()
  const skills = (form.skills || '').split(',').map(s => s.trim()).filter(Boolean)

  return <div className="mx-auto max-w-5xl px-5 pb-16 pt-10 profile-page">
    <Link to="/workspace" className="inline-flex items-center gap-2 text-xs font-extrabold text-muted transition hover:text-brand"><ArrowLeft size={14}/> Back to workspace</Link>
    <section className="surface profile-shell mt-5 overflow-hidden rounded-[28px]">
      <div className="profile-cover profile-cover-view">
        <div className="avatar h-20 w-20 rounded-3xl border-4 border-white/70 text-2xl"><UserRound size={30}/></div>
        <div className="min-w-0 flex-1"><p className="eyebrow">MY DEVELOPER ID</p><h1>{displayName}</h1><p>{user?.email || 'No email available'}</p><span className="role-chip">{user?.role === 'admin' ? 'Administrator' : 'Developer'}</span></div>
        {!editing && <button type="button" className="btn-primary profile-edit-trigger" onClick={() => { setEditing(true); setNotice('') }}><Edit3 size={15}/> Edit profile</button>}
      </div>
      {notice && <div className="profile-notice animate-slide-up"><Check size={15}/>{notice}</div>}

      {!editing ? <div key="profile-view" className="profile-view-panel animate-slide-up p-6 sm:p-9">
        <div className="mb-7"><p className="eyebrow">PROFILE OVERVIEW</p><h2 className="mt-1 font-display text-2xl font-extrabold">{form.headline || 'Developer'}</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-muted">{form.bio || 'Add a short introduction to tell classmates and collaborators what you build, what you are learning and what you would like to work on.'}</p></div>
        <div className="profile-detail-grid">
          <div className="profile-detail-card"><span>Skills & technologies</span><div className="profile-skill-list">{skills.length ? skills.map(skill => <span key={skill}>{skill}</span>) : <p className="text-sm text-muted">No skills added yet.</p>}</div></div>
          <div className="profile-detail-card"><span>Education</span><p>{form.education || 'Add your course or qualification.'}</p></div>
        </div>
        <div className="mt-5"><p className="eyebrow">PROFESSIONAL LINKS</p><div className="profile-link-list">
          {form.github && <a href={form.github} target="_blank" rel="noreferrer"><Github size={17}/> GitHub <ExternalLink size={13}/></a>}
          {form.linkedin && <a href={form.linkedin} target="_blank" rel="noreferrer"><Linkedin size={17}/> LinkedIn <ExternalLink size={13}/></a>}
          {form.portfolio && <a href={form.portfolio} target="_blank" rel="noreferrer"><BriefcaseBusiness size={17}/> Portfolio <ExternalLink size={13}/></a>}
          {!form.github && !form.linkedin && !form.portfolio && <p className="text-sm text-muted">No professional links added yet.</p>}
        </div></div>
        <div className="mt-8 flex flex-wrap items-center gap-3"><button className="btn-primary" onClick={() => setEditing(true)}><Edit3 size={15}/> Edit profile</button>{saved && <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-700"><Check size={15}/> Saved</span>}</div>
      </div> : <form key="profile-edit" onSubmit={submit} className="profile-edit-panel animate-slide-in p-6 sm:p-9">
        <div className="mb-6 flex flex-wrap items-start justify-between gap-3"><div><p className="eyebrow">PROFILE SETTINGS</p><h2 className="mt-1 font-display text-2xl font-extrabold">Edit your professional profile</h2><p className="mt-2 text-sm text-muted">Changes are stored in this browser for this demo account.</p></div><button type="button" className="btn-secondary" onClick={cancelEdit}><X size={15}/> Cancel</button></div>
        <div className="form-grid"><label className="field-block"><span>Display name</span><input className="input-base" name="name" value={form.name} onChange={update} required minLength="2"/></label><label className="field-block"><span>Professional headline</span><input className="input-base" name="headline" value={form.headline} onChange={update} placeholder="Frontend developer"/></label><label className="field-block"><span>Skills (comma separated)</span><input className="input-base" name="skills" value={form.skills} onChange={update} placeholder="React, JavaScript, SQL"/></label><label className="field-block"><span>Education</span><input className="input-base" name="education" value={form.education} onChange={update} placeholder="Degree / institution"/></label><label className="field-block"><span>GitHub URL</span><input className="input-base" type="url" name="github" value={form.github} onChange={update} placeholder="https://github.com/username"/></label><label className="field-block"><span>LinkedIn URL</span><input className="input-base" type="url" name="linkedin" value={form.linkedin} onChange={update} placeholder="https://linkedin.com/in/username"/></label><label className="field-block"><span>Portfolio URL</span><input className="input-base" type="url" name="portfolio" value={form.portfolio} onChange={update} placeholder="https://your-portfolio.example"/></label></div>
        <label className="field-block mt-4"><span>About you</span><textarea className="input-base" name="bio" rows="4" value={form.bio} onChange={update} placeholder="What do you build, what are you learning, and what would you like to work on?"/></label>
        <div className="mt-6 flex flex-wrap items-center gap-3"><button type="submit" className="btn-primary"><Save size={15}/> Save changes</button><button type="button" className="btn-secondary" onClick={cancelEdit}>Cancel</button>{saved && <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-700"><Check size={15}/> Profile saved</span>}</div>
      </form>}
    </section>
    <section className="mt-5 grid gap-4 sm:grid-cols-3">{[[BriefcaseBusiness,'Projects','Manage projects and milestones.','/workspace'],[Github,'GitHub','Show your public repositories.','/workspace'],[Linkedin,'Professional network','Add your professional links.','/workspace']].map(([Icon,title,desc,href])=><Link key={title} to={href} className="surface profile-shortcut rounded-2xl p-5"><Icon size={19} className="text-brand"/><h3 className="mt-3 font-extrabold">{title}</h3><p className="mt-1 text-xs leading-5 text-muted">{desc}</p></Link>)}</section>
  </div>
}
