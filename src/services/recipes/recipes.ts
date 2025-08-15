// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_RECIPE_PATH = import.meta.env.VITE_API_RECIPES_URL;

if (!API_BASE_URL || !API_RECIPE_PATH) {
  throw new Error('API configuration is missing. Please check your environment variables.');
}

const RECIPES_ENDPOINT = `${API_BASE_URL}${API_RECIPE_PATH}/generate`;

import type { Recipe } from "../../store/useRecipesStore";
import { useAuthStore } from "../../store/useAuthStore";
import { findSvgByName } from "../../utils/ingredientSvg";

interface RecipesApiResponse {
  success: boolean;
  message?: string;
  data: {
    recipes: Recipe[];
      total: number;
      generation_time?: number;
    };
}

interface RecipesRequest {
  ingredients: string[];
  preferences?: {
    dietary_restrictions?: string[];
    difficulty?: 'easy' | 'medium' | 'hard';
    cooking_time_max?: number;
    servings?: number;
  };
}

// Función para obtener el token de autenticación
function getAuthToken(): string {
  const { token, isAuthenticated } = useAuthStore.getState();
  
  if (!isAuthenticated || !token) {
    throw new Error('Usuario no autenticado');
  }
  
  return token;
}

// Función principal para obtener recetas
export async function getRecipes(ingredients: string[]): Promise<Recipe[]> {
  if (!ingredients || ingredients.length < 2) {
    throw new Error('Debe proporcionar al menos dos ingredientes');
  }

  console.log('Buscando recetas con ingredientes:', ingredients);

  try {
    const token = getAuthToken();
    
    const requestBody: RecipesRequest = {
      ingredients: ingredients.map(ing => ing.trim().toLowerCase())
    };

    console.log('Enviando request a:', RECIPES_ENDPOINT);
    console.log('Request body:', requestBody);

    const response = await fetch(RECIPES_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      
      // Manejar diferentes tipos de errores HTTP
      switch (response.status) {
        case 401:
          throw new Error('Sesión expirada. Por favor, inicia sesión nuevamente.');
        case 403:
          throw new Error('No tienes permisos para generar recetas.');
        case 429:
          throw new Error('Demasiadas solicitudes. Espera un momento antes de intentar de nuevo.');
        case 500:
          throw new Error('Error del servidor. Intenta de nuevo más tarde.');
        default:
          throw new Error(`Error ${response.status}: No se pudieron obtener las recetas`);
      }
    }

    const data: RecipesApiResponse = await response.json();
    console.log('Respuesta completa de la API:', data);

    // Validar respuesta exitosa
    if (!data.success) {
      throw new Error(data.message || 'Error al procesar la solicitud de recetas');
    }

    // Extraer recetas de la API
    const recipes = data.data.recipes;
    console.log('Recipes found: ', recipes)
    console.log(`Se encontraron ${recipes.length} recetas`);
    
    // Asignar SVGs a ingredientes si no los tienen
    const processedRecipes = recipes.map(recipe => ({
      ...recipe,
      recipe_ingredients: recipe.recipe_ingredients.map(ingredient => ({
        ...ingredient,
        svg: ingredient.svg || findSvgByName(ingredient.name) // Asignar SVG si no existe
      }))
    }));
    
    return processedRecipes;

  } catch (error) {
    console.error('Error al obtener recetas:', error);
    
    if (error instanceof Error) {
      throw error;
    }
    
    throw new Error('Error inesperado al obtener recetas');
  }
}

// Función para obtener recetas con preferencias adicionales
export async function getRecipesWithPreferences(
  ingredients: string[],
  preferences: RecipesRequest['preferences']
): Promise<Recipe[]> {
  if (!ingredients || ingredients.length < 2) {
    throw new Error('Debe proporcionar al menos dos ingredientes');
  }

  try {
    const token = getAuthToken();
    
    const requestBody: RecipesRequest = {
      ingredients: ingredients.map(ing => ing.trim().toLowerCase()),
      preferences
    };

    console.log('Buscando recetas con preferencias:', requestBody);

    const response = await fetch(RECIPES_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText}`);
    }

    const data: RecipesApiResponse = await response.json();
    
    if (!data.success) {
      throw new Error(data.message || 'Error al obtener recetas con preferencias');
    }

    // Extraer y procesar recetas
    const recipes = data.data.recipes;
    
    // Asignar SVGs a ingredientes si no los tienen
    const processedRecipes = recipes.map(recipe => ({
      ...recipe,
      recipe_ingredients: recipe.recipe_ingredients.map(ingredient => ({
        ...ingredient,
        svg: ingredient.svg || findSvgByName(ingredient.name) // Asignar SVG si no existe
      }))
    }));
    
    return processedRecipes;

  } catch (error) {
    console.error('Error al obtener recetas con preferencias:', error);
    throw error;
  }
}

