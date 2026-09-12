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

export const KINDEV_PHONE = '593991952889'
export const VETCARE_PHONE = '593991952889'

export function buildWhatsAppUrl(service: string = 'Urgencias 24/7', extraDetails?: string): string {
  const baseText = `Hola Kindev / VetCare, me contacto desde la demo web para solicitar información sobre: [${service}].`
  const text = extraDetails ? `${baseText} ${extraDetails}` : baseText
  return `https://wa.me/${KINDEV_PHONE}?text=${encodeURIComponent(text)}`
}
