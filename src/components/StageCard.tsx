'use client';

import { motion } from 'framer-motion';
import { Sun, Moon, ArrowRight, Apple, Dumbbell, Palette, BookOpen } from 'lucide-react';
import Image from 'next/image';
import { StageData } from '@/types';
import clsx from 'clsx';

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
          className="relative h-48 w-48 md:h-64 md:w-64 lg:h-80 lg:w-80"
        >
          {isCustomIntegral ? (
            // Visual "Universo Integral"
            <div className="relative flex h-full w-full items-center justify-center">
              {/* Círculo Central */}
              <div className="absolute h-32 w-32 rounded-full bg-yellow-200/50 backdrop-blur-sm md:h-48 md:w-48 lg:h-56 lg:w-56" />
              
              {/* Elementos Flutuantes */}
              {/* Apple - Top Right */}
              <motion.div
                animate={{ y: [0, -12, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0 }}
                className="absolute -right-2 top-0 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg md:h-20 md:w-20"
              >
                <Apple className="h-8 w-8 text-red-500 md:h-10 md:w-10" />
              </motion.div>

              {/* Dumbbell - Bottom Left */}
              <motion.div
                animate={{ y: [0, -15, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -left-4 bottom-8 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-lg md:h-18 md:w-18"
              >
                <Dumbbell className="h-7 w-7 text-blue-500 md:h-9 md:w-9" />
              </motion.div>

              {/* Palette - Top Left */}
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, 8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute left-0 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg md:h-16 md:w-16"
              >
                <Palette className="h-6 w-6 text-purple-500 md:h-8 md:w-8" />
              </motion.div>
              
              {/* Book - Bottom Right */}
               <motion.div
                animate={{ y: [0, -8, 0], rotate: [0, -3, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                className="absolute right-4 bottom-4 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-lg md:h-18 md:w-18"
              >
                <BookOpen className="h-7 w-7 text-emerald-500 md:h-9 md:w-9" />
              </motion.div>
            </div>
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
