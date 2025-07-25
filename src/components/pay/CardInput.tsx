import { useState } from 'react';
import type { CardProps, FormFieldConfig } from '../../types';

import CardComponent from './CardComponent';
import Button from '../common/Button';
import PaymentMethods from './PaymentMethods';

function CardInput () {
  const [CardProps, setCardData] = useState<CardProps>({
    cardNumber: '',
    expiryDate: '',
    cardholderName: '',
    cvv: ''
  });

  // Configuración de campos para el formulario dinámico
  const formFields: FormFieldConfig[] = [
    {
      name: 'cardholderName',
      label: 'Nombre del propietario',
      type: 'text',
      placeholder: 'Ingresa el nombre como aparece en la tarjeta',
      required: true,
      validation: {
        minLength: 2,
        maxLength: 50,
        pattern: '^[a-zA-ZÀ-ÿ\\s]+$'
      }
    },
    {
      name: 'cardNumber',
      label: 'Número de tarjeta',
      type: 'text',
      placeholder: '1234 5678 9012 3456',
      required: true,
      validation: {
        pattern: '^[0-9\\s]{13,23}$',
        minLength: 13,
        maxLength: 23
      }
    },
    {
      name: 'expiryDate',
      label: 'Fecha de expiración',
      type: 'text',
      placeholder: 'MM/YY',
      required: true,
      validation: {
        pattern: '^(0[1-9]|1[0-2])\\/\\d{2}$',
        minLength: 5,
        maxLength: 5
      }
    },
    {
      name: 'cvv',
      label: 'CVV',
      type: 'text',
      placeholder: '123',
      required: true,
      validation: {
        pattern: '^[0-9]{3,4}$',
        minLength: 3,
        maxLength: 3
      }
    }
  ];

  // Función para formatear el número de tarjeta mientras el usuario escribe
  const formatCardNumber = (value: string): string => {
    // Remover todo excepto números
    const cleaned = value.replace(/\D/g, '');
    // Agregar espacios cada 4 dígitos
    const formatted = cleaned.replace(/(\d{4})/g, '$1 ').trim();
    return formatted;
  };

  // Función para formatear la fecha de expiración
  const formatExpiryDate = (value: string): string => {
    // Remover todo excepto números
    const cleaned = value.replace(/\D/g, '');
    // Agregar barra después de 2 dígitos
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
    }
    return cleaned;
  };

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
  const handleSubmit = async (formData: Record<string, string | number | boolean>) => {
    try {
      console.log('Datos de la tarjeta enviados:', formData);
      
      // Aquí puedes agregar la lógica para procesar el pago
      // Por ejemplo, enviar a una API de procesamiento de pagos
      
      alert('¡Datos de tarjeta procesados correctamente!');
      
      // Opcional: Resetear el formulario
      setCardData({
        cardNumber: '',
        expiryDate: '',
        cardholderName: '',
        cvv: ''
      });
      
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
              <form className="space-y-6">
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
                      className="w-full px-4 py-3 border border-[#461604]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FE6700] focus:border-transparent transition-all duration-200"
                      required={field.required}
                      maxLength={field.name === 'cardNumber' ? 23 : field.name === 'expiryDate' ? 5 : field.name === 'cvv' ? 3 : undefined}
                    />
                  </div>
                ))}
                <Button
                  label='Procesar Pago'
                  size='medium'                  
                  className='w-full'
                  onClick={() => handleSubmit(CardProps)}
                />
              </form>
            </div>

            {/* Métodos de pago aceptados */}
            <PaymentMethods />
          </div>
        </div>
      </div>
    </div>

    );
}

export default CardInput;