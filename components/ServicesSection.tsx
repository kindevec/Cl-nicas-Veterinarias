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
  UserCheck, 
  ChevronRight, 
  MessageSquare, 
  CalendarCheck2,
  CheckCircle2,
  HeartPulse,
  Flame,
  X,
  ArrowRight
} from 'lucide-react';
import { VETERINARY_SERVICES } from '@/lib/mockData';
import { VeterinaryService } from '@/lib/types';
import { formatUSD, buildWhatsAppUrl } from '@/lib/utils';

interface ServicesSectionProps {
  onSelectService: (serviceName: string) => void;
}

export function ServicesSection({ onSelectService }: ServicesSectionProps) {
  const [selectedServiceDetail, setSelectedServiceDetail] = useState<VeterinaryService | null>(null);

  const emergencySvc = VETERINARY_SERVICES[0];
  const surgerySvc = VETERINARY_SERVICES[2];
  const labSvc = VETERINARY_SERVICES[3];
  const felineSvc = VETERINARY_SERVICES[1];
  const groomingSvc = VETERINARY_SERVICES[5];
  const preventionSvc = VETERINARY_SERVICES[4];

  return (
    <section id="servicios" className="py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-14">
        
        {/* Section Editorial Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-8"
        >
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-[#1A6B38] text-xs font-bold tracking-wide shadow-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>UNIDADES CLÍNICAS DE ALTA COMPLEJIDAD</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0D3D20] tracking-tight leading-tight">
              Excelencia Médica, Quirófano Estéril &amp; Diagnóstico 24/7
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-2xl leading-relaxed">
              Infraestructura hospitalaria con estándares AOVET, unidad de cuidados intensivos y especialistas en cada disciplina para salvar vidas.
            </p>
          </div>

          <a
            id="services-emergency-whatsapp-top"
            href={buildWhatsAppUrl('Consulta con Especialista de Guardia')}
            target="_blank"
            rel="noopener noreferrer"
            className="self-start md:self-auto inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#1A6B38] hover:bg-[#14532D] text-white text-xs font-bold shadow-md hover:scale-105 transition-all"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Hablar con Especialista en Turno</span>
          </a>
        </motion.div>

        {/* ASYMMETRIC BENTO GRID (Clean Light Medical Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* BENTO 1: TARJETA PRINCIPAL PANORÁMICA - URGENCIAS & UCI 24/7 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-12 lg:col-span-8 rounded-3xl bg-white border border-slate-200/90 p-8 sm:p-10 flex flex-col justify-between shadow-md hover:shadow-xl hover:border-emerald-300 transition-all duration-300 relative overflow-hidden group"
          >
            <div className="space-y-6 relative z-10">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-center text-red-600 shadow-sm">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-red-600 uppercase tracking-wider block font-mono">Triage Rojo &amp; UCI Activa</span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">{emergencySvc.name}</h3>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
                  Ingreso Inmediato 24/7
                </span>
              </div>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {emergencySvc.shortDescription}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <span className="text-[11px] text-slate-500 block">Tiempo de Ingreso:</span>
                  <span className="text-xs font-bold text-slate-900">{emergencySvc.duration}</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <span className="text-[11px] text-slate-500 block">Especialista a Cargo:</span>
                  <span className="text-xs font-bold text-slate-900">{emergencySvc.doctorInCharge}</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200/80">
                  <span className="text-[11px] text-emerald-700 block font-medium">Estimado Base:</span>
                  <span className="text-xs font-extrabold text-[#1A6B38]">{formatUSD(emergencySvc.priceEstimate)}</span>
                </div>
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
              <button
                onClick={() => setSelectedServiceDetail(emergencySvc)}
                className="text-xs font-bold text-slate-600 hover:text-[#1A6B38] transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>Ver Protocolo Hospitalario Detallado</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onSelectService(emergencySvc.name)}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:scale-105 cursor-pointer flex items-center justify-center gap-2"
              >
                <AlertCircle className="w-4 h-4" />
                <span>Solicitar Ingreso de Urgencia</span>
              </button>
            </div>
          </motion.div>

          {/* BENTO 2: CIRUGÍA DE ALTA COMPLEJIDAD AOVET (col-span-12 lg:col-span-4) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-12 lg:col-span-4 rounded-3xl bg-white border border-slate-200/90 p-8 flex flex-col justify-between shadow-md hover:shadow-xl hover:border-emerald-300 transition-all duration-300 group"
          >
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#1A6B38] shadow-sm">
                  <Activity className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  Estándar AOVET
                </span>
              </div>

              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block font-mono">Quirófano Estéril</span>
                <h3 className="text-xl font-extrabold text-slate-900 mt-1">{surgerySvc.name}</h3>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {surgerySvc.shortDescription}
              </p>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Cirujano:</span>
                  <span className="font-bold text-slate-900">{surgerySvc.doctorInCharge}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Monitoreo:</span>
                  <span className="font-semibold text-emerald-700">Gases &amp; Sevoflurano</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-slate-200">
                  <span className="text-slate-500">Estimado:</span>
                  <span className="font-extrabold text-[#1A6B38]">{formatUSD(surgerySvc.priceEstimate)}</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100">
              <button
                onClick={() => onSelectService(surgerySvc.name)}
                className="w-full py-3 rounded-full bg-[#1A6B38] hover:bg-[#14532D] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm hover:scale-105 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Agendar Quirófano</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* BENTO 3: DIAGNÓSTICO & LABORATORIO IN-HOUSE (col-span-12 md:col-span-6 lg:col-span-4) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-6 lg:col-span-4 rounded-3xl bg-white border border-slate-200/90 p-7 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all duration-300"
          >
            <div className="space-y-4">
              <div className="w-11 h-11 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700 shadow-sm">
                <Microscope className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-teal-700 uppercase tracking-wider block font-mono">IDEXX Digital</span>
                <h4 className="text-lg font-bold text-slate-900 mt-0.5">{labSvc.name}</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{labSvc.shortDescription}</p>
              <div className="p-3 rounded-2xl bg-slate-50 text-xs flex justify-between items-center">
                <span className="text-slate-500">Tiempo de Entrega:</span>
                <span className="font-bold text-teal-700">15 - 20 minutos</span>
              </div>
            </div>
            <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-[#1A6B38]">{formatUSD(labSvc.priceEstimate)}</span>
              <button
                onClick={() => onSelectService(labSvc.name)}
                className="px-4 py-2 rounded-full bg-slate-100 hover:bg-emerald-50 text-slate-800 hover:text-[#1A6B38] text-xs font-bold transition-colors cursor-pointer"
              >
                Solicitar Exámenes
              </button>
            </div>
          </motion.div>

          {/* BENTO 4: CONSULTA GENERAL & MEDICINA FELINA FEAR FREE (col-span-12 md:col-span-6 lg:col-span-4) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:col-span-6 lg:col-span-4 rounded-3xl bg-white border border-slate-200/90 p-7 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all duration-300"
          >
            <div className="space-y-4">
              <div className="w-11 h-11 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-700 shadow-sm">
                <Stethoscope className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block font-mono">Manejo Amigable</span>
                <h4 className="text-lg font-bold text-slate-900 mt-0.5">{felineSvc.name}</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{felineSvc.shortDescription}</p>
              <div className="p-3 rounded-2xl bg-slate-50 text-xs flex justify-between items-center">
                <span className="text-slate-500">Duración:</span>
                <span className="font-bold text-amber-700">45 minutos dedicados</span>
              </div>
            </div>
            <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-[#1A6B38]">{formatUSD(felineSvc.priceEstimate)}</span>
              <button
                onClick={() => onSelectService(felineSvc.name)}
                className="px-4 py-2 rounded-full bg-slate-100 hover:bg-emerald-50 text-slate-800 hover:text-[#1A6B38] text-xs font-bold transition-colors cursor-pointer"
              >
                Agendar Consulta
              </button>
            </div>
          </motion.div>

          {/* BENTO 5: SPA & DERMATOLOGÍA VETERINARIA (col-span-12 md:col-span-12 lg:col-span-4) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="md:col-span-12 lg:col-span-4 rounded-3xl bg-white border border-slate-200/90 p-7 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all duration-300"
          >
            <div className="space-y-4">
              <div className="w-11 h-11 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-700 shadow-sm">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-rose-700 uppercase tracking-wider block font-mono">Dermocosmética Médica</span>
                <h4 className="text-lg font-bold text-slate-900 mt-0.5">{groomingSvc.name}</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{groomingSvc.shortDescription}</p>
              <div className="p-3 rounded-2xl bg-slate-50 text-xs flex justify-between items-center">
                <span className="text-slate-500">Ozono &amp; Acondicionamiento:</span>
                <span className="font-bold text-rose-700">Incluido en sesión</span>
              </div>
            </div>
            <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-[#1A6B38]">{formatUSD(groomingSvc.priceEstimate)}</span>
              <button
                onClick={() => onSelectService(groomingSvc.name)}
                className="px-4 py-2 rounded-full bg-slate-100 hover:bg-emerald-50 text-slate-800 hover:text-[#1A6B38] text-xs font-bold transition-colors cursor-pointer"
              >
                Reservar Turno
              </button>
            </div>
          </motion.div>

        </div>

      </div>

      {/* Service Detail Modal (Clean White Glass Layout) */}
      <AnimatePresence>
        {selectedServiceDetail && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-xl w-full p-6 sm:p-8 space-y-6 relative overflow-hidden"
            >
              <button
                onClick={() => setSelectedServiceDetail(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-2">
                <span className="text-xs font-bold text-[#1A6B38] uppercase tracking-wider font-mono">
                  {selectedServiceDetail.category}
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 leading-tight">
                  {selectedServiceDetail.name}
                </h3>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed">
                {selectedServiceDetail.fullDescription}
              </p>

              <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs">
                <div>
                  <span className="text-slate-500 block">Especialista a cargo:</span>
                  <span className="font-bold text-slate-900">{selectedServiceDetail.doctorInCharge}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Especialidad:</span>
                  <span className="font-bold text-slate-900">{selectedServiceDetail.doctorSpecialty}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Duración Estimada:</span>
                  <span className="font-bold text-slate-900">{selectedServiceDetail.duration}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Inversión Estimada:</span>
                  <span className="font-extrabold text-[#1A6B38]">{formatUSD(selectedServiceDetail.priceEstimate)}</span>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => {
                    const svcName = selectedServiceDetail.name;
                    setSelectedServiceDetail(null);
                    onSelectService(svcName);
                  }}
                  className="flex-1 py-3.5 rounded-full bg-[#1A6B38] hover:bg-[#14532D] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
                >
                  Agendar Turno Para Este Servicio
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
