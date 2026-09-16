'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { 
  Heart,
  ShieldCheck, 
  Calendar,
  ArrowDown,
  HeartHandshake
} from 'lucide-react';

interface HeroProps {
  onSelectServiceForBooking: (serviceName: string) => void;
  onNavigate?: (sectionId: string, subTarget?: string) => void;
}

export function Hero({ onSelectServiceForBooking, onNavigate }: HeroProps) {
  const handleScrollToServices = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('servicios');
    } else {
      const el = document.getElementById('servicios');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section 
      id="hero" 
      className="relative w-full pt-28 sm:pt-36 lg:pt-40 pb-12 sm:pb-16 lg:pb-20 overflow-hidden bg-[#FAF9F5] text-slate-900 selection:bg-emerald-100 selection:text-emerald-950"
    >
      {/* Dynamic Warm Ambient Lighting & Organic Gradient Blooms */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 left-1/4 w-[500px] h-[500px] bg-amber-200/25 rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-5 w-[550px] h-[550px] bg-emerald-100/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 left-10 w-[450px] h-[450px] bg-orange-100/35 rounded-full blur-3xl" />
        {/* Subtle decorative dot pattern */}
        <div className="absolute inset-0 bg-paw-pattern opacity-[0.25]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* =========================================================================
              COLUMNA IZQUIERDA: MENSAJE PRINCIPAL & LLAMADOS A LA ACCIÓN
              ========================================================================= */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            
            {/* 1. Insignia Superior de Atención Compasiva */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 border border-slate-200/80 shadow-2xs text-[#0D3D20] text-xs font-bold uppercase tracking-wider w-fit mb-5"
            >
              <Heart className="w-3.5 h-3.5 text-[#E05A47] fill-[#E05A47]" />
              <span>Atención Veterinaria Compasiva &amp; Avanzada</span>
            </motion.div>

            {/* 2. Titular Principal con Acentos Editoriales */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="text-4xl sm:text-5xl lg:text-[3.6rem] xl:text-[4rem] font-extrabold tracking-tight text-[#0D3D20] leading-[1.12] mb-5 font-sans"
            >
              Cuidado Veterinario <br />
              Compasivo para{' '}
              <span className="font-serif italic font-normal text-[#E05A47] tracking-normal">
                Cada
              </span> <br className="hidden sm:inline" />
              <span className="font-serif italic font-normal text-[#E05A47] tracking-normal">
                Etapa
              </span>{' '}
              de tu Mascota
            </motion.h1>

            {/* 3. Subtítulo Descriptivo de Alto Impacto */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.16 }}
              className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl font-normal mb-8"
            >
              Chequeos preventivos, urgencias 24/7, cirugía especializada, nutrición biológica y protocolos Fear-Free™ sin estrés — todo en un entorno cálido, humano y moderno.
            </motion.p>

            {/* 4. Botones de Acción (CTA) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.24 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8 sm:mb-10"
            >
              <a
                href="#citas"
                onClick={(e) => {
                  e.preventDefault();
                  onSelectServiceForBooking('Consulta Médica Especializada');
                }}
                className="px-7 py-3.5 rounded-full bg-[#E05A47] hover:bg-[#cc4836] text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md shadow-[#E05A47]/25 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-white" />
                <span>Agendar Cita Médica</span>
              </a>

              <a
                href="#servicios"
                onClick={handleScrollToServices}
                className="px-7 py-3.5 rounded-full bg-white hover:bg-slate-50 border border-slate-300/90 text-[#0D3D20] font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-2xs hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Nuestros Servicios</span>
                <ArrowDown className="w-4 h-4 text-[#0D3D20]" />
              </a>
            </motion.div>

            {/* 5. Pastilla de Sellos de Confianza (Trust Strip) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.32 }}
              className="inline-flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 px-5 py-3.5 rounded-2xl bg-white/95 border border-slate-200/80 shadow-2xs backdrop-blur-xs text-xs font-semibold text-slate-700 w-fit"
            >
              <div className="flex items-center gap-2">
                <span className="text-base leading-none">🐾</span>
                <span>Elegido por Familias y Tutores</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-slate-200" />
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Especialistas Certificados</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-slate-200" />
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Quirófano &amp; UCI Activos</span>
              </div>
            </motion.div>

          </div>

          {/* =========================================================================
              COLUMNA DERECHA: TARJETA FOTOGRÁFICA ORIGINAL SIN ENCAJE REDUNDANTE
              ========================================================================= */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-md sm:max-w-lg lg:max-w-none"
            >
              {/* Contenedor Fotográfico de Borde a Borde — Sin encaje ni marcos redundantes */}
              <div className="relative aspect-[4/3.8] sm:aspect-[4/4.1] lg:aspect-[4/4.2] w-full rounded-[32px] sm:rounded-[40px] overflow-hidden shadow-2xl shadow-emerald-950/15 border border-slate-200/80 group">
                <Image
                  src="/hero-veterinary-care.jpg"
                  alt="Atención médica veterinaria empática y protocolos Fear-Free con perrito y gatito felices"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Sutil degradado inferior para asegurar contraste y legibilidad */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />

                {/* Tarjeta Flotante Interactiva: Protocolo Fear-Free™ */}
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 sm:p-4 shadow-xl border border-white/80 flex items-center justify-between gap-3 transition-transform duration-300 hover:scale-[1.02]">
                  <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-orange-50 flex items-center justify-center text-[#E05A47] shrink-0 border border-orange-100/80 shadow-2xs">
                      <HeartHandshake className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight truncate">
                        Protocolo Fear-Free™
                      </h4>
                      <p className="text-[10px] sm:text-xs text-slate-500 font-medium truncate">
                        Manejo médico amable y sin estrés
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[10px] sm:text-[11px] font-bold border border-emerald-200/80 shadow-2xs">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>100% AMABLE</span>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
