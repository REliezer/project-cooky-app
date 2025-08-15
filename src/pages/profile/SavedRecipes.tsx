"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Clock, ChefHat, Trash2, Heart, BookmarkMinus } from "lucide-react"
import { Button } from "../../components/recipe/Button.tsx"
import { Card, CardContent } from "../../components/recipe/Card.tsx"
import { Badge } from "../../components/recipe/Badge.tsx"
import { useNavigate } from 'react-router-dom'

import { useRecipesManager } from '../../hooks/recipes/useRecipesManager';
import type { Recipe } from '../../store/useRecipesStore';


export default function RecetasGuardadas() {
    const [recetasGuardadas, setRecetasGuardadas] = useState<Recipe[]>([])
    const { recipes } = useRecipesManager();

    const navigate = useNavigate();

    const recetas = recipes.recipes || [];

    const handleRecipeClick = (recipe: Recipe) => {
        // Navegar a la página de detalles usando el idRecipe único
        navigate(`/app/recipes/details/${recipe.idRecipe}`);
    }

    useEffect(() => {
        // Leer IDs guardados
        const savedIds = JSON.parse(localStorage.getItem("savedRecipes") || "[]");

        // Filtrar recetas
        const filtradas = recetas.filter(r => savedIds.includes(r.idRecipe.toString()));
        setRecetasGuardadas(filtradas);
    }, []);


    const eliminarReceta = (id: string) => {
        setRecetasGuardadas((recetas) => recetas.filter((receta) => receta.idRecipe !== id))
    }

    const recetasPremium = recetasGuardadas.filter(
        (r) => r.sustitucion && r.sustitucion.trim() !== ""
    );

    const recetasFree = recetasGuardadas.filter(
        (r) => !r.sustitucion || r.sustitucion.trim() === ""
    );


    return (
        <div className="fav-page">
            {/* Header */}
            <div className="bg-bg-primary text-white p-4">
                <div className="flex items-center gap-3 mb-2">
                    <button
                        onClick={() => navigate(-1)}
                        className="back-btn"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </button>
                    <h1 className="fav-title">Recetas Guardadas</h1>
                </div>
                <p className="text-black-100 text-sm ml-11.5">{recetasGuardadas.length} recetas en tu colección</p>
            </div>

            {recetasGuardadas.length === 0 ? (
                /* Estado vacío */
                <div className="flex flex-col items-center justify-center p-8 mt-16">
                    <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                        <Heart className="h-12 w-12 text-gray-400" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">No hay recetas guardadas</h2>
                    <p className="text-gray-500 text-center mb-6">Guarda tus recetas favoritas para acceder a ellas fácilmente</p>
                    <Button onClick={() => navigate("/app/recipe")} className="bg-btn-secondary hover:bg-orange-600">
                        Explorar Recetas
                    </Button>
                </div>
            ) : (
                <div className="p-4">
                    {/* Recetas Premium */}
                    {recetasPremium.length > 0 && (
                        <div className="mb-6">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                <h2 className="text-lg font-semibold text-gray-800">Recetas Premium</h2>
                                <Badge className="bg-purple-100 text-purple-700 text-xs">{recetasPremium.length}</Badge>
                            </div>
                            <div className="space-y-3">
                                {recetasPremium.map((receta) => (
                                    <Card key={receta.idRecipe} className="overflow-hidden bg-white border-purple-100"
                                        onClick={() => handleRecipeClick(receta)}>
                                        <CardContent className="p-0">
                                            <div className="flex">
                                                <img
                                                    src={receta.image || "/placeholder.svg"}
                                                    alt={receta.name}
                                                    className="w-20 h-20 object-cover"
                                                />
                                                <div className="flex-1 p-3">
                                                    <div className="flex items-start justify-between mb-1">
                                                        <h3 className="font-semibold text-sm leading-tight pr-2">{receta.name}</h3>
                                                        <button
                                                            onClick={() => eliminarReceta(receta.idRecipe)}
                                                            className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded transition-colors"
                                                            title="Eliminar de guardadas"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
                                                    </div>

                                                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                                                        <div className="flex items-center gap-1">
                                                            <Clock className="h-3 w-3" />
                                                            {receta.cooking_time}
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <ChefHat className="h-3 w-3" />
                                                            {receta.difficulty}
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center justify-between">
                                                        <div className="flex flex-wrap gap-1">
                                                            {receta.ingredients.slice(0, 2).map((ingrediente, index) => (
                                                                <Badge key={index} variant="outline" className="text-xs px-1 py-0 border-purple-200">
                                                                    {ingrediente.name}
                                                                </Badge>
                                                            ))}
                                                            {receta.ingredients.length > 2 && (
                                                                <Badge variant="outline" className="text-xs px-1 py-0 border-purple-200">
                                                                    +{receta.ingredients.length - 2}
                                                                </Badge>
                                                            )}
                                                        </div>
                                                        <span className="text-xs text-gray-400">{new Date().toLocaleDateString()}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Recetas Free */}
                    {recetasFree.length > 0 && (
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                <h2 className="text-lg font-semibold text-gray-800">Recetas Gratuitas</h2>
                                <Badge className="bg-orange-100 text-orange-700 text-xs">{recetasFree.length}</Badge>
                            </div>
                            <div className="space-y-3">
                                {recetasFree.map((receta) => (
                                    <Card key={receta.idRecipe} className="overflow-hidden bg-white"
                                        onClick={() => handleRecipeClick(receta)}>
                                        <CardContent className="p-0">
                                            <div className="flex">
                                                <img
                                                    src={receta.image || "/placeholder.svg"}
                                                    alt={receta.name}
                                                    className="w-20 h-20 object-cover"
                                                />
                                                <div className="flex-1 p-3">
                                                    <div className="flex items-start justify-between mb-1">
                                                        <h3 className="font-semibold text-sm leading-tight pr-2">{receta.name}</h3>
                                                        <button
                                                            onClick={() => eliminarReceta(receta.idRecipe)}
                                                            className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded transition-colors"
                                                            title="Eliminar de guardadas"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
                                                    </div>

                                                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                                                        <div className="flex items-center gap-1">
                                                            <Clock className="h-3 w-3" />
                                                            {receta.cooking_time}
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <ChefHat className="h-3 w-3" />
                                                            {receta.difficulty}
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center justify-between">
                                                        <div className="flex flex-wrap gap-1">
                                                            {receta.ingredients.slice(0, 2).map((ingrediente, index) => (
                                                                <Badge key={index} variant="outline" className="text-xs px-1 py-0">
                                                                    {ingrediente.name}
                                                                </Badge>
                                                            ))}
                                                            {receta.ingredients.length > 2 && (
                                                                <Badge variant="outline" className="text-xs px-1 py-0">
                                                                    +{receta.ingredients.length - 2}
                                                                </Badge>
                                                            )}
                                                        </div>
                                                        <span className="text-xs text-gray-400">{new Date().toLocaleDateString()}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Botón para limpiar todas */}
                    {recetasGuardadas.length > 0 && (
                        <div className="mt-8 pt-4 border-t border-gray-200">
                            <Button
                                variant="outline"
                                className="w-full text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                                onClick={() => setRecetasGuardadas([])}
                            >
                                <BookmarkMinus className="h-4 w-4 mr-2" />
                                Limpiar todas las recetas guardadas
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
