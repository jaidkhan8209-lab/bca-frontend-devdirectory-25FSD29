import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import UserDirectory from './pages/UserDirectory'
import UserProfile from './pages/UserProfile'
import AddPost from './pages/AddPost'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import Workspace from './pages/Workspace'
import MyProfile from './pages/MyProfile'

export default function App() {
  return <div className="min-h-screen text-ink">
    <Navbar />
    <main className="page-shell">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<UserDirectory />} />
        <Route path="/users/:id" element={<UserProfile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/workspace" element={<Workspace />} />
        <Route path="/profile" element={<ProtectedRoute><MyProfile /></ProtectedRoute>} />
        <Route path="/add-post" element={<ProtectedRoute><AddPost /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
    <footer className="site-footer"><div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-7 sm:flex-row sm:items-center sm:justify-between"><span className="flex items-center gap-2 font-display text-sm font-extrabold"><span className="brand-mark small">D</span> DevDirectory</span><span className="text-xs text-muted">Build projects. Track progress. Grow together. <span className="ml-1">© 2026</span></span></div></footer>
  </div>
}
