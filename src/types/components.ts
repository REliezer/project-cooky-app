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
}