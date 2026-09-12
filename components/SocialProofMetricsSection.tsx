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
    detail: 'En cirugías ortopédicas AOVET, laparoscópicas y de urgencia.',
    icon: Activity,
    color: 'text-[#1A6B38]',
    bgIcon: 'bg-emerald-50 text-emerald-700'
  },
  {
    value: '15 min',
    label: 'Diagnóstico In-House',
    detail: 'Laboratorio IDEXX automatizado y gases en sangre.',
    icon: Clock,
    color: 'text-[#0D3D20]',
    bgIcon: 'bg-teal-50 text-teal-700'
  },
  {
    value: '+18',
    label: 'Especialistas Médicos',
    detail: 'Cirujanos, intensivistas UCI, anestesiólogos y nutricionistas.',
    icon: Users,
    color: 'text-[#059669]',
    bgIcon: 'bg-emerald-50 text-emerald-700'
  },
  {
    value: '+18,500',
    label: 'Mascotas Curadas',
    detail: 'Historias clínicas digitalizadas y seguimiento post-operatorio.',
    icon: HeartHandshake,
    color: 'text-[#1A6B38]',
    bgIcon: 'bg-amber-50 text-amber-700'
  },
];

const TESTIMONIALS = [
  {
    id: 1,
    patientName: 'Max (Golden Retriever, 5 años)',
    tutorName: 'Mariana & Carlos Gómez',
    avatar: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=160&h=160&q=80',
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
    service: 'Cirugía Vía Aérea Braquiocefálica',
    quote: 'Thor tenía severa dificultad respiratoria. La corrección con láser de estenosis y paladar blando le dio una segunda vida. Ahora duerme tranquilo sin ahogos y disfruta sus paseos.',
    rating: 5,
    outcome: 'Ventilación óptima sin apneas'
  }
];

const ACCREDITATIONS = [
  { name: 'AOVET Foundation Member', desc: 'Estándar Quirúrgico Global' },
  { name: 'Fear-Free™ Certified Clinic', desc: 'Protocolo Cero Estrés' },
  { name: 'IDEXX Reference Lab', desc: 'Analítica Sanguínea 24/7' },
  { name: 'ISFM Cat Friendly Gold', desc: 'Atención Felina Especializada' },
];

export function SocialProofMetricsSection() {
  return (
    <section id="social-proof" className="py-16 md:py-24 relative overflow-hidden bg-white/60 border-y border-slate-200/80">
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
                  className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-7 shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all duration-300 group flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl ${metric.bgIcon} flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  </div>

                  <div>
                    <div className={`text-3xl sm:text-4xl font-extrabold ${metric.color} tracking-tight font-sans`}>
                      {metric.value}
                    </div>
                    <h4 className="text-base font-bold text-slate-900 mt-1">
                      {metric.label}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed font-normal">
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
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-[#1A6B38] text-xs font-bold tracking-wider uppercase shadow-sm">
              <Quote className="w-4 h-4 text-emerald-600" />
              <span>CASOS CLÍNICOS &amp; TESTIMONIOS VERIFICADOS</span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-[#0D3D20] tracking-tight">
              La voz de quienes confiaron la vida de su familia
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
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
                className="rounded-3xl bg-white border border-slate-200/90 p-7 flex flex-col justify-between shadow-md hover:shadow-xl hover:border-emerald-300 transition-all group"
              >
                <div className="space-y-4">
                  {/* Rating and Service Badge */}
                  <div className="flex items-center justify-between">
                    <div className="flex text-amber-400 gap-1">
                      {[...Array(test.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                      Caso Verificado
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic font-normal">
                    &quot;{test.quote}&quot;
                  </p>

                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-[11px] text-emerald-800 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{test.outcome}</span>
                  </div>
                </div>

                {/* Patient & Tutor Info */}
                <div className="pt-5 border-t border-slate-100 mt-6 flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-2xl overflow-hidden ring-2 ring-emerald-500/20 shrink-0 bg-slate-100 shadow-sm">
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
                    <span className="text-[11px] text-slate-500 block truncate">Tutor: {test.tutorName}</span>
                    <span className="text-[10px] text-emerald-700 block font-semibold truncate">{test.service}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 3. CERTIFICATION & ACCREDITATION BANNER */}
        <div className="rounded-3xl bg-white border border-slate-200/90 p-8 shadow-sm">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {ACCREDITATIONS.map((acc, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 mx-auto flex items-center justify-center mb-2 shadow-inner">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-900">{acc.name}</div>
                <div className="text-[11px] text-slate-500 font-medium">{acc.desc}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
