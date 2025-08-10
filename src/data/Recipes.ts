import chickentomatoe from "../assets/images/recipes/pollot.png"
import salteado from "../assets/images/recipes/salteado.png"
import perso from "../assets/images/recipes/personalizado.jpg"
import mediterraneo from "../assets/images/recipes/mediterraneo.jpg"
import guiso from "../assets/images/recipes/guiso.png"
import ensalada from "../assets/images/recipes/ensalada.png"


export interface IngredienteDetalle {
  id: number;
  nombre: string;
  cantidad: string;
  icono: string;
}

export interface Paso {
  numero: number;
  descripcion: string;
}

export interface Receta {
  id: number;
  nombre: string;
  imagen: string;
  tiempo: string;
  dificultad: string;
  coincidencia: number;
  ingredientesNumero: number;
  ingredientes: string[];
  ingredientesList: IngredienteDetalle[];
  pasos: Paso[];
  premium: boolean;
  sustitucion: string;
  personalizacion: string;
  aiTag: string;
}

export const recetas: Receta[] = [
  {
    id: 1,
    nombre: "Pollo con Tomate",
    imagen: chickentomatoe,
    tiempo: "30 min",
    dificultad: "Fácil",
    coincidencia: 85,
    ingredientesNumero: 5,
    ingredientes: ["pollo", "tomate", "cebolla", "ajo", "aceite"],
    ingredientesList: [
      { id: 1, nombre: "Pollo", cantidad: "500g", icono: "🍗" },
      { id: 2, nombre: "Tomate", cantidad: "2 Unidades", icono: "🍅" },
      { id: 3, nombre: "Cebolla", cantidad: "1 Unidad", icono: "🧅" },
      { id: 4, nombre: "Ajo", cantidad: "2 Dientes", icono: "🧄" },
      { id: 5, nombre: "Aceite", cantidad: "2 Cucharadas", icono: "🛢️" }
    ],
    pasos: [
      { numero: 1, descripcion: "Cortar el pollo en trozos y salpimentar." },
      { numero: 2, descripcion: "Picar cebolla, ajo y tomate." },
      { numero: 3, descripcion: "Sofreír ajo y cebolla con aceite." },
      { numero: 4, descripcion: "Añadir pollo y cocinar hasta dorar." },
      { numero: 5, descripcion: "Incorporar el tomate y cocinar 10 minutos más." }
    ],
    premium: false,
    sustitucion: "",
    personalizacion: "",
    aiTag: ""
  },
  {
    id: 2,
    nombre: "Salteado de Pollo",
    imagen: salteado,
    tiempo: "20 min",
    dificultad: "Fácil",
    coincidencia: 70,
    ingredientesNumero: 4,
    ingredientes: ["pollo", "cebolla", "pimiento", "salsa soja"],
    ingredientesList: [
      { id: 1, nombre: "Pollo", cantidad: "300g", icono: "🍗" },
      { id: 2, nombre: "Cebolla", cantidad: "1 Unidad", icono: "🧅" },
      { id: 3, nombre: "Pimiento", cantidad: "1 Unidad", icono: "🌶️" },
      { id: 4, nombre: "Salsa de soja", cantidad: "2 Cucharadas", icono: "🥢" }
    ],
    pasos: [
      { numero: 1, descripcion: "Cortar pollo, cebolla y pimiento en tiras." },
      { numero: 2, descripcion: "Calentar aceite en sartén y saltear pollo." },
      { numero: 3, descripcion: "Añadir verduras y cocinar 5 min." },
      { numero: 4, descripcion: "Incorporar salsa de soja y remover bien." }
    ],
    premium: false,
    sustitucion: "",
    personalizacion: "",
    aiTag: ""
  },
  {
    id: 3,
    nombre: "Ensalada de Tomate",
    imagen: ensalada,
    tiempo: "10 min",
    dificultad: "Muy Fácil",
    coincidencia: 60,
    ingredientesNumero: 4,
    ingredientes: ["tomate", "cebolla", "aceite", "vinagre"],
    ingredientesList: [
      { id: 1, nombre: "Tomate", cantidad: "2 Unidades", icono: "🍅" },
      { id: 2, nombre: "Cebolla", cantidad: "1/2 Unidad", icono: "🧅" },
      { id: 3, nombre: "Aceite", cantidad: "2 Cucharadas", icono: "🛢️" },
      { id: 4, nombre: "Vinagre", cantidad: "1 Cucharada", icono: "🍶" }
    ],
    pasos: [
      { numero: 1, descripcion: "Lavar y cortar tomates en rodajas." },
      { numero: 2, descripcion: "Picar cebolla en julianas finas." },
      { numero: 3, descripcion: "Aliñar con aceite y vinagre." }
    ],
    premium: false,
    sustitucion: "",
    personalizacion: "",
    aiTag: ""
  },
  {
    id: 4,
    nombre: "Pollo al Tomate Personalizado",
    imagen: perso,
    tiempo: "25 min",
    dificultad: "Fácil",
    coincidencia: 98,
    ingredientesNumero: 3,
    ingredientes: ["pollo", "tomate", "cebolla"],
    ingredientesList: [
      { id: 1, nombre: "Pollo", cantidad: "500g", icono: "🍗" },
      { id: 2, nombre: "Tomate", cantidad: "2 Unidades", icono: "🍅" },
      { id: 3, nombre: "Cebolla", cantidad: "1 Unidad", icono: "🧅" }
    ],
    pasos: [
      { numero: 1, descripcion: "Cortar pollo, tomate y cebolla." },
      { numero: 2, descripcion: "Sofreír la cebolla en aceite." },
      { numero: 3, descripcion: "Añadir pollo y cocinar hasta dorar." },
      { numero: 4, descripcion: "Agregar tomate y cocinar 10 minutos." }
    ],
    premium: true,
    sustitucion: "Sin ajo? Usa cebolla en polvo (1/2 cdta)",
    personalizacion: "Adaptado a tus preferencias: sin picante",
    aiTag: "Receta IA"
  },
  {
    id: 5,
    nombre: "Pollo Mediterráneo Express",
    imagen: mediterraneo,
    tiempo: "20 min",
    dificultad: "Fácil",
    coincidencia: 95,
    ingredientesNumero: 3,
    ingredientes: ["pollo", "tomate", "cebolla"],
    ingredientesList: [
      { id: 1, nombre: "Pollo", cantidad: "400g", icono: "🍗" },
      { id: 2, nombre: "Tomate", cantidad: "1 Unidad", icono: "🍅" },
      { id: 3, nombre: "Cebolla", cantidad: "1 Unidad", icono: "🧅" }
    ],
    pasos: [
      { numero: 1, descripcion: "Cortar ingredientes en trozos pequeños." },
      { numero: 2, descripcion: "Saltear pollo con aceite de oliva." },
      { numero: 3, descripcion: "Añadir tomate y cebolla, cocinar 8 minutos." }
    ],
    premium: true,
    sustitucion: "Puedes agregar: orégano seco si tienes",
    personalizacion: "Solo 3 ingredientes como pediste",
    aiTag: "Optimizada IA"
  },
  {
    id: 6,
    nombre: "Guiso Rápido de Pollo",
    imagen: guiso,
    tiempo: "35 min",
    dificultad: "Fácil",
    coincidencia: 92,
    ingredientesNumero: 3,
    ingredientes: ["pollo", "tomate", "cebolla"],
    ingredientesList: [
      { id: 1, nombre: "Pollo", cantidad: "500g", icono: "🍗" },
      { id: 2, nombre: "Tomate", cantidad: "2 Unidades", icono: "🍅" },
      { id: 3, nombre: "Cebolla", cantidad: "1 Unidad", icono: "🧅" }
    ],
    pasos: [
      { numero: 1, descripcion: "Trocear pollo, tomate y cebolla." },
      { numero: 2, descripcion: "Cocinar pollo en sartén." },
      { numero: 3, descripcion: "Añadir tomate y cebolla, cocinar 15 minutos." }
    ],
    premium: true,
    sustitucion: "Sin caldo? Usa agua + sal",
    personalizacion: "Receta familiar para 4 personas",
    aiTag: "Personalizada"
  }
];
