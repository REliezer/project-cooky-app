import type { JSX } from "react";
import type { ListCardProps } from "../../types";

function ListCard({ nameList, description, date, itemsList, onDelete, onClick }: ListCardProps): JSX.Element {
    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (onDelete) {
            onDelete();            
        }
    };

    return (
        <div 
            className="flex flex-row justify-between items-start bg-bg-secondary w-full h-fit border-1 rounded-lg shadow-lg p-4 mx-auto cursor-pointer hover:shadow-xl transition-shadow duration-200"
            onClick={onClick}
        >
            <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-bold w-fit">{nameList}</h2>
                <p className="w-fit">{description}</p>
                <p className="w-fit">{date}</p>
                <span className="bg-[#A1390B] p-1 border rounded-lg border-[#461604] text-text-secondary w-fit">
                    {itemsList ? itemsList.length : 0} items
                </span>
            </div>
            <div className="flex items-start content-center h-full ml-auto">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="cursor-pointer text-white hover:text-red-400 transition-colors duration-200"
                    onClick={handleDelete}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 7h12M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2m2 0v12a2 2 0 01-2 2H8a2 2 0 01-2-2V7m3 4v6m4-6v6"
                    />
                </svg>
            </div>
        </div>
    );
}

export default ListCard;