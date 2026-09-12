'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { 
  ShoppingBag, 
  Search, 
  Sparkles, 
  ShieldCheck, 
  Check, 
  Plus, 
  Filter, 
  Star,
  PackageCheck,
  Flame,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { PetProduct, ProductCategory, PetType } from '@/lib/types';
import { formatUSD, buildWhatsAppUrl } from '@/lib/utils';

interface PetShopSectionProps {
  products: PetProduct[];
  onAddToCart: (product: PetProduct) => void;
  onOpenCart: () => void;
}

const CATEGORIES: { id: ProductCategory; label: string }[] = [
  { id: 'todos', label: 'Todo el Catálogo' },
  { id: 'alimento', label: 'Dietas de Prescripción' },
  { id: 'farmacia', label: 'Farmacia & Nutracéuticos' },
  { id: 'snacks', label: 'Snacks 100% Mono-Proteicos' },
  { id: 'accesorios', label: 'Accesorios Médicos' },
];

const PET_TYPES: { id: 'todos' | PetType; label: string }[] = [
  { id: 'todos', label: 'Todas las Mascotas' },
  { id: 'perro', label: 'Caninos' },
  { id: 'gato', label: 'Felinos' },
  { id: 'exotico', label: 'Exóticos' },
];

export function PetShopSection({ products, onAddToCart, onOpenCart }: PetShopSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('todos');
  const [selectedPetType, setSelectedPetType] = useState<'todos' | PetType>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchCategory = selectedCategory === 'todos' || item.category === selectedCategory;
      const matchPetType = 
        selectedPetType === 'todos' || 
        item.petType === selectedPetType || 
        item.petType === 'todos';
      const matchSearch = 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchCategory && matchPetType && matchSearch;
    });
  }, [products, selectedCategory, selectedPetType, searchQuery]);

  const handleAdd = (product: PetProduct) => {
    onAddToCart(product);
    setAddedProductId(product.id);
    setTimeout(() => {
      setAddedProductId(null);
    }, 1200);
  };

  return (
    <section id="petshop" className="py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Editorial Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-slate-200 pb-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold tracking-wider uppercase shadow-sm">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>BOUTIQUE CLÍNICA &amp; NUTRICIÓN GOURMET</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0D3D20] tracking-tight">
              Nutrición de Grado Médico &amp; Farmacia Especializada
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-2xl leading-relaxed">
              Fórmulas terapéuticas con respaldo clínico veterinario, nutracéuticos de alta biodisponibilidad y alimentación holística sin preservantes artificiales.
            </p>
          </div>

          <button
            onClick={onOpenCart}
            className="self-start lg:self-auto inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-white border border-slate-200 hover:border-emerald-300 text-slate-800 text-xs font-bold shadow-sm hover:shadow-md transition-all cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-emerald-700" />
            <span>Ver Carrito de Compras</span>
          </button>
        </div>

        {/* Filters & Search Control Bar */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por alimento, marca o necesidad médica..."
                className="w-full pl-11 pr-4 py-3 rounded-full bg-white border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 shadow-sm transition-colors"
              />
            </div>

            {/* Species Selector Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
              {PET_TYPES.map((pt) => (
                <button
                  key={pt.id}
                  onClick={() => setSelectedPetType(pt.id)}
                  className={`px-3.5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    selectedPetType === pt.id
                      ? 'bg-[#0D3D20] text-white shadow-sm font-bold'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {pt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Category Selector Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#1A6B38] text-white font-bold shadow-md shadow-emerald-900/20'
                    : 'bg-white border border-slate-200/90 text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Catalog Grid (Clean Light Boutique Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const isAdded = addedProductId === product.id;
            return (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="rounded-3xl bg-white border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Product Image Stage */}
                  <div className="relative h-56 w-full bg-slate-50 overflow-hidden p-4 flex items-center justify-center">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      referrerPolicy="no-referrer"
                    />

                    {/* Product Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                      {product.badge && (
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[10px] font-bold shadow-sm">
                          {product.badge}
                        </span>
                      )}
                      {product.formulaVeterinaria && (
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-bold shadow-sm">
                          Fórmula Clínica
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Product Content Details */}
                  <div className="p-5 space-y-2.5">
                    <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                      <span>{product.brand}</span>
                      <div className="flex items-center gap-1 text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                        <span className="font-bold text-slate-700">{product.rating}</span>
                        <span className="text-[10px] text-slate-400">({product.reviewsCount})</span>
                      </div>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 leading-snug line-clamp-2">
                      {product.name}
                    </h4>

                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                      {product.description}
                    </p>
                  </div>
                </div>

                {/* Price & Action Bottom Bar */}
                <div className="p-5 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">Inversión:</span>
                    <span className="text-base font-extrabold text-[#0D3D20]">
                      {formatUSD(product.price)}
                    </span>
                  </div>

                  <button
                    onClick={() => handleAdd(product)}
                    className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm ${
                      isAdded
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#1A6B38] hover:bg-[#14532D] text-white hover:scale-105'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>¡Agregado!</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Añadir</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
