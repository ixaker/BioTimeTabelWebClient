// useWebSocket.ts
import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { transformData, parseDateString } from '../components/utils/dateUtils';
import { useAppContext } from '../State/AppProvider';

const useWebSocket = ({ date, onSocketDisconnected, onSocketConnected, setSelectedId }) => {
  const { notify, dispatch } = useAppContext();

  useEffect(() => {
    const socket = io('http://10.8.0.4:3000');

    // Логіка підписки на WebSocket

    return () => {
      socket.disconnect();
    };
  }, []);
};

export default useWebSocket;
