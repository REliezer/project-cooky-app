import { StrictMode } from 'react'
import { Toaster } from 'sonner';
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RegistrationProvider } from './contexts/RegistrationContext'

// Layouts
import AppLayout from './components/layout/MainLayout'    // Para páginas con Navigation responsiva
import CleanLayout from './components/layout/CleanLayout' // Para páginas limpias (sin navegación)

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
import ProfileMenu from './pages/profile/ProfileMenu';
import ProfileForm from './pages/profile/ProfileForm';
import FavoriteIngredients from './pages/profile/FavoriteIngredients';
import DislikeIngredients from './pages/profile/DislikeIngredients';
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
          <Route path="/app" element={<AppLayout />}>
            <Route path="home" element={<div>App Home</div>} />
            <Route path="cocina" element={<div>Cocina</div>} />
            <Route path="list" element={<MyList />} />
            <Route path="list/:id" element={<MyListDetail />} />
            <Route path="profile" element={<ProfileMenu/>} />
            <Route path="categories" element={<Categories />} />
            <Route path="category/:categoryId" element={<CategoryProducts />} />
            <Route path="recipes" element={<Recipes />} />
            <Route path="details" element={<ProfileForm />}/>
            <Route path="favorites" element={<FavoriteIngredients />}/>
            <Route path="dislikes" element={<DislikeIngredients />}/>
          </Route>
          
          <Route path="/test" element={<Test />} />
        </Routes>
      </RegistrationProvider>
    </BrowserRouter>
  </StrictMode>
)
