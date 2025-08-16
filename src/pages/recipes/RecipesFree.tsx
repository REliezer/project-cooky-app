"use client"

import { useState } from "react"
import { Clock, ChefHat, Sparkles, Filter, Crown, Utensils } from 'lucide-react'
import { Button } from "../../components/recipe/Button.tsx"
import { Card, CardContent } from "../../components/recipe/Card.tsx"
import { Badge } from "../../components/recipe/Badge.tsx"
import { useNavigate } from 'react-router-dom'

import { useRecipesManager } from '../../hooks/recipes/useRecipesManager';
import { useAuthStore } from '../../store/useAuthStore.ts';
import { isPremiumUser } from '../../services/auth/login';

import type { Recipe } from '../../store/useRecipesStore';
import { capitalize } from "../../utils/utils.ts"

interface RecetasFreeProps {
  searchQuery?: string
}

export default function RecetasFree({ searchQuery }: RecetasFreeProps) {
  const { ingredients, recipes } = useRecipesManager();
  const { user } = useAuthStore();
  const isPremium = user ? isPremiumUser(user) : false; // Verificar si el usuario es premium
  const [showFilters, setShowFilters] = useState(true)

  const navigate = useNavigate();

  // Usar recetas del store directamente
  const recetas = recipes.recipes || [];
  console.log('Recetas Disponibles: ', recetas)

  // Usar todas las recetas directamente ya que no hay filtro premium
  const filteredRecipes = recetas;

  const handleRecipeClick = (recipe: Recipe) => {
    console.log('Recipe clicked:', recipe);
    // Navegar a la página de detalles usando el recipe_id único
    navigate(`/app/recipes/details/${recipe.recipe_id}`);
  }

  return (
    <>
      {/* Premium Filters y Results Header si es premiun*/}
      {isPremium ? (
        <>
          {/* Premium Filters */}
          <div className="p-4 pt-0 bg-gradient-to-r from-purple-50 to-blue-50 border-b">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 ml-2 -mb-4">
                <Crown className="h-4 w-4 text-purple-600" color="#CF1111" />
                <span className="text-sm font-medium text-gd-red">Filtros IA</span>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setShowFilters(!showFilters)}>
                <Filter className="h-4 w-4 mt-4" />
              </Button>
            </div>

            {showFilters && (
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-xs">
                    Máx. 5 ingredientes
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Menos de 30 min
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Sin gluten
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Vegetariano
                  </Badge>
                </div>
              </div>
            )}
          </div>

          {/* Results Header */}
          <div className="px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-black font-medium">Recetas personalizadas</span>
              </div>
              <span className="text-sm font-medium text-text-tertiary">
                {filteredRecipes.length} resultados IA
              </span>
            </div>
            <p className="text-xs text-black mt-1">
              Optimizadas con IA para tus ingredientes exactos
            </p>
          </div>
        </>
      ) : (
        <>
          {/* Banner Promocional */}
          <div className="m-4 p-4 bg-gradient-to-r from-gd-red to-gd-pink text-white rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-5 w-5 text-white" color='#FFFFFF' />
              <span className="text-white">¡Mejora tu experiencia!</span>
            </div>
            <p className="text-sm mb-3 text-white">Usa IA para ver recetas exactas con lo que tienes</p>
            <Button size="sm" className="bg-white text-gd-red hover:bg-gray-100 font-semibold hover:cursor-pointer" onClick={() => navigate('/plans')}>
              Probar Premium
            </Button>
          </div>
          {/* Results Header */}
          <div className="px-4 py-2 bg-gray-50">
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-primary">Recetas encontradas</span>
              <span className="text-sm font-medium">{filteredRecipes.length} resultados</span>
            </div>
            <p className="text-xs text-text-primary mt-1">
              Ordenadas por coincidencia básica de ingredientes
            </p>
          </div>
        </>
      )}

      <div className="p-4 space-y-4">
        {recipes.isLoading ? (
          <div className="text-center py-8">
            <p className="text-text-primary">Buscando recetas...</p>
          </div>
        ) : filteredRecipes.length > 0 ? filteredRecipes.map((receta) => (
          <Card key={receta.recipe_id}
            className="overflow-hidden hover:shadow-md border-purple-200 transition-shadow cursor-pointer"
            onClick={() => handleRecipeClick(receta)}>
            <CardContent className="p-0">
              <div className="flex">
                <img
                  src={receta.image_url || `https://placehold.co/600x256?text=${receta.name}`}
                  alt={receta.name}
                  className="w-24 h-24 object-cover"
                />

                <div className="flex-1 p-3">
                  <div className="flex items-start justify-between mb-2">
                    <p className="font-semibold text-text-tertiary leading-tight">{receta.name}</p>
                  </div>
                  <div className="flex items-center gap-3 text-xs mb-2">
                    <div className="flex items-center gap-1 text-black">
                      <Clock className="h-3 w-3" />
                      {receta.cooking_time || 30} min
                    </div>
                    <div className="flex items-center gap-1">
                      <ChefHat className="h-3 w-3" />
                      {receta.difficulty ? capitalize(receta.difficulty.toString()) : 'medium'}
                    </div>
                    <div className="flex items-center gap-1">
                      <Utensils className="h-3 w-3" />
                      {receta.servings || '0'}
                    </div>
                  </div>

                  {/* Premium Features */}
                  {isPremium && (
                    <div className="space-y-1 mb-2">
                      <div className="bg-blue-50 p-2 rounded text-xs">
                        <div className="flex items-center gap-1 mb-1">
                          ✨
                          <span className="text-gd-red text-[13px] font-medium">Sustitución IA</span>
                        </div>
                        <p className="text-gd-red text-[13px]">{receta.sustitucion}</p>
                      </div>
                      <div className="bg-purple-50 p-2 rounded text-xs">
                        <p className="text-gd-red text-[13px]">{receta.personalizacion}</p>
                      </div>
                    </div>
                  )}

                  {/* Ingredients */}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {(receta.recipe_ingredients || []).slice(0, 3).map((ingrediente, index) => (
                      <Badge key={ingrediente.name || index} variant="outline" className="text-xs px-1 py-0 border-purple-200">
                        {ingrediente.name}
                      </Badge>
                    ))}
                    {(receta.recipe_ingredients || []).length > 3 && (
                      <Badge variant="outline" className="text-xs px-1 py-0 border-purple-200">
                        +{(receta.recipe_ingredients || []).length - 3}
                      </Badge>
                    )}
                  </div>
                  <p className="mt-2 font-light text-sm leading-5">{receta.description}</p>
                  {/* Upgrade Hint - Solo para usuarios free */}
                  {!isPremium && (
                    <div className="mt-2 p-2 bg-purple-50 rounded text-xs">
                      <p className="text-gd-pink text-[14px]">
                        🔒 Con Premium: sustituciones inteligentes y recetas personalizadas
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No se encontraron recetas</p>
            <p className="text-sm text-gray-400 mt-1">
              {searchQuery && searchQuery.trim() !== ''
                ? `No hay recetas que coincidan con "${searchQuery}"`
                : ingredients.isEmpty()
                  ? "Selecciona algunos ingredientes para ver recetas"
                  : "Intenta con otros ingredientes"
              }
            </p>
          </div>
        )}
      </div>

      {/* Load More */}
      {filteredRecipes.length > 3 && (
        <div className="p-4">
          <Button variant="outline" className="w-full">
            Ver más recetas
          </Button>
        </div>
      )
      }
    </>
  )
}
