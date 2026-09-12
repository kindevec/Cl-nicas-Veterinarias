'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CalendarClock, 
  Dog, 
  Cat, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Car, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  ChevronRight,
  Stethoscope,
  Send,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PetType, Appointment } from '@/lib/types';
import { saveAppointment } from '@/lib/supabaseClient';
import { buildWhatsAppUrl, formatCOP } from '@/lib/utils';

interface AppointmentSchedulerProps {
  initialService?: string;
  onAppointmentCreated: (newApt: Appointment) => void;
}

const PET_OPTIONS: { type: PetType; label: string; icon: React.ElementType; sub: string }[] = [
  { type: 'perro', label: 'Canino (Perro)', icon: Dog, sub: 'Todas las razas & tamaños' },
  { type: 'gato', label: 'Felino (Gato)', icon: Cat, sub: 'Protocolo Cat-Friendly' },
  { type: 'exotico', label: 'Mascota Exótica', icon: Sparkles, sub: 'Aves, conejos, hurones, reptiles' },
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
      dayName: d.toLocaleDateString('es-CO', { weekday: 'short' }),
      dayNumber: d.getDate(),
      month: d.toLocaleDateString('es-CO', { month: 'short' }),
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
      tutorEmail,
      reason,
      isEmergency,
      requiresPetTaxi,
    });

    setIsSubmitting(false);
    setConfirmedAppointment(newApt);
    onAppointmentCreated(newApt);

    confetti({
      particleCount: 90,
      spread: 60,
      origin: { y: 0.6 },
    });
  };

  const resetForm = () => {
    setConfirmedAppointment(null);
    setPetName('');
    setPetBreed('');
    setReason('');
    setIsEmergency(false);
    setRequiresPetTaxi(false);
  };

  return (
    <section id="agendar" className="py-20 md:py-28 relative overflow-hidden">
      {/* Background Lighting Glow */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute top-1/2 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl" 
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-14 space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold tracking-wider uppercase">
            <CalendarClock className="w-4 h-4 text-emerald-400" />
            <span>RESERVA CLÍNICA EN TIEMPO REAL</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Agendador &amp; Triage de Consultas
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Asignación directa con el especialista idóneo, registro en el historial médico de VetCare y confirmación inmediata con turno digital.
          </p>
        </motion.div>

        {/* Success Confirmation Card */}
        {confirmedAppointment ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-3xl bg-slate-900/90 border border-emerald-500/40 p-8 sm:p-10 text-center space-y-6 max-w-2xl mx-auto backdrop-blur-xl shadow-2xl shadow-black/80"
          >
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto shadow-lg shadow-emerald-500/20">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                ¡Cita Confirmada en el Sistema Clínico!
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                Turno Asignado: {confirmedAppointment.code}
              </h3>
              <p className="text-xs text-slate-300 mt-2 max-w-md mx-auto leading-relaxed">
                Espacio reservado para <strong className="text-white">{confirmedAppointment.petName}</strong> con el equipo de{' '}
                <strong className="text-emerald-300">{confirmedAppointment.specialty}</strong>.
              </p>
            </div>

            {/* Appointment Recap Bento */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-5 rounded-2xl bg-slate-950/80 border border-white/10 text-left text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Paciente:</span>
                <span className="font-bold text-white">{confirmedAppointment.petName} ({confirmedAppointment.petType})</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Fecha &amp; Hora:</span>
                <span className="font-bold text-white">{confirmedAppointment.date} - {confirmedAppointment.timeSlot}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Tutor:</span>
                <span className="font-bold text-white">{confirmedAppointment.tutorName}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Especialidad:</span>
                <span className="font-bold text-emerald-400">{confirmedAppointment.specialty}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Pet Taxi:</span>
                <span className="font-semibold text-slate-300">{confirmedAppointment.requiresPetTaxi ? 'Sí, solicitado' : 'No requerido'}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Estado:</span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-[10px] inline-block">
                  {confirmedAppointment.status}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                id="btn-whatsapp-confirm-appointment"
                href={buildWhatsAppUrl(
                  `Cita ${confirmedAppointment.code} - ${confirmedAppointment.petName}`,
                  `He agendado la cita médica ${confirmedAppointment.code} para ${confirmedAppointment.petName} el ${confirmedAppointment.date} a las ${confirmedAppointment.timeSlot}. Agradezco confirmación de ingreso.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3.5 px-5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/25 transition-all active:scale-95"
              >
                <Send className="w-4 h-4 text-slate-950" />
                <span>Confirmar con Recepción por WhatsApp</span>
              </a>

              <button
                type="button"
                id="btn-new-appointment-reset"
                onClick={resetForm}
                className="py-3.5 px-6 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-200 text-xs font-bold border border-white/10 transition-all cursor-pointer"
              >
                Agendar Otro Paciente
              </button>
            </div>
          </motion.div>
        ) : (
          /* Interactive Multi-step Minimalist Form */
          <motion.form 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="rounded-3xl bg-slate-900/80 border border-white/10 p-6 sm:p-10 backdrop-blur-xl shadow-2xl shadow-black/80 space-y-8"
          >
            {/* Honeypot field (anti-bot Kindev standard) */}
            <input 
              type="text" 
              name="_gotcha" 
              className="hidden" 
              tabIndex={-1} 
              autoComplete="off" 
            />

            {/* Step 1: Pet Type Selection */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-3">
                1. Selecciona la Especie del Paciente:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {PET_OPTIONS.map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = petType === opt.type;
                  return (
                    <button
                      key={opt.type}
                      type="button"
                      id={`pet-type-btn-${opt.type}`}
                      onClick={() => setPetType(opt.type)}
                      className={`p-4 rounded-2xl border text-left transition-all flex items-center gap-3.5 cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-500/15 border-emerald-400 text-white shadow-lg shadow-emerald-950/50'
                          : 'bg-white/[0.02] hover:bg-white/[0.05] border-white/10 text-slate-300 hover:text-white'
                      }`}
                    >
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-emerald-500 text-slate-950' : 'bg-white/5 text-slate-400'
                      }`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-xs font-extrabold text-white">{opt.label}</div>
                        <div className="text-[11px] text-slate-400 leading-tight mt-0.5">{opt.sub}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Pet Details (Minimalist Floating Inputs) */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Nombre del Paciente *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Milo, Luna, Coco..."
                  value={petName}
                  onChange={(e) => setPetName(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-emerald-400/60 focus:bg-white/[0.06] transition-all"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Raza o Linaje
                </label>
                <input
                  type="text"
                  placeholder="Ej: Golden, Criollo..."
                  value={petBreed}
                  onChange={(e) => setPetBreed(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-emerald-400/60 focus:bg-white/[0.06] transition-all"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Edad / Peso Aprox.
                </label>
                <input
                  type="text"
                  placeholder="Ej: 3 años / 14 kg"
                  value={petAge}
                  onChange={(e) => setPetAge(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-emerald-400/60 focus:bg-white/[0.06] transition-all"
                />
              </div>
            </div>

            {/* Step 3: Medical Specialty Selection */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-3">
                2. Especialidad Médica o Procedimiento Requerido:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {SPECIALTIES.map((spec) => {
                  const isSelected = specialty === spec;
                  return (
                    <button
                      key={spec}
                      type="button"
                      onClick={() => setSpecialty(spec)}
                      className={`px-4 py-3 rounded-2xl text-left text-xs font-semibold border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-500/20 border-emerald-400 text-white font-bold shadow-md shadow-emerald-950/40'
                          : 'bg-white/[0.02] hover:bg-white/[0.06] border-white/10 text-slate-300'
                      }`}
                    >
                      {spec}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Date & Time Picker */}
            <div className="space-y-4">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                3. Selecciona Fecha y Franja Horaria:
              </label>

              {/* Date Pills */}
              <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
                {availableDates.map((item) => {
                  const isSelected = selectedDate === item.iso;
                  return (
                    <button
                      key={item.iso}
                      type="button"
                      onClick={() => setSelectedDate(item.iso)}
                      className={`min-w-[84px] p-3 rounded-2xl text-center border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 font-black border-emerald-400 shadow-lg shadow-emerald-950'
                          : 'bg-white/[0.02] hover:bg-white/[0.06] border-white/10 text-slate-300'
                      }`}
                    >
                      <span className="text-[10px] uppercase block tracking-wider opacity-85 font-semibold">{item.dayName}</span>
                      <span className="text-lg font-black block leading-none my-1">{item.dayNumber}</span>
                      <span className="text-[10px] uppercase block opacity-75">{item.month}</span>
                    </button>
                  );
                })}
              </div>

              {/* Time Slots */}
              <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2">
                {TIME_SLOTS.map((slot) => {
                  const isSelected = selectedTimeSlot === slot;
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedTimeSlot(slot)}
                      className={`py-2.5 px-2 rounded-xl text-[11px] font-mono font-bold border text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-sm'
                          : 'bg-white/[0.02] hover:bg-white/[0.06] border-white/10 text-slate-300'
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 5: Reason & Urgency */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-1.5">
                4. Motivo de Consulta &amp; Signos Observados *
              </label>
              <textarea
                required
                rows={3}
                placeholder="Describe brevemente qué presenta tu mascota (ej: inapetencia, cojera repentina, vómitos, revisión post-quirúrgica)..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-emerald-400/60 leading-relaxed"
              />

              {/* Urgency & Pet Taxi Checkboxes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
                <label className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/[0.02] border border-white/10 cursor-pointer hover:border-white/20 transition-colors">
                  <input
                    type="checkbox"
                    checked={isEmergency}
                    onChange={(e) => setIsEmergency(e.target.checked)}
                    className="w-4 h-4 rounded text-rose-500 focus:ring-0 bg-slate-950 border-white/20"
                  />
                  <div>
                    <span className="text-xs font-bold text-rose-300 flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" /> Urgencia Médica Aguda
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      Priorización directa a sala de reanimación y triage &lt; 5 min.
                    </span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/[0.02] border border-white/10 cursor-pointer hover:border-white/20 transition-colors">
                  <input
                    type="checkbox"
                    checked={requiresPetTaxi}
                    onChange={(e) => setRequiresPetTaxi(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-500 focus:ring-0 bg-slate-950 border-white/20"
                  />
                  <div>
                    <span className="text-xs font-bold text-emerald-300 flex items-center gap-1">
                      <Car className="w-3.5 h-3.5" /> Requiero Pet Taxi / Ambulancia
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      Vehículo asistido con oxígeno y camilla de rescate.
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {/* Step 6: Tutor Information */}
            <div className="pt-2 border-t border-white/10">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-3">
                5. Información de Contacto del Tutor:
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Nombre Completo *</label>
                  <input
                    type="text"
                    required
                    placeholder="Tu nombre y apellido"
                    value={tutorName}
                    onChange={(e) => setTutorName(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-emerald-400/60"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">WhatsApp de Contacto *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+57 300 000 0000"
                    value={tutorPhone}
                    onChange={(e) => setTutorPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-emerald-400/60"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Correo Electrónico</label>
                  <input
                    type="email"
                    placeholder="Para envío de historia médica"
                    value={tutorEmail}
                    onChange={(e) => setTutorEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-emerald-400/60"
                  />
                </div>
              </div>
            </div>

            {/* Submit Bar */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Consentimiento médico informado y confidencialidad garantizada.</span>
              </div>

              <button
                type="submit"
                id="submit-appointment-btn"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-9 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm tracking-wide shadow-xl shadow-emerald-500/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-105"
              >
                <span>{isSubmitting ? 'Registrando...' : 'Confirmar Cita Veterinaria'}</span>
                <ChevronRight className="w-4 h-4 text-slate-950 stroke-[2.5]" />
              </button>
            </div>

          </motion.form>
        )}

      </div>
    </section>
  );
}
