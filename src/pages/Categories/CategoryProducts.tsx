import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'sonner';

import { categories } from '../../data/Categories';
import type { FormFieldConfig } from '../../types';

import Button from '../../components/common/Button';
import CategoryCard from '../../components/common/CategoryCard';
import Modal from '../../components/common/Modal';
import DynamicForm from '../../components/common/DynamicForm';
import Alert from '../../components/common/Alert';
import IconWithTitle from "../../components/ui/IconWithTitle";

import { useIngredients } from '../../hooks/recipes/useIngredients';
import { useRecipesManager } from '../../hooks/recipes/useRecipesManager';

interface CategoryProductsProps {
    title?: string;
    backUrl?: string;
    subtitle?: string;
}

interface product {
    id: string;
    name: string;
    icon: string;
}

function CategoryProducts({ title: propTitle, backUrl: propBackUrl, subtitle: propSubtitle }: CategoryProductsProps) {
    const { hasIngredient, toggleIngredient, getIngredientsCount, canAddMore, isFull } = useIngredients();
    const { ingredients, recipes, searchRecipesWithSelectedIngredients, } = useRecipesManager();
    const { categoryId } = useParams<{ categoryId: string }>();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    // Obtener valores de URL params o usar props como fallback
    const title = searchParams.get('title') || propTitle || 'Listas de compras';
    const backUrl = searchParams.get('backUrl') || propBackUrl || '/app/categories';
    const subtitle = searchParams.get('subtitle') || propSubtitle || 'Categorías';

    const [isOpenModal, setIsOpenModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<product | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Estados para selección de ingredientes (para recetas)
    const isForRecipes = backUrl === '/app/recipes';
    const userType = 'free'; // TODO: obtener del contexto/estado global
    const maxIngredients = userType === 'free' ? 3 : 4;

    const category = categories.find(cat => cat.id === categoryId);

    const addProductFormFields: FormFieldConfig[] = [
        {
            name: 'count',
            type: 'number',
            label: 'Cantidad',
            placeholder: 'Cuanto ocupas',
            required: true,
            validation: {
                min: 1,
                max: 50
            }

        },
        {
            name: 'unidad',
            type: 'list',
            label: 'Unidad',
            placeholder: 'Selecciona una unidad',
            required: true,
            options: [
                { value: 'libra', label: 'Libra(s)' },
                { value: 'unidad', label: 'Unidad(es)' },
                { value: 'onza', label: 'Onza(s)' },
                { value: 'gramo', label: 'Gramo(s)' }
            ]
        }
    ]

    const handleGoBack = () => {
        navigate('/app/categories');
    };

    // Agregación de productos modo lista de compras
    const handleAddProduct = (formData: Record<string, string | number | boolean>) => {
        console.log('Producto agregado:', {
            product: selectedProduct,
            quantity: formData.count,
            unit: formData.unidad
        });
        setIsOpenModal(false);
        setSelectedProduct(null);
        toast.success('Producto agregado a la lista')
    };

    const handleProductClick = (product: product) => {
        if (!isForRecipes) {
            // Modo lista de compras: abrir modal para agregar a la lista
            setSelectedProduct(product);
            setIsOpenModal(true);
        } else {
            // Modo recetas: manejar selección de ingredientes
            handleIngredientSelection(product);
        }
    };

    const handleIngredientSelection = (product: product) => {
        const isAlreadySelected = hasIngredient(product.name);

        if (isAlreadySelected) {
            // Si ya está seleccionado, lo removemos
            toggleIngredient(product.name);
            toast.success(`${product.name} removido de tus ingredientes`);
        } else if (canAddMore(maxIngredients)) {
            // Si no está seleccionado y no hemos llegado al límite, lo agregamos
            toggleIngredient(product.name);
            toast.success(`${product.name} agregado como ingrediente`);

            // Navegar a la página de ingredientes seleccionados después de un breve delay
            setTimeout(() => {
                navigate('/app/recipes/select');
            }, 500); // Pequeño delay para que el usuario vea el toast

        } else {
            // Si llegamos al límite, mostrar mensaje
            toast.error(`Solo puedes seleccionar ${maxIngredients} ingredientes. ${userType === 'free' ? 'Actualiza a Premium para más ingredientes.' : ''}`);
            return; // No hacer cambios
        }
    };

    // Función para buscar recetas
    const handleSearchRecipes = async () => {
        if (ingredients.isEmpty()) {
            toast.error('No tienes ingredientes seleccionados');
            return;
        }

        setIsLoading(true);
        try {
            await searchRecipesWithSelectedIngredients();

            // Navegar a la página de recetas
            navigate('/app/recipes', {
                state: {
                    ingredients: ingredients.getIngredients()
                }
            });
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error al buscar recetas. Intenta de nuevo.');
            // Fallback para desarrollo
            navigate('/app/recipes');
        } finally {
            setIsLoading(false);
        }
    };

    if (!category) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        Categoría no encontrada
                    </h2>
                    <Button
                        label="Volver a categorías"
                        onClick={handleGoBack}
                        variant="primary"
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen px-4 py-6">
            <div className="max-w-6xl mx-auto px-4">
                {/* Header */}
                <div className="mb-8">
                    <div className="mb-6">
                        {/* Botón de regreso + Título */}
                        <IconWithTitle title={title} url={backUrl} />
                        <div className="flex items-center justify-between">
                            <p className="text-text-primary">{subtitle}</p>
                            {isForRecipes && (
                                <p className="text-sm text-gray-500">
                                    {getIngredientsCount()}/{maxIngredients} seleccionados
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Contenido de productos */}
                <div className="rounded-lg p-8">
                    {category.products && category.products.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 lg:gap-10">
                            {category.products.map((product) => {
                                const isSelected = isForRecipes && hasIngredient(product.name);
                                const isDisabled = isForRecipes && !isSelected && isFull(maxIngredients);

                                return (
                                    <div className='flex flex-col items-center' key={product.id}>
                                        <CategoryCard
                                            key={product.id}
                                            id={product.id}
                                            name={product.name}
                                            icon={product.icon}
                                            onClick={() => handleProductClick(product)}
                                            className={`aspect-square transition-all ${isSelected
                                                ? 'ring-2 ring-green-500 bg-green-50'
                                                : isDisabled
                                                    ? 'opacity-50 cursor-not-allowed'
                                                    : 'hover:ring-2 hover:ring-[#461604]'
                                                }`}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <Alert
                            message='No hay productos disponibles en esta categoría'
                            type='info'
                        />
                    )}
                </div>
            </div>
            {/* Modal para agregar un nuevo producto a la lista */}
            <Modal
                isOpen={isOpenModal}
                type='form'
                title={`Agregar producto: ${selectedProduct?.name || ''}`}
                onConfirm={() => { }} // Se maneja desde el formulario
                onCancel={() => setIsOpenModal(false)}
            >
                <DynamicForm
                    fields={addProductFormFields}
                    onSubmit={handleAddProduct}
                    submitButtonText="Agregar"
                    submitButtonVariant="secondary"
                    resetOnSubmit={true}
                    className="shadow-none p-0 m-0"
                >
                    <Button
                        label='Cancelar'
                        variant='outline'
                        onClick={() => setIsOpenModal(false)}
                    />
                </DynamicForm>
            </Modal>

            {isForRecipes && getIngredientsCount() > 0 && (
                <>
                    <Button
                        label='Buscar Recetas'
                        variant="secondary"
                        size="medium"
                        onClick={handleSearchRecipes}
                        disabled={ingredients.isEmpty() || isLoading || recipes.isLoading}
                        className="w-full"
                    />
                    <p className="text-xs text-gray-500 mt-2 text-center">
                        Ingredientes: {ingredients.getIngredients().join(', ')}
                    </p>
                </>
            )}
        </div>
    );
}

export default CategoryProducts;
