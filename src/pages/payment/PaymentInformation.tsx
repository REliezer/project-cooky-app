import { useLocation } from "react-router-dom";

import Graphics from "../../components/common/Graphics";
import CardInput from "../../components/pay/CardInput";

function PaymentInformation() {
    const location = useLocation();
    const { planTitle, planSubtitle } = location.state || {};

    const planSelect = `${planTitle} - ${planSubtitle}`
    
    return (
        <>
            <Graphics
                variant="left"
                title="Información de Pago"
                subtitle="Ingresa los datos de tu tarjeta para proceder con el pago de forma segura"
            />
            <CardInput planSelect={planSelect} />

        </>
    )
}

export default PaymentInformation;