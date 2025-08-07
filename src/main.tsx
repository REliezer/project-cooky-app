import { StrictMode } from 'react'
import { Toaster } from 'sonner';
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RegistrationProvider } from './contexts/RegistrationContext'
import MainLayout from './components/layout/MainLayout'
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

createRoot(document.getElementById('root')!).render(
  <StrictMode>    
    <Toaster position="bottom-center" richColors />
    <BrowserRouter>
      <RegistrationProvider>
        <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<LandingPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/payment' element={<PaymentInformation />} />
          <Route path='/plan' element={<Plans title='Registrarse' />} />
          <Route path='/list' element={<MyList />} />
          <Route path='/list/:id' element={<MyListDetail />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/category/:categoryId" element={<CategoryProducts />} />
          <Route path='/recipes' element={<Recipes />} />
        </Route>
        </Routes>
      </RegistrationProvider>
    </BrowserRouter>
  </StrictMode>
)
