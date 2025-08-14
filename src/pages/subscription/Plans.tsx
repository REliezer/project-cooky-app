import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Graphics from "../../components/common/Graphics";
import PlanCard from "../../components/common/PlanCard";
import Modal from "../../components/common/Modal";

import type { PlanCardProps } from "../../types";
import { useRegistration } from "../../hooks/useRegistration";
import type { PlanData } from "../../types/registration";
//import ProgressIndicator from "../../components/common/ProgressIndicator";

import { plans } from "../../data/Plans";

import imageCheck from '../../assets/images/check.svg';
import { toast } from "sonner";

type PlansProps = {
    title?: string;
};

function Plans({ title = 'Registrarse' }: PlansProps) {
    const navigate = useNavigate();
    const { selectPlanAndNavigate, submitRegistration, state } = useRegistration();
    // Estado para manejar la visibilidad del modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Función para abrir el modal
    const openModal = () => {
        setIsModalOpen(true);
    }
    // Función para cerrar el modal
    const closeModal = async () => {
        setIsSubmitting(true);
        try {
            // Para plan gratuito, enviar directamente los datos
            const success = await submitRegistration();
            if (success) {
                toast.success('Cuenta creada correctamente')
                navigate('/login');
            } else {
                alert('Error al crear la cuenta. Intenta nuevamente.');
            }
        } catch (error) {
            console.error('Error al cerrar modal:', error);
            alert('Error al crear la cuenta. Intenta nuevamente.');
        } finally {
            setIsSubmitting(false);
            setIsModalOpen(false);
        }
    }

    // Función para manejar click en plan
    const handlePlanCardClick = (plan: PlanCardProps['plan']) => {
        console.log(`Clicked on plan: ${plan.planTitle}`);

        // Convertir el plan al formato del Context
        const planData: PlanData = {
            planTitle: plan.planTitle,
            planSubtitle: plan.planSubtitle,
            planPrice: plan.planPrice,
            planDuration: plan.planDuration,
            planFeatures: plan.planFeatures
        };

        console.log('Plan data to save:', planData);

        // Usar la nueva función que maneja todo de una vez
        const planType = selectPlanAndNavigate(planData);

        if (planType === 'free') {
            console.log('Plan is free, showing modal');
            // Para plan gratuito, mostrar modal de confirmación
            openModal();
        }
        // Para planes pagados, selectPlanAndNavigate ya navegó automáticamente
    };

    return (
        <>
            <Graphics
                variant="left"
                title={title}
                subtitle='Selecciona el plan de tu cuenta'
            />

            {/*<ProgressIndicator />*/}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mb-2">
                {
                    plans.map((plan, index) => (
                        <PlanCard
                            key={index}
                            plan={plan}
                            onPlanSelect={() => handlePlanCardClick(plan)}
                        />
                    ))
                }
            </div>

            {
                isModalOpen && (
                    <Modal
                        isOpen={isModalOpen}
                        type="info"
                        title="Tu cuenta ha sido creada exitosamente"
                        onConfirm={() => closeModal()}
                        onCancel={closeModal}
                    >
                        <div className="grid content-center justify-center w-full mb-2">
                            <img src={imageCheck} alt='verificacion' className='mx-auto mb-4' />
                            <p className='text-center'>¡Gracias por unirte al<br />
                                <strong className='text-center'>Plan Free - "Cocinero Casual"</strong>
                                !
                            </p>
                            {/* Información adicional */}
                            <div className="p-4 text-center">
                                <p>Ya puedes iniciar sesión con tu email{' '}</p>
                                <span className="font-mono px-2 py-1 rounded">
                                    {state.personalData?.email}
                                </span>{' '}
                                y comenzar a explorar todas las funcionalidades de Cooky.
                            </div>
                        </div>
                    </Modal>
                )
            }
        </>
    )
}

export default Plans;