'use client';

import React, { useState } from 'react';
import { 
  HeartPulse, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  ExternalLink,
  Send,
  CheckCircle2
} from 'lucide-react';
import { VETCARE_PHONE, buildWhatsAppUrl } from '@/lib/utils';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenAdmin: () => void;
}

export function Footer({ onNavigate, onOpenAdmin }: FooterProps) {
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput) {
      setSubscribed(true);
      setEmailInput('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer id="main-footer" className="bg-slate-950 border-t border-white/10 pt-16 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Col (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center border border-emerald-400/30">
                <HeartPulse className="w-5 h-5 text-slate-950 stroke-[2.5]" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-white">
                  Vet<span className="text-emerald-400">Care</span>
                </span>
                <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-400/15 text-amber-300 border border-amber-400/30">
                  PET GOURMET
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Centro hospitalario veterinario de referencia médica de alta complejidad con servicio de urgencias 24/7, unidad de cuidados intensivos, quirófano estéril y boutique de nutrición gourmet especializada.
            </p>

            <div className="space-y-2 text-xs text-slate-300 pt-2">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Urgencias &amp; Hospitalización: Abierto 24 Horas / 365 Días</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Sede Matriz: Av. República del Salvador y NNUU, Edif. Titanium Plaza, Quito, Ecuador</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={buildWhatsAppUrl('Línea Telefónica Directa')} className="hover:text-white underline">
                  +593 99 195 2889 (Central Kindev)
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="mailto:kindevx@gmail.com" className="hover:text-white underline">
                  kindevx@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Nav Services Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Servicios Clínicos
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('servicios')} className="hover:text-emerald-400 transition-colors">
                  Urgencias 24/7 &amp; UCI
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('servicios')} className="hover:text-emerald-400 transition-colors">
                  Quirófano &amp; Traumatología
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('servicios')} className="hover:text-emerald-400 transition-colors">
                  Laboratorio IDEXX 20 min
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('servicios')} className="hover:text-emerald-400 transition-colors">
                  Medicina Felina Fear-Free
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('servicios')} className="hover:text-emerald-400 transition-colors">
                  Spa &amp; Grooming Médico
                </button>
              </li>
            </ul>
          </div>

          {/* Pet Gourmet Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300">
              Pet Shop Especializado
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('petshop')} className="hover:text-amber-300 transition-colors">
                  Alimento Renal &amp; Gastro
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('petshop')} className="hover:text-amber-300 transition-colors">
                  Snacks 100% Salmón &amp; Pavo
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('petshop')} className="hover:text-amber-300 transition-colors">
                  Antipulgas &amp; Condroprotectores
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('petshop')} className="hover:text-amber-300 transition-colors">
                  Dietas para Exóticos
                </button>
              </li>
              <li>
                <button onClick={onOpenAdmin} className="hover:text-white flex items-center gap-1">
                  <span>Acceso Backoffice Supabase</span>
                  <ExternalLink className="w-3 h-3 text-emerald-400" />
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Sanitized Form with Honeypot */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Recordatorios Preventivos
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Recibe avisos de refuerzo vacunal, desparasitación estacional y promociones de nutrición gourmet.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              {/* Honeypot field (anti-bot Kindev standard) */}
              <input 
                type="text" 
                name="_gotcha" 
                className="hidden" 
                tabIndex={-1} 
                autoComplete="off" 
              />

              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="tucorreo@ejemplo.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs placeholder-slate-400 focus:outline-none focus:border-emerald-400/50 pr-9"
                />
                <button
                  type="submit"
                  aria-label="Suscribirme"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all"
                >
                  <Send className="w-3 h-3" />
                </button>
              </div>

              {subscribed && (
                <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> ¡Suscrito al boletín de salud preventiva!
                </span>
              )}
            </form>

            <div className="pt-2 text-[11px] text-slate-400 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Privacidad médica y datos 100% protegidos.</span>
            </div>
          </div>

        </div>

        {/* Bottom Credits with Kindev Official Branding Mandate */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span>Resolución Sanitaria ICA N° 00482-COL</span>
            <span>•</span>
            <span>Certificación Acreditación Veterinaria Acreditada</span>
          </div>

          {/* REQUIRED KINDEV OFFICIAL FOOTER CREDIT */}
          <div className="text-slate-400 text-center sm:text-right">
            <span>© 2026 Todos los derechos reservados. Desarrollado por </span>
            <a
              id="kindev-official-credit-link"
              href="https://www.kindevsas.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 font-semibold underline underline-offset-2 transition-colors inline-flex items-center gap-1"
            >
              <span>Kindev</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
