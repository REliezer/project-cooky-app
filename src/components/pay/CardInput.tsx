import { useState } from 'react';
import type { CardProps } from '../../types';
import CardComponent from './CardComponent';
import Modal from '../common/Modal';
import { cardFormFields, formatCardNumber, formatExpiryDate, validateCardData } from '../../utils/cardValidation';

import Button from '../common/Button';
import PaymentMethods from './PaymentMethods';
import { useNavigate } from 'react-router-dom';
import imageCheck from '../../assets/images/check.svg';

type CardInputProps = {
  planSelect: string;
};

function CardInput({ planSelect }: CardInputProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [CardProps, setCardData] = useState<CardProps>({
    cardNumber: '',
    expiryDate: '',
    cardholderName: '',
    cvv: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showBack, setShowBack] = useState(false);

  const navigate = useNavigate();
  // Configuración de campos para el formulario dinámico
  const formFields = cardFormFields;
  // Función para cerrar el modal
  const closeModal = () => {
    navigate('/login')
    setIsModalOpen(false);

    // Resetear el formulario
    setCardData({
      cardNumber: '',
      expiryDate: '',
      cardholderName: '',
      cvv: ''
    });

    // Limpiar errores
    setErrors({});
  }
  // Manejar cambios en tiempo real para actualizar la vista previa
  const handleFormChange = (name: string, value: string) => {
    let formattedValue = value;

    // Aplicar formateo específico según el campo
    if (name === 'cardNumber') {
      formattedValue = formatCardNumber(value);
    } else if (name === 'expiryDate') {
      formattedValue = formatExpiryDate(value);
    }

    setCardData(prev => ({
      ...prev,
      [name]: formattedValue
    }));
  };

  // Manejar envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevenir recarga de página

    try {
      // Validar los datos antes de enviar
      const validation = validateCardData(CardProps);

      if (!validation.isValid) {
        setErrors(validation.errors);
        return;
      }

      // Simular cobro si la validación es exitosa
      await new Promise(resolve => setTimeout(resolve, 1500));
      // Limpiar errores
      setErrors({});

      console.log('Datos de la tarjeta enviados:', CardProps);
      // Aquí puedes agregar la lógica para procesar el pago
      // Por ejemplo, enviar a una API de procesamiento de pagos
      setIsModalOpen(true);

    } catch (error) {
      console.error('Error al procesar los datos:', error);
      alert('Error al procesar los datos de la tarjeta');
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Columna izquierda: Vista previa de la tarjeta */}
          <div className="flex justify-center">
            <div className="sticky top-8">
              <CardComponent
                cardholderName={CardProps.cardholderName}
                cardNumber={CardProps.cardNumber}
                expiryDate={CardProps.expiryDate}
                cvv={CardProps.cvv}
                showBack={showBack}
              />
              {/* Información de seguridad */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center mb-2">
                  <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <h3 className="text-blue-800 font-medium text-sm">
                    Transacción Segura
                  </h3>
                </div>
                <p className="text-blue-700 text-xs">
                  Tus datos están protegidos con encriptación SSL de 256 bits
                </p>
              </div>
            </div>
          </div>
          {/* Columna derecha: Formulario */}
          <div>
            <h2 className="text-xl font-semibold text-text-primary mb-4">
              Datos de la Tarjeta
            </h2>
            {/* Formulario dinámico personalizado que actualiza en tiempo real */}
            <div className="bg-bg-primary rounded-lg shadow-lg p-6">
              <form className="space-y-6" onSubmit={handleSubmit}>
                {formFields.map((field) => (
                  <div key={field.name}>
                    <label
                      htmlFor={field.name}
                      className="block text-sm font-medium mb-2 text-gray-700"
                    >
                      {field.label}
                      {field.required && (
                        <span className="text-feedback-error ml-1">*</span>
                      )}
                    </label>
                    <input
                      id={field.name}
                      name={field.name}
                      type={field.name === 'cvv' ? 'password' : 'text'}
                      placeholder={field.placeholder}
                      value={CardProps[field.name as keyof CardProps]}
                      onChange={(e) => handleFormChange(field.name, e.target.value)}
                      onFocus={() => {
                        if (field.name === 'cvv') {
                          setShowBack(true);
                        }
                      }}
                      onBlur={() => {
                        if (field.name === 'cvv') {
                          setShowBack(false);
                        }
                      }}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 ${
                        errors[field.name] 
                          ? 'border-red-500 focus:ring-red-500' 
                          : 'border-[#461604]/30 focus:ring-[#FE6700]'
                      }`}
                      required={field.required}
                      maxLength={field.name === 'cardNumber' ? 23 : field.name === 'expiryDate' ? 5 : field.name === 'cvv' ? 3 : undefined}
                    />
                    {errors[field.name] && (
                      <p className="mt-1 text-sm text-feedback-error">
                        {errors[field.name]}
                      </p>
                    )}
                  </div>
                ))}
                <Button
                  label='Procesar Pago'
                  size='medium'
                  className='w-full'
                  type='submit'
                />
              </form>
            </div>

            {/* Métodos de pago aceptados */}
            <PaymentMethods />
          </div>
        </div>
      </div>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          type="info"
          title="Confirmación de Cobro"
          onConfirm={() => closeModal()}
          onCancel={() => closeModal()}
        >
          <div className="grid content-center justify-center w-full mb-2">

            <img src={imageCheck} alt='verificacion' className='mx-auto mb-4' />
            <p className='text-center'>¡Gracias por unirte al<br />
              <strong className='text-center'>{planSelect}</strong>
              !
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default CardInput;