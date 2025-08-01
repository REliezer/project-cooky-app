import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout'
import LandingPage from './pages/home/LandingPage'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Test from '../tests/pages/test'
import PaymentInformation from './pages/payment/PaymentInformation'
import Plans from './pages/subscription/Plans'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<LandingPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/payment' element={<PaymentInformation />} />
          <Route path='/plan' element={<Plans title='Registrarse' />} />
          <Route path='/test' element={<Test />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)