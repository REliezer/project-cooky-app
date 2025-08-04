import { useState, useEffect, useCallback } from "react";
import { useLocation, useParams } from "react-router-dom";

import ItemList from "../../components/common/ItemList";

import type { ListCardProps } from "../../types";
import Loading from "../../components/common/Loading";
import Alert from "../../components/common/Alert";
import Button from "../../components/common/Button";
import { toast } from "sonner";

const LOCAL_STORAGE_KEY = 'cooky-my-lists';

function MyListDetail() {
    const location = useLocation();
    const { listId } = useParams();

    // Acceder a los datos pasados via state
    const listData = location.state?.listData as ListCardProps;
    const initialItemsList = location.state?.itemsList || [];

    // Estados
    const [productsList, setProductsList] = useState(initialItemsList);
    const [currentListData, setCurrentListData] = useState(listData);
    const [isLoading, setIsLoading] = useState(false);

    // Fallback si no hay state (usuario accedió directamente a la URL)
    useEffect(() => {
        if (!listData && listId) {
            setIsLoading(true);
            try {
                const savedLists = localStorage.getItem(LOCAL_STORAGE_KEY);
                if (savedLists) {
                    const parsedLists = JSON.parse(savedLists);
                    const foundList = parsedLists.find(list => list.id === listId);
                    if (foundList) {
                        setProductsList(foundList.itemsList);
                        setCurrentListData(foundList);
                    }
                }
            } catch (error) {
                console.error('Error loading list data:', error);
            } finally {
                setIsLoading(false);
            }
        }
    }, [listData, listId]);

    // Función para guardar cambios en localStorage
    const saveChangesToStorage = useCallback((updatedItems: typeof productsList) => {
        try {
            const savedLists = localStorage.getItem(LOCAL_STORAGE_KEY);
            if (savedLists && listId) {
                const parsedLists = JSON.parse(savedLists);
                const updatedLists = parsedLists.map((list: ListCardProps) =>
                    list.id === listId
                        ? { ...list, itemsList: updatedItems }
                        : list
                );
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedLists));
            }
        } catch (error) {
            console.error('Error saving changes:', error);
        }
    }, [listId]);

    // Función para alternar el estado de selección de un ingrediente
    const handleToggleIngredient = (index: number) => {
        setProductsList((prevProductsList) => {
            const updatedList = prevProductsList.map((product, i) =>
                i === index
                    ? { ...product, isSelected: !product.isSelected }
                    : product
            );

            // Guardar cambios en localStorage
            saveChangesToStorage(updatedList);
            return updatedList;
        });
        toast.info('Actualizado')
    };

    // Estado de carga
    if (isLoading) {
        return (
            <Loading
                description='Cargando lista...'
            />
        );
    }

    // Si no hay datos de la lista
    if (!currentListData && !listData) {
        return (
            <Alert
                type='warning'
                message='No se encontraron datos de la lista'
            />
        );
    }

    const displayListData = currentListData || listData;

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="mb-6">
                <h1 className="text-3xl font-bold mb-2">{displayListData?.nameList}</h1>
                {displayListData?.description && (
                    <p className="text-text-primary">{displayListData.description}</p>
                )}
                <p className="text-sm text-text-primary">Fecha: {displayListData?.date}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {
                    productsList?.map((item, index) => (
                        <ItemList
                            key={`${item.name}-${index}`}
                            item={item}
                            onToggle={() => handleToggleIngredient(index)}
                        />
                    ))
                }
            </div>
            <Button
                label='+ Añadir item a la lista'
                variant='secondary'
                size='medium'
                className="mt-4 w-full"
            />

            {productsList?.length === 0 && (
                <Alert
                    type='info'
                    message='No hay items en esta lista'
                />
            )}
        </div>
    )
}

export default MyListDetail;