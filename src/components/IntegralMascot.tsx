'use client';
import React from 'react';
import { Apple, Dumbbell, Palette } from 'lucide-react';

export default function IntegralMascot() {
  return (
    <div className="relative flex h-64 w-64 items-center justify-center">
      {/* Estilos de Animação Injetados (Orbitas complexas) */}
      <style jsx>{`
        @keyframes orbit-front {
          0% { transform: rotate(0deg) translateX(100px) rotate(0deg) scale(1); z-index: 20; }
          49% { z-index: 20; }
          50% { transform: rotate(180deg) translateX(100px) rotate(-180deg) scale(0.7); z-index: 0; }
          99% { z-index: 0; }
          100% { transform: rotate(360deg) translateX(100px) rotate(-360deg) scale(1); z-index: 20; }
        }
        @keyframes orbit-back {
           0% { transform: rotate(180deg) translateX(100px) rotate(-180deg) scale(0.7); z-index: 0; }
           49% { z-index: 0; }
           50% { transform: rotate(360deg) translateX(100px) rotate(-360deg) scale(1); z-index: 20; }
           99% { z-index: 20; }
           100% { transform: rotate(540deg) translateX(100px) rotate(-540deg) scale(0.7); z-index: 0; }
        }
        .atom-path {
           position: absolute;
           top: 50%;
           left: 50%;
           width: 0px; 
           height: 0px;
        }
        .icon-wrapper {
           position: absolute;
           top: -24px; /* Metade do tamanho do ícone para centralizar */
           left: -24px;
           width: 48px;
           height: 48px;
           background: white;
           border-radius: 50%;
           display: flex;
           align-items: center;
           justify-content: center;
           box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
      `}</style>

      {/* NÚCLEO (SOL) */}
      <div className="relative z-10 h-24 w-24 rounded-full bg-yellow-400 shadow-[0_0_40px_rgba(250,204,21,0.6)] animate-pulse flex items-center justify-center">
        <div className="h-20 w-20 rounded-full bg-yellow-300 opacity-90" />
      </div>

      {/* ÓRBITA 1: Esporte (Haltere) - Diagonal 1 */}
      <div className="atom-path" style={{ transform: 'rotate(60deg)' }}>
        <div className="icon-wrapper" style={{ animation: 'orbit-front 4s linear infinite' }}>
           <Dumbbell className="text-blue-500 w-6 h-6" />
        </div>
      </div>

      {/* ÓRBITA 2: Nutrição (Maçã) - Diagonal 2 */}
      <div className="atom-path" style={{ transform: 'rotate(-60deg)' }}>
        <div className="icon-wrapper" style={{ animation: 'orbit-back 4s linear infinite' }}>
           <Apple className="text-red-500 w-6 h-6" />
        </div>
      </div>

      {/* ÓRBITA 3: Arte (Paleta) - Horizontal */}
      <div className="atom-path" style={{ transform: 'rotate(0deg)' }}>
         <div className="icon-wrapper" style={{ animation: 'orbit-front 5s linear infinite reverse' }}>
           <Palette className="text-purple-500 w-6 h-6" />
        </div>
      </div>

    </div>
  );
}
