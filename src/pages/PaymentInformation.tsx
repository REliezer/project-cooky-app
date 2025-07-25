import Graphics from "../components/common/Graphics";
import CardInput from "../components/pay/CardInput";

function PaymentInformation() {

    return (
        <>
            <Graphics
                variant="left"
                title="Información de Pago"
                subtitle="Ingresa los datos de tu tarjeta para proceder con el pago de forma segura"
            />
            <CardInput />
        </>
    )
}

export default PaymentInformation;