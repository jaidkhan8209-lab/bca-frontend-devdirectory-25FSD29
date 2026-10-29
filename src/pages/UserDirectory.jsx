import { Search, SlidersHorizontal, Users, X } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { getUsers } from '../services/postService'
import UserCard from '../components/UserCard'
import SkeletonLoader from '../components/SkeletonLoader'
import AlertBanner from '../components/AlertBanner'
import useDebounce from '../hooks/useDebounce'

export default function UserDirectory() {
  const [users, setUsers] = useState([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const debouncedQuery = useDebounce(query, 220)

  const loadUsers = useCallback(async () => {
    setLoading(true); setError('')
    try { const { data } = await getUsers(); setUsers(data) }
    catch { setError('We could not reach the developer service. Check your connection and try again.') }
    finally { setLoading(false) }
  }, [])
  useEffect(() => { loadUsers() }, [loadUsers])

  const normalized = debouncedQuery.trim().toLowerCase()
  const filtered = users.filter(user => `${user.name} ${user.company?.name || ''}`.toLowerCase().includes(normalized))
  return (
    <div className="mx-auto max-w-7xl px-5 pb-16 pt-10 sm:pt-14">
      <div className="animate-float-in"><div className="eyebrow">The people behind the product</div><div className="mt-3 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">Developer directory<span className="text-brand">.</span></h1><p className="mt-3 max-w-xl text-sm leading-6 text-muted">Find teammates by name or company, then dive into their profile and latest technical writeups.</p></div><div className="flex items-center gap-2 rounded-2xl border border-[#e7e8f2] bg-white px-4 py-3"><div className="grid h-9 w-9 place-items-center rounded-xl bg-violet-50 text-brand"><Users size={17}/></div><div><p className="font-display text-lg font-extrabold">{loading ? '—' : filtered.length.toString().padStart(2,'0')}</p><p className="text-[10px] font-semibold text-muted">Matching developers</p></div></div></div></div>
      <div className="surface mt-8 rounded-2xl p-3 sm:p-4"><div className="flex flex-col gap-3 sm:flex-row"><div className="relative flex-1"><Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#979bb0]"/><input aria-label="Search developers by name or company" className="input-base !border-transparent !bg-[#f8f8fc] pl-11 pr-10" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search by name or company, e.g. Leanne..."/>{query && <button aria-label="Clear search" onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted hover:bg-white"><X size={15}/></button>}</div><div className="flex items-center justify-center gap-2 rounded-xl bg-[#f8f8fc] px-4 py-3 text-xs font-bold text-muted"><SlidersHorizontal size={15}/> Live search <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"/></div></div></div>
      {error && <div className="mt-5"><AlertBanner title="Directory unavailable" message={error} onRetry={loadUsers} onDismiss={() => setError('')}/></div>}
      <div className="mt-6">{loading ? <SkeletonLoader/> : filtered.length ? <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{filtered.map((user,i) => <UserCard key={user.id} user={user} index={i}/>)}</div> : <div className="surface rounded-3xl px-6 py-16 text-center"><div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-violet-50 text-brand"><Search size={22}/></div><h3 className="mt-4 font-display text-lg font-extrabold">No developers found</h3><p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted">Try a different name or company. The best collaborations start with a little curiosity.</p><button onClick={() => setQuery('')} className="btn-secondary mt-5">Clear search</button></div>}</div>
      <p className="mt-6 text-center text-[11px] text-muted">Showing live directory data from JSONPlaceholder · Search matches names and company names</p>
    </div>
  )
}
