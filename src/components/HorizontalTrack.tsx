'use client';

import { useRef, useEffect, useState } from 'react';
import StageCard from './StageCard';
import content from '@/data/content.json';

// Helper to clamp values
const clamp = (x: number, a: number, b: number) => Math.min(b, Math.max(a, x));

export default function HorizontalTrack() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    let active = false;
    const onEnter = () => { active = true; };
    const onLeave = () => { active = false; };

    const onWheel = (e: WheelEvent) => {
      // Se o mouse não estiver "ativo" sobre o elemento (garantia extra), ignoramos
      if (!active) return;

      const maxLeft = el.scrollWidth - el.clientWidth;
      if (maxLeft <= 0) return;

      // Respeita trackpads (deltaX) ou mouses comuns (deltaY)
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      const speed = 1.2; // Ajuste de velocidade se necessário

      const current = el.scrollLeft;
      const next = clamp(current + delta * speed, 0, maxLeft);

      // LÓGICA CORE:
      // Só chamamos preventDefault() se o scroll REALMENTE mudou a posição horizontal.
      // Se next === current, significa que estamos nas bordas (início ou fim) e tentando ir além.
      // Nesse caso, NÃO prevenimos, deixando o browser assumir o scroll vertical da página.
      if (next !== current) {
        e.preventDefault();
        el.scrollLeft = next;
      }
    };

    // Listeners para ativar/desativar o "foco" no track
    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);
    
    // Listener de wheel NÃO-PASSIVO para permitir preventDefault
    el.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
      el.removeEventListener("wheel", onWheel);
    };
  }, []);

  // Handler para atualizar a barra de progresso visualmente
  const handleScroll = () => {
    if (!trackRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
    const maxScroll = scrollWidth - clientWidth;
    
    if (maxScroll <= 0) {
      setProgress(100);
      return;
    }
    
    const pct = (scrollLeft / maxScroll) * 100;
    setProgress(clamp(pct, 0, 100));
  };

  return (
    <section className="relative flex min-h-screen flex-col justify-center bg-slate-50 py-20 overflow-hidden">
      
      {/* Horizontal Track Scroll Container */}
      <div 
        ref={trackRef}
        onScroll={handleScroll}
        className="scrollbar-hide flex w-full snap-x snap-mandatory items-center gap-6 overflow-x-auto overflow-y-hidden px-[5vw] md:gap-8 overscroll-behavior-contain"
        // Removido scroll-behavior: smooth para não conflitar com a manipulação direta do scrollLeft no wheel event
        style={{ overscrollBehavior: 'contain' }}
      >
        {content.stages.map((stage) => (
          <div 
            key={stage.id} 
            className="flex h-[80vh] min-w-[90vw] shrink-0 snap-center items-center justify-center md:min-w-[80vw]"
          >
            <StageCard data={stage} />
          </div>
        ))}
      </div>

      {/* Barra de Progresso (EMBAIXO dos slides) */}
      <div className="absolute bottom-10 left-0 right-0 z-20 mx-auto w-full max-w-md px-6 md:bottom-16">
        {/* Track (Fundo) */}
        <div className="relative h-1.5 w-full rounded-full bg-slate-200">
          {/* Indicator (Preenchimento Amarelo) */}
          <div 
            className="relative h-full rounded-full bg-yellow-400 transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          >
            {/* The Knob (Bolinha Amarela na ponta) */}
            <div className="absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 translate-x-1/2 rounded-full bg-yellow-500 shadow-md ring-2 ring-white" />
          </div>
        </div>
      </div>

      {/* Mobile Hint */}
      <div className="absolute bottom-20 flex w-full justify-center md:hidden pointer-events-none">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-400 animate-pulse bg-white/50 px-3 py-1 rounded-full backdrop-blur-sm">
           <span>Deslize</span>
           <ArrowRight className="h-4 w-4" />
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M5 12h14" />
      <path d="M12 5l7 7-7 7" />
    </svg>
  );
}
