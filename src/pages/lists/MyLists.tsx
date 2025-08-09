import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import ListCard from "../../components/common/ListCard";
import Modal from "../../components/common/Modal";
import Button from "../../components/common/Button";
import Loading from "../../components/common/Loading";
import Alert from "../../components/common/Alert";
import DynamicForm from "../../components/common/DynamicForm";

import { list as initialLists } from "../../data/List";
import type { ListCardProps, FormFieldConfig } from "../../types";

const LOCAL_STORAGE_KEY = 'cooky-my-lists';

function MyList() {
    const navigate = useNavigate();

    const [lists, setLists] = useState<ListCardProps[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [deleteModal, setDeleteModal] = useState<{
        isOpen: boolean;
        listId: string | null;
        listName: string;
    }>({ isOpen: false, listId: null, listName: '' });
    const [newListModal, setNewListModal] = useState<{
        isOpen: boolean;
        newList: ListCardProps | null;
    }>({ isOpen: false, newList: null });

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

    // Función para cargar listas desde localStorage o datos iniciales
    const loadLists = useCallback(() => {
        try {
            setIsLoading(true);
            setError(null);

            const savedLists = localStorage.getItem(LOCAL_STORAGE_KEY);

            if (savedLists) {
                const parsedLists = JSON.parse(savedLists);
                setLists(parsedLists);
            } else {
                // Usar las listas iniciales que ya tienen IDs únicos
                setLists(initialLists);
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialLists));
            }
        } catch (err) {
            setError('Error al cargar las listas');
            console.error('Error loading lists:', err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Función para guardar listas en localStorage
    const saveLists = useCallback((updatedLists: ListCardProps[]) => {
        try {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedLists));
        } catch (err) {
            console.error('Error saving lists:', err);
            setError('Error al guardar los cambios');
        }
    }, []);

    // Función para abrir modal de confirmación de eliminación
    const handleDeleteClick = useCallback((listId: string, listName: string) => {
        setDeleteModal({
            isOpen: true,
            listId,
            listName
        });
    }, []);

    // Función para confirmar eliminación
    const handleConfirmDelete = useCallback(() => {
        if (!deleteModal.listId) return;

        const updatedLists = lists.filter(list => list.id !== deleteModal.listId);
        setLists(updatedLists);
        saveLists(updatedLists);

        setDeleteModal({ isOpen: false, listId: null, listName: '' });
    }, [deleteModal.listId, lists, saveLists]);

    // Función para cancelar eliminación
    const handleCancelDelete = useCallback(() => {
        setDeleteModal({ isOpen: false, listId: null, listName: '' });
    }, []);

    // Función para manejar click en tarjeta
    const handleCardClick = useCallback((listId: string) => {
        try {
            // Buscar la lista completa para pasarla como state
            const selectedList = lists.find(list => list.id === listId);

            if (selectedList) {
                navigate(`/app/list/${listId}`, {
                    state: {
                        listData: selectedList,
                        itemsList: selectedList.itemsList
                    }
                });
            } else {
                // Fallback si no encuentra la lista
                navigate(`/app/list/${listId}`);
            }
        } catch (err) {
            console.error('Navigation error:', err);
            setError('Error al navegar a la lista');
        }
    }, [navigate, lists]);

    // Función para crear nueva lista
    const handleCreateList = () => {
        setNewListModal({isOpen: true, newList: null})
    };

    // Función para guardar nueva lista
    const handleSaveList = (formData: Record<string, string | number | boolean>) => {
        try {
            const newList: ListCardProps = {
                id: Date.now().toString(), // Generar ID único
                nameList: formData.nameList as string,
                description: formData.description as string,
                date: new Date().toISOString().split('T')[0], // Fecha actual en formato YYYY-MM-DD
                itemsList: [] // Lista vacía inicialmente
            };

            const updatedLists = [...lists, newList];
            setLists(updatedLists);
            saveLists(updatedLists);
            
            setNewListModal({ isOpen: false, newList: null });
            setError(null); // Limpiar errores previos
            toast.success(`Lista "${newList.nameList}" creada correctamente`);
        } catch (err) {
            console.error('Error creating new list:', err);
            setError('Error al crear la nueva lista');
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
                        {lists.map((item) => (
                            <ListCard
                                id={item.id}
                                nameList={item.nameList}
                                description={item.description}
                                date={item.date}
                                itemsList={item.itemsList}
                                onDelete={() => handleDeleteClick(item.id, item.nameList)}
                                onClick={() => handleCardClick(item.id)}
                            />
                        ))}
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
                onCancel={() => setNewListModal({ isOpen: false, newList: null })}
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
                        onClick={() => setNewListModal({ isOpen: false, newList: null })}
                    />
                </DynamicForm>
            </Modal>
        </div>
    );
}

export default MyList;