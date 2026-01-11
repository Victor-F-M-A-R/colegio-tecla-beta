'use client';

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import StageCard from "./StageCard";
import content from "@/data/content.json";

export default function HorizontalTrack() {
  const targetRef = useRef<HTMLDivElement>(null); 
  const scrollRef = useRef<HTMLDivElement>(null); 
  // const [debugValues, setDebugValues] = useState({ total: 0, screen: 0, distance: 0 }); // debug removido para produção
  const [maxScroll, setMaxScroll] = useState(0);

  // SENSOR DE TAMANHO (RESIZE OBSERVER)
  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    const updateScroll = () => {
      // Cálculo robusto: usa window.innerWidth para viewport width ao invés de clientWidth do pai
      const totalWidth = element.scrollWidth;
      const windowWidth = window.innerWidth; 
      const distance = totalWidth - windowWidth;
      
      setMaxScroll(distance > 0 ? distance : 0);
      // setDebugValues({ total: totalWidth, screen: windowWidth, distance });
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

  // Lógica da Trava Final
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

        {/* O TRILHO (Motion Div) */}
        <motion.div 
          ref={scrollRef} 
          style={{ x }} 
          className="flex flex-row flex-nowrap gap-24 px-8 md:px-24 items-center min-w-max h-full"
        >
          {content.stages.map((stage) => (
             // Wrapper para garantir que o card não encolha
             <div key={stage.id} className="relative flex-shrink-0 w-[90vw] md:w-[70vw]">
               <StageCard data={stage} />
             </div>
          ))}

          {/* CARD FINAL (AZUL) */}
          <div className="relative flex-shrink-0 w-[90vw] md:w-[70vw] h-[60vh] md:h-[70vh] flex flex-col items-center justify-center rounded-[3rem] bg-blue-600 p-8 text-center shadow-2xl shadow-blue-900/20 overflow-hidden">
             
             <div className="absolute inset-0 bg-blue-500 rounded-[3rem] opacity-20 transform rotate-3 scale-105 pointer-events-none"></div>

             <motion.div 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.2, duration: 0.6 }}
               className="relative z-10 max-w-xl space-y-8"
             >
                <h3 className="text-4xl font-bold text-white md:text-6xl tracking-tight">
                  O futuro começa <br/> no Tecla.
                </h3>
                <p className="text-lg text-blue-100 md:text-xl leading-relaxed">
                  Venha conhecer nossa estrutura e proposta pedagógica de perto.
                </p>
                <button className="inline-flex items-center gap-3 rounded-full bg-white px-12 py-5 text-lg font-bold text-blue-600 transition-transform hover:scale-105 hover:bg-yellow-400 hover:text-blue-900 shadow-xl">
                  Agendar Visita
                </button>
             </motion.div>
          </div>
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
