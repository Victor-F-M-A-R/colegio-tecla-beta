import Hero from '@/components/Hero';
import HorizontalTrack from '@/components/HorizontalTrack';
import FinalCTA from '@/components/FinalCTA';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Hero />
      <HorizontalTrack />
      <FinalCTA />
    </main>
  );
}
