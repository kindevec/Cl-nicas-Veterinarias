'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { 
  Stethoscope, 
  Syringe, 
  Activity, 
  Sparkles, 
  PhoneCall, 
  Calendar, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  AlertTriangle,
  HeartPulse,
  Award
} from 'lucide-react';
import { buildWhatsAppUrl } from '@/lib/utils';

interface HeroProps {
  onSelectServiceForBooking: (serviceName: string) => void;
}

export function Hero({ onSelectServiceForBooking }: HeroProps) {
  const emergencyWaUrl = buildWhatsAppUrl('🚨 URGENCIAS VETERINARIAS 24/7 - Solicito ingreso prioritario para mi mascota');

  return (
    <section 
      id="hero" 
      className="relative overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-100/60 via-[#F8FAFC] to-[#F8FAFC] pt-12 pb-16 md:pt-20 md:pb-24"
    >
      {/* Ambient background glow orbs */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-40 -right-20 w-80 h-80 bg-teal-400/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-amber-400/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text & Actions Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Top Status Beacon Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-[#1A6B38] text-xs font-bold uppercase tracking-wider shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600" />
              </span>
              <span>Triage Quirúrgico 24/7 Activo</span>
              <span className="text-emerald-300">•</span>
              <span className="text-emerald-700 flex items-center gap-1 font-semibold">
                <Clock className="w-3.5 h-3.5 text-emerald-600" /> Ingreso Prioritario &lt; 5 min
              </span>
            </div>

            {/* Main H1 Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0D3D20] tracking-tight leading-[1.12]">
              Medicina veterinaria de{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1A6B38] via-[#059669] to-[#10B981]">
                alta precisión
              </span>{' '}
              y cuidado empático.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              En <strong className="text-[#0D3D20] font-bold">VetCare &amp; Pet Gourmet</strong> combinamos quirófanos estériles de presión positiva, diagnóstico ecográfico Doppler y protocolos <strong className="text-[#1A6B38]">Fear-Free™</strong> para garantizar tratamientos indoloros en un ambiente libre de ansiedad.
            </p>

            {/* Feature Highlights Grid (Clean White Glass Pills - Cielo Dental Style) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1 max-w-xl mx-auto lg:mx-0">
              <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-white border border-emerald-100 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-xs font-semibold text-slate-800">Quirófano Estéril ISO</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-white border border-emerald-100 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-xs font-semibold text-slate-800">Ecografía Doppler 3D</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-white border border-emerald-100 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-xs font-semibold text-slate-800">UCI 24/7 Monitoreada</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-white border border-emerald-100 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-xs font-semibold text-slate-800">Manejo Fear-Free™</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-white border border-emerald-100 shadow-sm col-span-2 sm:col-span-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-xs font-semibold text-slate-800">Nutrición &amp; Dietas de Prescripción</span>
              </div>
            </div>

            {/* Dual Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-3">
              {/* Primary Solid Button: Agendar Cita */}
              <button
                onClick={() => onSelectServiceForBooking('Consulta Médica Especializada')}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#1A6B38] hover:bg-[#14532D] text-white font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-lg shadow-emerald-900/20 hover:shadow-xl hover:scale-[1.02] flex items-center justify-center gap-2.5 cursor-pointer group"
              >
                <Calendar className="w-5 h-5 text-emerald-300 group-hover:scale-110 transition-transform" />
                <span>Agendar Cita Médica</span>
              </button>

              {/* Secondary Red Button: Servicios de Urgencia 24/7 */}
              <a
                href={emergencyWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full border-2 border-red-500 text-red-600 hover:bg-red-50 font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-sm flex items-center justify-center gap-2 cursor-pointer group hover:border-red-600"
              >
                <AlertTriangle className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform animate-pulse" />
                <span>Urgencias 24 Horas</span>
              </a>
            </div>

            {/* Direct Phone Call Context */}
            <div className="pt-2 flex items-center justify-center lg:justify-start gap-2 text-xs text-slate-500">
              <Clock className="w-3.5 h-3.5 text-emerald-600" />
              <span>¿Emergencia en camino? Triage telefónico inmediato:</span>
              <a
                href="tel:+593991952889"
                className="font-bold text-[#1A6B38] underline hover:text-[#0D3D20]"
              >
                +593 99 195 2889
              </a>
            </div>
          </motion.div>

          {/* Right Image & Floating Visual Cards (Clean Cielo Dental Style) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            {/* Main Clinical Doctor & Pet Container */}
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-gradient-to-br from-emerald-50 to-teal-50 group">
              <div className="relative w-full h-[420px] sm:h-[480px]">
                <Image
                  src="https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&w=1200&q=85"
                  alt="Doctora veterinaria examinando con amor a una mascota en clínica moderna"
                  fill
                  priority
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 500px"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Gradient Overlay at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D3D20]/80 via-transparent to-transparent opacity-80" />

              {/* Bottom Caption inside Image */}
              <div className="absolute bottom-4 left-4 right-4 text-white p-3.5 rounded-2xl bg-black/40 backdrop-blur-md border border-white/20">
                <p className="text-xs font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Dra. Carolina Martínez &amp; Equipo Quirúrgico
                </p>
                <p className="text-[11px] text-emerald-100 opacity-90 mt-0.5">
                  Especialistas certificados por AOVET en cirugía ortopédica y UCI felina/canina.
                </p>
              </div>
            </div>

            {/* Floating Card 1: Fear-Free™ Certificado (Top Left) */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute -top-4 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md p-3 sm:p-4 rounded-2xl shadow-xl border border-emerald-200/80 hidden sm:flex items-center gap-3 z-20"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#1A6B38] flex items-center justify-center font-bold text-lg shrink-0">
                <Sparkles className="w-5 h-5 text-[#1A6B38]" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#0D3D20]">Fear-Free™ Certificado</p>
                <p className="text-[10px] text-slate-500">Manejo sin estrés ni dolor</p>
              </div>
            </motion.div>

            {/* Floating Card 2: Respuesta Inmediata WhatsApp (Bottom Right) */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="absolute -bottom-6 -right-2 sm:-right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-emerald-200/80 flex items-center gap-3 z-20"
            >
              <div className="p-2.5 rounded-xl bg-[#1A6B38] text-white shrink-0 shadow-md">
                <PhoneCall className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#0D3D20]">Triage Inmediato</p>
                <p className="text-[10px] text-slate-500">WhatsApp Médico &lt; 3 min</p>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
