'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import content from '@/data/content.json';

const { hero } = content;

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-50 pt-32 pb-20 lg:pt-48 lg:pb-32">
      {/* Background Decorative Blob */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 h-[500px] w-[500px] rounded-full bg-primary-blue/5 blur-[100px]" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl"
          >
            {hero.title}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="mt-6 text-lg leading-8 text-slate-600 sm:text-xl"
          >
            {hero.subtitle}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="mt-10 flex flex-col items-center justify-center gap-y-4 gap-x-6 sm:flex-row"
          >
            <button className="group relative inline-flex items-center justify-center rounded-full bg-primary-blue px-8 py-3.5 text-base font-semibold text-white transition-all duration-200 hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2">
              {hero.ctaPrimary}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            
            <button className="text-base font-semibold text-slate-900 transition-colors hover:text-primary-blue">
              {hero.ctaSecondary} <span aria-hidden="true">→</span>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
