import { paymentMethods } from "../../data/PaymentMethods";

function PaymentMethods() {

    return (
        <div className="mt-6 text-center">
            <p className="text-sm text-text-primary/70 mb-4">Métodos de pago aceptados:</p>
            <div className="flex justify-center items-center space-x-3 flex-wrap gap-2">
                {
                    paymentMethods.map((pay, index) => (
                        <div 
                            key={index}
                            className="flex items-center justify-center bg-bg-primary p-2 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
                            title={pay.name}
                        >
                            <div 
                                className="payment-icon"
                                dangerouslySetInnerHTML={{ __html: pay.icon }}
                            />
                        </div>
                    )
                    )
                }
            </div>
        </div>
    )
}

export default PaymentMethods;