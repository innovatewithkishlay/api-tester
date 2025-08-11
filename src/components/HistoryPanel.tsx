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

const HistoryPanel: React.FC<HistoryPanelProps> = ({
  history,
  onSelect,
  isOpen,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-lg shadow-md overflow-y-auto max-h-[80vh]"
        >
          <h3 className="p-4 border-b text-lg font-semibold">History</h3>
          <div className="p-4 space-y-2">
            {history.length === 0 && (
              <div className="text-gray-500 text-sm italic">
                No requests made yet.
              </div>
            )}
            {history.map((item, idx) => (
              <div
                key={idx}
                className="border p-2 rounded cursor-pointer hover:bg-gray-100 transition"
                onClick={() => onSelect(item)}
              >
                <div className="font-medium">
                  {item.method} — {item.url}
                </div>
                <div className="text-xs text-gray-500">
                  {new Date(item.timestamp).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HistoryPanel;
