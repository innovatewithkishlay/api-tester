import React from "react";
import { motion } from "framer-motion";

export interface HistoryItem {
  method: string;
  url: string;
  headers: { key: string; value: string }[];
  body?: string;
  timestamp: number;
}

interface HistoryPanelProps {
  historyVisible?: boolean;
  onClose?: () => void;
  history?: HistoryItem[];
  onSelect?: (item: HistoryItem) => void;
}

const methodColors: Record<string, string> = {
  GET: "bg-green-500",
  POST: "bg-blue-500",
  PUT: "bg-yellow-500",
  DELETE: "bg-red-500",
  PATCH: "bg-purple-500",
};

const HistoryPanel: React.FC<HistoryPanelProps> = ({
  onClose,
  history = [],
  onSelect = () => {},
}) => {
  return (
    <motion.div
      className="h-full flex flex-col p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-2">
        <h3 className="text-lg font-semibold text-gray-800">Request History</h3>
        <button
          onClick={onClose}
          aria-label="Close history panel"
          className="text-gray-600 hover:text-gray-900 text-xl font-bold focus:outline-none"
        >
          ×
        </button>
      </div>

      {history.length === 0 ? (
        <p className="text-gray-500 text-sm italic">No requests sent yet.</p>
      ) : (
        <ul className="overflow-y-auto flex-1 space-y-2">
          {history.map((item, idx) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2, delay: idx * 0.02 }}
            >
              <button
                onClick={() => onSelect(item)}
                className="w-full flex flex-col md:flex-row md:items-center justify-between gap-1 md:gap-2 text-left p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition duration-150 ease-in-out border border-transparent hover:border-gray-200 focus:ring-2 focus:ring-blue-300 focus:outline-none"
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`text-white text-xs font-bold px-2 py-1 rounded ${
                      methodColors[item.method] || "bg-gray-500"
                    }`}
                  >
                    {item.method}
                  </span>
                  <span className="text-sm font-medium text-gray-800 truncate max-w-[180px]">
                    {item.url}
                  </span>
                </div>
                <span className="text-xs text-gray-500">
                  {new Date(item.timestamp).toLocaleString()}
                </span>
              </button>
            </motion.li>
          ))}
        </ul>
      )}
    </motion.div>
  );
};

export default HistoryPanel;
