'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import StageCard from './StageCard';
import content from '@/data/content.json';

export default function HorizontalTrack() {
  const targetRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Física de Manteiga
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 25,
    mass: 0.5,
    restDelta: 0.001
  });

  // A Lógica da "Trava": Move até 85%, depois espera até 100% para soltar
  // Ajuste o "-95%" conforme a largura total real dos seus cards para que o Card Azul fique centralizado no fim
  const x = useTransform(smoothProgress, [0, 0.85, 1], ["1%", "-95%", "-95%"]);

  // Barra de progresso sincronizada com o movimento (para em 100% junto com a trava)
  const progressWidth = useTransform(smoothProgress, [0, 0.85, 1], ["0%", "100%", "100%"]);

  return (
    <section ref={targetRef} className="relative h-[450vh] bg-slate-50">
      
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        
        {/* Título Fixo */}
        <div className="absolute top-8 left-8 z-10 md:top-12 md:left-12 opacity-50">
          <h2 className="text-xl font-bold uppercase tracking-widest text-slate-900 hidden md:block">
            A Jornada de Ensino
          </h2>
        </div>

        {/* TRILHO DE CARDS */}
        <motion.div style={{ x }} className="flex gap-8 px-8 md:px-20 items-center">
          
          {/* Cards do JSON */}
          {content.stages.map((stage) => (
            <div key={stage.id} className="shrink-0">
               <StageCard data={stage} />
            </div>
          ))}

          {/* CARD FINAL (CTA AZUL) */}
          <div className="relative flex h-[70vh] min-w-[85vw] md:min-w-[60vw] shrink-0 flex-col items-center justify-center rounded-[2.5rem] bg-blue-600 p-8 text-center shadow-2xl shadow-blue-900/20 snap-center">
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.2 }}
               className="max-w-md space-y-8"
             >
                <h3 className="text-4xl font-bold text-white md:text-5xl">
                  Pronto para começar?
                </h3>
                <p className="text-lg text-blue-100">
                  Agende sua visita e garanta a melhor formação para o futuro.
                </p>
                <button className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-white px-10 py-5 text-xl font-bold text-blue-600 transition-all hover:bg-yellow-400 hover:text-blue-900 hover:scale-105">
                  <span>Matricule-se Já</span>
                  {/* Seta animada */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </button>
             </motion.div>
          </div>

        </motion.div>

        {/* BARRA DE PROGRESSO (Com a bolinha) */}
        <div className="absolute bottom-12 left-0 right-0 mx-auto w-[80%] max-w-4xl h-1.5 bg-slate-200 rounded-full overflow-visible">
            <motion.div 
                style={{ width: progressWidth }}
                className="relative h-full bg-yellow-400 rounded-full"
            >
                {/* A Bolinha na ponta */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 h-4 w-4 rounded-full bg-yellow-500 shadow-lg border-2 border-white" />
            </motion.div>
        </div>
      </div>
    </section>
  );
}
