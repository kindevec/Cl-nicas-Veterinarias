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
    sm: { box: 'w-8 h-8', text: 'text-xl font-black' },
    md: { box: 'w-10 h-10 sm:w-11 sm:h-11', text: 'text-2xl sm:text-3xl font-black' },
    lg: { box: 'w-12 h-12 sm:w-14 sm:h-14', text: 'text-3xl sm:text-4xl font-black' },
  }[size];

  const isLight = theme === 'light';

  return (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
      {/* Official Paw Favicon Emblem as Main Logo Isotipo */}
      <div 
        className={`relative ${sizeClasses.box} shrink-0 group-hover:scale-105 transition-transform duration-300 drop-shadow-sm`}
      >
        <svg 
          viewBox="0 0 512 512" 
          width="100%" 
          height="100%"
          className="w-full h-full block"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="logoBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0D3D20" />
              <stop offset="50%" stopColor="#1A6B38" />
              <stop offset="100%" stopColor="#0A5C36" />
            </linearGradient>

            <linearGradient id="logoPawGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#E6F7F0" />
            </linearGradient>

            <linearGradient id="logoGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FCD34D" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
          </defs>

          {/* Background Squircle Badge */}
          <rect 
            x="24" 
            y="24" 
            width="464" 
            height="464" 
            rx="120" 
            fill="url(#logoBgGrad)" 
            stroke="#10B981" 
            strokeWidth="14" 
            strokeOpacity="0.55" 
          />

          {/* Outer Dashed Accent Ring */}
          <circle 
            cx="256" 
            cy="256" 
            r="215" 
            fill="none" 
            stroke="#34D399" 
            strokeWidth="4" 
            strokeDasharray="18 12" 
            strokeOpacity="0.4" 
          />

          {/* Paw Print Group */}
          <g id="logo-paw-print">
            {/* Toe 1 (Far Left) */}
            <ellipse cx="140" cy="230" rx="34" ry="46" transform="rotate(-30 140 230)" fill="url(#logoPawGrad)" />
            <circle cx="140" cy="230" r="10" fill="url(#logoGoldGrad)" opacity="0.9" />

            {/* Toe 2 (Center-Left) */}
            <ellipse cx="208" cy="165" rx="38" ry="52" transform="rotate(-12 208 165)" fill="url(#logoPawGrad)" />

            {/* Toe 3 (Center-Right) */}
            <ellipse cx="304" cy="165" rx="38" ry="52" transform="rotate(12 304 165)" fill="url(#logoPawGrad)" />

            {/* Toe 4 (Far Right) */}
            <ellipse cx="372" cy="230" rx="34" ry="46" transform="rotate(30 372 230)" fill="url(#logoPawGrad)" />
            <circle cx="372" cy="230" r="10" fill="url(#logoGoldGrad)" opacity="0.9" />

            {/* Main Metacarpal Paw Pad */}
            <path 
              d="M 256 240 
                 C 210 240 165 270 165 325 
                 C 165 375 200 405 230 405 
                 C 245 405 252 396 256 396 
                 C 260 396 267 405 282 405 
                 C 312 405 347 375 347 325 
                 C 347 270 302 240 256 240 Z" 
              fill="url(#logoPawGrad)" 
            />

            {/* Medical Veterinary Cross Inside the Central Paw Pad */}
            <g id="logo-vet-cross" fill="#1A6B38">
              <rect x="244" y="285" width="24" height="68" rx="6" />
              <rect x="222" y="307" width="68" height="24" rx="6" />
              <circle cx="256" cy="319" r="4.5" fill="url(#logoGoldGrad)" />
            </g>
          </g>
        </svg>
      </div>

      {/* Clean, Large & Bold Typography (Zero cluttered subtext/badges) */}
      {variant !== 'isotipo' && (
        <span className={`${sizeClasses.text} tracking-tight font-sans leading-none flex items-center`}>
          <span className={isLight ? 'text-[#0D3D20]' : 'text-white'}>Vet</span>
          <span className={isLight ? 'text-[#1A6B38]' : 'text-emerald-400'}>Care</span>
        </span>
      )}
    </div>
  );
}
