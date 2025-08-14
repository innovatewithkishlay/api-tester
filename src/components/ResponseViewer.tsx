import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  vscDarkPlus,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";

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
  const [isDark, setIsDark] = useState(false);

  // Detect initial dark mode
  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));

    // Listen for theme change via MutationObserver (for live toggle updates)
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {status !== null && (
        <motion.div
          key={status}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 15 }}
          transition={{ duration: 0.25 }}
          className="mt-6 p-4 bg-[#1b1b1b] dark:bg-[#1b1b1b] text-green-400 rounded-lg overflow-auto max-h-96 shadow-lg"
        >
          {/* Status and Duration */}
          <div className="mb-2 text-sm text-gray-400 flex justify-between">
            <span>Status: {status}</span>
            {duration !== undefined && <span>{duration} ms</span>}
          </div>

          {/* Headers Section */}
          {headers && (
            <div className="mb-3">
              <button
                className="text-blue-400 hover:underline text-sm"
                onClick={() => setShowHeaders(!showHeaders)}
              >
                {showHeaders ? "Hide Headers" : "Show Headers"}
              </button>
              {showHeaders && (
                <SyntaxHighlighter
                  language="json"
                  style={isDark ? vscDarkPlus : oneLight}
                  customStyle={{
                    borderRadius: "6px",
                    padding: "10px",
                    fontSize: "0.75rem",
                  }}
                >
                  {JSON.stringify(headers, null, 2)}
                </SyntaxHighlighter>
              )}
            </div>
          )}

          {/* Response Body Section */}
          <SyntaxHighlighter
            language="json"
            style={isDark ? vscDarkPlus : oneLight}
            customStyle={{
              borderRadius: "6px",
              padding: "12px",
              fontSize: "0.85rem",
            }}
          >
            {JSON.stringify(data, null, 2)}
          </SyntaxHighlighter>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResponseViewer;
