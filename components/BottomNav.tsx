'use client';

import React from 'react';
import { Home, Users, Stethoscope, ShoppingBag, Calendar } from 'lucide-react';

interface BottomNavProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export function BottomNav({ activeSection, onNavigate }: BottomNavProps) {
  const tabs = [
    { id: 'inicio', label: 'Inicio', icon: Home },
    { id: 'nosotros', label: 'Clínica', icon: Users },
    { id: 'servicios', label: 'Servicios', icon: Stethoscope },
    { id: 'petshop', label: 'Pet Shop', icon: ShoppingBag },
    { id: 'citas', label: 'Contacto', icon: Calendar },
  ];

  return (
    <nav
      id="mobile-bottom-nav"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-2xl border-t border-slate-200/90 pb-safe px-2 pt-1.5 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSection === tab.id;
          return (
            <a
              key={tab.id}
              href={`#${tab.id}`}
              id={`m-nav-${tab.id}`}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(tab.id);
              }}
              className={`relative flex flex-col items-center justify-center py-1.5 px-3 rounded-2xl transition-all cursor-pointer ${
                isActive 
                  ? 'text-[#1A6B38] bg-emerald-50 scale-105 font-bold shadow-sm' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 mb-0.5 ${isActive ? 'text-[#1A6B38]' : 'text-slate-500'} transition-transform`} />
              </div>
              <span className={`text-[10px] tracking-tight ${isActive ? 'font-bold text-[#0D3D20]' : 'font-medium'}`}>
                {tab.label}
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
