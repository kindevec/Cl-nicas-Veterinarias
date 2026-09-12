'use client';

import React, { useState, useEffect } from 'react';
import { ShoppingBag, Database, PhoneCall, Sparkles } from 'lucide-react';
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
          ? 'bg-slate-950/90 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/60 py-3'
          : 'bg-slate-950/40 backdrop-blur-md py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Bespoke Geometric Brand Logo */}
        <div 
          onClick={() => onNavigate('inicio')}
          className="cursor-pointer group flex items-center"
          id="brand-logo-btn"
        >
          <BrandLogo variant="full" size="md" />
        </div>

        {/* Desktop 5-Tab Corporate Navigation Shell */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-full p-1.5 shadow-2xl shadow-black/50">
          {navItems.map((item) => (
            <button
              key={item.id}
              id={`nav-${item.id}`}
              onClick={() => onNavigate(item.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeSection === item.id
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 shadow-md shadow-emerald-500/20 font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Backoffice Button (Supabase) */}
          <button
            id="header-admin-btn"
            onClick={onOpenAdmin}
            title="Panel de Gestión Supabase (Citas, Órdenes, Storage RLS)"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 border border-white/10 hover:border-emerald-400/40 text-xs font-semibold transition-all backdrop-blur-md group cursor-pointer"
          >
            <Database className="w-3.5 h-3.5 text-emerald-400 group-hover:rotate-12 transition-transform" />
            <span className="hidden xl:inline">Backoffice Supabase</span>
            <span className="inline xl:hidden">Admin</span>
          </button>

          {/* Cart Drawer Trigger */}
          <button
            id="header-cart-btn"
            onClick={onOpenCart}
            className="relative p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 border border-white/10 hover:border-amber-400/50 transition-all backdrop-blur-md group cursor-pointer"
            aria-label="Abrir Carrito"
          >
            <ShoppingBag className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gradient-to-tr from-amber-400 to-amber-300 text-slate-950 font-black text-[10px] flex items-center justify-center shadow-lg shadow-amber-500/40 animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          {/* Emergency WhatsApp Quick Action - Kindev Powered */}
          <a
            id="header-emergency-call"
            href={buildWhatsAppUrl('Urgencia Médica Inmediata')}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-xs transition-all shadow-lg shadow-emerald-500/25 active:scale-95"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Urgencias 24/7</span>
          </a>
        </div>
      </div>
    </header>
  );
}
