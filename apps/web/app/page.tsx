import Hero from "@/components/landing/hero";
import Tools from "@/components/landing/tools";
import OperatorDiscovery from "@/components/landing/operator-discovery";
import CTA from "@/components/landing/cta";
import Sponsors from "@/components/landing/sponsors";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Tools />
      <Sponsors />
      <OperatorDiscovery />
      <CTA />
    </main>
  );
}
