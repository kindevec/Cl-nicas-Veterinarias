'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Award, HeartPulse, Stethoscope, Microscope, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
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
      {/* 1. TOP HERO BANNER with Full-Bleed Background (SmartLegal Standard) */}
      <section className="relative min-h-[380px] sm:min-h-[440px] pt-32 sm:pt-40 pb-16 flex flex-col justify-center overflow-hidden bg-[#0D3D20] text-white">
        
        {/* Full-Bleed Hospital Backdrop */}
        <div className="absolute inset-0 pointer-events-none opacity-25">
          <Image
            src="https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=2000&q=80"
            alt="Instalaciones quirúrgicas veterinarias VetCare"
            fill
            priority
            className="object-cover object-center"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Ambient Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D3D20] via-[#0D3D20]/90 to-[#0D3D20]/40" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl space-y-4"
          >
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Ciencia médica de vanguardia con{' '}
              <span className="text-emerald-400">vocación inquebrantable.</span>
            </h1>

            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed font-normal">
              Fundada con la convicción de que las mascotas merecen el mismo rigor clínico, empatía e infraestructura hospitalaria que la medicina humana de alta gama.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. ABOUT US SECTION WITH ARCHED PET PHOTOS (Direct PetFood Inspiration) */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Editorial Narrative */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-bold text-[#1A6B38] uppercase tracking-wider block font-mono">
                  Sobre Nosotros
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
            </div>

            {/* Right: 3 Arched Visual Cards (PetFood Reference Look) */}
            <div className="lg:col-span-7 grid grid-cols-3 gap-3 sm:gap-4">
              
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

              {/* Arched Card 2: Deep Green Benefit Card */}
              <div className="relative h-64 sm:h-80 rounded-[40px] bg-[#0D3D20] text-white p-4 sm:p-6 flex flex-col justify-between shadow-lg text-center">
                <div className="w-10 h-10 rounded-full bg-white/10 mx-auto flex items-center justify-center text-emerald-300">
                  <HeartPulse className="w-5 h-5" />
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                    Medicina de Precisión
                  </h4>
                  <p className="text-[10px] sm:text-xs text-emerald-200/90 leading-snug">
                    Cirugías guiadas por imagen y monitoreo anestésico continuo.
                  </p>
                </div>

                <div className="pt-2 border-t border-emerald-800/60 text-[10px] font-bold text-amber-300">
                  Quirófano Certificado
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

            </div>

          </div>

        </div>
      </section>

      {/* 3. DOCTORS / SPECIALISTS (Clean Open Cards, NO Box-in-Box) */}
      <section className="py-16 bg-[#FAFBF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-[#1A6B38] uppercase tracking-wider">Especialistas</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0D3D20]">
              Cuerpo Médico en Turno
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Formación continua en centros de referencia de Estados Unidos y Europa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {doctors.map((doc, idx) => (
              <div key={idx} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md border border-slate-200/80 transition-all">
                <div className="relative h-60 w-full overflow-hidden bg-slate-100">
                  <Image
                    src={doc.image}
                    alt={doc.name}
                    fill
                    className="object-cover object-top"
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
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}
