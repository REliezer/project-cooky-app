import React from 'react';
import './CardComponent.css';
import { paymentMethods } from '../../data/PaymentMethods';

import type { CardProps, CardInfo, CardType } from '../../types';

const detectCardType = (number: string): CardType => {
  // Remove spaces and non-numeric characters for detection
  const cleanNumber = number.replace(/\D/g, '');

  if (cleanNumber.startsWith('4')) return 'visa';
  if (cleanNumber.startsWith('5') || cleanNumber.startsWith('2')) return 'mastercard';
  if (cleanNumber.startsWith('34') || cleanNumber.startsWith('37')) return 'amex';
  if (cleanNumber.startsWith('6011') || cleanNumber.startsWith('65') || cleanNumber.startsWith('644') || cleanNumber.startsWith('645')) return 'discover';

  return 'unknown';
};

const validateCardInfo = (cardNumber: string, expiryDate: string, cardholderName: string, cvv: string): CardInfo => {
  const errors: CardInfo['errors'] = {};
  let isValid = true;
  const cleanNumber = cardNumber.replace(/\D/g, '');

  // Validate number
  if (!cleanNumber) {
    errors.number = 'Número de tarjeta es requerido.';
    isValid = false;
  } else if (cleanNumber.length < 13 || cleanNumber.length > 19) {
    errors.number = 'Número de tarjeta debe tener entre 13-19 digitos.';
    isValid = false;
  } else if (!luhnCheck(cleanNumber)) {
    errors.number = 'Número de tarjeta invalido.';
    isValid = false;
  }

  // Validate expiry
  if (!expiryDate) {
    errors.expiry = 'Fecha de expiración es requerida.';
    isValid = false;
  } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
    errors.expiry = 'Formato invalido (MM/YY)';
    isValid = false;
  } else {
    const [month, year] = expiryDate.split('/');
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;
    const expYear = parseInt(year);
    const expMonth = parseInt(month);

    if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
      errors.expiry = 'Tarjeta expirada.';
      isValid = false;
    }
  }

  // Validate name
  if (!cardholderName.trim()) {
    errors.name = 'Nombre del propietario es requerido.';
    isValid = false;
  } else if (cardholderName.trim().length < 2) {
    errors.name = 'Nombre debe tener al menos 2 caracteres.';
    isValid = false;
  }

  // Validate CVV
  if (!cvv.trim()) {
    errors.cvv = 'Card Verification Value (CVV) es requerido.';
    isValid = false;
  } else if (cvv.trim().length < 3) {
    errors.cvv = 'Card Verification Value (CVV) debe tener al menos 3 caracteres.';
    isValid = false;
  }

  const type = detectCardType(cardNumber);

  return { type, isValid, errors };
};

// Luhn algorithm for card number validation
const luhnCheck = (number: string): boolean => {
  let sum = 0;
  let alternate = false;

  for (let i = number.length - 1; i >= 0; i--) {
    let digit = parseInt(number.charAt(i));

    if (alternate) {
      digit *= 2;
      if (digit > 9) {
        digit = (digit % 10) + 1;
      }
    }

    sum += digit;
    alternate = !alternate;
  }

  return sum % 10 === 0;
};

interface CardComponentProps extends CardProps {
  showBack?: boolean;
}

const CardComponent: React.FC<CardComponentProps> = ({ cardholderName, cardNumber, expiryDate, cvv, showBack = false }) => {
  const { type, isValid, errors } = validateCardInfo(cardNumber, expiryDate, cardholderName, cvv);
  const hasErrors = Object.keys(errors).length > 0;

  // Format card number for display
  const formatCardNumber = (num: string): string => {
    const clean = num.replace(/\D/g, '');
    if (type === 'amex') {
      return clean.replace(/(\d{4})(\d{6})(\d{5})/, '$1 $2 $3');
    }
    return clean.replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  return (
    <div className="relative">
      <div className="card-container w-89 h-48 perspective-1000">
        <div
          className={`card w-full h-full relative transition-transform duration-700 transform-style-preserve-3d ${showBack ? 'rotate-y-180' : ''}`}
        >
          {/* FRENTE DE LA TARJETA */}
          <div
            role="region"
            aria-label="Credit Card Preview"
            className={`card-front absolute inset-0 w-full h-full rounded-xl bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 text-text-secondary p-6 overflow-hidden shadow-xl backface-hidden ${!isValid ? 'ring-2 ring-red-400' : ''}`}
          >
            {/* Diseño de curvas decorativas */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-orange-300 rounded-full opacity-20" aria-hidden="true"></div>
            <div className="absolute -top-20 right-0 w-52 h-52 bg-orange-200 rounded-full opacity-10" aria-hidden="true"></div>
            <div className="absolute bottom-0 -left-10 w-60 h-60 bg-orange-700 rounded-full opacity-20" aria-hidden="true"></div>

            {/* Card Type Icon */}
            <div className="text-right z-10 relative">
              {(() => {
                const matchedPayment = paymentMethods.find(pay => pay.name === type.toUpperCase());
                if (matchedPayment) {
                  return (
                    <div 
                      className="opacity-90 inline-block"
                      dangerouslySetInnerHTML={{ __html: matchedPayment.icon }}
                    />
                  );
                } else {
                  return (
                    <div className="text-text-secondary text-xl font-semibold">
                      CARD
                    </div>
                  );
                }
              })()}
            </div>

            {/* Número de tarjeta */}
            <div className="text-text-secondary text-xl tracking-widest mt-6 mb-4 z-10 relative font-mono">
              {cardNumber ? formatCardNumber(cardNumber) : '•••• •••• •••• ••••'}
            </div>

            {/* Nombre y fecha */}
            <div className="flex justify-between text-sm mt-4 z-10 relative">
              <div className="flex-1 mr-4">
                <p className="text-text-secondary opacity-80 text-xs mb-1">CARDHOLDER NAME</p>
                <p className="text-text-secondary font-bold uppercase truncate">
                  {cardholderName || 'YOUR NAME'}
                </p>
              </div>
              <div className="flex-shrink-0">
                <p className="text-text-secondary opacity-80 text-xs mb-1">VALID THRU</p>
                <p className="text-text-secondary font-bold font-mono">
                  {expiryDate || 'MM/YY'}
                </p>
              </div>
            </div>
          </div>

          {/* REVERSO DE LA TARJETA */}
          <div
            role="region"
            aria-label="Credit Card Back"
            className="card-back absolute inset-0 w-full h-full rounded-xl bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 text-text-secondary overflow-hidden shadow-xl backface-hidden rotate-y-180"
          >
            {/* Diseño de curvas decorativas para el reverso */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-300 rounded-full opacity-20" aria-hidden="true"></div>
            <div className="absolute -bottom-10 -left-10 w-52 h-52 bg-orange-200 rounded-full opacity-10" aria-hidden="true"></div>

            {/* Banda magnética */}
            <div className="w-full h-12 bg-gray-800 mt-6 mb-6"></div>

            {/* Área del CVV */}
            <div className="px-6">
              <div className="bg-white h-8 rounded flex items-center justify-end px-3 mb-4">
                <span className="text-gray-800 font-mono text-sm tracking-wider">
                  {cvv || '•••'}
                </span>
              </div>

              {/* Texto informativo */}
              <div className="text-xs text-text-secondary opacity-80">
                <p className="text-xs leading-relaxed">
                  For your security, this code is used to verify card-not-present transactions.
                </p>
              </div>

              {/* Logo del banco/tipo de tarjeta */}
              <div className="absolute bottom-2 right-3">
                {(() => {
                  const matchedPayment = paymentMethods.find(pay => pay.name === type.toUpperCase());
                  if (matchedPayment) {
                    return (
                      <div 
                        className="opacity-80"
                        dangerouslySetInnerHTML={{ __html: matchedPayment.icon }}
                      />
                    );
                  } else {
                    return (
                      <div className="text-text-secondary text-sm font-semibold opacity-80">
                        CARD
                      </div>
                    );
                  }
                })()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {hasErrors && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
          <h4 className="text-feedback-error font-medium text-sm mb-2">Porfavor corrige los siguientes errores:</h4>
          <ul className="text-feedback-error text-xs space-y-1">
            {errors.number && <li>• {errors.number}</li>}
            {errors.name && <li>• {errors.name}</li>}
            {errors.expiry && <li>• {errors.expiry}</li>}
            {errors.cvv && <li>• {errors.cvv}</li>}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CardComponent;
