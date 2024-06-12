import { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { useAppContext } from "../../State/AppProvider";
import { transformData } from "../utils/dateUtils";
import { parseDateString } from "../utils/dateUtils";
import { getWebSocketUrl, getTerminalSerialNumbers } from "./socketUrlUtils";
import { executeCode } from "./executedUtil";
import { Action, dataType } from "./../../State/reducer";

const socketRef: React.MutableRefObject<Socket | null> = { current: null };

type Data = {
  id: number;
  name: string;
  type: "d" | "n";
  arrival: string;
  departure: string;
  duration: string;
  total: string;
};
const initializeSocket = (
  onSocketConnected: () => void,
  onSocketDisconnected: () => void,
  setSelectedId: (id: number | null) => void,
  setDate: (date: Date) => void,
  serialNumbers: string[],
  date: string,
  dispatch: React.Dispatch<Action>,
  notify: (data: dataType) => void
) => {
  const socketUrl = getWebSocketUrl();
  console.log("socketUrl", socketUrl);

  socketRef.current = io(socketUrl);
  const socket = socketRef.current;

  socket.on("connect", () => {
    console.log("WebSocket connection established successfully");
    socket.emit("getList", { date, terminal_sns: serialNumbers } as {
      date: string;
    });
    console.log("getList", { date, terminal_sns: serialNumbers });
    onSocketConnected();
  });

  socket.on("list", (data) => {
    const transformedData = transformData(data);
    dispatch({ type: "REPLACE_ALL", payload: transformedData });
  });

  const handleUpdate = (data: Data) => {
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
    executeCode(data.payload);
    console.log("Command", data);
  });

  socket.on("disconnect", () => {
    console.log("WebSocket disconnected");
    onSocketDisconnected();
  });

  socket.on("error", (error: Error) => {
    console.error("WebSocket connection error:", error);
  });

  return () => {
    socket.disconnect();
    socketRef.current = null;
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
  console.log("serialNumbers", serialNumbers);
  console.log("Websocket start");

  useEffect(() => {
    console.log("Initializing socket connection");
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
    console.log(date);
    if (socket && socket.connected) {
      socket.emit("getList", { date, terminal_sns: serialNumbers } as {
        date: string;
      });
      console.log("socket getlist, data:", { date, terminal_sns: serialNumbers });
    } else {
      console.error("Socket is not connected from useEffect");
    }
  }, [date]);

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
    console.error("Socket is not connected from true event");
  }
};

export const sendFalseEvent = (data: dataType) => {
  const socket = socketRef.current;
  console.log("sendFalseEvent");
  console.log("Socket current state:", socket);
  if (socket && socket.connected) {
    socket.emit("falseEvent", data);
    console.log("повідомлення falseEvent відправлено");
  } else {
    console.error("Socket is not connected from falseEvent");
  }
};
