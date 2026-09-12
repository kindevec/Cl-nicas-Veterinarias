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
        <div className="mb-3 w-72 rounded-2xl bg-slate-900/95 border border-emerald-500/30 p-4 shadow-2xl backdrop-blur-xl animate-in slide-in-from-bottom-5 duration-200 text-xs space-y-2.5">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Veterinarios en Línea 24/7</span>
            </div>
            <button
              type="button"
              onClick={() => setIsMenuOpen(false)}
              className="text-slate-400 hover:text-white p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-[11px] text-slate-300 leading-tight">
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
                className="block p-2 rounded-xl bg-slate-950/70 hover:bg-emerald-500 hover:text-slate-950 border border-white/5 text-slate-200 font-semibold transition-all"
              >
                {svc}
              </a>
            ))}
          </div>

          <div className="pt-1 text-[10px] text-slate-400 text-center">
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
          className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-full bg-slate-900/90 hover:bg-slate-800 border border-emerald-500/30 text-emerald-300 text-xs font-semibold shadow-lg backdrop-blur-md transition-all group"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Urgencia WhatsApp</span>
          <ChevronUp className={`w-3.5 h-3.5 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
        </button>

        <a
          id="floating-whatsapp-btn"
          href={buildWhatsAppUrl('Urgencia Veterinaria 24/7')}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contactar Urgencia Veterinaria por WhatsApp"
          className="relative w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 hover:from-emerald-500 hover:to-teal-300 text-slate-950 flex items-center justify-center shadow-xl shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all group"
        >
          {/* Pulsing Beacon Glow */}
          <span className="absolute -inset-1 rounded-2xl bg-emerald-400/30 blur-sm group-hover:blur-md transition-all -z-10 animate-pulse" />
          
          <MessageCircle className="w-7 h-7 text-slate-950 fill-slate-950/20 stroke-[2.2]" />

          {/* Urgent 24/7 Dot Badge */}
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 border-2 border-slate-950 rounded-full flex items-center justify-center">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
          </span>
        </a>
      </div>

    </div>
  );
}
