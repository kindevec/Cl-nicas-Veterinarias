import { CorporateTab } from './types';

export const VALID_TABS: CorporateTab[] = ['inicio', 'nosotros', 'servicios', 'petshop', 'citas'];

export const TAB_HASH_MAP: Record<string, CorporateTab> = {
  inicio: 'inicio',
  hero: 'inicio',
  home: 'inicio',
  nosotros: 'nosotros',
  clinica: 'nosotros',
  'la-clinica': 'nosotros',
  about: 'nosotros',
  hospital: 'nosotros',
  servicios: 'servicios',
  especialidades: 'servicios',
  'servicios-medicos': 'servicios',
  services: 'servicios',
  petshop: 'petshop',
  tienda: 'petshop',
  gourmet: 'petshop',
  'pet-shop': 'petshop',
  shop: 'petshop',
  citas: 'citas',
  contacto: 'citas',
  agendar: 'citas',
  calculadora: 'citas',
  'calculadora-nutricional': 'citas',
  reservas: 'citas',
  booking: 'citas',
};

export interface ParsedNavigation {
  tab: CorporateTab;
  subTarget?: string;
}

export function parseTabFromHash(hashString?: string): ParsedNavigation {
  if (!hashString) return { tab: 'inicio' };
  const raw = hashString.replace(/^#/, '').toLowerCase().trim();
  if (!raw) return { tab: 'inicio' };

  if (raw === 'calculadora' || raw === 'calculadora-nutricional') {
    return { tab: 'citas', subTarget: 'calculadora-nutricional' };
  }
  if (raw === 'agendar' || raw === 'reservas') {
    return { tab: 'citas', subTarget: 'agendar' };
  }

  const mappedTab = TAB_HASH_MAP[raw];
  if (mappedTab) {
    return { tab: mappedTab };
  }

  return { tab: 'inicio' };
}

export function getHashForTab(tab: CorporateTab, subTarget?: string): string {
  if (subTarget) return `#${subTarget}`;
  if (tab === 'inicio') return '#inicio';
  return `#${tab}`;
}

export function scrollToTarget(targetId?: string, offset = 80): void {
  if (typeof window === 'undefined') return;

  if (targetId) {
    const el = document.getElementById(targetId);
    if (el) {
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth',
      });
      return;
    }
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}
