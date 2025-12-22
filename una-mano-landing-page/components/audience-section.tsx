import { GraduationCap, Users, Heart, Wrench } from "lucide-react"

const audiences = [
  { icon: GraduationCap, title: "Personas que viven solas" },
  { icon: Users, title: "Familias" },
  { icon: Heart, title: "Adultos mayores" },
  { icon: Wrench, title: "Técnicos y ayudantes" },
]

export function AudienceSection() {
  return (
    <section className="px-5 py-16 md:px-8 md:py-24 lg:px-16 bg-card">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10 text-center">Pensada para todos</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {audiences.map((audience, index) => (
            <div key={index} className="flex flex-col items-center gap-4 p-6 bg-background rounded-xl">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center">
                <audience.icon className="w-8 h-8 text-primary" />
              </div>
              <span className="text-foreground font-medium text-center text-sm">{audience.title}</span>
            </div>
          ))}
        </div>

        <p className="text-center text-muted-foreground mt-10 text-lg">
          Una Mano conecta personas cuando hace falta una ayuda.
        </p>
      </div>
    </section>
  )
}
