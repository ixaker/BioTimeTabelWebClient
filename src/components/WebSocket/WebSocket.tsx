import { useEffect, useMemo } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAppContext } from '../../State/AppProvider';

interface ServerToClientEvents {
    connect: () => void;
    disconnect: () => void;
    error: (error: Error) => void;
    list: (data: rowData[]) => void;
    update: (data: rowData) => void;
}
  
interface ClientToServerEvents {
    getList: (data: { date: string }) => void;
}
interface rowData {
    id: number;        
    emp_code: number;  
    name: string;      
    type: "d" | "n";   
    arrival: string;   
    departure: string; 
    duration: string;  
    total: string;     
}
const WebSocket: React.FC<{ date?: string }> = ({date}) => {
    const { dispatch } = useAppContext();
    console.log(date);
    
    const memoizedDate = useMemo(() => date, [date]);

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

        socket.emit('getList', { date } as { date: string });

        socket.on('error', (error: Error) => {
        console.error('WebSocket error:', error);
        });

        return () => {
        socket.disconnect();
        };
    }, [memoizedDate]);

    return null;
    };

    export default WebSocket;
