"use client"

import { useState } from "react"
import { Search } from 'lucide-react'
import { Input } from "../../components/recipe/Input"
import { Switch } from "../../components/recipe/Switch"
import { Label } from "../../components/recipe/Label"
import { ScrollArea } from "../../components/recipe/Scroll-area"
import RecetasFree from "./RecipesFree"
import RecetasPremium from './RecipesPremium'

export default function RecetasApp() {
  const [isPremium, setIsPremium] = useState(false)
  const [searchQuery, setSearchQuery] = useState("tomate, cebolla, pollo")

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
            <Switch id="premium-toggle" checked={isPremium} onCheckedChange={setIsPremium} />
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Ingredientes que tienes..."
            className="pl-10 bg-white text-black"
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        {isPremium ? (
          <RecetasPremium searchQuery={searchQuery} />
        ) : (
          <RecetasFree searchQuery={searchQuery} />
        )}
      </ScrollArea>
    </div>
  )
}