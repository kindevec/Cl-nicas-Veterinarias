'use client';

import React, { useState } from 'react';
import { X, ChevronUp } from 'lucide-react';
import { buildWhatsAppUrl } from '@/lib/utils';

const EMERGENCY_SERVICES = [
  'Urgencias 24/7 Médica Inmediata',
  'Cirugía de Alta Complejidad',
  'Consulta Especializada',
  'Despacho Farmacia & Pet Gourmet',
];

export function WhatsAppEmergencyFloat() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-40 flex flex-col items-end">
      
      {/* Quick Services Popover */}
      {isMenuOpen && (
        <div className="mb-3 w-72 rounded-3xl bg-white border border-slate-200/90 p-4 shadow-2xl animate-in slide-in-from-bottom-5 duration-200 text-xs space-y-2.5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div className="flex items-center gap-1.5 text-[#1A6B38] font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Veterinarios en Línea 24/7</span>
            </div>
            <button
              type="button"
              onClick={() => setIsMenuOpen(false)}
              className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-[11px] text-slate-500 leading-tight">
            Selecciona el motivo para contactar al triage de guardia:
          </p>

          <div className="space-y-1.5">
            {EMERGENCY_SERVICES.map((svc) => (
              <a
                key={svc}
                href={buildWhatsAppUrl(svc)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="block p-2 rounded-xl bg-slate-50 hover:bg-emerald-50 hover:text-[#1A6B38] border border-slate-200/60 text-slate-700 font-semibold transition-all"
              >
                {svc}
              </a>
            ))}
          </div>

          <div className="pt-1 text-[10px] text-slate-400 text-center font-medium">
            Respuesta promedio: &lt; 2 minutos
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Abrir opciones de WhatsApp"
          className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-slate-50 border border-slate-200/90 text-slate-700 text-xs font-bold shadow-md transition-all cursor-pointer group"
        >
          <svg className="w-3.5 h-3.5 fill-[#25D366]" viewBox="0 0 24 24">
            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zm4.52 11.66c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.07-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.84-.86 2.05s.88 2.38 1 2.54c.12.17 1.73 2.64 4.2 3.7 2.46 1.07 2.46.71 2.91.67.45-.05 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.28z"/>
          </svg>
          <span>Urgencia WhatsApp</span>
          <ChevronUp className={`w-3.5 h-3.5 text-slate-500 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
        </button>

        <a
          id="floating-whatsapp-btn"
          href={buildWhatsAppUrl('Urgencia Veterinaria 24/7')}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contactar Urgencia Veterinaria por WhatsApp"
          className="relative w-14 h-14 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-xl shadow-emerald-950/25 hover:scale-105 active:scale-95 transition-all cursor-pointer group"
        >
          <span className="absolute -inset-1 rounded-2xl bg-[#25D366]/35 blur-sm group-hover:blur-md transition-all -z-10 animate-pulse" />
          
          {/* Official WhatsApp Vector Logo */}
          <svg className="w-7 h-7 fill-white" viewBox="0 0 24 24">
            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zm4.52 11.66c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.07-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.84-.86 2.05s.88 2.38 1 2.54c.12.17 1.73 2.64 4.2 3.7 2.46 1.07 2.46.71 2.91.67.45-.05 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.28z"/>
          </svg>

          {/* Urgent 24/7 Dot Badge */}
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-white rounded-full flex items-center justify-center">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
          </span>
        </a>
      </div>

    </div>
  );
}
