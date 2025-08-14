import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

interface ResponseViewerProps {
  status: number | null;
  data: unknown;
  headers?: Record<string, string>;
  duration?: number;
}

const checkmarkPathVariants = {
  hidden: { pathLength: 0 },
  visible: { pathLength: 1 }
};

const crossPathVariants = {
  hidden: { pathLength: 0 },
  visible: { pathLength: 1 }
};

const ResponseViewer: React.FC<ResponseViewerProps> = ({ status, data, headers, duration }) => {
  const [showHeaders, setShowHeaders] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (status !== null) {
      if (status >= 200 && status < 300) {
        setShowSuccess(true);
        setShowError(false);
      } else {
        setShowError(true);
        setShowSuccess(false);
      }
      const timer = setTimeout(() => {
        setShowSuccess(false);
        setShowError(false);
      }, 2500);
      return () => clearTimeout(timer);
    } else {
      setShowSuccess(false);
      setShowError(false);
    }
  }, [status]);

  return (
    <AnimatePresence>
      {status !== null && (
        <motion.div
          key={status}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 15 }}
          transition={{ duration: 0.25 }}
          className="mt-6 p-4 bg-gray-100 text-gray-900 rounded-lg overflow-auto max-h-96 shadow-lg relative"
        >
          <div className="mb-2 text-sm text-gray-600 flex justify-between items-center">
            <span>Status: {status}</span>
            {duration !== undefined && <span>{duration} ms</span>}
            <div className="ml-4 flex items-center space-x-2">
              <AnimatePresence>
                {showSuccess && (
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    aria-label="Success"
                    role="img"
                  >
                    <motion.path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      variants={checkmarkPathVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      d="M5 13l4 4L19 7"
                    />
                  </motion.svg>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {showError && (
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    aria-label="Error"
                    role="img"
                  >
                    <motion.line
                      x1="18"
                      y1="6"
                      x2="6"
                      y2="18"
                      strokeLinecap="round"
                      strokeWidth={3}
                      variants={crossPathVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                    />
                    <motion.line
                      x1="6"
                      y1="6"
                      x2="18"
                      y2="18"
                      strokeLinecap="round"
                      strokeWidth={3}
                      variants={crossPathVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                    />
                  </motion.svg>
                )}
              </AnimatePresence>
            </div>
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
