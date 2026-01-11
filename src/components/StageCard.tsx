'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, ArrowRight, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { StageData } from '@/types';
import clsx from 'clsx';
import IntegralMascot from './IntegralMascot';

interface StageCardProps {
  data: StageData;
}

export default function StageCard({ data }: StageCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  const isCustomIntegral = data.mascot === "custom:integral";

  return (
    <motion.div 
      className={clsx(
        "group relative flex h-[75vh] min-w-[90vw] flex-col overflow-hidden rounded-[2.5rem] border border-slate-200/60 bg-white shadow-2xl shadow-slate-200/50 md:min-w-[75vw] lg:flex-row",
        "transition-transform duration-500 hover:scale-[1.01]"
      )}
    >
      {/* Coluna Esquerda: Mascote & Visual */}
      <div className={clsx("absolute inset-y-0 left-0 w-full lg:w-1/2 bg-gradient-to-br opacity-50 transition-all duration-500", data.gradient, showDetails && "blur-sm opacity-30")} />

      <div className={clsx("relative flex h-[35%] lg:h-full w-full lg:w-1/2 items-center justify-center p-8 transition-all duration-500", showDetails && "blur-sm scale-95 opacity-80")}>
        <motion.div
          animate={isCustomIntegral ? undefined : { y: [0, -15, 0] }}
          transition={isCustomIntegral ? undefined : { duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="relative h-48 w-48 md:h-64 md:w-64 lg:h-80 lg:w-80 flex items-center justify-center"
        >
          {isCustomIntegral ? (
            <IntegralMascot />
          ) : (
            <Image
              src={data.mascot}
              alt={`Mascote ${data.title}`}
              fill
              className="object-contain drop-shadow-xl"
              priority
            />
          )}
        </motion.div>
      </div>

      {/* Coluna Direita: Animação de Conteúdo */}
      <div className="relative flex flex-1 w-full lg:w-1/2 flex-col justify-center bg-white/80 backdrop-blur-sm lg:bg-transparent overflow-hidden">
        
        <AnimatePresence mode="wait">
          {!showDetails ? (
            /* --- MODO RESUMO --- */
            <motion.div
              key="summary"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
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
            /* --- MODO DETALHES (Scroll Editorial) --- */
            <motion.div
              key="details"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="h-full w-full flex flex-col bg-white overflow-hidden relative"
              // Impede que o scroll do texto afete o scroll horizontal da página
              onWheel={(e) => e.stopPropagation()}
            >
              <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none"/>

              <div className="flex-1 overflow-y-auto max-h-[60vh] px-8 py-8 lg:px-12 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-200 hover:scrollbar-thumb-slate-300">
                <button 
                  onClick={() => setShowDetails(false)}
                  className="mb-6 inline-flex items-center text-sm font-medium text-slate-400 hover:text-slate-600 transition-colors group/back sticky top-0 bg-white/90 backdrop-blur py-2 w-full z-20"
                >
                  <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover/back:-translate-x-1" />
                  Voltar
                </button>

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
                
                <div className="h-8 w-full" /> {/* Spacer Final */}
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none"/>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
