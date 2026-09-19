'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  Star, 
  CheckCircle2, 
  Award, 
  Calculator,
  Phone,
  ArrowUpRight
} from 'lucide-react';
import { WhatsAppOfficialIcon } from '@/components/WhatsAppOfficialIcon';
import { VETERINARY_SERVICES, PET_PRODUCTS } from '@/lib/mockData';
import { formatUSD, buildWhatsAppUrl } from '@/lib/utils';

interface HomeExecutiveShowcaseProps {
  onNavigate: (sectionId: string, subTarget?: string) => void;
  onSelectServiceForBooking: (serviceName: string) => void;
}

const LEADING_DOCTORS = [
  {
    name: 'Dra. Valentina Morales, DVM',
    role: 'Directora Médica & Cirugía Especializada',
    bio: 'Cirugía ortopédica y traumatología avanzada con más de 12 años liderando intervenciones de alta complejidad.',
    image: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&w=800&q=80',
    badge: 'Jefa de Cirugía Avanzada'
  },
  {
    name: 'Dr. Carlos Mendoza, MSc',
    role: 'Cardiología & Cuidados Críticos UCI',
    bio: 'Magíster en Medicina Interna y Cardiología de pequeños animales. Ecocardiografía Doppler 3D avanzada.',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=800&q=80',
    badge: 'Unidad Cuidados Intensivos'
  },
  {
    name: 'Dra. Sofía Rueda',
    role: 'Nutrición Clínica & Medicina Felina',
    bio: 'Dietoterapia biológica personalizada y protocolos libres de estrés (Fear Free Certified) para felinos.',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80',
    badge: 'Fear Free Certified'
  }
];

export function HomeExecutiveShowcase({
  onNavigate,
  onSelectServiceForBooking,
}: HomeExecutiveShowcaseProps) {
  const servicesScrollRef = useRef<HTMLDivElement>(null);
  const productsScrollRef = useRef<HTMLDivElement>(null);

  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const [activeProductIndex, setActiveProductIndex] = useState(0);
  const [isServicesHovered, setIsServicesHovered] = useState(false);
  const [isProductsHovered, setIsProductsHovered] = useState(false);

  // Desplazamiento inteligente calculado con el ancho real de la tarjeta + gap
  const scrollCarousel = useCallback((ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const container = ref.current;
      const firstCard = container.querySelector(':scope > div') as HTMLElement | null;
      const secondCard = firstCard?.nextElementSibling as HTMLElement | null;
      const step = (firstCard && secondCard)
        ? (secondCard.offsetLeft - firstCard.offsetLeft)
        : (firstCard ? firstCard.offsetWidth + 20 : 360);
      const maxScroll = container.scrollWidth - container.clientWidth;

      if (direction === 'right') {
        if (container.scrollLeft >= maxScroll - 24) {
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          container.scrollBy({ left: step, behavior: 'smooth' });
        }
      } else {
        if (container.scrollLeft <= 24) {
          container.scrollTo({ left: maxScroll, behavior: 'smooth' });
        } else {
          container.scrollBy({ left: -step, behavior: 'smooth' });
        }
      }
    }
  }, []);

  // Reproducción automática elegante con pausa al pasar el cursor (Especialidades)
  useEffect(() => {
    if (isServicesHovered) return;
    const timer = setInterval(() => {
      scrollCarousel(servicesScrollRef, 'right');
    }, 4500);
    return () => clearInterval(timer);
  }, [isServicesHovered, scrollCarousel]);

  // Reproducción automática elegante con pausa al pasar el cursor (Pet Shop)
  useEffect(() => {
    if (isProductsHovered) return;
    const timer = setInterval(() => {
      scrollCarousel(productsScrollRef, 'right');
    }, 5000);
    return () => clearInterval(timer);
  }, [isProductsHovered, scrollCarousel]);

  // Detector de progreso de scroll para sincronizar los dots
  const handleScrollProgress = (
    ref: React.RefObject<HTMLDivElement | null>, 
    setIndex: React.Dispatch<React.SetStateAction<number>>
  ) => {
    if (ref.current) {
      const container = ref.current;
      const firstCard = container.querySelector(':scope > div') as HTMLElement | null;
      const secondCard = firstCard?.nextElementSibling as HTMLElement | null;
      const step = (firstCard && secondCard)
        ? (secondCard.offsetLeft - firstCard.offsetLeft)
        : (firstCard ? firstCard.offsetWidth + 20 : 360);
      const idx = Math.round(container.scrollLeft / step);
      setIndex(Math.max(0, idx));
    }
  };

  return (
    <div className="w-full">
      
      {/* =========================================================================
          BLOQUE 1: LA CLÍNICA & ESPECIALISTAS (Orden 1 después de Inicio - #nosotros)
          ========================================================================= */}
      <section className="py-6 sm:py-8 bg-[#FAFBF7] relative overflow-hidden">
        {/* Subtle Ambient Light */}
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-emerald-50/50 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8 relative z-10">
          
          {/* Header de la sección */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-5 sm:gap-6"
          >
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0D3D20] tracking-tight leading-tight">
                Conoce la Clínica <span className="text-[#E05A47] font-extrabold">VetCare</span>
              </h2>
            </div>

            <a
              href="#nosotros"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('nosotros');
              }}
              className="inline-flex items-center justify-center text-center gap-2 px-6 py-3 rounded-full bg-slate-50 hover:bg-[#0D3D20] border border-slate-300 hover:border-[#0D3D20] text-slate-800 hover:text-white text-xs font-bold uppercase tracking-wider transition-all shadow-2xs hover:scale-105 active:scale-95 cursor-pointer shrink-0 w-full sm:w-auto"
            >
              <span className="text-center">Explorar La Clínica</span>
              <ArrowRight className="w-4 h-4 text-[#1A6B38] group-hover:text-white shrink-0" />
            </a>
          </motion.div>

          {/* Grid de 3 Especialistas Médicos Principales */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {LEADING_DOCTORS.map((doc, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="bg-[#FAFBF7] rounded-[32px] overflow-hidden shadow-xs hover:shadow-xl border border-slate-200/80 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-2"
              >
                <div>
                  <div className="relative h-56 sm:h-60 w-full overflow-hidden bg-slate-100">
                    <Image
                      src={doc.image}
                      alt={doc.name}
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  </div>

                  <div className="p-5 sm:p-6 space-y-2">
                    <h4 className="text-base sm:text-lg font-bold text-slate-900 leading-snug group-hover:text-[#1A6B38] transition-colors">
                      {doc.name}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed pt-1">{doc.bio}</p>
                  </div>
                </div>

                <div className="p-5 sm:p-6 pt-3 border-t border-slate-200/60 mt-2 flex items-center justify-center">
                  <a
                    href="#citas"
                    onClick={(e) => {
                      e.preventDefault();
                      onSelectServiceForBooking(`Consulta Médica con ${doc.name}`);
                    }}
                    className="inline-flex items-center justify-center gap-1.5 px-6 py-2.5 rounded-full bg-emerald-50 hover:bg-[#1A6B38] text-[#1A6B38] hover:text-white text-xs font-bold transition-all duration-200 shadow-2xs hover:scale-105 active:scale-95 cursor-pointer w-full sm:w-auto text-center"
                  >
                    <span>Agendar</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          BLOQUE 2: ESPECIALIDADES MÉDICAS & QUIRÚRGICAS (Orden 2 - #servicios)
          ========================================================================= */}
      <section className="py-6 sm:py-8 bg-[#FAFBF7] relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-1/4 left-5 w-72 h-72 bg-emerald-100/30 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8 relative z-10">
          
          {/* Header con Enlace de Navegación */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-5 sm:gap-6"
          >
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0D3D20] tracking-tight leading-tight">
                Especialidades <span className="text-[#E05A47] font-extrabold">Médicas &amp; Quirúrgicas</span>
              </h2>
            </div>

            <a
              href="#servicios"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('servicios');
              }}
              className="inline-flex items-center justify-center text-center gap-2 px-6 py-3 rounded-full bg-[#1A6B38] hover:bg-[#14532D] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm hover:scale-105 active:scale-95 cursor-pointer shrink-0 w-full sm:w-auto"
            >
              <span className="text-center">Ver Todas las Especialidades</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </a>
          </motion.div>

          {/* Carrusel Horizontal de Especialidades */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative group"
            onMouseEnter={() => setIsServicesHovered(true)}
            onMouseLeave={() => setIsServicesHovered(false)}
            onTouchStart={() => setIsServicesHovered(true)}
            onTouchEnd={() => setIsServicesHovered(false)}
          >
            {/* Botón Lateral Izquierdo (visible en pantallas medianas y grandes) */}
            <button
              type="button"
              onClick={() => scrollCarousel(servicesScrollRef, 'left')}
              aria-label="Anterior especialidad"
              className="hidden sm:flex absolute -left-4 sm:-left-5 lg:-left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-[#0D3D20] text-[#0D3D20] hover:text-white shadow-xl border border-slate-200/90 items-center justify-center transition-all duration-200 cursor-pointer active:scale-95 backdrop-blur-md hover:scale-110"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
            </button>

            <div 
              ref={servicesScrollRef}
              onScroll={() => handleScrollProgress(servicesScrollRef, setActiveServiceIndex)}
              tabIndex={0}
              aria-label="Carrusel de especialidades médicas"
              className="flex gap-5 sm:gap-6 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scroll-smooth focus:outline-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden px-1"
            >
              {VETERINARY_SERVICES.map((svc) => (
                <div
                  key={svc.id}
                  className="w-full min-w-full max-w-full snap-center sm:w-[340px] sm:min-w-[340px] sm:max-w-[340px] sm:snap-start bg-white rounded-[28px] overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group/card hover:-translate-y-2 shrink-0"
                >
                  <div>
                    <div className="relative h-50 w-full overflow-hidden bg-slate-100">
                      {svc.image && (
                        <Image
                          src={svc.image}
                          alt={svc.name}
                          fill
                          className="object-cover object-center group-hover/card:scale-105 transition-transform duration-500"
                          sizes="340px"
                          referrerPolicy="no-referrer"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    </div>

                    <div className="p-5 sm:p-6 space-y-2">
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover/card:text-[#1A6B38] transition-colors line-clamp-2 leading-snug">
                        {svc.name}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {svc.shortDescription}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 sm:p-6 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-medium">Inversión Estimada:</span>
                      <span className="text-base font-black text-[#0D3D20]">
                        {formatUSD(svc.priceEstimate)}
                      </span>
                    </div>

                    <a
                      href="#citas"
                      onClick={(e) => {
                        e.preventDefault();
                        onSelectServiceForBooking(svc.name);
                      }}
                      className="px-4 py-2 rounded-full bg-[#1A6B38] hover:bg-[#14532D] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-xs hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1.5"
                    >
                      <span>Agendar</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Botón Lateral Derecho (visible en pantallas medianas y grandes) */}
            <button
              type="button"
              onClick={() => scrollCarousel(servicesScrollRef, 'right')}
              aria-label="Siguiente especialidad"
              className="hidden sm:flex absolute -right-4 sm:-right-5 lg:-right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-[#0D3D20] text-[#0D3D20] hover:text-white shadow-xl border border-slate-200/90 items-center justify-center transition-all duration-200 cursor-pointer active:scale-95 backdrop-blur-md hover:scale-110"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
            </button>

            {/* Controles Inferiores: Flechas en Móvil + Indicadores de Reproducción / Dots */}
            <div className="flex items-center justify-between sm:justify-center gap-3 pt-4 px-2">
              {/* Flecha Anterior (solo móvil para no tapar las cards) */}
              <button
                type="button"
                onClick={() => scrollCarousel(servicesScrollRef, 'left')}
                aria-label="Anterior especialidad"
                className="sm:hidden w-8 h-8 rounded-full bg-white border border-slate-200 shadow-xs flex items-center justify-center text-[#0D3D20] active:scale-95 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" strokeWidth={2.5} />
              </button>

              {/* Dots */}
              <div className="flex items-center gap-1.5">
                {VETERINARY_SERVICES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      if (servicesScrollRef.current) {
                        const container = servicesScrollRef.current;
                        const firstCard = container.querySelector(':scope > div') as HTMLElement | null;
                        const secondCard = firstCard?.nextElementSibling as HTMLElement | null;
                        const step = (firstCard && secondCard)
                          ? (secondCard.offsetLeft - firstCard.offsetLeft)
                          : (firstCard ? firstCard.offsetWidth + 20 : 364);
                        container.scrollTo({ left: idx * step, behavior: 'smooth' });
                      }
                    }}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      idx === activeServiceIndex ? 'w-7 bg-[#1A6B38]' : 'w-2 bg-slate-300 hover:bg-slate-400'
                    }`}
                    aria-label={`Ir al servicio ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Flecha Siguiente (solo móvil para no tapar las cards) */}
              <button
                type="button"
                onClick={() => scrollCarousel(servicesScrollRef, 'right')}
                aria-label="Siguiente especialidad"
                className="sm:hidden w-8 h-8 rounded-full bg-white border border-slate-200 shadow-xs flex items-center justify-center text-[#0D3D20] active:scale-95 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
              </button>
            </div>
          </motion.div>

        </div>
      </section>

      {/* =========================================================================
          BLOQUE 3: PET SHOP GOURMET & NUTRICIÓN (Orden 3 - #petshop)
          ========================================================================= */}
      <section className="py-6 sm:py-8 bg-[#FAFBF7] relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-1/3 right-5 w-80 h-80 bg-amber-50/60 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8 relative z-10">
          
          {/* Header con Enlace a Pet Shop */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-5 sm:gap-6"
          >
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0D3D20] tracking-tight leading-tight">
                Pet Shop Gourmet &amp; <span className="text-[#E05A47] font-extrabold">Dietas Clínicas</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 max-w-xl leading-relaxed">
                Alimentos biológicos super premium, dietas veterinarias formuladas WSAVA y nutracéuticos de grado hospitalario.
              </p>
            </div>

            <a
              href="#petshop"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('petshop');
              }}
              className="inline-flex items-center justify-center text-center gap-2 px-6 py-3 rounded-full bg-[#0D3D20] hover:bg-[#1A6B38] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm hover:scale-105 active:scale-95 cursor-pointer shrink-0 w-full sm:w-auto"
            >
              <span className="text-center">Ver Catálogo Gourmet</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </a>
          </motion.div>

          {/* Carrusel Horizontal de Productos */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative group"
            onMouseEnter={() => setIsProductsHovered(true)}
            onMouseLeave={() => setIsProductsHovered(false)}
            onTouchStart={() => setIsProductsHovered(true)}
            onTouchEnd={() => setIsProductsHovered(false)}
          >
            {/* Botón Lateral Izquierdo (visible en pantallas medianas y grandes) */}
            <button
              type="button"
              onClick={() => scrollCarousel(productsScrollRef, 'left')}
              aria-label="Anterior producto"
              className="hidden sm:flex absolute -left-4 sm:-left-5 lg:-left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-[#0D3D20] text-[#0D3D20] hover:text-white shadow-xl border border-slate-200/90 items-center justify-center transition-all duration-200 cursor-pointer active:scale-95 backdrop-blur-md hover:scale-110"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
            </button>

            <div 
              ref={productsScrollRef}
              onScroll={() => handleScrollProgress(productsScrollRef, setActiveProductIndex)}
              tabIndex={0}
              aria-label="Carrusel de productos Pet Shop Gourmet"
              className="flex gap-5 sm:gap-6 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scroll-smooth focus:outline-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden px-1"
            >
              {PET_PRODUCTS.map((prod) => (
                <div
                  key={prod.id}
                  className="w-full min-w-full max-w-full snap-center sm:w-[280px] sm:min-w-[280px] sm:max-w-[280px] sm:snap-start bg-[#FAFBF7] rounded-[28px] overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group/prod hover:-translate-y-2 shrink-0"
                >
                  <div>
                    <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                      <Image
                        src={prod.image}
                        alt={prod.name}
                        fill
                        className="object-cover object-center group-hover/prod:scale-105 transition-transform duration-500"
                        sizes="280px"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                      <div className="absolute top-2.5 left-2.5 flex items-center">
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-xs text-[#0D3D20] shadow-sm">
                          {prod.category}
                        </span>
                      </div>

                      <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 text-amber-300 text-[10px] font-bold drop-shadow-sm">
                        <Star className="w-3 h-3 fill-amber-400 stroke-amber-400" />
                        <span>{prod.rating}</span>
                      </div>
                    </div>

                    <div className="p-4 sm:p-5 space-y-1.5">
                      <span className="text-[10px] font-bold text-[#1A6B38] uppercase tracking-wider block">
                        {prod.brand}
                      </span>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover/prod:text-[#1A6B38] transition-colors line-clamp-2 leading-snug">
                        {prod.name}
                      </h3>
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 pt-2 border-t border-slate-200/70 flex items-center justify-between gap-2">
                    <div>
                      <span className="text-[9px] text-slate-400 block font-medium">Precio:</span>
                      <span className="text-sm sm:text-base font-black text-[#0D3D20]">
                        {formatUSD(prod.price)}
                      </span>
                    </div>

                    <a
                      href={buildWhatsAppUrl(`Cotizar Producto: ${prod.name}`, `(Precio de referencia: ${formatUSD(prod.price)})`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#0D3D20] hover:bg-[#1A6B38] text-white text-xs font-bold transition-all shadow-xs hover:scale-105 active:scale-95 cursor-pointer"
                      title={`Cotizar ${prod.name} por WhatsApp`}
                    >
                      <WhatsAppOfficialIcon className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Cotizar</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Botón Lateral Derecho (visible en pantallas medianas y grandes) */}
            <button
              type="button"
              onClick={() => scrollCarousel(productsScrollRef, 'right')}
              aria-label="Siguiente producto"
              className="hidden sm:flex absolute -right-4 sm:-right-5 lg:-right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-[#0D3D20] text-[#0D3D20] hover:text-white shadow-xl border border-slate-200/90 items-center justify-center transition-all duration-200 cursor-pointer active:scale-95 backdrop-blur-md hover:scale-110"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
            </button>

            {/* Controles Inferiores: Flechas en Móvil + Indicadores de Reproducción / Dots */}
            <div className="flex items-center justify-between sm:justify-center gap-3 pt-4 px-2">
              {/* Flecha Anterior (solo móvil para no tapar las cards) */}
              <button
                type="button"
                onClick={() => scrollCarousel(productsScrollRef, 'left')}
                aria-label="Anterior producto"
                className="sm:hidden w-8 h-8 rounded-full bg-white border border-slate-200 shadow-xs flex items-center justify-center text-[#0D3D20] active:scale-95 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" strokeWidth={2.5} />
              </button>

              {/* Dots */}
              <div className="flex items-center gap-1.5">
                {PET_PRODUCTS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      if (productsScrollRef.current) {
                        const container = productsScrollRef.current;
                        const firstCard = container.querySelector(':scope > div') as HTMLElement | null;
                        const secondCard = firstCard?.nextElementSibling as HTMLElement | null;
                        const step = (firstCard && secondCard)
                          ? (secondCard.offsetLeft - firstCard.offsetLeft)
                          : (firstCard ? firstCard.offsetWidth + 20 : 304);
                        container.scrollTo({ left: idx * step, behavior: 'smooth' });
                      }
                    }}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      idx === activeProductIndex ? 'w-7 bg-[#1A6B38]' : 'w-2 bg-slate-300 hover:bg-slate-400'
                    }`}
                    aria-label={`Ir al producto ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Flecha Siguiente (solo móvil para no tapar las cards) */}
              <button
                type="button"
                onClick={() => scrollCarousel(productsScrollRef, 'right')}
                aria-label="Siguiente producto"
                className="sm:hidden w-8 h-8 rounded-full bg-white border border-slate-200 shadow-xs flex items-center justify-center text-[#0D3D20] active:scale-95 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
              </button>
            </div>
          </motion.div>

        </div>
      </section>

      {/* =========================================================================
          BLOQUE 5: RESERVA DE CONSULTAS & CUIDADO INTEGRAL (Orden 5 - #citas)
          ========================================================================= */}
      <section className="pt-6 pb-4 sm:py-9 bg-[#FAFBF7] relative overflow-hidden">
        {/* Ambient Lighting */}
        <div className="absolute top-10 left-1/3 w-96 h-96 bg-emerald-100/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-5 right-10 w-80 h-80 bg-orange-100/30 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8 relative z-10">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55 }}
            className="space-y-2.5 text-center max-w-3xl mx-auto"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0D3D20] tracking-tight leading-tight">
              Reserva de Consultas &amp; <span className="text-[#E05A47] font-extrabold">Cuidado Integral</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Card 1: Agendamiento en Línea */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="p-7 sm:p-8 rounded-[32px] bg-white border border-slate-200/90 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6 hover:-translate-y-2 group"
            >
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900 leading-snug group-hover:text-[#0D3D20] transition-colors">
                  Agenda tu Consulta Médica
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Elige especialidad y horario para tu mascota.
                </p>

                {/* Benefits Checklist */}
                <div className="pt-2 space-y-2 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Atención personalizada</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Historia clínica digital</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Recordatorio por WhatsApp</span>
                  </div>
                </div>
              </div>

              <a
                href="#citas"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('citas', 'agendar');
                }}
                className="w-full py-3.5 px-5 rounded-full bg-[#E05A47] hover:bg-[#cc4836] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-[#E05A47]/20 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 cursor-pointer"
              >
                <span>Agendar en Sistema</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>

            {/* Card 2: Calculadora WSAVA */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="p-7 sm:p-8 rounded-[32px] bg-gradient-to-br from-emerald-50/90 to-teal-50/50 border border-emerald-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6 hover:-translate-y-2 group"
            >
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-[#0D3D20] leading-snug">
                  Calculadora Nutricional
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Calcula la porción y calorías según su peso.
                </p>

                {/* Benefits Checklist */}
                <div className="pt-2 space-y-2 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>Calorías diarias recomendadas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>Porción exacta en gramos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>Para cachorros y adultos</span>
                  </div>
                </div>
              </div>

              <a
                href="#citas"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('citas', 'calculadora-nutricional');
                }}
                className="w-full py-3.5 px-5 rounded-full bg-white hover:bg-slate-50 border border-emerald-300 text-[#0D3D20] font-bold text-xs uppercase tracking-wider transition-all shadow-xs flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 cursor-pointer"
              >
                <span>Calcular Nutrición Gratis</span>
                <ArrowRight className="w-4 h-4 text-emerald-600" />
              </a>
            </motion.div>

            {/* Card 3: Protocolos Fear-Free™ en Consulta */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="p-7 sm:p-8 rounded-[32px] bg-white border border-slate-200/90 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6 hover:-translate-y-2 group"
            >
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900 leading-snug group-hover:text-[#0D3D20] transition-colors">
                  Entorno Amable &amp; Sin Estrés
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Espacios adaptados para una visita tranquila.
                </p>

                {/* Benefits Checklist */}
                <div className="pt-2 space-y-2 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Salas de espera separadas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Feromonas calmantes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Manejo libre de estrés</span>
                  </div>
                </div>
              </div>

              <a
                href="#nosotros"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('nosotros');
                }}
                className="w-full py-3.5 px-5 rounded-full bg-[#1A6B38] hover:bg-[#14532D] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xs flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 cursor-pointer"
              >
                <span>Conocer Protocolos</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </div>

        </div>
      </section>

    </div>
  );
}
