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
      className="relative w-full min-h-[480px] sm:min-h-[520px] pt-32 sm:pt-36 pb-16 flex flex-col justify-center overflow-hidden bg-[#0D3D20] text-white"
    >
      {/* Modern Photographic Canvas with Seamless Transition */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Crisp, Vibrant Image on the right */}
        <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[58%] h-full">
          <Image
            src="https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=1600&q=85"
            alt="Veterinaria de alta precisión y mascotas felices"
            fill
            priority
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 60vw"
            referrerPolicy="no-referrer"
          />
          {/* Smooth Horizontal Gradient Transition into Content */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D3D20] via-[#0D3D20]/75 via-25% to-transparent hidden lg:block" />
          {/* Vertical Gradient for Mobile Devices */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D3D20] via-[#0D3D20]/80 via-40% to-transparent lg:hidden" />
          {/* Subtle Top & Bottom Cinematic Vignette */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0D3D20]/70 via-transparent to-[#0D3D20]/90" />
        </div>

        {/* Content Backdrop Fill on the Left */}
        <div className="absolute left-0 top-0 bottom-0 w-full lg:w-[45%] bg-[#0D3D20]" />

        {/* Dynamic Warm Atmospheric Light Blooms */}
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-10 right-1/4 w-80 h-80 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Text & Primary CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-4 text-left"
          >
            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight drop-shadow-sm">
              Salud, Cuidado &amp; Amor que Hacen a tu{' '}
              <span className="text-emerald-400 inline-flex items-center gap-2">
                mascota feliz
                <span className="inline-block text-2xl sm:text-4xl animate-bounce">🐾</span>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed font-normal max-w-xl">
              Atención médica hospitalaria 24 horas, quirófano estéril de alta tecnología, protocolos sin estrés Fear-Free™ y nutrición biológica personalizada.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3.5 pt-2">
              <a
                href="#citas"
                onClick={(e) => {
                  e.preventDefault();
                  onSelectServiceForBooking('Consulta Médica Especializada');
                }}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-[#0D3D20] font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-950/25 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#0D3D20]" />
                <span>Agendar Cita Médica</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </a>

              <a
                href={buildWhatsAppUrl('Urgencia Médica Inmediata 24 Horas')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/25 font-bold text-xs uppercase tracking-wider transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer backdrop-blur-md shadow-sm"
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

          {/* Right Column: Floating Modern Glassmorphic Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden lg:flex lg:col-span-5 justify-end"
          >
            <div className="relative p-6 rounded-3xl bg-[#0D3D20]/75 backdrop-blur-xl border border-white/20 text-white max-w-sm space-y-3.5 shadow-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-emerald-500/25 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
                    <HeartHandshake className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white uppercase tracking-wider font-mono">Triage Hospitalario</div>
                    <div className="text-xs text-emerald-300 font-semibold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      Guardia Activa 24H
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  Sin Cita Previa
                </span>
              </div>
              <p className="text-xs text-emerald-100/85 leading-relaxed">
                Médicos intensivistas, laboratorio IDEXX y quirófano estéril listos las 24 horas para salvar la vida de tu consentido.
              </p>
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-emerald-200 font-medium">
                <span>⭐ 4.9 (1.4K+ tutores)</span>
                <span className="text-amber-300 font-bold">18.5K+ Pacientes</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
