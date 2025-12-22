import { CheckCircle2 } from "lucide-react"

const trustPoints = [
  "Ayudantes verificados",
  "Personas cerca de vos",
  "Historial de ayudas",
  "Vos elegís a quién llamar",
]

export function TrustSection() {
  return (
    <section className="px-5 py-16 md:px-8 md:py-24 lg:px-16">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10 text-center">
          Personas reales. Ayuda real.
        </h2>

        <div className="grid gap-4 md:grid-cols-2 max-w-2xl mx-auto">
          {trustPoints.map((point, index) => (
            <div key={index} className="flex items-center gap-4 p-5 bg-primary/5 rounded-xl border border-primary/20">
              <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
              <span className="text-foreground font-medium">{point}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
