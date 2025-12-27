'use client'

import { useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Loader2, MessageCircle, XCircle } from 'lucide-react'

export default function EnCaminoPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const clientName = useMemo(() => {
    const raw = searchParams.get('client')
    return raw && raw.trim().length > 0 ? raw : 'Juan'
  }, [searchParams])

  const [isCancelOpen, setIsCancelOpen] = useState(false)
  const [reason, setReason] = useState<string>('')
  const [details, setDetails] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleGoToChat = () => {
    const next = new URLSearchParams()
    next.set('client', clientName)
    router.push(`/ayudante/chat?${next.toString()}`)
  }

  const handleCancel = async () => {
    if (isSubmitting) return
    if (reason.trim().length === 0) return

    setIsSubmitting(true)
    try {
      await new Promise((r) => setTimeout(r, 400))
      setIsCancelOpen(false)
      router.push('/ayudante/disponibilidad')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-center mb-8">En camino</h1>

      <Card className="w-full max-w-md mx-auto shadow-lg overflow-hidden">
        <div className="h-2 bg-blue-500"></div>
        <CardHeader className="text-center pt-8 pb-6">
          <CardTitle className="text-2xl font-semibold text-gray-800">
            Estás ayudando a {clientName}
          </CardTitle>
          <CardDescription className="mt-2 text-gray-500">
            Mantenete en contacto y avisá si surge algún imprevisto.
          </CardDescription>
        </CardHeader>

        <CardContent className="px-8 pb-8">
          <div className="grid gap-4">
            <Button type="button" size="lg" className="h-12" onClick={handleGoToChat}>
              <MessageCircle className="h-5 w-5 mr-2" />
              Ir al chat
            </Button>

            <Button
              type="button"
              size="lg"
              variant="destructive"
              className="h-12"
              onClick={() => setIsCancelOpen(true)}
            >
              <XCircle className="h-5 w-5 mr-2" />
              Cancelar ayuda
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isCancelOpen} onOpenChange={setIsCancelOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancelar ayuda</DialogTitle>
            <DialogDescription>Contanos el motivo para mejorar la experiencia.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-3">
            <Select value={reason} onValueChange={setReason}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Elegí un motivo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="no_puedo_llegar">No puedo llegar</SelectItem>
                <SelectItem value="me_surgio_algo">Me surgió algo</SelectItem>
                <SelectItem value="precio">No me sirve el precio</SelectItem>
                <SelectItem value="otro">Otro</SelectItem>
              </SelectContent>
            </Select>

            <Textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Detalle (opcional)"
              disabled={isSubmitting}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsCancelOpen(false)} disabled={isSubmitting}>
              Volver
            </Button>
            <Button type="button" variant="destructive" onClick={handleCancel} disabled={isSubmitting || reason.trim().length === 0}>
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Confirmar cancelación'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
