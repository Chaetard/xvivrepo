import React, { useEffect } from 'react';

const Toast = ({ message, isVisible, onClose }) => {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-50 animate-bounce">
            <div className="bg-secondary text-dark px-6 py-3 rounded-full shadow-lg border border-secondary-dark font-sans font-medium text-sm sm:text-base whitespace-nowrap">
                {message}
            </div>
        </div>
    );
};

export default Toast;
