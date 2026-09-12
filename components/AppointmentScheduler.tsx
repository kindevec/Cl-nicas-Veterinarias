'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, 
  Dog, 
  Cat, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  ChevronRight,
  Stethoscope,
  Send,
  ShieldCheck,
  Check
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
  { type: 'perro', label: 'Canino (Perro)', icon: Dog, sub: 'Todas las razas y tamaños' },
  { type: 'gato', label: 'Felino (Gato)', icon: Cat, sub: 'Protocolo Fear-Free' },
  { type: 'exotico', label: 'Exótico (Conejo/Hurón)', icon: Sparkles, sub: 'Especialista en exóticos' },
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

    setConfirmedAppointment(newApt);
    onAppointmentCreated(newApt);
    setIsSubmitting(false);
  };

  return (
    <section id="citas" className="py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Header Editorial */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-[#1A6B38] text-xs font-bold uppercase tracking-wider shadow-sm">
            <Calendar className="w-4 h-4 text-emerald-600" />
            <span>AGENDAMIENTO PRIORITARIO 24/7</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0D3D20] tracking-tight">
            Reserva de Turnos &amp; Consulta Médica
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Atención personalizada con historia clínica digital y confirmación inmediata vía WhatsApp.
          </p>
        </div>

        {/* Form Container (Clean Light Medical Card) */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-lg">
          <AnimatePresence mode="wait">
            {!confirmedAppointment ? (
              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* 1. Species */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                    1. Tipo de Mascota *
                  </label>
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
                              ? 'bg-emerald-50 border-[#1A6B38] text-[#0D3D20] shadow-sm'
                              : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-[#1A6B38] text-white' : 'bg-slate-100 text-slate-500'}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="text-xs font-bold block text-slate-900">{opt.label}</span>
                            <span className="text-[11px] text-slate-500 block">{opt.sub}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Pet Info Grid */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                    2. Datos del Paciente
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <label className="text-[11px] text-slate-500 block mb-1">Nombre de la Mascota *</label>
                      <input
                        type="text"
                        required
                        value={petName}
                        onChange={(e) => setPetName(e.target.value)}
                        placeholder="Ej: Max, Luna"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-500 block mb-1">Raza (Opcional)</label>
                      <input
                        type="text"
                        value={petBreed}
                        onChange={(e) => setPetBreed(e.target.value)}
                        placeholder="Ej: Golden, Mestizo"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-500 block mb-1">Edad Aproximada</label>
                      <input
                        type="text"
                        value={petAge}
                        onChange={(e) => setPetAge(e.target.value)}
                        placeholder="Ej: 3 años, 6 meses"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-500 block mb-1">Peso (kg aprox)</label>
                      <input
                        type="text"
                        value={petWeight}
                        onChange={(e) => setPetWeight(e.target.value)}
                        placeholder="Ej: 14 kg"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Specialty selector */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                    3. Especialidad Médica Requerida *
                  </label>
                  <select
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:border-emerald-500 cursor-pointer"
                  >
                    {SPECIALTIES.map((sp) => (
                      <option key={sp} value={sp}>
                        {sp}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 4. Date & Time Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Dates */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                      Fecha Deseada
                    </label>
                    <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5">
                      {availableDates.map((d) => (
                        <button
                          type="button"
                          key={d.iso}
                          onClick={() => setSelectedDate(d.iso)}
                          className={`p-2 rounded-xl text-center border transition-all cursor-pointer ${
                            selectedDate === d.iso
                              ? 'bg-[#1A6B38] text-white border-[#1A6B38] font-bold shadow-sm'
                              : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          <span className="text-[10px] block uppercase">{d.dayName}</span>
                          <span className="text-sm font-extrabold block">{d.dayNumber}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Time Slots */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                      Horario Disponible
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {TIME_SLOTS.map((slot) => (
                        <button
                          type="button"
                          key={slot}
                          onClick={() => setSelectedTimeSlot(slot)}
                          className={`py-2 rounded-xl text-xs border font-medium transition-all cursor-pointer ${
                            selectedTimeSlot === slot
                              ? 'bg-[#1A6B38] text-white border-[#1A6B38] font-bold shadow-sm'
                              : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 5. Tutor Info */}
                <div className="space-y-3 pt-2 border-t border-slate-100">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                    4. Datos de Contacto del Tutor
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-[11px] text-slate-500 block mb-1">Nombre Completo *</label>
                      <input
                        type="text"
                        required
                        value={tutorName}
                        onChange={(e) => setTutorName(e.target.value)}
                        placeholder="Ej: Andrés Morales"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-500 block mb-1">WhatsApp de Contacto *</label>
                      <input
                        type="tel"
                        required
                        value={tutorPhone}
                        onChange={(e) => setTutorPhone(e.target.value)}
                        placeholder="Ej: +593 99 123 4567"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-500 block mb-1">Correo Electrónico</label>
                      <input
                        type="email"
                        value={tutorEmail}
                        onChange={(e) => setTutorEmail(e.target.value)}
                        placeholder="tutor@ejemplo.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
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
                      placeholder="Describe brevemente los síntomas, dolor, chequeo de rutina o procedimiento requerido..."
                      className="w-full p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* Additional Checkboxes */}
                <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <label className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-slate-800">
                    <input
                      type="checkbox"
                      checked={isEmergency}
                      onChange={(e) => setIsEmergency(e.target.checked)}
                      className="w-4 h-4 rounded text-red-600 accent-red-600 cursor-pointer"
                    />
                    <span className="flex items-center gap-1 text-red-600">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      Es una Urgencia / Triage Crítico
                    </span>
                  </label>

                  <label className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-slate-800">
                    <input
                      type="checkbox"
                      checked={requiresPetTaxi}
                      onChange={(e) => setRequiresPetTaxi(e.target.checked)}
                      className="w-4 h-4 rounded text-emerald-600 accent-[#1A6B38] cursor-pointer"
                    />
                    <span>Requiere Servicio de Ambulancia / Pet Taxi</span>
                  </label>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-full bg-[#1A6B38] hover:bg-[#14532D] text-white font-extrabold text-sm uppercase tracking-wider transition-all shadow-lg shadow-emerald-900/20 hover:shadow-xl hover:scale-[1.01] cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Procesando Turno...' : 'Confirmar Cita Médica'}</span>
                </button>
              </form>
            ) : (
              /* Confirmation Screen (Clean Light Medical Card) */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-6 py-6"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#1A6B38] mx-auto flex items-center justify-center shadow-md">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider font-mono">
                    ¡Cita Registrada Exitosamente!
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0D3D20]">
                    Código de Turno: #{confirmedAppointment.code}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                    Hemos reservado tu horario. Tu mascota <strong className="text-slate-900">{confirmedAppointment.petName}</strong> tiene cita para el <strong className="text-slate-900">{confirmedAppointment.date}</strong> a las <strong className="text-slate-900">{confirmedAppointment.timeSlot}</strong>.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 max-w-md mx-auto text-left text-xs space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Especialidad:</span>
                    <span className="font-bold text-slate-900">{confirmedAppointment.specialty}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Tutor Responsable:</span>
                    <span className="font-bold text-slate-900">{confirmedAppointment.tutorName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Estado Clínico:</span>
                    <span className="font-extrabold text-[#1A6B38]">Confirmada en Sistema</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto pt-2">
                  <a
                    href={buildWhatsAppUrl(
                      `Confirmación Turno #${confirmedAppointment.code}`,
                      `Mascota: ${confirmedAppointment.petName} - Fecha: ${confirmedAppointment.date} ${confirmedAppointment.timeSlot}`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3.5 px-6 rounded-full bg-[#1A6B38] hover:bg-[#14532D] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <span>Enviar a WhatsApp Oficial</span>
                  </a>

                  <button
                    onClick={() => setConfirmedAppointment(null)}
                    className="py-3 px-5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                  >
                    Nueva Cita
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
