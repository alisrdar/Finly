import React from 'react'
import { LucideX } from 'lucide-react';

export interface ModalProps {
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
    title: string;
}

const Modal: React.FC<ModalProps> = ({ children, isOpen, onClose, title }) => {
    if (!isOpen) return null;

    return (
        <div className='fixed top-0 left-0 w-full h-full bg-black/30 backdrop-blur-sm flex justify-center items-center z-50' onClick={onClose}>
            <div className='bg-card p-6 rounded-lg shadow-md border border-border w-[70%] max-w-2xl mx-auto' onClick={(e) => e.stopPropagation()}>
                {/* Modal header */}
                <div className='flex justify-between items-center mb-6 pb-4 border-b border-border/50'>
                    <div>
                        <h3 className='text-lg font-semibold text-foreground '>
                            {title}
                        </h3>
                    </div>
                    <button
                        className='group flex items-center justify-center w-8 h-8 text-foreground hover:text-foreground hover:shadow-sm hover:bg-muted-hover rounded-lg transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer'
                        type='button'
                        onClick={onClose}
                        aria-label="Close modal"
                    >
                        <LucideX className='w-5 h-5 text-lg transition-all duration-200 group-hover:rotate-90' />
                    </button>
                </div>
                {/* Modal body */}
                <div className=''>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Modal
