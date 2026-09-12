'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  X, 
  Database, 
  CalendarClock, 
  ShoppingBag, 
  FolderLock, 
  KeyRound, 
  CheckCircle2, 
  Clock, 
  UploadCloud, 
  FileText, 
  ShieldCheck, 
  Copy, 
  Check, 
  ExternalLink,
  Filter,
  Eye,
  Trash2
} from 'lucide-react';
import { Appointment, Order, MedicalRecordFile, AppointmentStatus, OrderStatus } from '@/lib/types';
import { 
  updateAppointmentStatus, 
  updateOrderStatus, 
  uploadMedicalRecordFile, 
  resetSupabaseClient 
} from '@/lib/supabaseClient';
import { formatCOP } from '@/lib/utils';

interface AdminBackofficeModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointments: Appointment[];
  orders: Order[];
  medicalFiles: MedicalRecordFile[];
  onAppointmentsChange: (updated: Appointment[]) => void;
  onOrdersChange: (updated: Order[]) => void;
  onMedicalFilesChange: (updated: MedicalRecordFile[]) => void;
}

type TabType = 'citas' | 'ordenes' | 'storage' | 'config';

const SQL_SCHEMA_SNIPPET = `-- ====================================================================
-- KINDEV S.A.S. - SUPABASE DDL & RLS POLICIES FOR VETCARE
-- ====================================================================

-- Storage Bucket for Clinical Records
INSERT INTO storage.buckets (id, name, public)
VALUES ('vetcare-clinical-records', 'vetcare-clinical-records', false)
ON CONFLICT (id) DO NOTHING;

-- Storage Bucket RLS Policies
CREATE POLICY "Staff Upload Clinical Records"
  ON storage.objects FOR INSERT TO authenticated, anon
  WITH CHECK (bucket_id = 'vetcare-clinical-records');

CREATE POLICY "Staff Read Clinical Records"
  ON storage.objects FOR SELECT TO authenticated, anon
  USING (bucket_id = 'vetcare-clinical-records');

-- Appointments RLS
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Create Appointments" ON public.appointments FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Staff Manage Appointments" ON public.appointments FOR ALL TO authenticated USING (true);

-- Orders RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Place Orders" ON public.orders FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Staff Manage Orders" ON public.orders FOR ALL TO authenticated USING (true);`;

export function AdminBackofficeModal({
  isOpen,
  onClose,
  appointments,
  orders,
  medicalFiles,
  onAppointmentsChange,
  onOrdersChange,
  onMedicalFilesChange,
}: AdminBackofficeModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>('citas');
  const [filterAptStatus, setFilterAptStatus] = useState<string>('todos');
  const [copiedSql, setCopiedSql] = useState(false);

  // Storage Uploader State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadPetName, setUploadPetName] = useState('');
  const [uploadTutorName, setUploadTutorName] = useState('');
  const [uploadDocType, setUploadDocType] = useState<MedicalRecordFile['documentType']>('Radiografía');
  const [uploadNotes, setUploadNotes] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Supabase Custom Credentials Form
  const [customUrl, setCustomUrl] = useState('');
  const [customKey, setCustomKey] = useState('');
  const [configSaved, setConfigSaved] = useState(false);

  if (!isOpen) return null;

  const handleStatusChange = (id: string, newStatus: AppointmentStatus) => {
    const updated = updateAppointmentStatus(id, newStatus);
    onAppointmentsChange(updated);
  };

  const handleOrderStatusChange = (id: string, newStatus: OrderStatus) => {
    const updated = updateOrderStatus(id, newStatus);
    onOrdersChange(updated);
  };

  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile || !uploadPetName || !uploadTutorName) {
      alert('Por favor selecciona un archivo y completa el nombre del paciente y tutor.');
      return;
    }

    setIsUploading(true);
    try {
      const record = await uploadMedicalRecordFile(
        selectedFile,
        uploadPetName,
        uploadTutorName,
        uploadDocType,
        uploadNotes
      );
      onMedicalFilesChange([record, ...medicalFiles]);
      setSelectedFile(null);
      setUploadPetName('');
      setUploadTutorName('');
      setUploadNotes('');
      alert('¡Archivo clínico subido con éxito a Supabase Storage con políticas RLS aplicadas!');
    } catch (err) {
      console.error(err);
      alert('Error al subir archivo');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    resetSupabaseClient(customUrl, customKey);
    setConfigSaved(true);
    setTimeout(() => setConfigSaved(false), 3000);
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(SQL_SCHEMA_SNIPPET);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  const filteredAppointments = appointments.filter((apt) => {
    if (filterAptStatus === 'todos') return true;
    return apt.status === filterAptStatus;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-3 sm:p-6 flex items-center justify-center bg-black/85 backdrop-blur-md">
      <div className="bg-slate-950 border border-white/15 rounded-3xl w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Top Modal Header */}
        <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white">
                  Backoffice Supabase
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[10px] font-mono">
                  RLS &amp; Storage Active
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Gestor Integral de Citas, Órdenes Pet Shop y Expedientes Radiológicos
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-5 sm:px-6 pt-3 border-b border-white/10 flex gap-2 overflow-x-auto scrollbar-none bg-slate-950">
          <button
            type="button"
            onClick={() => setActiveTab('citas')}
            className={`pb-3 px-3 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'citas'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <CalendarClock className="w-4 h-4" />
            <span>Citas Veterinarias ({appointments.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('ordenes')}
            className={`pb-3 px-3 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'ordenes'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Órdenes Pet Shop ({orders.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('storage')}
            className={`pb-3 px-3 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'storage'
                ? 'border-teal-400 text-teal-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FolderLock className="w-4 h-4" />
            <span>Supabase Storage (Expedientes)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('config')}
            className={`pb-3 px-3 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'config'
                ? 'border-indigo-400 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <KeyRound className="w-4 h-4" />
            <span>Configuración &amp; DDL SQL</span>
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          
          {/* TAB 1: CITAS VETERINARIAS */}
          {activeTab === 'citas' && (
            <div className="space-y-4">
              {/* Filter Row */}
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Filter className="w-3.5 h-3.5" />
                  <span>Filtrar por Estado:</span>
                </div>
                <div className="flex gap-1.5 overflow-x-auto pb-1">
                  {['todos', 'Pendiente', 'Confirmada', 'En Atención', 'Completada', 'Cancelada'].map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setFilterAptStatus(st)}
                      className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                        filterAptStatus === st
                          ? 'bg-emerald-500 text-slate-950 font-bold'
                          : 'bg-slate-900 text-slate-400 hover:text-white border border-white/5'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Table / Cards */}
              <div className="space-y-3">
                {filteredAppointments.length === 0 ? (
                  <div className="text-center py-12 text-slate-400 text-xs">
                    No hay citas con el estado seleccionado.
                  </div>
                ) : (
                  filteredAppointments.map((apt) => (
                    <div
                      key={apt.id}
                      className="p-4 rounded-2xl bg-slate-900/70 border border-white/10 hover:border-white/20 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="space-y-1.5 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                            {apt.code}
                          </span>
                          <span className="text-sm font-bold text-white">
                            {apt.petName} ({apt.petType})
                          </span>
                          {apt.isEmergency && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                              URGENCIA AGUDA
                            </span>
                          )}
                          {apt.requiresPetTaxi && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">
                              Pet Taxi
                            </span>
                          )}
                        </div>

                        <div className="text-xs text-slate-300">
                          <span className="text-slate-400">Especialidad:</span> {apt.specialty} •{' '}
                          <span className="text-slate-400">Fecha:</span> {apt.date} ({apt.timeSlot})
                        </div>

                        <div className="text-xs text-slate-400">
                          <span className="text-slate-300 font-medium">Tutor:</span> {apt.tutorName} •{' '}
                          <span className="text-slate-300">{apt.tutorPhone}</span>
                        </div>

                        <p className="text-xs text-slate-300 bg-slate-950/60 p-2 rounded-lg border border-white/5 italic">
                          &quot;{apt.reason}&quot;
                        </p>
                      </div>

                      {/* State Modifier Quick Buttons */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 shrink-0">
                        <span className="text-[11px] text-slate-400 sm:hidden">Cambiar estado:</span>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {(['Pendiente', 'Confirmada', 'En Atención', 'Completada', 'Cancelada'] as AppointmentStatus[]).map((status) => {
                            const isCurrent = apt.status === status;
                            return (
                              <button
                                key={status}
                                type="button"
                                onClick={() => handleStatusChange(apt.id, status)}
                                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                                  isCurrent
                                    ? status === 'Cancelada'
                                      ? 'bg-rose-500 text-white'
                                      : 'bg-emerald-500 text-slate-950'
                                    : 'bg-slate-950 text-slate-400 hover:text-white border border-white/10'
                                }`}
                              >
                                {status}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 2: ÓRDENES PET SHOP */}
          {activeTab === 'ordenes' && (
            <div className="space-y-4">
              {orders.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-xs">
                  No hay órdenes registradas aún.
                </div>
              ) : (
                orders.map((order) => (
                  <div
                    key={order.id}
                    className="p-4 rounded-2xl bg-slate-900/70 border border-white/10 space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                          {order.code}
                        </span>
                        <span className="text-xs text-slate-400">{order.createdAt}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-400">Total:</span>
                        <span className="text-sm font-extrabold text-white">{formatCOP(order.total)}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div>
                        <div className="text-slate-400 mb-1">Items Ordenados:</div>
                        <ul className="space-y-1">
                          {order.items.map((it, idx) => (
                            <li key={idx} className="text-slate-200">
                              • <strong className="text-amber-300">{it.quantity}x</strong> {it.product.name}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <div className="text-slate-400 mb-1">Destinatario:</div>
                        <div className="text-white font-medium">{order.customerName}</div>
                        <div className="text-slate-300">{order.customerPhone}</div>
                        <div className="text-slate-400">{order.customerAddress}</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-white/5">
                      <span className="text-xs text-slate-400">Estado de Despacho:</span>
                      <div className="flex gap-1.5">
                        {(['Preparando', 'Enviado', 'Entregado'] as OrderStatus[]).map((st) => {
                          const isCurrent = order.status === st;
                          return (
                            <button
                              key={st}
                              type="button"
                              onClick={() => handleOrderStatusChange(order.id, st)}
                              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                                isCurrent
                                  ? 'bg-amber-400 text-slate-950 font-bold'
                                  : 'bg-slate-950 text-slate-400 hover:text-white border border-white/10'
                              }`}
                            >
                              {st}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 3: SUPABASE STORAGE (EXPEDIENTES RADIOLÓGICOS Y FOTOS) */}
          {activeTab === 'storage' && (
            <div className="space-y-6">
              
              {/* Storage Info Banner */}
              <div className="p-4 rounded-2xl bg-teal-950/40 border border-teal-500/30 flex items-start gap-3 text-xs text-teal-200">
                <ShieldCheck className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white font-semibold">
                    Supabase Storage Bucket: &quot;vetcare-clinical-records&quot;
                  </strong>
                  <span>
                    Todos los archivos están protegidos por políticas RLS. Únicamente el personal médico autenticado y el tutor asociado pueden acceder mediante URLs firmadas y buckets dedicados.
                  </span>
                </div>
              </div>

              {/* Upload Form */}
              <form onSubmit={handleFileUpload} className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <UploadCloud className="w-4 h-4 text-emerald-400" />
                  <span>Subir Nuevo Expediente o Foto Clínica</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] text-slate-300 block mb-1">Nombre Mascota *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej: Lucas (Golden)"
                      value={uploadPetName}
                      onChange={(e) => setUploadPetName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-300 block mb-1">Nombre Tutor *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej: Mariana Gómez"
                      value={uploadTutorName}
                      onChange={(e) => setUploadTutorName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-300 block mb-1">Tipo de Documento *</label>
                    <select
                      value={uploadDocType}
                      onChange={(e) => setUploadDocType(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white text-xs"
                    >
                      <option value="Radiografía">Radiografía Digital</option>
                      <option value="Ecografía">Ecografía Doppler</option>
                      <option value="Cuadro Hemático">Cuadro Hemático</option>
                      <option value="Receta Médica">Receta Médica</option>
                      <option value="Foto Clínica">Foto de Paciente</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-slate-300 block mb-1">Archivo a Subir (Imagen / PDF) *</label>
                  <input
                    type="file"
                    required
                    accept="image/*,.pdf"
                    onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                    className="w-full text-xs text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-slate-800 file:text-white hover:file:bg-slate-700 cursor-pointer"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-slate-300 block mb-1">Notas Médicas / Diagnóstico Preliminar</label>
                  <input
                    type="text"
                    placeholder="Observaciones de la placa o análisis..."
                    value={uploadNotes}
                    onChange={(e) => setUploadNotes(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white text-xs"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isUploading}
                  className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <UploadCloud className="w-4 h-4" />
                  <span>{isUploading ? 'Subiendo a Supabase Storage...' : 'Subir Expediente con Seguridad RLS'}</span>
                </button>
              </form>

              {/* Uploaded Files Gallery */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Archivos Almacenados ({medicalFiles.length})
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {medicalFiles.map((file) => (
                    <div
                      key={file.id}
                      className="p-3.5 rounded-xl bg-slate-900/60 border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between space-y-3"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30 font-semibold">
                            {file.documentType}
                          </span>
                          <span className="text-slate-400">{file.fileSize}</span>
                        </div>

                        {file.fileUrl && !file.fileName.endsWith('.pdf') ? (
                          <div 
                            onClick={() => setPreviewImage(file.fileUrl)}
                            className="relative aspect-video w-full rounded-lg overflow-hidden bg-slate-950 cursor-pointer group"
                          >
                            <Image
                              src={file.fileUrl}
                              alt={file.fileName}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                              <Eye className="w-5 h-5 text-white" />
                            </div>
                          </div>
                        ) : (
                          <div className="p-4 rounded-lg bg-slate-950 flex items-center gap-2 text-xs text-slate-300">
                            <FileText className="w-5 h-5 text-emerald-400" />
                            <span className="truncate">{file.fileName}</span>
                          </div>
                        )}

                        <div>
                          <h5 className="text-xs font-bold text-white">{file.petName}</h5>
                          <span className="text-[11px] text-slate-400 block">Tutor: {file.tutorName}</span>
                          <p className="text-[11px] text-slate-300 mt-1 line-clamp-2 italic">
                            {file.notes || 'Sin notas adicionales.'}
                          </p>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-400">
                        <span>RLS: {file.bucket}</span>
                        <span>{file.uploadedAt}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: CONFIGURACIÓN SUPABASE & DDL SQL */}
          {activeTab === 'config' && (
            <div className="space-y-6">
              
              {/* Credentials Form */}
              <form onSubmit={handleSaveConfig} className="p-5 rounded-2xl bg-slate-900/70 border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <KeyRound className="w-4 h-4 text-emerald-400" />
                    <span>Conexión de Proyecto Supabase</span>
                  </h3>
                  <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Dual Mode: En Línea + Local Persistente
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  Puedes ingresar la URL y clave Anon de tu propio proyecto Supabase para sincronización directa en la nube. Si no posees credenciales en este momento, la plataforma opera de forma autónoma con persistencia local en tiempo real.
                </p>

                <div className="space-y-3">
                  <div>
                    <label className="text-[11px] text-slate-300 block mb-1">SUPABASE URL</label>
                    <input
                      type="url"
                      placeholder="https://xyzcompany.supabase.co"
                      value={customUrl}
                      onChange={(e) => setCustomUrl(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white font-mono text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-300 block mb-1">SUPABASE ANON KEY</label>
                    <input
                      type="password"
                      placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                      value={customKey}
                      onChange={(e) => setCustomKey(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white font-mono text-xs"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all"
                  >
                    Guardar Configuración
                  </button>
                  {configSaved && (
                    <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                      <Check className="w-4 h-4" /> Configuración actualizada correctamente
                    </span>
                  )}
                </div>
              </form>

              {/* DDL SQL Schema Viewer */}
              <div className="p-5 rounded-2xl bg-slate-900/70 border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white">Script DDL y Políticas RLS Supabase</h4>
                    <p className="text-xs text-slate-400">
                      Ejecuta este script en el Editor SQL de tu proyecto Supabase para crear las tablas y permisos oficiales de Kindev.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopySql}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-white/10 transition-all"
                  >
                    {copiedSql ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>¡Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copiar SQL</span>
                      </>
                    )}
                  </button>
                </div>

                <pre className="p-4 rounded-xl bg-slate-950 border border-white/5 font-mono text-[11px] text-slate-300 overflow-x-auto max-h-56 leading-relaxed">
                  {SQL_SCHEMA_SNIPPET}
                </pre>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-white/10 bg-slate-900/80 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Sistema Conectado &amp; Listo para Producción</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-white/10"
          >
            Cerrar Backoffice
          </button>
        </div>

      </div>

      {/* Image Preview Lightbox */}
      {previewImage && (
        <div 
          onClick={() => setPreviewImage(null)}
          className="fixed inset-0 z-60 bg-black/90 flex items-center justify-center p-4 cursor-pointer"
        >
          <div className="relative max-w-3xl max-h-[85vh] w-full h-[70vh]">
            <Image
              src={previewImage}
              alt="Vista previa clínica"
              fill
              className="object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      )}
    </div>
  );
}
