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
  X
} from 'lucide-react';
import { VETERINARY_SERVICES } from '@/lib/mockData';
import { VeterinaryService } from '@/lib/types';
import { formatCOP, buildWhatsAppUrl } from '@/lib/utils';

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
    <section id="servicios" className="py-20 md:py-28 relative overflow-hidden">
      
      {/* Ambient background glows */}
      <div className="absolute top-1/2 -left-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Editorial Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6"
        >
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold tracking-wide">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>SHOWCASE DE ALTA COMPLEJIDAD VETCARE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Excelencia Médica, Quirófano Estéril &amp; Diagnóstico
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl font-normal leading-relaxed">
              Infraestructura hospitalaria grado humano con estándares internacionales, UCI continua y médicos veterinarios especialistas en cada disciplina.
            </p>
          </div>

          <a
            id="services-emergency-whatsapp-top"
            href={buildWhatsAppUrl('Consulta con Especialista')}
            target="_blank"
            rel="noopener noreferrer"
            className="self-start md:self-auto inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] text-emerald-300 border border-emerald-500/30 text-xs font-bold shadow-lg shadow-black/40 hover:scale-105 active:scale-95 transition-all"
          >
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span>Hablar con Especialista de Guardia</span>
          </a>
        </motion.div>

        {/* ASYMMETRIC BENTO GRID (Destrucción total del Box-in-Box) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* BENTO 1: TARJETA PRINCIPAL PANORÁMICA (col-span-12 lg:col-span-8) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-12 lg:col-span-8 rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-emerald-950/40 border border-white/10 p-7 sm:p-9 flex flex-col justify-between relative overflow-hidden backdrop-blur-xl shadow-2xl shadow-black/60 group hover:border-emerald-500/50 transition-all"
          >
            {/* Background Texture & Ambient Light */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
            
            <div className="space-y-6 relative z-10">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
                    <AlertCircle className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <span className="px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-black tracking-wider uppercase">
                      CENTRO DE TRAUMA &amp; UCI 24/7
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                      {emergencySvc.name}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                    Guardia Activa 24 Horas
                  </span>
                </div>
              </div>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-normal">
                {emergencySvc.shortDescription} Equipado con generador de oxígeno continuo, bombas de infusión computarizadas y monitor hemodinámico multiparamétrico de nivel quirúrgico.
              </p>

              {/* Technical Specifications Pills */}
              <div className="flex flex-wrap gap-2 pt-2">
                {['Triage &lt; 5 min', 'Ventilación Mecánica Invasiva', 'Transfusión Sanguínea', 'Cirugía Traumatológica de Urgencia'].map((pill, idx) => (
                  <span key={idx} className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-medium text-slate-200 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{pill}</span>
                  </span>
                ))}
              </div>

              {/* Medical Doctor Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 border-y border-white/10 text-xs">
                <div className="flex items-center gap-3 text-slate-300">
                  <UserCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <div className="font-bold text-white text-sm">{emergencySvc.doctorInCharge}</div>
                    <div className="text-slate-400">{emergencySvc.doctorSpecialty}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <Clock className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <div className="font-bold text-white text-sm">Disponibilidad Inmediata</div>
                    <div className="text-slate-400">Atención sin cita previa en emergencias</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Action Footer */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 mt-4 border-t border-white/5 relative z-10">
              <div>
                <span className="text-[11px] text-slate-400 font-semibold tracking-wider uppercase block">Tarifa Triage Prioritario</span>
                <span className="text-2xl font-black text-emerald-400">
                  {formatCOP(emergencySvc.priceEstimate)}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  id="btn-detail-urgencias"
                  onClick={() => setSelectedServiceDetail(emergencySvc)}
                  className="px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-200 text-xs font-bold border border-white/10 transition-all cursor-pointer"
                >
                  Ver Protocolo Clínico
                </button>
                <a
                  id="btn-emergency-now"
                  href={buildWhatsAppUrl('Urgencia Veterinaria Inmediata')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white text-xs font-black shadow-lg shadow-rose-600/30 transition-all active:scale-95"
                >
                  Activar Triage Urgente
                </a>
              </div>
            </div>
          </motion.div>

          {/* BENTO 2: TARJETA VERTICAL DE DIAGNÓSTICO IDEXX (col-span-12 lg:col-span-4) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="md:col-span-12 lg:col-span-4 rounded-3xl bg-slate-900/80 border border-white/10 p-7 flex flex-col justify-between backdrop-blur-xl shadow-2xl shadow-black/60 group hover:border-emerald-400/50 transition-all"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-2xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-300">
                  <Microscope className="w-5 h-5" />
                </div>
                <span className="px-3 py-1 rounded-full bg-teal-500/15 text-teal-300 border border-teal-500/30 text-xs font-extrabold tracking-wider">
                  IN-HOUSE 20 MIN
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-2">{labSvc.name}</h3>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  Analizadores hematológicos y bioquímicos IDEXX Catalyst One®. Pruebas serológicas, electrolitos y gases sanguíneos con resultados en tiempo récord para decisiones clínicas seguras.
                </p>
              </div>

              {/* Lab Visual Graphic Widget */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/5 space-y-2.5">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Cuadro Hemático Completo:</span>
                  <span className="font-mono text-emerald-400 font-bold">12 min</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div className="w-4/5 h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full" />
                </div>

                <div className="flex justify-between text-xs text-slate-300 pt-1">
                  <span>Perfil Bioquímico Renal/Hepático:</span>
                  <span className="font-mono text-amber-400 font-bold">18 min</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div className="w-3/4 h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full" />
                </div>
              </div>

              <div className="text-xs text-slate-400 space-y-1 pt-1">
                <span className="text-slate-200 font-semibold block">{labSvc.doctorInCharge}</span>
                <span>{labSvc.doctorSpecialty}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-5 border-t border-white/10 mt-4">
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Panel Básico</span>
                <span className="text-lg font-black text-emerald-400">{formatCOP(labSvc.priceEstimate)}</span>
              </div>
              <button
                type="button"
                onClick={() => onSelectService(labSvc.name)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-emerald-500 hover:text-slate-950 text-white text-xs font-bold border border-white/10 transition-all cursor-pointer"
              >
                <span>Solicitar Lab</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>

          {/* BENTO 3: QUIRÓFANO DE ALTA COMPLEJIDAD (col-span-12 sm:col-span-6 lg:col-span-4) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-12 sm:col-span-6 lg:col-span-4 rounded-3xl bg-slate-900/70 border border-white/10 p-6 flex flex-col justify-between backdrop-blur-xl hover:border-emerald-500/40 transition-all group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Activity className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  {surgerySvc.badge}
                </span>
              </div>

              <h4 className="text-base font-bold text-white tracking-tight">{surgerySvc.name}</h4>
              <p className="text-xs text-slate-300 leading-relaxed font-normal line-clamp-3">
                {surgerySvc.shortDescription} Anestesia inhalatoria computarizada y monitoreo electrocardiógrafo en tiempo real.
              </p>

              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-slate-300">
                <span className="text-slate-400 block text-[10px]">Cirujano Especialista:</span>
                <span className="font-bold text-white block">{surgerySvc.doctorInCharge}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-4">
              <span className="text-sm font-extrabold text-emerald-400">{formatCOP(surgerySvc.priceEstimate)}</span>
              <button
                type="button"
                onClick={() => onSelectService(surgerySvc.name)}
                className="flex items-center gap-1 text-xs font-bold text-slate-200 hover:text-emerald-400 transition-colors"
              >
                <span>Valorar Caso</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>

          {/* BENTO 4: PROTOCOLO FEAR-FREE FELINO (col-span-12 sm:col-span-6 lg:col-span-4) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="md:col-span-12 sm:col-span-6 lg:col-span-4 rounded-3xl bg-slate-900/70 border border-white/10 p-6 flex flex-col justify-between backdrop-blur-xl hover:border-teal-500/40 transition-all group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-300">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-teal-500/15 text-teal-300 border border-teal-500/30">
                  {felineSvc.badge}
                </span>
              </div>

              <h4 className="text-base font-bold text-white tracking-tight">{felineSvc.name}</h4>
              <p className="text-xs text-slate-300 leading-relaxed font-normal line-clamp-3">
                {felineSvc.shortDescription} Consultorio exclusivo para gatos con difusores de feromonas Feliway® y cero contacto con perros.
              </p>

              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-slate-300">
                <span className="text-slate-400 block text-[10px]">Médico Especialista:</span>
                <span className="font-bold text-white block">{felineSvc.doctorInCharge}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-4">
              <span className="text-sm font-extrabold text-teal-300">{formatCOP(felineSvc.priceEstimate)}</span>
              <button
                type="button"
                onClick={() => onSelectService(felineSvc.name)}
                className="flex items-center gap-1 text-xs font-bold text-slate-200 hover:text-teal-300 transition-colors"
              >
                <span>Agendar Felino</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>

          {/* BENTO 5: SPA TERAPÉUTICO & DERMATOLOGÍA (col-span-12 lg:col-span-4) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-span-12 sm:col-span-12 lg:col-span-4 rounded-3xl bg-slate-900/70 border border-white/10 p-6 flex flex-col justify-between backdrop-blur-xl hover:border-amber-400/40 transition-all group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-300">
                  <Sparkles className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-400/15 text-amber-300 border border-amber-400/30">
                  {groomingSvc.badge}
                </span>
              </div>

              <h4 className="text-base font-bold text-white tracking-tight">{groomingSvc.name}</h4>
              <p className="text-xs text-slate-300 leading-relaxed font-normal line-clamp-3">
                {groomingSvc.shortDescription} Ozonoterapia, baños medicados hipoalergénicos con formulaciones dermatológicas de alta pureza.
              </p>

              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-slate-300">
                <span className="text-slate-400 block text-[10px]">Especialista Estética:</span>
                <span className="font-bold text-white block">{groomingSvc.doctorInCharge}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-4">
              <span className="text-sm font-extrabold text-amber-400">{formatCOP(groomingSvc.priceEstimate)}</span>
              <button
                type="button"
                onClick={() => onSelectService(groomingSvc.name)}
                className="flex items-center gap-1 text-xs font-bold text-slate-200 hover:text-amber-300 transition-colors"
              >
                <span>Reservar Spa</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>

        </div>

        {/* Modal for Service Protocol Inspection */}
        <AnimatePresence>
          {selectedServiceDetail && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-slate-950 border border-white/15 rounded-3xl max-w-xl w-full p-7 space-y-5 shadow-2xl shadow-black relative"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                      Protocolo Clínico Oficial VetCare
                    </span>
                    <h3 className="text-xl font-black text-white mt-1">
                      {selectedServiceDetail.name}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedServiceDetail(null)}
                    className="p-1.5 rounded-xl bg-white/5 text-slate-400 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed font-normal">
                  {selectedServiceDetail.fullDescription}
                </p>

                <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 space-y-2.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-medium">Médico Veterinario a cargo:</span>
                    <span className="font-bold text-white">{selectedServiceDetail.doctorInCharge}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-medium">Tiempo estimado de atención:</span>
                    <span className="text-emerald-300 font-bold">{selectedServiceDetail.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-medium">Arancel de referencia:</span>
                    <span className="text-emerald-400 font-extrabold text-sm">{formatCOP(selectedServiceDetail.priceEstimate)}</span>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      onSelectService(selectedServiceDetail.name);
                      setSelectedServiceDetail(null);
                    }}
                    className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/20 transition-all text-center"
                  >
                    Agendar Esta Especialidad
                  </button>
                  <a
                    href={buildWhatsAppUrl(selectedServiceDetail.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-200 font-bold text-xs border border-white/10 text-center transition-all"
                  >
                    WhatsApp
                  </a>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
