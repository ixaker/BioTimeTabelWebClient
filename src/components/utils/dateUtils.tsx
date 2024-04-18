export const getCurrentDate = (): Date => {
  return new Date();
};
export const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear());
  return `${day}.${month}.${year}`;
};
  
export const increaseDate = (date: Date): Date => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + 1);
  return newDate;
};

export const decreaseDate = (date: Date): Date => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() - 1);
  return newDate;
};

export const parseDateString = (dateString: string): Date => {
  const [day, month, year] = dateString.split('.').map(Number);
  return new Date(year, month - 1, day);
};

type Data = {
  id: number;        
  name: string;      
  type: "d" | "n";   
  arrival: string;   
  departure: string; 
  duration: string;  
  total: string;     
}

type ArrayOfArraysItem = [number, string, 'd' | 'n', string, string, string, string];

export const transformData = (arrayOfArrays: ArrayOfArraysItem[]): Data[] => {
  return arrayOfArrays.map(array => {
      return {
          id: array[0],
          name: array[1],
          type: array[2],
          arrival: array[3],
          departure: array[4],
          duration: array[5],
          total: array[6]
      };
  });
};