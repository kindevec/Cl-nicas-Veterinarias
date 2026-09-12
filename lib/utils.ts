import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatUSD(amount: number): string {
  // If the number was in thousands (legacy COP), convert to USD equivalent
  const normalized = amount > 1000 ? Math.round(amount / 3500) : amount;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(normalized)
}

// Backward compatibility alias
export const formatCOP = formatUSD;

export const KINDEV_PHONE = '593991952889'
export const VETCARE_PHONE = '593991952889'

export function buildWhatsAppUrl(service: string = 'Urgencias 24/7', extraDetails?: string): string {
  const baseText = `Hola Kindev / VetCare Gourmet, me contacto desde la web oficial para consultar sobre: [${service}].`
  const text = extraDetails ? `${baseText} ${extraDetails}` : baseText
  return `https://wa.me/${KINDEV_PHONE}?text=${encodeURIComponent(text)}`
}
