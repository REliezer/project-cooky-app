import type { JSX } from 'react';
import type { ItemListType } from '../../types/components';
import { motion, useMotionValue, useAnimation, useTransform } from 'framer-motion';

function ItemList({ item, onToggle, onDelete }: ItemListType): JSX.Element {
    const x = useMotionValue(0);
    const controls = useAnimation();
    
    // Calcular la opacidad del overlay rojo basado en la distancia arrastrada
    const redOpacity = useTransform(x, [0, -50], [0, 0.6]);
    
    // Calcular la escala del botón de eliminar
    const deleteButtonScale = useTransform(x, [0, -50], [0.8, 1.2]);
    
    const handleDragEnd = () => {
        const currentX = x.get();
        if (currentX > -50) {
            controls.start({ x: 0 }); // si no pasó el umbral, regresa a posición inicial
        } else {
            // Si pasó el umbral, ejecutar eliminación
            if (onDelete) {
                onDelete(item.id);
            }
        }
    };

    return (
        <div className="relative w-full mx-auto overflow-hidden rounded-lg">
            {/* Overlay rojo progresivo */}
            <motion.div 
                className="absolute inset-0 bg-red-500 rounded-lg z-[2] pointer-events-none"
                style={{ opacity: redOpacity }}
            />
            
            {/* Botón visible mientras se desliza */}
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-red-600 flex items-center justify-center rounded-lg z-[6]">
                <motion.button 
                    onClick={() => onDelete && onDelete(item.id)}
                    style={{ scale: deleteButtonScale }}
                    className="transition-transform duration-150 relative z-[7]"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-trash2-icon lucide-trash-2">
                        <path d="M10 11v6" />
                        <path d="M14 11v6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                        <path d="M3 6h18" />
                        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                </motion.button>
            </div>
            
            {/* Contenedor deslizable */}
            <motion.div
                drag="x"
                dragConstraints={{ left: -100, right: 0 }}
                style={{ x }}
                animate={controls}
                onDragEnd={handleDragEnd}
                className="relative bg-white border-1 rounded-lg shadow-lg w-full min-h-16 max-h-[74px] mx-auto p-3 pl-5 z-10
                before:content-[''] before:absolute before:left-0.5 before:top-[50%] before:translate-y-[-50%]
                before:w-[12px] before:h-[65px] before:rounded-full before:bg-[#FFC36D]/40 before:z-[-1]"

            >
                <div className='flex flex-row items-center gap-4'>
                    <div className='rounded-full shadow-lg w-[50px] h-[50px] flex items-center justify-center overflow-hidden'>
                        <div
                            className="w-[40px] h-[40px] flex-shrink-0"
                            dangerouslySetInnerHTML={{ __html: item.svg }}
                        />
                    </div>
                    <span className={`flex-1 ${item.isSelected ? 'line-through text-gray-500 font-normal' : ''}`}>{item.name}</span>
                    {item.quantity && <p className={`p-0 ${item.isSelected ? 'line-through text-gray-500 font-normal' : ''}`}>{item.quantity}</p>}
                    {item.isSelected !== undefined && <input type="checkbox" name="itemSelect" id="" checked={item.isSelected} className="w-5 h-5" onChange={onToggle} />}
                </div>
            </motion.div>
        </div>
    )
}

export default ItemList;