import type { JSX } from 'react';
import { useState, useCallback } from 'react';
import type { DynamicFormProps, FormFieldConfig } from '../../types/components';

export default function DynamicForm({
    fields,
    onSubmit,
    submitButtonText = 'Enviar',
    submitButtonVariant = 'primary',
    isLoading = false,
    className = '',
    resetOnSubmit = false,
    size = 'medium',
    children
}: DynamicFormProps): JSX.Element {
    type valueType = string | number | undefined;
    const [formData, setFormData] = useState<Record<string, valueType>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Size styles
    const sizeStyles = {
        small: 'px-4 py-2 text-sm',
        medium: 'px-6 py-3 text-base',
        large: 'px-8 py-4 text-lg'
    };

    // Initialize form data with empty values
    const initializeFormData = useCallback(() => {
        const initialData: Record<string, valueType> = {};
        fields.forEach(field => {
            initialData[field.name] = '';
        });
        setFormData(initialData);
        setErrors({});
    }, [fields]);

    // Handle input changes
    const handleInputChange = (name: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    // Validate individual field
    const validateField = (field: FormFieldConfig, value: string): string => {
        if (field.required && !value.trim()) {
            return `${field.label} es requerido`;
        }

        if (field.validation) {
            const { minLength, maxLength, pattern, min, max } = field.validation;

            if (minLength && value.length < minLength) {
                return `${field.label} debe tener al menos ${minLength} caracteres`;
            }

            if (maxLength && value.length > maxLength) {
                return `${field.label} no puede tener más de ${maxLength} caracteres`;
            }

            if (pattern && !new RegExp(pattern).test(value)) {
                return `${field.label} no tiene el formato correcto`;
            }

            if (field.type === 'number') {
                const numValue = parseFloat(value);
                if (min !== undefined && numValue < min) {
                    return `${field.label} debe ser mayor o igual a ${min}`;
                }
                if (max !== undefined && numValue > max) {
                    return `${field.label} debe ser menor o igual a ${max}`;
                }
            }
        }

        return '';
    };

    // Validate all fields
    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};
        let isValid = true;

        fields.forEach(field => {
            const rawValue = formData[field.name];
            const value = rawValue !== undefined && rawValue !== null ? String(rawValue) : '';
            const error = validateField(field, value);
            if (error) {
                newErrors[field.name] = error;
                isValid = false;
            }
        });

        setErrors(newErrors);
        return isValid;
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            await onSubmit(formData);
            if (resetOnSubmit) {
                initializeFormData();
            }
        } catch (error) {
            console.error('Form submission error:', error);
        }
    };

    // Render input field based on type
    const renderField = (field: FormFieldConfig) => {
        const value = formData[field.name] || '';
        const error = errors[field.name];
        const baseInputClasses = `
            w-full px-4 py-3 border rounded-lg transition-all duration-200 
            focus:outline-none focus:ring-1 focus:ring-[#FE6700] focus:border-transparent
            ${error
                ? 'border-red-500 bg-red-50'
                : 'border-gray-300 hover:border-gray-400 focus:border-blue-500'
            }
            ${field.disabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : 'bg-white'}
        `;

        const commonProps = {
            id: field.name,
            name: field.name,
            placeholder: field.placeholder,
            required: field.required,
            disabled: field.disabled || isLoading,
            value,
            onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                handleInputChange(field.name, e.target.value),
            className: `${baseInputClasses} ${field.className || ''}`.trim()
        };

        if (field.type === 'textarea') {
            return (
                <textarea
                    {...commonProps}
                    rows={4}
                    minLength={field.validation?.minLength}
                    maxLength={field.validation?.maxLength}
                />
            );
        }

        return (
            <input
                {...commonProps}
                type={field.type}
                pattern={field.validation?.pattern}
                minLength={field.validation?.minLength}
                maxLength={field.validation?.maxLength}
                min={field.validation?.min}
                max={field.validation?.max}
            />
        );
    };

    // Button variant styles
    const getButtonStyles = () => {
        switch (submitButtonVariant) {
            case 'primary':
                return `base-button-styles primary-button ${sizeStyles[size]}`;
            case 'secondary':
                return `base-button-styles secondary-button ${sizeStyles[size]}`;
            case 'outline':
                return `base-button-styles outline-button ${sizeStyles[size]}`;
            default:
                return `base-button-styles primary-button ${sizeStyles[size]}`;
        }
    };

    return (
        <div className={`rounded-lg shadow-lg p-8 max-w-[80%] md:max-w-[60%] mx-auto mb-8 ${className}`.trim()}>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Form Fields */}
                <div className="grid gap-6 grid-cols-1">
                    {fields.map((field) => (
                        <div
                            key={field.name}
                            className={`${field.type === 'textarea' ? 'md:col-span-2' : ''}`}
                        >
                            {/* Label */}
                            <label
                                htmlFor={field.name}
                                className="block text-sm font-medium mb-2"
                            >
                                {field.label}
                                {field.required && (
                                    <span className="text-feedback-error ml-1">*</span>
                                )}
                            </label>

                            {/* Input Field */}
                            {renderField(field)}

                            {/* Error Message */}
                            {errors[field.name] && (
                                <p className="mt-1 text-sm text-feedback-error flex items-center">
                                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {errors[field.name]}
                                </p>
                            )}
                        </div>
                    ))}
                </div>

                {/* Submit Button */}
                <div className="flex flex-col gap-6 justify-center pt-4">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={getButtonStyles()}
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Enviando...
                            </div>
                        ) : (
                            submitButtonText
                        )}
                    </button>
                    {children}
                </div>
            </form>
        </div>
    );
}
