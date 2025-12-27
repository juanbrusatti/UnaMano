"use client"

import { Button } from "@/components/ui/button"
import { HandHelping, Heart } from "lucide-react"
import { useRouter } from "next/navigation"

export function FinalCTA() {
  const router = useRouter()
  return (
    <section className="px-5 py-20 md:px-8 md:py-28 lg:px-16 bg-primary text-primary-foreground">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-balance">
          Cuando algo pasa, no estás solo
        </h2>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            variant="secondary"
            className="text-lg px-8 py-6 rounded-xl bg-primary-foreground text-primary hover:bg-primary-foreground/90"
          >
            <HandHelping className="w-5 h-5 mr-2" />
            Pedir una mano
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-lg px-8 py-6 rounded-xl border-2 border-primary-foreground text-primary-foreground bg-transparent hover:bg-primary-foreground/10"
            onClick={() => router.push('/ayudante')}
          >
            <Heart className="w-5 h-5 mr-2" />
            Quiero ayudar
          </Button>
        </div>
      </div>
    </section>
  )
}
