import React, { useState } from "react";
import axios from "axios";
import ResponseViewer from "./ResponseViewer";

const ApiForm: React.FC = () => {
  const [method, setMethod] = useState<string>("GET");
  const [url, setUrl] = useState<string>("");
  const [status, setStatus] = useState<number | null>(null);
  const [responseData, setResponseData] = useState<unknown>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!url.trim()) {
      alert("Please enter a valid URL.");
      return;
    }

    try {
      setLoading(true);
      setStatus(null);
      setResponseData(null);

      const res = await axios({ method, url });

      setStatus(res.status);
      setResponseData(res.data);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          setStatus(err.response.status);
          setResponseData(err.response.data);
        } else {
          setStatus(0);
          setResponseData({ error: err.message });
        }
      } else {
        setStatus(0);
        setResponseData({ error: "An unexpected error occurred" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl w-full">
      <form
        onSubmit={handleSubmit}
        className="p-6 rounded-lg bg-white shadow-md space-y-4"
      >
        <h2 className="text-2xl font-semibold">API Request Builder</h2>

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

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Request"}
        </button>
      </form>

      <ResponseViewer status={status} data={responseData} />
    </div>
  );
};

export default ApiForm;
