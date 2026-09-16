'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { Hero } from '@/components/Hero';
import { AboutSection } from '@/components/AboutSection';
import { ServicesSection } from '@/components/ServicesSection';
import { SmartNutritionCalculator } from '@/components/SmartNutritionCalculator';
import { PetShopSection } from '@/components/PetShopSection';
import { AppointmentScheduler } from '@/components/AppointmentScheduler';
import { WhatsAppEmergencyFloat } from '@/components/WhatsAppEmergencyFloat';
import { HomeExecutiveShowcase } from '@/components/HomeExecutiveShowcase';
import { Footer } from '@/components/Footer';
import { 
  ArrowRight, 
  Calendar, 
  Sparkles,
  FileText,
  CheckCircle2,
  Clock,
  MapPin,
  Car,
  ShieldCheck,
  MessageCircle,
  Phone
} from 'lucide-react';
import { buildWhatsAppUrl } from '@/lib/utils';
import { 
  PetProduct, 
  Appointment,
  CorporateTab
} from '@/lib/types';
import { 
  getStoredAppointments, 
  getStoredProducts 
} from '@/lib/supabaseClient';
import { 
  parseTabFromHash, 
  getHashForTab, 
  scrollToTarget 
} from '@/lib/navigation';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<CorporateTab>('inicio');
  const [bookingService, setBookingService] = useState<string | undefined>(undefined);

  // Appointments & Products State
  const [appointments, setAppointments] = useState<Appointment[]>(() => getStoredAppointments());
  const [products] = useState<PetProduct[]>(() => getStoredProducts());

  // Synchronize tab state with URL hash and browser history (Back / Forward buttons)
  useEffect(() => {
    const syncFromUrl = (isInitial = false) => {
      const { tab, subTarget } = parseTabFromHash(window.location.hash);
      setActiveTab((curr) => {
        if (curr !== tab) return tab;
        return curr;
      });

      // Handle smooth scrolling to target or top
      if (subTarget) {
        setTimeout(() => {
          scrollToTarget(subTarget);
        }, isInitial ? 350 : 120);
      } else if (!isInitial) {
        scrollToTarget(undefined);
      }
    };

    // Initial check on load
    syncFromUrl(true);

    // Listen to browser Back / Forward events
    const handlePopState = () => {
      syncFromUrl(false);
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  // Primary Navigation Handler across the 5 Corporate Tabs
  const handleNavigate = useCallback((tabOrHash: string, subTarget?: string) => {
    const { tab, subTarget: parsedSub } = parseTabFromHash(tabOrHash);
    const finalSub = subTarget || parsedSub;
    const targetHash = getHashForTab(tab, finalSub);

    if (activeTab !== tab) {
      if (typeof window !== 'undefined') {
        window.history.pushState({ tab, subTarget: finalSub }, '', targetHash);
      }
      setActiveTab(tab);

      if (finalSub) {
        setTimeout(() => {
          scrollToTarget(finalSub);
        }, 160);
      } else {
        scrollToTarget(undefined);
      }
    } else {
      // Same tab: push history if hash is different, then scroll
      if (typeof window !== 'undefined') {
        if (window.location.hash !== targetHash) {
          window.history.pushState({ tab, subTarget: finalSub }, '', targetHash);
        }
      }
      if (finalSub) {
        scrollToTarget(finalSub);
      } else {
        scrollToTarget(undefined);
      }
    }
  }, [activeTab]);

  // Service Selection for Booking
  const handleSelectServiceForBooking = useCallback((serviceName: string) => {
    setBookingService(serviceName);
    handleNavigate('citas', 'agendar');
  }, [handleNavigate]);

  return (
    <div className="min-h-screen bg-[#FAFBF7] text-slate-900 flex flex-col selection:bg-emerald-100 selection:text-emerald-900 font-sans">
      {/* 1. Header with Full Contrast & Semantic Anchors */}
      <Header
        activeSection={activeTab}
        onNavigate={handleNavigate}
      />

      {/* Main Container - Full-bleed top so hero banners sit seamlessly under the header */}
      <main className="overflow-x-hidden w-full pb-20 md:pb-0 flex-1">
        <AnimatePresence mode="wait">
          {/* TAB 1: INICIO */}
          {activeTab === 'inicio' && (
            <motion.div
              key="tab-inicio"
              id="inicio"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <Hero 
                onSelectServiceForBooking={handleSelectServiceForBooking} 
                onNavigate={handleNavigate}
              />
              
              {/* Executive Summary Showcase of all other sections (La Clínica, Especialidades, Pet Shop Gourmet, Casos Reales & Citas) */}
              <HomeExecutiveShowcase 
                onNavigate={handleNavigate}
                onSelectServiceForBooking={handleSelectServiceForBooking}
              />
            </motion.div>
          )}

          {/* TAB 2: NOSOTROS / LA CLÍNICA */}
          {activeTab === 'nosotros' && (
            <motion.div
              key="tab-nosotros"
              id="nosotros"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <AboutSection onNavigateToBooking={() => handleNavigate('citas', 'agendar')} />
            </motion.div>
          )}

          {/* TAB 3: SERVICIOS / ESPECIALIDADES */}
          {activeTab === 'servicios' && (
            <motion.div
              key="tab-servicios"
              id="servicios"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <ServicesSection onSelectService={handleSelectServiceForBooking} />
            </motion.div>
          )}

          {/* TAB 4: PET SHOP GOURMET & FARMACIA */}
          {activeTab === 'petshop' && (
            <motion.div
              key="tab-petshop"
              id="petshop"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <PetShopSection products={products} />
            </motion.div>
          )}

          {/* TAB 5: CONTACTO */}
          {activeTab === 'citas' && (
            <motion.div
              key="tab-citas"
              id="citas"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
                            {/* Standardized Unified Banner for Contacto with Modern Photographic Transition */}
              <section className="relative w-full min-h-[520px] sm:min-h-[580px] pt-32 sm:pt-36 pb-16 flex flex-col justify-center overflow-hidden bg-[#0D3D20] text-white">
                {/* Modern Photographic Canvas with Seamless Transition (Zero Dividing Lines) */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                  {/* Full-bleed Image Layer */}
                  <div className="absolute inset-0 w-full h-full">
                    <Image
                      src="https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=1600&q=85"
                      alt="Contacto VetCare Gourmet — Hospital Veterinario en Quito"
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
                  <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-2xl lg:max-w-3xl space-y-5 text-left"
                    >
                      <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight drop-shadow-sm">
                        Contacto <span className="text-emerald-400">&amp; Urgencias</span> 24/7
                      </h1>

                      <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed font-normal max-w-2xl">
                        Agenda tu consulta médica con especialistas certificados o comunícate de inmediato con nuestra central de guardia y triage hospitalario en Quito.
                      </p>

                      {/* Quick-Access Contact Pills */}
                      <div className="flex flex-wrap items-center gap-3 pt-2">
                        <a
                          href={buildWhatsAppUrl('Hola, necesito agendar una consulta médica')}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-5 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>WhatsApp Directo</span>
                        </a>
                        <a
                          href="tel:+593999999999"
                          className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-all border border-white/20 hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2 backdrop-blur-sm"
                        >
                          <Phone className="w-4 h-4 text-amber-300" />
                          <span>Llamar Ahora</span>
                        </a>
                      </div>
                    </motion.div>
                </div>
              </section>

              {/* 1. Primary Hub: Canvas Layout for Appointments & Hospital Contact */}
              <div id="agendar">
                <AppointmentScheduler
                  initialService={bookingService}
                  onAppointmentCreated={(newApt) => setAppointments((prev) => [newApt, ...prev])}
                />
              </div>

              {/* 2. Complementary WSAVA Clinical Nutrition Calculator */}
              <div id="calculadora-nutricional" className="py-16 bg-white border-t border-slate-200/80">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5 }}
                  className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center space-y-2"
                >
                  <span className="text-xs font-bold text-[#1A6B38] uppercase tracking-wider font-mono">
                    Herramienta Médica Complementaria
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-extrabold text-[#0D3D20]">
                    Calculadora Nutricional WSAVA
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
                    Conoce el requerimiento calórico e hídrico exacto de tu mascota según especie, edad y condición antes de tu consulta médica.
                  </p>
                </motion.div>
                <SmartNutritionCalculator 
                  onSelectServiceForBooking={handleSelectServiceForBooking}
                />
              </div>

              {/* 3. Guía de Preparación Previa para tu Consulta Médica */}
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
                      01 / INDICACIONES PREVIAS
                    </span>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0D3D20]">
                      Preparación para tu Cita Médica
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500">
                      Recomendaciones sencillas para que la atención de tu mascota sea precisa, segura y libre de estrés.
                    </p>
                  </motion.div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="rounded-3xl bg-white border border-slate-200/80 shadow-xs overflow-hidden flex flex-col group">
                      <div className="relative h-44 w-full bg-slate-100 shrink-0 overflow-hidden">
                        <Image src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80" fill alt="Documentación Médica" className="object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/20 to-transparent" />
                        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30 text-white text-[10px] font-bold tracking-wider uppercase">
                          Paso 1
                        </div>
                      </div>
                      <div className="p-6 sm:p-7 flex-1 flex flex-col space-y-3 relative">
                        <div className="absolute -top-6 left-6 w-12 h-12 rounded-2xl bg-white text-[#1A6B38] flex items-center justify-center border border-emerald-100 shadow-md z-10">
                          <FileText className="w-6 h-6" />
                        </div>
                        <h4 className="text-base font-bold text-slate-900 leading-snug pt-2">
                          Documentación &amp; Historial
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed flex-1">
                          Trae su carnet de vacunación vigente, desparasitaciones y exámenes de laboratorio o ecografías previas para enriquecer la historia clínica.
                        </p>
                        <div className="pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-[#1A6B38] mt-auto">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Historial Digital Centralizado</span>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-3xl bg-white border border-slate-200/80 shadow-xs overflow-hidden flex flex-col group">
                      <div className="relative h-44 w-full bg-slate-100 shrink-0 overflow-hidden">
                        <Image src="https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=600&q=80" fill alt="Protocolo de Ayuno" className="object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/20 to-transparent" />
                        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30 text-white text-[10px] font-bold tracking-wider uppercase">
                          Paso 2
                        </div>
                      </div>
                      <div className="p-6 sm:p-7 flex-1 flex flex-col space-y-3 relative">
                        <div className="absolute -top-6 left-6 w-12 h-12 rounded-2xl bg-white text-[#1A6B38] flex items-center justify-center border border-emerald-100 shadow-md z-10">
                          <Clock className="w-6 h-6" />
                        </div>
                        <h4 className="text-base font-bold text-slate-900 leading-snug pt-2">
                          Protocolo de Ayuno
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed flex-1">
                          Si tu mascota tiene programada ecografía abdominal, analítica de sangre o sedación, requiere de 8 a 12 horas de ayuno sólido. Mantén siempre agua a libre disposición.
                        </p>
                        <div className="pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-[#1A6B38] mt-auto">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Agua Fresca Permitida</span>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-3xl bg-white border border-slate-200/80 shadow-xs overflow-hidden flex flex-col group">
                      <div className="relative h-44 w-full bg-slate-100 shrink-0 overflow-hidden">
                        <Image src="https://images.unsplash.com/photo-1450778869180-41d0601e0e68?auto=format&fit=crop&w=600&q=80" fill alt="Transporte Seguro" className="object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/20 to-transparent" />
                        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30 text-white text-[10px] font-bold tracking-wider uppercase">
                          Paso 3
                        </div>
                      </div>
                      <div className="p-6 sm:p-7 flex-1 flex flex-col space-y-3 relative">
                        <div className="absolute -top-6 left-6 w-12 h-12 rounded-2xl bg-white text-[#1A6B38] flex items-center justify-center border border-emerald-100 shadow-md z-10">
                          <ShieldCheck className="w-6 h-6" />
                        </div>
                        <h4 className="text-base font-bold text-slate-900 leading-snug pt-2">
                          Transporte Seguro Fear-Free
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed flex-1">
                          Perros con collar/arnés seguro y correa corta. Gatos siempre en transportadora rígida cubierta con una toalla para evitar sobreestimulación visual.
                        </p>
                        <div className="pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-[#1A6B38] mt-auto">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Protocolo Anti-Estrés</span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </section>

              {/* 4. Sede Hospitalaria, Horarios & Acceso */}
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
                      02 / SEDE HOSPITALARIA &amp; ACCESIBILIDAD
                    </span>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0D3D20]">
                      Ubicación, Horarios &amp; Facilidades
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500">
                      Instalaciones céntricas con parqueadero privado vigilado y rampa de acceso directo para camillas y emergencias.
                    </p>
                  </motion.div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="rounded-3xl bg-[#FAFBF7] border border-slate-200/80 shadow-xs overflow-hidden flex flex-col group">
                      <div className="relative h-44 w-full bg-slate-100 shrink-0 overflow-hidden">
                        <Image src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&q=80" fill alt="Sede Hospitalaria" className="object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                      </div>
                      <div className="p-6 sm:p-7 flex-1 flex flex-col space-y-3 relative">
                        <div className="absolute -top-6 left-6 w-12 h-12 rounded-2xl bg-white text-[#1A6B38] flex items-center justify-center border border-slate-200 shadow-md z-10">
                          <Clock className="w-6 h-6" />
                        </div>
                        <h4 className="text-base font-bold text-slate-900 leading-snug pt-2">
                          Horarios Hospitalarios
                        </h4>
                        <div className="space-y-1.5 text-xs text-slate-600 flex-1">
                          <p><strong className="text-slate-900">Consultas Externas:</strong> Lunes a Sábado de 08:00 a 20:00</p>
                          <p><strong className="text-slate-900">Domingos y Feriados:</strong> 09:00 a 18:00</p>
                          <p className="text-[#1A6B38] font-bold pt-2 border-t border-slate-100 mt-2 block">Urgencias, Quirófano &amp; UCI: Abierto 24/7 los 365 días</p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-3xl bg-[#FAFBF7] border border-slate-200/80 shadow-xs overflow-hidden flex flex-col group">
                      <div className="relative h-44 w-full bg-slate-100 shrink-0 overflow-hidden">
                        <Image src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80" fill alt="Parqueadero" className="object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                      </div>
                      <div className="p-6 sm:p-7 flex-1 flex flex-col space-y-3 relative">
                        <div className="absolute -top-6 left-6 w-12 h-12 rounded-2xl bg-white text-[#1A6B38] flex items-center justify-center border border-slate-200 shadow-md z-10">
                          <Car className="w-6 h-6" />
                        </div>
                        <h4 className="text-base font-bold text-slate-900 leading-snug pt-2">
                          Parqueadero &amp; Movilidad
                        </h4>
                        <div className="space-y-1.5 text-xs text-slate-600 flex-1">
                          <p>12 plazas de parqueo privado vigilado exclusivo para tutores y clientes.</p>
                          <p>Rampa accesible directa para camillas de urgencia y mascotas con movilidad reducida.</p>
                          <p className="text-slate-900 font-semibold pt-2 border-t border-slate-100 mt-2 block">Zona segura y monitoreada por cámaras</p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-3xl bg-[#0D3D20] shadow-md overflow-hidden flex flex-col group relative">
                      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-500 via-transparent to-transparent z-0" />
                      <div className="relative h-44 w-full bg-slate-900 shrink-0 overflow-hidden z-10">
                        <Image src="https://images.unsplash.com/photo-1587745416684-47953f16f02f?auto=format&fit=crop&w=600&q=80" fill alt="Urgencias" className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0D3D20] via-[#0D3D20]/50 to-transparent" />
                      </div>
                      <div className="p-6 sm:p-7 flex-1 flex flex-col space-y-3 relative z-20">
                        <div className="absolute -top-6 left-6 w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-md border border-emerald-400">
                          <Phone className="w-6 h-6" />
                        </div>
                        <h4 className="text-base font-bold text-white leading-snug pt-2">
                          Central de Urgencias 24/7
                        </h4>
                        <p className="text-xs text-emerald-100/90 flex-1">
                          Si tu mascota presenta síntomas agudos, comunícate de inmediato para preparar la estación de trauma antes de tu arribo.
                        </p>
                        <a
                          href={buildWhatsAppUrl('URGENCIA MÉDICA 24 HORAS')}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-3 px-4 rounded-2xl bg-white hover:bg-emerald-50 text-[#0D3D20] font-bold text-xs uppercase tracking-wider transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer mt-3"
                        >
                          <MessageCircle className="w-4 h-4 text-[#1A6B38]" />
                          <span>Línea Directa de Urgencias</span>
                        </a>
                      </div>
                    </div>
                  </div>

                </div>
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Persistent Floating WhatsApp Emergency Button */}
      <WhatsAppEmergencyFloat />

      {/* Fixed Mobile Bottom Navigation Bar (< 1024px) with 5 tabs */}
      <BottomNav
        activeSection={activeTab}
        onNavigate={handleNavigate}
      />

      {/* Kindev Official Footer */}
      <Footer
        onNavigate={handleNavigate}
      />
    </div>
  );
}
