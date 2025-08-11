import React from "react";

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
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({ history, onSelect }) => {
  if (!history.length) {
    return (
      <div className="p-4 text-gray-500 text-sm italic">
        No requests made yet.
      </div>
    );
  }

  return (
    <div className="space-y-2 p-4">
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
  );
};

export default HistoryPanel;
