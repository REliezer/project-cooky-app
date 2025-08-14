interface CategoryCardProps {
    id: string;
    name: string;
    svg: string;
    onClick?: (categoryId: string) => void;
    className?: string;
}

function CategoryCard({ id, name, svg, onClick, className = "" }: CategoryCardProps) {
    const handleClick = () => {
        onClick?.(id);
    };

    return (
        <div
            className={`bg-btn-secondary rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-orange-300 transition-colors duration-200 shadow-sm hover:shadow-md ${className}`}
            onClick={handleClick}
        >
            <div className="mb-3 flex items-center justify-center h-16 w-16 mx-auto">
                <div
                    className="w-full h-full flex-shrink-0"
                    dangerouslySetInnerHTML={{ __html: svg }}
                />
            </div>
            <h3 className="text-text-primary font-medium text-center">
                {name}
            </h3>
        </div>
    );
}

export default CategoryCard;