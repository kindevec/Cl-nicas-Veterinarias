'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ShieldCheck, Award, HeartPulse, Stethoscope, Microscope, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { buildWhatsAppUrl } from '@/lib/utils';

export function AboutSection({ onNavigateToBooking }: { onNavigateToBooking?: () => void }) {
  const doctors = [
    {
      name: 'Dra. Valentina Morales, DVM',
      role: 'Directora Médica & Cirugía Especializada',
      bio: 'Especialista en cirugía ortopédica y traumatología AOVET con más de 12 años liderando intervenciones de alta complejidad.',
      image: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&w=800&q=80',
      badge: 'Jefa de Quirófano AOVET'
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

  const milestones = [
    { number: '+18,500', label: 'Pacientes Tratados', desc: 'Atención médica integral con historias clínicas digitales centralizadas.' },
    { number: '99.4%', label: 'Éxito Quirúrgico', desc: 'Monitoreo multiparamétrico continuo y anestesia balanceada de última generación.' },
    { number: '24/7/365', label: 'Disponibilidad Continua', desc: 'Equipo médico de guardia presencial permanente para emergencias críticas.' },
    { number: '100%', label: 'Garantía Fear-Free™', desc: 'Protocolos amigables que priorizan la reducción absoluta del dolor y estrés.' }
  ];

  const facilities = [
    {
      title: 'Quirófano de Presión Positiva ISO 8',
      desc: 'Área estéril con flujo de aire laminar continuo, torre de laparoscopia y anestesia inhalatoria de grado humano.',
      icon: HeartPulse,
      img: 'https://images.unsplash.com/photo-1583912267670-6575ad4736e4?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Laboratorio de Diagnóstico In Situ IDEXX',
      desc: 'Resultados precisos de hemogramas, bioquímica sanguínea, electrolitos y gases en menos de 15 minutos.',
      icon: Microscope,
      img: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Hospitalización Separada Canina/Felina',
      desc: 'Salas independientes Cat-Friendly con control térmico, música bioacústica relajante y difusores de feromonas calmantes.',
      icon: Stethoscope,
      img: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=800&q=80'
    }
  ];

  return (
    <div className="relative w-full py-16 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-20">
        
        {/* Header editorial */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-[#1A6B38] text-xs font-bold uppercase tracking-wider shadow-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>NUESTRA INSTITUCIÓN &amp; INFRAESTRUCTURA</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0D3D20] tracking-tight">
            Ciencia médica de vanguardia con{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1A6B38] to-[#059669]">
              vocación inquebrantable
            </span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Fundada con la convicción de que las mascotas merecen el mismo rigor clínico, empatía e infraestructura de vanguardia que la medicina humana de alta gama.
          </p>
        </div>

        {/* Bento grid: Historia & Valores (Luminous Pure White Cards) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 rounded-3xl bg-white border border-slate-200/90 p-8 sm:p-10 shadow-md flex flex-col justify-between"
          >
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#1A6B38] shadow-sm">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0D3D20]">
                Más de una década elevando el estándar médico veterinario en la región
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Nuestra clínica combina equipamiento hospitalario de última generación con un enfoque compasivo centrado en la tranquilidad del tutor y el paciente. Desde cirugías traumatológicas AOVET hasta planes nutricionales gourmet personalizados, cada intervención está sustentada en medicina basada en evidencia.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                <div className="flex items-center gap-2.5 text-slate-700 text-xs sm:text-sm font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Monitoreo multiparamétrico continuo</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-700 text-xs sm:text-sm font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Protocolos libres de estrés Fear Free™</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-700 text-xs sm:text-sm font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Laboratorio hematológico en 15 min</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-700 text-xs sm:text-sm font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Farmacia y dietas de prescripción</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-5 rounded-3xl bg-gradient-to-br from-[#0D3D20] via-[#1A6B38] to-[#0D3D20] text-white p-8 sm:p-10 shadow-xl flex flex-col justify-between relative overflow-hidden"
          >
            <div className="space-y-6 relative z-10">
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider font-mono">
                Compromiso Institucional
              </span>
              <h4 className="text-2xl font-black leading-snug">
                Atención médica digna, transparente y con calor humano.
              </h4>
              <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed opacity-95">
                Sabemos que tu mascota es parte de tu hogar. Por eso, te entregamos informes ecográficos y quirúrgicos detallados en cada consulta, con línea directa con el veterinario a cargo.
              </p>
            </div>

            <div className="pt-6 border-t border-white/15 relative z-10 flex items-center justify-between">
              <div>
                <span className="text-xs text-emerald-200 block">Sede Central Matriz</span>
                <span className="text-sm font-bold text-white">Edif. Titanium Plaza, Quito</span>
              </div>
              <a
                href={buildWhatsAppUrl('Consulta sobre instalaciones y visitas')}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-white text-[#0D3D20] text-xs font-bold shadow-md hover:bg-emerald-50 transition-colors"
              >
                Conocer la Clínica
              </a>
            </div>
          </motion.div>
        </div>

        {/* Milestones Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {milestones.map((m, idx) => (
            <div key={idx} className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm text-center space-y-1.5 hover:shadow-md transition-shadow">
              <div className="text-2xl sm:text-3xl font-black text-[#1A6B38] font-sans">{m.number}</div>
              <div className="text-xs sm:text-sm font-bold text-slate-900">{m.label}</div>
              <p className="text-[11px] text-slate-500 leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>

        {/* Instalaciones & Tecnología Hospitalaria */}
        <div className="space-y-8">
          <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Espacios Hospitalarios</span>
              <h3 className="text-2xl sm:text-3xl font-black text-[#0D3D20] mt-1">Infraestructura Diseñada para Salvar Vidas</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md">
              Áreas climatizadas e independientes para evitar contaminación cruzada y reducir el estrés sensorial.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {facilities.map((f, idx) => {
              const Icon = f.icon;
              return (
                <div key={idx} className="rounded-3xl bg-white border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all duration-300 group">
                  <div className="relative h-56 w-full overflow-hidden">
                    <Image
                      src={f.img}
                      alt={f.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4 p-2.5 rounded-2xl bg-white/90 backdrop-blur-md shadow-md text-[#1A6B38]">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="p-6 space-y-2">
                    <h4 className="text-base font-bold text-slate-900 leading-snug">{f.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed font-normal">{f.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Especialistas Médicos */}
        <div className="space-y-8">
          <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Cuerpo Médico</span>
              <h3 className="text-2xl sm:text-3xl font-black text-[#0D3D20] mt-1">Directores y Especialistas en Turno</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md">
              Formación continua en centros de referencia de Estados Unidos y Europa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {doctors.map((doc, idx) => (
              <div key={idx} className="rounded-3xl bg-white border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all duration-300 group">
                <div className="relative h-64 w-full overflow-hidden bg-slate-100">
                  <Image
                    src={doc.image}
                    alt={doc.name}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-emerald-900/80 backdrop-blur-md text-white text-[10px] font-bold shadow-md">
                    {doc.badge}
                  </div>
                </div>
                <div className="p-6 space-y-2">
                  <h4 className="text-base font-bold text-slate-900">{doc.name}</h4>
                  <p className="text-xs font-semibold text-[#1A6B38]">{doc.role}</p>
                  <p className="text-xs text-slate-500 leading-relaxed font-normal">{doc.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-emerald-50 via-teal-50/40 to-white border border-emerald-200 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold text-[#1A6B38] uppercase tracking-wider">Atención Médica Inmediata</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0D3D20]">¿Tu mascota requiere evaluación médica o cirugía?</h3>
            <p className="text-slate-600 text-xs sm:text-sm max-w-xl leading-relaxed">
              Agenda tu turno con un especialista o comunícate con nuestro equipo de triage quirúrgico 24 horas.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            {onNavigateToBooking ? (
              <button
                type="button"
                onClick={onNavigateToBooking}
                className="px-6 py-3.5 rounded-full bg-[#1A6B38] hover:bg-[#14532D] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:scale-105 cursor-pointer flex items-center gap-2"
              >
                <span>Agendar Cita en Clínica</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <a
                href="#citas"
                className="px-6 py-3.5 rounded-full bg-[#1A6B38] hover:bg-[#14532D] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:scale-105 flex items-center gap-2"
              >
                <span>Agendar Cita en Clínica</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
