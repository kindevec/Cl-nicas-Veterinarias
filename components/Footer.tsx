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
import { BrandLogo } from './BrandLogo';

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
    <footer id="main-footer" className="bg-[#0D3D20] text-slate-200 border-t border-emerald-900/60 pt-16 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-emerald-800/40">
          
          {/* Brand Col (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-4">
            <div 
              onClick={() => onNavigate('inicio')}
              className="cursor-pointer inline-block"
            >
              <BrandLogo variant="full" size="md" theme="dark" />
            </div>

            <p className="text-xs text-emerald-100/80 max-w-sm leading-relaxed">
              Hospital Veterinario Quirúrgico de Referencia con atención ininterrumpida de urgencias 24/7, unidad de cuidados intensivos, quirófano estéril AOVET y nutrición biológica de grado médico.
            </p>

            <div className="space-y-2 text-xs text-emerald-100/90 pt-2">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Urgencias &amp; Hospitalización: Abierto 24 Horas / 365 Días</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Av. República del Salvador y NNUU, Edif. Titanium Plaza, Quito, Ecuador</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={buildWhatsAppUrl('Línea Telefónica Directa')} className="hover:text-white underline">
                  +593 99 195 2889 (Central Oficial Kindev)
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
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300 font-mono">
              Especialidades Clínicas
            </h4>
            <ul className="space-y-2 text-xs text-emerald-100/70">
              <li>
                <button onClick={() => onNavigate('servicios')} className="hover:text-white transition-colors cursor-pointer">
                  Urgencias 24/7 &amp; UCI
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('servicios')} className="hover:text-white transition-colors cursor-pointer">
                  Quirófano AOVET &amp; Ortopedia
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('servicios')} className="hover:text-white transition-colors cursor-pointer">
                  Laboratorio IDEXX In-House
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('servicios')} className="hover:text-white transition-colors cursor-pointer">
                  Medicina Felina Fear-Free
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('servicios')} className="hover:text-white transition-colors cursor-pointer">
                  Spa &amp; Grooming Médico
                </button>
              </li>
            </ul>
          </div>

          {/* Pet Gourmet Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">
              Pet Gourmet &amp; Farmacia
            </h4>
            <ul className="space-y-2 text-xs text-emerald-100/70">
              <li>
                <button onClick={() => onNavigate('petshop')} className="hover:text-amber-300 transition-colors cursor-pointer">
                  Dietas Renales &amp; Gastro
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('petshop')} className="hover:text-amber-300 transition-colors cursor-pointer">
                  Snacks Mono-Proteicos
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('petshop')} className="hover:text-amber-300 transition-colors cursor-pointer">
                  Antipulgas &amp; Condroprotectores
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('citas')} className="hover:text-amber-300 transition-colors cursor-pointer">
                  Calculadora Nutricional WSAVA
                </button>
              </li>
              <li>
                <button onClick={onOpenAdmin} className="hover:text-white flex items-center gap-1 cursor-pointer">
                  <span>Acceso Backoffice Supabase</span>
                  <ExternalLink className="w-3 h-3 text-emerald-400" />
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Sanitized Form with Honeypot */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300 font-mono">
              Salud Preventiva
            </h4>
            <p className="text-xs text-emerald-100/70 leading-relaxed">
              Recibe avisos de refuerzo vacunal, desparasitación estacional y tips de nutrición clínica.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
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
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-xs placeholder:text-emerald-200/50 focus:outline-none focus:border-emerald-400 pr-9"
                />
                <button
                  type="submit"
                  aria-label="Suscribirme"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>

              {subscribed && (
                <span className="text-[11px] text-emerald-300 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> ¡Suscrito al boletín de salud!
                </span>
              )}
            </form>

            <div className="pt-2 text-[11px] text-emerald-200/80 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Privacidad médica y datos 100% protegidos.</span>
            </div>
          </div>

        </div>

        {/* Bottom Credits with Kindev Official Mandate */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-200/70">
          <div className="flex items-center gap-2">
            <span>Resolución Sanitaria Agrocalidad / ICA N° 00482</span>
            <span>•</span>
            <span>Hospital Veterinario Certificado</span>
          </div>

          <div className="text-center sm:text-right">
            <span>© 2026 Todos los derechos reservados. Desarrollado por </span>
            <a
              id="kindev-official-credit-link"
              href="https://www.kindevsas.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 font-bold underline underline-offset-2 transition-colors inline-flex items-center gap-1"
            >
              <span>Kindev S.A.S.</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
