import { HandHelping } from "lucide-react"
import Link from "next/link"

const links = [
  { label: "Cómo funciona", href: "#como-funciona" },
  { label: "Quiero ayudar", href: "#ayudar" },
  { label: "Contacto", href: "#contacto" },
]

export function Footer() {
  return (
    <footer className="px-5 py-12 md:px-8 lg:px-16 border-t border-border">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 text-foreground font-semibold mb-2">
              <HandHelping className="w-5 h-5 text-primary" />
              <span>Una Mano</span>
            </div>
            <p className="text-muted-foreground text-sm">Pedí con una mano. Te damos una mano.</p>
          </div>

          <nav className="flex flex-wrap gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-foreground transition-colors text-sm"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Una Mano. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
