import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import CategoryCard from '../../components/common/CategoryCard';
import IconWithTitle from "../../components/ui/IconWithTitle";

import { categories } from '../../data/Categories';

function Categories() {
    const navigate = useNavigate();

    const handleCategoryClick = useCallback((categoryId: string) => {
        // Navegar a la página de productos de la categoría
        navigate(`/category/${categoryId}`);
    }, [navigate]);

    return (
        <div className="min-h-screen px-4 py-6">
            <div className="max-w-6xl mx-auto px-4">
                {/* Header */}
                <div className="mb-8">
                    {/* Botón de regreso + Título */}
                    <IconWithTitle title={'Listas de compras'} url={`/list`} />
                    <p className="text-text-primary">Categorías</p>
                </div>
                {/* Grid de categorías */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {categories.map((category) => (
                        <CategoryCard
                            key={category.id}
                            id={category.id}
                            name={category.name}
                            icon={category.icon}
                            onClick={() => handleCategoryClick(category.id)}
                            className="aspect-square"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Categories;
