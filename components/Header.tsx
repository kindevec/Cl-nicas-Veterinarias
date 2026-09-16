'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface HeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export function Header({ activeSection, onNavigate }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const y = window.scrollY;
          setIsScrolled(y > 15);
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'nosotros', label: 'La Clínica' },
    { id: 'servicios', label: 'Especialidades' },
    { id: 'petshop', label: 'Pet Shop Gourmet' },
    { id: 'citas', label: 'Contacto' }
  ];

  // El header es claro exclusivamente en 'inicio' y retoma su tema oscuro corporativo en las demás pestañas
  const isDarkHeader = activeSection !== 'inicio';

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-3' : 'py-4 sm:py-5'
      }`}
      style={{
        backgroundColor: isScrolled
          ? isDarkHeader
            ? 'rgba(13, 61, 32, 0.94)'
            : 'rgba(255, 255, 255, 0.92)'
          : 'transparent',
        backdropFilter: isScrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(16px)' : 'none',
        borderBottom: isScrolled
          ? isDarkHeader
            ? '1px solid rgba(16, 185, 129, 0.25)'
            : '1px solid rgba(226, 232, 240, 0.85)'
          : 'none',
        boxShadow: isScrolled
          ? isDarkHeader
            ? '0 10px 25px -5px rgba(0, 0, 0, 0.35)'
            : '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.03)'
          : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo with Paw Identity - Adaptive Theme */}
        <a 
          href="#inicio"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('inicio');
          }}
          className="cursor-pointer group flex items-center shrink-0"
          id="brand-logo-btn"
          aria-label="Ir a Inicio"
        >
          <BrandLogo variant="full" size="md" theme={isDarkHeader ? 'dark' : 'light'} />
        </a>

        {/* Center Navigation - ZERO Box-in-Box, Thicker Bolder Typography with Dynamic Section Contrast */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                id={`nav-${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(item.id);
                }}
                className="relative py-1 text-sm font-bold tracking-tight transition-colors cursor-pointer group"
              >
                <span
                  className={
                    isDarkHeader
                      ? isActive
                        ? 'text-white font-black drop-shadow-xs'
                        : 'text-white/85 hover:text-white font-bold transition-colors'
                      : isActive
                      ? 'text-[#0D3D20] font-black'
                      : 'text-slate-800 hover:text-[#1A6B38] font-bold transition-colors'
                  }
                >
                  {item.label}
                </span>

                {isActive && (
                  <motion.span
                    layoutId="header-nav-indicator"
                    className={`absolute -bottom-1 left-0 right-0 h-[2.5px] rounded-full ${
                      isDarkHeader ? 'bg-amber-400 shadow-xs' : 'bg-[#1A6B38]'
                    }`}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Action Controls - Clear Adaptive Primary CTA */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="#citas"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('citas');
            }}
            className={`inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full font-black text-xs uppercase tracking-wider transition-all shadow-sm hover:shadow-md hover:scale-105 active:scale-95 cursor-pointer ${
              isDarkHeader
                ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-amber-950/20'
                : 'bg-[#1A6B38] hover:bg-[#14532D] text-white'
            }`}
          >
            <Calendar className={`w-3.5 h-3.5 ${isDarkHeader ? 'text-slate-950' : 'text-white'}`} />
            <span>Agendar Cita</span>
          </a>
        </div>

      </div>
    </header>
  );
}
