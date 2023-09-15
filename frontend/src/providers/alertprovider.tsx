import React, { ReactNode, createContext, useContext, useState } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

interface AlertProps {
  message: string;
  severity: 'error' | 'warning' | 'info' | 'success';
}

interface AlertContextProps {
  showAlert: (message: string, severity: 'error' | 'warning' | 'info' | 'success') => void;
}

export const AlertContext = createContext<AlertContextProps | undefined>(undefined);

export function AlertProvider({ children }: { children: ReactNode }) {
  const [alert, setAlert] = useState<AlertProps | null>(null);

  const showAlert = (message: string, severity: 'error' | 'warning' | 'info' | 'success') => {
    setAlert({ message, severity });
  };

  const closeAlert = () => {
    setAlert(null);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {alert && (
        <Alert
          severity={alert.severity}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={closeAlert}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          <AlertTitle>{alert.severity}</AlertTitle>
          {alert.message}
        </Alert>
      )}
    </AlertContext.Provider>
  );
}

// useAlert özel kancası
export function useAlert() {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
}
