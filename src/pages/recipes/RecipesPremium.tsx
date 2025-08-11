"use client"

import { useState } from "react"
import { Clock, ChefHat, Sparkles, Filter, Crown } from 'lucide-react'
import { Button } from "../../components/recipe/Button.tsx"
import { Card, CardContent } from "../../components/recipe/Card.tsx"
import { Badge } from "../../components/recipe/Badge.tsx"
import { recetas } from "../../data/Recipes.ts"
import { useNavigate } from 'react-router-dom'

interface RecetasPremiumProps {
  searchQuery: string
}

export default function RecetasPremium({ searchQuery }: RecetasPremiumProps) {
  const [showFilters, setShowFilters] = useState(true)
  const navigate = useNavigate();

  const premium = recetas.filter(r => r.premium);

  return (
    <>
      {/* Premium Filters */}
      <div className="p-4 pt-0 bg-gradient-to-r from-purple-50 to-blue-50 border-b">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 ml-2 -mb-4">
            <Crown className="h-4 w-4 text-purple-600" color="#CF1111"/>
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
            {premium.length} resultados IA
          </span>
        </div>
        <p className="text-xs text-black mt-1">
          Optimizadas con IA para tus ingredientes exactos
        </p>
      </div>

      {/* Recipe Cards */}
      <div className="p-4 space-y-4">
        {premium.map((receta) => (
          <Card key={receta.id}
            className="overflow-hidden border-purple-200 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => navigate(`/app/recipes/details/${receta.id}`)}>
            <CardContent className="p-0">
              <div className="flex">
                <div className="relative">
                  <img
                    src={receta.imagen || "/placeholder.svg"}
                    alt={receta.nombre}
                    className="w-24 h-24 object-cover"
                  />
                  <div className="absolute top-1 left-1">
                    <Badge className="text-xs bg-gd-red text-white px-1 py-0">
                      {receta.aiTag}
                    </Badge>
                  </div>
                </div>
                <div className="flex-1 p-3">
                  <div className="flex items-start justify-between mb-2">
                    <p className="font-semibold text-text-tertiary leading-tight">{receta.nombre}</p>
                    <div className="flex items-center gap-1 ml-2">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <span className="text-xs text-green-600 font-medium">{receta.coincidencia}%</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3"/>
                      {receta.tiempo}
                    </div>
                    <div className="flex items-center gap-1">
                      <ChefHat className="h-3 w-3"/>
                      {receta.dificultad}
                    </div>
                  </div>

                  {/* Premium Features */}
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

                  {/* Ingredients */}
                  <div className="flex flex-wrap gap-1">
                    {receta.ingredientes.map((ingrediente, index) => (
                      <Badge key={index} variant="outline" className="text-xs px-1 py-0 border-purple-200">
                        {ingrediente}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Premium Load More */}
      <div className="p-4">
        <Button className="w-full bg-white hover:bg-gd-pink">
          <Sparkles className="h-4 w-4 mr-2" />
          Generar más recetas IA
        </Button>
      </div>
    </>
  )
}
