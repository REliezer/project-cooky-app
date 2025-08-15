
import { Clock, Bookmark, Apple, ChefHat, Utensils } from "lucide-react"
import { capitalize } from "../../utils/utils";

interface StatsRecipeProps {
    recipe: {
        ingredientsNumber: number | 0;
        difficulty: string | 'N/A';
        preparationTime: string | '5';
        servings: number | 0
    };
    isSaved: boolean;
    toggleSave: () => void;
}
function StatsRecipe({ recipe, isSaved, toggleSave }: StatsRecipeProps) {

    return (
        <div className="bg-[#ffdda5] p-4">
            <div className="flex justify-between items-center">
                <div className="text-center">
                    <div className="flex justify-center mb-1">
                        <Apple className="h-5 w-5 text-amber-700" />
                    </div>
                    <div className="text-sm text-text-primary font-semibold">Ingredientes</div>
                    <div className="font-semibold text-amber-700">{recipe.ingredientsNumber}</div>
                </div>
                <div className="text-center">
                    <div className="flex justify-center mb-1">
                        <ChefHat className="h-5 w-5 text-amber-700" />
                    </div>
                    <div className="text-sm text-text-primary font-semibold">Dificultad</div>
                    <div className="font-semibold text-amber-700">{capitalize(recipe.difficulty)}</div>
                </div>
                <div className="text-center">
                    <div className="flex justify-center mb-1">
                        <Clock className="h-5 w-5 text-amber-700" />
                    </div>
                    <div className="text-sm text-text-primary font-semibold">Tiempo</div>
                    <div className="font-semibold text-amber-700">{recipe.preparationTime} min</div>
                </div>
                <div className="text-center">
                    <div className="flex justify-center mb-1">
                        <Utensils className="h-5 w-5 text-amber-700" />
                    </div>
                    <div className="text-sm text-text-primary font-semibold">
                        {
                            recipe.servings > 1 ? 'Porciones' : 'Porcion'
                        }
                        </div>
                    <div className="font-semibold text-amber-700">{recipe.servings}</div>
                </div>

                <button
                    onClick={toggleSave}
                    className="text-center focus:outline-none mb-6 cursor-pointer"
                >
                    <div className="flex justify-center">
                        <Bookmark
                            className={`h-5 w-5 transition-all duration-300 ${isSaved ? "fill-amber-700 scale-110" : "text-amber-700"}`}
                        />
                    </div>
                    <div className="text-sm text-text-primary font-semibold mt-1">
                        {isSaved ? "Guardado" : "¿Guardar?"}
                    </div>
                </button>
            </div>
        </div>
    );
}

export default StatsRecipe;