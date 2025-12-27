
'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Circle, Loader2, Send } from 'lucide-react'

type Message = {
  id: string
  from: 'helper' | 'client'
  text: string
}

export default function AyudanteChatPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const inputRef = useRef<HTMLInputElement>(null)
  const endRef = useRef<HTMLDivElement>(null)

  const clientName = useMemo(() => {
    const raw = searchParams.get('client')
    return raw && raw.trim().length > 0 ? raw : 'Juan'
  }, [searchParams])

  const [messages, setMessages] = useState<Message[]>([
    { id: 'm1', from: 'client', text: 'Hola, ¿podés venir cuando puedas?' },
    { id: 'm2', from: 'helper', text: 'Sí, estoy saliendo ahora. Llego en unos minutos.' },
  ])
  const [draft, setDraft] = useState('')

  const [isFinishOpen, setIsFinishOpen] = useState(false)
  const [resolved, setResolved] = useState(false)
  const [notResolved, setNotResolved] = useState(false)
  const [isFinishing, setIsFinishing] = useState(false)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = () => {
    const text = draft.trim()
    if (text.length === 0) return
    setMessages((prev) => [...prev, { id: crypto.randomUUID(), from: 'helper', text }])
    setDraft('')
    requestAnimationFrame(() => inputRef.current?.focus())
  }

  const handleQuickReply = (text: string) => {
    setDraft(text)
    requestAnimationFrame(() => inputRef.current?.focus())
  }

  const handleFinalize = async () => {
    if (isFinishing) return
    if (!resolved && !notResolved) return

    setIsFinishing(true)
    try {
      await new Promise((r) => setTimeout(r, 450))

      const next = new URLSearchParams()
      next.set('client', clientName)
      // MVP: rating fijo para feedback silencioso (más adelante viene del backend)
      next.set('rating', '5')
      next.set('outcome', resolved ? 'resolved' : 'not_resolved')
      router.push(`/ayudante/feedback?${next.toString()}`)
    } finally {
      setIsFinishing(false)
    }
  }

  const quickReplies = ['Ya voy', 'Llego en X minutos', '¿Podés mandarme una foto?']

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center space-x-3">
        <button
          onClick={() => router.push(`/ayudante/en-camino?client=${encodeURIComponent(clientName)}`)}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          Volver
        </button>

        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-semibold">
          {clientName.slice(0, 1).toUpperCase()}
        </div>

        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{clientName}</h3>
          <div className="flex items-center space-x-1">
            <Circle className="w-3 h-3 text-green-500 fill-current" />
            <span className="text-sm text-gray-600">En línea</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.from === 'helper' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-xs px-4 py-2 rounded-2xl text-sm ${
                m.from === 'helper'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-white text-gray-900 rounded-bl-none border border-gray-200'
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <div className="px-4 pb-2">
        <div className="flex space-x-2 overflow-x-auto">
          {quickReplies.map((qr) => (
            <button
              key={qr}
              type="button"
              onClick={() => handleQuickReply(qr)}
              className="bg-white border border-gray-300 text-gray-700 px-3 py-1 rounded-full text-sm whitespace-nowrap hover:bg-gray-50 transition-colors"
            >
              {qr}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white border-t border-gray-200 px-4 py-3">
        <div className="flex items-center space-x-2">
          <Input
            ref={inputRef}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend()
            }}
            placeholder="Escribí un mensaje..."
            className="flex-1 bg-gray-100 rounded-full px-4"
          />

          <Button
            type="button"
            onClick={handleSend}
            disabled={!draft.trim()}
            className="rounded-full"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>

        <div className="pt-3">
          <Button
            type="button"
            className="w-full"
            onClick={() => setIsFinishOpen(true)}
          >
            🏁 Finalizar ayuda
          </Button>
        </div>
      </div>

      <Dialog
        open={isFinishOpen}
        onOpenChange={(open) => {
          if (isFinishing) return
          setIsFinishOpen(open)
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Finalizar ayuda</DialogTitle>
            <DialogDescription>
              Elegí una opción para métricas.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-3">
            <label className="flex items-center gap-3 rounded-lg border p-3">
              <Checkbox
                checked={resolved}
                onCheckedChange={(v) => {
                  const next = Boolean(v)
                  setResolved(next)
                  if (next) setNotResolved(false)
                }}
                disabled={isFinishing}
              />
              <span className="text-sm">Problema resuelto</span>
            </label>

            <label className="flex items-center gap-3 rounded-lg border p-3">
              <Checkbox
                checked={notResolved}
                onCheckedChange={(v) => {
                  const next = Boolean(v)
                  setNotResolved(next)
                  if (next) setResolved(false)
                }}
                disabled={isFinishing}
              />
              <span className="text-sm">No se pudo resolver</span>
            </label>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsFinishOpen(false)} disabled={isFinishing}>
              Volver
            </Button>
            <Button type="button" onClick={handleFinalize} disabled={isFinishing || (!resolved && !notResolved)}>
              {isFinishing ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Confirmar'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
