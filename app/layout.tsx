import type {Metadata, Viewport} from 'next';
import './globals.css';

export const viewport: Viewport = {
  themeColor: '#1A6B38',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://vetcaregourmet.web.app'),
  title: 'VetCare & Pet Gourmet | Clínica Veterinaria 24/7 & Nutrición Especializada',
  description: 'Atención médica veterinaria de alta precisión, urgencias 24/7, cirugía especializada, quirófano estéril y nutrición gourmet para perros, gatos y exóticos. Desarrollado por Kindev.',
  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png', sizes: '512x512' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/icon.png',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'VetCare & Pet Gourmet | Clínica Veterinaria 24/7 & Nutrición Especializada',
    description: 'Atención médica veterinaria de alta precisión, urgencias 24/7, cirugía especializada, quirófano estéril y nutrición gourmet especializada en Quito.',
    url: 'https://vetcaregourmet.web.app',
    siteName: 'VetCare & Pet Gourmet Hospital Veterinario',
    locale: 'es_EC',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'VetCare & Pet Gourmet Logo Oficial',
        type: 'image/png',
      },
      {
        url: '/og-image-square.png',
        width: 800,
        height: 800,
        alt: 'VetCare & Pet Gourmet Logo Cuadrado',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VetCare & Pet Gourmet | Clínica Veterinaria 24/7 & Nutrición Especializada',
    description: 'Atención médica veterinaria de alta precisión, urgencias 24/7, cirugía especializada y nutrición gourmet especializada en Quito.',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link rel="icon" type="image/png" sizes="512x512" href="/icon.png" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="alternate icon" href="/icon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="image_src" href="https://vetcaregourmet.web.app/og-image.png" />
        <meta itemProp="name" content="VetCare & Pet Gourmet | Clínica Veterinaria 24/7" />
        <meta itemProp="image" content="https://vetcaregourmet.web.app/og-image.png" />
        <meta property="og:image" content="https://vetcaregourmet.web.app/og-image.png" />
        <meta property="og:image:secure_url" content="https://vetcaregourmet.web.app/og-image.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="VetCare & Pet Gourmet - Logo Oficial" />
        <meta property="og:image" content="https://vetcaregourmet.web.app/og-image-square.png" />
        <meta property="og:image:secure_url" content="https://vetcaregourmet.web.app/og-image-square.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="800" />
        <meta name="twitter:image" content="https://vetcaregourmet.web.app/og-image.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-[#F8FAFC] text-slate-800 antialiased selection:bg-emerald-100 selection:text-emerald-900 min-h-screen" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
