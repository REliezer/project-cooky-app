"use client"
import { useParams, useNavigate } from "react-router-dom"
import { useState } from "react"

import { toast } from "sonner";
import { ArrowLeft } from "lucide-react"

import { Card, CardContent } from "../../components/recipe/Card"
import Button from '../../components/common/Button';
import StatsRecipe from "../../components/ui/StatsRecipe";

import { useRecipesManager } from '../../hooks/recipes/useRecipesManager';
import type { Ingredient } from '../../store/useRecipesStore';

export default function DetalleReceta() {
    const { recipes } = useRecipesManager();
    const [activeTab, setActiveTab] = useState<"ingredientes" | "pasos">("ingredientes")
    const [isSaved, setIsSaved] = useState(false);
    const { idRecipe } = useParams();
    const navigate = useNavigate();

    // Obtener receta por recipe_id único
    const recipe = recipes.recipes.find((r) => r.recipe_id === idRecipe);

    console.log('Recipe Id from params:', idRecipe);

    const toggleSave = () => {
        const savedRecipes = JSON.parse(localStorage.getItem("savedRecipes") || "[]");

        let updated;
        if (isSaved) {
            updated = savedRecipes.filter((rid: string) => rid !== idRecipe);
        } else {
            // Si no estaba guardada, la añadimos
            updated = [...savedRecipes, idRecipe];
            toast.success('Receta guardada');
        }

        localStorage.setItem("savedRecipes", JSON.stringify(updated));
        setIsSaved(!isSaved);
    };

    const generateShoppingList = (ingredients: Ingredient[]) => {
        console.log('Shopping list generated for:', ingredients);
    }

    if (!recipe) {
        return (
            <div className="p-4 text-center text-gray-500">
                Receta no encontrada
            </div>
        );
    }

    return (
        <div className="container mx-auto min-h-screen">
            {/* Header con imagen */}
            <div className="relative">
                <img src={recipe.image_url || `https://placehold.co/600x256?text=${recipe.name}`} alt={recipe.name} className="w-full h-64 object-cover" />

                {/* Botón de regreso */}
                <button
                    onClick={() => navigate(-1)}
                    className="absolute top-4 left-4 w-12 h-12 bg-[#461604] rounded-full flex items-center justify-center hover:bg-[#82310c] transition-colors"
                >
                    <ArrowLeft className="h-6 w-6" color="#FFF8EC" />
                </button>

                {/* Overlay con título */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <h1 className="text-text-secondary text-xl font-bold">{recipe.name}</h1>
                </div>
            </div>

            {/* Stats */}
            <StatsRecipe
                recipe={{
                    ingredientsNumber: recipe.recipe_ingredients.length,
                    difficulty: recipe.difficulty || 'easy',
                    preparationTime: `${recipe.cooking_time || 30}`,
                    servings: recipe.servings || 0,
                }}
                isSaved={isSaved}
                toggleSave={toggleSave}
            />
            {/* Tabs */}
            <div className="bg-[#fff0d3] border-b">
                <div className="flex">
                    <button
                        onClick={() => setActiveTab("ingredientes")}
                        className={`flex-1 py-3 px-4 text-center font-medium border-b-2 transition-colors ${activeTab === "ingredientes"
                            ? "border-amber-700 text-amber-700"
                            : "border-transparent text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        Ingredientes
                    </button>
                    <button
                        onClick={() => setActiveTab("pasos")}
                        className={`flex-1 py-3 px-4 text-center font-medium border-b-2 transition-colors ${activeTab === "pasos"
                            ? "border-amber-700 text-amber-700"
                            : "border-transparent text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        Pasos
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-4">
                {activeTab === "ingredientes" ? (
                    <>
                        {/* Lista de ingredientes */}
                        {recipe.recipe_ingredients.map((ingredient, index) => (
                            <Card key={ingredient.name || index} className="bg-white shadow-sm">
                                <CardContent className="p-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div 
                                              className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-lg"
                                              dangerouslySetInnerHTML={{ __html: ingredient.svg }}
                                            />                                            
                                            <span className="text-text-primary font-bold">{ingredient.name}</span>
                                        </div>
                                        <span className="text-text-primary font-light">{ingredient.quantity} {ingredient.unit}</span>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}

                        <Button
                            label="Generar lista de compra"
                            variant="secondary"
                            size="medium"
                            className="w-full"
                            onClick={() => generateShoppingList(
                                recipe.recipe_ingredients)}
                        />
                    </>
                ) : (
                    <>
                        {/* Lista de pasos */}
                        {recipe.steps.map((step) => (
                            <Card key={step.order || step.step} className="bg-white shadow-sm">
                                <CardContent className="p-4">
                                    <div className="flex  items-center gap-3">
                                        <div className="w-8 h-8 bg-[#a1390b] text-text-secondary rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 mt-1">
                                            {step.order}
                                        </div>
                                        <div>
                                            <p className="text-text-primary font-light leading-relaxed">{step.step}</p>
                                            {step.time && 
                                                <span className="font-mono text-[12px] font-extralight">Tiempo: {step.time} min</span>
                                            }
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </>
                )}
            </div>
        </div>
    )
}
