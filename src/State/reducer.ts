
type Data = {
    id: number;        
    name: string;      
    type: "d" | "n";   
    arrival: string;   
    departure: string; 
    duration: string;  
    total: string;      
}

interface dataType {
    first_name: string;
    time: string;
    state: string;
    error: boolean;
    errorType: 'null_Uhod' | 'Uhod_Uhod' | 'Prihod_Prihod';
    msg: string;
  }

export type AppState = {
    data: Data[];
    modal: {
      visible: boolean;
      data: dataType;
    };
};

type ReplaceAllAction = {
    type: 'REPLACE_ALL',
    payload: Data[]
  };
  
type UpdateOrAddDataAction = {
type: 'UPDATE_OR_ADD_DATA';
payload: Data; 
};

export type ModalAction = {
    type: 'SET_MODAL';
    payload: {
        visible: boolean;
        data: dataType;
    };
};

export type Action = ReplaceAllAction | UpdateOrAddDataAction | ModalAction;
  
const reducer = (state: AppState, action: Action): AppState => {
    let index;
    let sortedData: Data[] = [];
    let updatedData: Data[] = [];
    switch (action.type) {
        case 'REPLACE_ALL':
            console.log('rudeucer REPLACE_ALL');
            sortedData = action.payload.slice().sort((a, b) => {
                if (a.type !== b.type) {
                    return a.type.localeCompare(b.type);
                }
                return a.name.localeCompare(b.name);
            });
            return { ...state, data: sortedData };
        case 'UPDATE_OR_ADD_DATA':
        index = state.data.findIndex(item => {
            return item.id === action.payload.id;
        });
    
            if (index !== -1) {
                console.log('reducer UPDATE');
                updatedData = [
                    ...state.data.slice(0, index),
                    action.payload,
                    ...state.data.slice(index + 1),
                ];
                sortedData = updatedData.slice().sort((a, b) => a.name.localeCompare(b.name));
               
            } else {
                console.log('reducer ADD');
                updatedData = [...state.data, action.payload];
            }
                sortedData = updatedData.slice().sort((a, b) => {
                    if (a.type !== b.type) {
                        return a.type.localeCompare(b.type);
                    }
                    return a.name.localeCompare(b.name);
                });
                return {
                    ...state,
                    data: sortedData,
                };
            
        case 'SET_MODAL':
            console.log('case SET_MODAL');
            console.log(action.payload);
            return { ...state, modal: action.payload };
        default:
            return state;
    }
};

export default reducer;