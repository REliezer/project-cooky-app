import { useState } from "react";
import DynamicForm from "../../components/common/DynamicForm";
import Graphics from "../../components/common/Graphics";
import type { FormFieldConfig } from '../../types/components';
import Button from "../../components/common/Button";
import { useNavigate } from "react-router-dom";

function ProfileForm() {
    const [profileImage, setProfileImage] = useState<string>('/user-placeholder.png'); // usa tu avatar por defecto
    const navigate = useNavigate();

    // Manejar carga de imagen localmente
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageURL = URL.createObjectURL(file);
            setProfileImage(imageURL);
        }
    };

    // Campos del formulario
    const formFields: FormFieldConfig[] = [
        {
            name: 'firstName',
            type: 'text',
            label: 'Nombre',
            placeholder: 'Ingresa tu nombre',
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
            placeholder: 'Ingresa tu apellido',
            required: true,
            validation: {
                minLength: 2,
                maxLength: 50
            }
        },
        {
            name: 'email',
            type: 'email',
            label: 'Correo electrónico',
            placeholder: 'ejemplo@email.com',
            required: true,
            validation: {
                pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
            }
        }
    ];

    const handleSubmit = async (formData: Record<string, string>) => {
        console.log("Datos enviados:", formData);
        alert("Formulario enviado");
    };

    return (
        <section>
            <Graphics
                variant="left"
                title="Datos Personales"
                subtitle="Edita tu información personal y tu foto de perfil."
            />

            {/* Sección de la foto */}
            <div className="flex justify-center mb-6 relative -mt-20">
                <div className="relative w-28 h-28">
                    <img
                        src={profileImage}
                        alt="Foto de perfil"
                        className="w-36 h-36 rounded-full border-4 border-orange-500 shadow-md object-cover"
                    />
                    <label className="absolute bottom-1 right-1 bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-full cursor-pointer shadow-md">
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                        />
                        📷
                    </label>
                </div>
            </div>

            {/* Formulario de datos */}
            <DynamicForm
                fields={formFields}
                onSubmit={handleSubmit}
                submitButtonText="Guardar"
                submitButtonVariant="primary"
                resetOnSubmit={false}
            >
                <Button
                    label="Cancelar"
                    variant="outline"
                    size="medium"
                    onClick={() => navigate('/app/profile')}
                />
            </DynamicForm>

        </section>
    );
}

export default ProfileForm;
