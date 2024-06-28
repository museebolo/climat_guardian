// DarkModeToggle.tsx
import React from "react";
import { Moon, Sun } from "lucide-react";

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = React.useState(false);

  React.useEffect(() => {
    const classList = document.body.classList;
    darkMode ? classList.add("dark") : classList.remove("dark");
  }, [darkMode]);

  return (
    <div onClick={() => setDarkMode(!darkMode)} className="pr-14">
      {darkMode ? (
        <Sun className="h-full w-full rounded-full bg-secondary p-2 transition" />
      ) : (
        <Moon className="h-full w-full rounded-full bg-secondary p-2" />
      )}
    </div>
  );
};

export default DarkModeToggle;