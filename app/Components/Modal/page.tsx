"use client";

import { ReactNode, useEffect } from "react";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    title?: string;
};

export default function Modal({
    isOpen,
    onClose,
    children,
    title,
}: ModalProps) {
    // Prevent background scroll
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="absolute inset-0 bg-black/50"
                onClick={onClose}
            />

            {/* Modal box */}
            <div className="relative z-10 w-[90%] max-w-md rounded-lg bg-white p-6 shadow-lg">
                <button
                    onClick={onClose}
                    className="absolute left-3 top-3 text-gray-500 hover:text-black"
                >
                    ✕
                </button>
                {title && (
                    <h2 className="mb-4 text-right text-lg font-semibold">{title}</h2>
                )}


                {children}
            </div>
        </div>
    );
}
