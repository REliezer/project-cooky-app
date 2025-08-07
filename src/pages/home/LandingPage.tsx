import { useNavigate } from 'react-router-dom'
import cookyLogo from '../../assets/cooky.svg'
import Button from '../../components/common/Button'
import Graphics from '../../components/common/Graphics'
import FeatureSection from '../../components/LandingPage/FeatureSection'

function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen">
      {/* Header */}
      <Graphics
        variant='right' /* You can change to 'left' if needed */
      />
      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className=" mb-6">
            Bienvenido a
          </h1>          
          <img 
            src={cookyLogo} 
            className="w-64 md:w-80 mx-auto mb-8 drop-shadow-lg" 
            alt="Cooky logo" 
          />
          {/*
          <p>
            Descubre, comparte y guarda tus recetas favoritas. 
            Una plataforma donde la cocina se convierte en una experiencia única.
          </p>          
          <p>
            Desde recetas tradicionales hasta creaciones innovadoras, 
            encuentra inspiración para cada ocasión y nivel de experiencia culinaria.
          </p>
          */}
          <p className='text-center'>
            Registrate ahora y obtén <span>7 días</span> premiun gratis!.
          </p>
          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              label="Registrarse"
              variant="primary"
              size="medium"
              onClick={() => navigate('/register')}
            />
            <Button
              label="Iniciar Sesión"
              variant="outline"
              size="medium"
              onClick={() => navigate('/login')}
            />
          </div>
        </div>
      </main>
      
      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-center mb-6">
            ¿Por qué elegir Cooky?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureSection
              title="Recetas Auténticas"
              description="Descubre recetas tradicionales y modernas de todo el mundo, cuidadosamente seleccionadas."
              icon="🍳"
            />
            <FeatureSection
              title="Cocina con lo que tienes"
              description="Encuentra recetas basadas en los ingredientes que ya tienes en casa."
              icon="🛒"
            />
            <FeatureSection
              title="Crea listas de compras"
              description="Crea tus listas de compras y genera listas de compras automáticamente para las recetas que elijas."
              icon="📝"
            />
            <FeatureSection
              title="Guarda Favoritos"
              description="Mantén organizadas tus recetas favoritas y accede a ellas cuando quieras cocinar."
              icon="❤️"
            />
          </div>
        </div>
      </section>
      <div className='custom-radius-bottom'></div>
    </div>
  )
}

export default LandingPage
