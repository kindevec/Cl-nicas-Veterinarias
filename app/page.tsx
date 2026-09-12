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
import { Footer } from '@/components/Footer';
import { ArrowRight, Calendar, Sparkles } from 'lucide-react';
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
      <main className="overflow-x-hidden w-full pb-20 md:pb-8 flex-1">
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
              
              {/* Quick Specialties CTA Strip */}
              <div className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-slate-100 pt-8">
                  <div className="space-y-1 text-center md:text-left">
                    <span className="text-xs font-bold text-[#1A6B38] uppercase tracking-wider font-mono">
                      Unidades Clínicas de Referencia
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-[#0D3D20]">
                      Quirófano estéril de alta tecnología, UCI 24 horas y diagnóstico por imagen
                    </h3>
                    <p className="text-slate-500 text-xs sm:text-sm max-w-xl">
                      Descubre nuestro abanico completo de especialidades médicas avanzadas para asegurar el bienestar de tu mascota.
                    </p>
                  </div>
                  <a
                    href="#servicios"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigate('servicios');
                    }}
                    className="px-6 py-3 rounded-full bg-[#1A6B38] hover:bg-[#14532D] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm hover:scale-105 cursor-pointer shrink-0 flex items-center gap-2"
                  >
                    <span>Ver Especialidades</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
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
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                  <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[58%] h-full">
                    <Image
                      src="https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=1600&q=85"
                      alt="Agendamiento veterinario y nutrición clínica VetCare"
                      fill
                      priority
                      className="object-cover object-center"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0D3D20] via-[#0D3D20]/75 via-25% to-transparent hidden lg:block" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D3D20] via-[#0D3D20]/80 via-40% to-transparent lg:hidden" />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0D3D20]/70 via-transparent to-[#0D3D20]/90" />
                  </div>

                  <div className="absolute left-0 top-0 bottom-0 w-full lg:w-[45%] bg-[#0D3D20]" />
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
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center space-y-2">
                  <span className="text-xs font-bold text-[#1A6B38] uppercase tracking-wider font-mono">
                    Herramienta Médica Complementaria
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-extrabold text-[#0D3D20]">
                    Calculadora Nutricional WSAVA
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
                    Conoce el requerimiento calórico e hídrico exacto de tu mascota según especie, edad y condición antes de tu consulta médica.
                  </p>
                </div>
                <SmartNutritionCalculator 
                  onSelectServiceForBooking={handleSelectServiceForBooking}
                />
              </div>
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
