import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toaster: React.FC<{ message: string, type?: string }> = ({ message, type = 'info' }) => {
  React.useEffect(() => {
    toast[type](message);
  }, [message, type]); 

  return <ToastContainer />; 
};

export default Toaster;
