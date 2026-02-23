'use client'

import { useState } from 'react'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return

    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (res.ok) {
        setStatus('success')
        setMessage('Merci ! Vérifiez votre boîte mail pour confirmer.')
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.error || 'Une erreur est survenue.')
      }
    } catch {
      setStatus('error')
      setMessage('Une erreur est survenue. Réessayez.')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex items-center gap-3 border-b border-primary py-3">
        <span className="material-symbols-outlined text-primary">check_circle</span>
        <p className="text-sm text-primary">{message}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex border-b border-primary py-2">
        <input
          className="w-full border-none bg-transparent p-0 text-sm focus:outline-none focus:ring-0"
          type="email"
          required
          placeholder="Adresse email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (status === 'error') setStatus('idle')
          }}
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="whitespace-nowrap text-xs font-bold uppercase tracking-widest text-primary transition-opacity hover:opacity-70 disabled:opacity-50"
        >
          {status === 'loading' ? '...' : "S'abonner"}
        </button>
      </div>
      {status === 'error' && (
        <p className="text-xs text-red-500">{message}</p>
      )}
      <p className="text-[10px] uppercase tracking-widest opacity-40">
        S&apos;abonner signifie accepter notre Politique de confidentialité
      </p>
    </form>
  )
}
