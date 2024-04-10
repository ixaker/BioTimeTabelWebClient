type ReplaceAllAction = {
    type: 'REPLACE_ALL';
    payload: Data[]; 
  };
  
  type UpdateOrAddDataAction = {
    type: 'UPDATE_OR_ADD_DATA';
    payload: Data; 
  };
  
  export type Action = ReplaceAllAction | UpdateOrAddDataAction;
  
const reducer = (state: AppState, action: Action): AppState => {
    let index;
    switch (action.type) {
        case 'REPLACE_ALL':
            console.log('REPLACE_ALL', action.payload);
            return { ...state, data: action.payload };
        case 'UPDATE_OR_ADD_DATA':
            console.log('UPDATE_OR_ADD_DATA', action.payload);
            index = state.data.findIndex(item => item.id === action.payload.id);
            if (index !== -1) {
                console.log('UPDATE', action.payload);
                return {
                    ...state,
                    data: [
                        ...state.data.slice(0, index),
                        action.payload,
                        ...state.data.slice(index + 1),
                    ],
                };
            } else {
                console.log('ADD', action.payload);
                return {
                    ...state,
                    data: [...state.data, action.payload],
                };
            }
        default:
            return state;
    }
};

export default reducer;