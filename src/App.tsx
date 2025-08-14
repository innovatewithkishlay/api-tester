import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ApiForm from "./components/ApiForm";
import HistoryPanel from "./components/HistoryPanel";
import type { HistoryItem } from "./components/HistoryPanel";
import { Toaster } from "react-hot-toast";

const App: React.FC = () => {
  const [historyVisible, setHistoryVisible] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const toggleHistory = () => setHistoryVisible((v) => !v);
  const closeHistory = () => setHistoryVisible(false);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        historyVisible &&
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node)
      ) {
        closeHistory();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [historyVisible]);

  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && historyVisible) closeHistory();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [historyVisible]);

  // Add new request to history
  const handleNewHistoryItem = (item: HistoryItem) => {
    setHistory((prev) => [item, ...prev].slice(0, 20));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900 relative">
      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: "8px",
            background: "#fff",
            color: "#333",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
          },
          success: { iconTheme: { primary: "#4ade80", secondary: "#fff" } },
          error: { iconTheme: { primary: "#f87171", secondary: "#fff" } }
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

      {/* Main Content */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 pt-20 pb-10 relative">
        {/* Main API Form */}
        <ApiForm onNewHistoryItem={handleNewHistoryItem} />

        {/* Overlay + Sidebar */}
        <AnimatePresence>
          {historyVisible && (
            <>
              {/* Blurred overlay */}
              <motion.div
                className="fixed inset-0 bg-white/30 backdrop-blur-sm z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
              {/* Sidebar */}
              <motion.aside
                ref={sidebarRef}
                id="history-panel"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="fixed top-[72px] right-0 bottom-0 w-[28rem] max-w-full bg-white border-l border-gray-200 shadow-lg rounded-l-xl z-50 overflow-y-auto"
              >
                <HistoryPanel
                  history={history}
                  onClose={closeHistory}
                  onSelect={() => {
                    closeHistory();
                  }}
                />
              </motion.aside>
            </>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="border-t border-gray-200 bg-white py-4 text-center text-sm text-gray-500"
      >
        Made with ❤️ by{" "}
        <a
          href="https://github.com/innovatewithkishlay"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          innovatewithkishlay
        </a>{" "}
        | Open Source &amp; Contributions Welcome
      </motion.footer>
    </div>
  );
};

export default App;
