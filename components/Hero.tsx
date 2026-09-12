'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { 
  Search, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  HeartHandshake, 
  ArrowRight,
  Clock,
  PhoneCall
} from 'lucide-react';
import { buildWhatsAppUrl } from '@/lib/utils';

interface HeroProps {
  onSelectServiceForBooking: (serviceName: string) => void;
}

export function Hero({ onSelectServiceForBooking }: HeroProps) {
  const [query, setQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query) {
      onSelectServiceForBooking(query);
    } else {
      onSelectServiceForBooking('Consulta General Especializada');
    }
  };

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
            {/* Top Friendly Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-emerald-200/80 text-[#1A6B38] text-xs font-bold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <span>Clínica de Alta Precisión &amp; Nutrición Gourmet</span>
            </div>

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

            {/* Search Bar (Zero Box-in-Box - Direct Floating Input & Button like PetFood) */}
            <form 
              onSubmit={handleSearchSubmit}
              className="relative max-w-xl mx-auto lg:mx-0 bg-white rounded-full p-1.5 shadow-lg shadow-emerald-950/5 border border-slate-200/80 flex items-center gap-2 transition-all focus-within:border-[#1A6B38] focus-within:ring-2 focus-within:ring-emerald-500/20"
            >
              <div className="pl-4 text-slate-400">
                <Search className="w-5 h-5 text-emerald-700" />
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar especialidad médica, síntoma o dieta..."
                className="w-full bg-transparent text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none py-2"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-[#0D3D20] hover:bg-[#1A6B38] text-white font-bold text-xs uppercase tracking-wider transition-all shrink-0 cursor-pointer shadow-sm hover:scale-105"
              >
                Buscar / Agendar
              </button>
            </form>

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
