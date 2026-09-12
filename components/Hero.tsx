'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  HeartHandshake, 
  ArrowRight, 
  Clock, 
  PhoneCall,
  Calendar
} from 'lucide-react';
import { buildWhatsAppUrl } from '@/lib/utils';

interface HeroProps {
  onSelectServiceForBooking: (serviceName: string) => void;
}

export function Hero({ onSelectServiceForBooking }: HeroProps) {
  return (
    <section 
      id="hero" 
      className="relative overflow-hidden bg-[#FAFBF7] pt-28 sm:pt-36 pb-0"
    >
      {/* Soft Decorative Paw Prints Background Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="decorative-paws" width="120" height="120" patternUnits="userSpaceOnUse">
              <g fill="#E2E8D8" opacity="0.6">
                <ellipse cx="20" cy="20" rx="3.5" ry="5" transform="rotate(-15 20 20)" />
                <ellipse cx="32" cy="18" rx="3.5" ry="5" transform="rotate(15 32 18)" />
                <ellipse cx="14" cy="28" rx="3" ry="4" transform="rotate(-30 14 28)" />
                <ellipse cx="38" cy="26" rx="3" ry="4" transform="rotate(30 38 26)" />
                <path d="M 26 27 C 22 27 18 30 18 35 C 18 39 21 42 26 42 C 31 42 34 39 34 35 C 34 30 30 27 26 27 Z" />
              </g>
              <g fill="#FDE68A" opacity="0.4">
                <ellipse cx="80" cy="80" rx="3.5" ry="5" transform="rotate(-15 80 80)" />
                <ellipse cx="92" cy="78" rx="3.5" ry="5" transform="rotate(15 92 78)" />
                <ellipse cx="74" cy="88" rx="3" ry="4" transform="rotate(-30 74 88)" />
                <ellipse cx="98" cy="86" rx="3" ry="4" transform="rotate(30 98 86)" />
                <path d="M 86 87 C 82 87 78 90 78 95 C 78 99 81 102 86 102 C 91 102 94 99 94 95 C 94 90 90 87 86 87 Z" />
              </g>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#decorative-paws)" />
        </svg>
      </div>

      {/* Decorative Warm Sunlight and Leaf Accents */}
      <div className="absolute top-10 right-1/3 w-96 h-96 bg-amber-200/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-40 -left-20 w-80 h-80 bg-emerald-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
          
          {/* Left Text & Search Bar Column (lg:col-span-7) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Headline inspired directly by PetFood reference */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0D3D20] tracking-tight leading-[1.12]">
              Salud, cuidado y amor que hacen a tu{' '}
              <span className="text-[#1A6B38] inline-flex items-center gap-2">
                mascota feliz
                <span className="inline-block text-2xl sm:text-3xl lg:text-4xl animate-bounce">🐾</span>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Atención médica hospitalaria 24 horas, quirófano estéril de alta tecnología, protocolos sin estrés Fear-Free™ y nutrición biológica personalizada.
            </p>

            {/* Direct High-Conversion Action Buttons (Clean & Direct) */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-1">
              <button
                type="button"
                onClick={() => onSelectServiceForBooking('Consulta Médica Especializada')}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#0D3D20] hover:bg-[#1A6B38] text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-950/15 hover:shadow-xl hover:scale-105 active:scale-95 flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-emerald-400" />
                <span>Agendar Cita Médica</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <a
                href={buildWhatsAppUrl('Urgencia Médica Inmediata 24 Horas')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-4 rounded-full bg-white hover:bg-emerald-50/80 text-[#0D3D20] border border-slate-200 font-bold text-xs uppercase tracking-wider transition-all shadow-sm hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                <span>Urgencias 24/7 (WhatsApp)</span>
              </a>
            </div>

            {/* 3 Value Pillars under Search Bar (like PetFood) */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 pt-2 text-xs font-semibold text-slate-700">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-emerald-100/80 text-[#1A6B38] flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span>100% Sin Dolor (Fear-Free)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-emerald-100/80 text-[#1A6B38] flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span>Especialistas Certificados</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-amber-100/80 text-amber-700 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span>Nutrición Holística</span>
              </div>
            </div>
          </motion.div>

          {/* Right Image: Adorable Dog with Food Bowl overflowing the bottom (PetFood style) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 relative flex justify-center"
          >
            <div className="relative w-full max-w-md sm:max-w-lg h-[380px] sm:h-[460px] lg:h-[500px]">
              {/* Pet Photo Container with organic rounded soft framing */}
              <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-gradient-to-b from-amber-50 to-emerald-50">
                <Image
                  src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1000&q=85"
                  alt="Perro feliz y saludable en consulta veterinaria VetCare"
                  fill
                  priority
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 500px"
                  referrerPolicy="no-referrer"
                />

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-3 rounded-2xl border border-emerald-100 shadow-md flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 text-[#1A6B38] flex items-center justify-center font-bold">
                      <HeartHandshake className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Dr. Santiago Restrepo</h4>
                      <p className="text-[10px] text-slate-500">Traumatología &amp; Nutrición Clínica</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-[#0D3D20] text-[10px] font-bold">
                    Guardia 24H
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Organic Curved Wave Transition to the Forest Green Stats Ribbon (Reference PetFood) */}
      <div className="relative w-full overflow-hidden leading-none mt-12">
        <svg 
          viewBox="0 0 1440 120" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-12 sm:h-16 lg:h-20 text-[#0D3D20] preserve-3d"
        >
          <path 
            d="M 0 60 C 320 120 720 0 1080 60 C 1260 90 1380 70 1440 60 L 1440 120 L 0 120 Z" 
            fill="#0D3D20" 
          />
        </svg>
      </div>

    </section>
  );
}
