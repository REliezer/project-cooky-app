"use client"

import { useState } from "react"
import { ArrowLeft, Clock, ChefHat, Bookmark, Apple } from "lucide-react"
import { Button } from "../../components/recipe/Button"
import { Card, CardContent } from "../../components/recipe/Card"
import { useParams, useNavigate } from "react-router-dom"
import { recetas } from "../../data/Recipes.ts"

export default function DetalleReceta() {
    const [activeTab, setActiveTab] = useState<"ingredientes" | "pasos">("ingredientes")
    const { id } = useParams();
    const navigate = useNavigate();

    const receta = recetas.find(r => r.id.toString() === id);
    

    if (!receta) {
        return (
            <div className="p-4 text-center text-gray-500">
                Receta no encontrada
            </div>
        );
    }

    return (
        <div className="container mx-auto bg-gray-50 min-h-screen">
            {/* Header con imagen */}
            <div className="relative">
                <img src={receta.imagen || "/placeholder.svg"} alt={receta.nombre} className="w-full h-64 object-cover" />

                {/* Botón de regreso */}
                <button
                    onClick={() => navigate(-1)}
                    className="absolute top-4 left-4 w-12 h-12 bg-black rounded-full flex items-center justify-center hover:bg-amber-800 transition-colors"
                >
                    <ArrowLeft className="h-6 w-6" color="#FFFFFF"/>
                </button>

                {/* Overlay con título */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <h1 className="text-white text-xl font-bold">{receta.nombre}</h1>
                </div>
            </div>

            {/* Stats */}
            <div className="bg-white p-4">
                <div className="flex justify-between items-center">
                    <div className="text-center">
                        <div className="flex justify-center mb-1">
                            <Apple className="h-5 w-5 text-amber-700" />
                        </div>
                        <div className="text-sm text-gray-600">Ingredientes</div>
                        <div className="font-semibold text-amber-700">{receta.ingredientesNumero}</div>
                    </div>

                    <div className="text-center">
                        <div className="flex justify-center mb-1">
                            <ChefHat className="h-5 w-5 text-amber-700" />
                        </div>
                        <div className="text-sm text-gray-600">Dificultad</div>
                        <div className="font-semibold text-amber-700">{receta.dificultad}</div>
                    </div>

                    <div className="text-center">
                        <div className="flex justify-center mb-1">
                            <Clock className="h-5 w-5 text-amber-700" />
                        </div>
                        <div className="text-sm text-gray-600">Tiempo</div>
                        <div className="font-semibold text-amber-700">{receta.tiempo}</div>
                    </div>

                    <div className="text-center">
                        <div className="flex justify-center mb-1">
                            <Bookmark className="h-5 w-5 text-amber-700 fill-current" />
                        </div>
                        <div className="text-sm text-gray-600">Guardar</div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white border-b">
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
                        {receta.ingredientesList.map((ingrediente) => (
                            <Card key={ingrediente.id} className="bg-white shadow-sm">
                                <CardContent className="p-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-lg">
                                                {ingrediente.icono}
                                            </div>
                                            <span className="font-medium text-gray-800">{ingrediente.nombre}</span>
                                        </div>
                                        <span className="text-gray-600">{ingrediente.cantidad}</span>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}

                        {/* Botón generar lista */}
                        <Button className="w-full bg-orange-400 hover:bg-orange-500 text-white font-medium py-3 rounded-lg mt-6">
                            Generar lista de compra
                        </Button>
                    </>
                ) : (
                    <>
                        {/* Lista de pasos */}
                        {receta.pasos.map((paso) => (
                            <Card key={paso.numero} className="bg-white shadow-sm">
                                <CardContent className="p-4">
                                    <div className="flex gap-3">
                                        <div className="w-8 h-8 bg-amber-700 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 mt-1">
                                            {paso.numero}
                                        </div>
                                        <p className="text-gray-700 leading-relaxed">{paso.descripcion}</p>
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
