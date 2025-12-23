'use client';

import { Button } from "@/components/ui/button"
import { HandHelping, Heart } from "lucide-react"
import { useRouter } from "next/navigation"

export function HeroSection() {
  const router = useRouter()
  return (
    <section className="min-h-[100dvh] flex flex-col justify-center px-5 py-12 md:px-8 lg:px-16">
      <div className="max-w-4xl mx-auto w-full">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 text-primary font-medium mb-6">
            <HandHelping className="w-6 h-6" />
            <span className="text-lg">Una Mano</span>
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 text-balance leading-tight">
          ¿Qué te pasó?
        </h1>

        <h2 className="text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-6 text-pretty leading-relaxed">
          Pedí una mano y alguien cerca va a ayudarte.
        </h2>

        <p className="text-base md:text-lg text-muted-foreground mb-10 max-w-xl">
          Arreglos en casa, ayuda cotidiana o problemas inesperados. Simple. Rápido. Confiable.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 rounded-xl"
            onClick={() => router.push('/pedido')}
          >
            <HandHelping className="w-5 h-5 mr-2" />
            Pedir una mano
          </Button>
          <Button variant="outline" size="lg" className="text-lg px-8 py-6 rounded-xl border-2 bg-transparent">
            <Heart className="w-5 h-5 mr-2" />
            Quiero ayudar
          </Button>
        </div>
      </div>
    </section>
  )
}
