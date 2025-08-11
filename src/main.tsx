import { StrictMode } from 'react'
import { Toaster } from 'sonner';
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RegistrationProvider } from './contexts/RegistrationContext'

// Layouts
import AppLayout from './components/layout/MainLayout'    // Para páginas con Navigation responsiva
import CleanLayout from './components/layout/CleanLayout' // Para páginas limpias (sin navegación)
// Private Route
import PrivateRoute from './components/auth/PrivateRoute'

// Pages
import LandingPage from './pages/home/LandingPage'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Test from '../tests/pages/test'
import PaymentInformation from './pages/payment/PaymentInformation'
import Plans from './pages/subscription/Plans'
import MyList from './pages/lists/MyLists'
import MyListDetail from './pages/lists/MyListDetail'
import Categories from './pages/Categories/Categories';
import CategoryProducts from './pages/Categories/CategoryProducts';
import Recipes from './pages/recipes/Recipes';
import RecipesDetails from './pages/recipes/RecipesDetails';
import ProfileMenu from './pages/profile/ProfileMenu';
import ProfileForm from './pages/profile/ProfileForm';
import IngredientesFavoritos from './pages/profile/FavoriteIngredients';
import IngredientesNoMeGustan from './pages/profile/DislikeIngredients';
import HomeRecipe from './pages/recipes/HomeRecipe';
import IngredientsSelect from './pages/recipes/IngredientsSelect';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster position="top-center" richColors />
    <BrowserRouter>
      <RegistrationProvider>
        <Routes>
          {/* Páginas completamente limpias (sin navegación) */}
          <Route path="/" element={<CleanLayout />}>
            <Route index element={<LandingPage />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="payment" element={<PaymentInformation />} />
            <Route path="plans" element={<Plans title='Registrarse' />} />
          </Route>

          {/* Páginas autenticadas (con Navigation responsiva) */}
          <Route path="/app" element={<PrivateRoute />}>
            <Route element={<AppLayout />}>
              <Route path="home" element={<div>App Home</div>} />
              {/* Rutas para recetas*/}
              <Route path="recipe" element={<HomeRecipe />} />
              <Route path='recipes/select' element={<IngredientsSelect />} />
              <Route path="recipes" element={<Recipes />} />
              <Route path="recipes/details/:id" element={<RecipesDetails />} />
              {/* Rutas para listas*/}
              <Route path="list" element={<MyList />} />
              <Route path="list/:id" element={<MyListDetail />} />
              {/* Rutas para el perfil*/}
              <Route path="profile" element={<ProfileMenu />} />
              <Route path="details" element={<ProfileForm />} />
              <Route path="favorites" element={<IngredientesFavoritos />} />
              <Route path="dislikes" element={<IngredientesNoMeGustan />} />
              {/* Categorias para las listas */}
              <Route path="categories" element={<Categories title="Listas de compras" backUrl="/app/list" />} />
              <Route path="category/:categoryId" element={<CategoryProducts title="Listas de compras" backUrl="/app/list" />} />
              {/* Categorias para las recetas */}
              <Route path="categories/recipes" element={<Categories title="Mis ingredientes" backUrl="/app/recipes" />} />
              <Route path="category/recipes/:categoryId" element={<CategoryProducts title="Mis ingredientes" backUrl="/app/recipes" />} />
            </Route>


          </Route>

          <Route path="/test" element={<Test />} />
        </Routes>
      </RegistrationProvider>
    </BrowserRouter>
  </StrictMode>
)


