import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface HistoryItem {
  method: string;
  url: string;
  headers: { key: string; value: string }[];
  body?: string;
  timestamp: number;
}

interface HistoryPanelProps {
  history: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
  isOpen: boolean;
}

const methodColors: Record<string, string> = {
  GET: "bg-green-500",
  POST: "bg-blue-500",
  PUT: "bg-yellow-500",
  DELETE: "bg-red-500",
  PATCH: "bg-purple-500",
};

const HistoryPanel: React.FC<HistoryPanelProps> = ({ history, onSelect, isOpen }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="bg-white rounded-lg shadow-lg p-4 h-full overflow-y-auto border border-gray-200"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-lg font-semibold mb-3 text-gray-800">Request History</h3>
          {history.length === 0 ? (
            <motion.p
              className="text-gray-500 text-sm italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              No requests sent yet.
            </motion.p>
          ) : (
            <ul className="space-y-2">
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
                        className={`text-white text-xs font-bold px-2 py-1 rounded ${methodColors[item.method] || "bg-gray-500"}`}
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
      )}
    </AnimatePresence>
  );
};

export default HistoryPanel;
