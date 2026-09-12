'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { 
  Award, 
  Stethoscope, 
  Microscope, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  HeartHandshake,
  Activity,
  Clock,
  Heart,
  FileText,
  Shield,
  Zap
} from 'lucide-react';

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
        {/* Modern Photographic Canvas with Seamless Transition (Zero Dividing Lines) */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {/* Full-bleed Image Layer */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&w=1600&q=85"
              alt="Instalaciones quirúrgicas y equipo médico VetCare"
              fill
              priority
              className="object-cover object-center lg:object-right"
              sizes="100vw"
              referrerPolicy="no-referrer"
            />
            {/* Silky Smooth Horizontal Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0D3D20] from-25% via-[#0D3D20] via-40% via-[#0D3D20]/60 via-65% to-transparent hidden lg:block" />
            {/* Vertical Gradient for Mobile Devices */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D3D20] from-40% via-[#0D3D20]/80 via-70% to-transparent lg:hidden" />
            {/* Subtle Top & Bottom Cinematic Vignette */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0D3D20]/60 via-transparent to-[#0D3D20]/80" />
          </div>

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

        {/* Non-linear organic wave transition into white section */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none z-10 text-white">
          <svg className="relative block w-full h-5 sm:h-8" viewBox="0 0 1200 40" preserveAspectRatio="none">
            <path d="M0,15 C300,35 600,-5 900,22 C1050,32 1150,10 1200,18 L1200,40 L0,40 Z" fill="currentColor"></path>
          </svg>
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
                className="bg-white rounded-[36px_16px_36px_16px] overflow-hidden shadow-xs hover:shadow-xl border border-slate-200/80 transition-all group hover:-translate-y-1 relative"
              >
                <div className="relative h-60 w-full overflow-hidden bg-slate-100 rounded-t-[32px]">
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

      {/* 4. INFRAESTRUCTURA & INSTALACIONES HOSPITALARIAS DE ALTA COMPLEJIDAD */}
      <section className="py-12 sm:py-16 bg-white border-t border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
            className="space-y-1 text-center max-w-3xl mx-auto"
          >
            <span className="text-xs font-bold text-[#1A6B38] uppercase tracking-wider font-mono">
              01 / INFRAESTRUCTURA QUIRÚRGICA &amp; HOSPITALARIA
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0D3D20]">
              Tecnología Médica Diseñada para Salvar Vidas
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Instalaciones especializadas con flujo laminar estéril, monitoreo hemodinámico continuo y áreas libres de estrés.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {/* Card 1: Quirófano */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="bg-[#FAFBF7] rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-lg transition-all group flex flex-col justify-between hover:-translate-y-1"
            >
              <div>
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <Image
                    src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80"
                    alt="Quirófano estéril con flujo laminar VetCare"
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 25vw"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-[#0D3D20]/90 text-white text-[10px] font-bold">
                    Estéril Clase 10,000
                  </div>
                </div>
                <div className="p-5 space-y-2">
                  <h4 className="text-base font-bold text-slate-900 leading-snug group-hover:text-[#1A6B38] transition-colors">
                    Quirófano de Presión Positiva
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Flujo de aire estéril laminar que previene infecciones intrahospitalarias. Anestesia inhalatoria con Sevoflurano y electrobisturí bipolar.
                  </p>
                </div>
              </div>
              <div className="p-5 pt-0 border-t border-slate-200/60 mt-2 flex items-center gap-1.5 text-[11px] font-semibold text-[#1A6B38]">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>Monitoreo Multiparamétrico Mindray</span>
              </div>
            </motion.div>

            {/* Card 2: UCI */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-[#FAFBF7] rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-lg transition-all group flex flex-col justify-between hover:-translate-y-1"
            >
              <div>
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <Image
                    src="https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=800&q=80"
                    alt="Unidad de Cuidados Intensivos UCI veterinaria"
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 25vw"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                    Guardia 24/7
                  </div>
                </div>
                <div className="p-5 space-y-2">
                  <h4 className="text-base font-bold text-slate-900 leading-snug group-hover:text-[#1A6B38] transition-colors">
                    Unidad de Terapia Intensiva (UCI)
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Incubadoras de oxigenoterapia con control de temperatura, bombas de infusión volumétrica y soporte hemodinámico crítico continuo.
                  </p>
                </div>
              </div>
              <div className="p-5 pt-0 border-t border-slate-200/60 mt-2 flex items-center gap-1.5 text-[11px] font-semibold text-[#1A6B38]">
                <Clock className="w-3.5 h-3.5 shrink-0" />
                <span>Atención Médica Nocturna Activa</span>
              </div>
            </motion.div>

            {/* Card 3: Laboratorio IDEXX */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="bg-[#FAFBF7] rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-lg transition-all group flex flex-col justify-between hover:-translate-y-1"
            >
              <div>
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <Image
                    src="https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80"
                    alt="Laboratorio automatizado IDEXX"
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 25vw"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-[#1A6B38] text-white text-[10px] font-bold">
                    In-House 15 Min
                  </div>
                </div>
                <div className="p-5 space-y-2">
                  <h4 className="text-base font-bold text-slate-900 leading-snug group-hover:text-[#1A6B38] transition-colors">
                    Laboratorio Clínico IDEXX
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Bioquímica sérica integral, hemograma automatizado por impedancia y citología diagnóstica inmediata sin necesidad de enviar muestras fuera.
                  </p>
                </div>
              </div>
              <div className="p-5 pt-0 border-t border-slate-200/60 mt-2 flex items-center gap-1.5 text-[11px] font-semibold text-[#1A6B38]">
                <Microscope className="w-3.5 h-3.5 shrink-0" />
                <span>Resultados en Tiempo Real</span>
              </div>
            </motion.div>

            {/* Card 4: Área Felina */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-[#FAFBF7] rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-lg transition-all group flex flex-col justify-between hover:-translate-y-1"
            >
              <div>
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <Image
                    src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80"
                    alt="Área felina Cat-Friendly sin estrés"
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 25vw"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider">
                    ISFM Gold Certified
                  </div>
                </div>
                <div className="p-5 space-y-2">
                  <h4 className="text-base font-bold text-slate-900 leading-snug group-hover:text-[#1A6B38] transition-colors">
                    Espacio Felino Cat-Friendly
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Consultorio y hospitalización exclusivos 100% aislados de ladridos u olores caninos. Difusión permanente de feromonas apaciguantes Feliway®.
                  </p>
                </div>
              </div>
              <div className="p-5 pt-0 border-t border-slate-200/60 mt-2 flex items-center gap-1.5 text-[11px] font-semibold text-[#1A6B38]">
                <Heart className="w-3.5 h-3.5 shrink-0" />
                <span>Zero-Stress Felino Garantizado</span>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* 5. CERTIFICACIONES INTERNACIONALES & ESTÁNDARES */}
      <section className="py-12 sm:py-16 bg-[#FAFBF7] border-t border-slate-200/70 relative overflow-hidden">
        {/* Subtle decorative circles */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-50/60 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
            className="space-y-2 text-center max-w-3xl mx-auto"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/80 text-emerald-800 text-[10px] font-bold uppercase tracking-widest font-mono">
              <ShieldCheck className="w-3.5 h-3.5" />
              02 / Acreditaciones Oficiales
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0D3D20] tracking-tight">
              Avalados por Estándares de <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1A6B38] to-emerald-500">Referencia Mundial</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
              Certificaciones que garantizan el bienestar físico y emocional de tu compañero en cada etapa médica.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
            {[
              {
                icon: ShieldCheck,
                title: 'Fear-Free™ Certified',
                desc: 'Hospital certificado en manejo médico compasivo, reduciendo ansiedad, dolor y miedo en el paciente.',
                badge: 'Protocolo Anti-Estrés',
                image: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=400&q=80'
              },
              {
                icon: Award,
                title: 'ISFM Cat Friendly Gold',
                desc: 'Máxima acreditación de la International Society of Feline Medicine para infraestructura adaptada a gatos.',
                badge: 'Nivel Oro Felino',
                image: 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?auto=format&fit=crop&w=400&q=80'
              },
              {
                icon: Activity,
                title: 'Estándares Quirúrgicos AAHA',
                desc: 'Aplicación estricta de las directrices de la American Animal Hospital Association en analgesia y esterilidad.',
                badge: 'Norma Quirúrgica',
                image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=400&q=80'
              },
              {
                icon: HeartHandshake,
                title: 'Comité Nutricional WSAVA',
                desc: 'Evaluación y prescripción dietética formulada según el algoritmo biométrico oficial de la WSAVA.',
                badge: 'Nutrición Clínica',
                image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=400&q=80'
              }
            ].map((cert, idx) => {
              const Icon = cert.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="group relative bg-white rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-xl hover:border-emerald-200/80 transition-all duration-300 flex flex-col sm:flex-row overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/0 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  {/* Left side: Image Strip */}
                  <div className="relative h-48 sm:h-auto sm:w-32 lg:w-40 shrink-0 overflow-hidden">
                    <Image 
                      src={cert.image}
                      alt={cert.title}
                      fill
                      referrerPolicy="no-referrer"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 160px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent sm:bg-gradient-to-r sm:from-transparent sm:to-black/20" />
                  </div>

                  {/* Right side: Content */}
                  <div className="p-6 sm:p-7 flex flex-col justify-center flex-1 relative z-10">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100/50 text-[#1A6B38] flex items-center justify-center border border-emerald-100 shadow-inner group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-7 h-7" />
                      </div>
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/60 px-3 py-1 rounded-full border border-emerald-200/50 whitespace-nowrap">
                        {cert.badge}
                      </span>
                    </div>
                    
                    <h4 className="text-lg font-bold text-slate-900 leading-tight mb-2 group-hover:text-[#1A6B38] transition-colors">{cert.title}</h4>
                    <p className="text-sm text-slate-500 leading-relaxed mb-5">{cert.desc}</p>
                    
                    <div className="pt-4 border-t border-slate-100/80 flex items-center gap-1.5 text-xs font-semibold text-[#1A6B38] mt-auto">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>Verificado Activo 2026</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 6. LOS 4 PILARES MÉDICOS ÉTICOS DE VETCARE */}
      <section className="relative py-16 sm:py-24 overflow-hidden text-white">
        {/* Full bleed background image with dark overlay */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1600&q=80"
            alt="Stethoscope background"
            fill
            referrerPolicy="no-referrer"
            className="object-cover"
            sizes="100vw"
          />
          {/* Solid base + gradient for readability */}
          <div className="absolute inset-0 bg-[#0D3D20]/90 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0D3D20]/95 via-[#0D3D20]/80 to-[#0D3D20]/95" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
            className="space-y-3 text-center max-w-3xl mx-auto"
          >
            <span className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-emerald-300 text-xs font-bold uppercase tracking-widest font-mono backdrop-blur-md">
              <Sparkles className="w-4 h-4" />
              03 / Nuestro Compromiso Deontológico
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Los 4 Pilares Médicos de VetCare
            </h2>
            <p className="text-sm sm:text-base text-emerald-100/90 max-w-2xl mx-auto leading-relaxed">
              Principios inquebrantables que guían cada decisión clínica, cada cirugía y cada interacción con tu familia.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                num: '01',
                title: 'Medicina Basada en Evidencia',
                desc: 'Todo tratamiento está sustentado en analítica previa, imagenología y literatura veterinaria de consenso internacional.',
                icon: Microscope,
                bgImage: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=600&q=80'
              },
              {
                num: '02',
                title: 'Cero Tolerancia al Dolor',
                desc: 'Protocolos de analgesia multimodal preventiva y posquirúrgica. Ningún paciente sufre dolor evitable bajo nuestro cuidado.',
                icon: ShieldCheck,
                bgImage: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80'
              },
              {
                num: '03',
                title: 'Transparencia con el Tutor',
                desc: 'Explicación diagnóstica detallada, presupuestos claros antes de cada procedimiento e informes clínicos accesibles.',
                icon: FileText,
                bgImage: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&w=600&q=80'
              },
              {
                num: '04',
                title: 'Nutrición como Medicina',
                desc: 'Creemos en la dietoterapia biológica como el pilar fundamental para prevenir patologías y alargar la longevidad del animal.',
                icon: Heart,
                bgImage: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=600&q=80'
              }
            ].map((pilar, idx) => {
              const Icon = pilar.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="group relative h-full flex flex-col justify-end p-6 rounded-[2rem] overflow-hidden border border-white/10 hover:border-emerald-400/50 transition-all duration-500 shadow-2xl min-h-[320px]"
                >
                  {/* Background Image for Card */}
                  <div className="absolute inset-0">
                    <Image
                      src={pilar.bgImage}
                      alt={pilar.title}
                      fill
                      referrerPolicy="no-referrer"
                      className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-40 group-hover:opacity-60"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                    {/* Gradient Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#092B16] via-[#092B16]/80 to-transparent" />
                    <div className="absolute inset-0 bg-[#0D3D20]/40 group-hover:bg-[#0D3D20]/20 transition-colors duration-500" />
                  </div>

                  {/* Card Content */}
                  <div className="relative z-10 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-emerald-300 group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all duration-300">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-b from-amber-200/80 to-amber-500/40 font-mono tracking-tighter">
                        {pilar.num}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white leading-tight mb-2">
                        {pilar.title}
                      </h4>
                      <p className="text-sm text-emerald-50/80 leading-relaxed font-light">
                        {pilar.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

    </div>
  );
}
