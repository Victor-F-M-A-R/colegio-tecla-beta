'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import StageCard from './StageCard';
import content from '@/data/content.json';

export default function HorizontalTrack() {
  const targetRef = useRef<HTMLDivElement>(null);
  
  // Rastreia o progresso do scroll vertical APENAS dentro deste container
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Mapeia 0% a 100% do scroll vertical para mover os cards horizontalmente
  // Ajuste "-75%" se sobrar ou faltar espaço no fim. 
  // Com 4 cards largos, precisamos mover bastante para a esquerda.
  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-75%"]);

  return (
    // Container "Fantasma" que dá a altura para o scroll acontecer (300vh = 3 telas de scroll)
    <section ref={targetRef} className="relative h-[300vh] bg-slate-50">
      
      {/* Container "Grudado" na tela */}
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        
        {/* Título Fixo (Opcional, dá contexto) e Hidden no mobile se quiser */}
        <div className="absolute top-8 left-8 z-10 md:top-12 md:left-12">
          <h2 className="text-xl font-bold text-slate-400 uppercase tracking-widest hidden md:block">
            A Jornada
          </h2>
        </div>

        {/* O Trem Horizontal */}
        <motion.div style={{ x }} className="flex gap-8 px-8 md:px-20 items-center">
          {content.stages.map((stage) => (
            // Flex-shrink-0 garante que os cards não encolham
            <div key={stage.id} className="shrink-0">
               <StageCard data={stage} />
            </div>
          ))}
        </motion.div>

        {/* Barra de Progresso Visual (Mapeada ao mesmo scroll) */}
        <motion.div 
            style={{ scaleX: scrollYProgress }}
            className="absolute bottom-0 left-0 h-2 w-full bg-yellow-400 origin-left" 
        />
      </div>
      
      {/* Mobile Hint (Opcional, para indicar que é só descer) */}
      <div className="absolute bottom-10 w-full text-center text-slate-400 text-sm md:hidden pointer-events-none">
        Continue descendo para explorar
      </div>

    </section>
  );
}
