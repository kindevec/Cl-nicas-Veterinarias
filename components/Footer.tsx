'use client';

import React, { useState } from 'react';
import { 
  Truck, 
  RotateCcw, 
  Headphones, 
  ShieldCheck, 
  Send, 
  ExternalLink,
  CheckCircle2
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onNavigate: (sectionId: string, subTarget?: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setEmailInput('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const topValueProps = [
    {
      icon: Truck,
      title: 'Envío Gratis',
      subtitle: 'En compras desde $49+',
    },
    {
      icon: RotateCcw,
      title: 'Garantía Fácil',
      subtitle: '30 días de satisfacción',
    },
    {
      icon: Headphones,
      title: 'Soporte Experto',
      subtitle: 'Estamos para ayudarte',
    },
    {
      icon: ShieldCheck,
      title: 'Pagos Seguros',
      subtitle: '100% protegidos',
    },
  ];

  return (
    <footer id="main-footer" className="w-full bg-[#FAFBF7] text-stone-700 pb-16 lg:pb-0">
      
      {/* 1. Barra Superior Verde Oliva con Propuestas de Valor (Compacta) */}
      <div className="w-full bg-[#526650] text-white py-2.5 sm:py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-2 sm:gap-6 items-center">
          {topValueProps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-center justify-center sm:justify-start gap-2 sm:gap-2.5">
                <Icon className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-white/90 shrink-0 stroke-[1.5]" />
                <div className="min-w-0">
                  <h4 className="text-[11px] sm:text-xs font-bold text-white leading-tight truncate">
                    {item.title}
                  </h4>
                  <p className="hidden sm:block text-[10px] sm:text-[11px] text-white/80 leading-tight">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Cuerpo Principal del Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        
        {/* VISTA MÓVIL COMPACTA (< lg) — Sin desbordamiento ni exceso vertical */}
        <div className="block lg:hidden space-y-3.5">
          {/* Fila 1: Logo y Redes Sociales */}
          <div className="flex items-center justify-between border-b border-stone-200/60 pb-2.5">
            <a 
              href="#inicio"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('inicio');
              }}
              className="cursor-pointer inline-block"
              aria-label="Ir a Inicio"
            >
              <BrandLogo variant="full" size="sm" theme="light" />
            </a>

            {/* Redes Sociales Minimalistas - Instagram y Facebook */}
            <div className="flex items-center gap-2 text-stone-500">
              <a
                href="https://instagram.com/kindev.ec"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-full bg-stone-100 flex items-center justify-center hover:text-[#526650] hover:bg-stone-200 transition-colors cursor-pointer"
                aria-label="Instagram"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://facebook.com/kindev.ec"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-full bg-stone-100 flex items-center justify-center hover:text-[#526650] hover:bg-stone-200 transition-colors cursor-pointer"
                aria-label="Facebook"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Fila 2: Enlaces Esenciales en 2 Columnas */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <h5 className="font-bold text-stone-900 mb-1.5 text-[11px] uppercase tracking-wider">Tienda Pet</h5>
              <ul className="space-y-1 text-stone-600">
                <li>
                  <a 
                    href="#petshop"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate('petshop', 'todos');
                    }}
                    className="hover:text-[#526650] transition-colors cursor-pointer"
                  >
                    Todos los Productos
                  </a>
                </li>
                <li>
                  <a 
                    href="#petshop"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate('petshop', 'accesorios');
                    }}
                    className="hover:text-[#526650] transition-colors cursor-pointer"
                  >
                    Packs &amp; Bundles (20% OFF)
                  </a>
                </li>
                <li>
                  <a 
                    href="#petshop"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate('petshop', 'farmacia');
                    }}
                    className="hover:text-[#526650] transition-colors cursor-pointer"
                  >
                    Farmacia Especializada
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-stone-900 mb-1.5 text-[11px] uppercase tracking-wider">Clínica &amp; Citas</h5>
              <ul className="space-y-1 text-stone-600">
                <li>
                  <a 
                    href="#servicios"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate('servicios');
                    }}
                    className="hover:text-[#526650] transition-colors cursor-pointer"
                  >
                    Especialidades Médicas
                  </a>
                </li>
                <li>
                  <a 
                    href="#citas"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate('citas');
                    }}
                    className="hover:text-[#526650] transition-colors cursor-pointer"
                  >
                    Agendar Cita
                  </a>
                </li>
                <li>
                  <a 
                    href="#nosotros"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate('nosotros');
                    }}
                    className="hover:text-[#526650] transition-colors cursor-pointer"
                  >
                    Sobre Nosotros &amp; FAQ
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Fila 3: Newsletter Compacto de 1 Línea */}
          <div className="pt-3.5 pb-1">
            <form onSubmit={handleSubscribe} className="flex items-center gap-1.5">
              <input
                type="email"
                required
                placeholder="Recibe novedades en tu correo..."
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="flex-1 px-3.5 py-2 rounded-full bg-white border border-stone-300 text-xs text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-[#526650] shadow-2xs"
              />
              <button
                type="submit"
                aria-label="Unirme"
                className="px-4 py-2 rounded-full bg-[#526650] hover:bg-[#3d4c3c] text-white text-xs font-semibold shrink-0 transition-colors cursor-pointer shadow-2xs"
              >
                Unirme
              </button>
            </form>
            {subscribed && (
              <span className="text-[11px] text-[#526650] font-semibold flex items-center gap-1 mt-1">
                <CheckCircle2 className="w-3 h-3" /> ¡Suscrito con éxito!
              </span>
            )}
          </div>
        </div>

        {/* VISTA ESCRITORIO COMPLETA (>= lg) — Grilla de 12 Columnas Rica en Contenido */}
        <div className="hidden lg:grid grid-cols-12 gap-8">
          
          {/* Col 1: Marca & Redes Sociales */}
          <div className="col-span-4 space-y-2">
            <a 
              href="#inicio"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('inicio');
              }}
              className="cursor-pointer inline-block"
              aria-label="Ir a Inicio"
            >
              <BrandLogo variant="full" size="sm" theme="light" />
            </a>

            <p className="text-xs text-stone-600 max-w-xs leading-relaxed">
              Productos seleccionados y atención médica de alta precisión para mascotas que merecen lo mejor.
            </p>

            {/* Redes Sociales Minimalistas - Instagram y Facebook */}
            <div className="flex items-center gap-3 pt-1 text-stone-500">
              <a
                href="https://instagram.com/kindev.ec"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#526650] transition-colors cursor-pointer p-0.5"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              <a
                href="https://facebook.com/kindev.ec"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#526650] transition-colors cursor-pointer p-0.5"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Tienda */}
          <div className="col-span-2">
            <h4 className="text-xs font-bold text-stone-900 tracking-tight mb-2">
              Tienda
            </h4>
            <ul className="space-y-1.5 text-xs text-stone-600">
              <li>
                <a 
                  href="#petshop"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('petshop', 'todos');
                  }}
                  className="hover:text-[#526650] transition-colors cursor-pointer"
                >
                  Todos los Productos
                </a>
              </li>
              <li>
                <a 
                  href="#petshop"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('petshop', 'alimento');
                  }}
                  className="hover:text-[#526650] transition-colors cursor-pointer"
                >
                  Novedades
                </a>
              </li>
              <li>
                <a 
                  href="#petshop"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('petshop', 'snacks');
                  }}
                  className="hover:text-[#526650] transition-colors cursor-pointer"
                >
                  Más Vendidos
                </a>
              </li>
              <li>
                <a 
                  href="#petshop"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('petshop', 'accesorios');
                  }}
                  className="hover:text-[#526650] transition-colors cursor-pointer"
                >
                  Packs &amp; Bundles
                </a>
              </li>
              <li>
                <a 
                  href="#petshop"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('petshop', 'farmacia');
                  }}
                  className="hover:text-[#526650] transition-colors cursor-pointer"
                >
                  Tarjetas de Regalo
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Ayuda */}
          <div className="col-span-2">
            <h4 className="text-xs font-bold text-stone-900 tracking-tight mb-2">
              Ayuda
            </h4>
            <ul className="space-y-1.5 text-xs text-stone-600">
              <li>
                <a 
                  href="#citas"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('citas');
                  }}
                  className="hover:text-[#526650] transition-colors cursor-pointer"
                >
                  Contáctanos
                </a>
              </li>
              <li>
                <a 
                  href="#petshop"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('petshop');
                  }}
                  className="hover:text-[#526650] transition-colors cursor-pointer"
                >
                  Envíos &amp; Entregas
                </a>
              </li>
              <li>
                <a 
                  href="#petshop"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('petshop');
                  }}
                  className="hover:text-[#526650] transition-colors cursor-pointer"
                >
                  Devoluciones &amp; Cambios
                </a>
              </li>
              <li>
                <a 
                  href="#petshop"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('petshop');
                  }}
                  className="hover:text-[#526650] transition-colors cursor-pointer"
                >
                  Rastrear Pedido
                </a>
              </li>
              <li>
                <a 
                  href="#servicios"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('servicios');
                  }}
                  className="hover:text-[#526650] transition-colors cursor-pointer"
                >
                  Preguntas Frecuentes
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: La Clínica */}
          <div className="col-span-2">
            <h4 className="text-xs font-bold text-stone-900 tracking-tight mb-2">
              La Clínica
            </h4>
            <ul className="space-y-1.5 text-xs text-stone-600">
              <li>
                <a 
                  href="#nosotros"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('nosotros');
                  }}
                  className="hover:text-[#526650] transition-colors cursor-pointer"
                >
                  Sobre Nosotros
                </a>
              </li>
              <li>
                <a 
                  href="#nosotros"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('nosotros');
                  }}
                  className="hover:text-[#526650] transition-colors cursor-pointer"
                >
                  Nuestra Promesa
                </a>
              </li>
              <li>
                <a 
                  href="#nosotros"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('nosotros');
                  }}
                  className="hover:text-[#526650] transition-colors cursor-pointer"
                >
                  Protocolo Fear-Free
                </a>
              </li>
              <li>
                <a 
                  href="#servicios"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('servicios');
                  }}
                  className="hover:text-[#526650] transition-colors cursor-pointer"
                >
                  Blog &amp; Cuidados
                </a>
              </li>
              <li>
                <a 
                  href="#citas"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('citas');
                  }}
                  className="hover:text-[#526650] transition-colors cursor-pointer"
                >
                  Equipo Médico
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Boletín / Newsletter */}
          <div className="col-span-2 space-y-2">
            <h4 className="text-xs font-bold text-stone-900 tracking-tight mb-1">
              Boletín
            </h4>
            <p className="text-xs text-stone-600 leading-snug">
              Tips y novedades directo en tu correo.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-1.5 pt-0.5">
              <div className="relative flex items-center">
                <input
                  type="email"
                  required
                  placeholder="Tu correo"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full pl-3 pr-8 py-1.5 rounded-full bg-white border border-stone-300 text-xs text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-[#526650] shadow-2xs"
                />
                <button
                  type="submit"
                  aria-label="Suscribirme"
                  className="absolute right-1 w-6 h-6 rounded-full bg-[#526650] hover:bg-[#3d4c3c] text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <Send className="w-2.5 h-2.5" />
                </button>
              </div>

              {subscribed && (
                <span className="text-[11px] text-[#526650] font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> ¡Suscrito con éxito!
                </span>
              )}
            </form>
          </div>

        </div>

        {/* Fila Inferior de Copyright & Créditos (Compacta) */}
        <div className="mt-6 pt-3.5 border-t border-stone-200/70 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] sm:text-xs text-stone-500">
          <div>
            <span>© 2026 VetCare &amp; Pet Gourmet. Todos los derechos reservados.</span>
          </div>

          <div className="text-center sm:text-right">
            <span>Desarrollado por </span>
            <a
              id="kindev-official-credit-link"
              href="https://www.kindevsas.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#526650] hover:text-[#3d4c3c] font-bold underline underline-offset-2 transition-colors inline-flex items-center gap-1"
            >
              <span>Kindev S.A.S.</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
        </div>

      </div>

    </footer>
  );
}
