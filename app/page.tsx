'use client';

import React, { useState, useEffect } from 'react';
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
import { CartDrawer } from '@/components/CartDrawer';
import { AdminBackofficeModal } from '@/components/AdminBackofficeModal';
import { WhatsAppEmergencyFloat } from '@/components/WhatsAppEmergencyFloat';
import { Footer } from '@/components/Footer';
import { ArrowRight } from 'lucide-react';
import { 
  CartItem, 
  PetProduct, 
  Appointment, 
  Order, 
  MedicalRecordFile 
} from '@/lib/types';
import { 
  getStoredAppointments, 
  getStoredOrders, 
  getStoredMedicalFiles, 
  getStoredProducts 
} from '@/lib/supabaseClient';

const CART_STORAGE_KEY = 'vetcare_cart_items_v1';

export default function HomePage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedCart = localStorage.getItem(CART_STORAGE_KEY);
        if (savedCart) return JSON.parse(savedCart);
      } catch {
        // ignore
      }
    }
    return [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'inicio' | 'nosotros' | 'servicios' | 'petshop' | 'citas'>('inicio');
  const [bookingService, setBookingService] = useState<string | undefined>(undefined);

  // Database / Backoffice State with lazy initialization
  const [appointments, setAppointments] = useState<Appointment[]>(() => getStoredAppointments());
  const [orders, setOrders] = useState<Order[]>(() => getStoredOrders());
  const [medicalFiles, setMedicalFiles] = useState<MedicalRecordFile[]>(() => getStoredMedicalFiles());
  const [products] = useState<PetProduct[]>(() => getStoredProducts());

  // Save Cart Changes
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  // Cart Handlers
  const handleAddToCart = (product: PetProduct) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateCartQuantity = (productId: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveCartItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
    try {
      localStorage.removeItem(CART_STORAGE_KEY);
    } catch {
      // ignore
    }
  };

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

  const totalCartCount = cartItems.reduce((acc, it) => acc + it.quantity, 0);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col selection:bg-emerald-100 selection:text-emerald-900 font-sans">
      {/* 1. Desktop Header with 5-Tab Corporate Navigation */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        activeSection={activeTab}
        onNavigate={handleNavigate}
      />

      {/* Main Container with Anti-Overflow and Bottom Navigation Padding Mandates (pb-20 md:pb-8) */}
      <main className="overflow-x-hidden w-full pb-20 md:pb-8 flex-1 pt-16 sm:pt-20">
        <AnimatePresence mode="wait">
          {/* TAB 1: INICIO */}
          {activeTab === 'inicio' && (
            <motion.div
              key="tab-inicio"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-16"
            >
              <Hero onSelectServiceForBooking={handleSelectServiceForBooking} />
              <SocialProofMetricsSection />
              
              {/* Summary Banner Especialidades */}
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200/90 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="space-y-2 text-center md:text-left">
                    <span className="text-xs font-bold text-[#1A6B38] uppercase tracking-wider">Unidades Clínicas de Referencia</span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0D3D20]">Quirófano estéril AOVET, UCI 24 horas y diagnóstico por imagen</h3>
                    <p className="text-slate-600 text-sm max-w-xl">Descubre nuestro abanico completo de especialidades médicas avanzadas diseñadas para salvar vidas y asegurar el bienestar de tu mascota.</p>
                  </div>
                  <button
                    onClick={() => handleNavigate('servicios')}
                    className="px-6 py-3.5 rounded-full bg-[#1A6B38] hover:bg-[#14532D] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:scale-105 cursor-pointer shrink-0 flex items-center gap-2"
                  >
                    <span>Ver Especialidades Completas</span>
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
              className="space-y-16"
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
              <PetShopSection
                products={products}
                onAddToCart={handleAddToCart}
                onOpenCart={() => setIsCartOpen(true)}
              />
            </motion.div>
          )}

          {/* TAB 5: CITAS & CONTACTO */}
          {activeTab === 'citas' && (
            <motion.div
              key="tab-citas"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-16"
            >
              <SmartNutritionCalculator 
                onSelectServiceForBooking={handleSelectServiceForBooking}
                onAddToCart={handleAddToCart}
              />
              <AppointmentScheduler
                initialService={bookingService}
                onAppointmentCreated={(newApt) => setAppointments((prev) => [newApt, ...prev])}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />

      {/* Supabase Backoffice Administration Modal */}
      <AdminBackofficeModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        appointments={appointments}
        orders={orders}
        medicalFiles={medicalFiles}
        onAppointmentsChange={setAppointments}
        onOrdersChange={setOrders}
        onMedicalFilesChange={setMedicalFiles}
      />

      {/* Persistent Floating WhatsApp Emergency Button */}
      <WhatsAppEmergencyFloat />

      {/* Fixed Mobile Bottom Navigation Bar (< 1024px) with 5 tabs */}
      <BottomNav
        activeSection={activeTab}
        onNavigate={handleNavigate}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Kindev Official Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />
    </div>
  );
}
