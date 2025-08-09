import React, { createContext, useReducer, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import type { 
  RegistrationState, 
  RegistrationContextType, 
  PersonalData, 
  PlanData, 
  PaymentData
} from '../types/registration';
import { REGISTRATION_STEPS } from '../types/registration';

// Estado inicial
const initialState: RegistrationState = {
  personalData: null,
  selectedPlan: null,
  paymentData: null,
  currentStep: REGISTRATION_STEPS.PERSONAL_DATA,
  isLoading: false,
};

// Tipos de acciones
type RegistrationAction =
  | { type: 'SET_PERSONAL_DATA'; payload: PersonalData }
  | { type: 'SET_SELECTED_PLAN'; payload: PlanData }
  | { type: 'SET_PAYMENT_DATA'; payload: PaymentData }
  | { type: 'SET_CURRENT_STEP'; payload: number }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'CLEAR_REGISTRATION' };

// Reducer
const registrationReducer = (state: RegistrationState, action: RegistrationAction): RegistrationState => {
  switch (action.type) {
    case 'SET_PERSONAL_DATA':
      return {
        ...state,
        personalData: action.payload,
      };
    case 'SET_SELECTED_PLAN':
      return {
        ...state,
        selectedPlan: action.payload,
      };
    case 'SET_PAYMENT_DATA':
      return {
        ...state,
        paymentData: action.payload,
      };
    case 'SET_CURRENT_STEP':
      return {
        ...state,
        currentStep: action.payload,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'CLEAR_REGISTRATION':
      return initialState;
    default:
      return state;
  }
};

// Crear el contexto
export const RegistrationContext = createContext<RegistrationContextType | undefined>(undefined);

// Provider del contexto
interface RegistrationProviderProps {
  children: ReactNode;
}

export const RegistrationProvider: React.FC<RegistrationProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(registrationReducer, initialState);
  const navigate = useNavigate();

  // Acciones para actualizar datos
  const setPersonalData = (data: PersonalData) => {
    dispatch({ type: 'SET_PERSONAL_DATA', payload: data });
    // Guardar en localStorage como respaldo
    localStorage.setItem('registrationPersonalData', JSON.stringify(data));
    
    // Actualizar el paso actual a PERSONAL_DATA si aún no está ahí
    if (state.currentStep < REGISTRATION_STEPS.PERSONAL_DATA) {
      dispatch({ type: 'SET_CURRENT_STEP', payload: REGISTRATION_STEPS.PERSONAL_DATA });
    }
  };

  const setSelectedPlan = (plan: PlanData) => {
    dispatch({ type: 'SET_SELECTED_PLAN', payload: plan });
    localStorage.setItem('registrationPlan', JSON.stringify(plan));
    
    // Actualizar el paso actual a PLAN_SELECTION si aún no está ahí
    if (state.currentStep < REGISTRATION_STEPS.PLAN_SELECTION) {
      dispatch({ type: 'SET_CURRENT_STEP', payload: REGISTRATION_STEPS.PLAN_SELECTION });
    }
  };

  const setPaymentData = (data: PaymentData) => {
    dispatch({ type: 'SET_PAYMENT_DATA', payload: data });
    // Por seguridad, NO guardamos datos de pago en localStorage
  };

  // Navegación de steps
  const nextStep = () => {
    const currentStep = state.currentStep;
    console.log('NextStep called, current step:', currentStep);
    
    if (currentStep < REGISTRATION_STEPS.CONFIRMATION) {
      const nextStepNumber = currentStep + 1;
      console.log('Next step number:', nextStepNumber);
      
      // Si el plan es gratuito, saltar el paso de pago
      if (nextStepNumber === REGISTRATION_STEPS.PAYMENT && isPlanFree()) {
        console.log('Plan is free, skipping to confirmation');
        goToStep(REGISTRATION_STEPS.CONFIRMATION);
        return;
      }
      
      console.log('Going to step:', nextStepNumber);
      goToStep(nextStepNumber);
    }
  };

  const prevStep = () => {
    const currentStep = state.currentStep;
    
    if (currentStep > REGISTRATION_STEPS.PERSONAL_DATA) {
      const prevStepNumber = currentStep - 1;
      
      // Si estamos en confirmación y el plan es gratuito, volver a selección de plan
      if (currentStep === REGISTRATION_STEPS.CONFIRMATION && isPlanFree()) {
        goToStep(REGISTRATION_STEPS.PLAN_SELECTION);
        return;
      }
      
      goToStep(prevStepNumber);
    }
  };

  const goToStep = (step: number) => {
    console.log('GoToStep called with step:', step);
    dispatch({ type: 'SET_CURRENT_STEP', payload: step });
    
    // Navegar a la ruta correspondiente
    switch (step) {
      case REGISTRATION_STEPS.PERSONAL_DATA:
        console.log('Navigating to /register');
        navigate('/register');
        break;
      case REGISTRATION_STEPS.PLAN_SELECTION:
        console.log('Navigating to /plans');
        navigate('/plans');
        break;
      case REGISTRATION_STEPS.PAYMENT:
        console.log('Navigating to /payment');
        navigate('/payment');
        break;
      case REGISTRATION_STEPS.CONFIRMATION:
        console.log('Navigating to /login - registration complete');
        navigate('/login');
        break;
    }
  };

  // Función específica para seleccionar plan y navegar
  const selectPlanAndNavigate = (plan: PlanData) => {
    // Actualizar el estado del plan
    dispatch({ type: 'SET_SELECTED_PLAN', payload: plan });
    localStorage.setItem('registrationPlan', JSON.stringify(plan));
    
    // Actualizar el paso a PLAN_SELECTION
    dispatch({ type: 'SET_CURRENT_STEP', payload: REGISTRATION_STEPS.PLAN_SELECTION });
    
    // Determinar a dónde navegar basándose en el tipo de plan
    const isFree = plan.planPrice === '$0' || plan.planTitle === 'Plan Free';
    
    if (isFree) {
      // Para planes gratuitos, no navegar automáticamente
      // Se manejará con el modal
      return 'free';
    } else {
      // Para planes pagados, navegar a payment
      dispatch({ type: 'SET_CURRENT_STEP', payload: REGISTRATION_STEPS.PAYMENT });
      navigate('/payment');
      return 'paid';
    }
  };

  // Utilidades
  const isStepComplete = (step: number): boolean => {
    switch (step) {
      case REGISTRATION_STEPS.PERSONAL_DATA:
        return state.personalData !== null;
      case REGISTRATION_STEPS.PLAN_SELECTION:
        return state.selectedPlan !== null;
      case REGISTRATION_STEPS.PAYMENT:
        return !needsPayment() || state.paymentData !== null;
      default:
        return false;
    }
  };

  const isPlanFree = (): boolean => {
    const isFree = state.selectedPlan?.planPrice === '$0' || state.selectedPlan?.planTitle === 'Plan Free';
    return isFree;
  };

  const needsPayment = (): boolean => {
    return !isPlanFree() && state.selectedPlan !== null;
  };

  // Envío del registro completo
  const submitRegistration = async (providedPaymentData?: PaymentData): Promise<boolean> => {
    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      // Validar que tenemos todos los datos necesarios
      if (!state.personalData || !state.selectedPlan) {
        throw new Error('Datos incompletos');
      }

      // Para planes que requieren pago, usar los datos proporcionados o los del estado
      const paymentData = providedPaymentData || state.paymentData;
      if (needsPayment() && !paymentData) {
        throw new Error('Datos de pago requeridos');
      }

      // Preparar datos para enviar
      const registrationData = {
        personalData: state.personalData,
        selectedPlan: state.selectedPlan,
        ...(needsPayment() && { paymentData }),
      };

      console.log('Enviando datos de registro:', registrationData);

      // Simular llamada a la API
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Limpiar localStorage después del registro exitoso
      localStorage.removeItem('registrationPersonalData');
      localStorage.removeItem('registrationPlan');

      dispatch({ type: 'SET_LOADING', payload: false });
      return true;

    } catch (error) {
      console.error('Error en el registro:', error);
      dispatch({ type: 'SET_LOADING', payload: false });
      return false;
    }
  };

  const clearRegistration = () => {
    dispatch({ type: 'CLEAR_REGISTRATION' });
    localStorage.removeItem('registrationPersonalData');
    localStorage.removeItem('registrationPlan');
  };

  // Recuperar datos del localStorage al inicializar (opcional)
  React.useEffect(() => {
    const savedPersonalData = localStorage.getItem('registrationPersonalData');
    const savedPlan = localStorage.getItem('registrationPlan');

    if (savedPersonalData) {
      try {
        const personalData = JSON.parse(savedPersonalData);
        dispatch({ type: 'SET_PERSONAL_DATA', payload: personalData });
      } catch (error) {
        console.error('Error al cargar datos personales guardados:', error);
      }
    }

    if (savedPlan) {
      try {
        const plan = JSON.parse(savedPlan);
        dispatch({ type: 'SET_SELECTED_PLAN', payload: plan });
      } catch (error) {
        console.error('Error al cargar plan guardado:', error);
      }
    }
  }, []);

  const contextValue: RegistrationContextType = {
    state,
    setPersonalData,
    setSelectedPlan,
    setPaymentData,
    selectPlanAndNavigate,
    nextStep,
    prevStep,
    goToStep,
    submitRegistration,
    clearRegistration,
    isStepComplete,
    isPlanFree,
    needsPayment,
  };

  return (
    <RegistrationContext.Provider value={contextValue}>
      {children}
    </RegistrationContext.Provider>
  );
};
