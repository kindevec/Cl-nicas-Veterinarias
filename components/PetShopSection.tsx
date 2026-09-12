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
  ChevronRight
} from 'lucide-react';
import { PetProduct, ProductCategory, PetType } from '@/lib/types';
import { formatCOP, buildWhatsAppUrl } from '@/lib/utils';

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

  const flagshipProduct = filteredProducts[0] || products[0];
  const secondaryProducts = filteredProducts.filter((p) => p.id !== flagshipProduct?.id);

  return (
    <section id="petshop" className="py-20 md:py-28 relative bg-slate-950/70 border-y border-white/10 overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute bottom-10 left-10 w-[450px] h-[450px] bg-amber-500/10 rounded-full blur-3xl" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Editorial Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-bold tracking-wider uppercase">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>BOUTIQUE CLÍNICA &amp; PET GOURMET</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Nutrición de Grado Médico &amp; Farmacia Especializada
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl font-normal leading-relaxed">
              Fórmulas terapéuticas con respaldo clínico internacional, nutracéuticos de absorción biológica y snacks naturales sin preservantes artificiales.
            </p>
          </div>

          {/* Cart Status Button */}
          <button
            type="button"
            id="petshop-view-cart-btn"
            onClick={onOpenCart}
            className="self-start lg:self-auto flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-amber-400/15 hover:bg-amber-400/25 border border-amber-400/30 text-amber-300 text-xs font-bold transition-all shadow-lg shadow-black/40 group hover:scale-105 active:scale-95 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>Ver Carrito de Compras</span>
          </button>
        </div>

        {/* Dynamic Filters Bar */}
        <div className="space-y-4">
          
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                id="petshop-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por fórmula clínica, marca médica o ingrediente..."
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-amber-400/60 focus:bg-white/[0.06] transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Species Selector */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {PET_TYPES.map((type) => {
                const isActive = selectedPetType === type.id;
                return (
                  <button
                    key={type.id}
                    type="button"
                    id={`filter-pet-${type.id}`}
                    onClick={() => setSelectedPetType(type.id)}
                    className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-950'
                        : 'bg-white/[0.03] hover:bg-white/[0.06] text-slate-300 border border-white/10'
                    }`}
                  >
                    {type.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Category Capsule Tabs (Pill Tabs - Kindev Signature) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  id={`filter-cat-${cat.id}`}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-lg shadow-amber-950/50'
                      : 'bg-white/[0.03] hover:bg-white/[0.08] text-slate-300 border border-white/10 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

        </div>

        {/* ASYMMETRIC BENTO PRODUCT SHOWCASE */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 px-4 rounded-3xl bg-slate-900/40 border border-white/5">
            <PackageCheck className="w-12 h-12 text-slate-500 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-white">No encontramos productos con ese filtro</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              Prueba cambiando el término de búsqueda o seleccionando otra categoría.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('todos');
                setSelectedPetType('todos');
                setSearchQuery('');
              }}
              className="mt-4 px-5 py-2.5 rounded-2xl bg-white/[0.05] text-xs font-bold text-amber-300 border border-white/10"
            >
              Restablecer Filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* FLAGSHIP BENTO HIGHLIGHT (col-span-12 lg:col-span-6) */}
            {flagshipProduct && (
              <div className="lg:col-span-6 rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-amber-950/30 border border-amber-400/40 p-7 sm:p-9 flex flex-col justify-between backdrop-blur-xl shadow-2xl shadow-black/80 relative overflow-hidden group">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="px-3.5 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-black tracking-wider uppercase">
                      ⭐ FÓRMULA DESTACADA DEL MES
                    </span>
                    <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                      Disponibilidad Inmediata ({flagshipProduct.stock} uds)
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                    <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-950 border border-white/10">
                      <Image
                        src={flagshipProduct.image}
                        alt={flagshipProduct.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="space-y-3">
                      <span className="text-xs font-extrabold text-amber-400 uppercase tracking-wider block">
                        {flagshipProduct.brand}
                      </span>
                      <h3 className="text-xl font-extrabold text-white leading-tight">
                        {flagshipProduct.name}
                      </h3>
                      <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold">
                        <Star className="w-4 h-4 fill-amber-400" />
                        <span>{flagshipProduct.rating} / 5.0 (Valoración Médica)</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed font-normal">
                        {flagshipProduct.description}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Precio Boutique</span>
                    <span className="text-2xl font-black text-white">{formatCOP(flagshipProduct.price)}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <a
                      href={buildWhatsAppUrl(`Pedido de ${flagshipProduct.name} (${flagshipProduct.brand})`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs font-bold text-slate-200 border border-white/10 transition-all"
                    >
                      Pedir por WhatsApp
                    </a>

                    <button
                      type="button"
                      onClick={() => handleAdd(flagshipProduct)}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/25 flex items-center gap-2 active:scale-95 transition-all cursor-pointer"
                    >
                      {addedProductId === flagshipProduct.id ? (
                        <>
                          <Check className="w-4 h-4 stroke-[3]" />
                          <span>¡Agregado!</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4 stroke-[3]" />
                          <span>Añadir al Carrito</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* SECONDARY BENTO PRODUCTS (col-span-12 lg:col-span-6) */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {secondaryProducts.slice(0, 4).map((product) => {
                const isAdded = addedProductId === product.id;
                return (
                  <div
                    key={product.id}
                    id={`product-card-${product.id}`}
                    className="rounded-2xl bg-slate-900/70 border border-white/10 hover:border-amber-400/40 p-4 flex flex-col justify-between backdrop-blur-xl group transition-all"
                  >
                    <div>
                      <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-slate-950 mb-3 border border-white/5">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          referrerPolicy="no-referrer"
                        />
                        {product.badge && (
                          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[9px] font-black bg-amber-400 text-slate-950">
                            {product.badge}
                          </span>
                        )}
                      </div>

                      <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                        {product.brand}
                      </span>
                      <h4 className="text-xs font-bold text-white leading-snug line-clamp-2 mt-0.5">
                        {product.name}
                      </h4>
                      <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/5 mt-3 flex items-center justify-between">
                      <span className="text-xs font-black text-white">{formatCOP(product.price)}</span>
                      <button
                        type="button"
                        onClick={() => handleAdd(product)}
                        className={`p-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          isAdded
                            ? 'bg-emerald-500 text-slate-950'
                            : 'bg-white/[0.05] hover:bg-amber-400 hover:text-slate-950 text-white border border-white/10'
                        }`}
                      >
                        {isAdded ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Plus className="w-3.5 h-3.5 stroke-[3]" />}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
