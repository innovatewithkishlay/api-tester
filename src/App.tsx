import React from "react";
import { motion } from "framer-motion";
import ApiForm from "./components/ApiForm";
import { Toaster } from "react-hot-toast";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900">
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

      {/* Page Container */}
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 py-5 flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-800">
            API Tester
          </h1>
          <a
            href="https://github.com/innovatewithkishlay/api-tester"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm md:text-base text-blue-600 font-medium hover:underline"
          >
            View on GitHub
          </a>
        </div>
      </motion.header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <ApiForm />
        </motion.div>
      </main>

      <motion.footer
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="mt-10 border-t border-gray-200 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 py-5 text-center text-sm text-gray-500">
          Made with ❤️ by{" "}
          <a
            href="https://kishlaykumar.onrender.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            kishlay kumar
          </a>{" "}
          | Open Source & Contributions Welcome
        </div>
      </motion.footer>
    </div>
  );
};

export default App;
