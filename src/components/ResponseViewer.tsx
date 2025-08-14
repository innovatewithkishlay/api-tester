import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

interface ResponseViewerProps {
  status: number | null;
  data: unknown;
  headers?: Record<string, string>;
  duration?: number;
}

const ResponseViewer: React.FC<ResponseViewerProps> = ({ status, data, headers, duration }) => {
  const [showHeaders, setShowHeaders] = useState(false);

  return (
    <AnimatePresence>
      {status !== null && (
        <motion.div
          key={status}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 15 }}
          transition={{ duration: 0.25 }}
          className="mt-6 p-4 bg-gray-100 text-gray-900 rounded-lg overflow-auto max-h-96 shadow-lg"
        >
          <div className="mb-2 text-sm text-gray-600 flex justify-between">
            <span>Status: {status}</span>
            {duration !== undefined && <span>{duration} ms</span>}
          </div>

          {headers && (
            <div className="mb-3">
              <button
                className="text-blue-600 hover:underline text-sm"
                onClick={() => setShowHeaders(!showHeaders)}
              >
                {showHeaders ? "Hide Headers" : "Show Headers"}
              </button>
              {showHeaders && (
                <SyntaxHighlighter
                  language="json"
                  style={oneLight}
                  customStyle={{ borderRadius: "6px", padding: "10px", fontSize: "0.75rem" }}
                >
                  {JSON.stringify(headers, null, 2)}
                </SyntaxHighlighter>
              )}
            </div>
          )}

          <SyntaxHighlighter
            language="json"
            style={oneLight}
            customStyle={{ borderRadius: "6px", padding: "12px", fontSize: "0.85rem" }}
          >
            {JSON.stringify(data, null, 2)}
          </SyntaxHighlighter>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResponseViewer;
