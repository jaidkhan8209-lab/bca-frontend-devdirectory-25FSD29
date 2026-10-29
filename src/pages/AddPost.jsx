import { ArrowLeft, ArrowRight, CheckCircle2, FilePlus2, Info, Send, Sparkles } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import AlertBanner from '../components/AlertBanner'
import SkeletonLoader from '../components/SkeletonLoader'
import { useAuth } from '../context/AuthContext'
import { createPost, getUsers } from '../services/postService'

const initialForm = { userId: '', title: '', body: '' }
export default function AddPost() {
  const { user: sessionUser } = useAuth()
  const [form, setForm] = useState(initialForm)
  const [users, setUsers] = useState([])
  const [usersLoading, setUsersLoading] = useState(true)
  const [usersError, setUsersError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [alert, setAlert] = useState(null)
  const [fieldTouched, setFieldTouched] = useState({})
  const titleLength = form.title.trim().length
  const bodyLength = form.body.trim().length
  const errors = useMemo(() => ({
    userId: form.userId ? '' : 'Choose an author.',
    title: titleLength < 5 ? 'Title must be at least 5 characters.' : titleLength > 80 ? 'Title must be no more than 80 characters.' : '',
    body: bodyLength < 20 ? 'Body must be at least 20 characters.' : bodyLength > 500 ? 'Body must be no more than 500 characters.' : '',
  }), [form.userId, titleLength, bodyLength])
  const valid = Object.values(errors).every(e => !e)
  const checklist = [
    { label: 'Choose an author', done: Boolean(form.userId) },
    { label: 'Write a title (5–80 characters)', done: titleLength >= 5 && titleLength <= 80 },
    { label: 'Write article content (20–500 characters)', done: bodyLength >= 20 && bodyLength <= 500 },
  ]
  const loadUsers = useCallback(async () => {
    setUsersLoading(true); setUsersError('')
    try { const { data } = await getUsers(); setUsers(data) }
    catch { setUsersError('Unable to load the author list. Retry to continue publishing.') }
    finally { setUsersLoading(false) }
  }, [])
  useEffect(() => { loadUsers() }, [loadUsers])
  const update = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  const submit = async e => {
    e.preventDefault()
    setFieldTouched({userId:true,title:true,body:true})
    if (!valid || submitting) return
    setSubmitting(true); setAlert(null)
    try {
      const payload = { title: form.title.trim(), body: form.body.trim(), userId: Number(form.userId) }
      const response = await createPost(payload)
      if (response.status === 201) {
        setAlert({ type: 'success', title: 'Your update is published!', message: 'The API accepted your article (201 Created). JSONPlaceholder simulates storage, so this post is not permanently saved on its server.' })
        setForm(initialForm)
        setFieldTouched({})
      } else setAlert({ type: 'error', title: 'Unexpected response', message: 'The service did not confirm creation. Please try again.' })
    } catch { setAlert({ type: 'error', title: 'Publishing failed', message: 'The post could not be sent. Check your connection and try again.' }) }
    finally { setSubmitting(false) }
  }
  return <div className="mx-auto max-w-7xl px-5 pb-16 pt-10">
    <Link to="/users" className="inline-flex items-center gap-2 text-xs font-extrabold text-muted hover:text-brand"><ArrowLeft size={14}/> Back to directory</Link>
    <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,1fr)_310px]">
      <section className="surface animate-float-in rounded-[28px] p-6 sm:p-9"><div className="flex items-start gap-4"><div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-violet-50 text-brand"><FilePlus2 size={22}/></div><div><p className="eyebrow">Knowledge is a team sport</p><h1 className="mt-2 font-display text-2xl font-extrabold tracking-tight sm:text-3xl">Publish a team update<span className="text-brand">.</span></h1><p className="mt-2 max-w-xl text-xs leading-6 text-muted">Share a technical note, a project insight, or something the team should know.</p></div></div>
      {alert && <div className="mt-6"><AlertBanner type={alert.type} title={alert.title} message={alert.message} onDismiss={()=>setAlert(null)}/></div>}
      {usersError && <div className="mt-6"><AlertBanner title="Author list unavailable" message={usersError} onRetry={loadUsers} onDismiss={()=>setUsersError('')}/></div>}
      {usersLoading ? <div className="mt-7"><SkeletonLoader count={2}/></div> : <form onSubmit={submit} className="mt-8 space-y-6">
        <div><div className="mb-2 flex items-center justify-between"><label htmlFor="userId" className="text-xs font-extrabold text-[#454a62]">Author <span className="text-rose-500">*</span></label><span className="text-[10px] text-muted">Who is publishing?</span></div><select id="userId" name="userId" className="input-base" value={form.userId} onChange={update} onBlur={()=>setFieldTouched(t=>({...t,userId:true}))} required><option value="">Select an author</option>{users.map(u=><option key={u.id} value={u.id}>{u.name} — {u.company?.name}</option>)}</select>{fieldTouched.userId && errors.userId && <p className="mt-1.5 text-[11px] font-semibold text-rose-600">{errors.userId}</p>}</div>
        <div><div className="mb-2 flex items-center justify-between"><label htmlFor="title" className="text-xs font-extrabold text-[#454a62]">Article title <span className="text-rose-500">*</span></label><span className={`text-[10px] font-bold ${titleLength>80?'text-rose-600':'text-muted'}`}>{titleLength}/80</span></div><input id="title" name="title" className="input-base" value={form.title} onChange={update} onBlur={()=>setFieldTouched(t=>({...t,title:true}))} minLength={5} maxLength={80} placeholder="e.g. Lessons from improving our component system" required/>{fieldTouched.title && errors.title && <p className="mt-1.5 text-[11px] font-semibold text-rose-600">{errors.title}</p>}</div>
        <div><div className="mb-2 flex items-center justify-between"><label htmlFor="body" className="text-xs font-extrabold text-[#454a62]">Article content <span className="text-rose-500">*</span></label><span className={`text-[10px] font-bold ${bodyLength>500?'text-rose-600':'text-muted'}`}>{bodyLength}/500</span></div><textarea id="body" name="body" rows={7} className="input-base resize-y !leading-6" value={form.body} onChange={update} onBlur={()=>setFieldTouched(t=>({...t,body:true}))} minLength={20} maxLength={500} placeholder="Write a useful update for your teammates in UK English. What did you learn, build, or discover?" required/>{fieldTouched.body && errors.body && <p className="mt-1.5 text-[11px] font-semibold text-rose-600">{errors.body}</p>}<p className="mt-2 text-[10px] leading-5 text-muted">Keep it clear and useful. Your article must contain between 20 and 500 characters.</p></div>
        <div className="flex flex-col-reverse justify-between gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center"><p className="flex items-center gap-2 text-[10px] text-muted"><ShieldCheckIcon/> Publishing as <span className="font-extrabold text-ink">{sessionUser?.name || 'Team lead'}</span></p><button type="submit" disabled={!valid || submitting || usersLoading || Boolean(usersError)} className="btn-primary">{submitting ? <><span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"/> Publishing...</> : <>Publish update <Send size={15}/></>}</button></div>
      </form>}
      </section>
      <aside className="space-y-4"><div className="rounded-[24px] bg-[#211d49] p-6 text-white"><div className="flex items-center gap-2 text-violet-300"><Sparkles size={16}/><span className="text-[10px] font-extrabold tracking-[.15em]">WRITING TIP</span></div><h3 className="mt-4 font-display text-lg font-extrabold">Make knowledge travel.</h3><p className="mt-2 text-xs leading-6 text-white/60">The best team updates explain what has changed, why it matters, and how someone else can use that knowledge. Use clear British English.</p><div className="mt-5 space-y-3">{['Lead with the outcome','Add enough context','Make the next step clear'].map((t,i)=><div key={t} className="flex items-center gap-3 text-xs font-semibold"><span className="grid h-6 w-6 place-items-center rounded-lg bg-white/10 text-[10px] text-violet-200">0{i+1}</span>{t}</div>)}</div></div>
      <div className="surface rounded-[22px] p-5"><div className="flex items-center gap-2"><Info size={16} className="text-brand"/><h3 className="text-xs font-extrabold">Before you publish</h3></div><ul className="mt-4 space-y-3 text-[11px] leading-5 text-muted">{checklist.map((item, index) => <li key={item.label} className="flex items-center gap-2"><span className={`grid h-4 w-4 shrink-0 place-items-center rounded-full border ${item.done ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-slate-300 bg-transparent text-transparent'}`}>{item.done ? <CheckCircle2 size={12}/> : <span className="h-1.5 w-1.5 rounded-full bg-transparent"/>}</span><span className={item.done ? 'font-semibold text-ink' : ''}>{item.label}</span></li>)}<li className="mt-2 border-t border-slate-100 pt-3 text-[10px]">{checklist.filter(item=>item.done).length} of {checklist.length} publishing checks complete</li></ul></div>
      </aside>
    </div>
  </div>
}
function ShieldCheckIcon() { return <CheckCircle2 size={13} className="text-emerald-500"/> }
