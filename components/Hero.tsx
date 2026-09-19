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
      {/* 📱 1. VISTA MÓVIL (< 1024px)                               */}
      {/* Banner unificado: imagen completa de fondo sin difuminar,  */}
      {/* con el texto editorial directamente encima y el perrito     */}
      {/* completamente libre y visible abajo.                      */}
      {/* ========================================================= */}
      {/* ========================================================= */}
      {/* 📱 1. VISTA MÓVIL (< 1024px)                               */}
      {/* Banner panorámico completo: imagen ajustada a la pantalla  */}
      {/* 100% visible sin recortar laterales ni mascotas            */}
      {/* ========================================================= */}
      <div className="relative block lg:hidden w-full min-h-[480px] sm:min-h-[520px] flex flex-col justify-between pt-14 sm:pt-16 pb-2 sm:pb-3 px-4 sm:px-6 overflow-hidden">
        
        {/* Fondo Fotográfico Vertical Completo — Adaptado a móvil 100% sin recortes de mascotas */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-pet-livingroom-mobile.jpg"
            alt="Todo lo que necesitan. En un solo lugar. — VetCare & Pet Gourmet"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_60%]"
          />
          {/* Sutil viñeta para asegurar legibilidad óptima sobre el fondo */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5]/60 via-transparent to-black/10 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5]/85 via-[#FAF8F5]/40 to-transparent pointer-events-none w-4/5" />
        </div>

        {/* Contenido Editorial — Espaciado superior balanceado */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 max-w-[260px] sm:max-w-xs pt-16 sm:pt-20 text-left"
        >
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0D3D20] leading-[1.18] mb-2 drop-shadow-[0_1px_2px_rgba(255,255,255,0.95)]">
            Todo lo que <br />
            necesitan <br />
            <span className="text-[#1A6B38] font-extrabold">
              En un solo lugar
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-stone-800 leading-relaxed font-semibold mb-4 max-w-[240px] drop-shadow-[0_1px_1px_rgba(255,255,255,0.95)]">
            Productos premium. Cuidado experto. <br />
            Mascotas felices, todos los días.
          </p>

          <div>
            <a
              href="#petshop"
              onClick={handleShopNow}
              className="inline-flex items-center justify-center px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-[#2F4635] hover:bg-[#1E3023] text-white font-extrabold text-xs sm:text-sm tracking-wide shadow-md shadow-[#2F4635]/20 active:scale-95 transition-all cursor-pointer group"
            >
              <span>Comprar Ahora</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1 text-white/90" />
            </a>
          </div>
        </motion.div>

        {/* Barra Inferior: 4 Iconos Táctiles con Funcionamiento Desplegable */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 max-w-md mx-auto w-full mt-auto pt-6 pb-0.5"
        >
          <div className="w-full bg-[#FAF8F5]/95 backdrop-blur-md rounded-2xl border border-stone-200/90 shadow-md p-2 sm:p-2.5">
            {/* Fila Horizontal de 4 Iconos Táctiles */}
            <div className="grid grid-cols-4 gap-2">
              {trustPillars.map((pillar, idx) => {
                const IconComponent = pillar.icon;
                const isSelected = activePillar === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActivePillar(isSelected ? null : idx)}
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

            {/* Panel Desplegable interactivo */}
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
                  <div className="mt-2.5 pt-2.5 border-t border-stone-200/70 flex items-center justify-between gap-2 px-1">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-7 h-7 rounded-lg bg-[#2F4635]/10 text-[#2F4635] flex items-center justify-center shrink-0">
                        {React.createElement(trustPillars[activePillar].icon, { className: 'w-4 h-4 stroke-[2]' })}
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
                        e.preventDefault();
                        e.stopPropagation();
                        setActivePillar(null);
                      }}
                      className="w-8 h-8 rounded-full bg-stone-200/70 hover:bg-stone-300/80 active:bg-stone-300 text-stone-700 flex items-center justify-center transition-colors shrink-0 cursor-pointer shadow-2xs"
                      aria-label="Cerrar detalle"
                    >
                      <X className="w-4 h-4 stroke-[2.5]" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* ========================================================= */}
      {/* 🖥️ 2. VISTA DE ESCRITORIO (hidden lg:flex)                 */}
      {/* Diseño panorámico de pantalla ancha preservado            */}
      {/* ========================================================= */}
      <div className="hidden lg:flex relative w-full min-h-[720px] xl:min-h-[800px] 2xl:min-h-[860px] flex-col justify-between pt-24 xl:pt-28 pb-8 overflow-hidden">
        
        {/* Fondo Panorámico Fotográfico */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-pet-livingroom.jpg"
            alt="Todo lo que necesitan. En un solo lugar. — VetCare & Pet Gourmet"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[60%_15%]"
          />
          {/* Degradado transparente suave para contraste natural sin blanquear la foto */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5]/40 via-transparent to-transparent w-1/2 pointer-events-none" />
        </div>

        {/* Contenido Editorial Superior en Pared Despejada */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full pt-2"
        >
          <div className="max-w-xl">
            
            <h1 className="text-4xl lg:text-5xl xl:text-[3.2rem] font-extrabold tracking-tight text-[#0D3D20] leading-[1.15] mb-3">
              Todo lo que <br />
              necesitan <br />
              <span className="text-[#1A6B38] font-extrabold">
                En un solo lugar
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
        </motion.div>

        {/* Barra Flotante Inferior de 4 Iconos — Solo iconos interactivos como en móvil */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 max-w-2xl xl:max-w-3xl mx-auto w-full px-6 lg:px-8 mt-8"
        >
          <div className="w-full bg-[#FAF8F5]/95 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-stone-200/90 shadow-xl shadow-stone-900/5 p-2.5 sm:p-3">
            {/* Fila Horizontal de 4 Iconos Interactivos */}
            <div className="grid grid-cols-4 gap-3 sm:gap-4">
              {trustPillars.map((pillar, idx) => {
                const IconComponent = pillar.icon;
                const isSelected = activePillar === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActivePillar(isSelected ? null : idx)}
                    className={`h-12 sm:h-13 rounded-2xl flex items-center justify-center transition-all cursor-pointer active:scale-95 ${
                      isSelected
                        ? 'bg-[#2F4635] text-white shadow-md scale-[1.02] ring-2 ring-[#2F4635]/20'
                        : 'bg-white/90 hover:bg-white text-[#2F4635] border border-stone-200/70 shadow-2xs hover:scale-102'
                    }`}
                    aria-label={pillar.title}
                    title={pillar.title}
                  >
                    <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.8]" />
                  </button>
                );
              })}
            </div>

            {/* Panel Desplegable interactivo */}
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
                  <div className="mt-2.5 pt-2.5 border-t border-stone-200/70 flex items-center justify-between gap-3 px-2">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-[#2F4635]/10 text-[#2F4635] flex items-center justify-center shrink-0">
                        {React.createElement(trustPillars[activePillar].icon, { className: 'w-4 h-4 stroke-[2]' })}
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs sm:text-sm font-extrabold text-[#172B1E] leading-tight">
                          {trustPillars[activePillar].title}
                        </h4>
                        <p className="text-[11px] sm:text-xs text-stone-600 font-medium leading-snug mt-0.5">
                          {trustPillars[activePillar].description}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setActivePillar(null);
                      }}
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-stone-200/70 hover:bg-stone-300 active:bg-stone-400 text-stone-700 flex items-center justify-center transition-colors shrink-0 cursor-pointer shadow-2xs"
                      aria-label="Cerrar detalle"
                    >
                      <X className="w-4 h-4 stroke-[2.5]" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

      </div>

    </section>
  );
}
