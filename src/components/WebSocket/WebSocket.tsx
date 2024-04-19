import { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAppContext } from '../../State/AppProvider';
import { transformData } from '../utils/dateUtils';
import { parseDateString } from '../utils/dateUtils';
import { getWebSocketUrl, getTerminalSerialNumbers } from './socketUrlUtils';
import { executeCode } from './executedUtil';
import { Action, dataType } from './../../State/reducer';

const socketRef: React.MutableRefObject<Socket | null> = { current: null };

type Data = {
  id: number;        
  name: string;      
  type: "d" | "n";   
  arrival: string;   
  departure: string; 
  duration: string;  
  total: string;      
}
const initializeSocket = (
  onSocketConnected: () => void,
  onSocketDisconnected: () => void,
  setSelectedId: (id: number | null) => void,
  setDate: (date: Date) => void,
  serialNumbers: string[],
  date: string,
  dispatch: React.Dispatch<Action>,
  notify: (data: dataType) => void,
) => {
  const socketUrl = getWebSocketUrl();
  console.log('socketUrl', socketUrl );
  
  
  socketRef.current = io(socketUrl);
  const socket = socketRef.current;

  socket.on('connect', () => {
    console.log('WebSocket connection established successfully');
    socket.emit('getList', { date, terminal_sns: serialNumbers } as { date: string });
    onSocketConnected();
  });

  socket.on('list', (data) => {
    const transformedData = transformData(data);
    dispatch({ type: 'REPLACE_ALL', payload: transformedData });
  });

  const handleUpdate = (data: Data) => {
    console.log('Update', data);
    if (data.id && typeof data.id === 'number') {
      setSelectedId(data.id);
    }
    dispatch({ type: 'UPDATE_OR_ADD_DATA', payload: data });
  };

  socket.on('update', handleUpdate);

  socket.on('notification', (data) => {
    console.log('Notification', data);
    const parseDate = parseDateString(data.newEvent.day);
    setDate(parseDate)
    setTimeout(() => {
      notify(data);
    }, 100);
  });

  socket.on('command', (data) => {
    executeCode(data.payload);
    console.log('Command', data);
  });

  socket.on('disconnect', () => {
    console.log('WebSocket disconnected');
    onSocketDisconnected();
  });

  socket.on('error', (error: Error) => {
    console.error('WebSocket connection error:', error);
  });

  return () => {
    socket.disconnect();
  };
};

interface WebSocketProps {
  date: string;
  onSocketDisconnected: () => void;
  onSocketConnected: () => void;
  setDate: (date: Date) => void;
  setSelectedId: (id: number | null) => void;
}

const WebSocket: React.FC<WebSocketProps> = ({
  date,
  setDate,
  onSocketDisconnected,
  onSocketConnected,
  setSelectedId,
}) => {
  const { notify, dispatch } = useAppContext();
  const serialNumbers = getTerminalSerialNumbers();
  console.log('Websocket start');

  useEffect(() => {
    return initializeSocket(
      onSocketConnected,
      onSocketDisconnected,
      setSelectedId,
      setDate,
      serialNumbers,
      date,
      dispatch,
      notify
    );
  }, []);

  useEffect(() => {
    const socket = socketRef.current;

    if (socket && socket.connected) {
      socket.emit('getList', { date } as { date: string });
      console.log('socket getlist');
    } else {
      console.error('Socket is not connected');
    }
  }, [date]);

  return null;
};

export default WebSocket;
