interface CategoryCardProps {
    id: string;
    name: string;
    icon: string;
    onClick?: (categoryId: string) => void;
    className?: string;
}

function CategoryCard({ id, name, icon, onClick, className = "" }: CategoryCardProps) {
    const handleClick = () => {
        onClick?.(id);
    };

    return (
        <div 
            className={`bg-btn-secondary rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-orange-300 transition-colors duration-200 shadow-sm hover:shadow-md ${className}`}
            onClick={handleClick}
        >
            <div className="mb-3 flex items-center justify-center h-16 w-16 mx-auto">
                <img 
                    src={icon} 
                    alt={name} 
                    className="w-full h-full object-contain"
                    onError={(e) => {
                        // Fallback a emoji si la imagen falla
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling!.style.display = 'block';
                    }}
                />
                <div className="text-4xl hidden">{icon}</div>
            </div>
            <h3 className="text-text-primary font-medium text-center">
                {name}
            </h3>
        </div>
    );
}

export default CategoryCard;