'use client';
import React from 'react';
import { Apple, Dumbbell, Palette, BookOpen, Music, Puzzle } from 'lucide-react';

export default function IntegralMascot() {
  return (
    <div className="relative flex h-64 w-64 items-center justify-center pointer-events-none select-none">
      {/* Definição das Animações */}
      <style jsx>{`
        @keyframes orbit-cw {
          0% { transform: rotate(0deg) translateX(110px) rotate(0deg) scale(1); z-index: 20; }
          49% { z-index: 20; }
          50% { transform: rotate(180deg) translateX(110px) rotate(-180deg) scale(0.6); z-index: 0; }
          99% { z-index: 0; }
          100% { transform: rotate(360deg) translateX(110px) rotate(-360deg) scale(1); z-index: 20; }
        }
        @keyframes orbit-ccw {
           0% { transform: rotate(360deg) translateX(110px) rotate(-360deg) scale(1); z-index: 20; }
           49% { z-index: 20; }
           50% { transform: rotate(180deg) translateX(110px) rotate(-180deg) scale(0.6); z-index: 0; }
           99% { z-index: 0; }
           100% { transform: rotate(0deg) translateX(110px) rotate(0deg) scale(1); z-index: 20; }
        }
        .atom-path {
           position: absolute;
           top: 50%;
           left: 50%;
           width: 0px; 
           height: 0px;
        }
        .icon-bubble {
           position: absolute;
           top: -20px;
           left: -20px;
           width: 40px;
           height: 40px;
           background: white;
           border-radius: 50%;
           display: flex;
           align-items: center;
           justify-content: center;
           box-shadow: 0 4px 15px rgba(0,0,0,0.08);
           border: 1px solid rgba(255,255,255,0.8);
        }
      `}</style>

      {/* NÚCLEO (SOL) */}
      <div className="relative z-10 h-20 w-20 rounded-full bg-yellow-400 shadow-[0_0_50px_rgba(250,204,21,0.5)] animate-pulse flex items-center justify-center">
        <div className="h-16 w-16 rounded-full bg-yellow-300 opacity-80 blur-sm" />
      </div>

      {/* --- GRUPO 1: Sentido Horário --- */}
      
      {/* Esporte (Azul) - Diagonal */}
      <div className="atom-path" style={{ transform: 'rotate(60deg)' }}>
        <div className="icon-bubble" style={{ animation: 'orbit-cw 5s linear infinite' }}>
           <Dumbbell className="text-blue-500 w-5 h-5" strokeWidth={2.5} />
        </div>
      </div>

      {/* Nutrição (Vermelho) - Diagonal Inversa */}
      <div className="atom-path" style={{ transform: 'rotate(-60deg)' }}>
        <div className="icon-bubble" style={{ animation: 'orbit-cw 6s linear infinite', animationDelay: '-1s' }}>
           <Apple className="text-red-500 w-5 h-5" strokeWidth={2.5} />
        </div>
      </div>

      {/* Artes (Roxo) - Horizontal */}
      <div className="atom-path" style={{ transform: 'rotate(0deg)' }}>
         <div className="icon-bubble" style={{ animation: 'orbit-cw 7s linear infinite', animationDelay: '-2s' }}>
           <Palette className="text-purple-500 w-5 h-5" strokeWidth={2.5} />
        </div>
      </div>

      {/* --- GRUPO 2: Sentido Anti-Horário (Para dar caos organizado) --- */}

      {/* Estudo (Indigo) - Vertical */}
      <div className="atom-path" style={{ transform: 'rotate(90deg)' }}>
         <div className="icon-bubble" style={{ animation: 'orbit-ccw 5.5s linear infinite', animationDelay: '-0.5s' }}>
           <BookOpen className="text-indigo-600 w-5 h-5" strokeWidth={2.5} />
        </div>
      </div>

      {/* Música (Rosa) - Diagonal Suave */}
      <div className="atom-path" style={{ transform: 'rotate(30deg)' }}>
         <div className="icon-bubble" style={{ animation: 'orbit-ccw 6.5s linear infinite', animationDelay: '-1.5s' }}>
           <Music className="text-pink-500 w-5 h-5" strokeWidth={2.5} />
        </div>
      </div>

       {/* Lógica (Verde) - Diagonal Suave Inversa */}
      <div className="atom-path" style={{ transform: 'rotate(-30deg)' }}>
         <div className="icon-bubble" style={{ animation: 'orbit-ccw 4.5s linear infinite', animationDelay: '-2.5s' }}>
           <Puzzle className="text-green-500 w-5 h-5" strokeWidth={2.5} />
        </div>
      </div>

    </div>
  );
}
