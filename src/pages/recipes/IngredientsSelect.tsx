
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import CategoryCard from '../../components/common/CategoryCard';
import Button from '../../components/common/Button';
import Alert from '../../components/common/Alert';
import IconWithTitle from "../../components/ui/IconWithTitle";

import { categories } from '../../data/Categories';

import { useRecipesManager } from '../../hooks/recipes/useRecipesManager';
import { useAuthStore } from '../../store/useAuthStore.ts';
import { isPremiumUser } from '../../services/auth/login';

interface product {
    id: string;
    name: string;
    svg: string;
}

function IngredientsSelect() {
    const { ingredients, recipes, searchRecipesWithSelectedIngredients, } = useRecipesManager();
    const { user } = useAuthStore();
    const isPremium = user ? isPremiumUser(user) : false; // Verificar si el usuario es premium
    const navigate = useNavigate();
    const [selectedIngredientsData, setSelectedIngredientsData] = useState<product[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const maxIngredients = isPremium ? 5 : 4;

    // Cargar datos completos de los ingredientes seleccionados
    useEffect(() => {
        const ingredientNames = ingredients.getIngredients();
        console.log('Ingredientes seleccionados:', ingredientNames);

        // Buscar los datos completos de los ingredientes seleccionados
        const ingredientsData: product[] = [];
        categories.forEach(category => {
            category.products?.forEach(product => {
                if (ingredientNames.includes(product.name)) {
                    ingredientsData.push(product);
                }
            });
        });
        setSelectedIngredientsData(ingredientsData);
    }, [ingredients.ingredients]); // Se actualiza cuando cambian los ingredientes

    const handleProductClick = (product: product) => {
        // Remover ingrediente de la selección
        ingredients.removeIngredient(product.name);
        toast.success(`${product.name} removido de tus ingredientes`);
    }

    // Función para buscar recetas
    const handleSearchRecipes = async () => {
        if (ingredients.isEmpty()) {
            toast.error('No tienes ingredientes seleccionados');
            return;
        }

        setIsLoading(true);
        try {
            await searchRecipesWithSelectedIngredients();
            
            // Navegar a la página de recetas (los ingredientes ya están guardados en lastSearchedIngredients)
            navigate('/app/recipes');
            
            // Limpiar ingredientes después de búsqueda exitosa
            ingredients.clearIngredients();
            toast.success('Búsqueda completada. Ingredientes limpiados para nueva búsqueda.');

        } catch (error) {
            console.error('Error:', error);
            toast.error('Error al buscar recetas. Intenta de nuevo.');
            // Fallback para desarrollo
            navigate('/app/recipes');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen px-4 py-6">
            <div className="max-w-6xl mx-auto px-4">
                {/* Header */}
                <div className="mb-8">
                    <div className="mb-6">
                        {/* Botón de regreso + Título */}
                        <IconWithTitle title={'Mis ingredientes'} url={'/app/categories/recipes'} />
                        <div className="flex items-center justify-between">
                            <p className="text-text-primary">Ingredientes seleccionados</p>
                            <p className="text-sm text-gray-500">
                                {ingredients.getIngredientsCount()}/{maxIngredients} seleccionados
                            </p>
                        </div>
                    </div>
                </div>
                {/* Ingredientes seleccionados */}
                <div className="rounded-lg p-8">
                    {selectedIngredientsData && selectedIngredientsData.length > 0 ? (
                        <>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {selectedIngredientsData.map((ingredient) => (
                                    <div key={ingredient.id} className="relative">
                                        <CategoryCard
                                            id={ingredient.id}
                                            name={ingredient.name}
                                            svg={ingredient.svg}
                                            onClick={() => handleProductClick(ingredient)}
                                            className="aspect-square ring-2 ring-green-500 bg-green-50"
                                        />
                                        {/* Indicador de seleccionado */}
                                        <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                                            ✓
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <p className="text-xs text-gray-500 mt-4 text-center">
                                Toca un ingrediente para removerlo de tu selección
                            </p>
                        </>
                    ) : (
                        <div className="text-center m-0">
                            <Alert
                                message='No has seleccionado ningún ingrediente.'
                                type='info'
                            />
                        </div>
                    )}
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                        label={isLoading
                            ? 'Generando recetas...'
                            : selectedIngredientsData.length === 0
                                ? 'Selecciona al menos 1 ingrediente'
                                : `Generar Recetas`
                        }
                        variant="secondary"
                        size="medium"
                        onClick={handleSearchRecipes}
                        disabled={ingredients.isEmpty() || isLoading || recipes.isLoading}
                        className="w-full"
                    />
                    {selectedIngredientsData.length < maxIngredients && (
                        <Button
                            label={'Agregar más ingredientes'}
                            variant="outline"
                            size="medium"
                            onClick={() => navigate('/app/categories/recipes')}
                            className="w-full"
                        />
                    )
                    }
                </div>
                {selectedIngredientsData.length > 0 && (
                    <p className="text-xs text-gray-500 mt-2 text-center">
                        Ingredientes: {selectedIngredientsData.map(ing => ing.name).join(', ')}
                    </p>
                )}
            </div>
        </div>
    );
}

export default IngredientsSelect;