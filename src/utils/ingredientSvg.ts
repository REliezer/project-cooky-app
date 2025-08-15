import { categories } from '../data/Categories';

/**
 * Busca el SVG de un ingrediente por su nombre
 * Basado en la función findSvgByName de FavoriteIngredients.tsx
 * @param name - Nombre del ingrediente a buscar
 * @returns El SVG del ingrediente o un SVG por defecto si no se encuentra
 */
export function findSvgByName(name: string): string {
  for (const cat of categories) {
    for (const p of (cat.products ?? [])) {
      if (p.name.toLowerCase() === name.toLowerCase()) return p.svg;
    }
  }
  // SVG por defecto si no se encuentra
  return `<svg viewBox="0 0 24 24" width="24" height="24"><circle cx="12" cy="12" r="8" fill="#FFEDD5"/></svg>`;
}
