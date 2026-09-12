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
import { SocialProofMetricsSection } from '@/components/SocialProofMetricsSection';
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
              <Hero onSelectServiceForBooking={handleSelectServiceForBooking} />
              <SocialProofMetricsSection />
              
              {/* Executive Summary Showcase of all other sections (La Clínica, Especialidades, Pet Shop Gourmet, Citas & Urgencias) */}
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

          {/* TAB 5: CITAS & NUTRICIÓN */}
          {activeTab === 'citas' && (
            <motion.div
              key="tab-citas"
              id="citas"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
                            {/* Standardized Unified Banner for Citas & Contacto with Modern Photographic Transition */}
              <section className="relative w-full min-h-[480px] sm:min-h-[520px] pt-32 sm:pt-36 pb-16 flex flex-col justify-center overflow-hidden bg-[#0D3D20] text-white">
                {/* Modern Photographic Canvas with Seamless Transition (Zero Dividing Lines) */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                  {/* Full-bleed Image Layer */}
                  <div className="absolute inset-0 w-full h-full">
                    <Image
                      src="https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=1600&q=85"
                      alt="Agendamiento veterinario y nutrición clínica VetCare"
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
                        Citas Médicas &amp; <span className="text-emerald-400">Contacto Oficial 24/7</span>
                      </h1>

                      <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed font-normal max-w-2xl">
                        Agenda tu consulta médica con especialistas certificados o comunícate de inmediato con nuestra central de guardia y triage hospitalario en Quito.
                      </p>
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
                    <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#1A6B38] flex items-center justify-center border border-emerald-100">
                        <FileText className="w-6 h-6" />
                      </div>
                      <h4 className="text-base font-bold text-slate-900 leading-snug">
                        Documentación &amp; Historial
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Trae su carnet de vacunación vigente, desparasitaciones y exámenes de laboratorio o ecografías previas para enriquecer la historia clínica.
                      </p>
                      <div className="pt-2 border-t border-slate-100 flex items-center gap-1 text-[11px] font-semibold text-[#1A6B38]">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Historial Digital Centralizado</span>
                      </div>
                    </div>

                    <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#1A6B38] flex items-center justify-center border border-emerald-100">
                        <Clock className="w-6 h-6" />
                      </div>
                      <h4 className="text-base font-bold text-slate-900 leading-snug">
                        Protocolo de Ayuno
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Si tu mascota tiene programada ecografía abdominal, analítica de sangre o sedación, requiere de 8 a 12 horas de ayuno sólido. Mantén siempre agua a libre disposición.
                      </p>
                      <div className="pt-2 border-t border-slate-100 flex items-center gap-1 text-[11px] font-semibold text-[#1A6B38]">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Agua Fresca Permitida</span>
                      </div>
                    </div>

                    <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#1A6B38] flex items-center justify-center border border-emerald-100">
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                      <h4 className="text-base font-bold text-slate-900 leading-snug">
                        Transporte Seguro Fear-Free
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Perros con collar/arnés seguro y correa corta. Gatos siempre en transportadora rígida cubierta con una toalla para evitar sobreestimulación visual.
                      </p>
                      <div className="pt-2 border-t border-slate-100 flex items-center gap-1 text-[11px] font-semibold text-[#1A6B38]">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Protocolo Anti-Estrés</span>
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
                    <div className="p-6 sm:p-7 rounded-3xl bg-[#FAFBF7] border border-slate-200/80 shadow-xs space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-white text-[#1A6B38] flex items-center justify-center border border-slate-200 shadow-xs">
                        <Clock className="w-6 h-6" />
                      </div>
                      <h4 className="text-base font-bold text-slate-900 leading-snug">
                        Horarios Hospitalarios
                      </h4>
                      <div className="space-y-1.5 text-xs text-slate-600">
                        <p><strong className="text-slate-900">Consultas Externas:</strong> Lunes a Sábado de 08:00 a 20:00</p>
                        <p><strong className="text-slate-900">Domingos y Feriados:</strong> 09:00 a 18:00</p>
                        <p className="text-[#1A6B38] font-bold pt-1">Urgencias, Quirófano &amp; UCI: Abierto 24/7 los 365 días</p>
                      </div>
                    </div>

                    <div className="p-6 sm:p-7 rounded-3xl bg-[#FAFBF7] border border-slate-200/80 shadow-xs space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-white text-[#1A6B38] flex items-center justify-center border border-slate-200 shadow-xs">
                        <Car className="w-6 h-6" />
                      </div>
                      <h4 className="text-base font-bold text-slate-900 leading-snug">
                        Parqueadero &amp; Movilidad
                      </h4>
                      <div className="space-y-1.5 text-xs text-slate-600">
                        <p>12 plazas de parqueo privado vigilado exclusivo para tutores y clientes.</p>
                        <p>Rampa accesible directa para camillas de urgencia y mascotas con movilidad reducida.</p>
                        <p className="text-slate-900 font-semibold pt-1">Zona segura y monitoreada por cámaras</p>
                      </div>
                    </div>

                    <div className="p-6 sm:p-7 rounded-3xl bg-[#FAFBF7] border border-slate-200/80 shadow-xs space-y-3 flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="w-12 h-12 rounded-2xl bg-white text-[#1A6B38] flex items-center justify-center border border-slate-200 shadow-xs">
                          <Phone className="w-6 h-6" />
                        </div>
                        <h4 className="text-base font-bold text-slate-900 leading-snug">
                          Central de Urgencias 24/7
                        </h4>
                        <p className="text-xs text-slate-600">
                          Si tu mascota presenta síntomas agudos, comunícate de inmediato para preparar la estación de trauma antes de tu arribo.
                        </p>
                      </div>
                      <a
                        href={buildWhatsAppUrl('URGENCIA MÉDICA 24 HORAS')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3 px-4 rounded-2xl bg-[#0D3D20] hover:bg-[#1A6B38] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer mt-3"
                      >
                        <MessageCircle className="w-4 h-4 text-emerald-400" />
                        <span>Línea Directa de Urgencias</span>
                      </a>
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
