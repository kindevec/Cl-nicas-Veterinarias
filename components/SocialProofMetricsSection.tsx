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
      
      {/* 1. FOREST GREEN STATS RIBBON */}
      <div className="bg-[#0D3D20] text-white py-8 sm:py-10 border-t border-emerald-800/40 relative">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
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
                  <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-xs flex items-center justify-center text-emerald-300 border border-emerald-500/20 shrink-0 shadow-xs">
                    <Icon className="w-6 h-6" />
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

      {/* 2. DYNAMIC BRAND TICKER RIBBON (Sleek, Horizontal, Premium) */}
      <div className="bg-[#082815] text-emerald-200/90 py-3 overflow-hidden border-y border-emerald-800/50 shadow-inner">
        <div className="animate-marquee font-mono text-xs font-bold tracking-widest uppercase flex items-center gap-8">
          <span className="text-amber-400">★</span>
          <span>CIRUGÍA DE ALTA COMPLEJIDAD</span>
          <span className="text-emerald-500">•</span>
          <span>UCI 24/7 EN TURNO</span>
          <span className="text-emerald-500">•</span>
          <span>QUIRÓFANO ESTÉRIL CLASE 10,000</span>
          <span className="text-emerald-500">•</span>
          <span>FEAR-FREE™ CERTIFIED</span>
          <span className="text-emerald-500">•</span>
          <span>NUTRICIÓN BIOLÓGICA WSAVA</span>
          <span className="text-emerald-500">•</span>
          <span>LABORATORIO IN-HOUSE 15 MIN</span>
          <span className="text-emerald-500">•</span>
          <span>CERO DOLOR MULTIMODAL</span>
          <span className="text-amber-400">★</span>
          <span>CIRUGÍA DE ALTA COMPLEJIDAD</span>
          <span className="text-emerald-500">•</span>
          <span>UCI 24/7 EN TURNO</span>
          <span className="text-emerald-500">•</span>
          <span>QUIRÓFANO ESTÉRIL CLASE 10,000</span>
          <span className="text-emerald-500">•</span>
          <span>FEAR-FREE™ CERTIFIED</span>
          <span className="text-emerald-500">•</span>
          <span>NUTRICIÓN BIOLÓGICA WSAVA</span>
          <span className="text-emerald-500">•</span>
          <span>LABORATORIO IN-HOUSE 15 MIN</span>
          <span className="text-emerald-500">•</span>
          <span>CERO DOLOR MULTIMODAL</span>
        </div>
      </div>

      {/* 3. POETIC EDITORIAL SECTION WITH ELEGANT ARCHED PET PORTRAIT */}
      <div className="py-12 sm:py-16 bg-white relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55 }}
            className="flex flex-col md:flex-row items-center justify-center gap-8 sm:gap-14"
          >
            
            {/* Elegant Arched Frame for Happy Dogs */}
            <div className="relative w-60 sm:w-72 h-64 sm:h-76 shrink-0">
              <div className="w-full h-full rounded-t-[80px] rounded-b-3xl overflow-hidden shadow-xl border-4 border-[#FAFBF7] relative bg-slate-100">
                <Image
                  src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=800&q=80"
                  alt="Perritos felices jugando juntos"
                  fill
                  className="object-cover object-center hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 240px, 280px"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-[#0D3D20] text-emerald-300 text-[10px] font-extrabold uppercase tracking-wider shadow-md whitespace-nowrap border border-emerald-700/50">
                Bienestar &amp; Medicina
              </div>
            </div>

            {/* Poetic Inspirational Text */}
            <div className="space-y-4 text-center md:text-left max-w-lg">
              <div className="inline-block text-[#1A6B38]">
                <Quote className="w-8 h-8 rotate-180 opacity-80" />
              </div>

              <blockquote className="text-lg sm:text-xl font-medium text-slate-800 italic leading-relaxed">
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

      {/* 4. TESTIMONIOS REALES (Clean, Balanced & Breathable) */}
      <div className="py-12 sm:py-16 bg-[#FAFBF7] border-t border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto space-y-2"
          >
            <span className="text-xs font-bold text-[#1A6B38] uppercase tracking-wider font-mono">
              Historias Clínicas
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0D3D20]">
              Familias que Confían en VetCare
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Casos reales atendidos en nuestro hospital por el equipo de especialistas y guardia 24 horas.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {TESTIMONIALS.map((test, idx) => (
              <motion.div
                key={test.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white rounded-3xl p-6 sm:p-7 shadow-xs hover:shadow-lg border border-slate-200/80 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div className="space-y-3">
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

                <div className="pt-4 border-t border-slate-100 mt-5 flex items-center gap-3">
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
