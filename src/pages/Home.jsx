import { ArrowRight, ArrowUpRight, BookOpen, CheckCircle2, Code2, FileText, Github, LayoutDashboard, Search, ShieldCheck, Sparkles, Target, Users, Zap, BriefcaseBusiness, Bell } from 'lucide-react'
import { Link } from 'react-router-dom'
const features = [
  { icon: BriefcaseBusiness, title: 'Project control center', body: 'Track project status, deadlines, technologies, milestones and progress in one place.' },
  { icon: Target, title: 'Developer journey', body: 'Set measurable learning goals and record your DSA practice over time.' },
  { icon: Users, title: 'Find collaborators', body: 'Discover developers and match teammates by skills and project needs.' },
  { icon: Github, title: 'GitHub showcase', body: 'Bring public repositories into your developer profile and highlight your work.' },
  { icon: FileText, title: 'Portfolio & resume', body: 'Turn profile details and completed projects into a professional showcase.' },
  { icon: Bell, title: 'Stay on track', body: 'Keep tasks, deadlines and project updates visible through in-app notifications.' },
]
export default function Home() {
  return <div className="mx-auto max-w-7xl px-5 pb-16 pt-8 sm:pt-12">
    <section className="hero-warm relative isolate overflow-hidden rounded-[32px] px-6 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
      <div className="hero-orb orb-one"/><div className="hero-orb orb-two"/><div className="absolute inset-y-0 right-0 hidden w-[43%] grid-dots opacity-40 lg:block"/>
      <div className="relative z-10 max-w-[680px] animate-float-in">
        <div className="hero-badge"><Sparkles size={14}/> DEVELOPER COLLABORATION & CAREER HUB <span>2026</span></div>
        <h1 className="mt-7 font-display text-[40px] font-extrabold leading-[1.08] tracking-[-.045em] sm:text-[58px] lg:text-[64px]">Your developer journey,<br/> <span className="hero-highlight">all in one place.</span></h1>
        <p className="mt-6 max-w-[540px] text-sm leading-7 text-muted sm:text-base">Plan projects, manage tasks, track learning goals, find collaborators and showcase the work you’re proud of — from your first college project to your next team launch.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row"><Link to="/workspace" className="btn-primary">Open your workspace <ArrowRight size={16}/></Link><Link to="/users" className="btn-secondary">Explore developers <Users size={15}/></Link></div>
        <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] font-semibold text-muted"><span className="flex items-center gap-1.5"><CheckCircle2 size={14}/> Project tracking</span><span className="flex items-center gap-1.5"><CheckCircle2 size={14}/> Learning analytics</span><span className="flex items-center gap-1.5"><CheckCircle2 size={14}/> Career showcase</span></div>
      </div>
      <div className="hero-preview relative z-10 mt-12 lg:absolute lg:bottom-10 lg:right-8 lg:mt-0 lg:w-[34%]">
        <div className="preview-top"><span className="preview-dot"/><span className="preview-dot"/><span className="preview-dot"/><span className="ml-auto text-[10px] font-bold text-muted">MY WORKSPACE</span></div>
        <div className="preview-stat-grid"><div><small>Active projects</small><strong>04</strong><span>+1 this month</span></div><div><small>Tasks completed</small><strong>28</strong><span>Keep it up</span></div></div>
        <div className="preview-project"><div className="flex items-center justify-between"><b>Campus Connect</b><span>65%</span></div><div className="progress-track"><i style={{width:'65%'}}/></div><small>React · Team project</small></div>
        <div className="preview-project"><div className="flex items-center justify-between"><b>DSA learning goal</b><span>42/100</span></div><div className="progress-track"><i style={{width:'42%'}}/></div><small>Consistency beats intensity</small></div>
      </div>
    </section>
    <section className="mt-14"><div className="section-title"><div><p className="eyebrow">One connected workspace</p><h2>From idea to shipped project.</h2><p className="section-subtitle">Useful tools for students, solo developers and collaborative teams.</p></div><Link to="/workspace" className="text-action">Explore workspace <ArrowRight size={14}/></Link></div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{features.map((f,i)=><article className="feature-card animate-float-in" style={{animationDelay:`${i*70}ms`}} key={f.title}><div className="feature-icon"><f.icon size={20}/></div><h3>{f.title}</h3><p>{f.body}</p><Link to="/workspace">Explore feature <ArrowUpRight size={14}/></Link></article>)}</div>
    </section>
    <section className="mt-10 bottom-cta"><div><p className="eyebrow">MAKE YOUR NEXT STEP COUNT</p><h2>Less scattered work. More visible progress.</h2><p>Start with one project, one task and one learning goal.</p></div><Link to="/workspace" className="btn-primary">Get started <ArrowRight size={15}/></Link></section>
    <section className="mt-10 flex flex-wrap items-center justify-between gap-4 text-xs text-muted"><span className="flex items-center gap-2"><ShieldCheck size={15}/> Demo workspace · data saved in this browser</span><Link to="/login" className="text-action">Sign in or create account <ArrowRight size={14}/></Link></section>
  </div>
}
