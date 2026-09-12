'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Stethoscope, 
  ShieldCheck, 
  HeartPulse, 
  Clock, 
  Sparkles, 
  MessageCircle, 
  Star, 
  Calendar, 
  CheckCircle2, 
  Award, 
  ShoppingBag,
  Calculator,
  Phone,
  ArrowUpRight
} from 'lucide-react';
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

  const scrollContainer = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full">
      
      {/* =========================================================================
          BLOQUE 1: LA CLÍNICA (Orden 1 después de Inicio - #nosotros)
          ========================================================================= */}
      <section className="py-8 sm:py-12 bg-white border-t border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
          
          {/* Header de la sección */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 border-b border-slate-200/70 pb-4 sm:pb-5"
          >
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#1A6B38] uppercase tracking-wider font-mono">
                01 / INFRAESTRUCTURA HOSPITALARIA &amp; ESPECIALISTAS
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0D3D20]">
                Conoce La Clínica VetCare
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
                Quirófano estéril con flujo laminar de presión positiva, unidad de cuidados intensivos continua y equipo médico certificado en centros de referencia.
              </p>
            </div>

            <a
              href="#nosotros"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('nosotros');
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-300 text-slate-800 text-xs font-bold uppercase tracking-wider transition-all shadow-xs hover:scale-105 cursor-pointer shrink-0"
            >
              <span>Explorar La Clínica</span>
              <ArrowRight className="w-4 h-4 text-[#1A6B38]" />
            </a>
          </motion.div>

          {/* Grid de 3 Especialistas Médicos Principales */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {LEADING_DOCTORS.map((doc, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="bg-[#FAFBF7] rounded-3xl overflow-hidden shadow-xs hover:shadow-lg border border-slate-200/80 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100">
                    <Image
                      src={doc.image}
                      alt={doc.name}
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#0D3D20]/90 text-white text-[10px] font-bold shadow-sm backdrop-blur-xs">
                      {doc.badge}
                    </div>
                  </div>

                  <div className="p-5 sm:p-6 space-y-2">
                    <h4 className="text-base font-bold text-slate-900 leading-snug group-hover:text-[#1A6B38] transition-colors">
                      {doc.name}
                    </h4>
                    <p className="text-xs font-semibold text-[#1A6B38]">{doc.role}</p>
                    <p className="text-xs text-slate-500 leading-relaxed pt-1">{doc.bio}</p>
                  </div>
                </div>

                <div className="p-5 sm:p-6 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between">
                  <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#1A6B38]" /> Fear-Free Certified
                  </span>
                  <a
                    href="#citas"
                    onClick={(e) => {
                      e.preventDefault();
                      onSelectServiceForBooking(`Consulta con ${doc.name}`);
                    }}
                    className="text-xs font-bold text-[#1A6B38] hover:text-[#14532D] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Agendar</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>


      {/* =========================================================================
          BLOQUE 2: ESPECIALIDADES MÉDICAS (Orden 2 - #servicios)
          ========================================================================= */}
      <section className="py-8 sm:py-12 bg-[#FAFBF7] border-t border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
          
          {/* Header con Enlace de Navegación */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6"
          >
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#1A6B38] uppercase tracking-wider font-mono">
                02 / UNIDADES QUIRÚRGICAS &amp; CLÍNICAS
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0D3D20]">
                Especialidades Destacadas
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
                Desliza para conocer los procedimientos de referencia disponibles en nuestra clínica.
              </p>
            </div>

            <a
              href="#servicios"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('servicios');
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1A6B38] hover:bg-[#14532D] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm hover:scale-105 cursor-pointer shrink-0"
            >
              <span>Ver Todas</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Carrusel Horizontal de Especialidades con Controles en los Costados */}
          <div className="relative group">
            {/* Botón Lateral Izquierdo */}
            <button
              type="button"
              onClick={() => scrollContainer(servicesScrollRef, 'left')}
              aria-label="Anterior especialidad"
              className="absolute left-1 sm:-left-4 lg:-left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-[#0D3D20] text-slate-700 hover:text-white shadow-xl border border-slate-200/90 flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95 backdrop-blur-md hover:scale-110"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
            </button>

            <div 
              ref={servicesScrollRef}
              tabIndex={0}
              aria-label="Carrusel de especialidades médicas"
              className="flex gap-5 sm:gap-6 overflow-x-auto pb-2 pt-1 snap-x snap-mandatory scroll-smooth focus:outline-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              {VETERINARY_SERVICES.map((svc) => (
                <div
                  key={svc.id}
                  className="min-w-[280px] sm:min-w-[340px] max-w-[340px] snap-start bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 shrink-0"
                >
                  <div>
                    <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                      {svc.image && (
                        <Image
                          src={svc.image}
                          alt={svc.name}
                          fill
                          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                          sizes="340px"
                          referrerPolicy="no-referrer"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                        <span className="text-[10px] font-extrabold px-3 py-1 rounded-full bg-white/95 backdrop-blur-xs text-[#0D3D20] shadow-sm">
                          {svc.category}
                        </span>
                        {svc.available247 && (
                          <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-red-500 text-white shadow-sm flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                            24/7
                          </span>
                        )}
                      </div>

                      <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px] text-white">
                        <span className="font-semibold truncate max-w-[200px] drop-shadow-xs">{svc.doctorInCharge}</span>
                        <span className="px-2 py-0.5 rounded-full bg-black/40 text-emerald-300 font-mono text-[10px] font-bold">
                          {svc.duration}
                        </span>
                      </div>
                    </div>

                    <div className="p-5 space-y-2">
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-[#1A6B38] transition-colors line-clamp-2 leading-snug">
                        {svc.name}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {svc.shortDescription}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-3 border-t border-slate-200/80 flex items-center justify-between">
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

            {/* Botón Lateral Derecho */}
            <button
              type="button"
              onClick={() => scrollContainer(servicesScrollRef, 'right')}
              aria-label="Siguiente especialidad"
              className="absolute right-1 sm:-right-4 lg:-right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-[#0D3D20] text-slate-700 hover:text-white shadow-xl border border-slate-200/90 flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95 backdrop-blur-md hover:scale-110"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
            </button>
          </div>

        </div>
      </section>


      {/* =========================================================================
          BLOQUE 3: PET SHOP GOURMET & NUTRICIÓN (Orden 3 - #petshop)
          ========================================================================= */}
      <section className="py-8 sm:py-12 bg-white border-t border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
          
          {/* Header con Enlace a Pet Shop */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6"
          >
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#1A6B38] uppercase tracking-wider font-mono">
                03 / PET SHOP GOURMET &amp; FARMACIA ESPECIALIZADA
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0D3D20]">
                Nutrición Clínica &amp; Productos Estrella
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
                Alimentos biológicos super premium, dietas veterinarias formuladas y nutracéuticos de grado hospitalario.
              </p>
            </div>

            <a
              href="#petshop"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('petshop');
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0D3D20] hover:bg-[#1A6B38] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm hover:scale-105 cursor-pointer shrink-0"
            >
              <span>Catálogo Gourmet</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Carrusel Horizontal de Productos con Controles en los Costados */}
          <div className="relative group">
            {/* Botón Lateral Izquierdo */}
            <button
              type="button"
              onClick={() => scrollContainer(productsScrollRef, 'left')}
              aria-label="Anterior producto"
              className="absolute left-1 sm:-left-4 lg:-left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-[#0D3D20] text-slate-700 hover:text-white shadow-xl border border-slate-200/90 flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95 backdrop-blur-md hover:scale-110"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
            </button>

            <div 
              ref={productsScrollRef}
              tabIndex={0}
              aria-label="Carrusel de productos Pet Shop Gourmet"
              className="flex gap-5 sm:gap-6 overflow-x-auto pb-2 pt-1 snap-x snap-mandatory scroll-smooth focus:outline-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              {PET_PRODUCTS.map((prod) => (
                <div
                  key={prod.id}
                  className="min-w-[240px] sm:min-w-[280px] max-w-[280px] snap-start bg-[#FAFBF7] rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 shrink-0"
                >
                  <div>
                    <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                      <Image
                        src={prod.image}
                        alt={prod.name}
                        fill
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        sizes="280px"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                      <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-xs text-[#0D3D20] shadow-sm">
                          {prod.category}
                        </span>
                        {prod.formulaVeterinaria && (
                          <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 uppercase tracking-wider shadow-sm">
                            Rx Médica
                          </span>
                        )}
                      </div>

                      <div className="absolute bottom-2 left-2.5 flex items-center gap-1 text-amber-300 text-[10px] font-bold drop-shadow-sm">
                        <Star className="w-3 h-3 fill-amber-400 stroke-amber-400" />
                        <span>{prod.rating}</span>
                      </div>
                    </div>

                    <div className="p-4 space-y-1.5">
                      <span className="text-[10px] font-bold text-[#1A6B38] uppercase tracking-wider block">
                        {prod.brand}
                      </span>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#1A6B38] transition-colors line-clamp-2 leading-snug">
                        {prod.name}
                      </h3>
                    </div>
                  </div>

                  <div className="p-4 pt-2 border-t border-slate-200/70 flex items-center justify-between gap-2">
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
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#0D3D20] hover:bg-[#1A6B38] text-white text-xs font-bold transition-all shadow-xs hover:scale-105 active:scale-95 cursor-pointer"
                      title={`Cotizar ${prod.name} por WhatsApp`}
                    >
                      <MessageCircle className="w-3 h-3 text-emerald-400" />
                      <span>Cotizar</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Botón Lateral Derecho */}
            <button
              type="button"
              onClick={() => scrollContainer(productsScrollRef, 'right')}
              aria-label="Siguiente producto"
              className="absolute right-1 sm:-right-4 lg:-right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-[#0D3D20] text-slate-700 hover:text-white shadow-xl border border-slate-200/90 flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95 backdrop-blur-md hover:scale-110"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
            </button>
          </div>

        </div>
      </section>


      {/* =========================================================================
          BLOQUE 4: CITAS & ACCESO RÁPIDO A URGENCIAS (Orden 4 - #citas)
          ========================================================================= */}
      <section className="py-8 sm:py-12 bg-[#FAFBF7] border-t border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
            className="space-y-1 text-center max-w-3xl mx-auto"
          >
            <span className="text-xs font-bold text-[#1A6B38] uppercase tracking-wider font-mono">
              04 / ATENCIÓN MÉDICA INMEDIATA &amp; CALCULADORA WSAVA
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0D3D20]">
              Reserva de Consultas &amp; Triage en Vivo
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Elige entre agendamiento programado, atención hospitalaria de emergencia 24 horas o el cálculo de requerimiento calórico de tu mascota.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6"
          >
            {/* Card 1: Urgencias 24/7 */}
            <div className="p-6 sm:p-7 rounded-3xl bg-[#0D3D20] text-white flex flex-col justify-between shadow-lg relative overflow-hidden space-y-5">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-400/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                  <span>URGENCIAS 24/7 EN VIVO</span>
                </div>
                <h3 className="text-xl font-black text-white leading-snug">
                  Triage Crítico Hospitalario
                </h3>
                <p className="text-xs text-emerald-100/80 leading-relaxed">
                  Ingreso prioritario para politraumatismos, emergencias respiratorias o descompensaciones agudas sin cita previa.
                </p>
              </div>

              <div className="pt-2 space-y-2">
                <a
                  href="https://wa.me/593991952889?text=Hola%20VetCare%2C%20tengo%20una%20URGENCIA%20M%C3%89DICA%20inmediata%20con%20mi%20mascota."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 hover:scale-[1.02] cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Guardia WhatsApp 24h</span>
                </a>
              </div>
            </div>

            {/* Card 2: Agendamiento en Línea */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#1A6B38] text-[10px] font-bold border border-emerald-200">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>TURNOS PROGRAMADOS</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 leading-snug">
                  Agenda tu Consulta Médica
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Selecciona la especie de tu mascota, la especialidad requerida y el horario que mejor se ajuste a tu rutina diaria.
                </p>
              </div>

              <a
                href="#citas"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('citas', 'agendar');
                }}
                className="w-full py-3 px-4 rounded-2xl bg-[#1A6B38] hover:bg-[#14532D] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xs flex items-center justify-center gap-2 hover:scale-[1.02] cursor-pointer"
              >
                <span>Agendar en Sistema</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Card 3: Calculadora WSAVA */}
            <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-emerald-50/80 to-teal-50/40 border border-emerald-200/80 shadow-xs flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-emerald-800 text-[10px] font-bold border border-emerald-200 shadow-xs">
                  <Calculator className="w-3.5 h-3.5 text-emerald-600" />
                  <span>ALGORITMO BIOMÉTRICO WSAVA</span>
                </div>
                <h3 className="text-xl font-bold text-[#0D3D20] leading-snug">
                  Calculadora Nutricional
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Obtén el cálculo exacto de calorías diarias (kcal) y raciones de alimento en gramos según peso y condición clínica.
                </p>
              </div>

              <a
                href="#citas"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('citas', 'calculadora-nutricional');
                }}
                className="w-full py-3 px-4 rounded-2xl bg-white hover:bg-slate-50 border border-emerald-300 text-[#0D3D20] font-bold text-xs uppercase tracking-wider transition-all shadow-xs flex items-center justify-center gap-2 hover:scale-[1.02] cursor-pointer"
              >
                <span>Calcular Nutrición</span>
                <ArrowRight className="w-4 h-4 text-emerald-600" />
              </a>
            </div>
          </motion.div>

        </div>
      </section>

    </div>
  );
}
