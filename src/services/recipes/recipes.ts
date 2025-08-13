import { recetas } from "../../data/Recipes";

// Usar las interfaces del store para ser consistentes
interface Ingredient {
  id: number;
  ingredientName: string;
  amount: string;
  icon: string;
}

interface instruction {
  number: number;
  description: string;
  time?: string;
}

interface Recipe {
  id: string;
  title: string;
  ingredients: Ingredient[];
  instructions: instruction[];
  preparationTime?: number;
  difficulty?: 'easy' | 'medium' | 'hard';
  image?: string;
  sustitucion?: string;
  personalizacion?: string;
  aiTag?: string;
}
interface RecipesResponse {
  recipes: Recipe[];
  totalRecipes: number;
}

export async function getRecipes(ingredients: string[]): Promise<Recipe[]> {
  console.log('Ingredients to search:', ingredients);
  try {
    // En desarrollo usamos datos mock
    if (import.meta.env.DEV) {
      return getMockRecipes();
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
function getMockRecipes(): Promise<Recipe[]> {
  // Adaptar las recetas al formato esperado
  const adaptedRecipes: Recipe[] = recetas.map(receta => ({
    id: receta.id.toString(),
    title: receta.recipetitle,
    ingredients: receta.ingredientesList,
    instructions: receta.instructions.map(inst => ({
      number: inst.numero,
      description: inst.description,
      time: inst.time,
    })),
    preparationTime: parseInt(receta.preparationTime) || 30,
    difficulty: receta.difficulty.toLowerCase() as 'easy' | 'medium' | 'hard',
    image: receta.image,
    // Propiedades adicionales del formato original
    premium: receta.premium,
    coincidencia: receta.coincidencia,
    sustitucion: receta.sustitucion,
    personalizacion: receta.personalizacion,
    aiTag: receta.aiTag || 'AI Optimized',
  }));

  // Simular delay de API
  return new Promise(resolve => {
    setTimeout(() => resolve(adaptedRecipes), 1000);
  });
}
