'use client';

import React, { useState, useId } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { 
  Calculator, 
  Flame, 
  Droplet, 
  Scale, 
  Activity, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  MessageCircle,
  ShieldAlert,
  Sliders,
  HeartPulse,
  ShoppingBag
} from 'lucide-react';
import { formatUSD, buildWhatsAppUrl } from '@/lib/utils';
import { PetProduct } from '@/lib/types';

interface SmartNutritionCalculatorProps {
  onSelectServiceForBooking: (serviceName: string) => void;
}

type PetType = 'perro' | 'gato' | 'exotico';
type AgeStage = 'cachorro' | 'adulto' | 'senior';
type ActivityLevel = 'sedentario' | 'moderado' | 'activo';
type HealthCondition = 'optimo' | 'renal' | 'gastro' | 'dermatologico' | 'articular';

export function SmartNutritionCalculator({ onSelectServiceForBooking }: SmartNutritionCalculatorProps) {
  const [petType, setPetType] = useState<PetType>('perro');
  const [weightKg, setWeightKg] = useState<number>(14);
  const [ageStage, setAgeStage] = useState<AgeStage>('adulto');
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>('moderado');
  const [healthCondition, setHealthCondition] = useState<HealthCondition>('optimo');

  const weightSliderId = useId();

  // Scientific calculation of Resting Energy Requirement (RER)
  // RER = 70 * (weightKg ^ 0.75)
  const rer = Math.round(70 * Math.pow(Math.max(weightKg, 0.5), 0.75));

  // Multiplier based on species, age, and activity
  let multiplier = 1.6;
  if (petType === 'gato') {
    multiplier = ageStage === 'cachorro' ? 2.0 : ageStage === 'senior' ? 1.1 : 1.2;
  } else if (petType === 'perro') {
    if (ageStage === 'cachorro') multiplier = 2.5;
    else if (ageStage === 'senior') multiplier = 1.3;
    else {
      multiplier = activityLevel === 'sedentario' ? 1.4 : activityLevel === 'activo' ? 2.0 : 1.6;
    }
  } else {
    multiplier = 1.0;
  }

  const dailyKcal = Math.round(rer * multiplier);
  const dailyGrams = Math.round(dailyKcal / 3.7);
  const dailyWaterMl = Math.round(weightKg * 55);

  // Monthly budget in USD for Pet Gourmet clinical formula
  const baseRatePerKgFoodUSD = 12; // USD per kg
  const monthlyKgFood = (dailyGrams * 30) / 1000;
  const estimatedMonthlyBudgetUSD = Math.max(18, Math.round(monthlyKgFood * baseRatePerKgFoodUSD));

  const formulaRecommendations: Record<HealthCondition, { name: string; tag: string; desc: string }> = {
    optimo: {
      name: 'Pet Gourmet Holístico Vitality Salmon & Sweet Potato',
      tag: 'Mantenimiento Óptimo & Longevidad',
      desc: 'Proteína salvaje deshidratada en frío con omegas 3 y 6 para piel y pelaje brillante.',
    },
    renal: {
      name: 'VetCare Renal Care Low-Phosphorus Formula',
      tag: 'Soporte Nefrológico Avanzado',
      desc: 'Nivel reducido de fósforo, proteína biológicamente controlada y citrato potásico.',
    },
    gastro: {
      name: 'GastroIntestinal Biome Prebiotic Complex',
      tag: 'Microbiota & Digestibilidad Alta',
      desc: 'Fibras activas de psyllium, electrolitos reforzados y glutamina regenerativa.',
    },
    dermatologico: {
      name: 'Derm Defense Hypoallergenic Single-Protein',
      tag: 'Cero Alérgenos & Barrera Cutánea',
      desc: 'Proteína de pato hidrolizada, zinc quelado y antioxidantes celulares.',
    },
    articular: {
      name: 'Mobility Joint Shield con Condroitina & MSM',
      tag: 'Cartílago & Libertad de Movimiento',
      desc: 'Glucosamina de origen marino, colágeno hidrolizado tipo II y cúrcuma bioactiva.',
    },
  };

  const currentRec = formulaRecommendations[healthCondition];

  const shareText = `Hola VetCare, realicé el cálculo nutricional para mi ${petType} (${weightKg} kg, ${ageStage}, condición: ${healthCondition}). Requerimiento: ${dailyKcal} kcal/día (${dailyGrams} g/día). Quisiera asesoría para adquirir: ${currentRec.name}.`;

  return (
    <section id="nutricion-calculator" className="py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Header Editorial */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-[#1A6B38] text-xs font-bold uppercase tracking-wider shadow-sm">
            <Calculator className="w-4 h-4 text-emerald-600" />
            <span>ALGORITMO BIOMÉTRICO VETERINARIO</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0D3D20] tracking-tight">
            Calculadora Nutricional &amp; Requerimiento Calórico
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Basada en ecuaciones clínicas oficiales WSAVA (World Small Animal Veterinary Association) para calcular la energía metabólica exacta que tu mascota necesita.
          </p>
        </div>

        {/* Dual Column Calculator Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Controls Column (lg:col-span-7) */}
          <div className="lg:col-span-7 rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-9 shadow-md space-y-8">
            
            {/* 1. Species selector */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                <span>1. Especie del Paciente</span>
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'perro', label: 'Canino (Perro)', icon: '🐕' },
                  { id: 'gato', label: 'Felino (Gato)', icon: '🐈' },
                  { id: 'exotico', label: 'Exótico (Conejo/Hurón)', icon: '🐇' },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setPetType(s.id as PetType)}
                    className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer ${
                      petType === s.id
                        ? 'bg-emerald-50 border-emerald-500 text-[#0D3D20] font-bold shadow-sm'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-2xl block mb-1">{s.icon}</span>
                    <span className="text-xs font-bold block">{s.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Weight slider */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label htmlFor={weightSliderId} className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                  <Scale className="w-4 h-4 text-emerald-600" />
                  <span>2. Peso Corporal Actual</span>
                </label>
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-[#0D3D20] text-sm font-extrabold font-mono">
                  {weightKg} kg ({Math.round(weightKg * 2.20462)} lbs)
                </span>
              </div>
              <input
                id={weightSliderId}
                type="range"
                min={petType === 'gato' ? 1 : petType === 'exotico' ? 0.5 : 2}
                max={petType === 'gato' ? 12 : petType === 'exotico' ? 8 : 70}
                step={0.5}
                value={weightKg}
                onChange={(e) => setWeightKg(parseFloat(e.target.value))}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1A6B38]"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>Mín: {petType === 'gato' ? '1 kg' : '2 kg'}</span>
                <span>Promedio Clínico</span>
                <span>Máx: {petType === 'gato' ? '12 kg' : '70 kg'}</span>
              </div>
            </div>

            {/* 3. Age & Activity Level Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Age Stage */}
              <div className="space-y-2.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Etapa de Vida
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['cachorro', 'adulto', 'senior'] as AgeStage[]).map((st) => (
                    <button
                      key={st}
                      onClick={() => setAgeStage(st)}
                      className={`py-2 px-1 text-xs rounded-xl border capitalize transition-all cursor-pointer ${
                        ageStage === st
                          ? 'bg-[#1A6B38] text-white border-[#1A6B38] font-bold shadow-sm'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Activity Level */}
              <div className="space-y-2.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Nivel de Actividad
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['sedentario', 'moderado', 'activo'] as ActivityLevel[]).map((act) => (
                    <button
                      key={act}
                      onClick={() => setActivityLevel(act)}
                      className={`py-2 px-1 text-xs rounded-xl border capitalize transition-all cursor-pointer ${
                        activityLevel === act
                          ? 'bg-[#1A6B38] text-white border-[#1A6B38] font-bold shadow-sm'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {act}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 4. Health Condition Target */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                <HeartPulse className="w-4 h-4 text-emerald-600" />
                <span>Objetivo Clínico o Condición Especial</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'optimo', label: 'Salud Óptima (Vital)' },
                  { id: 'renal', label: 'Cuidado Renal' },
                  { id: 'gastro', label: 'Digestivo Sensible' },
                  { id: 'dermatologico', label: 'Dermatológico' },
                  { id: 'articular', label: 'Articulaciones' },
                ].map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setHealthCondition(c.id as HealthCondition)}
                    className={`p-2.5 text-xs rounded-xl border text-left transition-all cursor-pointer ${
                      healthCondition === c.id
                        ? 'bg-amber-50 border-amber-300 text-amber-900 font-bold shadow-sm'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Results Column (lg:col-span-5) */}
          <div className="lg:col-span-5 rounded-3xl bg-gradient-to-br from-emerald-50 via-teal-50/50 to-white border border-emerald-200 p-6 sm:p-9 shadow-lg space-y-7">
            <div>
              <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider font-mono">
                Dictamen Nutricional Calculado
              </span>
              <h3 className="text-2xl font-extrabold text-[#0D3D20] mt-1">
                Prescripción Diaria Recomendada
              </h3>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 gap-3.5">
              <div className="p-4 rounded-2xl bg-white border border-emerald-100 shadow-sm space-y-1">
                <div className="flex items-center gap-1.5 text-amber-600 text-xs font-bold">
                  <Flame className="w-4 h-4" />
                  <span>Energía Diaria</span>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-[#0D3D20] font-sans">
                  {dailyKcal} <span className="text-xs font-normal text-slate-500">kcal</span>
                </div>
                <span className="text-[10px] text-slate-400 block">RER basal: {rer} kcal</span>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-emerald-100 shadow-sm space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-bold">
                  <Scale className="w-4 h-4" />
                  <span>Porción Diaria</span>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-[#1A6B38] font-sans">
                  {dailyGrams} <span className="text-xs font-normal text-slate-500">gramos</span>
                </div>
                <span className="text-[10px] text-slate-400 block">Dividir en 2 a 3 tomas</span>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-emerald-100 shadow-sm space-y-1">
                <div className="flex items-center gap-1.5 text-blue-600 text-xs font-bold">
                  <Droplet className="w-4 h-4" />
                  <span>Agua Mínima</span>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 font-sans">
                  {dailyWaterMl} <span className="text-xs font-normal text-slate-500">mL/día</span>
                </div>
                <span className="text-[10px] text-slate-400 block">Fresca y filtrada</span>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-emerald-100 shadow-sm space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-700 text-xs font-bold">
                  <Sparkles className="w-4 h-4" />
                  <span>Inversión Mensual</span>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-[#1A6B38] font-sans">
                  ${estimatedMonthlyBudgetUSD} <span className="text-xs font-normal text-slate-500">USD</span>
                </div>
                <span className="text-[10px] text-slate-400 block">Pet Gourmet Premium</span>
              </div>
            </div>

            {/* Recommended Product Formula */}
            <div className="p-4 rounded-2xl bg-white border border-emerald-200/80 shadow-sm space-y-2">
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 inline-block">
                {currentRec.tag}
              </span>
              <h4 className="text-sm font-bold text-slate-900 leading-snug">
                {currentRec.name}
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed font-normal">
                {currentRec.desc}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <a
                href={`https://wa.me/593991952889?text=${encodeURIComponent(shareText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-full bg-[#1A6B38] hover:bg-[#14532D] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Pedir Asesoría Nutricional por WhatsApp</span>
              </a>

              <button
                onClick={() => onSelectServiceForBooking('Consulta Nutricional y Dieta Personalizada')}
                className="w-full py-3 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Agendar Consulta con Nutricionista
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
