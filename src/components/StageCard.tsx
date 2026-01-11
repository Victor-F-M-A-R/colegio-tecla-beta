'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useTransform, MotionValue } from 'framer-motion';
import { Sun, Moon, ArrowRight, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { StageData } from '@/types';
import clsx from 'clsx';
import IntegralMascot from './IntegralMascot';

interface StageCardProps {
  data: StageData;
  progress?: MotionValue<number>; 
}

export default function StageCard({ data, progress }: StageCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isCustomIntegral = data.mascot === "custom:integral";

  // PARALLAX 3D: Mascote flutua em profundidade oposta ao scroll
  const parallaxX = useTransform(progress || new MotionValue(0), [0, 1], [40, -40]);

  // MAGNETIC FOCUS: Centralizar na COLUNA DE TEXTO (75% do card), não no centro geométrico (50%)
  useEffect(() => {
    if (showDetails && cardRef.current) {
      // 1. Centralização bruta
      cardRef.current.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      
      // 2. Ajuste fino para "Mira Magnética" no texto
      setTimeout(() => {
        // Tenta encontrar um container de scroll horizontal (se houver) ou usa window
        // Nota: Em layouts com transform puro, isso pode requerer ajustes no pai.
        // Aqui seguimos a instrução de tentar rolar o container.
        const scroller = document.scrollingElement || document.documentElement;
        if (cardRef.current) {
            // Rola para a direita para trazer o texto (lado direito do card) para o centro da tela
            scroller.scrollBy({ left: cardRef.current.offsetWidth * 0.25, behavior: 'smooth' });
        }
      }, 300);
    }
  }, [showDetails]);

  return (
    <motion.div 
      ref={cardRef}
      className={clsx(
        "group relative flex h-[75vh] min-w-[90vw] flex-col overflow-hidden rounded-[2.5rem] border border-slate-200/60 bg-white shadow-2xl shadow-slate-200/50 md:min-w-[75vw] lg:flex-row",
        "transition-transform duration-700 hover:shadow-slate-300/50"
      )}
    >
      {/* --- BOTÃO VOLTAR FLUTUANTE (Camada Superior) --- */}
      <AnimatePresence>
        {showDetails && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={(e) => { e.stopPropagation(); setShowDetails(false); }}
            className="absolute top-6 left-6 z-50 p-3 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 text-slate-800 hover:bg-white/40 hover:scale-105 transition-all shadow-lg"
            title="Voltar ao resumo"
          >
            <ArrowLeft className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* --- COLUNA ESQUERDA: MASCOTE (Com Efeitos de Foco) --- */}
      <div 
        className={clsx(
            "absolute inset-y-0 left-0 w-full lg:w-1/2 bg-gradient-to-br transition-all duration-700 ease-out", 
            data.gradient, 
            showDetails ? "opacity-30" : "opacity-50"
        )} 
      />

      <div className={clsx(
          "relative flex h-[35%] lg:h-full w-full lg:w-1/2 items-center justify-center p-8 transition-all duration-700 ease-[0.22,1,0.36,1]", 
          // EDITORIAL FOCUS: Blur, Scale Down, Grayscale e Slight Shift Left
          showDetails && "blur-[8px] grayscale-[20%] scale-[0.85] -translate-x-[10%] opacity-60"
        )}
      >
        <motion.div
           style={progress ? { x: parallaxX } : undefined}
           className="relative h-48 w-48 md:h-64 md:w-64 lg:h-80 lg:w-80 flex items-center justify-center transition-transform duration-700"
        >
          <motion.div
             animate={isCustomIntegral ? undefined : { y: [0, -15, 0] }}
             transition={isCustomIntegral ? undefined : { duration: 6, repeat: Infinity, ease: "easeInOut" }}
             className="relative w-full h-full"
          >
            {isCustomIntegral ? (
              <IntegralMascot />
            ) : (
              <Image
                src={data.mascot}
                alt={`Mascote ${data.title}`}
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
            )}
           </motion.div>
        </motion.div>
      </div>

      {/* --- COLUNA DIREITA: CONTEÚDO EDITORIAL --- */}
      <div className="relative flex flex-1 w-full lg:w-1/2 flex-col justify-center bg-white/80 backdrop-blur-sm lg:bg-transparent overflow-hidden">
        
        <AnimatePresence mode="wait">
          {!showDetails ? (
            /* === MODO RESUMO === */
            <motion.div
              key="summary"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="px-8 py-6 h-full flex flex-col justify-center lg:p-12 xl:p-16"
            >
              <div className="mb-6 flex items-center gap-3">
                <span className={clsx("flex h-8 items-center rounded-full px-4 text-sm font-semibold text-white shadow-sm", data.themeColor)}>
                  {data.age}
                </span>
              </div>

              <h3 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl lg:text-5xl">
                {data.title}
              </h3>

              <p className="mt-4 text-lg leading-relaxed text-slate-600 font-medium">
                {data.description}
              </p>

              <ul className="mt-8 space-y-3">
                {data.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-center text-slate-700 font-medium">
                    <div className={clsx("mr-3 h-2 w-2 rounded-full", data.themeColor)} />
                    {bullet}
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex flex-wrap items-center gap-6 border-t border-slate-100 pt-8">
               <div className="flex items-center gap-2 text-slate-500">
                  {data.period.includes('Manhã') && <Sun className="h-5 w-5 text-amber-500" />}
                  {(data.period.includes('Tarde') || data.period.includes('Contraturno') || data.period.includes('Integral')) && <Moon className="h-5 w-5 text-indigo-500" />}
                  <span className="text-sm font-medium">{data.period}</span>
               </div>

               <div className="flex-1 text-right">
                  <button 
                    onClick={() => setShowDetails(true)}
                    className="group/btn inline-flex items-center text-base font-bold text-slate-900 transition-colors hover:text-blue-600"
                  >
                    Ver detalhes
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </button>
               </div>
              </div>
            </motion.div>

          ) : (
            /* === MODO DETALHES (Scroll Editorial) === */
            <motion.div
              key="details"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="h-full w-full flex flex-col bg-white overflow-hidden relative"
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
            >
              {/* Máscara de Leitura (Top Gradient) */}
              <div className="sticky top-0 h-20 bg-gradient-to-b from-white via-white/80 to-transparent pointer-events-none z-10 w-full" />

              <div className="flex-1 overflow-y-auto max-h-[60vh] px-8 lg:px-12 pb-8 -mt-20 pt-20 scrollbar-thin scrollbar-track-transparent [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-300">
                
                <h4 className="text-sm uppercase tracking-widest font-bold text-slate-400 mb-2">
                  {data.title} — Detalhes
                </h4>

                <h3 className="text-2xl font-bold text-slate-900 mb-6 leading-tight">
                  {data.fullContent?.intro}
                </h3>

                <div className="space-y-6 text-slate-600 leading-relaxed text-lg">
                  {data.fullContent?.text.split('\n\n').map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>

                <div className="mt-8 bg-slate-50 rounded-2xl p-6 border border-slate-100">
                   <h5 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                     <span className={clsx("h-2 w-2 rounded-full", data.themeColor)} />
                     Destaques do Segmento
                   </h5>
                   <ul className="space-y-3">
                     {data.fullContent?.detailedBullets.map((item, idx) => (
                       <li key={idx} className="flex items-start text-slate-700 text-sm md:text-base">
                         <span className="mr-2 text-slate-400">•</span>
                         {item}
                       </li>
                     ))}
                   </ul>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 text-xs text-slate-400 font-medium">
                  Faixa etária: {data.age} &nbsp;|&nbsp; Turnos: {data.period}
                </div>
                
                <div className="h-12 w-full" /> {/* Spacer Final */}
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none"/>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
