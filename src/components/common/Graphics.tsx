import type { JSX } from 'react';
import type { GraphicsProps } from '../../types';
import graphicsImage from '../../assets/images/graphics_1.png';

export default function Graphics({ variant = 'right', title, subtitle }: GraphicsProps): JSX.Element {

    if (variant === 'left') {
        return (
            <div className="flex items-center gap-4 md:gap-10 mb-8">
                <img
                    src={graphicsImage}
                    alt="Graphics decoration"
                    className="w-[100px] h-auto flex-shrink-0"
                />
                <div className="flex flex-col items-center justify-center w-full">
                    <h1 className="font-bold text-center mb-2 md:mb-4">
                        {title}
                    </h1>
                    {subtitle && (
                        <p className="text-center">
                            {subtitle}
                        </p>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className='flex flex-row justify-between'>
            <img
                src={graphicsImage}
                alt="Graphics decoration"
                className='position-graphics-right'
            />
            <div className='custom-radius'></div>
        </div>
    );
}
