'use client';

import React, { useState, useEffect } from 'react';
import { ShoppingBag, Database, PhoneCall, Calendar, ShieldCheck } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { buildWhatsAppUrl } from '@/lib/utils';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenAdmin: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export function Header({ cartCount, onOpenCart, onOpenAdmin, activeSection, onNavigate }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'nosotros', label: 'La Clínica' },
    { id: 'servicios', label: 'Especialidades' },
    { id: 'petshop', label: 'Pet Shop Gourmet' },
    { id: 'citas', label: 'Citas & Contacto' }
  ];

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200/90 shadow-md shadow-slate-900/5 py-2.5'
          : 'bg-white/80 backdrop-blur-md border-b border-slate-200/50 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => onNavigate('inicio')}
          className="cursor-pointer group flex items-center"
          id="brand-logo-btn"
        >
          <BrandLogo variant="full" size="md" theme="light" />
        </div>

        {/* Desktop 5-Tab Corporate Navigation Shell - Clean AOVET & Cielo Dental aesthetic */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-100/90 backdrop-blur-md border border-slate-200/90 rounded-full p-1 shadow-sm">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => onNavigate(item.id)}
                className={`px-4 py-2 rounded-full text-xs transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#1A6B38] text-white font-bold shadow-md shadow-emerald-900/20 scale-[1.02]'
                    : 'text-slate-600 hover:text-[#0D3D20] hover:bg-white/80 font-medium'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Backoffice Button (Supabase) */}
          <button
            id="header-admin-btn"
            onClick={onOpenAdmin}
            title="Panel de Gestión Supabase (Citas, Órdenes, Storage RLS)"
            className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 hover:border-emerald-300 text-xs font-semibold transition-all shadow-sm group cursor-pointer"
          >
            <Database className="w-3.5 h-3.5 text-emerald-600 group-hover:rotate-12 transition-transform" />
            <span className="hidden xl:inline">Backoffice</span>
            <span className="inline xl:hidden">Admin</span>
          </button>

          {/* Cart Drawer Trigger */}
          <button
            id="header-cart-btn"
            onClick={onOpenCart}
            className="relative p-2.5 rounded-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 hover:border-amber-300 transition-all shadow-sm group cursor-pointer"
            aria-label="Abrir Carrito"
          >
            <ShoppingBag className="w-4 h-4 text-amber-600 group-hover:scale-110 transition-transform" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-tr from-amber-500 to-amber-400 text-white font-black text-[10px] flex items-center justify-center shadow-md animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          {/* Direct Phone / Emergency WhatsApp Quick Action */}
          <a
            id="header-emergency-call"
            href={buildWhatsAppUrl('Urgencia Médica Inmediata')}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs transition-all shadow-md shadow-red-600/25 active:scale-95 cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-white animate-ping" />
            <span>Urgencias 24/7</span>
          </a>

          <button
            onClick={() => onNavigate('citas')}
            className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1A6B38] hover:bg-[#14532D] text-white font-bold text-xs transition-all shadow-md shadow-emerald-900/20 active:scale-95 cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Agendar Cita</span>
          </button>
        </div>
      </div>
    </header>
  );
}
