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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl lg:max-w-3xl space-y-4 text-left"
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
          </motion.div>
      </div>
    </section>
  );
}
