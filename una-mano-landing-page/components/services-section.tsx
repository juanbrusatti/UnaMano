import { Wrench, Droplets, Zap, Hammer, HardHat } from "lucide-react"

const services = [
  { icon: Wrench, name: "Arreglos en casa" },
  { icon: Droplets, name: "Plomería" },
  { icon: Zap, name: "Electricidad" },
  { icon: Hammer, name: "Ayuda cotidiana" },
  { icon: HardHat, name: "Técnicos de confianza" },
]

export function ServicesSection() {
  return (
    <section className="px-5 py-16 md:px-8 md:py-24 lg:px-16 bg-card">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10 text-center">¿Para qué sirve Una Mano?</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {services.map((service, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-3 p-6 bg-background rounded-xl border border-border hover:border-primary/50 transition-colors"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center">
                <service.icon className="w-7 h-7 text-primary" />
              </div>
              <span className="text-foreground font-medium text-center text-sm">{service.name}</span>
            </div>
          ))}
        </div>

        <p className="text-center text-muted-foreground mt-10 text-lg">No importa el problema, importa resolverlo.</p>
      </div>
    </section>
  )
}
