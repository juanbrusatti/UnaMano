'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  MapPin,
  Navigation,
  UserRound,
  XCircle,
} from 'lucide-react'

type IncomingRequest = {
  id: string
  clientName: string
  summary: string
  distanceKm: number
  etaMinutes: number
  offeredPrice: number
}

export default function PedidoEntrantePage() {
  const router = useRouter()

  const request: IncomingRequest = useMemo(
    () => ({
      id: 'req_demo_1',
      clientName: 'Camila R.',
      summary: 'Se rompió una canilla y pierde agua',
      distanceKm: 1.8,
      etaMinutes: 9,
      offeredPrice: 9000,
    }),
    [],
  )

  const [secondsLeft, setSecondsLeft] = useState(30)
  const [expired, setExpired] = useState(false)
  const [decision, setDecision] = useState<'accepted' | 'rejected' | null>(null)

  const [isHagglingOpen, setIsHagglingOpen] = useState(false)
  const [counterOffer, setCounterOffer] = useState<string>('')
  const [agreedPrice, setAgreedPrice] = useState<number | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const expiryRef = useRef<number | null>(null)

  useEffect(() => {
    expiryRef.current = Date.now() + 300_000

    const interval = window.setInterval(() => {
      const expiry = expiryRef.current
      if (!expiry) return

      const next = Math.max(0, Math.ceil((expiry - Date.now()) / 1000))
      setSecondsLeft(next)

      if (next === 0) {
        window.clearInterval(interval)
        setExpired(true)
      }
    }, 250)

    return () => window.clearInterval(interval)
  }, [])

  const formatMoney = (value: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0,
    }).format(value)
  }

  const handleReject = async () => {
    if (expired || isSubmitting) return
    setIsSubmitting(true)
    try {
      await new Promise((r) => setTimeout(r, 350))
      setDecision('rejected')
      setTimeout(() => {
        router.push('/ayudante/disponibilidad')
      }, 600)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAccept = async () => {
    if (expired || isSubmitting) return
    setIsSubmitting(true)
    try {
      await new Promise((r) => setTimeout(r, 350))
      setDecision('accepted')
      setTimeout(() => {
        const next = new URLSearchParams()
        next.set('client', request.clientName)
        router.push(`/ayudante/en-camino?${next.toString()}`)
      }, 600)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubmitCounterOffer = async () => {
    if (expired || isSubmitting) return

    const next = Number(counterOffer)
    if (!Number.isFinite(next) || next <= 0) return

    setIsSubmitting(true)
    try {
      await new Promise((r) => setTimeout(r, 350))
      setAgreedPrice(next)
      setIsHagglingOpen(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  const displayedPrice = agreedPrice ?? request.offeredPrice

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="flex items-center justify-between gap-4 mb-6">
        <button
          onClick={() => router.push('/ayudante/disponibilidad')}
          className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
        >
          Volver
        </button>

        <div
          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-medium ${
            expired ? 'border-red-200 bg-red-50 text-red-700' : 'border-amber-200 bg-amber-50 text-amber-700'
          }`}
        >
          <Clock className="h-4 w-4" />
          {expired ? 'Tiempo agotado' : `${secondsLeft}s`}
        </div>
      </div>

      <Card className="w-full shadow-lg overflow-hidden">
        <div className={`h-2 ${expired ? 'bg-red-500' : 'bg-amber-500'}`}></div>
        <CardHeader className="pt-8">
          <CardTitle className="text-2xl">Pedido entrante</CardTitle>
          <CardDescription>
            {expired ? 'Si no respondés, el pedido se reasigna' : 'Respondé rápido para tomar el pedido'}
          </CardDescription>
        </CardHeader>

        <CardContent className="px-6 pb-8">
          <div className="grid gap-4">
            <div className="rounded-xl border bg-card p-4">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                  <UserRound className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm text-muted-foreground">Cliente</div>
                  <div className="text-lg font-semibold truncate">{request.clientName}</div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border bg-card p-4">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                  <AlertCircle className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm text-muted-foreground">Problema</div>
                  <div className="text-base font-medium truncate">{request.summary}</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl border bg-card p-4">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm text-muted-foreground">Distancia</div>
                    <div className="text-base font-semibold">{request.distanceKm.toFixed(1)} km</div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border bg-card p-4">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                    <Navigation className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm text-muted-foreground">Tiempo estimado</div>
                    <div className="text-base font-semibold">{request.etaMinutes} min</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border bg-card p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="text-sm text-muted-foreground">Precio</div>
                  <div className="text-2xl font-bold tracking-tight">{formatMoney(displayedPrice)}</div>
                  {agreedPrice !== null && (
                    <div className="text-sm text-muted-foreground">Precio acordado</div>
                  )}
                </div>

                <Button
                  type="button"
                  variant="outline"
                  className="shrink-0"
                  disabled={expired || decision !== null}
                  onClick={() => setIsHagglingOpen(true)}
                >
                  Regatear
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <Button
                type="button"
                size="lg"
                className="h-16 text-lg"
                disabled={expired || decision !== null || isSubmitting}
                onClick={handleAccept}
              >
                <CheckCircle2 className="h-5 w-5 mr-2" />
                Aceptar
              </Button>

              <Button
                type="button"
                size="lg"
                variant="destructive"
                className="h-16 text-lg"
                disabled={expired || decision !== null || isSubmitting}
                onClick={handleReject}
              >
                <XCircle className="h-5 w-5 mr-2" />
                Rechazar
              </Button>
            </div>

            <div className="text-center text-sm text-muted-foreground">
              {expired ? 'Si no respondés, el pedido se reasigna' : 'Si no respondés, el pedido se reasigna'}
            </div>

            {decision !== null && (
              <div
                className={`rounded-xl border p-4 text-center text-sm font-medium ${
                  decision === 'accepted'
                    ? 'border-green-200 bg-green-50 text-green-800'
                    : 'border-red-200 bg-red-50 text-red-800'
                }`}
              >
                {decision === 'accepted' ? 'Aceptaste el pedido' : 'Rechazaste el pedido'}
              </div>
            )}

            {expired && decision === null && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-center text-sm text-red-800">
                Tiempo agotado. El pedido se reasignó.
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isHagglingOpen} onOpenChange={setIsHagglingOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Regatear precio</DialogTitle>
            <DialogDescription>
              Proponé un nuevo precio. El cliente debe aceptarlo para confirmar.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-3">
            <div className="text-sm text-muted-foreground">Precio ofrecido</div>
            <div className="text-lg font-semibold">{formatMoney(request.offeredPrice)}</div>
            <Input
              inputMode="numeric"
              value={counterOffer}
              onChange={(e) => setCounterOffer(e.target.value.replace(/[^0-9]/g, ''))}
              placeholder="Tu contraoferta (ARS)"
              aria-label="Contraoferta"
              disabled={expired || isSubmitting}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsHagglingOpen(false)}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button
              type="button"
              onClick={handleSubmitCounterOffer}
              disabled={expired || isSubmitting || counterOffer.trim().length === 0}
            >
              Enviar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
