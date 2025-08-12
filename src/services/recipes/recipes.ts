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
function getMockRecipes(ingredients: string[]): Recipe[] {
  const mockRecipes: Recipe[] = [
    {
      id: '1',
      title: `Receta con ${ingredients[0]}`,
      ingredients: [...ingredients, 'sal', 'pimienta', 'aceite'],
      instructions: [
        'Preparar los ingredientes',
        'Cocinar a fuego medio',
        'Servir caliente'
      ],
      preparationTime: 30,
      difficulty: 'easy',
      image: 'https://via.placeholder.com/300x200'
    },
    {
      id: '2',
      title: `Plato especial con ${ingredients.join(' y ')}`,
      ingredients: [...ingredients, 'cebolla', 'ajo', 'tomate'],
      instructions: [
        'Picar los vegetales',
        'Saltear en sartén',
        'Agregar condimentos',
        'Cocinar por 15 minutos'
      ],
      preparationTime: 45,
      difficulty: 'medium',
      image: 'https://via.placeholder.com/300x200'
    }
  ];

  // Simular delay de API
  return new Promise(resolve => {
    setTimeout(() => resolve(mockRecipes), 1000);
  }) as any;
}
