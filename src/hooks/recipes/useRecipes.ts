import { useRecipesStore } from '../../store/useRecipesStore';

export const useRecipes = () => {
  const {
    recipes,
    isLoading,
    error,
    lastSearchedIngredients,
    searchRecipes,
    clearError,
  } = useRecipesStore();

  const searchWithCurrentIngredients = async () => {
    const { getIngredients } = useRecipesStore.getState();
    const currentIngredients = getIngredients();
    
    if (currentIngredients.length === 0) {
      throw new Error('No hay ingredientes seleccionados');
    }
    
    await searchRecipes(currentIngredients);
  };

  const hasRecipes = () => {
    return recipes.length > 0;
  };

  const getRecipesCount = () => {
    return recipes.length;
  };

  const hasSearched = () => {
    return lastSearchedIngredients.length > 0;
  };

  const getLastSearchedIngredients = () => {
    return lastSearchedIngredients;
  };

  const canSearch = (ingredients: string[]) => {
    return ingredients.length > 0;
  };

  return {
    recipes,
    isLoading,
    error,
    lastSearchedIngredients,
    searchRecipes,
    searchWithCurrentIngredients,
    clearError,
    hasRecipes,
    getRecipesCount,
    hasSearched,
    getLastSearchedIngredients,
    canSearch,
  };
};

export default useRecipes;
