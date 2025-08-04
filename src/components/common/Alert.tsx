interface AlertProps {
    message: string;
    type: 'error' | 'info' | 'warning' | 'success';
    children?: React.ReactNode;
}

const typeStyles = {
    error: 'text-red-500',
    info: 'text-blue-500',
    warning: 'text-yellow-500',
    success: 'text-green-500',
};

const typeIcons = {
    error: (
        <svg className="w-16 h-16 mx-auto" fill="none" stroke="#fb2c36" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
    info: (
        <svg className="w-16 h-16 mx-auto" fill="none" stroke="oklch(62.3% 0.214 259.815)" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
    warning: (
        <svg className="w-16 h-16 mx-auto" fill="none" stroke="#f59e0b" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
    ),
    success: (
        <svg className="w-16 h-16 mx-auto" fill="none" stroke="#10b981" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
};

function Alert({ message, type, children }: AlertProps) {
    return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
                <div className={`mb-4 ${typeStyles[type]}`}>
                    {typeIcons[type]}
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-2">
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                </h3>
                <p className="text-text-primary mb-4">{message}</p>
                {children}
            </div>
        </div>
    );
}

export default Alert;
