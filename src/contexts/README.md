# Context de Registro - Documentación

Este Context maneja todo el flujo de registro de usuarios, desde la captura de datos personales hasta la confirmación final.

## 🚀 Características

- **Gestión de estado global** para el flujo de registro
- **Navegación automática** entre pasos
- **Validación** de datos en cada paso
- **Persistencia** en localStorage (datos no sensibles)
- **Salto automático** del paso de pago para planes gratuitos
- **Manejo de errores** y loading states

## 📁 Estructura

```
src/
├── types/registration.ts      # Tipos TypeScript
├── contexts/
│   ├── RegistrationContext.tsx  # Context principal
│   └── README.md              # Esta documentación
└── examples/
    └── RegisterWithContext.tsx # Ejemplo de uso
```

## 🔧 Instalación

### 1. Envolver la aplicación con el Provider

En tu `App.tsx` o donde definas las rutas:

```tsx
import { RegistrationProvider } from './contexts/RegistrationContext';

function App() {
  return (
    <BrowserRouter>
      <RegistrationProvider>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/plan" element={<Plans />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/welcome" element={<Welcome />} />
          {/* otras rutas */}
        </Routes>
      </RegistrationProvider>
    </BrowserRouter>
  );
}
```

### 2. Usar el hook en tus componentes

```tsx
import { useRegistration } from '../contexts/RegistrationContext';

function Register() {
  const { 
    setPersonalData, 
    nextStep, 
    state,
    isStepComplete,
    isPlanFree 
  } = useRegistration();

  // Tu lógica aquí...
}
```

## 🛠 API del Context

### Estado

```tsx
interface RegistrationState {
  personalData: PersonalData | null;      // Datos del formulario de registro
  selectedPlan: PlanData | null;          // Plan seleccionado
  paymentData: PaymentData | null;        // Datos de pago (no se persiste)
  currentStep: number;                    // Paso actual (1-4)
  isLoading: boolean;                     // Estado de carga
}
```

### Funciones Principales

#### Actualización de datos
- `setPersonalData(data)` - Guarda datos personales
- `setSelectedPlan(plan)` - Guarda plan seleccionado  
- `setPaymentData(data)` - Guarda datos de pago

#### Navegación
- `nextStep()` - Avanza al siguiente paso
- `prevStep()` - Retrocede al paso anterior
- `goToStep(step)` - Va a un paso específico

#### Utilidades
- `isStepComplete(step)` - Verifica si un paso está completo
- `isPlanFree()` - Verifica si el plan es gratuito
- `needsPayment()` - Verifica si necesita datos de pago

#### Acciones
- `submitRegistration()` - Envía todos los datos al servidor
- `clearRegistration()` - Limpia todo el estado

## 🔄 Flujo de Uso

### Paso 1: Datos Personales (/register)
```tsx
const handleSubmit = (formData) => {
  const personalData = {
    firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.email,
    password: formData.password,
  };
  
  setPersonalData(personalData);
  nextStep(); // Va automáticamente a /plan
};
```

### Paso 2: Selección de Plan (/plan)
```tsx
const handlePlanSelect = (selectedPlan) => {
  setSelectedPlan(selectedPlan);
  nextStep(); // Va a /payment o /welcome según el plan
};
```

### Paso 3: Pago (/payment) - Solo planes pagados
```tsx
const handlePayment = (paymentData) => {
  setPaymentData(paymentData);
  nextStep(); // Va a /welcome
};
```

### Paso 4: Confirmación (/welcome)
```tsx
const handleConfirm = async () => {
  const success = await submitRegistration();
  if (success) {
    // Redirigir al dashboard
    navigate('/dashboard');
  }
};
```

## 🎨 Componente de Progreso

Puedes crear un indicador visual del progreso:

```tsx
function ProgressIndicator() {
  const { state, isStepComplete } = useRegistration();
  
  const steps = [
    { number: 1, title: "Datos personales" },
    { number: 2, title: "Seleccionar plan" },
    { number: 3, title: "Pago" },
    { number: 4, title: "Confirmar" }
  ];

  return (
    <div className="flex justify-center mb-6">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center">
          <div className={`
            w-8 h-8 rounded-full flex items-center justify-center text-sm
            ${state.currentStep >= step.number 
              ? 'bg-orange-500 text-white' 
              : 'border-2 border-gray-300 text-gray-400'
            }
          `}>
            {step.number}
          </div>
          <span className="ml-2 mr-4 text-sm">{step.title}</span>
          {index < steps.length - 1 && (
            <div className="w-8 border-t border-gray-300 mx-2" />
          )}
        </div>
      ))}
    </div>
  );
}
```

## 🔒 Seguridad

- **Datos personales**: Se guardan en localStorage para persistencia
- **Datos de pago**: NO se guardan en localStorage por seguridad
- **Contraseñas**: Se almacenan temporalmente solo hasta el envío final

## 📝 Ejemplo Completo

Ver `src/examples/RegisterWithContext.tsx` para un ejemplo completo de implementación.

## 🐛 Manejo de Errores

```tsx
const { submitRegistration, state } = useRegistration();

const handleSubmit = async () => {
  try {
    const success = await submitRegistration();
    if (!success) {
      alert('Error en el registro. Intenta nuevamente.');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};
```

## 🔄 Estado de Loading

```tsx
const { state } = useRegistration();

return (
  <DynamicForm 
    isLoading={state.isLoading}
    // ... otras props
  />
);
```
