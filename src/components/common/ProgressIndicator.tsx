import { useRegistration } from '../../hooks/useRegistration';
import { REGISTRATION_STEPS } from '../../types/registration';

function ProgressIndicator() {
    const { state, isPlanFree } = useRegistration();

    const steps = [
        { number: 1, title: "Datos personales", key: REGISTRATION_STEPS.PERSONAL_DATA },
        { number: 2, title: "Seleccionar plan", key: REGISTRATION_STEPS.PLAN_SELECTION },
        { number: 3, title: "Pago", key: REGISTRATION_STEPS.PAYMENT },
        { number: 4, title: "Confirmar", key: REGISTRATION_STEPS.CONFIRMATION }
    ];

    // Si el plan es gratuito, no mostrar el paso de pago
    const visibleSteps = isPlanFree() && state.selectedPlan 
        ? steps.filter(step => step.key !== REGISTRATION_STEPS.PAYMENT)
        : steps;

    // Ajustar los números de paso si saltamos el pago
    if (isPlanFree() && state.selectedPlan) {
        visibleSteps.forEach((step) => {
            if (step.key === REGISTRATION_STEPS.CONFIRMATION) {
                step.number = 3;
            }
        });
    }

    return (
        <div className="flex justify-center mb-8">
            <div className="flex items-center w-full">
                {visibleSteps.map((step, index) => (
                    <div key={step.key} className="flex items-center">
                        {/* Círculo del paso */}
                        <div className={`
                            w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300
                            ${state.currentStep >= step.key
                                ? 'bg-orange-500 text-white shadow-lg' 
                                : state.currentStep === step.key - 1
                                ? 'bg-orange-100 <border-1></border-1> border-orange-300 text-orange-600'
                                : 'border-2 border-gray-300 text-gray-400 bg-white'
                            }
                        `}>
                            {state.currentStep > step.key ? (
                                // Checkmark para pasos completados
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            ) : (
                                step.number
                            )}
                        </div>

                        {/* Título del paso */}
                        <div className="m-0 ml-2">
                            <div className={`
                                text-xs text-center font-medium transition-colors duration-300
                                ${state.currentStep >= step.key
                                    ? 'text-orange-600' 
                                    : 'text-gray-400'
                                }
                            `}>
                                {step.title}
                            </div>
                        </div>

                        {/* Línea conectora (excepto en el último paso) */}
                        {index < visibleSteps.length - 1 && (
                            <div className={`
                                w-10 h-px mx-2 transition-colors duration-300
                                ${state.currentStep > step.key
                                    ? 'bg-orange-500' 
                                    : 'bg-gray-300'
                                }
                            `} />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProgressIndicator;
