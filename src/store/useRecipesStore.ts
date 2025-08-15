import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Función para generar ID único para recetas
function generateRecipeId(): string {
  return `recipe_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Función para agregar IDs a recetas que no los tienen
function assignRecipeIds(recipes: Omit<Recipe, 'idRecipe'>[]): Recipe[] {
  return recipes.map(recipe => ({
    ...recipe,
    idRecipe: generateRecipeId()
  }));
}

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

export interface Recipe {
    idRecipe: string;
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

interface RecipesState {
    success: boolean;
    message?: string;
    recipes: Recipe[];
    isLoading: boolean;
    error: string | null;
    ingredients: string[];
    lastSearchedIngredients: string[];
    searchRecipes: (ingredients: string[]) => Promise<void>;
    addIngredient: (ingredientName: string) => void;
    getIngredients: () => string[];
    removeIngredient: (ingredientName: string) => void;
    clearIngredients: () => void;
    clearError: () => void;
    hasIngredient: (ingredientName: string) => boolean;
    getIngredientsCount: () => number;
}

export const useRecipesStore = create<RecipesState>()(
    persist(
        (set, get) => ({
            success: false,
            message: '',
            recipes: [],
            isLoading: false,
            error: null,
            ingredients: [],
            lastSearchedIngredients: [],

            searchRecipes: async (ingredients: string[]) => {
                if (ingredients.length === 0) {
                    set({ error: 'Debes seleccionar al menos un ingrediente' });
                    return;
                }

                set({ isLoading: true, error: null, lastSearchedIngredients: ingredients });

                try {
                    const { getRecipes } = await import('../services/recipes/recipes');
                    const recipesData = await getRecipes(ingredients);

                    // Asignar IDs únicos a cada receta que venga de la API
                    const recipesWithIds = assignRecipeIds(recipesData);

                    set({
                        recipes: recipesWithIds,
                        isLoading: false,
                        error: null
                    });
                } catch (error) {
                    console.error('Error searching recipes:', error);
                    set({
                        error: error instanceof Error ? error.message : 'Error al buscar recetas',
                        isLoading: false,
                        recipes: []
                    });
                }
            },

            addIngredient: (ingredientName) => {
                const currentIngredients = get().ingredients;
                if (!currentIngredients.includes(ingredientName)) {
                    set(state => ({
                        ingredients: [...state.ingredients, ingredientName]
                    }));
                }
            },

            getIngredients: () => {
                return get().ingredients;
            },

            removeIngredient: (ingredientName) => {
                set(state => ({
                    ingredients: state.ingredients.filter(ing => ing !== ingredientName)
                }));
            },

            clearIngredients: () => {
                set({ ingredients: [] });
            },

            clearError: () => {
                set({ error: null });
            },

            hasIngredient: (ingredientName) => {
                return get().ingredients.includes(ingredientName);
            },

            getIngredientsCount: () => {
                return get().ingredients.length;
            }
        }),
        {
            name: 'recipes-storage',
            partialize: (state) => ({
                ingredients: state.ingredients,
                lastSearchedIngredients: state.lastSearchedIngredients,
                recipes: state.recipes
            })
        }
    )
);

