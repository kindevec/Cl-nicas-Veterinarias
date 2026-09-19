'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ServiceCard {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  bgHex: string;
  targetSection: string;
  subTarget?: string;
}

const SERVICE_CARDS: ServiceCard[] = [
  {
    id: 'puppy-essentials',
    title: 'Esenciales Cachorros',
    subtitle: 'Todo para su mejor comienzo de vida',
    image: 'https://images.unsplash.com/photo-1591160690555-5debfba289f0?auto=format&fit=crop&w=600&q=85',
    bgHex: '#F8F3ED',
    targetSection: 'servicios',
    subTarget: 'vacunacion-inmunologia',
  },
  {
    id: 'cat-comforts',
    title: 'Confort Felino',
    subtitle: 'Acogedor, limpio y aprobado por gatos',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=85',
    bgHex: '#ECEEF0',
    targetSection: 'servicios',
    subTarget: 'grooming-spa-dermato',
  },
  {
    id: 'senior-care',
    title: 'Cuidado Senior',
    subtitle: 'Atención delicada para sus años dorados',
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=600&q=85',
    bgHex: '#E1E7ED',
    targetSection: 'servicios',
    subTarget: 'consulta-especializada',
  },
  {
    id: 'adventure-ready',
    title: 'Listos para Aventura',
    subtitle: 'Equipados para cada paseo y excursión',
    image: 'https://images.unsplash.com/photo-1546975490-e8b92a360b24?auto=format&fit=crop&w=600&q=85',
    bgHex: '#F6EFE6',
    targetSection: 'petshop',
    subTarget: 'accesorios',
  },
];

interface FeaturedServicesBannerProps {
  onNavigate?: (sectionId: string, subTarget?: string) => void;
  onSelectServiceForBooking?: (serviceName: string) => void;
}

export function FeaturedServicesBanner({
  onNavigate,
  onSelectServiceForBooking,
}: FeaturedServicesBannerProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);
  const hasMoved = useRef(false);

  const checkScrollLimits = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    const cardEls = el.querySelectorAll<HTMLElement>('[data-carousel-card]');
    if (cardEls.length === 0) return;
    
    const containerCenter = scrollLeft + clientWidth / 2;
    let closestIndex = 0;
    let minDistance = Infinity;
    cardEls.forEach((card, idx) => {
      const cardCenter = card.offsetLeft + card.clientWidth / 2;
      const dist = Math.abs(containerCenter - cardCenter);
      if (dist < minDistance) {
        minDistance = dist;
        closestIndex = idx;
      }
    });
    setCurrentIndex(closestIndex);
  }, []);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    checkScrollLimits();
    el.addEventListener('scroll', checkScrollLimits, { passive: true });
    window.addEventListener('resize', checkScrollLimits);
    return () => {
      el.removeEventListener('scroll', checkScrollLimits);
      window.removeEventListener('resize', checkScrollLimits);
    };
  }, [checkScrollLimits]);

  const scrollToIndex = (index: number) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const cardEls = el.querySelectorAll<HTMLElement>('[data-carousel-card]');
    if (cardEls[index]) {
      const card = cardEls[index];
      const offsetLeft = card.offsetLeft - (el.clientWidth - card.clientWidth) / 2;
      el.scrollTo({
        left: Math.max(0, offsetLeft),
        behavior: 'smooth',
      });
      setCurrentIndex(index);
    }
  };

  const scrollDirection = (direction: 'left' | 'right') => {
    const nextIndex = direction === 'left' 
      ? Math.max(0, currentIndex - 1) 
      : Math.min(SERVICE_CARDS.length - 1, currentIndex + 1);
    scrollToIndex(nextIndex);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    isDragging.current = true;
    hasMoved.current = false;
    startX.current = e.pageX - scrollContainerRef.current.offsetLeft;
    scrollLeftStart.current = scrollContainerRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollContainerRef.current) return;
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    if (Math.abs(walk) > 6) {
      hasMoved.current = true;
    }
    scrollContainerRef.current.scrollLeft = scrollLeftStart.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDragging.current = false;
  };

  const handleCardClick = (card: ServiceCard) => {
    if (hasMoved.current) return;
    if (onNavigate) {
      onNavigate(card.targetSection, card.subTarget);
    } else {
      const el = document.getElementById(card.targetSection);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full bg-[#FAFBF7] py-4 sm:py-6 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative">
        
        {/* Contenedor Carrusel Horizontal en Móvil/Tablet & Grid de 4 Columnas en Desktop */}
        <div
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          className="flex lg:grid lg:grid-cols-4 gap-3.5 sm:gap-4 lg:gap-5 overflow-x-auto lg:overflow-visible snap-x snap-mandatory scroll-smooth pb-1 lg:pb-0 cursor-grab active:cursor-grabbing [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {SERVICE_CARDS.map((card, idx) => (
            <motion.div
              key={card.id}
              data-carousel-card
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              style={{ backgroundColor: card.bgHex }}
              onClick={() => handleCardClick(card)}
              className="relative rounded-[22px] sm:rounded-[26px] p-4.5 sm:p-5 overflow-hidden flex justify-between min-h-[190px] sm:min-h-[205px] border border-stone-200/60 shadow-xs hover:shadow-md transition-all duration-300 group w-full min-w-full max-w-full sm:w-[85vw] sm:min-w-0 sm:max-w-[360px] lg:w-auto lg:max-w-none shrink-0 snap-center lg:shrink cursor-pointer select-none"
            >
              {/* Contenido Editorial a la Izquierda */}
              <div className="flex flex-col justify-between z-10 w-[58%] min-w-0 pr-2">
                <div>
                  <h3 className="font-extrabold text-lg sm:text-xl text-[#182B1E] leading-tight mb-2 tracking-tight">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-stone-600 font-medium leading-snug">
                    {card.subtitle}
                  </p>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCardClick(card);
                    }}
                    className="inline-flex items-center justify-center px-5 py-2 sm:py-2.5 rounded-full bg-[#2F4635] hover:bg-[#203124] text-white text-xs sm:text-sm font-semibold shadow-xs hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  >
                    Explorar
                  </button>
                </div>
              </div>

              {/* Imagen a la Derecha que se fusiona con la tarjeta */}
              <div className="absolute right-0 top-0 bottom-0 w-[45%] pointer-events-none flex items-end justify-end overflow-hidden">
                <div className="relative w-full h-full">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(max-width: 640px) 160px, 220px"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500 rounded-br-[24px] sm:rounded-br-[28px]"
                  />
                  {/* Desvanecimiento suave en el borde izquierdo de la imagen */}
                  <div 
                    className="absolute inset-y-0 left-0 w-8 pointer-events-none"
                    style={{
                      background: `linear-gradient(to right, ${card.bgHex}, transparent)`
                    }}
                  />
                </div>
              </div>

            </motion.div>
          ))}
        </div>

        {/* Controles de Navegación del Carrusel en Móvil / Tablet (< 1024px) */}
        <div className="flex lg:hidden items-center justify-between px-2 pt-3">
          {/* Flecha Anterior */}
          <button
            type="button"
            onClick={() => scrollDirection('left')}
            disabled={!canScrollLeft}
            aria-label="Anterior servicio"
            className={`w-11 h-11 rounded-full bg-white border border-stone-200 shadow-2xs flex items-center justify-center text-stone-700 transition-all active:scale-95 cursor-pointer ${
              canScrollLeft
                ? 'hover:bg-[#2F4635] hover:text-white opacity-100'
                : 'opacity-30 cursor-not-allowed'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Indicadores de Paginación (Dots) */}
          <div className="flex items-center gap-1">
            {SERVICE_CARDS.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => scrollToIndex(idx)}
                className="py-3 px-1 cursor-pointer flex items-center justify-center"
                aria-label={`Ir al bloque ${idx + 1}`}
              >
                <span
                  className={`h-2 rounded-full block transition-all duration-300 ${
                    currentIndex === idx
                      ? 'w-6 bg-[#2F4635]'
                      : 'w-2 bg-stone-300 hover:bg-stone-400'
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Flecha Siguiente */}
          <button
            type="button"
            onClick={() => scrollDirection('right')}
            disabled={!canScrollRight}
            aria-label="Siguiente servicio"
            className={`w-11 h-11 rounded-full bg-white border border-stone-200 shadow-2xs flex items-center justify-center text-stone-700 transition-all active:scale-95 cursor-pointer ${
              canScrollRight
                ? 'hover:bg-[#2F4635] hover:text-white opacity-100'
                : 'opacity-30 cursor-not-allowed'
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </motion.section>
  );
}
