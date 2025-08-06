import type { JSX } from 'react';
import type { ItemListType } from '../../types/components';
import { motion, useMotionValue, useAnimation } from 'framer-motion';

function ItemList({ item, onToggle, onDelete }: ItemListType): JSX.Element {
    const x = useMotionValue(0);
    const controls = useAnimation();

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
        <div className="relative w-full mx-auto overflow-hidden">
            {/* Botón visible mientras se desliza */}
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-red-500 flex items-center justify-center rounded-lg">
                <button onClick={() => onDelete && onDelete(item.id)}>🗑️</button>
            </div>

            {/* Contenedor deslizable */}
            <motion.div
                drag="x"
                dragConstraints={{ left: -100, right: 0 }}
                style={{ x }}
                animate={controls}
                onDragEnd={handleDragEnd}
                className="bg-bg-primary border-1 rounded-lg shadow-lg w-full min-h-16 max-h-[74px] mx-auto p-3 z-10 relative"

            >
                <div className='flex flex-row items-center gap-4'>
                    <img src={item.imageUrl} alt={item.name} className='w-[50px]' />
                    <span className={`flex-1 ${item.isSelected ? 'line-through text-gray-500 font-normal' : ''}`}>{item.name}</span>
                    {item.quantity && <p className={`p-0 ${item.isSelected ? 'line-through text-gray-500 font-normal' : ''}`}>{item.quantity}</p>}
                    {item.isSelected !== undefined && <input type="checkbox" name="itemSelect" id="" checked={item.isSelected} className="w-5 h-5" onChange={onToggle} />}
                </div>
            </motion.div>
        </div>
    )
}

export default ItemList;