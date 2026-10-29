import { Code2, LogOut, Menu, Plus, Users, X, Moon, Sun, LayoutDashboard } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()
  const navClass = ({ isActive }) => `nav-link ${isActive ? 'active' : ''}`
  const signOut = () => { logout(); navigate('/') }
  return (
    <header className="sticky top-0 z-40 border-b border-[#eceef5] bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5">
        <Link to="/" className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
          <span className="brand-mark"><Code2 size={21}/></span>
          <span><span className="block font-display text-[17px] font-extrabold tracking-tight text-ink">DevDirectory<span className="text-brand">.</span></span><span className="hidden text-[10px] font-semibold tracking-[.13em] text-muted sm:block">ENGINEERING, CONNECTED</span></span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          <NavLink to="/" end className={navClass}>Overview</NavLink>
          <NavLink to="/users" className={navClass}>Developers</NavLink>
          <NavLink to="/workspace" className={navClass}>Workspace</NavLink>
          {isAuthenticated && <NavLink to="/add-post" className={navClass}>Publish</NavLink>}
        </nav>
        <div className="hidden items-center gap-3 md:flex"><button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle color theme">{theme === 'light' ? <Moon size={16}/> : <Sun size={16}/>}</button>
          {isAuthenticated ? <>
            <Link to="/profile" className="flex items-center gap-2.5 border-r border-slate-100 pr-4 transition hover:opacity-75" aria-label="Open your profile">
              <div className="avatar h-9 w-9 rounded-xl text-xs">{(user?.name || 'Lead').slice(0,1).toUpperCase()}</div>
              <div><p className="max-w-28 truncate text-xs font-extrabold">{user?.name || 'Team lead'}</p><p className="text-[10px] text-muted">{user?.role === "admin" ? "Administrator" : "Developer"}</p></div>
            </Link>
            <button className="btn-secondary !px-3 !py-2.5" onClick={signOut}><LogOut size={14}/> Sign out</button>
          </> : <><Link to="/login" className="nav-link">Sign in</Link><Link to="/login" className="btn-primary !px-4 !py-2.5">Get started <span>↗</span></Link></>}
        </div>
        <div className="flex items-center gap-2 md:hidden"><button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle color theme">{theme === 'light' ? <Moon size={16}/> : <Sun size={16}/>}</button><button className="rounded-xl border border-slate-200 p-2.5 text-ink" aria-label="Toggle menu" onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? <X size={19}/> : <Menu size={19}/>}</button></div>
      </div>
      {mobileOpen && <div className="animate-fade-in border-t border-slate-100 bg-white px-5 py-4 md:hidden"><div className="flex flex-col gap-2"><NavLink onClick={() => setMobileOpen(false)} to="/" end className={navClass}>Overview</NavLink><NavLink onClick={() => setMobileOpen(false)} to="/users" className={navClass}><Users size={14} className="mr-2 inline"/>Developers</NavLink><NavLink onClick={() => setMobileOpen(false)} to="/workspace" className={navClass}><LayoutDashboard size={14} className="mr-2 inline"/>Workspace</NavLink>{isAuthenticated ? <><NavLink onClick={() => setMobileOpen(false)} to="/profile" className={navClass}><Users size={14} className="mr-2 inline"/>My profile</NavLink><NavLink onClick={() => setMobileOpen(false)} to="/add-post" className={navClass}><Plus size={14} className="mr-2 inline"/>Publish update</NavLink><button className="btn-secondary mt-1" onClick={signOut}><LogOut size={14}/> Sign out</button></> : <Link to="/login" onClick={() => setMobileOpen(false)} className="btn-primary mt-1">Sign in to workspace</Link>}</div></div>}
    </header>
  )
}
