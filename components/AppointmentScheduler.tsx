'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, 
  Dog, 
  Cat, 
  Sparkles, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  AlertTriangle, 
  CheckCircle2, 
  Send, 
  Check, 
  ExternalLink, 
  ShieldCheck, 
  ArrowRight,
  Ambulance,
  HeartPulse
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PetType, Appointment } from '@/lib/types';
import { saveAppointment } from '@/lib/supabaseClient';
import { buildWhatsAppUrl } from '@/lib/utils';

interface AppointmentSchedulerProps {
  initialService?: string;
  onAppointmentCreated: (newApt: Appointment) => void;
}

const PET_OPTIONS: { type: PetType; label: string; icon: React.ElementType; sub: string }[] = [
  { type: 'perro', label: 'Canino (Perro)', icon: Dog, sub: 'Todas las razas' },
  { type: 'gato', label: 'Felino (Gato)', icon: Cat, sub: 'Protocolo Fear-Free' },
  { type: 'exotico', label: 'Exótico (Conejo/Hurón)', icon: Sparkles, sub: 'Medicina Especial' },
];

const SPECIALTIES = [
  'Urgencias & Cuidados Críticos 24/7',
  'Medicina General & Chequeo Preventivo',
  'Cirugía de Alta Complejidad & Traumatología',
  'Cardiología Veterinaria & Doppler',
  'Dermatología & Alergias Atópicas',
  'Gastroenterología & Nutrición Clínica',
  'Odontología Veterinaria & Profilaxis',
  'Vacunación Preventiva & Microchip ISO',
  'Grooming Médico & Spa Dermatológico',
];

const TIME_SLOTS = [
  '08:30 AM', '09:30 AM', '10:30 AM', '11:30 AM',
  '02:00 PM', '03:00 PM', '04:30 PM', '05:30 PM', '07:00 PM'
];

export function AppointmentScheduler({ initialService, onAppointmentCreated }: AppointmentSchedulerProps) {
  const [petType, setPetType] = useState<PetType>('perro');
  const [petName, setPetName] = useState('');
  const [petBreed, setPetBreed] = useState('');
  const [petAge, setPetAge] = useState('');
  const [petWeight, setPetWeight] = useState('');
  const [specialty, setSpecialty] = useState(initialService || SPECIALTIES[1]);
  
  // Date calculation: next 7 available dates
  const availableDates = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return {
      iso: d.toISOString().split('T')[0],
      dayName: d.toLocaleDateString('es-EC', { weekday: 'short' }),
      dayNumber: d.getDate(),
      month: d.toLocaleDateString('es-EC', { month: 'short' }),
    };
  });

  const [selectedDate, setSelectedDate] = useState(availableDates[0].iso);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(TIME_SLOTS[1]);
  const [tutorName, setTutorName] = useState('');
  const [tutorPhone, setTutorPhone] = useState('');
  const [tutorEmail, setTutorEmail] = useState('');
  const [reason, setReason] = useState('');
  const [isEmergency, setIsEmergency] = useState(false);
  const [requiresPetTaxi, setRequiresPetTaxi] = useState(false);

  const [confirmedAppointment, setConfirmedAppointment] = useState<Appointment | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!petName || !tutorName || !tutorPhone || !reason) {
      alert('Por favor completa los campos obligatorios (*).');
      return;
    }

    setIsSubmitting(true);
    const newApt = saveAppointment({
      petName,
      petType,
      petBreed: petBreed || 'Mestizo / Sin especificar',
      petAge: petAge || 'Adulto',
      petWeight: petWeight || 'No registrado',
      specialty,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      tutorName,
      tutorPhone,
      tutorEmail: tutorEmail || 'contacto@kindev.com',
      reason,
      isEmergency,
      requiresPetTaxi,
    });

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#1A6B38', '#10B981', '#F59E0B', '#FFFFFF'],
      });
    } catch {
      // ignore
    }

    onAppointmentCreated(newApt);
    setConfirmedAppointment(newApt);
    setIsSubmitting(false);
  };

  return (
    <section id="agendar" className="py-16 sm:py-24 bg-[#FAFBF7] relative overflow-hidden">
      {/* Soft Ambient Shapes on Canvas */}
      <div className="absolute top-10 right-0 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-amber-100/30 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Editorial Section Header directly on Canvas */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl space-y-3"
        >
          <span className="text-xs font-bold text-[#1A6B38] uppercase tracking-wider font-mono block">
            Atención Médica Inmediata &amp; Turnos Programados
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0D3D20] tracking-tight leading-tight">
            Agenda tu Consulta o Contáctanos en Vivo
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Estamos disponibles las 24 horas para urgencias críticas y consultas de especialidad médica en el sector financiero de Quito.
          </p>
        </motion.div>

        {/* 2-Column Creative Canvas: Hub de Contacto & Agendamiento Fluido (Zero Box-in-Box) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* LEFT COLUMN: Official Hospital Contact Hub & 24/7 Emergency Triage (5 cols) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-6"
          >
            
            {/* 1. Emergency Live Triage Banner Card (High-Impact Emerald) */}
            <div className="rounded-[32px] bg-[#0D3D20] text-white p-7 sm:p-9 shadow-xl relative overflow-hidden space-y-5">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-bold tracking-wide border border-emerald-400/30">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                  <span>TRIAGE DE URGENCIAS EN VIVO</span>
                </div>
                <HeartPulse className="w-5 h-5 text-emerald-400" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-black text-white leading-snug">
                  ¿Tu mascota presenta una emergencia crítica?
                </h3>
                <p className="text-xs text-emerald-100/80 leading-relaxed">
                  No esperes a completar el formulario. Comunícate directamente con la línea de guardia hospitalaria para ingreso prioritario sin demoras.
                </p>
              </div>

              <div className="pt-2 space-y-2.5">
                <a
                  href="https://wa.me/593991952889?text=Hola%20Kindev%20%2F%20VetCare%20Gourmet%2C%20tengo%20una%20URGENCIA%20M%C3%89DICA%20inmediata%20con%20mi%20mascota."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-5 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zm4.52 11.66c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.07-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.84-.86 2.05s.88 2.38 1 2.54c.12.17 1.73 2.64 4.2 3.7 2.46 1.07 2.46.71 2.91.67.45-.05 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.28z"/>
                  </svg>
                  <span>Contactar Guardia por WhatsApp</span>
                </a>

                <a
                  href="tel:+593991952889"
                  className="w-full py-3 px-5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer border border-white/15"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Llamada Telefónica Directa</span>
                </a>
              </div>
            </div>

            {/* 2. Physical Clinic Address & Access */}
            <div className="p-7 rounded-[28px] bg-white border border-slate-200/80 shadow-sm space-y-4">
              <div className="flex items-center gap-3 text-[#0D3D20]">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#1A6B38] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">Ubicación de la Clínica</h4>
                  <span className="text-xs text-slate-500 block">Acceso vehicular y peatonal seguro</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Av. República del Salvador y Naciones Unidas, Edificio Titanium Plaza, Planta Baja, Quito, Ecuador.
              </p>

              <div className="pt-1 flex items-center gap-3">
                <a
                  href="https://maps.google.com/?q=Titanium+Plaza+Quito"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all cursor-pointer"
                >
                  <span>Google Maps</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
                <a
                  href="https://waze.com/ul?q=Titanium+Plaza+Quito"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all cursor-pointer"
                >
                  <span>Waze</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </div>
            </div>

            {/* 3. Operational Schedules */}
            <div className="p-7 rounded-[28px] bg-white border border-slate-200/80 shadow-sm space-y-3.5">
              <div className="flex items-center gap-3 text-[#0D3D20]">
                <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">Horarios de Atención</h4>
                  <span className="text-xs text-slate-500 block">Soporte continuo sin interrupciones</span>
                </div>
              </div>

              <div className="space-y-2 text-xs divide-y divide-slate-100">
                <div className="flex justify-between pt-1">
                  <span className="text-slate-500">Urgencias Médicas &amp; UCI:</span>
                  <span className="font-bold text-[#1A6B38]">24 Horas / 365 Días</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-slate-500">Consultas de Especialidad:</span>
                  <span className="font-semibold text-slate-800">Lun a Sáb: 08:00 – 20:00</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-slate-500">Laboratorio IDEXX In-House:</span>
                  <span className="font-semibold text-slate-800">Resultados en 30 min</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-slate-500">Pet Shop Gourmet &amp; Farmacia:</span>
                  <span className="font-semibold text-slate-800">08:30 – 20:00</span>
                </div>
              </div>
            </div>

            {/* 4. Trust Assurance */}
            <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/60 flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-[#1A6B38] shrink-0" />
              <p className="text-xs text-[#0D3D20] font-medium leading-tight">
                Instalaciones certificadas por Agrocalidad y protocolos Fear-Free™ con áreas felinas independientes para evitar el estrés.
              </p>
            </div>

          </motion.div>

          {/* RIGHT COLUMN: Fluid Appointment Canvas (7 cols - Zero Box-in-Box) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <AnimatePresence mode="wait">
              {!confirmedAppointment ? (
                <form onSubmit={handleSubmit} className="space-y-8">
                  
                  {/* Step 1: Species Selector directly on canvas */}
                  <div className="space-y-3">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block font-mono">
                      1. Selecciona la Especie
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {PET_OPTIONS.map((opt) => {
                        const Icon = opt.icon;
                        const isSelected = petType === opt.type;
                        return (
                          <button
                            type="button"
                            key={opt.type}
                            onClick={() => setPetType(opt.type)}
                            className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                              isSelected
                                ? 'bg-[#0D3D20] text-white border-[#0D3D20] shadow-md scale-[1.02]'
                                : 'bg-white border-slate-200/90 text-slate-600 hover:bg-slate-50'
                            }`}
                          >
                            <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-white/20 text-white' : 'bg-emerald-50 text-[#1A6B38]'}`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <div>
                              <span className={`text-xs font-bold block ${isSelected ? 'text-white' : 'text-slate-900'}`}>{opt.label}</span>
                              <span className={`text-[11px] block ${isSelected ? 'text-emerald-200' : 'text-slate-500'}`}>{opt.sub}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 2: Patient Info */}
                  <div className="space-y-3">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block font-mono">
                      2. Datos del Paciente
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                      <div>
                        <label className="text-[11px] text-slate-500 block mb-1">Nombre Mascota *</label>
                        <input
                          type="text"
                          required
                          value={petName}
                          onChange={(e) => setPetName(e.target.value)}
                          placeholder="Ej: Max, Luna"
                          className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#1A6B38] focus:ring-1 focus:ring-[#1A6B38] transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-slate-500 block mb-1">Raza (Opcional)</label>
                        <input
                          type="text"
                          value={petBreed}
                          onChange={(e) => setPetBreed(e.target.value)}
                          placeholder="Ej: Mestizo, Golden"
                          className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#1A6B38] focus:ring-1 focus:ring-[#1A6B38] transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-slate-500 block mb-1">Edad Aprox.</label>
                        <input
                          type="text"
                          value={petAge}
                          onChange={(e) => setPetAge(e.target.value)}
                          placeholder="Ej: 3 años"
                          className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#1A6B38] focus:ring-1 focus:ring-[#1A6B38] transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-slate-500 block mb-1">Peso (kg aprox)</label>
                        <input
                          type="text"
                          value={petWeight}
                          onChange={(e) => setPetWeight(e.target.value)}
                          placeholder="Ej: 12 kg"
                          className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#1A6B38] focus:ring-1 focus:ring-[#1A6B38] transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Step 3: Medical Specialty */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block font-mono">
                      3. Especialidad Médica Requerida *
                    </span>
                    <select
                      value={specialty}
                      onChange={(e) => setSpecialty(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#1A6B38] focus:ring-1 focus:ring-[#1A6B38] transition-all cursor-pointer"
                    >
                      {SPECIALTIES.map((sp) => (
                        <option key={sp} value={sp}>
                          {sp}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Step 4: Horizontal Date Picker Strip */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block font-mono">
                      4. Selecciona el Día
                    </span>
                    <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                      {availableDates.map((d) => (
                        <button
                          type="button"
                          key={d.iso}
                          onClick={() => setSelectedDate(d.iso)}
                          className={`p-3 rounded-2xl text-center border transition-all cursor-pointer ${
                            selectedDate === d.iso
                              ? 'bg-[#0D3D20] text-white border-[#0D3D20] font-bold shadow-sm scale-[1.03]'
                              : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          <span className="text-[10px] block uppercase font-medium">{d.dayName}</span>
                          <span className="text-base font-black block mt-0.5">{d.dayNumber}</span>
                          <span className="text-[9px] block text-emerald-300 font-mono mt-0.5">{d.month}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 5: Time Slots Chips */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block font-mono">
                      5. Horario de Consulta
                    </span>
                    <div className="grid grid-cols-3 sm:grid-cols-3 gap-2">
                      {TIME_SLOTS.map((slot) => (
                        <button
                          type="button"
                          key={slot}
                          onClick={() => setSelectedTimeSlot(slot)}
                          className={`py-2.5 px-3 rounded-xl text-xs border font-semibold transition-all cursor-pointer ${
                            selectedTimeSlot === slot
                              ? 'bg-[#1A6B38] text-white border-[#1A6B38] shadow-sm'
                              : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 6: Tutor Information */}
                  <div className="space-y-3 pt-2">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block font-mono">
                      6. Datos del Tutor Responsable
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="text-[11px] text-slate-500 block mb-1">Nombre Completo *</label>
                        <input
                          type="text"
                          required
                          value={tutorName}
                          onChange={(e) => setTutorName(e.target.value)}
                          placeholder="Ej: Andrés Morales"
                          className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#1A6B38] focus:ring-1 focus:ring-[#1A6B38]"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-slate-500 block mb-1">WhatsApp de Confirmación *</label>
                        <input
                          type="tel"
                          required
                          value={tutorPhone}
                          onChange={(e) => setTutorPhone(e.target.value)}
                          placeholder="Ej: +593 99 123 4567"
                          className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#1A6B38] focus:ring-1 focus:ring-[#1A6B38]"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-slate-500 block mb-1">Correo Electrónico</label>
                        <input
                          type="email"
                          value={tutorEmail}
                          onChange={(e) => setTutorEmail(e.target.value)}
                          placeholder="tutor@ejemplo.com"
                          className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#1A6B38] focus:ring-1 focus:ring-[#1A6B38]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] text-slate-500 block mb-1">Motivo de Consulta o Síntomas *</label>
                      <textarea
                        required
                        rows={3}
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="Describe brevemente los síntomas, dolor, control médico o procedimiento requerido..."
                        className="w-full p-3.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#1A6B38] focus:ring-1 focus:ring-[#1A6B38]"
                      />
                    </div>
                  </div>

                  {/* Options */}
                  <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
                    <label className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-slate-800">
                      <input
                        type="checkbox"
                        checked={isEmergency}
                        onChange={(e) => setIsEmergency(e.target.checked)}
                        className="w-4 h-4 rounded text-red-600 accent-red-600 cursor-pointer"
                      />
                      <span className="flex items-center gap-1 text-red-600">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        Es una Urgencia Médica Prioritaria
                      </span>
                    </label>

                    <label className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-slate-800">
                      <input
                        type="checkbox"
                        checked={requiresPetTaxi}
                        onChange={(e) => setRequiresPetTaxi(e.target.checked)}
                        className="w-4 h-4 rounded text-emerald-600 accent-[#1A6B38] cursor-pointer"
                      />
                      <span className="flex items-center gap-1 text-slate-700">
                        <Ambulance className="w-3.5 h-3.5 text-emerald-600" />
                        Requiere Ambulancia / Pet Taxi
                      </span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-full bg-[#0D3D20] hover:bg-[#1A6B38] text-white font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-950/20 hover:shadow-xl hover:scale-[1.01] active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Registrando Cita...' : 'Confirmar Cita Médica'}</span>
                  </button>

                </form>
              ) : (
                /* Confirmation Screen (Creative Medical Certificate on Canvas) */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white border border-slate-200/90 rounded-[32px] p-8 sm:p-12 shadow-xl text-center space-y-6"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#1A6B38] mx-auto flex items-center justify-center shadow-md">
                    <Check className="w-8 h-8 stroke-[3]" />
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider font-mono">
                      ¡Cita Médica Confirmada con Éxito!
                    </span>
                    <h3 className="text-2xl sm:text-4xl font-black text-[#0D3D20]">
                      Turno Registrado #{confirmedAppointment.code}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                      Tu mascota <strong className="text-slate-900">{confirmedAppointment.petName}</strong> está programada para el <strong className="text-slate-900">{confirmedAppointment.date}</strong> a las <strong className="text-slate-900">{confirmedAppointment.timeSlot}</strong>.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 max-w-md mx-auto text-left text-xs space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Especialidad:</span>
                      <span className="font-bold text-slate-900">{confirmedAppointment.specialty}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Tutor Responsable:</span>
                      <span className="font-bold text-slate-900">{confirmedAppointment.tutorName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Ubicación:</span>
                      <span className="font-bold text-slate-900">Edif. Titanium Plaza, Quito</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Estado Clínico:</span>
                      <span className="font-extrabold text-[#1A6B38]">Agendado en Sistema</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto pt-2">
                    <a
                      href={buildWhatsAppUrl(
                        `Confirmación Turno #${confirmedAppointment.code}`,
                        `Mascota: ${confirmedAppointment.petName} - Fecha: ${confirmedAppointment.date} a las ${confirmedAppointment.timeSlot}`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-3.5 px-6 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zm4.52 11.66c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.07-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.84-.86 2.05s.88 2.38 1 2.54c.12.17 1.73 2.64 4.2 3.7 2.46 1.07 2.46.71 2.91.67.45-.05 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.28z"/>
                      </svg>
                      <span>Notificar por WhatsApp</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => setConfirmedAppointment(null)}
                      className="py-3.5 px-5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                    >
                      Agendar Otro Turno
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
