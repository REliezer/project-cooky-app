import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

import { categories } from '../../data/Categories';
import type { FormFieldConfig } from '../../types';

import Button from '../../components/common/Button';
import CategoryCard from '../../components/common/CategoryCard';
import Modal from '../../components/common/Modal';
import DynamicForm from '../../components/common/DynamicForm';
import Alert from '../../components/common/Alert';
import IconWithTitle from "../../components/ui/IconWithTitle";

interface CategoryProductsProps {
    title?: string;
    backUrl?: string;
    subtitle?: string;
}
function CategoryProducts({ title: propTitle, backUrl: propBackUrl, subtitle: propSubtitle }: CategoryProductsProps) {
    const { categoryId } = useParams<{ categoryId: string }>();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    
    // Obtener valores de URL params o usar props como fallback
    const title = searchParams.get('title') || propTitle || 'Listas de compras';
    const backUrl = searchParams.get('backUrl') || propBackUrl || '/app/categories';
    const subtitle = searchParams.get('subtitle') || propSubtitle || 'Categorías';
    
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    
    // Estados para selección de ingredientes (para recetas)
    const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
    const isForRecipes = backUrl === '/app/recipes';
    const userType = 'free'; // TODO: obtener del contexto/estado global
    const maxIngredients = userType === 'free' ? 3 : 4;

    const category = categories.find(cat => cat.id === categoryId);
    
    // Cargar ingredientes seleccionados del localStorage al montar el componente
    useEffect(() => {
        if (isForRecipes) {
            const savedIngredients = localStorage.getItem('selectedIngredients');
            if (savedIngredients) {
                const parsedIngredients = JSON.parse(savedIngredients);
                setSelectedIngredients(parsedIngredients);
                console.log('Ingredientes cargados del localStorage:', parsedIngredients);
            } else {
                setSelectedIngredients([]);
                console.log('No hay ingredientes guardados, iniciando array vacío');
            }
        }
    }, [isForRecipes]);
    
    // Ya no necesitamos este useEffect porque guardamos directamente en handleIngredientSelection

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

    const handleProductClick = (product: any) => {
        if (!isForRecipes) {
            // Modo lista de compras: abrir modal para agregar a la lista
            setSelectedProduct(product);
            setIsOpenModal(true);
        } else {
            // Modo recetas: manejar selección de ingredientes
            handleIngredientSelection(product);
        }
    };
    
    const handleIngredientSelection = (product: any) => {
        const currentIngredients = selectedIngredients;
        const isAlreadySelected = currentIngredients.includes(product.name);
        let newSelectedIngredients;
        
        if (isAlreadySelected) {
            // Si ya está seleccionado, lo removemos
            toast.success(`${product.name} removido de tus ingredientes`);
            newSelectedIngredients = currentIngredients.filter(name => name !== product.name);
        } else if (currentIngredients.length < maxIngredients) {
            // Si no está seleccionado y no hemos llegado al límite, lo agregamos
            toast.success(`${product.name} agregado como ingrediente`);
            newSelectedIngredients = [...currentIngredients, product.name];
            
            // Navegar a la página de ingredientes seleccionados después de un breve delay
            setTimeout(() => {
                navigate('/app/recipes/select');
            }, 500); // Pequeño delay para que el usuario vea el toast
            
        } else {
            // Si llegamos al límite, mostrar mensaje
            toast.error(`Solo puedes seleccionar ${maxIngredients} ingredientes. ${userType === 'free' ? 'Actualiza a Premium para más ingredientes.' : ''}`);
            return; // No hacer cambios
        }
        
        // Actualizar inmediatamente el estado y localStorage
        setSelectedIngredients(newSelectedIngredients);
        localStorage.setItem('selectedIngredients', JSON.stringify(newSelectedIngredients));
        
        console.log('Ingredientes guardados en localStorage:', newSelectedIngredients);
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
                                    {selectedIngredients.length}/{maxIngredients} seleccionados
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Contenido de productos */}
                <div className="rounded-lg p-8">
                    {category.products && category.products.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {category.products.map((product) => {
                                const isSelected = isForRecipes && selectedIngredients.includes(product.name);
                                const isDisabled = isForRecipes && !isSelected && selectedIngredients.length >= maxIngredients;
                                
                                return (
                                    <CategoryCard
                                        key={product.id}
                                        id={product.id}
                                        name={product.name}
                                        icon={product.icon}
                                        onClick={() => handleProductClick(product)}
                                        className={`aspect-square transition-all ${
                                            isSelected 
                                                ? 'ring-2 ring-green-500 bg-green-50' 
                                                : isDisabled 
                                                    ? 'opacity-50 cursor-not-allowed'
                                                    : 'hover:ring-2 hover:ring-[#461604]'
                                        }`}
                                    />
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
        </div>
    );
}

export default CategoryProducts;
