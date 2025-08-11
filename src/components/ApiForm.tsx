import React, { useState } from "react";
import axios from "axios";
import ResponseViewer from "./ResponseViewer";

interface Header {
  key: string;
  value: string;
}

const ApiForm: React.FC = () => {
  const [method, setMethod] = useState<string>("GET");
  const [url, setUrl] = useState<string>("");
  const [body, setBody] = useState<string>("{}");
  const [headers, setHeaders] = useState<Header[]>([{ key: "", value: "" }]);
  const [status, setStatus] = useState<number | null>(null);
  const [responseData, setResponseData] = useState<unknown>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleHeaderChange = (index: number, field: "key" | "value", value: string) => {
    const updated = [...headers];
    updated[index][field] = value;
    setHeaders(updated);
  };

  const addHeaderRow = () => {
    setHeaders([...headers, { key: "", value: "" }]);
  };

  const removeHeaderRow = (index: number) => {
    if (headers.length > 1) {
      setHeaders(headers.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!url.trim()) {
      alert("Please enter a valid URL.");
      return;
    }

    let parsedBody: unknown = {};
    if (["POST", "PUT", "PATCH"].includes(method)) {
      try {
        parsedBody = JSON.parse(body || "{}");
      } catch {
        alert("Request body is not valid JSON.");
        return;
      }
    }

    // Build axios-compatible headers object
    const headerObj: Record<string, string> = {};
    headers.forEach(h => {
      if (h.key.trim()) {
        headerObj[h.key] = h.value;
      }
    });

    try {
      setLoading(true);
      setStatus(null);
      setResponseData(null);

      const res = await axios({
        method,
        url,
        data: ["POST", "PUT", "PATCH"].includes(method) ? parsedBody : undefined,
        headers: {
          "Content-Type": "application/json",
          ...headerObj,
        },
      });

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

        {/* Method + URL */}
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

        {/* Headers section */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="font-medium">Headers</label>
            <button type="button" onClick={addHeaderRow} className="text-blue-600 hover:underline text-sm">
              + Add Header
            </button>
          </div>
          {headers.map((h, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Header Key"
                value={h.key}
                onChange={(e) => handleHeaderChange(index, "key", e.target.value)}
                className="border rounded px-3 py-2 flex-1"
              />
              <input
                type="text"
                placeholder="Header Value"
                value={h.value}
                onChange={(e) => handleHeaderChange(index, "value", e.target.value)}
                className="border rounded px-3 py-2 flex-1"
              />
              {headers.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeHeaderRow(index)}
                  className="text-red-500 font-bold px-2"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>

        {/* JSON Body section */}
        {["POST", "PUT", "PATCH"].includes(method) && (
          <textarea
            placeholder="Enter JSON request body..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full border rounded px-3 py-2 font-mono text-sm min-h-[120px]"
          />
        )}

        {/* Send Button */}
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
