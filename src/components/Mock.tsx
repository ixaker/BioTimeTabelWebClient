import {useState} from 'react';
import { useAppContext } from '../State/AppProvider';

const MockComponent = () => {
    const { dispatch } = useAppContext()
    const [state, setState] = useState("1")

    const openModalWithNewData = () => {
        // Оновлення стейту з новими даними для модального вікна
        const newDataForModal = {
            first_name: 'New Name',
            time: 'New Time',
            state: state,
            error: false,
            msg: '',
        };
        dispatch({ type: 'SET_MODAL', payload: { visible: true, data: newDataForModal } });
    };

    return (
        <div>
            {/* Кнопка, яка викликає відкриття модального вікна з новими даними */}
            <button onClick={() => {
                openModalWithNewData();
                setState(state === "1" ? "2" : "1")
            }}
            >
                Open Modal With New Data
            </button>
        </div>
    );
};

export default MockComponent;
