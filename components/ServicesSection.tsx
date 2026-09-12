'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Activity, 
  ChevronLeft, 
  ChevronRight, 
  MessageSquare, 
  ArrowRight,
  MessageCircle,
  Clock,
  Sparkles,
  Calendar,
  CheckCircle2
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

  // Featured 3 services for interactive showcase slider
  const featuredServices = VETERINARY_SERVICES.slice(0, 3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredServices.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [featuredServices.length]);

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
      {/* 1. TOP HERO BANNER with Full-Bleed Background (SmartLegal Standard) */}
      <section className="relative w-full min-h-[460px] sm:min-h-[500px] pt-32 sm:pt-36 pb-14 flex flex-col justify-center overflow-hidden bg-[#0D3D20] text-white">
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
            className="max-w-3xl space-y-4"
          >
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
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
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#1A6B38] uppercase tracking-wider font-mono">
                Especialidades Destacadas
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#0D3D20]">
                Unidades de Referencia Hospitalaria
              </h3>
            </div>

            {/* Slider Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={prevSlide}
                aria-label="Especialidad anterior"
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-[#0D3D20] hover:text-white text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextSlide}
                aria-label="Siguiente especialidad"
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-[#0D3D20] hover:text-white text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Carousel Card Container */}
          <div className="relative rounded-[32px] overflow-hidden bg-[#0D3D20] text-white shadow-xl min-h-[340px] sm:min-h-[380px] flex items-center">
            <AnimatePresence mode="wait">
              {featuredServices.map((feat, index) => {
                if (index !== currentSlide) return null;
                return (
                  <motion.div
                    key={feat.id}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.45 }}
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
                      <div className="absolute top-4 left-4 flex gap-2">
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
                    <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between space-y-6">
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
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
              {featuredServices.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    i === currentSlide ? 'w-6 bg-amber-400' : 'w-2 bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Ir al slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. DYNAMIC SERVICES CATALOG (Zero Box-in-Box, Full Edge-to-Edge Cards) */}
      <section className="py-16 sm:py-24 bg-[#FAFBF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Header & Filter Pills */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-6">
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
          </div>

          {/* Responsive Card Grid (Full Edge-to-Edge, Zero Box-in-Box) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredServices.map((svc) => (
              <div
                key={svc.id}
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
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}
