'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { 
  Award, 
  ShieldCheck, 
  Star, 
  HeartHandshake, 
  CheckCircle2, 
  Quote,
  Sparkles,
  Heart
} from 'lucide-react';

const TESTIMONIALS = [
  {
    id: 1,
    patientName: 'Max (Golden Retriever)',
    patientType: '🐾 Paciente Canino',
    tutorName: 'Mariana Gómez',
    avatar: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=160&h=160&q=80',
    service: 'Cirugía de Urgencia 3:00 AM',
    quote: 'Max sufrió una dilatación gástrica de madrugada. Llegamos al hospital y en 10 minutos estaba en quirófano con monitoreo continuo. El profesionalismo y la calidez del equipo salvaron su vida.',
    rating: 5,
    outcome: 'Recuperado al 100%'
  },
  {
    id: 2,
    patientName: 'Luna (Gata Persa)',
    patientType: '🐱 Paciente Felino',
    tutorName: 'Dra. Valentina R.',
    avatar: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=160&h=160&q=80',
    service: 'Manejo Renal Fear-Free',
    quote: 'Luna se estresaba con cualquier veterinario. En VetCare el consultorio felino es completamente silencioso con feromonas Feliway. La fórmula renal estabilizó su creatinina en sangre.',
    rating: 5,
    outcome: 'Salud renal óptima'
  },
  {
    id: 3,
    patientName: 'Thor (Bulldog Francés)',
    patientType: '🐾 Paciente Canino',
    tutorName: 'Felipe Vélez',
    avatar: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=160&h=160&q=80',
    service: 'Corrección Vía Aérea',
    quote: 'Thor tenía severa dificultad respiratoria. La corrección con láser de estenosis le dio una segunda vida. Ahora duerme tranquilo sin ahogos y disfruta plenamente sus paseos al aire libre.',
    rating: 5,
    outcome: 'Respiración limpia'
  }
];

export function SocialProofMetricsSection() {
  return (
    <section id="social-proof" className="relative py-8 sm:py-12 bg-gradient-to-b from-[#FAF9F5] via-white to-[#FAF9F5] overflow-hidden">
      
      {/* Dynamic Warm Ambient Glows */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-10 w-96 h-96 bg-emerald-100/35 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-[420px] h-[420px] bg-orange-100/30 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        
        {/* =========================================================================
            1. POETIC EDITORIAL SECTION WITH ELEGANT ARCHED PET PORTRAIT
            ========================================================================= */}
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-10 bg-white/90 backdrop-blur-xs p-5 sm:p-8 rounded-[28px] sm:rounded-[36px] border border-slate-200/70 shadow-xs">
            
            {/* Elegant Arched Frame for Happy Dogs */}
            <div className="relative w-52 sm:w-64 h-52 sm:h-60 shrink-0">
              <div className="w-full h-full rounded-t-[90px] rounded-b-3xl overflow-hidden shadow-xl border-4 border-white relative bg-slate-100 ring-1 ring-slate-200/60">
                <Image
                  src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=800&q=80"
                  alt="Perritos felices jugando juntos"
                  fill
                  className="object-cover object-center hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 240px, 280px"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-[#0D3D20] text-emerald-300 text-[10px] font-extrabold uppercase tracking-wider shadow-lg whitespace-nowrap border border-emerald-600/40 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-amber-300" />
                <span>Bienestar &amp; Medicina Compasiva</span>
              </div>
            </div>

            {/* Poetic Inspirational Text */}
            <div className="space-y-4 text-center md:text-left max-w-lg">
              <div className="inline-block text-[#1A6B38]">
                <Quote className="w-8 h-8 rotate-180 opacity-70" />
              </div>

              <blockquote className="text-lg sm:text-xl font-medium text-slate-800 leading-relaxed font-sans">
                &ldquo;Desde nuestro corazón hasta su bienestar: ciencia médica de alta precisión, cuidado{' '}
                <span className="font-serif italic font-normal text-[#E05A47]">Fear-Free</span>{' '}
                sin dolor y nutrición pura para que vivan más años llenos de vitalidad.&rdquo;
              </blockquote>

              <p className="text-xs font-bold text-[#1A6B38] uppercase tracking-wider flex items-center justify-center md:justify-start gap-1.5 pt-1">
                <Heart className="w-4 h-4 fill-[#1A6B38]" />
                <span>Compromiso Deontológico &amp; Amor Animal • VetCare</span>
              </p>
            </div>

          </div>
        </div>

        {/* =========================================================================
            2. TESTIMONIOS REALES (Clean, Balanced & Breathable)
            ========================================================================= */}
        <div className="space-y-8 sm:space-y-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-2.5">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50/90 border border-emerald-200/70 text-xs font-bold text-[#1A6B38] tracking-wide shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              Historias Clínicas de Éxito
            </span>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0D3D20] tracking-tight">
              Familias que Confían en{' '}
              <span className="font-serif italic font-normal text-[#E05A47]">VetCare</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Casos reales atendidos en nuestro hospital por el equipo de especialistas y guardia continua.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {TESTIMONIALS.map((test) => (
              <div
                key={test.id}
                className="bg-white rounded-3xl p-6 sm:p-7 shadow-xs hover:shadow-xl border border-slate-200/80 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5"
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div className="flex text-amber-400 gap-1">
                      {[...Array(test.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] font-semibold text-slate-500 bg-slate-50 px-2.5 py-0.5 rounded-full border border-slate-200/60">
                      {test.patientType}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                    &ldquo;{test.quote}&rdquo;
                  </p>

                  <div>
                    <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-[#1A6B38] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60">
                      <CheckCircle2 className="w-3 h-3 text-[#1A6B38]" />
                      {test.outcome}
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 mt-5 flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border-2 border-emerald-300/60 shadow-xs">
                    <Image
                      src={test.avatar}
                      alt={test.patientName}
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="min-w-0">
                    <h5 className="text-xs font-bold text-slate-900 truncate">{test.patientName}</h5>
                    <span className="text-[11px] text-slate-500 truncate block">{test.tutorName} • {test.service}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

    </section>
  );
}
