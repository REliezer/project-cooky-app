"use client"

import { useEffect, useState, useMemo } from "react"
import { useLocation } from 'react-router-dom'
import { Search } from 'lucide-react'
import { Input } from "../../components/recipe/Input"
import { Switch } from "../../components/recipe/Switch"
import { Label } from "../../components/recipe/Label"
import { ScrollArea } from "../../components/recipe/Scroll-area"
import RecetasFree from "./RecipesFree"

import { useIngredients } from "../../hooks/recipes/useIngredients"
import { useRecipes } from "../../hooks/recipes/useRecipes"
import { useAuthStore } from '../../store/useAuthStore.ts';

export default function RecetasApp() {
  const { ingredients } = useIngredients();
  const { lastSearchedIngredients } = useRecipes();
  const { user } = useAuthStore();
  const location = useLocation();
  const isPremium = user?.premium || false;
  
  // Priorizar ingredientes de la búsqueda reciente, luego location.state, luego ingredientes actuales
  const displayIngredients = useMemo(() => {
    if (lastSearchedIngredients.length > 0) {
      return lastSearchedIngredients;
    }
    return location.state?.ingredients || ingredients;
  }, [lastSearchedIngredients, location.state?.ingredients, ingredients.length]);
  
  const [searchQuery, setSearchQuery] = useState(() => displayIngredients.join(', '))
  
  // Actualizar cuando cambien los ingredientes mostrados
  useEffect(() => {
    const newQuery = displayIngredients.join(', ');
    setSearchQuery(newQuery);
  }, [displayIngredients]);

  return (
    <div className="container mx-auto bg-white min-h-screen">
      {/* Header */}
      <div className="bg-bg-tertiary text-white p-4 pb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold">Mis Recetas</h1>
          <div className="flex items-center gap-2">
            <Label htmlFor="premium-toggle" className="text-white">
              Premium
            </Label>
            <Switch id="premium-toggle" checked={isPremium} />
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Ingredientes que tienes..."
            className="pl-10 bg-bg-primary text-text-primary"
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <RecetasFree searchQuery={searchQuery} />
      </ScrollArea>
    </div>
  )
}