import { useEffect, useMemo } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAppContext } from '../../State/AppProvider';
interface ServerToClientEvents {
    connect: () => void;
    disconnect: () => void;
    error: (error: Error) => void;
    list: (data: rowData[]) => void;
    update: (data: rowData) => void;
    notification: (data: dataType) => void;
}
  
interface ClientToServerEvents {
    getList: (data: { date: string }) => void;
    trueEvent: (data: dataType) => void;
    falseEvent: (data: dataType) => void;
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
    state: string;
    first_name: string;
    error: boolean;
}

interface dataType {
    first_name: string;
    time: string;
    state: string;
    error: boolean;
    msg: string;
  }

interface WebSocketProps {
    date: string;
}

let socket: Socket<ServerToClientEvents, ClientToServerEvents>;

const WebSocket: React.FC<WebSocketProps> = ({date}) => {
    
    const { notify } = useAppContext();
    const { dispatch } = useAppContext();
    const memoizedDate = useMemo(() => date, [date]);

    useEffect(() => {
        if (!socket) {    
            socket = io('http://10.8.0.4:3000');

            const handleUpdate = (data: rowData) => {
                console.log('Update', data);
                dispatch({ type: 'UPDATE_OR_ADD_DATA', payload: data });
            };

            socket.on('connect', () => {
                console.log('WebSocket connection established successfully');
                socket.emit('getList', { date } as { date: string });
            });

            socket.on('list', (data) => {
                console.log('List', data);
                dispatch({ type: 'REPLACE_ALL', payload: data });
            });

            socket.on('update', handleUpdate)

            socket.on('notification', (data) => {
                console.log('Notification', data);
                notify(data);
            });
        
            socket.on('disconnect', () => {
                console.log('WebSocket disconnected');
            });

            socket.emit('getList', { date } as { date: string });

            socket.on('error', (error: Error) => {
                console.error('WebSocket connection error:', error);
                
            });
        }
            return () => {
            socket.disconnect();
            };
    }, []);

    useEffect(() => {
        if (socket && socket.connected) {
            socket.emit('getList', { date } as { date: string });
            console.log('socket getlist');
            
        }
    }, [memoizedDate]);

    return null;
    };

export default WebSocket;

export const sendTrueEvent = (data: dataType) => {
    console.log('sendTrueEvent');
    console.log(data);
    if (socket && socket.connected) {
        socket.emit('trueEvent', data);
        console.log('повідомлення відправлено');
    } else {
        console.error('Socket is not connected');
    }
  };

  export const sendFalseEvent = (data: dataType) => {
    console.log('sendFalseEvent');
    console.log(data);
    if (socket && socket.connected) {
        socket.emit('falseEvent', data);
        console.log('повідомлення відправлено');
    } else {
        console.error('Socket is not connected');
    }
  };