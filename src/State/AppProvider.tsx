// AppProvider.tsx
import React, { createContext, useContext, useReducer } from 'react';
import reducer, { AppState, Action } from './reducer';


const initialState: AppState = {
    data: [],
  };

interface AppProviderProps {
    children: React.ReactNode;
  }

  interface AppContextType {
    state: AppState;
    dispatch: React.Dispatch<Action>;
  }

const AppContext = createContext<AppContextType>({
    state: initialState,
    dispatch: () => null,
  });

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within a AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
