// DarkModeToggle.tsx
import React from 'react';
import { Moon, Sun } from "lucide-react";


const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = React.useState(false);

  React.useEffect(() => {
    const classList = document.body.classList;
    darkMode ? classList.add('dark') : classList.remove('dark');
  }, [darkMode]);

  return (
    <div onClick={() => setDarkMode(!darkMode)} className="pr-14" >
      {darkMode ? <Sun className="bg-secondary w-full h-full  p-2 rounded-full transition"/> : <Moon className="bg-secondary w-full h-full  p-2 rounded-full" />}
    </div>
  );
};

export default DarkModeToggle;