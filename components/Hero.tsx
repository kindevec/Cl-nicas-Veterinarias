'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { 
  Stethoscope, 
  Syringe, 
  Activity, 
  Sparkles, 
  PhoneCall, 
  CalendarClock, 
  ShieldCheck, 
  Clock, 
  ChevronRight,
  HeartPulse,
  Award,
  Star,
  CheckCircle2,
  Zap
} from 'lucide-react';
import { buildWhatsAppUrl } from '@/lib/utils';

interface HeroProps {
  onSelectServiceForBooking: (serviceName: string) => void;
}

const QUICK_SERVICES = [
  { id: 'consulta', name: 'Consulta Especializada', icon: Stethoscope, tag: 'Medicina Interna' },
  { id: 'vacunacion', name: 'Vacunación & Chip', icon: Syringe, tag: 'Biológicos ISO' },
  { id: 'cirugia', name: 'Cirugía & UCI 24/7', icon: Activity, tag: 'Quirófano Estéril' },
  { id: 'grooming', name: 'Spa & Grooming', icon: Sparkles, tag: 'Fear-Free™' },
];

const TUTOR_AVATARS = [
  { name: 'Dra. Carolina M.', src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80' },
  { name: 'Dr. Santiago R.', src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80' },
  { name: 'Mariana G.', src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80' },
  { name: 'Felipe V.', src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80' },
];

export function Hero({ onSelectServiceForBooking }: HeroProps) {
  const [selectedQuickService, setSelectedQuickService] = useState('Urgencia Veterinaria Inmediata');

  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      
      {/* 1. ATMOSPHERIC MULTI-LAYERED BACKGROUND */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {/* Cinematic Backdrop Image with High Resolution */}
        <div className="absolute inset-0 opacity-25 mix-blend-luminosity">
          <Image
            src="https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=2000&q=80"
            alt="Clínica Veterinaria Quirúrgica VetCare"
            fill
            priority
            className="object-cover object-center"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Deep Gradient Overlays (Zero Flat Backgrounds) */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/95 to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.15),rgba(2,6,23,0.95))]" />

        {/* Ambient Glow Orbs */}
        <div className="absolute -top-32 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl" />
        <div className="absolute top-48 right-10 w-[420px] h-[420px] bg-amber-500/12 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 left-10 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Main Editorial Left Column (lg:col-span-7) */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-7 space-y-7"
          >
            
            {/* Status Beacon Badge */}
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.04] border border-emerald-500/30 text-emerald-300 text-xs font-semibold backdrop-blur-xl shadow-lg shadow-emerald-950/50">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="font-bold text-white tracking-wide">Triage Quirúrgico 24/7 Activo</span>
              <span className="text-slate-600">•</span>
              <span className="text-emerald-300 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-emerald-400" /> Ingreso Prioritario &lt; 5 min
              </span>
            </div>

            {/* Impactful Clamp Headline with Typography Contrast */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.08]">
              Medicina Animal de{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200">
                Alta Complejidad
              </span>{' '}
              &amp; Boutique{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">
                Pet Gourmet
              </span>
            </h1>

            {/* Editorial Lead Paragraph */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-normal">
              Hospitalización continua, quirófano estéril clase A, diagnóstico de laboratorio IDEXX en 20 minutos y farmacia de nutrición especializada para la longevidad de tu mascota.
            </p>

            {/* Social Proof Quick Strip (Integrated into Hero) */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <div className="flex -space-x-2.5 overflow-hidden">
                {TUTOR_AVATARS.map((avatar, idx) => (
                  <div key={idx} className="inline-block relative w-9 h-9 rounded-full ring-2 ring-slate-950 overflow-hidden bg-slate-800">
                    <Image
                      src={avatar.src}
                      alt={avatar.name}
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                  ))}
                  <span className="text-white font-extrabold text-xs ml-1">4.9 / 5.0</span>
                </div>
                <span className="text-[11px] text-slate-400 font-medium">
                  +4,800 familias y pacientes asistidos con éxito
                </span>
              </div>
            </div>

            {/* Interactive Quick Service Triage Selector */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>Selecciona la especialidad de atención requerida:</span>
                </label>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {QUICK_SERVICES.map((svc) => {
                  const Icon = svc.icon;
                  const isSelected = selectedQuickService === svc.name;
                  return (
                    <button
                      key={svc.id}
                      type="button"
                      id={`quick-svc-${svc.id}`}
                      onClick={() => setSelectedQuickService(svc.name)}
                      className={`p-3.5 rounded-2xl text-left border transition-all flex flex-col justify-between h-28 relative overflow-hidden group cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-500/15 border-emerald-400/60 text-white shadow-xl shadow-emerald-950/40'
                          : 'bg-white/[0.03] hover:bg-white/[0.07] border-white/10 text-slate-300 hover:text-white hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full relative z-10">
                        <div className={`p-2 rounded-xl ${isSelected ? 'bg-emerald-500/20 text-emerald-300' : 'bg-white/5 text-slate-400 group-hover:text-white'}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-400 font-medium">
                          {svc.tag}
                        </span>
                      </div>
                      <span className="text-xs font-bold leading-snug relative z-10">{svc.name}</span>
                      
                      {isSelected && (
                        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-400" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CTAs with Micro-Interactions */}
            <div className="flex flex-col sm:flex-row gap-3.5 pt-2">
              <a
                id="hero-whatsapp-emergency-cta"
                href={buildWhatsAppUrl(selectedQuickService)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm tracking-wide shadow-xl shadow-emerald-500/25 hover:scale-105 active:scale-95 transition-all group"
              >
                <PhoneCall className="w-4 h-4 text-slate-950 stroke-[2.5]" />
                <span>Contactar Urgencia WhatsApp</span>
                <ChevronRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                type="button"
                id="hero-book-appointment-cta"
                onClick={() => onSelectServiceForBooking(selectedQuickService)}
                className="flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] text-white font-bold text-sm border border-white/15 hover:border-emerald-400/40 backdrop-blur-md shadow-lg shadow-black/40 hover:scale-105 active:scale-95 transition-all"
              >
                <CalendarClock className="w-4 h-4 text-emerald-400" />
                <span>Agendar Consulta Médica</span>
              </button>
            </div>

            {/* Trust Badges Strip */}
            <div className="flex flex-wrap items-center gap-5 sm:gap-7 pt-4 text-xs text-slate-400 border-t border-white/10">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-slate-300">Staff MVZ Acreditado</span>
              </div>
              <div className="flex items-center gap-2">
                <HeartPulse className="w-4 h-4 text-rose-400" />
                <span className="text-slate-300">Monitoreo Multiparámetro</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                <span className="text-slate-300">Nutrición Certificada AAFCO</span>
              </div>
            </div>

          </motion.div>

          {/* Right Showcase Column (lg:col-span-5) - Cinematic Asymmetric Bento Layout */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 space-y-4"
          >
            {/* Featured Hero Card: Quirófano Inteligente */}
            <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-slate-900/80 backdrop-blur-xl p-6 sm:p-7 shadow-2xl shadow-black/60 group hover:border-emerald-500/40 transition-all">
              
              {/* Image Preview Window */}
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden mb-5 bg-slate-950">
                <Image
                  src="https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=1200&q=80"
                  alt="Quirófano Veterinario de Alta Complejidad"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[11px] font-bold backdrop-blur-md">
                  Quirófano Clase A ISO
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                  <span className="font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Quirófano en Guardia Activa
                  </span>
                  <span className="font-mono text-emerald-300 bg-black/50 px-2 py-0.5 rounded text-[10px]">
                    24/7 STANDBY
                  </span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
                Unidad Quirúrgica &amp; Cuidado Crítico
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-5">
                Monitor multiparámetro, anestesia inhalatoria isoflurano computarizada y generador de oxígeno criogénico autónomo.
              </p>

              {/* Metrics Bar */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5">
                  <div className="text-2xl font-black text-emerald-400">99.4%</div>
                  <div className="text-[11px] text-slate-400 font-medium">Éxito en Intervenciones</div>
                </div>
                <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5">
                  <div className="text-2xl font-black text-amber-400">20 min</div>
                  <div className="text-[11px] text-slate-400 font-medium">Hemograma IDEXX In-House</div>
                </div>
              </div>
            </div>

            {/* Split Bottom Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Pet Gourmet Capsule */}
              <div className="rounded-3xl border border-white/15 bg-slate-900/80 backdrop-blur-xl p-5 hover:border-amber-400/50 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-amber-400/15 text-amber-300 border border-amber-400/30 tracking-wider">
                      PET GOURMET
                    </span>
                    <Sparkles className="w-4 h-4 text-amber-400" />
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">Nutrición Clínica</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Dietas renales, gastroentéricas y snacks 100% monoproteicos.
                  </p>
                </div>
                <div className="text-xs font-bold text-amber-400 mt-4 flex items-center gap-1">
                  <span>+250 Referencias</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Fear Free Protocol Capsule */}
              <div className="rounded-3xl border border-white/15 bg-slate-900/80 backdrop-blur-xl p-5 hover:border-teal-400/50 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-teal-400/15 text-teal-300 border border-teal-400/30 tracking-wider">
                      FEAR-FREE™
                    </span>
                    <ShieldCheck className="w-4 h-4 text-teal-400" />
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">Salas Cat-Friendly</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Aislamiento acústico y feromonas ambientales relajantes.
                  </p>
                </div>
                <div className="text-xs font-bold text-teal-400 mt-4 flex items-center gap-1">
                  <span>Cero Estrés Animal</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>

            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
