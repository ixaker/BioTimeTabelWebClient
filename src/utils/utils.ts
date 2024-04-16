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