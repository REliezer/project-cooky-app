import type { JSX } from 'react';
import Button from './Button';
import type { ModalProps } from '../../types/components';

function Modal({ isOpen, type, title, children, onConfirm, onCancel }: ModalProps): JSX.Element | null {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onCancel}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2 className="text-center text-xl font-semibold m-0">{title}</h2>
                </div>
                <div className="px-1 py-2">
                    {children}
                </div>
                <div className="modal-footer">
                    {
                        type === 'signout' && (
                            <div className='flex gap-4'>
                                <Button
                                    label="Cancelar"
                                    variant="outline"
                                    size='medium'
                                    onClick={onCancel}
                                    className="mt-4"
                                />
                                <Button
                                    label="Cerrar Sesión"
                                    variant="secondary"
                                    size='medium'
                                    onClick={onConfirm}
                                    className="mt-4"
                                />
                            </div>
                        )
                    }
                    {
                        type === 'info' && (
                            <div className='flex gap-4'>
                                <Button
                                    label="Cerrar"
                                    variant="outline"
                                    size='medium'
                                    onClick={onCancel}
                                    className="mt-4"
                                />
                            </div>
                        )
                    }
                    {
                        type === 'delete' && (
                            <div className='flex gap-4'>
                                <Button
                                    label="Cancelar"
                                    variant="outline"
                                    size='medium'
                                    onClick={onCancel}
                                    className="mt-4"
                                />
                                <Button
                                    label="Eliminar"
                                    variant="secondary"
                                    size='medium'
                                    onClick={onConfirm}
                                    className="mt-4"
                                />
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Modal;