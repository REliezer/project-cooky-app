import { useNavigate } from 'react-router-dom'
import cookyLogo from '../../assets/cooky.svg'
import Button from '../../components/common/Button'
import Graphics from '../../components/common/Graphics'

function HomeRecipe() {
  const userType = 'free'
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
            {`Selecciona hasta ${userType === 'free' ? 3 : 4} ingredientes que tengas en casa y descubre recetas deliciosas y fáciles de preparar.`}
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
