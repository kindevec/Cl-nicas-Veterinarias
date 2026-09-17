'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { WhatsAppOfficialIcon } from '@/components/WhatsAppOfficialIcon';
import { buildWhatsAppUrl } from '@/lib/utils';

interface PromoBundleBannerProps {
  onNavigate?: (sectionId: string, subTarget?: string) => void;
}

export function PromoBundleBanner({ onNavigate }: PromoBundleBannerProps) {
  const handleShopBundle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('petshop', 'accesorios');
    } else {
      const el = document.getElementById('petshop');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const whatsappBundleUrl = buildWhatsAppUrl(
    '¡Hola VetCare! Me gustaría adquirir el Pack de Inicio para Mascotas (New Pet Starter Bundle) con la oferta del 20% OFF.'
  );

  return (
    <section className="w-full bg-[#FAFBF7] py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* ========================================================= */}
        {/* 📱 1. VISTA MÓVIL BESPOKE (< 1024px)                       */}
        {/* Rediseño nativo: Tarjeta integrada con media fluida,     */}
        {/* badge 20% OFF flotante en foto y dual CTA al pulgar       */}
        {/* ========================================================= */}
        <div className="block lg:hidden relative rounded-[24px] bg-[#F5EFE6] border border-stone-200/80 overflow-hidden shadow-xs hover:shadow-md transition-shadow">
          
          {/* Imagen de Producto con Badge 20% OFF Integrado */}
          <div className="relative w-full aspect-[16/9] overflow-hidden bg-stone-200">
            <Image
              src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=85"
              alt="Pack de Inicio Nueva Mascota — Accesorios, juguetes, comedero y nutrición premium"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 450px"
              className="object-cover object-center"
            />
            
            {/* Sombra degradada sutil para contraste */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10 pointer-events-none" />

            {/* Badge Flotante Superior Derecho: 20% OFF */}
            <div className="absolute top-3 right-3 bg-[#2F4635]/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg border border-white/20 flex items-center gap-1.5 text-white">
              <span className="font-extrabold text-xs tracking-tight">20% OFF</span>
              <span className="w-1 h-1 rounded-full bg-emerald-400" />
              <span className="text-[10px] font-bold text-emerald-200 uppercase tracking-wider">Ahorro</span>
            </div>
          </div>

          {/* Contenido Editorial Inferior */}
          <div className="p-5 flex flex-col space-y-3 text-left">
            <div>
              <h2 className="font-extrabold text-xl sm:text-2xl text-[#182B1E] tracking-tight leading-tight">
                Kit de Inicio para <span className="text-[#E05A47] font-extrabold">Mascotas</span>
              </h2>
              <p className="text-xs text-stone-600 font-medium leading-relaxed pt-1">
                Todos los esenciales en una sola caja perfecta. Ahorra hasta un <strong className="text-[#182B1E] font-bold">20%</strong> en tu primer set completo.
              </p>
            </div>

            {/* Botones de Acción Ergonómicos al Pulgar (Dual CTA en 1 fila) */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <a
                href="#petshop"
                onClick={handleShopBundle}
                className="inline-flex items-center justify-center h-11 px-3 rounded-full bg-[#2F4635] hover:bg-[#1E3023] text-white font-bold text-xs tracking-wide shadow-md shadow-[#2F4635]/20 active:scale-95 transition-all cursor-pointer"
              >
                <span>Comprar Pack</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </a>

              <a
                href={whatsappBundleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center h-11 px-3 rounded-full bg-white hover:bg-stone-50 border border-stone-300/90 text-[#182B1E] font-bold text-xs tracking-wide shadow-2xs active:scale-95 transition-all cursor-pointer"
              >
                <WhatsAppOfficialIcon className="w-3.5 h-3.5 mr-1.5 text-emerald-600 shrink-0" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

        </div>

        {/* ========================================================= */}
        {/* 🖥️ 2. VISTA DE ESCRITORIO (hidden lg:block)                 */}
        {/* Composición panorámica de 3 columnas con sello circular   */}
        {/* ========================================================= */}
        <div className="hidden lg:block relative rounded-[32px] bg-[#F5EFE6] border border-stone-200/70 overflow-hidden shadow-xs hover:shadow-md transition-shadow">
          <div className="flex flex-row items-stretch justify-between">
            
            {/* Izquierda: Composición de Productos */}
            <div className="relative w-[38%] xl:w-[36%] min-h-[280px] shrink-0 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=85"
                alt="Pack de Inicio Nueva Mascota — Accesorios, juguetes, comedero y nutrición premium"
                fill
                sizes="450px"
                className="object-cover object-center hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Centro: Contenido Editorial y CTA */}
            <div className="flex-1 p-8 flex flex-col items-start justify-center text-left">
              <h2 className="font-extrabold text-3xl lg:text-4xl text-[#182B1E] tracking-tight leading-tight mb-2.5">
                Kit de Inicio para <span className="text-[#E05A47] font-extrabold">Mascotas</span>
              </h2>

              <p className="text-sm lg:text-base text-stone-600 font-medium leading-relaxed mb-4 max-w-md">
                Todos los esenciales en una sola caja perfecta. <br />
                <strong className="text-[#182B1E] font-bold">Ahorra hasta un 20%</strong> en tu primer set completo.
              </p>

              <div className="flex items-center gap-3">
                <a
                  href="#petshop"
                  onClick={handleShopBundle}
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[#2F4635] hover:bg-[#1E3023] text-white font-bold text-sm tracking-wide shadow-md shadow-[#2F4635]/20 hover:shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer group"
                >
                  <span>Comprar Pack</span>
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1 text-white/90" />
                </a>

                <a
                  href={whatsappBundleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-white hover:bg-stone-50 border border-stone-300/80 text-[#182B1E] font-bold text-sm tracking-wide shadow-2xs hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <WhatsAppOfficialIcon className="w-4 h-4 mr-2 text-emerald-600 shrink-0" />
                  <span>Pedir por WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Derecha: Círculo Verde Oliva con el Descuento (20% OFF) */}
            <div className="w-[22%] p-8 flex items-center justify-center">
              <div className="w-32 h-32 lg:w-36 lg:h-36 rounded-full bg-[#344E3B] text-white flex flex-col items-center justify-center shadow-lg shadow-[#344E3B]/25 hover:scale-105 transition-transform select-none">
                <span className="font-extrabold text-4xl lg:text-5xl leading-none">
                  20%
                </span>
                <span className="text-xs font-bold tracking-widest uppercase mt-1 text-emerald-200">
                  OFF
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
