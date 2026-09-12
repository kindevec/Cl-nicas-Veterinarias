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

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/85 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/50 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Bespoke Geometric Brand Logo */}
        <div 
          onClick={() => onNavigate('hero')}
          className="cursor-pointer group flex items-center"
          id="brand-logo-btn"
        >
          <BrandLogo variant="full" size="md" />
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/70 backdrop-blur-xl border border-white/10 rounded-full p-1.5 shadow-2xl shadow-black/50">
          <button
            id="nav-inicio"
            onClick={() => onNavigate('hero')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeSection === 'hero'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            Inicio
          </button>
          <button
            id="nav-servicios"
            onClick={() => onNavigate('servicios')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeSection === 'servicios'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            Showcase Clínico
          </button>
          <button
            id="nav-interactive"
            onClick={() => onNavigate('calculadora')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeSection === 'calculadora'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            Calculadora Smart
          </button>
          <button
            id="nav-petshop"
            onClick={() => onNavigate('petshop')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeSection === 'petshop'
                ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            Pet Shop Gourmet
          </button>
          <button
            id="nav-agendar"
            onClick={() => onNavigate('agendar')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeSection === 'agendar'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            Agendar
          </button>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Backoffice Button (Supabase) */}
          <button
            id="header-admin-btn"
            onClick={onOpenAdmin}
            title="Panel de Gestión Supabase (Citas, Órdenes, Storage RLS)"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 border border-white/10 hover:border-emerald-400/40 text-xs font-semibold transition-all backdrop-blur-md group"
          >
            <Database className="w-3.5 h-3.5 text-emerald-400 group-hover:rotate-12 transition-transform" />
            <span className="hidden lg:inline">Backoffice Supabase</span>
            <span className="inline lg:hidden">Admin</span>
          </button>

          {/* Cart Drawer Trigger */}
          <button
            id="header-cart-btn"
            onClick={onOpenCart}
            className="relative p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 border border-white/10 hover:border-amber-400/50 transition-all backdrop-blur-md group"
            aria-label="Abrir Carrito"
          >
            <ShoppingBag className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gradient-to-tr from-amber-400 to-amber-300 text-slate-950 font-black text-[10px] flex items-center justify-center shadow-lg shadow-amber-500/40 animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          {/* Emergency WhatsApp Quick Action */}
          <a
            id="header-emergency-call"
            href={buildWhatsAppUrl('Urgencia Médica Inmediata')}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-emerald-500/25 active:scale-95"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Urgencias 24/7</span>
          </a>
        </div>
      </div>
    </header>
  );
}
