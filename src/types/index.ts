// Main types export file

export interface User {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Interfaces de la API real - sincronizadas con useRecipesStore
export interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
  svg: string;
  is_optional: boolean;
}

export interface Step {
  order: number;
  step: string;
  time?: number;
}

//ya no se usara el atributo premium
export interface Recipe {
  name: string;
  description: string;
  ingredients: Ingredient[];
  steps: Step[];
  cooking_time?: number;
  servings?: number;
  dietary_info?: string[];
  difficulty?: 'easy' | 'medium' | 'hard';
  image?: string;
  sustitucion?: string;
  personalizacion?: string;
}

// Export component types
export * from './components';
