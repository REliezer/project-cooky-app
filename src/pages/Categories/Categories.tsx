import { useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import CategoryCard from '../../components/common/CategoryCard';
import IconWithTitle from "../../components/ui/IconWithTitle";

import { categories } from '../../data/Categories';

interface CategoriesProps {
    title?: string;
    backUrl?: string;
    subtitle?: string;
}

function Categories({ title: propTitle, backUrl: propBackUrl, subtitle: propSubtitle }: CategoriesProps) {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    
    // Obtener valores de URL params o usar props como fallback
    const title = searchParams.get('title') || propTitle || 'Listas de compras';
    const backUrl = searchParams.get('backUrl') || propBackUrl || '/app/list';
    const subtitle = searchParams.get('subtitle') || propSubtitle || 'Categorías';

    const handleCategoryClick = useCallback((categoryId: string) => {
        // Navegar a la página de productos de la categoría, segun el contexto (listas o recetas)
        const isForRecipes = backUrl === '/app/recipe' || backUrl.includes('/recipe');
        console.log('Navigating to category:', categoryId, 'isForRecipes:', isForRecipes, 'backUrl:', backUrl);
        const basePath = isForRecipes ? '/app/category/recipes/' : '/app/category/';
        navigate(`${basePath}${categoryId}`);
    }, [navigate, backUrl]);

    console.log('CategoryProducts backUrl:', backUrl);
    return (
        <div className="min-h-screen px-4 py-6">
            <div className="max-w-6xl mx-auto px-4">
                {/* Header */}
                <div className="mb-8">
                    {/* Botón de regreso + Título */}
                    <IconWithTitle title={title} url={backUrl} />
                    <p className="text-text-primary">{subtitle}</p>
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
