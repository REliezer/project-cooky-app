import React from 'react';

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

const validateCardInfo = (cardNumber: string, expiryDate: string, cardholderName: string): CardInfo => {
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

const CardComponent: React.FC<CardProps> = ({ cardholderName, cardNumber, expiryDate }) => {
  const { type, isValid, errors } = validateCardInfo(cardNumber, expiryDate, cardholderName);
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
      <div 
        role="region" 
        aria-label="Credit Card Preview" 
        className={`w-89 h-48 rounded-xl bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 text-text-secondary p-6 relative overflow-hidden shadow-xl transition-all duration-300 ${!isValid ? 'ring-2 ring-red-400' : ''}`}
      >
        {/* Diseño de curvas decorativas */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-orange-300 rounded-full opacity-20" aria-hidden="true"></div>
        <div className="absolute -top-20 right-0 w-52 h-52 bg-orange-200 rounded-full opacity-10" aria-hidden="true"></div>
        <div className="absolute bottom-0 -left-10 w-60 h-60 bg-orange-700 rounded-full opacity-20" aria-hidden="true"></div>

        {/* Card Type */}
        <div className="text-text-secondary text-right text-xl font-semibold z-10 relative">
          {type === 'unknown' ? 'CARD' : type.toUpperCase()}
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
      
      {hasErrors && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
          <h4 className="text-feedback-error font-medium text-sm mb-2">Porfavor corrige los siguientes errores:</h4>
          <ul className="text-feedback-error text-xs space-y-1">
            {errors.number && <li>• {errors.number}</li>}
            {errors.name && <li>• {errors.name}</li>}
            {errors.expiry && <li>• {errors.expiry}</li>}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CardComponent;
