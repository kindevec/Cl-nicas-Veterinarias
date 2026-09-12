'use client';

import React from 'react';

interface BrandLogoProps {
  className?: string;
  variant?: 'full' | 'isotipo' | 'compact';
  size?: 'sm' | 'md' | 'lg';
  theme?: 'light' | 'dark';
}

export function BrandLogo({ 
  className = '', 
  variant = 'full', 
  size = 'md',
  theme = 'light' 
}: BrandLogoProps) {
  const sizeClasses = {
    sm: { box: 'w-8 h-8', text: 'text-base', badge: 'text-[9px] px-1.5' },
    md: { box: 'w-10 h-10', text: 'text-lg', badge: 'text-[10px] px-2 py-0.5' },
    lg: { box: 'w-12 h-12', text: 'text-xl', badge: 'text-xs px-2.5 py-0.5' },
  }[size];

  const isLight = theme === 'light';

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Bespoke Geometric SVG Isotipo */}
      <div 
        className={`relative ${sizeClasses.box} rounded-2xl ${
          isLight 
            ? 'bg-gradient-to-br from-emerald-50 via-white to-teal-50 border border-emerald-200/80 shadow-md shadow-emerald-900/5' 
            : 'bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950/80 border border-emerald-500/30 shadow-lg'
        } p-0.5 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300`}
      >
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full p-1.5 relative z-10"
        >
          <defs>
            <linearGradient id="kindevVetCross" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1A6B38" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            <linearGradient id="kindevPetGourmet" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
            <radialGradient id="pawGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#34D399" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#34D399" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Glowing Backing */}
          <circle cx="20" cy="20" r="16" fill="url(#pawGlow)" />

          {/* Minimalist Veterinary Medical Cross */}
          <rect x="16.5" y="7" width="7" height="26" rx="3.5" fill="url(#kindevVetCross)" />
          <rect x="7" y="16.5" width="26" height="7" rx="3.5" fill="url(#kindevVetCross)" />

          {/* Organic Intersecting Paw Pad Detail */}
          <circle cx="20" cy="20" r="3.2" fill={isLight ? "#FFFFFF" : "#020617"} />
          
          {/* Golden Gourmet Pet Accent Nodes */}
          <circle cx="13" cy="13" r="2.2" fill="url(#kindevPetGourmet)" />
          <circle cx="27" cy="13" r="2.2" fill="url(#kindevPetGourmet)" />
          <circle cx="13" cy="27" r="1.8" fill="#10B981" />
          <circle cx="27" cy="27" r="1.8" fill="#10B981" />
        </svg>
      </div>

      {/* Typography with Contrast Hierarchy */}
      {variant !== 'isotipo' && (
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className={`${sizeClasses.text} font-black tracking-tight ${isLight ? 'text-[#0D3D20]' : 'text-white'} font-sans leading-none`}>
              Vet<span className="text-[#059669]">Care</span>
            </span>
            <span className={`${sizeClasses.badge} font-bold rounded-full ${
              isLight 
                ? 'bg-amber-100/80 text-amber-800 border border-amber-200' 
                : 'bg-amber-400/10 text-amber-300 border border-amber-400/30'
            } tracking-wider uppercase leading-none`}>
              PET GOURMET
            </span>
          </div>
          {variant === 'full' && (
            <span className={`text-[10px] sm:text-[11px] font-medium ${isLight ? 'text-slate-500' : 'text-slate-400'} tracking-wide mt-1`}>
              Clínica de Alta Complejidad &amp; Nutrición
            </span>
          )}
        </div>
      )}
    </div>
  );
}
