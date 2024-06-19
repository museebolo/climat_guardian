export const SampleContext = {
  urlData: "http://climate-guardian.home/postgrest",
  urlLogin: "http://climate-guardian.home/php",
  urlCurrent: "http://localhost:3000",
};

export function getToken() {
  return localStorage.getItem("token");
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