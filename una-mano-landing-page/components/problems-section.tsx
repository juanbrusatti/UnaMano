import { Droplets, Key, Users, Clock, Package } from "lucide-react"

const problems = [
  { icon: Droplets, text: "Se rompió algo en casa" },
  { icon: Key, text: "Vivís solo y no sabés a quién llamar" },
  { icon: Users, text: "Un familiar necesita ayuda" },
  { icon: Clock, text: "Es tarde y nadie atiende" },
  { icon: Package, text: "Necesitás una mano ahora" },
]

export function ProblemsSection() {
  return (
    <section className="px-5 py-16 md:px-8 md:py-24 lg:px-16 bg-card">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10 text-center">A todos nos pasa</h2>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {problems.map((problem, index) => (
            <div key={index} className="flex items-center gap-4 p-5 bg-secondary rounded-xl">
              <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <problem.icon className="w-6 h-6 text-primary" />
              </div>
              <span className="text-foreground font-medium">{problem.text}</span>
            </div>
          ))}
        </div>

        <p className="text-center text-lg text-primary font-semibold mt-10">Una Mano existe para eso.</p>
      </div>
    </section>
  )
}
