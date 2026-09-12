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
}

export function Footer({ onNavigate }: FooterProps) {
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
              Hospital Veterinario Quirúrgico de Referencia con atención ininterrumpida de urgencias 24/7, unidad de cuidados intensivos, quirófano estéril de alta gama y nutrición biológica de grado médico.
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

            {/* Official Social Media Channels (Kindev Standard) */}
            <div className="pt-2">
              <span className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider block font-mono mb-2">
                Redes Oficiales Kindev
              </span>
              <div className="flex items-center gap-2.5">
                {/* WhatsApp Official */}
                <a
                  href="https://wa.me/593991952889?text=Hola%20Kindev%20%2F%20VetCare%20Gourmet%2C%20me%20contacto%20desde%20la%20web%20oficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#25D366] text-white flex items-center justify-center transition-all hover:scale-110 shadow-sm cursor-pointer"
                  title="WhatsApp Oficial"
                  aria-label="WhatsApp Oficial"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zm4.52 11.66c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.07-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.84-.86 2.05s.88 2.38 1 2.54c.12.17 1.73 2.64 4.2 3.7 2.46 1.07 2.46.71 2.91.67.45-.05 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.28z"/>
                  </svg>
                </a>

                {/* Instagram Official */}
                <a
                  href="https://instagram.com/kindev.ec"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-gradient-to-tr hover:from-amber-500 hover:via-rose-500 hover:to-purple-600 text-white flex items-center justify-center transition-all hover:scale-110 shadow-sm cursor-pointer"
                  title="Instagram Oficial"
                  aria-label="Instagram Oficial"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>

                {/* Facebook Official */}
                <a
                  href="https://facebook.com/kindev.ec"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#1877F2] text-white flex items-center justify-center transition-all hover:scale-110 shadow-sm cursor-pointer"
                  title="Facebook Oficial"
                  aria-label="Facebook Oficial"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>

                {/* TikTok Official */}
                <a
                  href="https://tiktok.com/@kindev.ec"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-black text-white flex items-center justify-center transition-all hover:scale-110 shadow-sm cursor-pointer"
                  title="TikTok Oficial"
                  aria-label="TikTok Oficial"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-1.01v8.86c0 1.78-.66 3.56-1.89 4.84-1.57 1.64-3.86 2.47-6.12 2.26-2.52-.23-4.78-1.74-5.91-4.01-1.12-2.28-.96-5.07.41-7.18 1.25-1.92 3.45-3.04 5.73-3.04.42 0 .84.04 1.25.12v4.06c-.39-.12-.8-.19-1.21-.19-1.28 0-2.48.66-3.13 1.74-.65 1.09-.64 2.46.03 3.53.67 1.08 1.88 1.73 3.16 1.68 1.45-.06 2.69-1.13 2.91-2.57.07-.46.08-.93.08-1.39V.02z"/>
                  </svg>
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
                  Quirófano Quirúrgico &amp; Ortopedia
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
                <a
                  href={buildWhatsAppUrl('Consulta Catálogo Gourmet')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center gap-1 cursor-pointer text-emerald-300 font-semibold"
                >
                  <span>Pedir Asesoría Directa</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
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
