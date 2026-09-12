'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { Hero } from '@/components/Hero';
import { ServicesSection } from '@/components/ServicesSection';
import { SmartNutritionCalculator } from '@/components/SmartNutritionCalculator';
import { PetShopSection } from '@/components/PetShopSection';
import { SocialProofMetricsSection } from '@/components/SocialProofMetricsSection';
import { AppointmentScheduler } from '@/components/AppointmentScheduler';
import { CartDrawer } from '@/components/CartDrawer';
import { AdminBackofficeModal } from '@/components/AdminBackofficeModal';
import { WhatsAppEmergencyFloat } from '@/components/WhatsAppEmergencyFloat';
import { Footer } from '@/components/Footer';
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
  const [activeSection, setActiveSection] = useState('hero');
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

  // Navigation Helper
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Service Selection for Booking
  const handleSelectServiceForBooking = (serviceName: string) => {
    setBookingService(serviceName);
    handleNavigate('agendar');
  };

  const totalCartCount = cartItems.reduce((acc, it) => acc + it.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-slate-950">
      {/* 1. Desktop Header with Blur & Bespoke Logo */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Main Container with Anti-Overflow and Bottom Padding Mandates (pb-20 md:pb-8) */}
      <main className="overflow-x-hidden w-full pb-20 md:pb-8 flex-1">
        {/* 1. HERO CINEMÁTICO: Destellos de luz, tipografía con micro-interacciones y bento */}
        <Hero onSelectServiceForBooking={handleSelectServiceForBooking} />

        {/* 2. SHOWCASE ASIMÉTRICO (BENTO GRID EDITORIAL): Servicios Médicos & Quirófano */}
        <ServicesSection onSelectService={handleSelectServiceForBooking} />

        {/* 3. MÓDULO INTERACTIVO BESPOKE (EL DIFERENCIADOR): Calculadora Nutricional & Slider Comparador */}
        <SmartNutritionCalculator 
          onSelectServiceForBooking={handleSelectServiceForBooking}
          onAddToCart={handleAddToCart}
        />

        {/* 4. BOUTIQUE PET SHOP GOURMET & FARMACIA ESPECIALIZADA */}
        <PetShopSection
          products={products}
          onAddToCart={handleAddToCart}
          onOpenCart={() => setIsCartOpen(true)}
        />

        {/* 5. PRUEBA SOCIAL & MÉTRICAS DINÁMICAS: Contadores Motion, Casos Clínicos & Acreditaciones */}
        <SocialProofMetricsSection />

        {/* 6. CONVERSIÓN & FORMULARIO SANITIZADO: Agendador en Tiempo Real */}
        <AppointmentScheduler
          initialService={bookingService}
          onAppointmentCreated={(newApt) => setAppointments((prev) => [newApt, ...prev])}
        />
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

      {/* Supabase Backoffice Administration Modal with RLS & Realtime */}
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

      {/* Fixed Mobile Bottom Navigation Bar (< 768px) with safe area */}
      <BottomNav
        activeSection={activeSection}
        onNavigate={handleNavigate}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Kindev Official Footer with Required Credit */}
      <Footer
        onNavigate={handleNavigate}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />
    </div>
  );
}
