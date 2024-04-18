import { useEffect, useMemo } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAppContext } from '../../State/AppProvider';
import { transformData } from '../../utils/utils';
import { parseDateString } from '../utils/dateUtils';
interface ServerToClientEvents {
    connect: () => void;
    disconnect: () => void;
    error: (error: Error) => void;
    list: (data: ArrayOfArraysItem[]) => void;
    update: (data: rowData) => void;
    notification: (data: dataType) => void;
}

type ArrayOfArraysItem = [number, string, 'd' | 'n', string, string, string, string];
interface ClientToServerEvents {
    getList: (data: { date: string }) => void;
    trueEvent: (data: dataType) => void;
    falseEvent: (data: dataType) => void;
}
enum errorType {
    null_Uhod,
    Uhod_Uhod,
    Prihod_Prihod
}

interface rowData {
    id: number;        
    errorType: errorType;
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
    errorType: errorType;
    msg: string;
    newEvent: newEventType;
  }

interface newEventType {
    id: number;
    emp_code: string;
    punch_time: Date;
    punch_state: "0" | "1";
    first_name: string;
    day: string;
    terminal_sn: string;
}



interface WebSocketProps {
    date: string;
    onSocketDisconnected: () => void;
    onSocketConnected: () => void;
    setDate: (date: Date) => void;
    setSelectedId: (id: number | null) => void;
}

let socket: Socket<ServerToClientEvents, ClientToServerEvents>;

const WebSocket: React.FC<WebSocketProps> = ({
    date, 
    setDate,
    onSocketDisconnected, 
    onSocketConnected,
    setSelectedId
}) => {
    
    const { notify, dispatch } = useAppContext();
    const memoizedDate = useMemo(() => date, [date]);
    console.log('websocket start');
    
    useEffect(() => {
        console.log(socket);
        
        if (!socket) {    
            socket = io('http://10.8.0.4:3000');

            

            socket.on('connect', () => {
                console.log('WebSocket connection established successfully');
                // socket.emit('getList', { date, terminal_sns: ['CN99212360023', 'CN99212360024'] } as { date: string });
                socket.emit('getList', { date, terminal_sns: ['CN99212360023'] } as { date: string });
                onSocketConnected()
            });

            socket.on('list', (data) => {
                // console.log('List', data);
                const transformedData = transformData(data);
                dispatch({ type: 'REPLACE_ALL', payload: transformedData });
            });

            
            const handleUpdate = (data: rowData) => {
                console.log('Update', data);
                if (data.id && typeof data.id === 'number') {
                    setSelectedId(data.id);
                }
                dispatch({ type: 'UPDATE_OR_ADD_DATA', payload: data });
            };

            socket.on('update', handleUpdate)

            socket.on('notification', (data) => {
                console.log('Notification', data);
                const parseDate = parseDateString(data.newEvent.day);
                setDate(parseDate)
                setTimeout(() => {
                    notify(data);    
                }, 100);
                
            });
        
            socket.on('disconnect', () => {
                console.log('WebSocket disconnected');
                onSocketDisconnected();
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
        } else {
            console.error('Socket is not connected');
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
        console.log('повідомлення TrueEvent відправлено');
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