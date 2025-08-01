import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Graphics from "../../components/common/Graphics";
import PlanCard from "../../components/common/PlanCard";
import Modal from "../../components/common/Modal";

import type { PlanCardProps } from "../../types";

import { plans } from "../../data/Plans";

import imageCheck from '../../assets/images/check.svg';

type PlansProps = {
    title?: string;
};

function Plans({ title = 'Registrarse' }: PlansProps) {
    const navigate = useNavigate();
    // Estado para manejar la visibilidad del modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Función para abrir el modal
    const openModal = () => {
        setIsModalOpen(true);
    }
    // Función para cerrar el modal
    const closeModal = () => {
        navigate('/login')
        setIsModalOpen(false);
    }

    // Función para manejar click en plan
    const handlePlanCardClick = (plan: PlanCardProps['plan']) => {
        console.log(`Clicked on plan: ${plan.planTitle}`);

        if (plan.planTitle === 'Plan Free') {
            openModal();
        } else {
            navigate('/payment', {
                state: {
                    planTitle: plan.planTitle,
                    planSubtitle: plan.planSubtitle
                }
            });
        }
    };

    return (
        <>
            <Graphics
                variant="left"
                title={title}
                subtitle='Selecciona el plan de tu cuenta'
            />
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
                        title="Cuenta creada correctamente"
                        onConfirm={() => {
                            closeModal();
                        }}
                        onCancel={closeModal}
                    >
                        <div className="grid content-center justify-center w-full mb-2">
                            <img src={imageCheck} alt='verificacion' className='mx-auto mb-4' />

                            <p className='text-center'>¡Gracias por unirte al<br />
                                <strong className='text-center'>Plan Free - "Cocinero Casual"</strong>
                                !
                            </p>
                        </div>
                    </Modal>
                )
            }
        </>
    )
}

export default Plans;