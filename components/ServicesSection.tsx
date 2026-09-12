'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { 
  AlertCircle, 
  Stethoscope, 
  Activity, 
  Microscope, 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  ChevronRight, 
  MessageSquare, 
  HeartPulse,
  ArrowRight,
  X
} from 'lucide-react';
import { VETERINARY_SERVICES } from '@/lib/mockData';
import { VeterinaryService } from '@/lib/types';
import { formatUSD, buildWhatsAppUrl } from '@/lib/utils';

interface ServicesSectionProps {
  onSelectService: (serviceName: string) => void;
}

export function ServicesSection({ onSelectService }: ServicesSectionProps) {
  const [selectedServiceDetail, setSelectedServiceDetail] = useState<VeterinaryService | null>(null);

  return (
    <div className="w-full">
      {/* 1. TOP HERO BANNER with Full-Bleed Background (SmartLegal Standard) */}
      <section className="relative min-h-[380px] sm:min-h-[440px] pt-32 sm:pt-40 pb-16 flex flex-col justify-center overflow-hidden bg-[#0D3D20] text-white">
        <div className="absolute inset-0 pointer-events-none opacity-25">
          <Image
            src="https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=2000&q=80"
            alt="Laboratorio e imagenología de alta resolución VetCare"
            fill
            priority
            className="object-cover object-center"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D3D20] via-[#0D3D20]/90 to-[#0D3D20]/40" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <Activity className="w-4 h-4 text-emerald-400" />
              <span>UNIDADES CLÍNICAS QUIRÚRGICAS &amp; UCI</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Especialidades Médicas, <span className="text-emerald-400">Quirófano AOVET</span> &amp; Diagnóstico 24/7
            </h1>

            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed font-normal">
              Infraestructura hospitalaria con estándares internacionales, unidad de cuidados intensivos continua y especialistas certificados en cada disciplina.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. SERVICES CATALOG (Clean Open Cards, Zero Box-in-Box) */}
      <section className="py-16 sm:py-24 bg-[#FAFBF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-6">
            <div>
              <span className="text-xs font-bold text-[#1A6B38] uppercase tracking-wider font-mono">
                Catálogo Hospitalario
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0D3D20] mt-1">
                Servicios Médicos Disponibles
              </h2>
            </div>
            <a
              href={buildWhatsAppUrl('Consulta con Especialista de Guardia')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#1A6B38] hover:text-[#0D3D20] underline transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Hablar con Especialista de Guardia</span>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {VETERINARY_SERVICES.map((svc) => (
              <div
                key={svc.id}
                className="bg-white rounded-3xl p-7 shadow-sm hover:shadow-md border border-slate-200/80 transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-[#1A6B38] border border-emerald-200">
                      {svc.category}
                    </span>
                    {svc.available247 && (
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-red-100 text-red-700">
                        24/7 Activo
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 leading-snug">
                    {svc.name}
                  </h3>

                  <p className="text-xs text-slate-500 leading-relaxed">
                    {svc.shortDescription}
                  </p>

                  <div className="pt-2 text-xs text-slate-600 space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Doctor a cargo:</span>
                      <span className="font-semibold text-slate-800">{svc.doctorInCharge}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Tiempo estimado:</span>
                      <span className="font-semibold text-slate-800">{svc.duration}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 mt-6 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">Inversión:</span>
                    <span className="text-base font-extrabold text-[#0D3D20]">
                      {formatUSD(svc.priceEstimate)}
                    </span>
                  </div>

                  <button
                    onClick={() => onSelectService(svc.name)}
                    className="px-4 py-2 rounded-full bg-[#1A6B38] hover:bg-[#14532D] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm hover:scale-105 cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Agendar</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}
