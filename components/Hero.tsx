'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Award,
  Cog, 
  Truck, 
  Shield,
  ArrowRight,
  Stethoscope,
  X
} from 'lucide-react';

interface HeroProps {
  onSelectServiceForBooking: (serviceName: string) => void;
  onNavigate?: (sectionId: string, subTarget?: string) => void;
}

export function Hero({ onSelectServiceForBooking, onNavigate }: HeroProps) {
  const [activePillar, setActivePillar] = useState<number | null>(null);

  const handleShopNow = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('petshop');
    } else {
      const el = document.getElementById('petshop');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleBooking = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('citas');
    } else {
      const el = document.getElementById('citas');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const trustPillars = [
    {
      icon: Award,
      title: 'Calidad Seleccionada',
      description: 'Curada por expertos',
    },
    {
      icon: Cog,
      title: 'Garantía Pet-Safe',
      description: '100% testada y segura',
    },
    {
      icon: Truck,
      title: 'Rápido & Confiable',
      description: 'Entrega ágil a tu puerta',
    },
    {
      icon: Shield,
      title: 'Amado por Mascotas',
      description: 'Colitas y ronroneos felices',
    },
  ];

  return (
    <section 
      id="inicio" 
      className="relative w-full bg-[#FAFBF7] text-slate-900 selection:bg-emerald-100 selection:text-emerald-950 overflow-hidden"
    >

      {/* ========================================================= */}
      {/* 📱 1. VISTA MÓVIL BESPOKE (< 1024px)                       */}
      {/* Diseño compacto sin espacios vacíos, imagen inmersiva      */}
      {/* y barra táctil de 4 iconos con contenido expandible       */}
      {/* ========================================================= */}
      <div className="relative block lg:hidden w-full pt-16 sm:pt-20 pb-4 sm:pb-5 px-4 sm:px-6 overflow-hidden">
        
        {/* Imagen de Fondo Inmersiva */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-pet-livingroom.jpg"
            alt="Todo lo que necesitan. En un solo lugar. — VetCare & Pet Gourmet"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[62%_25%]"
          />
          {/* Capas de degradado para máximo contraste tipográfico superior y transición limpia inferior */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAFBF7]/95 via-[#FAFBF7]/85 via-50% to-[#FAFBF7]/40 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAFBF7]/80 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Contenido: Titular, Botones de Acción y 4 Iconos Compactos */}
        <div className="relative z-10 max-w-md mx-auto w-full space-y-3.5">
          <div className="space-y-1">
            <h1 className="text-[1.85rem] sm:text-3xl font-extrabold tracking-tight text-[#0D3D20] leading-[1.12]">
              Todo lo que necesitan. <br />
              <span className="text-[#1A6B38] font-extrabold">
                En un solo lugar.
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-stone-800 leading-snug font-semibold pt-0.5 max-w-sm">
              Atención médica Fear-Free y nutrición gourmet seleccionada para el bienestar de tu mascota.
            </p>
          </div>

          {/* Botones de Acción Ergonómicos al Pulgar (Dual CTA) */}
          <div className="grid grid-cols-2 gap-2 pt-0.5">
            <a
              href="#petshop"
              onClick={handleShopNow}
              className="inline-flex items-center justify-center h-10.5 px-3 rounded-full bg-[#2F4635] hover:bg-[#1E3023] text-white font-bold text-xs tracking-wide shadow-md shadow-[#2F4635]/20 active:scale-95 transition-all cursor-pointer"
            >
              <span>Explorar Tienda</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </a>

            <a
              href="#citas"
              onClick={handleBooking}
              className="inline-flex items-center justify-center h-10.5 px-3 rounded-full bg-white/95 hover:bg-white text-[#0D3D20] font-bold text-xs tracking-wide border border-stone-300 shadow-2xs backdrop-blur-sm active:scale-95 transition-all cursor-pointer"
            >
              <Stethoscope className="w-3.5 h-3.5 mr-1.5 text-[#2F4635]" />
              <span>Agendar Cita</span>
            </a>
          </div>

          {/* Barra: 4 Iconos en una Sola Línea Horizontal con Expansión Interactiva */}
          <div className="pt-1">
            <div className="w-full bg-[#FAF8F5]/92 backdrop-blur-md rounded-2xl border border-stone-200/90 shadow-md p-2 sm:p-2.5">
              {/* Fila Horizontal de 4 Iconos (Sin palabras) */}
              <div className="grid grid-cols-4 gap-2">
                {trustPillars.map((pillar, idx) => {
                  const IconComponent = pillar.icon;
                  const isSelected = activePillar === idx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActivePillar(isSelected ? null : idx)}
                      onMouseEnter={() => setActivePillar(idx)}
                      className={`h-10 sm:h-11 rounded-xl flex items-center justify-center transition-all cursor-pointer active:scale-95 ${
                        isSelected
                          ? 'bg-[#2F4635] text-white shadow-md scale-[1.02] ring-2 ring-[#2F4635]/20'
                          : 'bg-white/90 hover:bg-white text-[#2F4635] border border-stone-200/70 shadow-2xs hover:scale-102'
                      }`}
                      aria-label={pillar.title}
                      title={pillar.title}
                    >
                      <IconComponent className="w-5 h-5 stroke-[2]" />
                    </button>
                  );
                })}
              </div>

              {/* Contenido Expandible al hacer Clic o Hover */}
              <AnimatePresence mode="wait">
                {activePillar !== null && (
                  <motion.div
                    key={activePillar}
                    initial={{ opacity: 0, height: 0, y: -6 }}
                    animate={{ opacity: 1, height: 'auto', y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -4 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="overflow-hidden"
                  >
                    <div className="mt-2 pt-2 border-t border-stone-200/70 flex items-start justify-between gap-2 px-1">
                      <div className="flex items-start gap-2.5 min-w-0">
                        <div className="w-6 h-6 rounded-lg bg-[#2F4635]/10 text-[#2F4635] flex items-center justify-center shrink-0 mt-0.5">
                          {React.createElement(trustPillars[activePillar].icon, { className: 'w-3.5 h-3.5 stroke-[2]' })}
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs font-extrabold text-[#172B1E] leading-tight">
                            {trustPillars[activePillar].title}
                          </h4>
                          <p className="text-[11px] text-stone-600 font-medium leading-snug mt-0.5">
                            {trustPillars[activePillar].description}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActivePillar(null);
                        }}
                        className="text-stone-400 hover:text-stone-700 p-1 rounded-full hover:bg-stone-100 transition-colors shrink-0 cursor-pointer"
                        aria-label="Cerrar detalle"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 🖥️ 2. VISTA DE ESCRITORIO (hidden lg:flex)                 */}
      {/* Diseño panorámico de pantalla ancha preservado            */}
      {/* ========================================================= */}
      <div className="hidden lg:flex relative w-full min-h-[580px] xl:min-h-[620px] flex-col justify-between pt-24 pb-6 overflow-hidden">
        
        {/* Fondo Panorámico Fotográfico */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-pet-livingroom.jpg"
            alt="Todo lo que necesitan. En un solo lugar. — VetCare & Pet Gourmet"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[60%_8%]"
          />
          {/* Degradado transparente suave para contraste óptimo */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5]/40 via-transparent to-transparent w-1/2 pointer-events-none" />
        </div>

        {/* Contenido Editorial Superior en Pared Despejada */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full pt-2">
          <div className="max-w-xl">
            
            <h1 className="text-4xl lg:text-5xl xl:text-[3.4rem] font-extrabold tracking-tight text-[#0D3D20] leading-[1.12] mb-3">
              Todo lo que necesitan. <br />
              <span className="text-[#1A6B38] font-extrabold">
                En un solo lugar.
              </span>
            </h1>

            <p className="text-base lg:text-lg text-slate-800 leading-relaxed font-medium mb-5 max-w-md">
              Productos premium. Cuidado experto. <br />
              Mascotas felices, todos los días.
            </p>

            <div className="flex items-center gap-4">
              <a
                href="#petshop"
                onClick={handleShopNow}
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[#2F4635] hover:bg-[#1E3023] text-white font-bold text-sm tracking-wide shadow-lg shadow-[#2F4635]/20 hover:shadow-xl hover:scale-105 active:scale-98 transition-all cursor-pointer group"
              >
                <span>Comprar Ahora</span>
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1 text-white/90" />
              </a>
            </div>

          </div>
        </div>

        {/* Barra Flotante Inferior de 4 Pilares de Confianza */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full mt-8">
          <div className="w-full bg-[#FAF8F5]/95 backdrop-blur-md rounded-3xl border border-stone-200/80 shadow-xl shadow-stone-900/5 px-6 py-3.5">
            <div className="flex flex-row items-center justify-between">
              {trustPillars.map((pillar, idx) => {
                const IconComponent = pillar.icon;
                return (
                  <React.Fragment key={idx}>
                    <div className="flex items-center gap-4 px-5 flex-1 min-w-0">
                      <IconComponent className="w-8 h-8 text-[#2F4635] shrink-0 stroke-[1.6]" />
                      <div className="min-w-0">
                        <h3 className="text-sm font-bold text-[#172B1E] leading-tight tracking-tight">
                          {pillar.title}
                        </h3>
                        <p className="text-xs text-stone-600 font-medium leading-snug mt-0.5">
                          {pillar.description}
                        </p>
                      </div>
                    </div>

                    {/* Línea divisoria vertical parcial */}
                    {idx < trustPillars.length - 1 && (
                      <div className="w-[1px] h-8 bg-stone-300/80 shrink-0 self-center mx-1" />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>

      </div>

    </section>
  );
}
