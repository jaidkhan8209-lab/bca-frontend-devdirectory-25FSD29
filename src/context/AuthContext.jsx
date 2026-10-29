import { createContext, useContext, useMemo, useState } from 'react'
const AuthContext = createContext(null)
const SESSION_KEY = 'devdirectory-session'
const USERS_KEY = 'devdirectory-users'
const ADMIN_EMAIL = 'admin@devdirectory.com'
const ADMIN_PASSWORD = 'Admin@123'
function readJson(key, fallback) { try { return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback)) } catch { return fallback } }
function readSession() { return readJson(SESSION_KEY, null) }
export function AuthProvider({ children }) {
 const [user, setUser] = useState(readSession)
 const register = ({ name, email, password }) => {
  const users = readJson(USERS_KEY, [])
  if (email.toLowerCase() === ADMIN_EMAIL) throw new Error('This email is reserved for the administrator.')
  if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) throw new Error('An account with this email already exists.')
  const account = { id: crypto.randomUUID(), name: name.trim(), email: email.trim().toLowerCase(), password, role: 'developer', createdAt: new Date().toISOString() }
  localStorage.setItem(USERS_KEY, JSON.stringify([...users, account]))
  signIn({ email: account.email, password })
 }
 const signIn = ({ email, password }) => {
  let account
  if (email.trim().toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASSWORD) account = { id: 'admin', name: 'Administrator', email: ADMIN_EMAIL, role: 'admin' }
  else { account = readJson(USERS_KEY, []).find(u => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password); if (!account) throw new Error('Invalid email or password.') }
  const session = { id: account.id, name: account.name, email: account.email, role: account.role, token: `local-${Date.now()}` }
  localStorage.setItem(SESSION_KEY, JSON.stringify(session)); setUser(session)
 }
 const login = (payload) => signIn(payload)
 const logout = () => { localStorage.removeItem(SESSION_KEY); setUser(null) }
 const value = useMemo(() => ({ user, isAuthenticated: Boolean(user?.token), login, register, logout }), [user])
 return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
export function useAuth() { const context = useContext(AuthContext); if (!context) throw new Error('useAuth must be used inside AuthProvider'); return context }
