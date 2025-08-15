import { useNavigate } from 'react-router-dom'
import cookyLogo from '../../assets/cooky.svg'
import Button from '../../components/common/Button'
import Graphics from '../../components/common/Graphics'

import { useAuthStore } from '../../store/useAuthStore.ts';
import { isPremiumUser } from '../../services/auth/login';

function HomeRecipe() {
  const { user } = useAuthStore();
  const isPremium = user ? isPremiumUser(user) : false; // Verificar si el usuario es premium
  const navigate = useNavigate()

  return (
    <div className="min-h-screen">
      {/* Header */}
      <Graphics
        variant='left'
      />
      <main className="flex flex-col items-center justify-center px-4 py-4">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className=" mb-2">
            ¿Qué cocinamos hoy?
          </h1>
          <p>
            {`Selecciona hasta ${isPremium ? 5 : 4} ingredientes que tengas en casa y descubre recetas deliciosas y fáciles de preparar.`}
          </p>
          <img
            src={cookyLogo}
            className="w-64 md:w-80 mx-auto mt-8 mb-8 drop-shadow-lg"
            alt="Cooky logo"
          />
          <Button
            label="Seleccionar"
            variant="secondary"
            size="medium"
            onClick={() => navigate('/app/categories/recipes')}
            className='w-full'
          />
        </div>
      </main>
    </div>
  )
}

export default HomeRecipe
