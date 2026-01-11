'use client';

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import StageCard from "./StageCard";
import content from "@/data/content.json";

export default function HorizontalTrack() {
  const targetRef = useRef<HTMLDivElement>(null); 
  const scrollRef = useRef<HTMLDivElement>(null); 
  const [maxScroll, setMaxScroll] = useState(0);

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    const updateScroll = () => {
      const totalWidth = element.scrollWidth;
      // USANDO clientWidth do pai para ignorar a largura da barra de scroll vertical
      const viewPortWidth = element.parentElement?.clientWidth || window.innerWidth; 
      const distance = totalWidth - viewPortWidth;
      
      setMaxScroll(distance > 0 ? distance : 0);
    };

    updateScroll();

    const resizeObserver = new ResizeObserver(() => updateScroll());
    resizeObserver.observe(element);

    window.addEventListener("resize", updateScroll);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateScroll);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const x = useTransform(
    smoothProgress,
    [0, 0.9, 1],
    ["0px", `-${maxScroll}px`, `-${maxScroll}px`]
  );

  const progressWidth = useTransform(
    smoothProgress,
    [0, 0.9, 1],
    ["0%", "100%", "100%"]
  );

  return (
    <section ref={targetRef} className="relative h-[500vh] bg-slate-50">
      
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        
        <div className="absolute top-8 left-8 z-10 md:top-12 md:left-12 opacity-40 mix-blend-multiply">
          <h2 className="text-xl font-bold uppercase tracking-widest text-slate-900">
            Ciclos de Ensino
          </h2>
        </div>

        {/* TRILHO: Removido paddings laterais, adicionado gap fixo */}
        <motion.div 
          ref={scrollRef} 
          style={{ x }} 
          className="inline-flex flex-row flex-nowrap items-center gap-8 md:gap-12 h-full"
        >
          {/* 1. ESPAÇADOR INICIAL (Parede Esquerda) */}
          <div className="flex-none w-6 md:w-12 h-10" />

          {content.stages.map((stage) => (
             <div key={stage.id} className="flex-none block"> 
               <StageCard data={stage} progress={smoothProgress} />
             </div>
          ))}

          {/* CARD FINAL (AZUL) */}
          <div className="flex-none block">
            <div className="relative flex h-[75vh] min-w-[90vw] md:min-w-[75vw] flex-col items-center justify-center rounded-[2.5rem] bg-blue-600 p-12 text-center shadow-2xl shadow-blue-900/30 overflow-hidden">
               <motion.div className="relative z-10 space-y-8">
                  <h3 className="text-5xl font-bold text-white md:text-6xl tracking-tight leading-tight">
                    O futuro começa <br/> no Tecla.
                  </h3>
                  <button className="rounded-full bg-white px-12 py-5 text-xl font-bold text-blue-600 hover:scale-105 transition-all shadow-lg">
                    Matricule-se Já
                  </button>
               </motion.div>
            </div>
          </div>

          {/* 2. ESPAÇADOR FINAL (Parede Direita - O FIM DO CORTE) */}
          <div className="flex-none w-6 md:w-12 h-10" />

        </motion.div>

        {/* BARRA DE PROGRESSO */}
        <div className="absolute bottom-10 left-8 right-8 md:left-20 md:right-20 h-1.5 bg-slate-200 rounded-full overflow-visible">
            <motion.div 
                style={{ width: progressWidth }}
                className="relative h-full bg-yellow-400 rounded-full"
            >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 h-5 w-5 rounded-full bg-yellow-500 shadow-md border-4 border-white" />
            </motion.div>
        </div>

      </div>
    </section>
  );
}
