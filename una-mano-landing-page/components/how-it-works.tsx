import { Smartphone, MapPin, Handshake } from "lucide-react"

const steps = [
  {
    icon: Smartphone,
    step: "1",
    title: "Contanos qué te pasó",
    description: "Elegís el problema y, si querés, mandás una foto.",
  },
  {
    icon: MapPin,
    step: "2",
    title: "Buscamos a alguien cerca",
    description: "Un ayudante o técnico disponible.",
  },
  {
    icon: Handshake,
    step: "3",
    title: "Viene y te da una mano",
    description: "Sin vueltas. Sin estrés.",
  },
]

export function HowItWorks() {
  return (
    <section className="px-5 py-16 md:px-8 md:py-24 lg:px-16">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">Así de simple</h2>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((item, index) => (
            <div key={index} className="text-center">
              <div className="relative inline-flex mb-6">
                <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center">
                  <item.icon className="w-10 h-10 text-primary-foreground" />
                </div>
                <span className="absolute -top-2 -right-2 w-8 h-8 bg-foreground text-background rounded-full flex items-center justify-center font-bold text-sm">
                  {item.step}
                </span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
