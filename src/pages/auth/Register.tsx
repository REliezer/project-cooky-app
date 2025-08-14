import DynamicForm from "../../components/common/DynamicForm";
import Graphics from "../../components/common/Graphics";
import type { FormFieldConfig } from '../../types/components';
import { useState } from 'react';
import { useRegistration } from '../../hooks/useRegistration';
import type { PersonalData } from '../../types/registration';
//import ProgressIndicator from '../../components/common/ProgressIndicator';

function Register() {
    const { setPersonalData, state, goToStep } = useRegistration();
    const [customErrors, setCustomErrors] = useState<Record<string, string>>({});

    // Configuración de campos para un formulario de registro
    const registerFormFields: FormFieldConfig[] = [
        {
            name: 'firstName',
            type: 'text',
            label: 'Nombre',
            placeholder: 'Ingresa tu nombre.',
            required: true,
            validation: {
                minLength: 2,
                maxLength: 50
            }
        },
        {
            name: 'lastName',
            type: 'text',
            label: 'Apellido',
            placeholder: 'Ingresa tu apellido.',
            required: true,
            validation: {
                minLength: 2,
                maxLength: 50
            }
        },
        {
            name: 'email',
            type: 'email',
            label: 'Email',
            placeholder: 'example@email.com',
            required: true,
            validation: {
                pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
            }
        },
        {
            name: 'password',
            type: 'password',
            label: 'Contraseña',
            placeholder: 'Ingresa la contraseña (mínimo 12 caracteres)',
            required: true,
            validation: {
                minLength: 12,
                pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d@$!%*?&]{12,}$'
            },
        },
        {
            name: 'repetPassword',
            type: 'password',
            label: 'Repetir Contraseña',
            placeholder: 'Repite la contraseña',
            required: true,
            validation: {
                minLength: 12,
                pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d@$!%*?&]{12,}$'
            }
        }
    ];

    // Validación personalizada para contraseñas
    const validatePasswords = (formData: Record<string, string | number | boolean>): boolean => {
        const { password, repetPassword } = formData;

        if (password !== repetPassword) {
            setCustomErrors({
                repetPassword: 'Las contraseñas no coinciden'
            });
            return false;
        }

        setCustomErrors({});
        return true;
    };

    // Manejador para el formulario de registro
    const handleRegisterSubmit = async (formData: Record<string, string | number | boolean>) => {
        // Validar que las contraseñas coincidan
        if (!validatePasswords(formData)) {
            return;
        }

        console.log('Datos del formulario de registro:', formData);

        try {
            // Guardar datos en el contexto (sin el repetPassword)
            const personalData: PersonalData = {
                firstName: String(formData.firstName),
                lastName: String(formData.lastName),
                email: String(formData.email),
                password: String(formData.password),
            };

            // Guardar en el contexto
            setPersonalData(personalData);

            // Establecer que estamos completando el paso 1
            goToStep(2); // Ir directamente al paso de selección de plan

        } catch (error) {
            console.error('Error en el registro:', error);
            alert('Error al procesar los datos. Intenta nuevamente.');
        }
    };

    return (
        <section>
            <Graphics
                variant="left"
                title="Registrarse"
                subtitle="Ingresa tus datos personales para crear una cuenta."
            />

            {/*<ProgressIndicator />*/}
            <DynamicForm
                fields={registerFormFields}
                onSubmit={handleRegisterSubmit}
                submitButtonText="Continuar"
                submitButtonVariant="secondary"
                resetOnSubmit={false}
                isLoading={state.isLoading}
            >
                {/* Mostrar error personalizado para contraseñas no coincidentes */}
                {customErrors.repetPassword && (
                    <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-feedback-error flex items-center">
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            {customErrors.repetPassword}
                        </p>
                    </div>
                )}

                {/* Enlace para ir al login */}
                <div className="text-center text-sm text-gray-600">
                    <p>
                        ¿Ya tienes una cuenta?{' '}
                        <a href="/login" className="text-[#FE6700] hover:text-[#e55a00] font-medium">
                            Inicia sesión aquí
                        </a>
                    </p>
                </div>
            </DynamicForm>
        </section>
    )
}

export default Register;