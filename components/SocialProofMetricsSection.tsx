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
  Activity,
  Clock,
  Sparkles,
  Users,
  Heart
} from 'lucide-react';

const METRICS = [
  {
    value: '18.5K+',
    label: 'Pacientes Atendidos',
    icon: Users,
  },
  {
    value: '99.4%',
    label: 'Éxito Quirúrgico',
    icon: Activity,
  },
  {
    value: '24/7',
    label: 'Triage de Urgencias',
    icon: Clock,
  },
  {
    value: '4.9★',
    label: 'Valoración Tutores',
    icon: Star,
  },
];

const TESTIMONIALS = [
  {
    id: 1,
    patientName: 'Max (Golden Retriever)',
    tutorName: 'Mariana Gómez',
    avatar: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=160&h=160&q=80',
    service: 'Cirugía de Urgencia 3:00 AM',
    quote: 'Max sufrió una dilatación gástrica de madrugada. Llegamos al centro de trauma y en 10 minutos estaba en quirófano con monitoreo continuo. El profesionalismo y la calidez del equipo salvaron su vida.',
    rating: 5,
    outcome: 'Recuperado al 100%'
  },
  {
    id: 2,
    patientName: 'Luna (Gata Persa)',
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
    tutorName: 'Felipe Vélez',
    avatar: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=160&h=160&q=80',
    service: 'Corrección Vía Aérea',
    quote: 'Thor tenía severa dificultad respiratoria. La corrección con láser de estenosis le dio una segunda vida. Ahora duerme tranquilo sin ahogos y disfruta sus paseos al aire libre.',
    rating: 5,
    outcome: 'Respiración limpia'
  }
];

export function SocialProofMetricsSection() {
  return (
    <section id="social-proof" className="relative overflow-hidden">
      
      {/* 1. FOREST GREEN STATS RIBBON (Directly inspired by reference image) */}
      <div className="bg-[#0D3D20] text-white py-6 sm:py-8 border-t border-emerald-800/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-emerald-800/60">
            {METRICS.map((metric, idx) => {
              const Icon = metric.icon;
              return (
                <div key={idx} className="flex items-center justify-center gap-3 pt-4 sm:pt-0 sm:px-4 text-center">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-emerald-300 shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-sans">
                      {metric.value}
                    </div>
                    <div className="text-xs text-emerald-200/80 font-medium">
                      {metric.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. POETIC EDITORIAL SECTION WITH CUTE CORGIS (Reference PetFood Quote block) */}
      <div className="py-16 sm:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 sm:gap-14">
            
            {/* Adorable Happy Dogs Image */}
            <div className="relative w-64 sm:w-72 h-64 sm:h-72 shrink-0 rounded-3xl overflow-hidden shadow-xl border-4 border-[#FAFBF7]">
              <Image
                src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=800&q=80"
                alt="Perritos felices jugando juntos"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 280px, 320px"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Poetic Inspirational Text */}
            <div className="space-y-4 text-center md:text-left max-w-lg">
              <div className="inline-block text-[#1A6B38]">
                <Quote className="w-8 h-8 rotate-180 opacity-80" />
              </div>

              <blockquote className="text-lg sm:text-xl font-medium text-slate-800 italic leading-relaxed">
                &ldquo;Desde nuestro corazón hasta su bienestar: ciencia médica de alta precisión, cuidado Fear-Free sin dolor y nutrición pura para que vivan más años llenos de vitalidad.&rdquo;
              </blockquote>

              <p className="text-xs font-bold text-[#1A6B38] uppercase tracking-wider flex items-center justify-center md:justify-start gap-1.5">
                <Heart className="w-3.5 h-3.5 fill-[#1A6B38]" />
                <span>Compromiso Ético &amp; Amor Animal • VetCare</span>
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* 3. TESTIMONIOS REALES DE TUTORES (Open Breathable Layout, NO Box-in-Box) */}
      <div className="py-12 pb-20 bg-[#FAFBF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-[#1A6B38] uppercase tracking-wider">Casos Reales</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0D3D20]">
              Historias de Familias que Confían en VetCare
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((test) => (
              <div
                key={test.id}
                className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-md border border-slate-200/80 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex text-amber-400 gap-1">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                    ))}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                    &ldquo;{test.quote}&rdquo;
                  </p>

                  <span className="inline-block text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    {test.outcome}
                  </span>
                </div>

                <div className="pt-4 border-t border-slate-100 mt-5 flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-slate-200">
                    <Image
                      src={test.avatar}
                      alt={test.patientName}
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">{test.patientName}</h5>
                    <span className="text-[11px] text-slate-500 block">{test.tutorName} • {test.service}</span>
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
