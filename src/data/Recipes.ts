import chickentomatoe from "../assets/images/recipes/pollot.png"
import salteado from "../assets/images/recipes/salteado.png"
import perso from "../assets/images/recipes/personalizado.jpg"
import mediterraneo from "../assets/images/recipes/mediterraneo.jpg"
import guiso from "../assets/images/recipes/guiso.png"
import ensalada from "../assets/images/recipes/ensalada.png"


export interface IngredienteDetalle {
  id: number;
  ingredientName: string;
  amount: string;
  icon: string;
}

export interface instruction {
  numero: number;
  description: string;
}

export interface Receta {
  id: number;
  recipetitle: string;
  image: string;
  preparationTime: string;
  difficulty: string;
  coincidencia: number;
  ingredientesNumero: number;
  ingredientes: string[];
  ingredientesList: IngredienteDetalle[];
  instructions: instruction[];
  premium: boolean;
  sustitucion: string;
  personalizacion: string;
  aiTag: string;
}

export const recetas: Receta[] = [
  {
    id: 1,
    recipetitle: "Pollo con Tomate",
    image: chickentomatoe,
    preparationTime: "30 min",
    difficulty: "Fácil",
    coincidencia: 85,
    ingredientesNumero: 5,
    ingredientes: ["pollo", "tomate", "cebolla", "ajo", "aceite"],
    ingredientesList: [
      { id: 1, ingredientName: "Pollo", amount: "500g", icon: "🍗" },
      { id: 2, ingredientName: "Tomate", amount: "2 Unidades", icon: "🍅" },
      { id: 3, ingredientName: "Cebolla", amount: "1 Unidad", icon: "🧅" },
      { id: 4, ingredientName: "Ajo", amount: "2 Dientes", icon: "🧄" },
      { id: 5, ingredientName: "Aceite", amount: "2 Cucharadas", icon: "🛢️" }
    ],
    instructions: [
      { numero: 1, description: "Cortar el pollo en trozos y salpimentar." },
      { numero: 2, description: "Picar cebolla, ajo y tomate." },
      { numero: 3, description: "Sofreír ajo y cebolla con aceite." },
      { numero: 4, description: "Añadir pollo y cocinar hasta dorar." },
      { numero: 5, description: "Incorporar el tomate y cocinar 10 minutos más." }
    ],
    premium: false,
    sustitucion: "",
    personalizacion: "",
    aiTag: ""
  },
  {
    id: 2,
    recipetitle: "Salteado de Pollo",
    image: salteado,
    preparationTime: "20 min",
    difficulty: "Fácil",
    coincidencia: 70,
    ingredientesNumero: 4,
    ingredientes: ["pollo", "cebolla", "pimiento", "salsa soja"],
    ingredientesList: [
      { id: 1, ingredientName: "Pollo", amount: "300g", icon: "🍗" },
      { id: 2, ingredientName: "Cebolla", amount: "1 Unidad", icon: "🧅" },
      { id: 3, ingredientName: "Pimiento", amount: "1 Unidad", icon: "🌶️" },
      { id: 4, ingredientName: "Salsa de soja", amount: "2 Cucharadas", icon: "🥢" }
    ],
    instructions: [
      { numero: 1, description: "Cortar pollo, cebolla y pimiento en tiras." },
      { numero: 2, description: "Calentar aceite en sartén y saltear pollo." },
      { numero: 3, description: "Añadir verduras y cocinar 5 min." },
      { numero: 4, description: "Incorporar salsa de soja y remover bien." }
    ],
    premium: false,
    sustitucion: "",
    personalizacion: "",
    aiTag: ""
  },
  {
    id: 3,
    recipetitle: "Ensalada de Tomate",
    image: ensalada,
    preparationTime: "10 min",
    difficulty: "Muy Fácil",
    coincidencia: 60,
    ingredientesNumero: 4,
    ingredientes: ["tomate", "cebolla", "aceite", "vinagre"],
    ingredientesList: [
      { id: 1, ingredientName: "Tomate", amount: "2 Unidades", icon: "🍅" },
      { id: 2, ingredientName: "Cebolla", amount: "1/2 Unidad", icon: "🧅" },
      { id: 3, ingredientName: "Aceite", amount: "2 Cucharadas", icon: "🛢️" },
      { id: 4, ingredientName: "Vinagre", amount: "1 Cucharada", icon: "🍶" }
    ],
    instructions: [
      { numero: 1, description: "Lavar y cortar tomates en rodajas." },
      { numero: 2, description: "Picar cebolla en julianas finas." },
      { numero: 3, description: "Aliñar con aceite y vinagre." }
    ],
    premium: false,
    sustitucion: "",
    personalizacion: "",
    aiTag: ""
  },
  {
    id: 4,
    recipetitle: "Pollo al Tomate Personalizado",
    image: perso,
    preparationTime: "25 min",
    difficulty: "Fácil",
    coincidencia: 98,
    ingredientesNumero: 3,
    ingredientes: ["pollo", "tomate", "cebolla"],
    ingredientesList: [
      { id: 1, ingredientName: "Pollo", amount: "500g", icon: "🍗" },
      { id: 2, ingredientName: "Tomate", amount: "2 Unidades", icon: "🍅" },
      { id: 3, ingredientName: "Cebolla", amount: "1 Unidad", icon: "🧅" }
    ],
    instructions: [
      { numero: 1, description: "Cortar pollo, tomate y cebolla." },
      { numero: 2, description: "Sofreír la cebolla en aceite." },
      { numero: 3, description: "Añadir pollo y cocinar hasta dorar." },
      { numero: 4, description: "Agregar tomate y cocinar 10 minutos." }
    ],
    premium: true,
    sustitucion: "Sin ajo? Usa cebolla en polvo (1/2 cdta)",
    personalizacion: "Adaptado a tus preferencias: sin picante",
    aiTag: "Receta IA"
  },
  {
    id: 5,
    recipetitle: "Pollo Mediterráneo Express",
    image: mediterraneo,
    preparationTime: "20 min",
    difficulty: "Fácil",
    coincidencia: 95,
    ingredientesNumero: 3,
    ingredientes: ["pollo", "tomate", "cebolla"],
    ingredientesList: [
      { id: 1, ingredientName: "Pollo", amount: "400g", icon: "🍗" },
      { id: 2, ingredientName: "Tomate", amount: "1 Unidad", icon: "🍅" },
      { id: 3, ingredientName: "Cebolla", amount: "1 Unidad", icon: "🧅" }
    ],
    instructions: [
      { numero: 1, description: "Cortar ingredientes en trozos pequeños." },
      { numero: 2, description: "Saltear pollo con aceite de oliva." },
      { numero: 3, description: "Añadir tomate y cebolla, cocinar 8 minutos." }
    ],
    premium: true,
    sustitucion: "Puedes agregar: orégano seco si tienes",
    personalizacion: "Solo 3 ingredientes como pediste",
    aiTag: "Optimizada IA"
  },
  {
    id: 6,
    recipetitle: "Guiso Rápido de Pollo",
    image: guiso,
    preparationTime: "35 min",
    difficulty: "Fácil",
    coincidencia: 92,
    ingredientesNumero: 3,
    ingredientes: ["pollo", "tomate", "cebolla"],
    ingredientesList: [
      { id: 1, ingredientName: "Pollo", amount: "500g", icon: "🍗" },
      { id: 2, ingredientName: "Tomate", amount: "2 Unidades", icon: "🍅" },
      { id: 3, ingredientName: "Cebolla", amount: "1 Unidad", icon: "🧅" }
    ],
    instructions: [
      { numero: 1, description: "Trocear pollo, tomate y cebolla." },
      { numero: 2, description: "Cocinar pollo en sartén." },
      { numero: 3, description: "Añadir tomate y cebolla, cocinar 15 minutos." }
    ],
    premium: true,
    sustitucion: "Sin caldo? Usa agua + sal",
    personalizacion: "Receta familiar para 4 personas",
    aiTag: "Personalizada"
  }
];
