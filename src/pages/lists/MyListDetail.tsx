import { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import ItemList from "../../components/common/ItemList";

import type { ListCardProps, ItemType } from "../../types";
import Loading from "../../components/common/Loading";
import Alert from "../../components/common/Alert";
import Button from "../../components/common/Button";
import IconWithTitle from "../../components/ui/IconWithTitle";
import { toast } from "sonner";

const LOCAL_STORAGE_KEY = 'cooky-my-lists';

function MyListDetail() {
    const location = useLocation();
    const { listId } = useParams();
    const navigate = useNavigate();

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
                    const foundList = parsedLists.find((list: ListCardProps) => list.id === listId);
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
        setProductsList((prevProductsList: ItemType[]) => {
            const updatedList = prevProductsList.map((product: ItemType, i: number) =>
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

    // Función para eliminar un item de la lista
    const onDeleteItem = (id: string) => {
        setProductsList((prevProductsList: ItemType[]) => {
            // Filtrar el item que se quiere eliminar
            const updatedList = prevProductsList.filter((item: ItemType) => item.id !== id);

            // Guardar cambios en localStorage
            saveChangesToStorage(updatedList);

            // Mostrar notificación de confirmación
            toast.success('Item eliminado de la lista');

            return updatedList;
        });
    }

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
                {/* Botón de regreso + Título */}
                <IconWithTitle title={displayListData?.nameList} url={'/app/list'} />
                {displayListData?.description && (
                    <p className="text-text-primary">{displayListData.description}</p>
                )}
                <p className="text-sm text-text-primary">Fecha: {displayListData?.date}</p>
            </div>
            <div className="border-2 border-[#461604] rounded-lg p-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {
                        productsList?.map((item: ItemType, index: number) => (
                            <ItemList
                                key={`${item.name}-${index}`}
                                item={item}
                                onToggle={() => handleToggleIngredient(index)}
                                onDelete={() => onDeleteItem(item.id)}
                            />
                        ))
                    }
                </div>
                <Button
                    label='+ Añadir item a la lista'
                    variant='secondary'
                    size='medium'
                    className="mt-4 w-full"
                    onClick={() => navigate('/app/categories')}
                />
            </div>

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