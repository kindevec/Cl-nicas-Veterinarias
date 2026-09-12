'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { 
  Search, 
  Sparkles, 
  Star,
  Truck,
  Shield,
  RotateCcw,
  Headphones,
  ArrowRight,
  MessageCircle,
  CheckCircle2,
  HeartPulse,
  Activity,
  ShieldCheck,
  ThermometerSnowflake,
  Heart
} from 'lucide-react';
import { PetProduct, ProductCategory } from '@/lib/types';
import { formatUSD, buildWhatsAppUrl } from '@/lib/utils';

interface PetShopSectionProps {
  products: PetProduct[];
}

const CATEGORIES: { id: ProductCategory; label: string }[] = [
  { id: 'todos', label: 'Todo el Catálogo' },
  { id: 'alimento', label: 'Dietas de Prescripción' },
  { id: 'farmacia', label: 'Farmacia & Nutracéuticos' },
  { id: 'snacks', label: 'Snacks 100% Mono-Proteicos' },
  { id: 'accesorios', label: 'Accesorios Médicos' },
];

export function PetShopSection({ products }: PetShopSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPathology, setSelectedPathology] = useState(0);

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchCategory = selectedCategory === 'todos' || item.category === selectedCategory;
      const matchSearch = 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchCategory && matchSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  return (
    <div className="w-full">
      {/* 1. TOP HERO BANNER with Photographic Canvas & Modern Transition */}
      <section className="relative w-full min-h-[480px] sm:min-h-[520px] pt-32 sm:pt-36 pb-16 flex flex-col justify-center overflow-hidden bg-[#0D3D20] text-white">
        {/* Modern Photographic Canvas with Seamless Transition (Zero Dividing Lines) */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {/* Full-bleed Image Layer */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1600&q=85"
              alt="Nutrición médica y alimentos gourmet para mascotas VetCare"
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

          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl lg:max-w-3xl space-y-4 text-left"
            >
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight drop-shadow-sm">
                Nutrición Médica, <span className="text-emerald-400">Dietas Prescritas</span> &amp; Pet Shop Gourmet
              </h1>

              <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed font-normal max-w-2xl">
                Alimentación biológica super premium, fármacos veterinarios regulados, nutracéuticos y accesorios ergonómicos certificados para el bienestar integral.
              </p>
            </motion.div>
        </div>
      </section>

      {/* 2. CATALOG & BEST SELLERS (Direct PetFood Layout, Zero Box-in-Box) */}
      <section className="py-16 sm:py-20 bg-[#FAFBF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Controls Bar: Search & Category Pills */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs transition-all whitespace-nowrap cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-[#0D3D20] text-white font-bold shadow-sm'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto justify-end">
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar producto o marca..."
                  className="w-full pl-9 pr-4 py-2.5 rounded-full bg-white border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 shadow-xs"
                />
              </div>
            </div>
          </motion.div>

          {/* Product Grid (Like Best Seller in PetFood reference - ZERO Box-in-Box, Full Edge-to-Edge Imagery) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product, idx) => {
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: (idx % 4) * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
                >
                  <div>
                    {/* Full-bleed Edge-to-Edge Image Header (ZERO padding, touches all borders like Doctor cards) */}
                    <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-slate-100">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                      
                      <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-md text-[#0D3D20] shadow-sm">
                          {product.category}
                        </span>
                        {product.formulaVeterinaria && (
                          <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 uppercase tracking-wider shadow-sm">
                            Rx Médica
                          </span>
                        )}
                      </div>

                      <div className="absolute bottom-2 left-2.5 flex items-center gap-1 text-amber-300 text-[10px] font-bold drop-shadow-sm">
                        <Star className="w-3 h-3 fill-amber-400 stroke-amber-400" />
                        <span>{product.rating}</span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-4 sm:p-5 space-y-1.5">
                      <span className="text-[10px] font-bold text-[#1A6B38] uppercase tracking-wider block">
                        {product.brand}
                      </span>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#1A6B38] transition-colors line-clamp-2 leading-snug">
                        {product.name}
                      </h3>
                      <p className="text-[11px] text-slate-500 line-clamp-2 leading-tight pt-0.5">
                        {product.description}
                      </p>
                    </div>
                  </div>

                  {/* Price & Action Section */}
                  <div className="p-4 sm:p-5 pt-0 flex items-center justify-between gap-2 border-t border-slate-100 mt-2">
                    <div>
                      <span className="text-[9px] text-slate-400 block font-medium">Precio:</span>
                      <span className="text-sm sm:text-base font-black text-[#0D3D20]">
                        {formatUSD(product.price)}
                      </span>
                    </div>

                    <a
                      href={buildWhatsAppUrl(`Cotizar Producto: ${product.name}`, `(Precio referencia: ${formatUSD(product.price)})`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0D3D20] hover:bg-[#1A6B38] text-white text-xs font-bold transition-all shadow-xs hover:scale-105 active:scale-95 cursor-pointer"
                      title={`Cotizar ${product.name} por WhatsApp`}
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Cotizar</span>
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* 3. SPECIAL OFFER 30% OFF BANNER (Full-Bleed Image: Top, Bottom & Left Edge without borders) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="rounded-[36px] bg-[#0D3D20] text-white overflow-hidden shadow-xl grid grid-cols-1 md:grid-cols-12 min-h-[360px] relative"
          >
            
            {/* Edge-to-edge Puppy Image covering top, bottom, and left without inner borders */}
            <div className="md:col-span-5 relative min-h-[280px] md:min-h-[380px] w-full overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1000&q=80"
                alt="Cachorro listo para su alimento"
                fill
                priority={false}
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 45vw"
                referrerPolicy="no-referrer"
              />
              {/* Subtle edge blend gradient transitioning seamlessly into green container */}
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-transparent via-transparent to-[#0D3D20]/90 md:to-[#0D3D20]" />
            </div>

            {/* Offer Headline & Action */}
            <div className="md:col-span-7 p-8 sm:p-12 lg:p-14 flex flex-col justify-center space-y-4 relative z-10 text-center md:text-left">
              <div>
                <span className="text-xs font-bold text-amber-300 uppercase tracking-widest block font-mono">
                  BENEFICIO EXCLUSIVO
                </span>
                <h3 className="text-3xl sm:text-4xl font-extrabold text-white mt-1 leading-tight">
                  Oferta Especial <span className="text-amber-300">30% OFF</span> en nutrición clínica
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-w-lg mx-auto md:mx-0">
                En tu primer pedido de dietas especializadas (renal, gastro o hipoalergénica) formuladas con ingredientes 100% biológicos y certificación médica veterinaria.
              </p>

              <div className="pt-2">
                <a
                  href={buildWhatsAppUrl('Solicitar 30% OFF en Nutrición Clínica')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <span>Comprar Ahora con Descuento</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

          </motion.div>

          {/* 4. VALUE PILLARS BAR (From PetFood reference footer) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="py-6 border-y border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-xs font-semibold text-slate-700"
          >
            <div className="flex items-center justify-center gap-2">
              <Truck className="w-4 h-4 text-[#1A6B38]" />
              <span>Envíos Rápidos en Quito</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Shield className="w-4 h-4 text-[#1A6B38]" />
              <span>Pago Seguro Certificado</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <RotateCcw className="w-4 h-4 text-[#1A6B38]" />
              <span>Garantía de Frescura</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Headphones className="w-4 h-4 text-[#1A6B38]" />
              <span>Soporte Médico 24/7</span>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 5. GUÍA INTERACTIVA DE NUTRICIÓN CLÍNICA POR PATOLOGÍA */}
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
              01 / ASESORÍA CLÍNICA DE PRESCRIPCIÓN
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0D3D20]">
              Guía Terapéutica por Condición Médica
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Selecciona la patología de tu mascota para conocer los nutrientes clínicos recomendados y las fórmulas certificadas por nuestros especialistas.
            </p>
          </motion.div>

          {/* Pathology Selector Pills */}
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {[
              { label: 'Salud Renal & Urinaria', icon: '💧' },
              { label: 'Sensibilidad Digestiva (IBD)', icon: '🌿' },
              { label: 'Alergias & Dermatología', icon: '✨' },
              { label: 'Control de Peso & Saciedad', icon: '⚖️' },
              { label: 'Condroprotección Articular', icon: '🦴' },
            ].map((pathology, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedPathology(idx)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  selectedPathology === idx
                    ? 'bg-[#0D3D20] text-white shadow-md scale-105'
                    : 'bg-[#FAFBF7] border border-slate-200/90 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>{pathology.icon}</span>
                <span>{pathology.label}</span>
              </button>
            ))}
          </div>

          {/* Detailed Pathology Card Showcase */}
          {(() => {
            const PATHOLOGY_DETAILS = [
              {
                condition: 'Insuficiencia Renal Crónica & Síndrome FLUTD',
                spec: 'Dietas formuladas con bajo fósforo quelado para frenar la progresión glomerular, citrato de potasio para regular el pH urinario y niveles altos de ácidos grasos EPA/DHA que estimulan la perfusión renal.',
                doctorNote: 'Dra. Sofía Rueda: "En pacientes renales, la nutrición representa el 70% del éxito en el control de la creatinina y la urea."',
                keyNutrients: ['Fósforo restringido (<0.4%)', 'Proteína de alta digestibilidad', 'Complejo Omega-3 marino', 'Antioxidantes celulares'],
                recommendedDiet: "Royal Canin Renal Feline / Canine o Hill's k/d Prescription Diet",
                quoteText: 'Cotizar Dieta Renal Especializada'
              },
              {
                condition: 'Sensibilidad Gastrointestinal, Vómito & Colitis (IBD)',
                spec: 'Fórmulas basadas en proteínas hidrolizadas de bajo peso molecular (Daltons reducidos) que evitan la reacción inmune entérica, adicionadas con prebióticos FOS/MOS y electrolitos para restablecer la microbiota.',
                doctorNote: 'Dra. Sofía Rueda: "Una dieta gastrointestinal adecuada corta la inflamación del epitelio intestinal en menos de 72 horas."',
                keyNutrients: ['Proteína hidrolizada', 'Prebióticos FOS & MOS', 'Alta densidad energética', 'Fibra de psyllium soluble'],
                recommendedDiet: "Hill's i/d Gastrointestinal o Royal Canin Gastrointestinal Low Fat",
                quoteText: 'Cotizar Dieta Digestiva'
              },
              {
                condition: 'Dermatología Atópica & Alergias Alimentarias',
                spec: 'Dietas monoproteicas con fuentes proteicas no convencionales (salmón biológico o proteína purificada de soya) enriquecidas con ácido gamma-linolénico (GLA) y ceramidas para sellar la barrera epidérmica.',
                doctorNote: 'Dra. Valentina Morales: "El prurito crónico suele erradicarse mediante dietas de eliminación estricta durante 8 semanas."',
                keyNutrients: ['Fuente monoproteica pura', 'Ratio Omega 6:3 (5:1)', 'Vitamina E & Zinc quelado', 'Cero trigo y cero soya cruda'],
                recommendedDiet: "Royal Canin Hypoallergenic o Pro Plan Veterinary Diets HA",
                quoteText: 'Cotizar Dieta Hipoalergénica'
              },
              {
                condition: 'Control de Peso, Obesidad & Manejo de Glucosa',
                spec: 'Fórmulas con elevado contenido de proteína magra y fibras voluminosas de baja fermentación que promueven la saciedad gástrica, combinadas con L-carnitina para estimular la beta-oxidación de grasas.',
                doctorNote: 'Dr. Carlos Mendoza: "Reducir un 10% de sobrepeso alivia la carga cardíaca y la presión sobre discos intervertebrales."',
                keyNutrients: ['L-Carnitina 300 mg/kg', 'Alto volumen de saciedad', 'Bajo índice glucémico', 'Condroprotectores integrados'],
                recommendedDiet: "Hill's Metabolic Weight Management o Royal Canin Satiety Support",
                quoteText: 'Cotizar Dieta de Control de Peso'
              },
              {
                condition: 'Soporte Articular, Displasia & Osteoartritis Geriátrica',
                spec: 'Suplementación de grado farmacéutico con glucosamina HCl, sulfato de condroitina de origen marino y colágeno hidrolizado tipo II no desnaturalizado (UC-II®) que frenan la degradación del cartílago hialino.',
                doctorNote: 'Dra. Valentina Morales: "La condroprotección continua devuelve la movilidad y las ganas de jugar a pacientes con artrosis."',
                keyNutrients: ['Glucosamina 1000 mg/kg', 'Sulfato de Condroitina', 'Colágeno no desnaturalizado UC-II', 'Mejillón de labio verde'],
                recommendedDiet: "Hill's j/d Joint Care o Suplemento Cosequin Maximum Strength",
                quoteText: 'Cotizar Dieta Articular'
              }
            ];

            const current = PATHOLOGY_DETAILS[selectedPathology];

            return (
              <motion.div
                key={selectedPathology}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="p-6 sm:p-8 rounded-3xl bg-[#FAFBF7] border border-slate-200/90 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
              >
                <div className="lg:col-span-8 space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-[#1A6B38] uppercase tracking-wider font-mono">
                      PROTOCOLO CLÍNICO SELECCIONADO
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-[#0D3D20]">
                      {current.condition}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {current.spec}
                  </p>

                  <div className="p-4 rounded-2xl bg-white border border-emerald-100 space-y-2">
                    <div className="text-xs font-bold text-[#1A6B38] flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#1A6B38]" />
                      <span>Nutrientes Clave de Alta Precisión:</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 font-medium">
                      {current.keyNutrients.map((nutr, nIdx) => (
                        <div key={nIdx} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                          <span>{nutr}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <blockquote className="text-xs italic text-slate-500 border-l-2 border-[#1A6B38] pl-3 py-0.5">
                    {current.doctorNote}
                  </blockquote>
                </div>

                <div className="lg:col-span-4 p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4 text-center flex flex-col justify-between h-full">
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Prescripción Recomendada
                    </span>
                    <h4 className="text-sm font-bold text-[#0D3D20] leading-snug">
                      {current.recommendedDiet}
                    </h4>
                    <span className="inline-block text-[10px] font-black px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 uppercase">
                      Fórmula Regulada Rx
                    </span>
                  </div>

                  <div className="pt-2">
                    <a
                      href={buildWhatsAppUrl(current.quoteText, `(Condición: ${current.condition})`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 px-4 rounded-2xl bg-[#0D3D20] hover:bg-[#1A6B38] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm flex items-center justify-center gap-2 hover:scale-[1.02] cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-400" />
                      <span>Consultar con Especialista</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })()}

        </div>
      </section>

      {/* 6. GARANTÍA DE CADENA DE FRÍO & SEGURIDAD FARMACÉUTICA */}
      <section className="py-16 sm:py-24 bg-white border-t border-slate-200/70 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-[10%] -right-[5%] w-[40%] h-[40%] rounded-full bg-emerald-50/50 blur-3xl" />
          <div className="absolute -bottom-[10%] -left-[5%] w-[40%] h-[40%] rounded-full bg-teal-50/50 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
            className="space-y-3 text-center max-w-3xl mx-auto"
          >
            <span className="text-sm font-bold text-[#1A6B38] uppercase tracking-wider font-mono">
              02 / TRAZABILIDAD Y BIOPROTECCIÓN
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0D3D20] tracking-tight">
              ¿Por Qué Comprar tus Fármacos y Dietas en VetCare?
            </h2>
            <p className="text-base sm:text-lg text-slate-500 leading-relaxed">
              Diferencias de grado hospitalario que protegen la salud real de tu mascota frente a tiendas convencionales.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              whileHover={{ y: -5 }}
              className="group rounded-3xl bg-[#FAFBF7] border border-slate-200/80 shadow-xs hover:shadow-xl transition-all overflow-hidden flex flex-col"
            >
              <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                <Image
                  src="https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=600&q=80"
                  alt="Cadena de Frío Rigurosa"
                  fill
                  referrerPolicy="no-referrer"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md text-white flex items-center justify-center border border-white/30">
                    <ThermometerSnowflake className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-bold text-white leading-snug flex-1">
                    Cadena de Frío Rigurosa
                  </h4>
                </div>
              </div>
              <div className="p-6 sm:p-8 flex-1 flex flex-col">
                <p className="text-sm text-slate-600 leading-relaxed">
                  Vacunas, insulinas y probióticos conservados con monitoreo térmico continuo (2°C a 8°C) y alarmas digitales 24 horas. Nunca pierden su potencia biológica.
                </p>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="group rounded-3xl bg-[#FAFBF7] border border-slate-200/80 shadow-xs hover:shadow-xl transition-all overflow-hidden flex flex-col"
            >
              <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                <Image
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80"
                  alt="Validación de Receta Médica"
                  fill
                  referrerPolicy="no-referrer"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md text-white flex items-center justify-center border border-white/30">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-bold text-white leading-snug flex-1">
                    Validación de Receta
                  </h4>
                </div>
              </div>
              <div className="p-6 sm:p-8 flex-1 flex flex-col">
                <p className="text-sm text-slate-600 leading-relaxed">
                  Cada pedido de medicación o alimento medicado es revisado por un veterinario para certificar dosis correcta, posología y evitar interacciones peligrosas.
                </p>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="group rounded-3xl bg-[#FAFBF7] border border-slate-200/80 shadow-xs hover:shadow-xl transition-all overflow-hidden flex flex-col"
            >
              <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                <Image
                  src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=600&q=80"
                  alt="Despacho Exprés Hospitalario"
                  fill
                  referrerPolicy="no-referrer"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md text-white flex items-center justify-center border border-white/30">
                    <Truck className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-bold text-white leading-snug flex-1">
                    Despacho Exprés
                  </h4>
                </div>
              </div>
              <div className="p-6 sm:p-8 flex-1 flex flex-col">
                <p className="text-sm text-slate-600 leading-relaxed">
                  Entrega rápida a domicilio en Quito urbano y valles. Envíos programados mensuales para que tu mascota nunca se quede sin su tratamiento médico continuo.
                </p>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

    </div>
  );
}
