'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Award, Stethoscope, Microscope, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { buildWhatsAppUrl } from '@/lib/utils';

export function AboutSection({ onNavigateToBooking }: { onNavigateToBooking?: () => void }) {
  const doctors = [
    {
      name: 'Dra. Valentina Morales, DVM',
      role: 'Directora Médica & Cirugía Especializada',
      bio: 'Especialista en cirugía ortopédica y traumatología avanzada con más de 12 años liderando intervenciones de alta complejidad.',
      image: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&w=800&q=80',
      badge: 'Jefa de Cirugía Avanzada'
    },
    {
      name: 'Dr. Carlos Mendoza, MSc',
      role: 'Cardiología & Cuidados Críticos UCI',
      bio: 'Magíster en Medicina Interna y Cardiología de pequeños animales. Certificado en ecocardiografía Doppler 3D avanzada.',
      image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=800&q=80',
      badge: 'Unidad Cuidados Intensivos'
    },
    {
      name: 'Dra. Sofía Rueda',
      role: 'Nutrición Clínica & Medicina Felina',
      bio: 'Pionera en dietoterapia biológica personalizada y protocolos libres de estrés (Fear Free Certified) para felinos y exóticos.',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80',
      badge: 'Fear Free Certified'
    }
  ];

  return (
    <div className="w-full">
            {/* 1. TOP HERO BANNER with Photographic Canvas & Modern Transition */}
      <section className="relative w-full min-h-[480px] sm:min-h-[520px] pt-32 sm:pt-36 pb-16 flex flex-col justify-center overflow-hidden bg-[#0D3D20] text-white">
        {/* Modern Photographic Canvas with Seamless Transition */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[58%] h-full">
            <Image
              src="https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&w=1600&q=85"
              alt="Instalaciones quirúrgicas y equipo médico VetCare"
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 60vw"
              referrerPolicy="no-referrer"
            />
            {/* Smooth Horizontal Gradient Transition */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0D3D20] via-[#0D3D20]/75 via-25% to-transparent hidden lg:block" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D3D20] via-[#0D3D20]/80 via-40% to-transparent lg:hidden" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0D3D20]/70 via-transparent to-[#0D3D20]/90" />
          </div>

          <div className="absolute left-0 top-0 bottom-0 w-full lg:w-[45%] bg-[#0D3D20]" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl lg:max-w-3xl space-y-4 text-left"
            >
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight drop-shadow-sm">
                Hospital Clínico &amp; <span className="text-emerald-400">Medicina Veterinaria</span> de Vanguardia
              </h1>

              <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed font-normal max-w-2xl">
                Más de 15 años dedicados a la excelencia médica animal, combinando tecnología quirúrgica de última generación con un trato compasivo, ético y sin estrés (Fear-Free™).
              </p>
            </motion.div>
        </div>
      </section>

      {/* 2. ABOUT US SECTION WITH ARCHED PET PHOTOS (Direct PetFood Inspiration) */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: Narrative */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 space-y-6"
            >
              <div>
                <span className="text-xs font-bold text-[#1A6B38] uppercase tracking-wider">
                  Nuestra Trayectoria &amp; Filosofía
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0D3D20] mt-1 leading-tight">
                  Más de una década elevando el estándar de la salud animal
                </h2>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">
                Combinamos equipamiento hospitalario de última generación con un enfoque compasivo centrado en la tranquilidad del tutor y el paciente. Desde cirugías ortopédicas de alta complejidad hasta planes nutricionales gourmet personalizados, cada intervención está sustentada en medicina basada en evidencia.
              </p>

              <div className="space-y-2.5 text-xs text-slate-700 font-semibold">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1A6B38]" />
                  <span>Quirófano estéril con flujo laminar de presión positiva</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1A6B38]" />
                  <span>Manejo libre de estrés y miedo (Fear-Free™ Certified)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1A6B38]" />
                  <span>Laboratorio hematológico automatizado en 15 minutos</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onNavigateToBooking}
                  className="px-6 py-3.5 rounded-full bg-[#1A6B38] hover:bg-[#14532D] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm hover:scale-105 cursor-pointer flex items-center gap-2"
                >
                  <span>Conocer al Equipo Médico</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>

            {/* Right: 3 Arched Visual Cards (PetFood Reference Look) */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 grid grid-cols-3 gap-3 sm:gap-4"
            >
              
              {/* Arched Card 1: Cute Puppy */}
              <div className="relative h-64 sm:h-80 rounded-[40px] overflow-hidden shadow-lg border-2 border-emerald-100">
                <Image
                  src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=600&q=80"
                  alt="Cachorro en chequeo veterinario"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 30vw, 20vw"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Arched Card 2: Caring Doctor with Golden Retriever */}
              <div className="relative h-64 sm:h-80 rounded-[40px] overflow-hidden shadow-lg border-2 border-emerald-100 group">
                <Image
                  src="https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=800&q=80"
                  alt="Doctora veterinaria en consulta de precisión con paciente"
                  fill
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 30vw, 20vw"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D3D20]/90 via-[#0D3D20]/30 to-transparent flex flex-col justify-end p-4 text-center text-white">
                  <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider font-mono block">
                    Quirófano &amp; Precisión
                  </span>
                  <h4 className="text-xs sm:text-sm font-extrabold text-white leading-tight mt-0.5">
                    Medicina de Precisión
                  </h4>
                  <p className="text-[10px] text-emerald-100/90 leading-tight mt-1 hidden sm:block">
                    Monitoreo anestésico continuo y cirugía guiada
                  </p>
                </div>
              </div>

              {/* Arched Card 3: Fluffy Happy Dog */}
              <div className="relative h-64 sm:h-80 rounded-[40px] overflow-hidden shadow-lg border-2 border-emerald-100">
                <Image
                  src="https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=600&q=80"
                  alt="Perro alegre tras consulta médica"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 30vw, 20vw"
                  referrerPolicy="no-referrer"
                />
              </div>

            </motion.div>

          </div>

        </div>
      </section>

      {/* 3. DOCTORS / SPECIALISTS (Clean Open Cards, NO Box-in-Box) */}
      <section className="py-16 bg-[#FAFBF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto space-y-2"
          >
            <span className="text-xs font-bold text-[#1A6B38] uppercase tracking-wider">Especialistas</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0D3D20]">
              Cuerpo Médico en Turno
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Formación continua en centros de referencia de Estados Unidos y Europa.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {doctors.map((doc, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md border border-slate-200/80 transition-all group hover:-translate-y-1"
              >
                <div className="relative h-60 w-full overflow-hidden bg-slate-100">
                  <Image
                    src={doc.image}
                    alt={doc.name}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#0D3D20]/90 text-white text-[10px] font-bold shadow-sm">
                    {doc.badge}
                  </div>
                </div>

                <div className="p-6 space-y-2">
                  <h4 className="text-base font-bold text-slate-900">{doc.name}</h4>
                  <p className="text-xs font-semibold text-[#1A6B38]">{doc.role}</p>
                  <p className="text-xs text-slate-500 leading-relaxed">{doc.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Direct CTA to Book with Specialists */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55 }}
            className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-[#0D3D20] text-white shadow-md"
          >
            <div>
              <h4 className="text-base font-bold">¿Deseas una consulta con nuestro equipo médico?</h4>
              <p className="text-xs text-emerald-200/80">Agenda con anticipación o acude a nuestro triage de urgencias disponible las 24 horas.</p>
            </div>
            <a
              href="#citas"
              onClick={(e) => {
                e.preventDefault();
                onNavigateToBooking?.();
              }}
              className="px-6 py-3 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer shrink-0 flex items-center gap-2"
            >
              <span>Agendar Consulta</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

        </div>
      </section>
    </div>
  );
}
