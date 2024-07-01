import React, { useContext } from "react";
import { Moon, Sun } from "lucide-react";
import { ThemeContext } from '@/lib/Theme';

const DarkModeToggle = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  React.useEffect(() => {
    const classList = document.body.classList;
    darkMode ? classList.add("dark") : classList.remove("dark");
  }, [darkMode]);

  return (
    <div onClick={toggleDarkMode} className="pr-14 cursor-pointer">
      {darkMode ? (
        <Sun className="h-full w-full rounded-full bg-secondary p-2 transition" />
      ) : (
        <Moon className="h-full w-full rounded-full bg-secondary p-2" />
      )}
    </div>
  );
};

export default DarkModeToggle;