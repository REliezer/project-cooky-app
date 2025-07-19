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
  type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'time' | 'datetime-local' | 'textarea';
  label: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
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
  onSubmit: (formData: Record<string, any>) => void | Promise<void>;
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
}