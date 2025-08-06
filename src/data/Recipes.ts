import chickentomatoe from "../assets/images/recipes/pollot.png"
import salteado from "../assets/images/recipes/salteado.png"
import perso from "../assets/images/recipes/personalizado.jpg"
import mediterraneo from "../assets/images/recipes/mediterraneo.jpg"
import guiso from "../assets/images/recipes/guiso.png"
import ensalada from "../assets/images/recipes/ensalada.png"


export interface RecetaBase {
  id: number;
  nombre: string;
  imagen: string;
  tiempo: string;
  dificultad: string;
  coincidencia: number;
  ingredientes: string[];
}

export interface RecetaPremium extends RecetaBase {
  sustitucion: string;
  personalizacion: string;
  aiTag: string;
}

export const recetasGratuitas: RecetaBase[] = [
  {
    id: 1,
    nombre: "Pollo con Tomate",
    imagen: chickentomatoe,
    tiempo: "30 min",
    dificultad: "Fácil",
    coincidencia: 85,
    ingredientes: ["pollo", "tomate", "cebolla", "ajo", "aceite"]
  },
  {
    id: 2,
    nombre: "Salteado de Pollo",
    imagen: salteado,
    tiempo: "20 min",
    dificultad: "Fácil",
    coincidencia: 70,
    ingredientes: ["pollo", "cebolla", "pimiento", "salsa soja"]
  },
  {
    id: 3,
    nombre: "Ensalada de Tomate",
    imagen: ensalada,
    tiempo: "10 min",
    dificultad: "Muy Fácil",
    coincidencia: 60,
    ingredientes: ["tomate", "cebolla", "aceite", "vinagre"]
  }
];

export const recetasPremium: RecetaPremium[] = [
  {
    id: 1,
    nombre: "Pollo al Tomate Personalizado",
    imagen: perso,
    tiempo: "25 min",
    dificultad: "Fácil",
    coincidencia: 98,
    ingredientes: ["pollo", "tomate", "cebolla"],
    sustitucion: "Sin ajo? Usa cebolla en polvo (1/2 cdta)",
    personalizacion: "Adaptado a tus preferencias: sin picante",
    aiTag: "Receta IA"
  },
  {
    id: 2,
    nombre: "Pollo Mediterráneo Express",
    imagen: mediterraneo,
    tiempo: "20 min",
    dificultad: "Fácil",
    coincidencia: 95,
    ingredientes: ["pollo", "tomate", "cebolla"],
    sustitucion: "Puedes agregar: orégano seco si tienes",
    personalizacion: "Solo 3 ingredientes como pediste",
    aiTag: "Optimizada IA"
  },
  {
    id: 3,
    nombre: "Guiso Rápido de Pollo",
    imagen: guiso,
    tiempo: "35 min",
    dificultad: "Fácil",
    coincidencia: 92,
    ingredientes: ["pollo", "tomate", "cebolla"],
    sustitucion: "Sin caldo? Usa agua + sal",
    personalizacion: "Receta familiar para 4 personas",
    aiTag: "Personalizada"
  }
];
