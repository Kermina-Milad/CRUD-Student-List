import { createContext, useState } from 'eact';

const ToastContext = createContext();

const ToastProvider = ({ children }) => {
  const [toastMessage, setToastMessage] = useState(null);

  return (
    <ToastContext.Provider value={{ toastMessage, setToastMessage }}>
      {children}
    </ToastContext.Provider>
  );
};

export { ToastProvider, ToastContext };