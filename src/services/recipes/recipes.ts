import { recetas } from "../../data/Recipes";

interface Recipe {
  id: string;
  title: string;
  ingredients: string[];
  instructions: string[];
  preparationTime?: number;
  difficulty?: 'easy' | 'medium' | 'hard';
  image?: string;
  sustitucion?: string;
  personalizacion?: string;
  [key: string]: any;
}

interface RecipesResponse {
  recipes: Recipe[];
  totalRecipes: number;
}

export async function getRecipes(ingredients: string[]): Promise<Recipe[]> {
  try {
    // En desarrollo usamos datos mock
    if (import.meta.env.DEV) {
      return getMockRecipes(ingredients);
    }

    const response = await fetch('url', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${token}`
      },
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data: RecipesResponse = await response.json();
    return data.recipes;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
}

// Función para datos mock durante desarrollo
function getMockRecipes(ingredients: string[]): Promise<Recipe[]> {
  // Adaptar las recetas al formato esperado
  const adaptedRecipes: Recipe[] = recetas.map(receta => ({
    id: receta.id.toString(),
    title: receta.recipetitle,
    ingredients: receta.ingredientes,
    instructions: receta.instructions.map(inst => inst.description),
    preparationTime: parseInt(receta.preparationTime) || 30,
    difficulty: receta.difficulty.toLowerCase() as 'easy' | 'medium' | 'hard',
    image: receta.image,
    // Propiedades adicionales del formato original
    premium: receta.premium,
    coincidencia: receta.coincidencia,
    sustitucion: receta.sustitucion,
    personalizacion: receta.personalizacion,
  }));

  // Simular delay de API
  return new Promise(resolve => {
    setTimeout(() => resolve(adaptedRecipes), 1000);
  });
}
