'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CategoryItem {
  id: string;
  name: string;
  image: string;
  categoryTarget: string;
  tag: string;
}

const CATEGORY_ITEMS: CategoryItem[] = [
  {
    id: 'camas',
    name: 'Camas',
    image: 'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&w=500&q=85',
    categoryTarget: 'camas',
    tag: 'Ortopédicas & Relax',
  },
  {
    id: 'juguetes',
    name: 'Juguetes',
    image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=500&q=85',
    categoryTarget: 'juguetes',
    tag: 'Juego Interactivo',
  },
  {
    id: 'alimentacion',
    name: 'Alimentación',
    image: 'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?auto=format&fit=crop&w=500&q=85',
    categoryTarget: 'alimento',
    tag: 'Dietas Super Premium',
  },
  {
    id: 'higiene',
    name: 'Higiene & Spa',
    image: '/pet-shampoo-spa.jpg',
    categoryTarget: 'higiene',
    tag: 'Cuidado Dermato',
  },
  {
    id: 'paseo',
    name: 'Paseo',
    image: 'https://images.unsplash.com/photo-1608096299210-db7e38487075?auto=format&fit=crop&w=500&q=85',
    categoryTarget: 'accesorios',
    tag: 'Arneses & Correas',
  },
  {
    id: 'premios',
    name: 'Premios & Treats',
    image: 'https://images.unsplash.com/photo-1582798358481-d199fb7347bb?auto=format&fit=crop&w=500&q=85',
    categoryTarget: 'snacks',
    tag: '100% Naturales',
  },
  {
    id: 'dietas',
    name: 'Dietas Médicas',
    image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=500&q=85',
    categoryTarget: 'alimento',
    tag: 'Prescripción Clínica',
  },
  {
    id: 'farmacia',
    name: 'Farmacia & Cuidado',
    image: 'https://images.unsplash.com/photo-1535294435445-d7249524ef2e?auto=format&fit=crop&w=500&q=85',
    categoryTarget: 'farmacia',
    tag: 'Grado Hospitalario',
  },
  {
    id: 'rascadores',
    name: 'Rascadores & Torres',
    image: 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?auto=format&fit=crop&w=500&q=85',
    categoryTarget: 'rascador',
    tag: 'Enriquecimiento Felino',
  },
  {
    id: 'comederos',
    name: 'Comederos',
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=500&q=85',
    categoryTarget: 'comedero',
    tag: 'Ergonómicos 15°',
  },
  {
    id: 'transporte',
    name: 'Transporte & Viaje',
    image: 'https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=500&q=85',
    categoryTarget: 'transporte',
    tag: 'Mochilas & Cajas',
  },
  {
    id: 'dentales',
    name: 'Snacks Dentales',
    image: 'https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?auto=format&fit=crop&w=500&q=85',
    categoryTarget: 'dental',
    tag: 'Anti-Sarro Enzimático',
  },
  {
    id: 'suplementos',
    name: 'Condroprotectores',
    image: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=500&q=85',
    categoryTarget: 'farmacia',
    tag: 'Salud Articular',
  },
  {
    id: 'antipulgas',
    name: 'Antipulgas & Pipetas',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=500&q=85',
    categoryTarget: 'farmacia',
    tag: 'Protección Total',
  },
  {
    id: 'exoticos',
    name: 'Mascotas Exóticas',
    image: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=500&q=85',
    categoryTarget: 'alimento',
    tag: 'Heno & Recuperación',
  },
  {
    id: 'accesorios-pro',
    name: 'Arneses No-Pull',
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=500&q=85',
    categoryTarget: 'accesorios',
    tag: 'Paseo Sin Tirones',
  },
];

interface ProductCategoryCarouselProps {
  onNavigate?: (sectionId: string, subTarget?: string) => void;
}

export function ProductCategoryCarousel({ onNavigate }: ProductCategoryCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);
  const hasMoved = useRef(false);

  const checkScrollLimits = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    checkScrollLimits();
    el.addEventListener('scroll', checkScrollLimits, { passive: true });
    window.addEventListener('resize', checkScrollLimits);
    return () => {
      el.removeEventListener('scroll', checkScrollLimits);
      window.removeEventListener('resize', checkScrollLimits);
    };
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const scrollAmount = Math.min(el.clientWidth * 0.75, 420);
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    isDragging.current = true;
    hasMoved.current = false;
    startX.current = e.pageX - scrollContainerRef.current.offsetLeft;
    scrollLeftStart.current = scrollContainerRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollContainerRef.current) return;
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    if (Math.abs(walk) > 6) {
      hasMoved.current = true;
    }
    scrollContainerRef.current.scrollLeft = scrollLeftStart.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDragging.current = false;
  };

  const handleCategoryClick = (item: CategoryItem) => {
    if (hasMoved.current) return;
    if (onNavigate) {
      onNavigate('petshop', item.categoryTarget);
    } else {
      const shopEl = document.getElementById('petshop');
      if (shopEl) {
        shopEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="relative w-full bg-[#FAFBF7] py-5 sm:py-7 overflow-hidden select-none">
      <div className="w-full relative px-2 sm:px-6">
        
        {/* Flecha Izquierda — Se mueve ÚNICAMENTE al hacer clic */}
        <button
          type="button"
          onClick={() => handleScroll('left')}
          disabled={!canScrollLeft}
          aria-label="Mover carrusel a la izquierda"
          className={`absolute left-2 sm:left-4 top-[40%] -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 backdrop-blur-md border border-stone-200 shadow-md flex items-center justify-center text-stone-800 transition-all cursor-pointer ${
            canScrollLeft
              ? 'hover:bg-[#2F4635] hover:text-white hover:scale-105 active:scale-95 opacity-100'
              : 'opacity-30 cursor-not-allowed'
          }`}
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Flecha Derecha — Se mueve ÚNICAMENTE al hacer clic */}
        <button
          type="button"
          onClick={() => handleScroll('right')}
          disabled={!canScrollRight}
          aria-label="Mover carrusel a la derecha"
          className={`absolute right-2 sm:right-4 top-[40%] -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 backdrop-blur-md border border-stone-200 shadow-md flex items-center justify-center text-stone-800 transition-all cursor-pointer ${
            canScrollRight
              ? 'hover:bg-[#2F4635] hover:text-white hover:scale-105 active:scale-95 opacity-100'
              : 'opacity-30 cursor-not-allowed'
          }`}
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Contenedor desplazable de ancho completo (Scroll horizontal con soporte de arrastre) */}
        <div
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          className="flex items-start gap-6 sm:gap-8 md:gap-10 overflow-x-auto scroll-smooth px-8 sm:px-16 lg:px-20 py-2 cursor-grab active:cursor-grabbing [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {CATEGORY_ITEMS.map((item) => (
            <div
              key={item.id}
              onClick={() => handleCategoryClick(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCategoryClick(item);
                }
              }}
              className="flex flex-col items-center shrink-0 cursor-pointer group transition-all duration-200 active:scale-95 focus:outline-hidden"
              title={`Ver productos de ${item.name}`}
            >
              {/* Círculo de Producto — Imagen a borde completo sin márgenes ni bordes */}
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 rounded-full overflow-hidden shadow-xs group-hover:shadow-lg group-hover:scale-105 transition-all duration-300 ring-2 ring-transparent group-hover:ring-[#2F4635]/25">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 96px, (max-width: 768px) 128px, 160px"
                  className="object-cover object-center group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Título de la categoría */}
              <span className="mt-2.5 text-xs sm:text-sm md:text-base font-bold text-[#1E2E22] group-hover:text-[#2F4635] text-center tracking-tight transition-colors">
                {item.name}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}