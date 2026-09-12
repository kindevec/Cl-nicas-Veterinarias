import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAFBF7] text-slate-800 p-6 text-center">
      <span className="text-4xl mb-4">🐾</span>
      <h2 className="text-2xl font-bold text-[#0D3D20]">Página no encontrada</h2>
      <p className="mt-2 text-sm text-slate-600 max-w-md">
        Lo sentimos, la página que buscas no existe o ha sido reubicada.
      </p>
      <Link 
        href="/" 
        className="mt-6 px-6 py-2.5 bg-[#0D3D20] hover:bg-[#1A6B38] text-white rounded-full text-xs font-bold transition-all shadow-sm"
      >
        Volver a VetCare Gourmet
      </Link>
    </div>
  );
}