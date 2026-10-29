import { ArrowLeft, Compass } from 'lucide-react'
import { Link } from 'react-router-dom'
export default function NotFound() {
  return <div className="mx-auto flex max-w-3xl flex-col items-center px-5 py-24 text-center"><div className="grid h-16 w-16 place-items-center rounded-3xl bg-violet-50 text-brand"><Compass size={28}/></div><p className="eyebrow mt-7">404 · Lost in the codebase</p><h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight">This page took a wrong turn.</h1><p className="mt-4 max-w-md text-sm leading-6 text-muted">The page you’re looking for doesn’t exist or may have moved. Let’s get you back to familiar ground.</p><Link to="/" className="btn-primary mt-7"><ArrowLeft size={15}/> Back to overview</Link></div>
}
