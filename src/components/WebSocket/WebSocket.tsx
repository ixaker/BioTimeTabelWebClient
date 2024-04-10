import { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAppContext } from '../../State/AppProvider';

interface ServerToClientEvents {
    connect: () => void;
    disconnect: () => void;
    error: (error: Error) => void;
    list: (data: rowData[]) => void;
    update: (data: string) => void;
}
  
interface ClientToServerEvents {
    getList: (data: { date: string }) => void;
}
interface rowData {
    id: number;         // id рядка
    emp_code: number;   // id працівника
    name: string;       // ПІБ працівника
    type: "d" | "n";    // тип зміни бути тільки "d" - денна або "n" - нічна
    arrival: string;    // прихід
    departure: string;  // ухід
    duration: string;   // тривалість зміни
    total: string;      // час, який зараховується
}
const WebSocket: React.FC = () => {
    const { dispatch } = useAppContext();


    useEffect(() => {
        const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io('http://10.8.0.4:3000');

        socket.on('connect', () => {
            console.log('WebSocket connection established successfully');
        });

        socket.on('list', (data) => {
            console.log('List', data);
            dispatch({ type: 'REPLACE_ALL', payload: data });
        });

        socket.on('update', (data) => {
            console.log('Update', data);
            dispatch({ type: 'UPDATE_OR_ADD_DATA', payload: data });
        });
    
        socket.on('disconnect', () => {
        console.log('WebSocket disconnected');
        });

        socket.emit('getList', { date: "10.04.2024" } as { date: string });

        socket.on('error', (error: Error) => {
        console.error('WebSocket error:', error);
        });

        return () => {
        socket.disconnect();
        };
    }, []);

    return null;
    };

    export default WebSocket;
