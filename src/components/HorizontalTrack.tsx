'use client';

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import StageCard from "./StageCard";
import content from "@/data/content.json";

export default function HorizontalTrack() {
  const targetRef = useRef<HTMLDivElement>(null); 
  const scrollRef = useRef<HTMLDivElement>(null); 
  const [maxScroll, setMaxScroll] = useState(0);

  const updateScroll = useCallback(() => {
    if (scrollRef.current) {
      const totalWidth = scrollRef.current.scrollWidth;
      const viewPortWidth = window.innerWidth; 
      setMaxScroll(totalWidth - viewPortWidth);
    }
  }, []);

  useEffect(() => {
    updateScroll();
    const resizeObserver = new ResizeObserver(updateScroll);
    if (scrollRef.current) resizeObserver.observe(scrollRef.current);
    window.addEventListener("resize", updateScroll);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateScroll);
    };
  }, [updateScroll]);

  const { scrollYProgress } = useScroll({ target: targetRef });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Mapeia o scroll vertical para o horizontal
  const x = useTransform(smoothProgress, [0, 0.9, 1], ["0px", `-${maxScroll}px`, `-${maxScroll}px`]);

  // FUNÇÃO MÁGICA DE ENQUADRAMENTO
  const scrollToCard = (cardIndex: number) => {
    if (!targetRef.current || !scrollRef.current) return;

    // Calcula onde o texto do card (75% da largura do card) deve ficar no centro da tela
    const cards = scrollRef.current.querySelectorAll('.card-wrapper');
    const targetCard = cards[cardIndex] as HTMLElement;
    
    if (targetCard) {
      const cardOffset = targetCard.offsetLeft;
      const cardWidth = targetCard.offsetWidth;
      // O alvo é centralizar a coluna de texto (lado direito do card)
      const targetX = (cardOffset + cardWidth * 0.75) - (window.innerWidth / 2);
      
      // Converte esse X horizontal de volta para a posição Y do scroll da página
      const progressNeeded = (targetX / maxScroll) * 0.9;
      const sectionTop = targetRef.current.offsetTop;
      const sectionHeight = targetRef.current.offsetHeight - window.innerHeight;
      
      window.scrollTo({
        top: sectionTop + (progressNeeded * sectionHeight),
        behavior: 'smooth'
      });
    }
  };

  return (
    <section ref={targetRef} className="relative h-[500vh] bg-slate-50">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div 
          ref={scrollRef} 
          style={{ x }} 
          className="inline-flex flex-row flex-nowrap items-center gap-12 h-full"
        >
          <div className="flex-none w-12" /> {/* Spacer inicial */}
          
          {content.stages.map((stage, index) => (
            <div key={stage.id} className="card-wrapper flex-none block"> 
              <StageCard 
                data={stage} 
                onOpen={() => scrollToCard(index)} 
              />
            </div>
          ))}

          <div className="flex-none w-12" /> {/* Spacer final */}
        </motion.div>
      </div>
    </section>
  );
}