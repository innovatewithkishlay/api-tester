import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ResponseViewerProps {
  status: number | null;
  data: unknown;
  headers?: Record<string, string>;
  duration?: number;
}

const ResponseViewer: React.FC<ResponseViewerProps> = ({
  status,
  data,
  headers,
  duration,
}) => {
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
          className="mt-6 p-4 bg-gray-900 dark:bg-gray-800 text-green-400 rounded-lg overflow-auto max-h-96 shadow-lg"
        >
          <div className="mb-2 text-sm text-gray-400 flex justify-between">
            <span>Status: {status}</span>
            {duration !== undefined && <span>{duration} ms</span>}
          </div>

          {headers && (
            <div className="mb-3">
              <button
                className="text-blue-400 hover:underline text-sm"
                onClick={() => setShowHeaders(!showHeaders)}
              >
                {showHeaders ? "Hide Headers" : "Show Headers"}
              </button>
              {showHeaders && (
                <pre className="whitespace-pre-wrap break-all text-xs text-gray-300">
                  {JSON.stringify(headers, null, 2)}
                </pre>
              )}
            </div>
          )}

          <pre className="whitespace-pre-wrap break-all">
            {JSON.stringify(data, null, 2)}
          </pre>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResponseViewer;
