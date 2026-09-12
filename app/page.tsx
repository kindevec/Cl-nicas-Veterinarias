'use client';

import React, { useState } from 'react';
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
  Appointment 
} from '@/lib/types';
import { 
  getStoredAppointments, 
  getStoredProducts 
} from '@/lib/supabaseClient';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'inicio' | 'nosotros' | 'servicios' | 'petshop' | 'citas'>('inicio');
  const [bookingService, setBookingService] = useState<string | undefined>(undefined);

  // Appointments State
  const [appointments, setAppointments] = useState<Appointment[]>(() => getStoredAppointments());
  const [products] = useState<PetProduct[]>(() => getStoredProducts());

  // Navigation Handler across the 5 Corporate Tabs
  const handleNavigate = (tabId: string) => {
    const validTabs: Array<'inicio' | 'nosotros' | 'servicios' | 'petshop' | 'citas'> = [
      'inicio', 'nosotros', 'servicios', 'petshop', 'citas'
    ];
    
    let mapped = tabId;
    if (tabId === 'hero') mapped = 'inicio';
    if (tabId === 'calculadora') mapped = 'citas';
    if (tabId === 'agendar') mapped = 'citas';

    if (validTabs.includes(mapped as any)) {
      setActiveTab(mapped as any);
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  // Service Selection for Booking
  const handleSelectServiceForBooking = (serviceName: string) => {
    setBookingService(serviceName);
    setActiveTab('citas');
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFBF7] text-slate-900 flex flex-col selection:bg-emerald-100 selection:text-emerald-900 font-sans">
      {/* 1. Transparent Header that Materializes Smoothly with Scroll (SmartLegal Standard) */}
      <Header
        activeSection={activeTab}
        onNavigate={handleNavigate}
      />

      {/* Main Container - Full-bleed top so hero banners sit seamlessly under the transparent header */}
      <main className="overflow-x-hidden w-full pb-20 md:pb-8 flex-1">
        <AnimatePresence mode="wait">
          {/* TAB 1: INICIO */}
          {activeTab === 'inicio' && (
            <motion.div
              key="tab-inicio"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <Hero onSelectServiceForBooking={handleSelectServiceForBooking} />
              <SocialProofMetricsSection />
              
              {/* Quick Specialties CTA Strip without Box-in-Box */}
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
                  <button
                    onClick={() => handleNavigate('servicios')}
                    className="px-6 py-3 rounded-full bg-[#1A6B38] hover:bg-[#14532D] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm hover:scale-105 cursor-pointer shrink-0 flex items-center gap-2"
                  >
                    <span>Ver Especialidades</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: NOSOTROS / LA CLÍNICA */}
          {activeTab === 'nosotros' && (
            <motion.div
              key="tab-nosotros"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <AboutSection onNavigateToBooking={() => handleNavigate('citas')} />
            </motion.div>
          )}

          {/* TAB 3: SERVICIOS / ESPECIALIDADES */}
          {activeTab === 'servicios' && (
            <motion.div
              key="tab-servicios"
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
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              {/* TOP HERO BANNER for Citas & Nutrición (SmartLegal Standard) */}
              <section className="relative min-h-[380px] sm:min-h-[440px] pt-32 sm:pt-40 pb-16 flex flex-col justify-center overflow-hidden bg-[#0D3D20] text-white">
                <div className="absolute inset-0 pointer-events-none opacity-25">
                  <Image
                    src="https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=2000&q=80"
                    alt="Agendamiento veterinario y nutrición clínica VetCare"
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
                      <Calendar className="w-4 h-4 text-emerald-400" />
                      <span>AGENDAMIENTO PRIORITARIO &amp; NUTRICIÓN CLÍNICA</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                      Reserva de Turnos &amp; <span className="text-emerald-400">Nutrición WSAVA</span>
                    </h1>

                    <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed font-normal">
                      Calcula los requerimientos calóricos exactos de tu mascota o reserva cita médica con confirmación inmediata vía WhatsApp.
                    </p>
                  </motion.div>
                </div>
              </section>

              <SmartNutritionCalculator 
                onSelectServiceForBooking={handleSelectServiceForBooking}
              />
              <AppointmentScheduler
                initialService={bookingService}
                onAppointmentCreated={(newApt) => setAppointments((prev) => [newApt, ...prev])}
              />
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
