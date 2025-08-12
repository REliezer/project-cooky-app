import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Recipe {
    id: string;
    title: string;
    ingredients: string[];
    instructions: string[];
    preparationTime?: number;
    difficulty?: 'easy' | 'medium' | 'hard';
    image?: string;
    [key: string]: any;
}

interface RecipesState {
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
    hasIngredient: (ingredientName: string) => boolean; //verificar si un ingrediente está seleccionado
    getIngredientsCount: () => number;
}

export const useRecipesStore = create<RecipesState>()(
    persist(
        (set, get) => ({
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
                    
                    set({ 
                        recipes: recipesData, 
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
                set({ ingredients: [], recipes: [], lastSearchedIngredients: [] });
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
                lastSearchedIngredients: state.lastSearchedIngredients 
            })
        }
    )
);

