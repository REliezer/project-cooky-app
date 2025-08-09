import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRegistration } from "../../hooks/useRegistration";

import Graphics from "../../components/common/Graphics";
import CardInput from "../../components/pay/CardInput";
import ProgressIndicator from "../../components/common/ProgressIndicator";

function PaymentInformation() {
    const navigate = useNavigate();
    const { state } = useRegistration();
    
    // Verificar que tenemos los datos necesarios
    useEffect(() => {
        if (!state.personalData || !state.selectedPlan) {
            // Si no hay datos, redirigir al inicio del flujo
            navigate('/register');
            return;
        }
        
        // Si el plan es gratuito, no debería estar en esta página
        if (state.selectedPlan.planPrice === '$0' || state.selectedPlan.planTitle === 'Plan Free') {
            navigate('/plans');
            return;
        }
    }, [state.personalData, state.selectedPlan, navigate]);
    
    const planSelect = state.selectedPlan ? 
        `${state.selectedPlan.planTitle} - ${state.selectedPlan.planSubtitle}` : 
        'Plan no seleccionado'
    
    return (
        <>
            <Graphics
                variant="left"
                title="Información de Pago"
                subtitle="Ingresa los datos de tu tarjeta para proceder con el pago de forma segura"
            />
            
            <ProgressIndicator />
            
            <CardInput planSelect={planSelect} />

        </>
    )
}

export default PaymentInformation;