'use client';

import React from 'react';
import { Home, Stethoscope, ShoppingBag, CalendarClock, AlertCircle } from 'lucide-react';
import { buildWhatsAppUrl } from '@/lib/utils';

interface BottomNavProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  cartCount: number;
  onOpenCart: () => void;
}

export function BottomNav({ activeSection, onNavigate, cartCount, onOpenCart }: BottomNavProps) {
  return (
    <nav
      id="mobile-bottom-nav"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/90 backdrop-blur-xl border-t border-white/10 pb-safe px-3 pt-2 shadow-2xl shadow-black"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {/* Inicio */}
        <button
          id="m-nav-inicio"
          onClick={() => onNavigate('hero')}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-lg transition-all ${
            activeSection === 'hero' ? 'text-emerald-400' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Home className="w-5 h-5 mb-1" />
          <span className="text-[10px] font-medium tracking-tight">Inicio</span>
        </button>

        {/* Servicios Médicos */}
        <button
          id="m-nav-servicios"
          onClick={() => onNavigate('servicios')}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-lg transition-all ${
            activeSection === 'servicios' ? 'text-emerald-400' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Stethoscope className="w-5 h-5 mb-1" />
          <span className="text-[10px] font-medium tracking-tight">Servicios</span>
        </button>

        {/* Pet Shop */}
        <button
          id="m-nav-petshop"
          onClick={() => onNavigate('petshop')}
          className={`relative flex flex-col items-center justify-center py-1 px-2 rounded-lg transition-all ${
            activeSection === 'petshop' ? 'text-amber-400' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <ShoppingBag className="w-5 h-5 mb-1" />
          <span className="text-[10px] font-medium tracking-tight">Pet Shop</span>
          {cartCount > 0 && (
            <span className="absolute top-0 right-1 w-4 h-4 rounded-full bg-amber-400 text-slate-950 font-bold text-[9px] flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>

        {/* Agendar */}
        <button
          id="m-nav-agendar"
          onClick={() => onNavigate('agendar')}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-lg transition-all ${
            activeSection === 'agendar' ? 'text-emerald-400' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <CalendarClock className="w-5 h-5 mb-1" />
          <span className="text-[10px] font-medium tracking-tight">Agendar</span>
        </button>

        {/* Urgencias Direct WhatsApp */}
        <a
          id="m-nav-urgencias"
          href={buildWhatsAppUrl('Urgencia Médica 24/7')}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1 px-2 rounded-lg text-rose-400 hover:text-rose-300 transition-all group"
        >
          <div className="relative">
            <AlertCircle className="w-5 h-5 mb-1 animate-pulse" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-rose-500 animate-ping" />
          </div>
          <span className="text-[10px] font-bold tracking-tight text-rose-400">Urgencia</span>
        </a>
      </div>
    </nav>
  );
}
