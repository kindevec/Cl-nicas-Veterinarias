'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Activity, 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown,
  MessageSquare, 
  ArrowRight,
  MessageCircle,
  Clock,
  Sparkles,
  Calendar,
  CheckCircle2,
  HelpCircle,
  ShieldCheck,
  Stethoscope,
  Microscope,
  Zap
} from 'lucide-react';
import { VETERINARY_SERVICES } from '@/lib/mockData';
import { formatUSD, buildWhatsAppUrl } from '@/lib/utils';

interface ServicesSectionProps {
  onSelectService: (serviceName: string) => void;
}

const CATEGORY_FILTERS = [
  { id: 'todos', label: 'Todos los Servicios' },
  { id: 'urgencias', label: 'Urgencias & UCI 24/7' },
  { id: 'cirugia', label: 'Cirugía de Alta Gama' },
  { id: 'consulta', label: 'Consulta & Diagnóstico' },
  { id: 'preventiva', label: 'Preventiva & Spa' },
];

export function ServicesSection({ onSelectService }: ServicesSectionProps) {
  const [activeCategory, setActiveCategory] = useState('todos');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Featured 3 services for interactive showcase slider
  const featuredServices = VETERINARY_SERVICES.slice(0, 3);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredServices.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isPaused, featuredServices.length]);

  const filteredServices = VETERINARY_SERVICES.filter((svc) => {
    if (activeCategory === 'todos') return true;
    if (activeCategory === 'urgencias') return svc.category.includes('Urgencias');
    if (activeCategory === 'cirugia') return svc.category.includes('Cirugía');
    if (activeCategory === 'consulta') return svc.category.includes('Consulta') || svc.category.includes('Diagnóstico');
    if (activeCategory === 'preventiva') return svc.category.includes('Vacunación') || svc.category.includes('Grooming');
    return true;
  });

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % featuredServices.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + featuredServices.length) % featuredServices.length);

  return (
    <div className="w-full">
      {/* 1. TOP HERO BANNER with Photographic Canvas & Modern Transition */}
      <section className="relative w-full min-h-[480px] sm:min-h-[520px] pt-32 sm:pt-36 pb-16 flex flex-col justify-center overflow-hidden bg-[#0D3D20] text-white">
        {/* Modern Photographic Canvas with Seamless Transition (Zero Dividing Lines) */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {/* Full-bleed Image Layer */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1600&q=85"
              alt="Laboratorio e imagenología de alta resolución VetCare"
              fill
              priority
              className="object-cover object-center lg:object-right"
              sizes="100vw"
              referrerPolicy="no-referrer"
            />
            {/* Silky Smooth Horizontal Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0D3D20] from-25% via-[#0D3D20] via-40% via-[#0D3D20]/60 via-65% to-transparent hidden lg:block" />
            {/* Vertical Gradient for Mobile Devices */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D3D20] from-40% via-[#0D3D20]/80 via-70% to-transparent lg:hidden" />
            {/* Subtle Top & Bottom Cinematic Vignette */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0D3D20]/60 via-transparent to-[#0D3D20]/80" />
          </div>

          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl lg:max-w-3xl space-y-4 text-left"
            >
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight drop-shadow-sm">
                Especialidades Médicas, <span className="text-emerald-400">Quirófano Quirúrgico</span> &amp; Diagnóstico 24/7
              </h1>

              <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed font-normal max-w-2xl">
                Infraestructura hospitalaria con estándares internacionales, unidad de cuidados intensivos continua y especialistas certificados en cada disciplina.
              </p>
            </motion.div>
        </div>
      </section>

      {/* 2. INTERACTIVE FEATURED SPOTLIGHT CAROUSEL */}
      <section className="py-12 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-between"
          >
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#1A6B38] uppercase tracking-wider font-mono">
                Especialidades Destacadas
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#0D3D20]">
                Unidades de Referencia Hospitalaria
              </h3>
            </div>

            {/* Subtítulo o indicador de auto-reproducción */}
            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Reproducción automática • Desliza para explorar</span>
            </div>
          </motion.div>

          {/* Carousel Card Container con Controles Flanqueados en los Costados */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
            className="relative rounded-[32px] overflow-hidden bg-[#0D3D20] text-white shadow-xl min-h-[340px] sm:min-h-[380px] flex items-center group"
          >
            {/* Botón Lateral Izquierdo (Ergonomía Kindev) */}
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Especialidad anterior"
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-amber-400 text-slate-900 shadow-2xl border border-white/40 flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95 backdrop-blur-md hover:scale-110"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
            </button>

            {/* Botón Lateral Derecho (Ergonomía Kindev) */}
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Siguiente especialidad"
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-amber-400 text-slate-900 shadow-2xl border border-white/40 flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95 backdrop-blur-md hover:scale-110"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
            </button>

            <AnimatePresence mode="popLayout">
              {featuredServices.map((feat, index) => {
                if (index !== currentSlide) return null;
                return (
                  <motion.div
                    key={feat.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.4 }}
                    className="grid grid-cols-1 lg:grid-cols-12 w-full min-h-full"
                  >
                    {/* Image side (edge-to-edge, zero box-in-box) */}
                    <div className="lg:col-span-6 relative min-h-[220px] lg:min-h-[380px]">
                      {feat.image && (
                        <Image
                          src={feat.image}
                          alt={feat.name}
                          fill
                          priority
                          className="object-cover object-center"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          referrerPolicy="no-referrer"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0D3D20] lg:bg-gradient-to-r lg:from-transparent lg:to-[#0D3D20]" />
                      <div className="absolute top-4 left-4 sm:left-16 flex gap-2">
                        <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#0D3D20] text-xs font-black shadow-sm">
                          {feat.badge || feat.category}
                        </span>
                        {feat.available247 && (
                          <span className="px-2.5 py-1 rounded-full bg-red-500 text-white text-[10px] font-bold shadow-sm flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                            24/7
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Content side */}
                    <div className="lg:col-span-6 p-6 sm:p-10 lg:pr-16 flex flex-col justify-between space-y-6">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-xs text-amber-300 font-mono font-bold uppercase tracking-wider">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>{feat.category}</span>
                        </div>

                        <h4 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                          {feat.name}
                        </h4>

                        <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-normal">
                          {feat.fullDescription || feat.shortDescription}
                        </p>

                        <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-emerald-200">
                          <div className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            <span>{feat.doctorInCharge}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-emerald-400" />
                            <span>{feat.duration}</span>
                          </div>
                        </div>
                      </div>

                      {/* Action Bar */}
                      <div className="pt-4 border-t border-emerald-800/60 flex flex-wrap items-center justify-between gap-4">
                        <div>
                          <span className="text-[10px] text-emerald-300/80 block font-medium">Inversión Estimada:</span>
                          <span className="text-2xl font-black text-white font-sans">
                            {formatUSD(feat.priceEstimate)}
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <a
                            href={buildWhatsAppUrl(`Consulta Urgente: ${feat.name}`)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border border-white/20"
                          >
                            <MessageCircle className="w-4 h-4 text-emerald-400" />
                            <span className="hidden sm:inline">WhatsApp</span>
                          </a>

                          <a
                            href="#citas"
                            onClick={(e) => {
                              e.preventDefault();
                              onSelectService(feat.name);
                            }}
                            className="px-6 py-2.5 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1.5"
                          >
                            <Calendar className="w-3.5 h-3.5" />
                            <span>Agendar Turno</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Slide Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
              {featuredServices.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    i === currentSlide ? 'w-7 bg-amber-400' : 'w-2 bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Ir al slide ${i + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. DYNAMIC SERVICES CATALOG (Zero Box-in-Box, Full Edge-to-Edge Cards) */}
      <section className="py-16 sm:py-24 bg-[#FAFBF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Header & Filter Pills */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-6"
          >
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#1A6B38] uppercase tracking-wider font-mono">
                Catálogo Hospitalario Completo
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0D3D20]">
                Especialidades &amp; Consultas
              </h2>
            </div>

            {/* Interactive Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
              {CATEGORY_FILTERS.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs transition-all whitespace-nowrap cursor-pointer ${
                    activeCategory === cat.id
                      ? 'bg-[#0D3D20] text-white font-bold shadow-sm'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Responsive Card Grid (Full Edge-to-Edge, Zero Box-in-Box) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredServices.map((svc, idx) => (
              <motion.div
                key={svc.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: (idx % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  {/* Full-bleed Edge-to-Edge Image Header (touches all top borders) */}
                  <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-slate-100">
                    {svc.image && (
                      <Image
                        src={svc.image}
                        alt={svc.name}
                        fill
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        referrerPolicy="no-referrer"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                    {/* Floating Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="text-[10px] font-extrabold px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#0D3D20] shadow-sm">
                        {svc.category}
                      </span>
                      {svc.available247 && (
                        <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-red-500 text-white shadow-sm flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                          24/7
                        </span>
                      )}
                    </div>

                    {/* Doctor & Duration Pill over the bottom of image */}
                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] text-white">
                      <span className="font-semibold drop-shadow-sm truncate max-w-[190px]">
                        {svc.doctorInCharge}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-sm text-emerald-300 font-mono text-[10px] shrink-0 font-bold">
                        {svc.duration}
                      </span>
                    </div>
                  </div>

                  {/* Clean Content Body */}
                  <div className="p-5 sm:p-6 space-y-3">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#1A6B38] transition-colors leading-snug">
                      {svc.name}
                    </h3>

                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                      {svc.shortDescription}
                    </p>

                    <div className="pt-1 text-xs text-slate-600 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1A6B38] shrink-0" />
                      <span className="text-slate-700 font-medium truncate">{svc.doctorSpecialty}</span>
                    </div>
                  </div>
                </div>

                {/* Footer with Inversion and Agendar CTA */}
                <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">Inversión Estimada:</span>
                    <span className="text-base sm:text-lg font-black text-[#0D3D20]">
                      {formatUSD(svc.priceEstimate)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={buildWhatsAppUrl(`Consulta Servicio: ${svc.name}`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-[#1A6B38] transition-all cursor-pointer"
                      title="Consultar por WhatsApp"
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-600" />
                    </a>

                    <a
                      href="#citas"
                      onClick={(e) => {
                        e.preventDefault();
                        onSelectService(svc.name);
                      }}
                      className="px-4 py-2 rounded-full bg-[#1A6B38] hover:bg-[#14532D] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1.5"
                    >
                      <span>Agendar</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. RUTA CLÍNICA DEL PACIENTE (Paso a Paso Interactivo) */}
      <section className="py-12 sm:py-16 bg-white border-t border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
            className="space-y-1 text-center max-w-3xl mx-auto"
          >
            <span className="text-xs font-bold text-[#1A6B38] uppercase tracking-wider font-mono">
              01 / PROTOCOLO HOSPITALARIO
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0D3D20]">
              La Ruta de Atención de tu Mascota
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Un flujo estandarizado paso a paso para garantizar diagnóstico certero, cero dolor y tranquilidad absoluta para ti.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {[
              {
                step: '01',
                title: 'Triage & Signos Vitales',
                desc: 'Evaluación rápida de saturación de O2, presión arterial Doppler, temperatura y clasificación de dolor en escala Glasgow.',
                icon: Activity,
                highlight: 'Atención Inmediata',
                image: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=600&q=80'
              },
              {
                step: '02',
                title: 'Diagnóstico In-House',
                desc: 'Bioquímica sanguínea en 15 min, Rayos X Digitales HD y ecografía Doppler para confirmar patologías con evidencia.',
                icon: Microscope,
                highlight: 'Tecnología IDEXX',
                image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=600&q=80'
              },
              {
                step: '03',
                title: 'Tratamiento Quirúrgico',
                desc: 'Quirófano estéril clase 10,000, anestesia Sevoflurano monitoreada continuamente y analgesia multimodal preventiva.',
                icon: Stethoscope,
                highlight: 'Seguridad Máxima',
                image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=600&q=80'
              },
              {
                step: '04',
                title: 'Recuperación & Alta',
                desc: 'Monitoreo en mantas térmicas, plan nutricional de alta hospitalaria y seguimiento médico directo por WhatsApp 24/7.',
                icon: ShieldCheck,
                highlight: 'Cuidado Fear-Free',
                image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=600&q=80'
              }
            ].map((p, idx) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="rounded-3xl bg-[#FAFBF7] border border-slate-200/80 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between overflow-hidden relative group hover:-translate-y-1"
                >
                  <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      referrerPolicy="no-referrer"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  
                  <div className="p-6 space-y-4 flex flex-col flex-1">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-[#1A6B38] font-mono tracking-wider">
                          PASO {p.step}
                        </span>
                        <span className="inline-block text-[10px] font-bold text-emerald-800 bg-emerald-100/70 px-2.5 py-0.5 rounded-full">
                          {p.highlight}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-slate-900 leading-snug group-hover:text-[#1A6B38] transition-colors">
                        {p.title}
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {p.desc}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-slate-200/60 flex items-center gap-1.5 text-[11px] font-semibold text-slate-600 mt-auto">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1A6B38]" />
                      <span>Protocolo Acreditado</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 5. TECNOLOGÍA & EQUIPAMIENTO HOSPITALARIO */}
      <section className="py-12 sm:py-16 bg-[#FAFBF7] border-t border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
            className="space-y-1 text-center max-w-3xl mx-auto"
          >
            <span className="text-xs font-bold text-[#1A6B38] uppercase tracking-wider font-mono">
              02 / INFRAESTRUCTURA BIOMÉDICA
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0D3D20]">
              Equipamiento Quirúrgico de Precisión
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Invertimos continuamente en tecnología médica para reducir los tiempos anestésicos y aumentar el éxito quirúrgico al 99.4%.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {[
              {
                title: 'Monitor Mindray ePM12M',
                spec: 'ECG, SpO2, PNI, Capnografía EtCO2 y Temperatura continua.',
                badge: 'Monitoreo Grado UCI',
                image: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=600&q=80'
              },
              {
                title: 'Anestesia Sevoflurano',
                spec: 'Inducción y despertar ultra rápido con ventilador mecánico asistido.',
                badge: 'Mínimo Riesgo Hepático',
                image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80'
              },
              {
                title: 'Rayos X Digital HD (DR)',
                spec: 'Adquisición de imagen ósea y pulmonar instantánea en 3 segundos.',
                badge: 'Baja Radiación',
                image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=600&q=80'
              },
              {
                title: 'Laboratorio IDEXX ProCyte',
                spec: 'Citometría de flujo láser y bioquímica seca con validación in-house.',
                badge: 'Resultado en 15 min',
                image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=600&q=80'
              }
            ].map((eq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all overflow-hidden group flex flex-col"
              >
                <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                  <Image
                    src={eq.image}
                    alt={eq.title}
                    fill
                    referrerPolicy="no-referrer"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="text-[10px] font-bold text-[#1A6B38] bg-emerald-50/90 backdrop-blur-sm px-2.5 py-0.5 rounded-full inline-block border border-emerald-200/60 shadow-sm">
                      {eq.badge}
                    </span>
                  </div>
                </div>
                
                <div className="p-5 sm:p-6 space-y-3 flex-1 flex flex-col">
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug group-hover:text-[#1A6B38] transition-colors">
                    {eq.title}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {eq.spec}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. PREGUNTAS FRECUENTES MÉDICAS (Interactive FAQ Accordion) */}
      <section className="py-12 sm:py-16 bg-white border-t border-slate-200/70">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
            className="space-y-1 text-center"
          >
            <span className="text-xs font-bold text-[#1A6B38] uppercase tracking-wider font-mono">
              03 / RESOLUCIÓN DE DUDAS MÉDICAS
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0D3D20]">
              Preguntas Frecuentes sobre Especialidades
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Información clara y transparente para que tomes la mejor decisión de salud para tu mascota.
            </p>
          </motion.div>

          <div className="space-y-3">
            {[
              {
                q: '¿Cómo manejan el riesgo en cirugías de animales mayores o braquicéfalos?',
                a: 'Utilizamos protocolos de anestesia balanceada con Sevoflurano (el gas anestésico más seguro del mundo veterinario), intubación asistida y monitoreo multiparamétrico constante de capnografía (EtCO2), presión arterial y electrocardiograma. Cada paciente de alto riesgo cuenta con un médico anestesiólogo dedicado exclusivamente durante toda la intervención.'
              },
              {
                q: '¿Qué preparación previa requiere una cirugía o procedimiento programado?',
                a: 'Se requiere un perfil prequirúrgico completo (hematología, química renal y hepática, y pruebas de coagulación) realizado máximo 7 días antes. El paciente debe guardar entre 6 y 8 horas de ayuno sólido (en cachorros o razas miniaturas el ayuno es menor) y agua disponible hasta 2 horas antes de ingresar.'
              },
              {
                q: '¿Cómo sé si la condición de mi mascota es una urgencia vital que requiere atención inmediata?',
                a: 'Son emergencias inmediatas: dificultad respiratoria evidente (respira con la boca abierta o abdomen hundido), convulsiones de más de 2 minutos, intentos de vomitar sin éxito con abdomen distendido (posible dilatación gástrica), hemorragias activas, ingestión de tóxicos o atropellamientos. Nuestro triage hospitalario 24/7 atiende sin cita previa.'
              },
              {
                q: '¿Ofrecen facilidades de pago o diferidos con tarjetas para procedimientos de alta complejidad?',
                a: 'Sí. Aceptamos todas las tarjetas de crédito nacionales e internacionales con planes de diferido de 3, 6, 9 y 12 meses (con y sin intereses según la entidad bancaria). También emitimos presupuestos médicos desglosados para reclamos ante aseguradoras veterinarias.'
              }
            ].map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-20px' }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="rounded-2xl border border-slate-200/90 overflow-hidden bg-[#FAFBF7] transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 hover:text-[#1A6B38] transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-3">
                      <HelpCircle className="w-5 h-5 text-[#1A6B38] shrink-0" />
                      <span>{faq.q}</span>
                    </span>
                    <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180 text-[#1A6B38]' : ''}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-5 pb-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/50 mt-1 pt-3">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 7. BANNER FINAL DE GUARDIA & CITAS */}
      <section className="py-10 bg-[#0D3D20] text-white border-t border-emerald-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-7 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xs text-center sm:text-left">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest font-mono">
                DISPONIBILIDAD HOSPITALARIA INMEDIATA
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                ¿Tu mascota necesita evaluación médica especializada?
              </h3>
              <p className="text-xs text-emerald-100/80">
                Agenda con nuestros especialistas de turno o comunícate directamente con la guardia de urgencias.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
              <a
                href="#citas"
                onClick={(e) => {
                  e.preventDefault();
                  onSelectService('Consulta Médica Especializada');
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Agendar Consulta</span>
              </a>
              <a
                href={buildWhatsAppUrl('Consulta con Especialista Médico')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-all border border-white/20 hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Guardia WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
