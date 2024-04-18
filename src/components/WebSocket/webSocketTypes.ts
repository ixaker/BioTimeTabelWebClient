// websocketTypes.ts
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
  
  export { errorType, rowData, dataType, newEventType };
  