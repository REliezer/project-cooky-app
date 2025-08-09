import DynamicForm from "../../components/common/DynamicForm";
import Graphics from "../../components/common/Graphics";
import type { FormFieldConfig } from '../../types/components';
import Button from "../../components/common/Button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

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

    // Manejador para el formulario de login
    const handleLoginSubmit = async (formData: Record<string, any>) => {
        console.log('Datos del formulario de login:', formData);

        // Simular autenticación
        await new Promise(resolve => setTimeout(resolve, 1500));
        navigate('/app/home')

        toast.success('¡Login exitoso!');
    };

    return (
        <section className="">
            <Graphics
                variant="left"
                title="Iniciar sesión"
                subtitle="Bienvenido de nuevo!"
            />
            <DynamicForm
                fields={loginFormFields}
                onSubmit={handleLoginSubmit}
                submitButtonText="Iniciar Sesión"
                submitButtonVariant="secondary"
                resetOnSubmit={false}
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