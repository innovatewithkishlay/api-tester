import React, { useEffect, useState } from "react";
import ApiForm from "./components/ApiForm";

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(
    () => localStorage.getItem("theme") === "dark"
  );

useEffect(() => {
  console.log("Dark mode set to:", darkMode);
  if (darkMode) {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
}, [darkMode]);


  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#1e1e1e] text-gray-900 dark:text-gray-100">
      <div className="flex justify-end p-4">
        <button
          className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-sm"
          onClick={() => setDarkMode((prev) => !prev)}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
      <div className="flex items-start justify-center">
        <ApiForm />
      </div>
    </div>
  );
};

export default App;
