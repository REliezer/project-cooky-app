"use client"

import { Clock, ChefHat, Sparkles } from 'lucide-react'
import { Button } from "../../components/recipe/Button.tsx"
import { Card, CardContent } from "../../components/recipe/Card.tsx"
import { Badge } from "../../components/recipe/Badge.tsx"
import { recetas } from "../../data/Recipes.ts"
import { useNavigate } from 'react-router-dom'

interface RecetasFreeProps {
  searchQuery: string
}

export default function RecetasFree({ searchQuery }: RecetasFreeProps) {
  const navigate = useNavigate();

  const gratis = recetas.filter(r => !r.premium);

  return (
    <>
      {/* Banner Promocional */}
      <div className="m-4 p-4 bg-gradient-to-r from-gd-red to-gd-pink text-white rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="h-5 w-5 text-white" color='#FFFFFF'/>
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
          <span className="text-sm text-gray-600">Recetas encontradas</span>
          <span className="text-sm font-medium">{gratis.length} resultados</span>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Ordenadas por coincidencia básica de ingredientes
        </p>
      </div>

      {/* Recipe Cards */}
      <div className="p-4 space-y-4">
        {gratis.map((receta) => (
          <Card key={receta.id}
            className="overflow-hidden hover:shadow-md border-purple-200 transition-shadow cursor-pointer"
            onClick={() => navigate(`/app/recipes/details/${receta.id}`)}>
            <CardContent className="p-0">
              <div className="flex">
                <img
                  src={receta.imagen || "/placeholder.png"}
                  alt={receta.nombre}
                  className="w-24 h-24 object-cover"
                />
                <div className="flex-1 p-3">
                  <div className="flex items-start justify-between mb-2">
                    <p className="font-semibold text-text-tertiary leading-tight">{receta.nombre}</p>
                    <div className="flex items-center gap-1 ml-2">
                      <div
                        className={`w-2 h-2 rounded-full ${receta.coincidencia >= 90
                          ? "bg-green-500"
                          : receta.coincidencia >= 70
                            ? "bg-yellow-500"
                            : "bg-orange-500"
                          }`}
                      />
                      <span className="text-xs text-gray-500">{receta.coincidencia}%</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs mb-2">
                    <div className="flex items-center gap-1 text-black">
                      <Clock className="h-3 w-3" />
                      {receta.tiempo}
                    </div>
                    <div className="flex items-center gap-1">
                      <ChefHat className="h-3 w-3" />
                      {receta.dificultad}
                    </div>
                  </div>

                  {/* Ingredients */}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {receta.ingredientes.slice(0, 3).map((ingrediente, index) => (
                      <Badge key={index} variant="outline" className="text-xs px-1 py-0 border-purple-200">
                        {ingrediente}
                      </Badge>
                    ))}
                    {receta.ingredientes.length > 3 && (
                      <Badge variant="outline" className="text-xs px-1 py-0 border-purple-200">
                        +{receta.ingredientes.length - 3}
                      </Badge>
                    )}
                  </div>

                  {/* Upgrade Hint */}
                  <div className="mt-2 p-2 bg-purple-50 rounded text-xs">
                    <p className="text-gd-pink text-[14px]">
                      🔒 Con Premium: sustituciones inteligentes y recetas personalizadas
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="p-4">
        <Button variant="outline" className="w-full">
          Ver más recetas
        </Button>
      </div>
    </>
  )
}
