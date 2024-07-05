export function getToken() {
  if (localStorage.getItem("token")) {
    return localStorage.getItem("token");
  }
}

export interface user {
  username: string;
  password: string;
}

export interface AverageData {
  avg_temperature: number;
  avg_humidity: number;
  date: string;
}
export interface data {
  temperature: number;
  humidity: number;
  timestamp: string;
  ip: string;
}

export interface avgData {
  avg_temperature: number;
  avg_humidity: number;
  date: string;
  ip: string;
  count: number;
}
export interface esp {
  ip: string;
  id: number;
  name: string;
  x: number;
  y: number;
}
