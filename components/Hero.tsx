'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Calendar,
  HeartHandshake
} from 'lucide-react';
import { buildWhatsAppUrl } from '@/lib/utils';

interface HeroProps {
  onSelectServiceForBooking: (serviceName: string) => void;
}

export function Hero({ onSelectServiceForBooking }: HeroProps) {
  return (
    <section 
      id="hero" 
      className="relative w-full min-h-[460px] sm:min-h-[500px] pt-32 sm:pt-36 pb-14 flex flex-col justify-center overflow-hidden bg-[#0D3D20] text-white"
    >
      {/* Full-Bleed High-Res Veterinary / Happy Dog Backdrop */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <Image
          src="https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=2000&q=80"
          alt="Medicina veterinaria de precisión y nutrición para mascotas"
          fill
          priority
          className="object-cover object-center"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Ambient Gradient Overlays for Contrast & Legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0D3D20] via-[#0D3D20]/90 to-[#0D3D20]/40" />

      {/* Ambient subtle light glow */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-8 space-y-4 text-left"
          >
            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Salud, Cuidado &amp; Amor que Hacen a tu{' '}
              <span className="text-emerald-400 inline-flex items-center gap-2">
                mascota feliz
                <span className="inline-block text-2xl sm:text-4xl animate-bounce">🐾</span>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed font-normal max-w-2xl">
              Atención médica hospitalaria 24 horas, quirófano estéril de alta tecnología, protocolos sin estrés Fear-Free™ y nutrición biológica personalizada.
            </p>

            {/* Direct Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3.5 pt-2">
              <a
                href="#citas"
                onClick={(e) => {
                  e.preventDefault();
                  onSelectServiceForBooking('Consulta Médica Especializada');
                }}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-[#0D3D20] font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-950/20 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#0D3D20]" />
                <span>Agendar Cita Médica</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </a>

              <a
                href={buildWhatsAppUrl('Urgencia Médica Inmediata 24 Horas')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs uppercase tracking-wider transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer backdrop-blur-sm"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                <span>Urgencias 24/7 (WhatsApp)</span>
              </a>
            </div>

            {/* 3 Value Pillars */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-3 text-xs font-semibold text-emerald-200/90">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Fear-Free™ (Sin Estrés)</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Especialistas Certificados</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
                <span>Nutrición Holística &amp; Gourmet</span>
              </div>
            </div>
          </motion.div>

          {/* Right Showcase Highlight Badge (Desktop) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden lg:flex lg:col-span-4 justify-end"
          >
            <div className="relative p-5 rounded-3xl bg-white/10 backdrop-blur-md border border-white/15 text-white max-w-xs space-y-3 shadow-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Centro de Trauma &amp; UCI</div>
                  <div className="text-[11px] text-emerald-200/80">Guardia Activa 24H</div>
                </div>
              </div>
              <p className="text-xs text-emerald-100/80 leading-relaxed">
                Médicos intensivistas y quirófano listos las 24 horas para cualquier emergencia con tu consentido.
              </p>
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-emerald-200/90 font-medium">
                <span>⭐ 4.9 Valoración Tutores</span>
                <span className="text-amber-300 font-bold">18.5K+ Atendidos</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
