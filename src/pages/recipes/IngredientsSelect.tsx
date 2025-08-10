
import { useState, useEffect } from 'react';

import CategoryCard from '../../components/common/CategoryCard';
import Button from '../../components/common/Button';
import Alert from '../../components/common/Alert';
import IconWithTitle from "../../components/ui/IconWithTitle";

import { categories } from '../../data/Categories';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

function IngredientsSelect() {
    const navigate = useNavigate();
    const [selectedIngredientsData, setSelectedIngredientsData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const userType = 'free'; // TODO: obtener del contexto/estado global
    const maxIngredients = userType === 'free' ? 3 : 4;

    // Cargar ingredientes seleccionados del localStorage
    useEffect(() => {
        const savedIngredients = localStorage.getItem('selectedIngredients');
        if (savedIngredients) {
            const ingredientNames = JSON.parse(savedIngredients);

            // Buscar los datos completos de los ingredientes seleccionados
            const ingredientsData: any[] = [];
            categories.forEach(category => {
                category.products?.forEach(product => {
                    if (ingredientNames.includes(product.name)) {
                        ingredientsData.push(product);
                    }
                });
            });
            setSelectedIngredientsData(ingredientsData);
        }
    }, []);

    const handleProductClick = (product: any) => {
        // Remover ingrediente de la selección
        const savedIngredients = localStorage.getItem('selectedIngredients');
        if (savedIngredients) {
            const ingredientNames = JSON.parse(savedIngredients);
            const updatedNames = ingredientNames.filter((name: string) => name !== product.name);
            localStorage.setItem('selectedIngredients', JSON.stringify(updatedNames));

            // Actualizar el estado local
            setSelectedIngredientsData(prev => prev.filter(ing => ing.name !== product.name));
            toast.success(`${product.name} removido de tus ingredientes`);
        }
    };

    // Función para llamar a la API antes de navegar
    const handleSearchRecipes = async () => {
        if (selectedIngredientsData.length === 0) {
            toast.error('No tienes ingredientes seleccionados');
            return;
        }

        setIsLoading(true);
        try {
            // Obtener los nombres de los ingredientes seleccionados
            const ingredientNames = selectedIngredientsData.map(ingredient => ingredient.name);

            // TODO: Reemplazar con tu endpoint real
            const response = await fetch('/api/recipes/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ingredients: ingredientNames,
                    userType: userType,
                    maxResults: userType === 'free' ? 10 : 20
                })
            });

            if (response.ok) {
                const recipesData = await response.json();
                // Navegar a la página de recetas con los datos
                navigate('/app/recipes', {
                    state: {
                        recipes: recipesData,
                        ingredients: ingredientNames
                    }
                });
            } else {
                throw new Error('Error al buscar recetas');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error al buscar recetas. Intenta de nuevo.');
            // Por ahora, navegar de todas formas (fallback para desarrollo)
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
                        <IconWithTitle title={'Mis ingredientes'} url={'/app/cocina'} />
                        <div className="flex items-center justify-between">
                            <p className="text-text-primary">Ingredientes seleccionados</p>
                            <p className="text-sm text-gray-500">
                                {selectedIngredientsData.length}/{maxIngredients} seleccionados
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
                                            icon={ingredient.icon}
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
                        <div className="text-center">
                            <Alert
                                message='No has seleccionado ningún ingrediente.'
                                type='info'
                            />
                            <Button
                                label="Seleccionar ingredientes"
                                variant="outline"
                                size="medium"
                                onClick={() => navigate('/app/categories/recipes')}
                                className="mt-0"
                            />
                        </div>
                    )}
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                        label={isLoading
                            ? 'Buscando recetas...'
                            : selectedIngredientsData.length === 0
                                ? 'Selecciona al menos 1 ingrediente'
                                : `Buscar Recetas`
                        }
                        variant="secondary"
                        size="medium"
                        onClick={handleSearchRecipes}
                        disabled={selectedIngredientsData.length === 0 || isLoading}
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
                    {selectedIngredientsData.length > 0 && (
                        <p className="text-xs text-gray-500 mt-2 text-center">
                            Ingredientes: {selectedIngredientsData.map(ing => ing.name).join(', ')}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default IngredientsSelect;