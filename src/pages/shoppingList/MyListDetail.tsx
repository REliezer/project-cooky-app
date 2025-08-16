import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ItemList from "../../components/common/ItemList";

import type { ShoppingListItem } from "../../types/shoppingList";
import Loading from "../../components/common/Loading";
import Alert from "../../components/common/Alert";
import Button from "../../components/common/Button";
import IconWithTitle from "../../components/ui/IconWithTitle";
import { toast } from "sonner";
import { useShoppingListStore } from "../../store/useShoppingListStore";

function MyListDetail() {
    const { listId } = useParams();
    const navigate = useNavigate();

    // Store - usando únicamente el store como fuente de verdad
    const { 
        lists, 
        isLoading, 
        error,
        getShoppingListById, 
        deleteItemShoppingList,
        updateItemPurchaseStatus,
        setCurrentListId
    } = useShoppingListStore();

    // Obtener la lista actual del store
    const currentList = listId ? lists.find(list => list.list_id === listId) : null;

    // Establecer currentListId cuando cambia el listId
    useEffect(() => {
        if (listId) {
            setCurrentListId(listId);
        }
    }, [listId, setCurrentListId]);

    // Cargar datos del store cuando cambia la lista o cuando se monta el componente
    useEffect(() => {
        if (!listId) {
            return;
        }

        // Si la lista no está en el store, cargarla
        if (!currentList) {
            getShoppingListById(listId);
            return;
        }
    }, [listId, currentList, getShoppingListById]);
    
    // Función para alternar el estado de selección de un ingrediente  
    const handleToggleIngredient = async (itemId: string) => {
        if (!listId || !itemId) {
            toast.error('Error: falta información de lista o item');
            return;
        }
        
        // Buscar el item actual para conocer su estado
        const currentItem = currentList?.items?.find(item => item.item_id === itemId);
        if (!currentItem) {
            toast.error('Error: item no encontrado');
            return;
        }
        
        const newPurchasedStatus = !currentItem.is_purchased;
        
        try {
            console.log('🔄 [MyListDetail] Actualizando item:', { listId, itemId, newPurchasedStatus });
            
            // Llamar a la función del store para actualizar el estado
            await updateItemPurchaseStatus(listId, itemId, newPurchasedStatus);
            
            // Mostrar mensaje de confirmación
            const statusMessage = newPurchasedStatus ? 'marcado como comprado' : 'desmarcado como comprado';
            toast.success(`Item ${statusMessage}`);
            
        } catch (error) {
            console.error('Error toggling ingredient:', error);
            toast.error('Error al actualizar el estado del item');
        }
    };

    // Función para eliminar un item de la lista
    const onDeleteItem = async (id: string) => {
        if (!listId) return;
        
        try {
            await deleteItemShoppingList(listId, id);
            // No necesitamos actualizar el estado local aquí porque el store se actualiza
            // y el useEffect de abajo se encargará de sincronizar
        } catch (err) {
            console.error('Error deleting item:', err);
        }
    };

    // Estado de carga
    if (isLoading) {
        return (
            <Loading
                description='Cargando lista...'
            />
        );
    }

    // Si no hay listId en params
    if (!listId) {
        return (
            <Alert
                type='warning'
                message='ID de lista no proporcionado'
            />
        );
    }

    // Manejar errores del store
    if (error) {
        return (
            <Alert
                type='error'
                message={error}
            />
        );
    }

    // Si no hay datos de la lista y no está cargando
    if (!currentList && !isLoading) {
        return (
            <Alert
                type='warning'
                message='No se encontraron datos de la lista'
            >
                <Button
                    label="Volver a mis listas"
                    onClick={() => navigate('/app/list')}
                    variant="primary"
                />
            </Alert>
        );
    }

    // Si no existe la lista, no renderizar nada (la condición de arriba debe capturar esto)
    if (!currentList) {
        return null;
    }

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="mb-6">
                {/* Botón de regreso + Título */}
                <IconWithTitle title={currentList.name} url={'/app/list'} />
                {currentList.description && (
                    <p className="text-text-primary">{currentList.description}</p>
                )}
                <p className="text-sm text-text-primary">Fecha: {currentList.created_at ? new Date(currentList.created_at).toLocaleDateString() : ''}</p>
            </div>
            <div className="border-2 border-[#461604] rounded-lg p-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {
                        currentList.items?.map((item: ShoppingListItem, index: number) => (
                            <ItemList
                                key={`${item.item_id || item.name}-${index}`}
                                item={item}
                                onToggle={() => handleToggleIngredient(item.item_id || '')}
                                onDelete={onDeleteItem}
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

            {(!currentList.items || currentList.items.length === 0) && (
                <Alert
                    type='info'
                    message='No hay items en esta lista'
                />
            )}
        </div>
    )
}

export default MyListDetail;