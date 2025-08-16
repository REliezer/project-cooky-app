import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import ListCard from "../../components/common/ListCard";
import Modal from "../../components/common/Modal";
import Button from "../../components/common/Button";
import Loading from "../../components/common/Loading";
import Alert from "../../components/common/Alert";
import DynamicForm from "../../components/common/DynamicForm";

import { useShoppingListStore } from "../../store/useShoppingListStore";
import type { ShoppingList } from "../../types/shoppingList";
import type { FormFieldConfig, ListCardProps } from "../../types";
import { findSvgByName } from "../../utils/ingredientSvg";

function MyList() {
    const navigate = useNavigate();
    
    // Store
    const { 
        lists,
        listsWithStats, 
        isLoading, 
        error, 
        success,
        message,
        getShoppingList, 
        saveShoppingList, 
        deleteShoppingListById,
        setCurrentListId,
    } = useShoppingListStore();
    const [deleteModal, setDeleteModal] = useState<{
        isOpen: boolean;
        listId: string | null;
        listName: string;
    }>({ isOpen: false, listId: null, listName: '' });
    const [newListModal, setNewListModal] = useState<{
        isOpen: boolean;
    }>({ isOpen: false });

    const newListFormFields: FormFieldConfig[] = [
        {
            name: 'nameList',
            type: 'text',
            label: 'Nombre de la lista',
            placeholder: 'Ej: Lista de compras para el almuerzo',
            required: true,
            validation: {
                minLength: 3,
                maxLength: 50
            }
        },
        {
            name: 'description',
            type: 'textarea',
            label: 'Descripción (opcional)',
            placeholder: 'Describe para qué es esta lista...',
            required: false,
            validation: {
                maxLength: 200
            }
        }
    ]

    // Cargar listas al montar el componente
    useEffect(() => {
        loadLists();
    }, []);
    
    // Mostrar mensajes de éxito
    useEffect(() => {
        if (success && message) {
            toast.success(message);
        }
    }, [success, message]);

    // Función para cargar listas
    const loadLists = useCallback(async () => {
        await getShoppingList();
    }, [getShoppingList]);

    // Función para abrir modal de confirmación de eliminación
    const handleDeleteClick = useCallback((listId: string, listName: string) => {
        setDeleteModal({
            isOpen: true,
            listId,
            listName
        });
    }, []);

    // Función para confirmar eliminación
    const handleConfirmDelete = useCallback(async () => {
        if (!deleteModal.listId) return;

        try {
            await deleteShoppingListById(deleteModal.listId);
            setDeleteModal({ isOpen: false, listId: null, listName: '' });
        } catch (err) {
            console.error('Error deleting list:', err);
        }
    }, [deleteModal.listId, deleteShoppingListById]);

    // Función para cancelar eliminación
    const handleCancelDelete = useCallback(() => {
        setDeleteModal({ isOpen: false, listId: null, listName: '' });
    }, []);

    // Función para manejar click en tarjeta
    const handleCardClick = useCallback((listId: string) => {
        try {
            // Establecer la lista actual en el store global
            setCurrentListId(listId);
            // Navegar al detalle de la lista
            navigate(`/app/list/${listId}`);
        } catch (err) {
            console.error('Navigation error:', err);
        }
    }, [navigate, setCurrentListId]);

    // Función para crear nueva lista
    const handleCreateList = () => {
        setNewListModal({isOpen: true})
    };

    // Función para guardar nueva lista
    const handleSaveList = async (formData: Record<string, string | number | boolean>) => {
        try {
            const newShoppingList: ShoppingList = {
                name: formData.nameList as string,
                description: formData.description as string,
                items: [], // Lista vacía inicialmente
                created_at: new Date().toISOString()
            };
            
            await saveShoppingList(newShoppingList);
            setNewListModal({ isOpen: false });
        } catch (err) {
            console.error('Error creating new list:', err);
        }
    };

    // Función para recargar listas
    const handleRefresh = useCallback(() => {
        loadLists();
    }, [loadLists]);

    // Estados de carga y error
    if (isLoading) {
        return (
            <Loading
                description='Cargando lista...'
            />
        );
    }

    if (error) {
        return (
            <Alert
                message={error}
                type='error'
            >
                <Button
                    label="Reintentar"
                    onClick={handleRefresh}
                    variant="primary"
                />
            </Alert>
        );
    }

    return (
        <div className="container mx-auto px-4 py-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Mis Listas</h1>
                    <p className="text-text-primary">
                        {lists.length === 0
                            ? 'No tienes listas creadas'
                            : `${lists.length} lista${lists.length !== 1 ? 's' : ''} creada${lists.length !== 1 ? 's' : ''}`
                        }
                    </p>
                </div>
            </div>

            {/* Lista de tarjetas o mensaje vacío */}
            {lists.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16">
                    <div className="text-gray-400 mb-6">
                        <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">No tienes listas aún</h3>
                    <Button
                        label="Crear mi primera lista"
                        onClick={handleCreateList}
                        variant="primary"
                        size="large"
                    />
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-3 w-full">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {(listsWithStats.length > 0 ? listsWithStats : lists.map(list => ({ 
                            ShoppingList: list, 
                            stats: { 
                                total_items: list.items.length, 
                                purchased_items: list.items.filter(i => i.is_purchased).length, 
                                pending_items: list.items.filter(i => !i.is_purchased).length, 
                                completion_percentage: list.items.length > 0 ? Math.round((list.items.filter(i => i.is_purchased).length / list.items.length) * 100) : 0
                            }, 
                            formatted_created_at: list.created_at ? new Date(list.created_at).toLocaleDateString() : '', 
                            item_count: list.items.length 
                        }))).map((listGetItem) => {
                            const item = listGetItem.ShoppingList;
                            const stats = listGetItem.stats;
                            
                            // Adaptador mejorado para convertir ShoppingListGet a ListCardProps
                            const adaptedItem: ListCardProps = {
                                id: item.list_id || '',
                                nameList: item.name,
                                description: item.description || `${stats.total_items} items • ${stats.completion_percentage}% completado`,
                                date: listGetItem.formatted_created_at || (item.created_at ? new Date(item.created_at).toLocaleDateString() : ''),
                                itemsList: item.items.slice(0, 5).map(shoppingItem => ({ // Mostrar solo los primeros 5 items
                                    id: shoppingItem.item_id || '',
                                    name: shoppingItem.name,
                                    quantity: `${shoppingItem.quantity} ${shoppingItem.unit}`,
                                    svg: findSvgByName(shoppingItem.name),
                                    isSelected: shoppingItem.is_purchased
                                }))
                            };
                            
                            return (
                                <ListCard
                                    key={adaptedItem.id}
                                    id={adaptedItem.id}
                                    nameList={adaptedItem.nameList}
                                    description={adaptedItem.description}
                                    date={adaptedItem.date}
                                    itemsList={adaptedItem.itemsList}
                                    onDelete={() => handleDeleteClick(adaptedItem.id, adaptedItem.nameList)}
                                    onClick={() => handleCardClick(adaptedItem.id)}
                                />
                            );
                        })}
                    </div>
                    <Button
                        label="+ Nueva Lista"
                        onClick={handleCreateList}
                        variant="primary"
                        size="medium"
                        className="w-full"
                    />
                </div>
            )}

            {/* Modal de confirmación de eliminación */}
            <Modal
                isOpen={deleteModal.isOpen}
                type="delete"
                title="Eliminar Lista"
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            >
                <div className="text-center">
                    <div className="text-red-500 mb-4">
                        <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </div>
                    <p className="text-gray-700">
                        ¿Estás seguro de que quieres eliminar:{' '}
                        <span className="font-semibold">"{deleteModal.listName}"</span>?
                    </p>
                    <p className="text-feedback-error text-sm mt-2">
                        Esta acción no se puede deshacer.
                    </p>
                </div>
            </Modal>
            {/* Modal para agregar una nueva lista */}
            <Modal
                isOpen={newListModal.isOpen}
                type='form'
                title="Nueva Lista"
                onConfirm={() => {}} // Se maneja desde el formulario
                onCancel={() => setNewListModal({ isOpen: false })}
            >
                <DynamicForm
                    fields={newListFormFields}
                    onSubmit={handleSaveList}
                    submitButtonText="Agregar"
                    submitButtonVariant="secondary"
                    resetOnSubmit={true}
                    className="shadow-none p-0 m-0"
                >
                    <Button
                        label='Cancelar'
                        variant='outline'
                        onClick={() => setNewListModal({ isOpen: false })}
                    />
                </DynamicForm>
            </Modal>
        </div>
    );
}

export default MyList;