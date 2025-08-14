import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ApiForm from "./components/ApiForm";
import HistoryPanel from "./components/HistoryPanel";
import { Toaster } from "react-hot-toast";

const App: React.FC = () => {
  const [historyVisible, setHistoryVisible] = useState(false);

  const toggleHistory = () => setHistoryVisible((v) => !v);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900 relative">
      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: "8px",
            background: "#fff",
            color: "#333",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          },
          success: {
            iconTheme: { primary: "#4ade80", secondary: "#fff" },
          },
          error: {
            iconTheme: { primary: "#f87171", secondary: "#fff" },
          },
        }}
      />

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white shadow-sm fixed top-0 left-0 right-0 z-30"
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            API Tester
          </h1>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleHistory}
              className="px-3 py-1 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
              aria-expanded={historyVisible}
              aria-controls="history-panel"
            >
              {historyVisible ? "Hide History" : "Show History"}
            </button>
            <a
              href="https://github.com/innovatewithkishlay/api-tester"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm md:text-base text-blue-600 font-medium hover:underline"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </motion.header>

      {/* Main Content + History Sidebar layout */}
      <main className="max-w-7xl mx-auto px-4 py-20 flex relative">
        <div className="flex-1">
          <ApiForm />
        </div>

        {/* History Sidebar */}
        <AnimatePresence>
          {historyVisible && (
            <motion.aside
              id="history-panel"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-[72px] right-0 bottom-0 w-96 bg-white border-l border-gray-200 shadow-lg z-40 overflow-y-auto"
            >
              <HistoryPanel
                historyVisible={historyVisible}
                onClose={() => setHistoryVisible(false)}
              />
            </motion.aside>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default App;
