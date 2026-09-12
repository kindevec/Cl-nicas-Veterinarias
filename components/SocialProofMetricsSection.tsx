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
      
      {/* 1. FOREST GREEN STATS RIBBON with Soft Radial Glows */}
      <div className="bg-[#0D3D20] text-white py-6 sm:py-8 border-t border-emerald-800/40 relative">
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-emerald-800/60">
            {METRICS.map((metric, idx) => {
              const Icon = metric.icon;
              return (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="flex items-center justify-center gap-3.5 pt-4 sm:pt-0 sm:px-4 text-center"
                >
                  <div className="w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-xs flex items-center justify-center text-emerald-300 border border-emerald-500/20 shrink-0 shadow-xs">
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
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. DYNAMIC NON-LINEAR BRAND TICKER RIBBON (Directly inspired by Starbucks Reference) */}
      <div className="relative py-2.5 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 text-white overflow-hidden shadow-lg -rotate-1 scale-[1.03] z-20 border-y border-emerald-400/40 my-[-6px]">
        <div className="animate-marquee font-mono text-xs font-black tracking-widest uppercase flex items-center gap-8 drop-shadow-xs">
          <span>★ CIRUGÍA DE ALTA GAMA</span>
          <span>•</span>
          <span>UCI 24/7 EN TURNO</span>
          <span>•</span>
          <span>QUIRÓFANO ESTÉRIL CLASE 10,000</span>
          <span>•</span>
          <span>FEAR-FREE™ CERTIFIED</span>
          <span>•</span>
          <span>DIETAS BIOLÓGICAS GOURMET</span>
          <span>•</span>
          <span>IDEXX IN-HOUSE 15 MIN</span>
          <span>•</span>
          <span>CERO DOLOR MULTIMODAL</span>
          <span>★</span>
          <span>CIRUGÍA DE ALTA GAMA</span>
          <span>•</span>
          <span>UCI 24/7 EN TURNO</span>
          <span>•</span>
          <span>QUIRÓFANO ESTÉRIL CLASE 10,000</span>
          <span>•</span>
          <span>FEAR-FREE™ CERTIFIED</span>
          <span>•</span>
          <span>DIETAS BIOLÓGICAS GOURMET</span>
          <span>•</span>
          <span>IDEXX IN-HOUSE 15 MIN</span>
          <span>•</span>
          <span>CERO DOLOR MULTIMODAL</span>
        </div>
      </div>

      {/* 3. FLUID ORGANIC WAVE TRANSITION INTO WHITE EDITORIAL SECTION */}
      <div className="w-full overflow-hidden leading-none bg-[#0D3D20] text-white -mt-1 pointer-events-none">
        <svg className="relative block w-full h-8 sm:h-12" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0 C150,85 380,-30 550,55 C720,140 920,20 1200,50 L1200,120 L0,120 Z" fill="currentColor"></path>
        </svg>
      </div>

      {/* 4. POETIC EDITORIAL SECTION WITH ORGANIC ARCHED PHOTO (Dog Grooming Reference) */}
      <div className="py-10 sm:py-14 bg-white relative overflow-hidden">
        {/* Subtle decorative paw prints floating organically in background */}
        <div className="absolute top-6 left-8 text-2xl text-emerald-900/5 select-none pointer-events-none -rotate-12">🐾</div>
        <div className="absolute bottom-8 right-12 text-3xl text-emerald-900/5 select-none pointer-events-none rotate-45">🐾</div>
        <div className="absolute top-1/2 right-1/4 text-xl text-emerald-900/5 select-none pointer-events-none 12">🐾</div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55 }}
            className="flex flex-col md:flex-row items-center justify-center gap-8 sm:gap-12"
          >
            
            {/* Non-Linear Arched Frame with Organic Backdrop Layer */}
            <div className="relative w-56 sm:w-64 h-64 sm:h-72 shrink-0">
              {/* Organic Offset Backdrop Silhouette */}
              <div className="absolute inset-0 bg-emerald-100/70 rounded-t-full rounded-b-[40px] -rotate-3 scale-105 transition-transform group-hover:rotate-0" />
              <div className="relative w-full h-full rounded-t-full rounded-b-[38px] overflow-hidden shadow-xl border-4 border-white">
                <Image
                  src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=800&q=80"
                  alt="Perritos felices jugando juntos"
                  fill
                  className="object-cover object-center hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 240px, 280px"
                  referrerPolicy="no-referrer"
                />
              </div>
              {/* Floating Paw Accent Badge */}
              <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center text-lg shadow-md font-bold rotate-6 border-2 border-white">
                🐾
              </div>
            </div>

            {/* Poetic Inspirational Text */}
            <div className="space-y-3.5 text-center md:text-left max-w-lg">
              <div className="inline-block text-[#1A6B38]">
                <Quote className="w-8 h-8 rotate-180 opacity-80" />
              </div>

              <blockquote className="text-base sm:text-xl font-medium text-slate-800 italic leading-relaxed font-serif">
                &ldquo;Desde nuestro corazón hasta su bienestar: ciencia médica de alta precisión, cuidado Fear-Free sin dolor y nutrición pura para que vivan más años llenos de vitalidad.&rdquo;
              </blockquote>

              <p className="text-xs font-bold text-[#1A6B38] uppercase tracking-wider flex items-center justify-center md:justify-start gap-1.5 pt-1">
                <Heart className="w-4 h-4 fill-[#1A6B38]" />
                <span>Compromiso Deontológico &amp; Amor Animal • VetCare</span>
              </p>
            </div>

          </motion.div>
        </div>
      </div>

      {/* 5. ORGANIC FLUID WAVE DIVIDER TRANSITIONING INTO TESTIMONIALS */}
      <div className="w-full overflow-hidden leading-none bg-white text-[#FAFBF7] pointer-events-none">
        <svg className="relative block w-full h-6 sm:h-10" viewBox="0 0 1200 60" preserveAspectRatio="none">
          <path d="M0,0 C250,55 550,-10 800,45 C980,85 1100,20 1200,30 L1200,60 L0,60 Z" fill="currentColor"></path>
        </svg>
      </div>

      {/* 6. TESTIMONIOS REALES CON DISEÑO ASIMÉTRICO ORGÁNICO */}
      <div className="py-8 sm:py-12 bg-[#FAFBF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto space-y-1"
          >
            <span className="text-xs font-bold text-[#1A6B38] uppercase tracking-wider font-mono">
              Historias Clínicas
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0D3D20]">
              Familias que Confían en VetCare
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {TESTIMONIALS.map((test, idx) => (
              <motion.div
                key={test.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white rounded-[32px_16px_32px_16px] p-6 shadow-xs hover:shadow-xl border border-slate-200/80 transition-all duration-300 flex flex-col justify-between relative group hover:-translate-y-1 overflow-hidden"
              >
                {/* Organic top corner colored accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-emerald-100/60 to-transparent rounded-bl-full pointer-events-none" />

                <div className="space-y-3 relative z-10">
                  <div className="flex text-amber-400 gap-1">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                    ))}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                    &ldquo;{test.quote}&rdquo;
                  </p>

                  <span className="inline-block text-[10px] font-extrabold text-[#1A6B38] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60">
                    {test.outcome}
                  </span>
                </div>

                <div className="pt-4 border-t border-slate-100 mt-4 flex items-center gap-3 relative z-10">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border-2 border-emerald-200 shadow-xs">
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
              </motion.div>
            ))}
          </div>

        </div>
      </div>

    </section>
  );
}
