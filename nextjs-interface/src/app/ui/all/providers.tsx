"use client";

// import react libraries
import { useState } from "react";

// import theme context
import { ThemeContext } from "@/lib/Theme";

// import scripts
import { getCookie, setCookie } from "@/lib/cookies";

export function Providers({ children }: { children: React.ReactNode }) {
  // set dark mode
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = getCookie("darkMode");
    return savedMode ? savedMode === "true" : false;
  });

  // toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    setCookie({ name: "darkMode", value: newDarkMode });
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}
