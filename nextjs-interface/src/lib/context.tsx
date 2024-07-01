import React from "react";

export function getToken() {
  if (localStorage.getItem("token")) {
    return localStorage.getItem("token");
  } else window.location.href = "/login";
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
  name: string;
  x: number;
  y: number;
}

export const ThemeContext = React.createContext({
  darkMode: false,
  toggleDarkMode: () => {},
});