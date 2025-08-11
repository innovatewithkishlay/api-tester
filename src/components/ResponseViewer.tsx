import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ResponseViewerProps {
  status: number | null;
  data: unknown;
}

const ResponseViewer: React.FC<ResponseViewerProps> = ({ status, data }) => {
  return (
    <AnimatePresence>
      {status !== null && (
        <motion.div
          key={status}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 15 }}
          transition={{ duration: 0.25 }}
          className="mt-6 p-4 bg-gray-900 text-green-400 rounded-lg overflow-auto max-h-96 shadow-lg"
        >
          <div className="mb-2 text-sm text-gray-400">Status: {status}</div>
          <pre className="whitespace-pre-wrap break-all">
            {JSON.stringify(data, null, 2)}
          </pre>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResponseViewer;
