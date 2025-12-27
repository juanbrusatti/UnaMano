'use client'

import { useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Star } from 'lucide-react'

export default function FeedbackAyudantePage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const clientName = useMemo(() => {
    const raw = searchParams.get('client')
    return raw && raw.trim().length > 0 ? raw : 'Juan'
  }, [searchParams])

  const rating = useMemo(() => {
    const raw = searchParams.get('rating')
    const n = raw ? Number(raw) : 5
    if (!Number.isFinite(n)) return 5
    return Math.min(5, Math.max(1, Math.round(n)))
  }, [searchParams])

  return (
    <div className="container mx-auto px-4 py-10 max-w-2xl">
      <Card className="w-full max-w-md mx-auto shadow-lg overflow-hidden">
        <div className="h-2 bg-green-500"></div>
        <CardHeader className="text-center pt-8 pb-4">
          <CardTitle className="text-2xl font-semibold">Ayuda finalizada</CardTitle>
          <CardDescription>Calificación recibida de {clientName}</CardDescription>
        </CardHeader>

        <CardContent className="px-8 pb-8">
          <div className="flex items-center justify-center gap-1 py-4">
            {Array.from({ length: 5 }).map((_, i) => {
              const filled = i < rating
              return (
                <Star
                  key={i}
                  className={`h-8 w-8 ${filled ? 'text-yellow-500' : 'text-gray-300'}`}
                  fill={filled ? 'currentColor' : 'none'}
                />
              )
            })}
          </div>

          <div className="text-center text-sm text-muted-foreground mb-6">Gracias por ayudar. No hace falta responder.</div>

          <Button type="button" className="w-full" onClick={() => router.push('/ayudante/disponibilidad')}>
            Volver
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
