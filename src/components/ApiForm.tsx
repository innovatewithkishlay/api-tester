import React, { useState } from "react";

const ApiForm: React.FC = () => {
  const [method, setMethod] = useState<string>("GET");
  const [url, setUrl] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Sending ${method} request to ${url}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 max-w-lg w-full rounded-lg bg-white shadow-md space-y-4"
    >
      {/* Heading */}
      <h2 className="text-2xl font-semibold">API Request Builder</h2>

      {/* Row for method selection and URL input */}
      <div className="flex gap-2">
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="border rounded px-3 py-2 bg-gray-50"
        >
          <option>GET</option>
          <option>POST</option>
          <option>PUT</option>
          <option>DELETE</option>
          <option>PATCH</option>
        </select>
        <input
          type="text"
          placeholder="Enter request URL..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 border rounded px-3 py-2"
        />
      </div>

      {/* Send button */}
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
      >
        Send Request
      </button>
    </form>
  );
};

export default ApiForm;
