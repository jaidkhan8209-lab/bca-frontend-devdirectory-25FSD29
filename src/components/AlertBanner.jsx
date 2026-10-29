import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react'

const styles = {
  error: 'border-rose-200 bg-rose-50 text-rose-800',
  success: 'border-emerald-200 bg-emerald-50 text-emerald-800',
  info: 'border-indigo-200 bg-indigo-50 text-indigo-800',
}
export default function AlertBanner({ type = 'error', title, message, onDismiss, onRetry }) {
  const Icon = type === 'success' ? CheckCircle2 : type === 'info' ? Info : AlertCircle
  return (
    <div role="status" className={`animate-fade-in flex items-start gap-3 rounded-2xl border p-4 ${styles[type] || styles.error}`}>
      <Icon size={19} className="mt-0.5 shrink-0" />
      <div className="min-w-0 flex-1">
        {title && <p className="text-sm font-extrabold">{title}</p>}
        {message && <p className="mt-1 text-xs leading-5 opacity-90">{message}</p>}
        {onRetry && <button onClick={onRetry} className="mt-2 text-xs font-extrabold underline underline-offset-4">Try again</button>}
      </div>
      {onDismiss && <button aria-label="Dismiss alert" onClick={onDismiss} className="rounded-lg p-1 opacity-70 hover:bg-black/5 hover:opacity-100"><X size={16}/></button>}
    </div>
  )
}
