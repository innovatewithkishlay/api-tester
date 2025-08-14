import React from "react";
import ApiForm from "./components/ApiForm";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <div className="flex items-start justify-center">
        <ApiForm />
      </div>
    </div>
  );
};

export default App;
