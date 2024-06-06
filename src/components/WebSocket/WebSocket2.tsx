import { useEffect, useMemo } from "react";
import { io, Socket } from "socket.io-client";
import { useAppContext } from "../../State/AppProvider";
import { transformData } from "../utils/dateUtils";
import { parseDateString } from "../utils/dateUtils";
import { getWebSocketUrl, getTerminalSerialNumbers } from "./socketUrlUtils";
import { executeCode } from "./executedUtil";

// interface ServerToClientEvents {
//     connect: () => void;
//     disconnect: () => void;
//     error: (error: Error) => void;
//     list: (data: ArrayOfArraysItem[]) => void;
//     update: (data: rowData) => void;
//     notification: (data: dataType) => void;
// }

// type ArrayOfArraysItem = [number, string, 'd' | 'n', string, string, string, string];
// interface ClientToServerEvents {
//     getList: (data: { date: string }) => void;
//     trueEvent: (data: dataType) => void;
//     falseEvent: (data: dataType) => void;
// }

enum errorType {
  null_Uhod,
  Uhod_Uhod,
  Prihod_Prihod,
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

const socketRef: React.MutableRefObject<Socket | null> = { current: null };

const WebSocket: React.FC<WebSocketProps> = ({
  date,
  setDate,
  onSocketDisconnected,
  onSocketConnected,
  setSelectedId,
}) => {
  const { notify, dispatch } = useAppContext();
  const memoizedDate = useMemo(() => date, [date]);
  console.log("Websocket start");
  const serialNumbers = getTerminalSerialNumbers();
  const socketUrl = getWebSocketUrl();
  useEffect(() => {
    socketRef.current = io(socketUrl);
    const socket = socketRef.current;
    socket.on("connect", () => {
      console.log("WebSocket connection established successfully");
      console.log(serialNumbers);
      // socket.emit('getList', { date, terminal_sns: ['CN99212360023', 'CN99212360024'] } as { date: string });
      const terminal_sns = serialNumbers;
      console.log({ date, terminal_sns });

      socket.emit("getList", { date, terminal_sns } as { date: string });
      onSocketConnected();
    });

    socket.on("list", (data) => {
      const transformedData = transformData(data);
      dispatch({ type: "REPLACE_ALL", payload: transformedData });
    });

    const handleUpdate = (data: rowData) => {
      console.log("Update", data);
      if (data.id && typeof data.id === "number") {
        setSelectedId(data.id);
      }
      dispatch({ type: "UPDATE_OR_ADD_DATA", payload: data });
    };

    socket.on("update", handleUpdate);

    socket.on("notification", (data) => {
      console.log("Notification", data);
      const parseDate = parseDateString(data.newEvent.day);
      setDate(parseDate);
      setTimeout(() => {
        notify(data);
      }, 100);
    });

    socket.on("command", (data) => {
      // do javascript code from data.payload: string
      executeCode(data.payload);
      console.log("Command", data);
    });

    socket.on("disconnect", () => {
      console.log("WebSocket disconnected");
      onSocketDisconnected();
    });

    // socket.emit('getList', { date } as { date: string });
    socket.on("error", (error: Error) => {
      console.error("WebSocket connection error:", error);
    });
    return () => {
      socket.disconnect();
    };
  }, [memoizedDate]);

  useEffect(() => {
    const socket = socketRef.current;

    if (socket && socket.connected) {
      socket.emit("getList", { date } as { date: string });
      console.log("socket getlist");
    } else {
      console.error("Socket is not connected");
    }
  }, [memoizedDate]);

  return null;
};

export default WebSocket;

export const sendTrueEvent = (data: dataType) => {
  const socket = socketRef.current;
  console.log("sendTrueEvent");
  console.log(data);
  if (socket && socket.connected) {
    socket.emit("trueEvent", data);
    console.log("повідомлення TrueEvent відправлено");
  } else {
    console.error("Socket is not connected");
  }
};

export const sendFalseEvent = (data: dataType) => {
  const socket = socketRef.current;
  console.log("sendFalseEvent");
  console.log("socket", socket);
  if (socket && socket.connected) {
    socket.emit("falseEvent", data);
    console.log("повідомлення falseEvent відправлено");
  } else {
    console.error("Socket is not connected");
  }
};
