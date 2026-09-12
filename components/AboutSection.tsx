'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Award, HeartPulse, Stethoscope, Microscope, Sparkles, CheckCircle2 } from 'lucide-react';
import { buildWhatsAppUrl } from '@/lib/utils';

export function AboutSection({ onNavigateToBooking }: { onNavigateToBooking?: () => void }) {
  const doctors = [
    {
      name: 'Dra. Valentina Morales, DVM',
      role: 'Directora Médica & Cirugía Especializada',
      bio: 'Especialista en cirugía reconstructiva y traumatología veterinaria con más de 12 años liderando intervenciones de alta complejidad.',
      image: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&w=800&q=80',
      badge: 'Jefa de Quirófano'
    },
    {
      name: 'Dr. Carlos Mendoza, MSc',
      role: 'Cardiología & Cuidados Críticos',
      bio: 'Magíster en Medicina Interna y Cardiología de pequeños animales. Certificado en ecocardiografía Doppler avanzada.',
      image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=800&q=80',
      badge: 'Unidad de Cuidados Intensivos'
    },
    {
      name: 'Dra. Sofía Rueda',
      role: 'Nutrición Clínica & Medicina Felina',
      bio: 'Pionera en dietoterapia personalizada y protocolos libres de estrés (Fear Free Certified) para felinos y razas braquicéfalas.',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80',
      badge: 'Especialista Fear Free'
    }
  ];

  const milestones = [
    { number: '+14,800', label: 'Pacientes Tratados', desc: 'Atención médica integral con historias clínicas digitales centralizadas.' },
    { number: '99.4%', label: 'Éxito Quirúrgico', desc: 'Monitoreo multiparamétrico continuo y anestesia balanceada de última generación.' },
    { number: '24/7/365', label: 'Disponibilidad Continua', desc: 'Equipo médico de guardia presencial permanente para emergencias críticas.' },
    { number: '100%', label: 'Garantía de Bienestar', desc: 'Protocolos amigables que priorizan la reducción del dolor y estrés animal.' }
  ];

  const facilities = [
    {
      title: 'Quirófano de Presión Positiva',
      desc: 'Área estéril con flujo laminar, torre de laparoscopia y anestesia inhalatoria de grado humano.',
      icon: HeartPulse,
      img: 'https://images.unsplash.com/photo-1583912267670-6575ad4736e4?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Laboratorio de Diagnóstico In Situ',
      desc: 'Resultados de hemogramas, bioquímica y gases en sangre en menos de 15 minutos.',
      icon: Microscope,
      img: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Hospitalización Separada Canina/Felina',
      desc: 'Salas independientes con control térmico, música relajante y aromaterapia calmante.',
      icon: Stethoscope,
      img: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=800&q=80'
    }
  ];

  return (
    <div className="relative w-full py-16 md:py-24 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-20">
        {/* Header editorial */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Nuestra Institución & Filosofía</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Ciencia médica de vanguardia con <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">vocación inquebrantable</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Fundada con la convicción de que las mascotas merecen el mismo rigor clínico, empatía e infraestructura hospitalaria que la medicina humana.
          </p>
        </div>

        {/* Bento grid: Historia & Valores */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 rounded-3xl bg-slate-900/60 border border-white/10 p-8 sm:p-10 relative overflow-hidden backdrop-blur-xl flex flex-col justify-between"
          >
            <div className="space-y-6 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">Más de una década elevando el estándar médico veterinario</h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Nuestra clínica combina equipamiento médico hospitalario con un enfoque integral centrado en la tranquilidad del tutor y el paciente. Desde cirugías torácicas hasta planes nutricionales gourmet personalizados, cada tratamiento está sustentado en medicina basada en evidencia.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="flex items-center gap-2.5 text-slate-200 text-xs sm:text-sm font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Monitoreo 24/7 presencial</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-200 text-xs sm:text-sm font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Laboratorio computarizado</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-200 text-xs sm:text-sm font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Cirugía de mínima invasión</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-200 text-xs sm:text-sm font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Nutrición clínica biológica</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Imagen inmersiva destacada */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-5 rounded-3xl overflow-hidden border border-white/10 relative min-h-[340px] group"
          >
            <img 
              src="https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=1000&q=80" 
              alt="Instalaciones Veterinarias VetCare" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-white/10">
              <span className="text-xs text-emerald-400 font-semibold uppercase tracking-wider block">Certificación Internacional</span>
              <p className="text-white text-sm font-bold">Instalaciones acreditadas para cuidados críticos y cirugía mayor</p>
            </div>
          </motion.div>
        </div>

        {/* Métricas destacadas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {milestones.map((m, i) => (
            <div key={i} className="p-6 rounded-2xl bg-slate-900/40 border border-white/10 backdrop-blur-md text-center space-y-2 hover:border-emerald-500/40 transition-colors">
              <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                {m.number}
              </div>
              <div className="text-white text-sm font-bold">{m.label}</div>
              <p className="text-slate-400 text-xs leading-snug">{m.desc}</p>
            </div>
          ))}
        </div>

        {/* Equipo Médico Especializado */}
        <div className="space-y-8">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold text-white">Equipo Médico y Especialistas</h3>
            <p className="text-slate-400 text-sm">Profesionales con postgrados internacionales dedicados exclusivamente a la salud integral de tu mascota.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {doctors.map((doc, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="rounded-3xl bg-slate-900/50 border border-white/10 overflow-hidden backdrop-blur-xl hover:border-emerald-500/40 transition-all group flex flex-col justify-between"
              >
                <div className="h-64 overflow-hidden relative">
                  <img 
                    src={doc.image} 
                    alt={doc.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/15 text-emerald-400 font-semibold text-xs">
                    {doc.badge}
                  </span>
                </div>
                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <h4 className="text-lg font-bold text-white">{doc.name}</h4>
                    <p className="text-emerald-400 text-xs font-semibold">{doc.role}</p>
                    <p className="text-slate-300 text-xs leading-relaxed pt-2">{doc.bio}</p>
                  </div>
                  <a
                    href={buildWhatsAppUrl(`Consulta con ${doc.name}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 w-full py-2.5 px-4 rounded-xl bg-white/[0.04] hover:bg-emerald-500 hover:text-slate-950 text-slate-200 border border-white/10 hover:border-emerald-400 text-xs font-bold transition-all text-center block"
                  >
                    Contactar Especialista
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Infraestructura y Tecnología */}
        <div className="space-y-8">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold text-white">Instalaciones Hospitalarias de Nivel Clínico</h3>
            <p className="text-slate-400 text-sm">Espacios diseñados específicamente para esterilidad, seguridad y el confort de perros y gatos.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {facilities.map((fac, idx) => {
              const Icon = fac.icon;
              return (
                <div key={idx} className="rounded-3xl bg-slate-900/40 border border-white/10 overflow-hidden backdrop-blur-md group hover:border-emerald-500/30 transition-all">
                  <div className="h-44 overflow-hidden relative">
                    <img src={fac.img} alt={fac.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                  </div>
                  <div className="p-6 space-y-2">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h4 className="text-base font-bold text-white">{fac.title}</h4>
                    <p className="text-slate-300 text-xs leading-relaxed">{fac.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Banner hacia Citas */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-emerald-950/60 via-slate-900/80 to-teal-950/60 border border-emerald-500/30 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">¿Tu mascota necesita una evaluación médica?</h3>
            <p className="text-slate-300 text-sm">Agenda en línea o comunícate directamente con nuestro equipo de triage 24/7.</p>
          </div>
          <button
            onClick={onNavigateToBooking}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-sm transition-all shadow-xl shadow-emerald-500/20 active:scale-95 shrink-0 cursor-pointer"
          >
            Agendar Consulta Ahora
          </button>
        </div>
      </div>
    </div>
  );
}
