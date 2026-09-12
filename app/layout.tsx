import type {Metadata, Viewport} from 'next';
import './globals.css';

export const viewport: Viewport = {
  themeColor: '#020617',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: 'VetCare & Pet Gourmet | Clínica Veterinaria 24/7 & Pet Shop Especializado',
  description: 'Atención médica veterinaria integral de urgencias 24/7, cirugía especializada, farmacia y nutrición gourmet para perros, gatos y exóticos. Desarrollado por Kindev.',
  openGraph: {
    title: 'VetCare & Pet Gourmet | Clínica Veterinaria 24/7 & Pet Shop Especializado',
    description: 'Atención médica veterinaria integral de urgencias 24/7, cirugía especializada, farmacia y nutrición gourmet para perros, gatos y exóticos.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VetCare & Pet Gourmet | Clínica Veterinaria 24/7 & Pet Shop Especializado',
    description: 'Atención médica veterinaria de urgencias 24/7 y pet shop gourmet especializado.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="es" className="dark scroll-smooth">
      <body className="bg-slate-950 text-slate-100 antialiased selection:bg-emerald-500/30 selection:text-emerald-300 min-h-screen" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
