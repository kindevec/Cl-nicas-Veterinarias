'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  Check, 
  ExternalLink, 
  AlertTriangle,
  Dog,
  Cat,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PetType, Appointment } from '@/lib/types';
import { saveAppointment } from '@/lib/supabaseClient';
import { buildWhatsAppUrl } from '@/lib/utils';
import { WhatsAppOfficialIcon } from './WhatsAppOfficialIcon';

interface AppointmentSchedulerProps {
  initialService?: string;
  onAppointmentCreated?: (newApt: Appointment) => void;
}

const CONSULTATION_REASONS = [
  'Consulta General & Chequeo',
  'Urgencias & Cuidados Críticos 24/7',
  'Cirugía & Traumatología',
  'Cardiología Veterinaria',
  'Dermatología & Alergias',
  'Vacunación & Desparasitación',
  'Odontología & Profilaxis',
  'Nutrición Clínica WSAVA',
  'Grooming Médico & Spa',
  'Otra Consulta / Información General'
];

export function AppointmentScheduler({ initialService, onAppointmentCreated }: AppointmentSchedulerProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [petName, setPetName] = useState('');
  const [petType, setPetType] = useState<PetType>('perro');
  const [reason, setReason] = useState(initialService || CONSULTATION_REASONS[0]);
  const [message, setMessage] = useState('');
  const [isEmergency, setIsEmergency] = useState(false);

  const [confirmedAppointment, setConfirmedAppointment] = useState<Appointment | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) {
      alert('Por favor completa los campos obligatorios (*).');
      return;
    }

    setIsSubmitting(true);
    const newApt = saveAppointment({
      petName: petName.trim() || 'Mascota',
      petType,
      petBreed: 'Por confirmar',
      petAge: 'Por confirmar',
      petWeight: 'Por confirmar',
      specialty: reason,
      date: new Date().toISOString().split('T')[0],
      timeSlot: 'A coordinar',
      tutorName: name.trim(),
      tutorPhone: phone.trim(),
      tutorEmail: email.trim() || 'contacto@kindev.ec',
      reason: `${reason}: ${message.trim()}`,
      isEmergency,
      requiresPetTaxi: false,
    });

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#1A6B38', '#10B981', '#E05A47', '#FFFFFF'],
      });
    } catch {
      // ignore
    }

    if (onAppointmentCreated) {
      onAppointmentCreated(newApt);
    }
    setConfirmedAppointment(newApt);
    setIsSubmitting(false);
  };

  const handleReset = () => {
    setConfirmedAppointment(null);
    setName('');
    setPhone('');
    setEmail('');
    setPetName('');
    setMessage('');
    setIsEmergency(false);
  };

  return (
    <section id="agendar" className="py-10 sm:py-14 bg-[#FAFBF7] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto px-4 sm:px-0"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0D3D20] tracking-tight">
            Contacto &amp; <span className="text-[#E05A47] font-extrabold">Ubicación</span>
          </h2>
        </motion.div>

        {/* Clean 2-Column Grid: Formulario a la IZQUIERDA (7 cols) y Datos/Mapa a la DERECHA (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 lg:gap-12 items-start w-full">
          
          {/* LEFT COLUMN: Formulario Sencillo y Directo (7 cols) */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 w-full"
          >
            <div className="bg-white rounded-none sm:rounded-3xl p-5 sm:p-9 border-y sm:border border-slate-200/90 shadow-xs w-full">
              <AnimatePresence mode="wait">
                {!confirmedAppointment ? (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                        Envíanos un Mensaje
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        Llena los datos a continuación y nos pondremos en contacto contigo de forma inmediata.
                      </p>
                    </div>

                    {/* Fila 1: Nombre & Teléfono */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-slate-700 block mb-1">
                          Nombre Completo *
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Tu nombre y apellido"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#1A6B38] focus:bg-white transition-all"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-slate-700 block mb-1">
                          Teléfono o WhatsApp *
                        </label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="Ej: 099 123 4567"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#1A6B38] focus:bg-white transition-all"
                        />
                      </div>
                    </div>

                    {/* Fila 2: Correo & Tipo de Mascota */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-slate-700 block mb-1">
                          Correo Electrónico (Opcional)
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="correo@ejemplo.com"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#1A6B38] focus:bg-white transition-all"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-slate-700 block mb-1">
                          Tipo de Mascota
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          <button
                            type="button"
                            onClick={() => setPetType('perro')}
                            className={`py-2 px-2 rounded-xl text-xs font-medium border flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                              petType === 'perro'
                                ? 'bg-[#0D3D20] text-white border-[#0D3D20]'
                                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            <Dog className="w-3.5 h-3.5" />
                            <span>Perro</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setPetType('gato')}
                            className={`py-2 px-2 rounded-xl text-xs font-medium border flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                              petType === 'gato'
                                ? 'bg-[#0D3D20] text-white border-[#0D3D20]'
                                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            <Cat className="w-3.5 h-3.5" />
                            <span>Gato</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setPetType('exotico')}
                            className={`py-2 px-2 rounded-xl text-xs font-medium border flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                              petType === 'exotico'
                                ? 'bg-[#0D3D20] text-white border-[#0D3D20]'
                                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Otro</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Fila 3: Nombre de Mascota & Asunto / Motivo */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-slate-700 block mb-1">
                          Nombre de tu Mascota (Opcional)
                        </label>
                        <input
                          type="text"
                          value={petName}
                          onChange={(e) => setPetName(e.target.value)}
                          placeholder="Ej: Max, Luna"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#1A6B38] focus:bg-white transition-all"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-slate-700 block mb-1">
                          Motivo o Asunto *
                        </label>
                        <select
                          value={reason}
                          onChange={(e) => setReason(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#1A6B38] focus:bg-white transition-all cursor-pointer font-medium"
                        >
                          {CONSULTATION_REASONS.map((r) => (
                            <option key={r} value={r}>
                              {r}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Fila 4: Mensaje / Detalles */}
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        Mensaje o Detalle de Consulta *
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Escribe brevemente tu inquietud, síntomas de tu mascota o fecha de preferencia..."
                        className="w-full p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#1A6B38] focus:bg-white transition-all"
                      />
                    </div>

                    {/* Urgencia Checkbox */}
                    <div className="p-3 rounded-xl bg-red-50/60 border border-red-100 flex items-center justify-between">
                      <label className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-red-700">
                        <input
                          type="checkbox"
                          checked={isEmergency}
                          onChange={(e) => setIsEmergency(e.target.checked)}
                          className="w-4 h-4 rounded text-red-600 accent-red-600 cursor-pointer"
                        />
                        <span className="flex items-center gap-1">
                          <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                          Es una urgencia médica inmediata (Atención 24 Horas)
                        </span>
                      </label>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-6 rounded-2xl bg-[#0D3D20] hover:bg-[#1A6B38] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:scale-[1.01] active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>{isSubmitting ? 'Enviando...' : 'Enviar Consulta'}</span>
                    </button>

                  </form>
                ) : (
                  /* Confirmation View */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-6 space-y-5"
                  >
                    <div className="w-14 h-14 rounded-full bg-emerald-100 text-[#1A6B38] mx-auto flex items-center justify-center shadow-xs">
                      <Check className="w-7 h-7 stroke-[3]" />
                    </div>

                    <div className="space-y-1">
                      <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider font-mono">
                        ¡Mensaje Recibido con Éxito!
                      </span>
                      <h3 className="text-xl sm:text-2xl font-black text-[#0D3D20]">
                        Turno / Registro #{confirmedAppointment.code}
                      </h3>
                      <p className="text-xs text-slate-600 max-w-sm mx-auto">
                        Gracias <strong>{confirmedAppointment.tutorName}</strong>. Hemos recibido tu solicitud y nuestro equipo te contactará de inmediato.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-left text-xs space-y-2 max-w-sm mx-auto">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Motivo:</span>
                        <span className="font-bold text-slate-900">{confirmedAppointment.specialty}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Teléfono:</span>
                        <span className="font-bold text-slate-900">{confirmedAppointment.tutorPhone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Estado:</span>
                        <span className="font-bold text-emerald-700">Enviado al Equipo Clínico</span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2.5 justify-center max-w-sm mx-auto pt-2">
                      <a
                        href={buildWhatsAppUrl(
                          `Hola, envié una consulta médica (Turno #${confirmedAppointment.code}) para ${confirmedAppointment.petName}.`,
                          `Detalle: ${confirmedAppointment.reason}`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                      >
                        <WhatsAppOfficialIcon className="w-4 h-4 text-white shrink-0" />
                        <span>Abrir en WhatsApp</span>
                      </a>

                      <button
                        type="button"
                        onClick={handleReset}
                        className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                      >
                        Enviar Otro Mensaje
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Contacto, Redes Sociales & Mapa de Google (5 cols) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-5 space-y-4 sm:space-y-6 w-full"
          >
            {/* 1. Datos de Contacto Directo */}
            <div className="bg-white rounded-none sm:rounded-3xl p-5 sm:p-7 border-y sm:border border-slate-200/90 shadow-xs space-y-5 w-full">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center justify-between">
                <span>Información de Contacto</span>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                  Quito, Ecuador
                </span>
              </h3>

              <div className="space-y-4 text-xs">
                {/* Dirección */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#1A6B38] flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Dirección</h4>
                    <p className="text-slate-600 leading-relaxed mt-0.5">
                      Av. República del Salvador y Naciones Unidas, Edificio Titanium Plaza, Planta Baja, Quito.
                    </p>
                  </div>
                </div>

                {/* Teléfonos */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#1A6B38] flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Teléfonos</h4>
                    <div className="flex flex-col sm:flex-row sm:gap-3 gap-1 mt-0.5">
                      <a href="tel:+593991952889" className="text-slate-700 hover:text-[#1A6B38] font-semibold transition-colors">
                        +593 99 195 2889
                      </a>
                      <span className="text-slate-300 hidden sm:inline">•</span>
                      <a href="tel:022999999" className="text-slate-700 hover:text-[#1A6B38] font-semibold transition-colors">
                        (02) 299-9999
                      </a>
                    </div>
                  </div>
                </div>

                {/* Correo Electrónico */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#1A6B38] flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Correo Electrónico</h4>
                    <a href="mailto:contacto@kindev.ec" className="text-slate-600 hover:text-[#1A6B38] transition-colors mt-0.5 block">
                      contacto@kindev.ec
                    </a>
                  </div>
                </div>

                {/* Horarios */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="font-bold text-slate-900">Horarios de Atención</h4>
                    <p className="text-slate-600">
                      <strong>Consultas:</strong> Lun a Sáb: 08:00 – 20:00 | Dom: 09:00 – 18:00
                    </p>
                    <p className="text-[#1A6B38] font-bold">
                      <strong>Urgencias &amp; UCI:</strong> Abierto 24 Horas / 365 Días
                    </p>
                  </div>
                </div>
              </div>

              {/* Redes Sociales */}
              <div className="pt-3 border-t border-slate-100">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2.5">
                  Redes Sociales
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href="https://instagram.com/kindev.ec"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-[#E1306C] hover:text-white text-slate-700 text-xs font-semibold transition-all cursor-pointer"
                    aria-label="Instagram"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    <span>Instagram</span>
                  </a>

                  <a
                    href="https://facebook.com/kindev.ec"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-[#1877F2] hover:text-white text-slate-700 text-xs font-semibold transition-all cursor-pointer"
                    aria-label="Facebook"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                    </svg>
                    <span>Facebook</span>
                  </a>

                  <a
                    href="https://tiktok.com/@kindev.ec"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-black hover:text-white text-slate-700 text-xs font-semibold transition-all cursor-pointer"
                    aria-label="TikTok"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-1.01-.02 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                    </svg>
                    <span>TikTok</span>
                  </a>

                  <a
                    href="https://wa.me/593991952889?text=Hola%20VetCare%20Gourmet%2C%20deseo%20m%C3%A1s%20informaci%C3%B3n"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366] text-[#1A6B38] hover:text-white text-xs font-semibold transition-all cursor-pointer"
                    aria-label="WhatsApp"
                  >
                    <WhatsAppOfficialIcon className="w-3.5 h-3.5 shrink-0" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

            {/* 2. Mapa de Google Embed */}
            <div className="bg-white rounded-none sm:rounded-3xl p-4 sm:p-5 border-y sm:border border-slate-200/90 shadow-xs space-y-3 w-full">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#1A6B38]" />
                  Mapa de Ubicación
                </span>
                <div className="flex items-center gap-2">
                  <a
                    href="https://maps.google.com/?q=Titanium+Plaza+Quito"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-semibold text-[#1A6B38] hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>Google Maps</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                  <span className="text-slate-300">•</span>
                  <a
                    href="https://waze.com/ul?q=Titanium+Plaza+Quito"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-semibold text-slate-600 hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>Waze</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>

              {/* Responsive Google Maps Iframe */}
              <div className="w-full h-56 sm:h-64 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.791771142279!2d-78.4842183!3d-0.1806532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d59a7a9e334a1d%3A0x6b4324f9f7d0c36b!2sTitanium%20Plaza!5e0!3m2!1ses!2sec!4v1710000000000!5m2!1ses!2sec"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación Google Maps - Clínica Veterinaria Titanium Plaza Quito"
                  className="w-full h-full"
                />
              </div>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
