import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import CategoryCard from '../../components/common/CategoryCard';
import { categories } from '../../data/Categories';

function Categories() {
    const navigate = useNavigate();
    
    const handleCategoryClick = useCallback((categoryId: string) => {
        // Navegar a la página de productos de la categoría
        navigate(`/category/${categoryId}`);
    }, [navigate]);

    return (
        <div className="min-h-screen py-6">
            <div className="max-w-6xl mx-auto px-4">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-text-primary mb-2">
                        Listas de compras
                    </h1>
                    <p className="text-text-primary">
                        Categorías
                    </p>
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
