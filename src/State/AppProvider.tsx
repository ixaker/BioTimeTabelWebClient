// AppProvider.tsx
import React, { createContext, useContext, useReducer } from 'react';
import reducer, { AppState, Action } from './reducer';

enum errorType {
  null_Uhod,
  Uhod_Uhod,
  Prihod_Prihod
}

interface dataType {
  first_name: string;
  time: string;
  state: string;
  error: boolean;
  errorType: errorType;
  msg: string;
}

const initialState: AppState = {
    data: [],
    modal: {
      visible: false,
      data: {
        first_name: "",
        time: "",
        state: "",
        error: false,
        errorType: errorType.null_Uhod,
        msg: ""
      },
    },
  };

interface AppProviderProps {
    children: React.ReactNode;
  }

  interface AppContextType {
    state: AppState;
    dispatch: React.Dispatch<Action>;
    notify: (data: dataType) => void;
  }

const AppContext = createContext<AppContextType>({
    state: initialState,
    dispatch: () => null,
    notify: () => {},
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
    
    const notify = (data: dataType) => {
      console.log('notify start');
      console.log(data);
      
      dispatch({
        type: 'SET_MODAL',
        payload: {
          visible: true,
          data: data,
        },
      });
    };

  return (
    <AppContext.Provider value={{ state, dispatch, notify }}>
      {children}
    </AppContext.Provider>
  );
};
