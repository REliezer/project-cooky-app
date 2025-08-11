import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useEffect } from "react";

import DynamicForm from "../../components/common/DynamicForm";
import Graphics from "../../components/common/Graphics";
import Button from "../../components/common/Button";

import type { FormFieldConfig } from '../../types/components';
import { useAuthStore } from '../../store/useAuthStore';

interface LoginFormData {
  email: string;
  password: string;
}

function Login() {
    // Configuración de campos para un formulario de login
    const loginFormFields: FormFieldConfig[] = [
        {
            name: 'email',
            type: 'email',
            label: 'Email',
            placeholder: 'example@email.com',
            required: true
        },
        {
            name: 'password',
            type: 'password',
            label: 'Contraseña',
            placeholder: 'Tu contraseña',
            required: true,
            validation: {
                minLength: 12
            }
        }
    ];
    const navigate = useNavigate();
    const { loginAsync, isLoading, error, clearError } = useAuthStore()

    // Limpiar errores cuando el componente se monta
    useEffect(() => {
        clearError()
        
        // Cleanup al desmontar el componente
        return () => {
            clearError()
        }
    }, [clearError])
    
    // Limpiar error cuando el usuario empiece a escribir
    useEffect(() => {
        if (error) {
            const timeoutId = setTimeout(() => {
                clearError()
            }, 5000) // Auto-limpiar después de 5 segundos
            
            return () => clearTimeout(timeoutId)
        }
    }, [error, clearError])

    // Manejador para el formulario de login
    const handleLoginSubmit = async (formData: LoginFormData) => {
        console.log('Datos del formulario de login:', formData);

        try {
            await loginAsync(formData.email, formData.password)
            toast.success('¡Login exitoso!');
            navigate('/app/home')
        } catch (error) {
            console.error('Error en login:', error)
            // No mostramos toast aquí porque el error ya está en el estado
        }
    };

    return (
        <section className="">
            <Graphics
                variant="left"
                title="Iniciar sesión"
                subtitle="Bienvenido de nuevo!"
            />
            {/* Mostrar error si existe */}
            {error && (
                <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 max-w-[80%] md:max-w-[60%] mx-auto">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <svg className="w-5 h-5 text-red-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            <span className="text-red-700 text-sm font-medium">{error}</span>
                        </div>
                        <button
                            onClick={clearError}
                            className="text-red-400 hover:text-red-600 transition-colors ml-2 flex-shrink-0"
                            aria-label="Cerrar mensaje de error"
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
            
            <DynamicForm
                fields={loginFormFields}
                onSubmit={handleLoginSubmit}
                submitButtonText={isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
                submitButtonVariant="secondary"
                resetOnSubmit={false}
                isLoading={isLoading}
            >
                <Button
                    label="Continuar con Google"
                    variant="outline"
                    size="medium"
                />
                {/* Enlace para ir al registrp */}
                <div className="text-center text-sm text-gray-600">
                    <p>
                        ¿No tienes una cuenta?{' '}
                        <a href="/register" className="text-[#FE6700] hover:text-[#e55a00] font-medium">
                            Registrate aquí
                        </a>
                    </p>
                </div>
            </DynamicForm>
        </section>
    )
}

export default Login;