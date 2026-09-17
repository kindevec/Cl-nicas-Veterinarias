'use client';

import React, { useState, useEffect, useRef } from 'react';
import { buildWhatsAppUrl } from '@/lib/utils';
import { WhatsAppOfficialIcon } from './WhatsAppOfficialIcon';

export function WhatsAppEmergencyFloat() {
  const whatsappUrl = buildWhatsAppUrl('Urgencia Veterinaria 24/7');
  const [isHovered, setIsHovered] = useState(false);
  const [isRevealedMobile, setIsRevealedMobile] = useState(false);
  const hideTimerRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Cerrar el botón si el usuario hace click/touch fuera en móvil
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsRevealedMobile(false);
        if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
      }
    };

    document.addEventListener('touchstart', handleOutsideClick, { passive: true });
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('touchstart', handleOutsideClick);
      document.removeEventListener('mousedown', handleOutsideClick);
      if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
    };
  }, []);

  const handleButtonClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const isMobileView = typeof window !== 'undefined' && window.innerWidth < 1024;

    if (isMobileView) {
      // Si en móvil está recogido, el primer toque NO va a WhatsApp, solo lo revela
      if (!isRevealedMobile) {
        e.preventDefault();
        setIsRevealedMobile(true);

        // Si el cliente no lo aplasta, vuelve a ocultarse tras 5.5 segundos
        if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
        hideTimerRef.current = window.setTimeout(() => {
          setIsRevealedMobile(false);
        }, 5500);
        return;
      }

      // Si ya estaba revelado y el cliente lo aplasta, navega normalmente a WhatsApp
      if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
    }
  };

  const isVisible = isHovered || isRevealedMobile;

  return (
    <div
      ref={containerRef}
      className="fixed bottom-[calc(5.25rem+env(safe-area-inset-bottom,0px))] lg:bottom-[calc(1.75rem+env(safe-area-inset-bottom,0px))] right-0 z-50 flex items-center select-none pointer-events-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        id="floating-whatsapp-btn"
        onClick={handleButtonClick}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        className={`relative group flex items-center justify-center w-12 h-12 xs:w-13 xs:h-13 sm:w-14 sm:h-14 md:w-15 md:h-15 rounded-full bg-gradient-to-tr from-[#20BA5A] to-[#25D366] border-2 border-white/90 shadow-[0_6px_20px_rgba(37,211,102,0.4),0_0_15px_rgba(37,211,102,0.3)] hover:shadow-[0_10px_28px_rgba(37,211,102,0.5),0_0_22px_rgba(37,211,102,0.6)] transition-all duration-400 ease-out cursor-pointer active:scale-95 ${
          isVisible
            ? '-translate-x-3 sm:-translate-x-4 md:-translate-x-5 md:scale-110'
            : 'translate-x-6 sm:translate-x-7 md:translate-x-8 md:hover:translate-x-0'
        }`}
        aria-label="Contactar por WhatsApp a VetCare"
      >
        {/* Anillo de pulso verde cuando está en reposo */}
        <span
          className={`absolute inset-0 rounded-full bg-[#25D366] transition-opacity duration-300 pointer-events-none ${
            isVisible ? 'opacity-0' : 'opacity-40 animate-ping'
          }`}
        />

        {/* Ícono Oficial de WhatsApp en color blanco */}
        <WhatsAppOfficialIcon className="w-6 h-6 sm:w-7 sm:h-7 md:w-7.5 md:h-7.5 text-white relative z-10 shrink-0 drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)]" />
      </a>
    </div>
  );
}
