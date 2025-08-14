import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface EnvironmentVariable {
  key: string;
  value: string;
}

export interface Environment {
  id: string;
  name: string;
  variables: EnvironmentVariable[];
}

interface EnvironmentManagerProps {
  environments: Environment[];
  setEnvironments: React.Dispatch<React.SetStateAction<Environment[]>>;
}

const EnvironmentManager: React.FC<EnvironmentManagerProps> = ({
  environments,
  setEnvironments,
}) => {
  const [newEnvName, setNewEnvName] = useState("");
  const [expandedEnvId, setExpandedEnvId] = useState<string | null>(null);

  useEffect(() => {
    // Save environments on change
    localStorage.setItem(
      "apiTesterEnvironments",
      JSON.stringify(environments)
    );
  }, [environments]);

  const createNewEnv = () => {
    if (!newEnvName.trim()) return;
    const newEnv: Environment = {
      id: crypto.randomUUID(),
      name: newEnvName.trim(),
      variables: [{ key: "", value: "" }],
    };
    setEnvironments([newEnv, ...environments]);
    setNewEnvName("");
    setExpandedEnvId(newEnv.id);
  };

  const deleteEnv = (id: string) => {
    setEnvironments(environments.filter((env) => env.id !== id));
    if (expandedEnvId === id) setExpandedEnvId(null);
  };

  const updateEnvName = (id: string, name: string) => {
    setEnvironments(
      environments.map((env) =>
        env.id === id ? { ...env, name } : env
      )
    );
  };

  const addVariable = (envId: string) => {
    setEnvironments(
      environments.map((env) =>
        env.id === envId
          ? {
              ...env,
              variables: [...env.variables, { key: "", value: "" }],
            }
          : env
      )
    );
  };

  const updateVariable = (
    envId: string,
    index: number,
    field: "key" | "value",
    value: string
  ) => {
    setEnvironments(
      environments.map((env) => {
        if (env.id === envId) {
          const variables = [...env.variables];
          variables[index] = { ...variables[index], [field]: value };
          return { ...env, variables };
        }
        return env;
      })
    );
  };

  const removeVariable = (envId: string, index: number) => {
    setEnvironments(
      environments.map((env) => {
        if (env.id === envId) {
          const variables = env.variables.filter((_, i) => i !== index);
          return { ...env, variables };
        }
        return env;
      })
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6 max-w-6xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-gray-900">
        Environments
      </h2>

      <div className="flex mb-6 gap-2">
        <input
          type="text"
          value={newEnvName}
          onChange={(e) => setNewEnvName(e.target.value)}
          placeholder="New environment name"
          className="flex-grow border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        <button
          onClick={createNewEnv}
          disabled={!newEnvName.trim()}
          className={`px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          Add
        </button>
      </div>

      <div className="space-y-4 max-h-[400px] overflow-auto">
        <AnimatePresence>
          {environments.map((env) => (
            <motion.div
              key={env.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="border border-gray-300 rounded p-4 bg-gray-50"
            >
              <div className="flex justify-between items-center cursor-pointer select-none">
                <input
                  type="text"
                  value={env.name}
                  onChange={(e) => updateEnvName(env.id, e.target.value)}
                  className="text-lg font-semibold bg-transparent border-b border-transparent focus:border-blue-400 transition focus:outline-none flex-grow mr-4"
                  aria-label={`Environment name for ${env.name}`}
                />
                <button
                  onClick={() => deleteEnv(env.id)}
                  className="text-red-600 font-bold hover:text-red-800 transition px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-red-400"
                  aria-label={`Delete environment ${env.name}`}
                  title="Delete Environment"
                >
                  ✕
                </button>
              </div>

              {/* Expandable variables section */}
              <motion.div
                initial={false}
                animate={{ height: expandedEnvId === env.id ? "auto" : 0, opacity: expandedEnvId === env.id ? 1 : 0 }}
                className="overflow-hidden transition-all"
              >
                {expandedEnvId === env.id && (
                  <div className="mt-4 space-y-3">
                    {env.variables.map((variable, idx) => (
                      <motion.div
                        key={idx}
                        className="flex gap-2"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                      >
                        <input
                          type="text"
                          placeholder="Variable key"
                          value={variable.key}
                          onChange={(e) =>
                            updateVariable(env.id, idx, "key", e.target.value)
                          }
                          className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                          aria-label="Variable key"
                        />
                        <input
                          type="text"
                          placeholder="Variable value"
                          value={variable.value}
                          onChange={(e) =>
                            updateVariable(env.id, idx, "value", e.target.value)
                          }
                          className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                          aria-label="Variable value"
                        />
                        <button
                          type="button"
                          onClick={() => removeVariable(env.id, idx)}
                          className="text-red-500 font-bold px-2 rounded hover:bg-red-100 transition focus:outline-none focus:ring-2 focus:ring-red-400"
                          aria-label="Remove variable"
                        >
                          ✕
                        </button>
                      </motion.div>
                    ))}

                    <button
                      type="button"
                      onClick={() => addVariable(env.id)}
                      className="mt-2 text-blue-600 hover:underline text-sm"
                    >
                      + Add Variable
                    </button>
                  </div>
                )}
              </motion.div>

              {/* Toggle expand/collapse */}
              <button
                onClick={() =>
                  setExpandedEnvId(expandedEnvId === env.id ? null : env.id)
                }
                className="mt-4 text-sm text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400"
                aria-label={
                  expandedEnvId === env.id ? "Collapse environment" : "Expand environment"
                }
              >
                {expandedEnvId === env.id ? "Hide Variables" : "Show Variables"}
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default EnvironmentManager;
