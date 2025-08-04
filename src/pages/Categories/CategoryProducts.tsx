import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'sonner';

import { categories } from '../../data/Categories';
import type { FormFieldConfig } from '../../types';

import Button from '../../components/common/Button';
import CategoryCard from '../../components/common/CategoryCard';
import Modal from '../../components/common/Modal';
import DynamicForm from '../../components/common/DynamicForm';
import Alert from '../../components/common/Alert';

function CategoryProducts() {
    const { categoryId } = useParams<{ categoryId: string }>();
    const navigate = useNavigate();

    const [isOpenModal, setIsOpenModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);

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
        navigate('/categories');
    };

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
        setSelectedProduct(product);
        setIsOpenModal(true);
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
        <div className="min-h-screen py-6">
            <div className="max-w-6xl mx-auto px-4">
                {/* Header */}
                <div className="mb-8">
                    <Button
                        label="← Volver"
                        onClick={handleGoBack}
                        variant="outline"
                        className="mb-4"
                    />
                    <div className="mb-4">
                        <h1 className="text-3xl font-bold text-text-primary">
                            Listas de compras
                        </h1>
                        <p className="text-text-primary">
                            {category.name}
                        </p>
                    </div>
                </div>

                {/* Contenido de productos */}
                <div className="rounded-lg p-8">
                    {category.products && category.products.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {category.products.map((product) => (
                                <CategoryCard
                                    key={product.id}
                                    id={product.id}
                                    name={product.name}
                                    icon={product.icon}
                                    onClick={() => handleProductClick(product)}
                                    className="aspect-square"
                                />
                            ))}
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
