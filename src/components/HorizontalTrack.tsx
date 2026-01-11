'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import StageCard from './StageCard';
import content from '@/data/content.json';

export default function HorizontalTrack() {
  const targetRef = useRef<HTMLDivElement>(null);
  
  // Rastreia o progresso do scroll vertical APENAS dentro deste container
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Adiciona física de mola (smooth scroll) ao progresso
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 25,
    mass: 0.5,
    restDelta: 0.001
  });

  // Mapeia o progresso SUAVE para mover os cards horizontalmente
  // Ajustado para -81% para garantir que todos os 5 cards apareçam completamente
  // O cálculo ideal é: -(100 - (100 / num_cards))% aprox,
  // Mas como há gaps e padding, ajustamos empiricamente.
  const x = useTransform(smoothProgress, [0, 1], ["1%", "-81%"]);

  return (
    // Aumentado para 400vh para dar mais tempo de scroll dado que agora temos 5 cards
    <section ref={targetRef} className="relative h-[400vh] bg-slate-50">
      
      {/* Container "Grudado" na tela */}
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        
        {/* Título Fixo */}
        <div className="absolute top-8 left-8 z-10 md:top-12 md:left-12">
          <h2 className="text-xl font-bold text-slate-400 uppercase tracking-widest hidden md:block">
            A Jornada
          </h2>
        </div>

        {/* O Trem Horizontal */}
        <motion.div style={{ x }} className="flex gap-8 px-8 md:px-20 items-center">
          {content.stages.map((stage) => (
            <div key={stage.id} className="shrink-0 last:mr-20">
               <StageCard data={stage} />
            </div>
          ))}
        </motion.div>

        {/* Barra de Progresso Visual */}
        <motion.div 
            style={{ scaleX: smoothProgress }}
            className="absolute bottom-0 left-0 h-2 w-full bg-yellow-400 origin-left" 
        />
      </div>
      
      {/* Mobile Hint */}
      <div className="absolute bottom-10 w-full text-center text-slate-400 text-sm md:hidden pointer-events-none">
        Continue descendo para explorar
      </div>

    </section>
  );
}
