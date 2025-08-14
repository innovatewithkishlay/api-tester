import React, { useState, useEffect } from "react";
import axios from "axios";
import ResponseViewer from "./ResponseViewer";
import HistoryPanel from "./HistoryPanel";
import type { HistoryItem } from "./HistoryPanel";

import EnvironmentManager from "./EnvironmentManager";
import type { Environment } from "./EnvironmentManager";


interface Header {
  key: string;
  value: string;
}

const LOCAL_STORAGE_KEY_HISTORY = "apiTesterHistory";
const LOCAL_STORAGE_KEY_ENV = "apiTesterEnvironments";

const ApiForm: React.FC = () => {
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("");
  const [body, setBody] = useState("{}");
  const [headers, setHeaders] = useState<Header[]>([{ key: "", value: "" }]);
  const [status, setStatus] = useState<number | null>(null);
  const [responseData, setResponseData] = useState<unknown>(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [historyOpen, setHistoryOpen] = useState(true);
  const [responseHeaders, setResponseHeaders] = useState<Record<string, string>>();
  const [duration, setDuration] = useState<number>();

  // Environment state
  const [environments, setEnvironments] = useState<Environment[]>([]);
  const [activeEnvId, setActiveEnvId] = useState<string>("");

  // Load history & environments on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem(LOCAL_STORAGE_KEY_HISTORY);
    if (savedHistory) setHistory(JSON.parse(savedHistory));

    const savedEnvs = localStorage.getItem(LOCAL_STORAGE_KEY_ENV);
    if (savedEnvs) setEnvironments(JSON.parse(savedEnvs));
  }, []);

  // Save history function
  const saveHistoryItem = (item: HistoryItem) => {
    const updated = [item, ...history].slice(0, 20);
    setHistory(updated);
    localStorage.setItem(LOCAL_STORAGE_KEY_HISTORY, JSON.stringify(updated));
  };

  // Replace {{variables}} with environment values
  const replaceVariables = (text: string) => {
    if (!text) return text;
    const env = environments.find(e => e.id === activeEnvId);
    if (!env) return text;
    let result = text;
    env.variables.forEach(v => {
      if (v.key) {
        const pattern = new RegExp(`{{${v.key}}}`, "g");
        result = result.replace(pattern, v.value);
      }
    });
    return result;
  };

  const handleHeaderChange = (index: number, field: "key" | "value", value: string) => {
    const updated = [...headers];
    updated[index][field] = value;
    setHeaders(updated);
  };

  const addHeaderRow = () => setHeaders([...headers, { key: "", value: "" }]);
  const removeHeaderRow = (index: number) => {
    if (headers.length > 1) setHeaders(headers.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return alert("Please enter a valid URL.");

    let parsedBody: unknown = {};
    if (["POST", "PUT", "PATCH"].includes(method)) {
      try {
        parsedBody = JSON.parse(replaceVariables(body) || "{}");
      } catch {
        alert("Invalid JSON body");
        return;
      }
    }

    const headerObj: Record<string, string> = {};
    headers.forEach(h => {
      if (h.key.trim()) headerObj[replaceVariables(h.key)] = replaceVariables(h.value);
    });

    try {
      setLoading(true);
      setStatus(null);
      setResponseData(null);
      setResponseHeaders(undefined);
      setDuration(undefined);

      const start = performance.now();
      const res = await axios({
        method,
        url: replaceVariables(url),
        data: ["POST", "PUT", "PATCH"].includes(method) ? parsedBody : undefined,
        headers: { "Content-Type": "application/json", ...headerObj },
      });
      const end = performance.now();

      setDuration(Math.round(end - start));
      setStatus(res.status);
      setResponseData(res.data);

      const plainHeaders: Record<string, string> = {};
      Object.entries(res.headers).forEach(([k, v]) => (plainHeaders[k] = String(v)));
      setResponseHeaders(plainHeaders);

      saveHistoryItem({
        method,
        url,
        headers,
        body: ["POST", "PUT", "PATCH"].includes(method) ? body : undefined,
        timestamp: Date.now(),
      });
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response) {
        setStatus(err.response.status);
        setResponseData(err.response.data);
        if (err.response.headers) {
          const plain: Record<string, string> = {};
          Object.entries(err.response.headers).forEach(([k, v]) => (plain[k] = String(v)));
          setResponseHeaders(plain);
        }
      } else {
        setStatus(0);
        setResponseData({ error: err.message || "Unexpected error" });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleHistorySelect = (item: HistoryItem) => {
    setMethod(item.method);
    setUrl(item.url);
    setHeaders(item.headers.length ? item.headers : [{ key: "", value: "" }]);
    setBody(item.body ?? "{}");
  };

  return (
    <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-[2fr,1fr] gap-6">
      <div>
        {/* Environment Manager */}
        <EnvironmentManager environments={environments} setEnvironments={setEnvironments} />

        {/* Environment Selector */}
        {environments.length > 0 && (
          <div className="mb-4">
            <label className="mr-2 font-medium">Active Environment:</label>
            <select
              value={activeEnvId}
              onChange={(e) => setActiveEnvId(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1"
            >
              <option value="">None</option>
              {environments.map(env => (
                <option key={env.id} value={env.id}>{env.name}</option>
              ))}
            </select>
          </div>
        )}

        {/* Request Form */}
        <form
          onSubmit={handleSubmit}
          className="p-6 rounded-lg bg-white shadow-md space-y-4 text-gray-900"
        >
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">API Request Builder</h2>
            <button
              type="button"
              onClick={() => setHistoryOpen(!historyOpen)}
              className="text-sm text-blue-600 hover:underline md:hidden"
            >
              {historyOpen ? "Hide History" : "Show History"}
            </button>
          </div>

          {/* Method + URL */}
          <div className="flex gap-2">
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 bg-gray-50"
            >
              <option>GET</option><option>POST</option><option>PUT</option><option>DELETE</option><option>PATCH</option>
            </select>
            <input
              type="text"
              placeholder="Enter request URL..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 border border-gray-300 rounded px-3 py-2 bg-gray-50"
            />
          </div>

          {/* Headers */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="font-medium">Headers</label>
              <button
                type="button"
                onClick={addHeaderRow}
                className="text-blue-600 hover:underline text-sm"
              >
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
                  className="border border-gray-300 rounded px-3 py-2 flex-1 bg-gray-50"
                />
                <input
                  type="text"
                  placeholder="Header Value"
                  value={h.value}
                  onChange={(e) => handleHeaderChange(index, "value", e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 flex-1 bg-gray-50"
                />
                {headers.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeHeaderRow(index)}
                    className="text-red-500 font-bold px-2"
                  >✕</button>
                )}
              </div>
            ))}
          </div>

          {/* JSON Body */}
          {["POST", "PUT", "PATCH"].includes(method) && (
            <textarea
              placeholder="Enter JSON request body..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 font-mono text-sm min-h-[120px] bg-gray-50"
            />
          )}

          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded transition-colors"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Request"}
          </button>
        </form>

        {/* Response Viewer */}
        <ResponseViewer
          status={status}
          data={responseData}
          headers={responseHeaders}
          duration={duration}
        />
      </div>

      {/* History Panel - Desktop */}
      <div className="hidden md:block">
        <HistoryPanel history={history} onSelect={handleHistorySelect} isOpen={true} />
      </div>
      {/* History Panel - Mobile */}
      {historyOpen && (
        <div className="md:hidden col-span-full">
          <HistoryPanel history={history} onSelect={handleHistorySelect} isOpen={historyOpen} />
        </div>
      )}
    </div>
  );
};

export default ApiForm;
