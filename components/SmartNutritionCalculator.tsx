'use client';

import React, { useState, useId } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
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
import { formatCOP, buildWhatsAppUrl } from '@/lib/utils';
import { PetProduct } from '@/lib/types';

interface SmartNutritionCalculatorProps {
  onSelectServiceForBooking: (serviceName: string) => void;
  onAddToCart?: (product: PetProduct) => void;
}

type PetType = 'perro' | 'gato' | 'exotico';
type AgeStage = 'cachorro' | 'adulto' | 'senior';
type ActivityLevel = 'sedentario' | 'moderado' | 'activo';
type HealthCondition = 'optimo' | 'renal' | 'gastro' | 'dermatologico' | 'articular';

export function SmartNutritionCalculator({ onSelectServiceForBooking, onAddToCart }: SmartNutritionCalculatorProps) {
  const [petType, setPetType] = useState<PetType>('perro');
  const [weightKg, setWeightKg] = useState<number>(14);
  const [ageStage, setAgeStage] = useState<AgeStage>('adulto');
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>('moderado');
  const [healthCondition, setHealthCondition] = useState<HealthCondition>('optimo');
  
  // Interactive Before / After Slider state
  const [sliderPosition, setSliderPosition] = useState<number>(50);

  const weightSliderId = useId();
  const comparisonSliderId = useId();

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
  
  // Grams per day estimation (approx 3.7 kcal / gram of premium dry food)
  const dailyGrams = Math.round(dailyKcal / 3.7);

  // Daily water intake in ml (approx 50-60 ml per kg for dogs/cats)
  const dailyWaterMl = Math.round(weightKg * 55);

  // Estimated monthly cost in COP for Pet Gourmet formula
  const baseRatePerKgFood = 48000; // COP
  const monthlyKgFood = (dailyGrams * 30) / 1000;
  const estimatedMonthlyBudget = Math.round(monthlyKgFood * baseRatePerKgFood);

  // Suggested clinical product name based on condition
  const formulaRecommendations: Record<HealthCondition, { name: string; tag: string; desc: string }> = {
    optimo: {
      name: 'Royal Canin Veterinary Nutrition Care Adult',
      tag: 'Alta Digestibilidad & Inmunidad',
      desc: 'Proteínas L.I.P. de alto valor biológico para mantener masa muscular magra y flora intestinal balanceada.'
    },
    renal: {
      name: 'Hill\'s Prescription Diet k/d Kidney Care',
      tag: 'Soporte Renal Clínico',
      desc: 'Nivel controlado de fósforo y sodio con ácidos grasos EPA/DHA para reducir la sobrecarga glomerular.'
    },
    gastro: {
      name: 'Royal Canin Gastrointestinal High Energy',
      tag: 'Restauración de Mucosa Digestiva',
      desc: 'Fibras prebióticas fermentables (FOS y MOS) y alta densidad calórica para porciones reducidas.'
    },
    dermatologico: {
      name: 'Pro Plan Veterinary Diets HA Hydrolyzed',
      tag: 'Proteína Hidrolizada Hipoalergénica',
      desc: 'Péptidos de bajo peso molecular para anular reacciones inmunológicas y barrera dérmica con Omega 3.'
    },
    articular: {
      name: 'Purina Pro Plan JM Joint Mobility',
      tag: 'Condroprotección Avanzada',
      desc: 'Glucosamina, condroitín sulfato y colágeno hidrolizado tipo II para alivio articular y motilidad.'
    }
  };

  const currentRecommendation = formulaRecommendations[healthCondition];

  const whatsappMessage = `Hola VetCare, utilicé la Calculadora Smart para mi ${petType === 'perro' ? 'perro' : petType === 'gato' ? 'gato' : 'mascota exótica'} (${weightKg} kg, ${ageStage}, condición: ${healthCondition}). Kcal recomendadas: ${dailyKcal} kcal/día (${dailyGrams}g/día). Deseo cotizar la fórmula: ${currentRecommendation.name}.`;

  return (
    <section id="calculadora" className="py-20 md:py-28 relative overflow-hidden bg-slate-950/60 border-y border-white/10">
      
      {/* Ambient Lighting Orbs */}
      <div className="absolute top-1/3 right-0 w-[450px] h-[450px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 left-10 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-bold tracking-wider uppercase">
            <Sliders className="w-4 h-4" />
            <span>MÓDULO INTERACTIVO BESPOKE KINDEV</span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Calculadora Dinámica de <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">Nutrición &amp; Presupuesto</span>
          </h2>
          
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Ajusta en tiempo real los parámetros biométricos de tu mascota para calcular sus requerimientos calóricos exactos (RER/MER), dosificación y plan nutricional clínico.
          </p>
        </motion.div>

        {/* Dual Interactive Grid: Parameters on Left, Real-Time Result Telemetry on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Panel (lg:col-span-6) */}
          <div className="lg:col-span-6 rounded-3xl bg-slate-900/80 border border-white/10 p-6 sm:p-8 backdrop-blur-xl shadow-2xl shadow-black/60 space-y-6">
            
            {/* 1. Species Pill Tabs */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                1. Especie del Paciente
              </label>
              <div className="grid grid-cols-3 gap-2 p-1.5 rounded-2xl bg-slate-950 border border-white/10">
                {(['perro', 'gato', 'exotico'] as PetType[]).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => {
                      setPetType(type);
                      if (type === 'gato' && weightKg > 10) setWeightKg(4.5);
                      if (type === 'perro' && weightKg < 5) setWeightKg(15);
                    }}
                    className={`py-2 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
                      petType === type
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md shadow-emerald-500/20'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {type === 'perro' ? '🐶 Canino' : type === 'gato' ? '🐱 Felino' : '🦜 Exótico'}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Weight Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor={weightSliderId} className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  2. Peso Corporal Actual
                </label>
                <span className="text-sm font-black text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-xl border border-emerald-500/30">
                  {weightKg} kg ({Math.round(weightKg * 2.20462)} lbs)
                </span>
              </div>
              <input
                id={weightSliderId}
                type="range"
                min={petType === 'gato' ? 1 : 1}
                max={petType === 'gato' ? 12 : 55}
                step={0.5}
                value={weightKg}
                onChange={(e) => setWeightKg(parseFloat(e.target.value))}
                className="w-full h-2 rounded-lg bg-slate-950 appearance-none cursor-pointer accent-emerald-400"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>1 kg</span>
                <span>{petType === 'gato' ? '6 kg (Promedio)' : '25 kg (Promedio)'}</span>
                <span>{petType === 'gato' ? '12 kg' : '55 kg'}</span>
              </div>
            </div>

            {/* 3. Life Stage & Activity */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  3. Etapa de Vida
                </label>
                <div className="flex flex-col gap-1.5">
                  {(['cachorro', 'adulto', 'senior'] as AgeStage[]).map((stage) => (
                    <button
                      key={stage}
                      type="button"
                      onClick={() => setAgeStage(stage)}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold text-left border transition-all ${
                        ageStage === stage
                          ? 'bg-amber-400/20 border-amber-400 text-amber-300'
                          : 'bg-slate-950/60 border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      {stage === 'cachorro' ? 'Cachorro / Gatito (< 1 año)' : stage === 'adulto' ? 'Adulto (1 - 7 años)' : 'Senior (+ 7 años)'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  4. Nivel de Actividad
                </label>
                <div className="flex flex-col gap-1.5">
                  {(['sedentario', 'moderado', 'activo'] as ActivityLevel[]).map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setActivityLevel(lvl)}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold text-left border transition-all ${
                        activityLevel === lvl
                          ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                          : 'bg-slate-950/60 border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      {lvl === 'sedentario' ? 'Bajo / En Interiores' : lvl === 'moderado' ? 'Moderado (1 paseo/día)' : 'Alta Energía / Atleta'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 5. Health Condition Specifics */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                5. Condición Clínica / Requerimiento Especial
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { id: 'optimo', label: 'Mantenimiento Óptimo' },
                  { id: 'renal', label: 'Soporte Renal' },
                  { id: 'gastro', label: 'Gastrointestinal' },
                  { id: 'dermatologico', label: 'Hipoalergénico' },
                  { id: 'articular', label: 'Movilidad Articular' },
                ].map((cond) => (
                  <button
                    key={cond.id}
                    type="button"
                    onClick={() => setHealthCondition(cond.id as HealthCondition)}
                    className={`p-2.5 rounded-xl text-xs font-bold text-center border transition-all ${
                      healthCondition === cond.id
                        ? 'bg-gradient-to-r from-teal-500/20 to-emerald-500/20 border-emerald-400 text-white shadow-sm'
                        : 'bg-slate-950/60 border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    {cond.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Real-Time Live Results & Prescriptions (lg:col-span-6) */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Calculation Telemetry Bento Card */}
            <div className="rounded-3xl bg-gradient-to-br from-slate-900/90 to-slate-950 border border-emerald-500/40 p-6 sm:p-8 backdrop-blur-xl shadow-2xl shadow-black/80 space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Prescripción Nutricional RER/MER</h3>
                    <span className="text-xs text-slate-400 font-mono">Protocolo WSAVA &amp; NRC</span>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                  Cálculo en Vivo
                </span>
              </div>

              {/* 3 Realtime Key Numbers */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
                  <Flame className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                  <div className="text-xl sm:text-2xl font-black text-white">{dailyKcal}</div>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">kcal / día</span>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
                  <Scale className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
                  <div className="text-xl sm:text-2xl font-black text-emerald-400">{dailyGrams} g</div>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">ración diaria</span>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-center">
                  <Droplet className="w-5 h-5 text-teal-400 mx-auto mb-1" />
                  <div className="text-xl sm:text-2xl font-black text-teal-300">{dailyWaterMl} ml</div>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">agua / día</span>
                </div>
              </div>

              {/* Formula Recommendation Box */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                    FÓRMULA RECOMENDADA VETCARE
                  </span>
                  <span className="text-xs text-slate-400">{currentRecommendation.tag}</span>
                </div>
                <h4 className="text-base font-bold text-white">{currentRecommendation.name}</h4>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  {currentRecommendation.desc}
                </p>

                <div className="pt-2 flex items-center justify-between text-xs border-t border-white/5">
                  <span className="text-slate-400">Inversión mensual estimada:</span>
                  <span className="text-base font-extrabold text-amber-400">{formatCOP(estimatedMonthlyBudget)}</span>
                </div>
              </div>

              {/* One-Click Action Direct to WhatsApp or Cart */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href={buildWhatsAppUrl(whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 text-slate-950" />
                  <span>Pedir Fórmula por WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={() => onSelectServiceForBooking('Consulta Nutrición Clínica')}
                  className="py-3.5 px-5 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] text-white font-bold text-xs border border-white/10 transition-all flex items-center justify-center gap-2"
                >
                  <HeartPulse className="w-4 h-4 text-emerald-400" />
                  <span>Valoración Médica</span>
                </button>
              </div>

            </div>

            {/* COMPARADOR INTERACTIVO ANTES / DESPUÉS (Kindev Signature) */}
            <div className="rounded-3xl bg-slate-900/80 border border-white/10 p-6 backdrop-blur-xl shadow-2xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                    Impacto Clínico: Antes vs. Con Plan VetCare
                  </h4>
                </div>
                <span className="text-[11px] text-slate-400 font-mono">{sliderPosition}% Optimización</span>
              </div>

              {/* Before / After Split Slider Visual Container */}
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-950 border border-white/10 select-none">
                
                {/* Background "After" Image (Healthy, Shiny Fur, Active Dog) */}
                <Image
                  src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1000&q=80"
                  alt="Mascota con Plan Clínico VetCare"
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/70 via-transparent to-transparent" />
                <div className="absolute bottom-3 right-3 bg-emerald-500/90 text-slate-950 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider shadow-lg">
                  Con Plan Nutricional VetCare
                </div>

                {/* Foreground "Before" Image Clipped with slider */}
                <div 
                  className="absolute inset-0 overflow-hidden border-r-2 border-white shadow-2xl"
                  style={{ width: `${sliderPosition}%` }}
                >
                  <div className="absolute inset-0 w-full h-full">
                    <Image
                      src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1000&q=80"
                      alt="Mascota antes del tratamiento"
                      fill
                      className="object-cover grayscale brightness-75 contrast-125"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
                    <div className="absolute bottom-3 left-3 bg-slate-900/90 text-slate-300 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border border-white/10">
                      Antes (Dieta Genérica)
                    </div>
                  </div>
                </div>

                {/* Slider Handle Knob */}
                <div 
                  className="absolute top-0 bottom-0 -ml-3 w-6 flex items-center justify-center pointer-events-none"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="w-6 h-6 rounded-full bg-white text-slate-950 shadow-xl flex items-center justify-center text-[10px] font-black">
                    ↔
                  </div>
                </div>
              </div>

              {/* Slider Range Control */}
              <div className="space-y-1">
                <input
                  id={comparisonSliderId}
                  type="range"
                  min={10}
                  max={90}
                  value={sliderPosition}
                  onChange={(e) => setSliderPosition(parseInt(e.target.value))}
                  aria-label="Desliza para comparar antes y después de la nutrición clínica"
                  className="w-full h-2 rounded-lg bg-slate-950 appearance-none cursor-pointer accent-amber-400"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                  <span>← Desliza para comparar el antes y después en vitalidad, pelaje y digestión →</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
