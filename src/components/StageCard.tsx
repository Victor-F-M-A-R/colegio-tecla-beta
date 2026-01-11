'use client';

import { motion } from 'framer-motion';
import { Sun, Moon, ArrowRight, Apple, Dumbbell, Palette } from 'lucide-react';
import Image from 'next/image';
import { StageData } from '@/types';
import clsx from 'clsx';
import IntegralMascot from './IntegralMascot'; // Importando o componente novo

interface StageCardProps {
  data: StageData;
}

export default function StageCard({ data }: StageCardProps) {
  const isCustomIntegral = data.mascot === "custom:integral";

  return (
    <motion.div 
      className={clsx(
        "group relative flex h-full w-[90vw] flex-col overflow-hidden rounded-[2rem] border border-slate-200/60 bg-white shadow-2xl shadow-slate-200/50 md:w-[80vw] lg:flex-row",
        "transition-transform duration-500 hover:scale-[1.01]"
      )}
    >
      {/* Decorative Gradient Background */}
      <div className={clsx("absolute inset-y-0 left-0 w-full lg:w-1/2 bg-gradient-to-br opacity-50", data.gradient)} />

      {/* Left Column: Mascot & Visuals */}
      <div className="relative flex h-[40%] items-center justify-center p-8 lg:h-full lg:w-1/2">
        <motion.div
          animate={isCustomIntegral ? undefined : { y: [0, -15, 0] }}
          transition={isCustomIntegral ? undefined : { duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="relative h-48 w-48 md:h-64 md:w-64 lg:h-80 lg:w-80 flex items-center justify-center"
        >
          {isCustomIntegral ? (
            // Usa o novo componente IntegralMascot
            <IntegralMascot />
          ) : (
            // Mascote SVG Padrão
            <Image
              src={data.mascot}
              alt={`Mascote ${data.title}`}
              fill
              className="object-contain"
              priority
            />
          )}
        </motion.div>
      </div>

      {/* Right Column: Content */}
      <div className="relative flex flex-1 flex-col justify-center bg-white/80 p-8 backdrop-blur-sm lg:bg-transparent lg:p-12 xl:p-16">
        <div className="flex items-center gap-3">
          <span className={clsx("flex h-8 items-center rounded-full px-4 text-sm font-semibold text-white", data.themeColor)}>
            {data.age}
          </span>
        </div>

        <h3 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl lg:text-5xl">
          {data.title}
        </h3>

        <p className="mt-4 text-lg leading-relaxed text-slate-600">
          {data.description}
        </p>

        {/* Bullets */}
        <ul className="mt-8 space-y-3">
          {data.bullets.map((bullet, idx) => (
            <li key={idx} className="flex items-center text-slate-700 font-medium">
              <div className={clsx("mr-3 h-2 w-2 rounded-full", data.themeColor)} />
              {bullet}
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap items-center gap-6 border-t border-slate-100 pt-8">
          {/* Period info */}
          <div className="flex items-center gap-2 text-slate-500">
             {data.period.includes('Manhã') && <Sun className="h-5 w-5 text-amber-500" />}
             {(data.period.includes('Tarde') || data.period.includes('Contraturno')) && <Moon className="h-5 w-5 text-indigo-500" />}
             <span className="text-sm font-medium">{data.period}</span>
          </div>

          <div className="flex-1 text-right">
             <button className="group/btn inline-flex items-center text-base font-semibold text-slate-900 transition-colors hover:text-primary-blue">
               Ver detalhes
               <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
             </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
