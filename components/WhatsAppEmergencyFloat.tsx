'use client';

import React, { useState } from 'react';
import { PhoneCall, MessageCircle, AlertCircle, X, ChevronUp } from 'lucide-react';
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
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Urgencia WhatsApp</span>
          <ChevronUp className={`w-3.5 h-3.5 text-slate-500 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
        </button>

        <a
          id="floating-whatsapp-btn"
          href={buildWhatsAppUrl('Urgencia Veterinaria 24/7')}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contactar Urgencia Veterinaria por WhatsApp"
          className="relative w-14 h-14 rounded-2xl bg-[#1A6B38] hover:bg-[#14532D] text-white flex items-center justify-center shadow-xl shadow-emerald-900/25 hover:scale-105 active:scale-95 transition-all cursor-pointer group"
        >
          <span className="absolute -inset-1 rounded-2xl bg-emerald-500/30 blur-sm group-hover:blur-md transition-all -z-10 animate-pulse" />
          
          <MessageCircle className="w-7 h-7 text-white fill-white/20 stroke-[2.2]" />

          {/* Urgent 24/7 Dot Badge */}
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-white rounded-full flex items-center justify-center">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
          </span>
        </a>
      </div>

    </div>
  );
}
