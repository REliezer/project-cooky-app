// Component Props
export interface FeatureSectionProps {
  title: string;
  description: string;
  icon: string | React.ReactNode;
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  isLoading?: boolean;
  disabled?: boolean;
}

export interface GraphicsProps {
  variant?: 'right' | 'left';
  className?: string;
  title?: string;
  subtitle?: string;
}

// Dynamic Form Types
export interface FormFieldConfig {
  name: string;
  type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'time' | 'datetime-local' | 'textarea' | 'list';
  label: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  options?: Array<{ value: string; label: string }>;
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    min?: number;
    max?: number;
  };
  className?: string;
}

export interface DynamicFormProps {
  fields: FormFieldConfig[];
  onSubmit: (formData: Record<string, string | number | boolean>) => void | Promise<void>;
  submitButtonText?: string;
  submitButtonVariant?: 'primary' | 'secondary' | 'outline';
  isLoading?: boolean;
  className?: string;
  resetOnSubmit?: boolean;
  size?: 'small' | 'medium' | 'large';
  children?: React.ReactNode;
}

export interface PlanCardProps {
  plan: {
    planTitle: string;
    planSubtitle: string;
    planPrice: string;
    planDuration: string;
    planFeatures: string[];
  };
  onPlanSelect?: (plan: PlanCardProps['plan']) => void;
}

export interface ItemListProps {
  item: {
    name: string;
    quantity?: string;
    imageUrl: string;
    isSelected?: boolean;
  };
  onToggle?: () => void;
}

export interface ListCardProps {
  nameList: string;
  description?: string;
  date: string;
  itemsList: {
    name: string;
    quantity?: string;
    imageUrl: string;
    isSelected?: boolean;
  }[];
  onDelete?: () => void;
  onClick?: () => void;
}

//Modal
export interface ModalProps {
    isOpen: boolean;
    type?: 'signout' | 'form' | 'info';
    title: string;
    children: React.ReactNode;
    onConfirm: () => void;
    onCancel: () => void;
}

//Card
export interface CardProps {
  cardholderName: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

export type CardType = 'visa' | 'mastercard' | 'amex' | 'discover' | 'unknown';

export interface CardInfo {
  type: CardType;
  isValid: boolean;
  errors: {
    number?: string;
    expiry?: string;
    name?: string;
  };
}
