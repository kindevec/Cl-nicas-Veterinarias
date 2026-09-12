import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCOP(amount: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(amount)
}

export const VETCARE_PHONE = '573108901234'

export function buildWhatsAppUrl(service: string = 'Urgencias 24/7', extraDetails?: string): string {
  const baseText = `Hola VetCare, necesito atención para mi mascota en el servicio de: [${service}].`
  const text = extraDetails ? `${baseText} ${extraDetails}` : baseText
  return `https://wa.me/${VETCARE_PHONE}?text=${encodeURIComponent(text)}`
}
