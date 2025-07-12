import type { JSX } from 'react';
import type { GraphicsProps } from '../../types';
import graphicsImage from '../../assets/images/graphics_1.png';

export default function Graphics({ variant = 'right' }:GraphicsProps ): JSX.Element {
    
    return (
        <div className='flex justify-between'>
            <img 
                src={graphicsImage} 
                alt="Graphics decoration" 
                className={variant === 'right' ? 'position-graphics-right' : 'position-graphics-left'} />
            {variant === 'right' && <div className='custom-radius'></div>}
        </div>
            
    );
}
