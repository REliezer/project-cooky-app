import type { JSX } from 'react';
import type { ButtonProps } from '../../types';

export default function Button({ 
    label, 
    variant = 'primary', 
    size = 'medium', 
    isLoading = false, 
    disabled = false,
    className = '',
    ...props 
}: ButtonProps): JSX.Element {
    
    // Base styles
    const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
    
    // Variant styles
    const variantStyles = {
        primary: 'bg-btn-primary text-secondary hover:bg-btn-primary-hover focus:ring-orange-500 shadow-lg',
        secondary: 'bg-btn-secondary text-primary hover:bg-btn-secondary-hover focus:ring-gray-500 shadow-lg',
        outline: 'bg-btn-outline border border-orange-600 text-orange-600 hover:bg-btn-outline-hover focus:ring-orange-500'
    };
    
    // Size styles
    const sizeStyles = {
        small: 'px-4 py-2 text-sm',
        medium: 'px-6 py-3 text-base',
        large: 'px-8 py-4 text-lg'
    };
    
    // Disabled styles
    const disabledStyles = 'opacity-50 cursor-not-allowed';
    
    // Combine all styles
    const buttonClasses = [
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        (disabled || isLoading) && disabledStyles,
        className
    ].filter(Boolean).join(' ');
    
    return (
        <button 
            className={buttonClasses}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading && (
                <svg 
                    className="animate-spin -ml-1 mr-3 h-5 w-5" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24"
                >
                    <circle 
                        className="opacity-25" 
                        cx="12" 
                        cy="12" 
                        r="10" 
                        stroke="currentColor" 
                        strokeWidth="4"
                    />
                    <path 
                        className="opacity-75" 
                        fill="currentColor" 
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                </svg>
            )}
            {label}
        </button>
    );
}
