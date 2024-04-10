import React from 'react';
import { useToasts } from 'react-toast-notifications';

interface ToastProps {
  message: string;
  appearance?: 'success' | 'error' | 'warning' | 'info';
}

const Toaster: React.FC<ToastProps> = ({ message, appearance = 'info' }) => {
  const { addToast } = useToasts();

  React.useEffect(() => {
    addToast(message, { appearance });
  }, []); // Додаємо тост під час монтування компонента

  return null; // Компонент не відображає жодного DOM-елемента
};

export default Toaster;