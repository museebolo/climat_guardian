// Constant
export const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// Functions
export function getMonthName(date: Date) {
    return monthNames[date.getMonth()]
}
export function getToken(){
    return localStorage.getItem('token');
}

// Interfaces
export interface AverageData {
    avg_temperature: number;
    avg_humidity: number;
    date: string;
}
export interface Data {
    temperature: number;
    humidity: number;
    timestamp: string;
}
