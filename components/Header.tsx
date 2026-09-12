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
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const y = window.scrollY;
          const progress = Math.min(Math.max(y / 140, 0), 1);
          setScrollProgress(progress);
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
    { id: 'citas', label: 'Citas & Contacto' }
  ];

  const isScrolled = scrollProgress > 0.1;
  const bgOpacity = scrollProgress * 0.95;
  const blurAmount = scrollProgress * 16;
  const borderOpacity = scrollProgress * 0.8;
  const shadowOpacity = scrollProgress * 0.06;

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-3' : 'py-5'
      }`}
      style={{
        backgroundColor: `rgba(255, 255, 255, ${bgOpacity})`,
        backdropFilter: blurAmount > 1 ? `blur(${blurAmount}px)` : 'none',
        WebkitBackdropFilter: blurAmount > 1 ? `blur(${blurAmount}px)` : 'none',
        borderBottom: borderOpacity > 0.05 ? `1px solid rgba(226, 232, 240, ${borderOpacity})` : '1px solid transparent',
        boxShadow: shadowOpacity > 0.01 ? `0 10px 25px -5px rgba(0, 0, 0, ${shadowOpacity})` : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo with Paw Identity */}
        <div 
          onClick={() => onNavigate('inicio')}
          className="cursor-pointer group flex items-center shrink-0"
          id="brand-logo-btn"
        >
          <BrandLogo variant="full" size="md" theme="light" />
        </div>

        {/* Center Navigation - ZERO Box-in-Box, Clean Text Links with Smooth Active Underline */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => onNavigate(item.id)}
                className="relative py-1 text-xs font-semibold tracking-wide transition-colors cursor-pointer group"
              >
                <span className={isActive ? 'text-[#0D3D20] font-bold' : 'text-slate-600 group-hover:text-[#1A6B38]'}>
                  {item.label}
                </span>

                {isActive && (
                  <motion.span
                    layoutId="header-nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#1A6B38] rounded-full"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Controls - Solo CTA principal despejado */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => onNavigate('citas')}
            className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full bg-[#1A6B38] hover:bg-[#14532D] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm hover:shadow-md hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Agendar Cita</span>
          </button>
        </div>

      </div>
    </header>
  );
}
