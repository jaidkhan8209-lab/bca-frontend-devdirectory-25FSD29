import { createContext, useContext, useEffect, useState } from 'react'
const ThemeContext = createContext(null)
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('devdirectory-theme') || 'light')
  useEffect(() => { document.documentElement.dataset.theme = theme; localStorage.setItem('devdirectory-theme', theme) }, [theme])
  return <ThemeContext.Provider value={{ theme, toggleTheme: () => setTheme(v => v === 'light' ? 'dark' : 'light') }}>{children}</ThemeContext.Provider>
}
export const useTheme = () => useContext(ThemeContext)
