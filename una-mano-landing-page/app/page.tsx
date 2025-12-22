import { HeroSection } from "@/components/hero-section"
import { ProblemsSection } from "@/components/problems-section"
import { HowItWorks } from "@/components/how-it-works"
import { ServicesSection } from "@/components/services-section"
import { TrustSection } from "@/components/trust-section"
import { AudienceSection } from "@/components/audience-section"
import { FinalCTA } from "@/components/final-cta"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ProblemsSection />
      <HowItWorks />
      <ServicesSection />
      <TrustSection />
      <AudienceSection />
      <FinalCTA />
      <Footer />
    </main>
  )
}
