import type { JSX } from 'react';
import type { ItemListProps } from '../../types/components';
//import { useState } from 'react';

function ItemList({ item, onToggle }: ItemListProps): JSX.Element {
    //const [showDelete, setShowDelete] = useState(false);

    return (
        <div className="bg-bg-primary border-1 rounded-lg shadow-lg w-[80%] min-h-16 max-h-[74px] mx-auto p-3">
            <div className='flex flex-row items-center gap-4'>
                <img src={item.imageUrl} alt={item.name} className='w-[50px]' />
                <span className={`flex-1 ${item.isSelected ? 'line-through text-gray-500 font-normal' : ''}`}>{item.name}</span>
                {item.quantity && <p className={`p-0 ${item.isSelected ? 'line-through text-gray-500 font-normal' : ''}`}>{item.quantity}</p>}
                {item.isSelected !== undefined && <input type="checkbox" name="itemSelect" id="" checked={item.isSelected} className="w-5 h-5" onChange={onToggle} />}
            </div>
        </div>
    )
}

export default ItemList;