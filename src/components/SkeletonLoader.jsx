export function UserCardSkeleton() {
  return <div className="surface animate-pulse rounded-3xl p-5"><div className="flex items-center gap-3"><div className="h-14 w-14 rounded-2xl bg-slate-100"/><div className="flex-1 space-y-2"><div className="h-3 w-2/3 rounded bg-slate-100"/><div className="h-2.5 w-1/2 rounded bg-slate-100"/></div></div><div className="mt-6 h-3 w-full rounded bg-slate-100"/><div className="mt-3 h-3 w-4/5 rounded bg-slate-100"/><div className="mt-6 h-9 rounded-xl bg-slate-100"/></div>
}
export default function SkeletonLoader({ count = 6 }) {
  return <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{Array.from({ length: count }, (_, i) => <UserCardSkeleton key={i}/>)}</div>
}
