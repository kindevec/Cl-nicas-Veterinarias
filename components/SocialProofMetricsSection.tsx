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
  Users
} from 'lucide-react';

const METRICS = [
  {
    value: '99.4%',
    label: 'Éxito Quirúrgico',
    detail: 'En cirugías ortopédicas, torácicas y de urgencia crítica.',
    icon: Activity,
    color: 'text-emerald-400',
  },
  {
    value: '20 min',
    label: 'Diagnóstico In-House',
    detail: 'Hemograma IDEXX y electrolitos en tiempo real.',
    icon: Clock,
    color: 'text-teal-300',
  },
  {
    value: '+18',
    label: 'Especialistas MVZ',
    detail: 'Cirujanos, intensivistas, anestesiólogos y nutricionistas.',
    icon: Users,
    color: 'text-amber-400',
  },
  {
    value: '+12,400',
    label: 'Pacientes Atendidos',
    detail: 'Con registro clínico continuo y seguimiento post-operatorio.',
    icon: HeartHandshake,
    color: 'text-emerald-400',
  },
];

const TESTIMONIALS = [
  {
    id: 1,
    patientName: 'Max (Golden Retriever, 5 años)',
    tutorName: 'Mariana & Carlos Gómez',
    avatar: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=160&h=160&q=80',
    tutorPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80',
    service: 'Cirugía de Torsión Gástrica 3:00 AM',
    quote: 'Max sufrió una dilatación volvular de madrugada. Llegamos al centro de trauma y en 10 minutos estaba en quirófano con monitoreo continuo. El profesionalismo y la calidez del equipo salvaron su vida.',
    rating: 5,
    outcome: 'Recuperación al 100% en 14 días'
  },
  {
    id: 2,
    patientName: 'Luna (Gata Persa, 7 años)',
    tutorName: 'Dra. Valentina Restrepo',
    avatar: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=160&h=160&q=80',
    tutorPhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80',
    service: 'Manejo Renal Fear-Free & Dieta Gourmet',
    quote: 'Luna se estresaba terriblemente con cualquier veterinario. En VetCare el consultorio felino es completamente silencioso con feromonas Feliway. La fórmula renal de Pet Gourmet estabilizó su creatinina en sangre.',
    rating: 5,
    outcome: 'Estadío renal controlado y vital'
  },
  {
    id: 3,
    patientName: 'Thor (Bulldog Francés, 3 años)',
    tutorName: 'Felipe & Andrea Vélez',
    avatar: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=160&h=160&q=80',
    tutorPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80',
    service: 'Cirugía Vía Aérea Braquiocefálica',
    quote: 'Thor tenía severa dificultad respiratoria. La corrección con láser de estenosis y paladar blando le dio una segunda vida. Ahora duerme tranquilo sin ahogos y disfruta sus paseos.',
    rating: 5,
    outcome: 'Ventilación óptima sin apneas'
  }
];

const ACCREDITATIONS = [
  { name: 'Resolución ICA 00482', desc: 'Acreditación Oficial Sanitaria' },
  { name: 'Fear-Free™ Certified', desc: 'Bienestar y Cero Estrés' },
  { name: 'IDEXX Reference Partner', desc: 'Laboratorio Automatizado' },
  { name: 'AAFCO Nutrition Standards', desc: 'Dietas de Grado Médico' },
];

export function SocialProofMetricsSection() {
  return (
    <section id="social-proof" className="py-20 md:py-28 relative overflow-hidden">
      
      {/* Ambient Lighting Orbs */}
      <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-20">
        
        {/* 1. IMPACT COUNTERS WITH MOTION (4 Métricas Clave) */}
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {METRICS.map((metric, idx) => {
              const Icon = metric.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="rounded-3xl bg-slate-900/80 border border-white/10 p-6 sm:p-7 backdrop-blur-xl shadow-2xl shadow-black/60 flex flex-col justify-between hover:border-emerald-500/40 transition-all group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>

                  <div>
                    <div className={`text-3xl sm:text-4xl font-black ${metric.color} tracking-tight font-sans`}>
                      {metric.value}
                    </div>
                    <h4 className="text-sm font-bold text-white mt-1">
                      {metric.label}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1.5 leading-relaxed font-normal">
                      {metric.detail}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* 2. EDITORIAL TESTIMONIALS (Historias Clínicas Reales) */}
        <div className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold tracking-wider uppercase">
              <Quote className="w-4 h-4" />
              <span>CASOS CLÍNICOS &amp; TESTIMONIOS VERIFICADOS</span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              La Voz de Quienes Confiaron la Vida de su Familia
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Resultados médicos documentados y experiencias reales de tutores en nuestra clínica y boutique gourmet.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((test, idx) => (
              <motion.div
                key={test.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="rounded-3xl bg-slate-900/75 border border-white/10 p-7 flex flex-col justify-between backdrop-blur-xl shadow-2xl shadow-black/60 relative hover:border-emerald-400/40 transition-all group"
              >
                <div className="space-y-4">
                  {/* Rating and Service Badge */}
                  <div className="flex items-center justify-between">
                    <div className="flex text-amber-400 gap-1">
                      {[...Array(test.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                      Caso Verificado
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic font-normal">
                    &quot;{test.quote}&quot;
                  </p>

                  <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 text-[11px] text-emerald-300 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{test.outcome}</span>
                  </div>
                </div>

                {/* Patient & Tutor Info */}
                <div className="pt-5 border-t border-white/10 mt-6 flex items-center gap-3">
                  <div className="relative w-11 h-11 rounded-2xl overflow-hidden ring-2 ring-emerald-500/30 shrink-0 bg-slate-950">
                    <Image
                      src={test.avatar}
                      alt={test.patientName}
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="min-w-0">
                    <h5 className="text-xs font-extrabold text-white truncate">{test.patientName}</h5>
                    <span className="text-[11px] text-slate-400 block truncate">Tutor: {test.tutorName}</span>
                    <span className="text-[10px] text-teal-400 block font-medium truncate">{test.service}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 3. CERTIFICATION & ACCREDITATION BANNER */}
        <div className="rounded-3xl bg-slate-950 border border-white/10 p-6 sm:p-8 backdrop-blur-xl">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {ACCREDITATIONS.map((acc, idx) => (
              <div key={idx} className="space-y-1">
                <ShieldCheck className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                <div className="text-xs sm:text-sm font-extrabold text-white">{acc.name}</div>
                <div className="text-[11px] text-slate-400 font-medium">{acc.desc}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
