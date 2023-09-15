import React, { ReactNode, createContext, useCallback, useContext, useState } from 'react';

interface LayoutContextProps {
  dialogState: {
    status: boolean;
    name: string;
    type: string;
  };
  handlerDialogState: (status: boolean, name: string, type: string) => void;
}

export const LayoutContext = createContext<LayoutContextProps | undefined>(undefined);

export function LayoutProvider({ children }: { children: ReactNode }) {
  const [dialogState, setDialogState] = useState({
    status: false,
    name: '',
    type: '',
  });

  const handlerDialogState = useCallback(
    (status: boolean, name: string, type: string) => {
      setDialogState({ status, name, type });
    },
    []
  );

  return (
    <LayoutContext.Provider value={{ dialogState, handlerDialogState }}>
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayout() {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
}
