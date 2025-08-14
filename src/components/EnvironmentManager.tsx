import React, { useState } from "react";

export interface EnvVariable {
  key: string;
  value: string;
}

export interface Environment {
  id: string;
  name: string;
  variables: EnvVariable[];
}

interface Props {
  environments: Environment[];
  setEnvironments: (envs: Environment[]) => void;
}

const LOCAL_STORAGE_KEY = "apiTesterEnvironments";

const EnvironmentManager: React.FC<Props> = ({ environments, setEnvironments }) => {
  const [newName, setNewName] = useState("");

  const addEnvironment = () => {
    if (!newName.trim()) return;
    const newEnv: Environment = {
      id: Date.now().toString(),
      name: newName,
      variables: [{ key: "", value: "" }],
    };
    const updated = [...environments, newEnv];
    setEnvironments(updated);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    setNewName("");
  };

  const updateEnvName = (id: string, name: string) => {
    const updated = environments.map(env =>
      env.id === id ? { ...env, name } : env
    );
    setEnvironments(updated);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  };

  const updateVariable = (envId: string, index: number, field: "key" | "value", value: string) => {
    const updated = environments.map(env => {
      if (env.id === envId) {
        const newVars = [...env.variables];
        newVars[index][field] = value;
        return { ...env, variables: newVars };
      }
      return env;
    });
    setEnvironments(updated);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  };

  const addVariable = (envId: string) => {
    const updated = environments.map(env =>
      env.id === envId
        ? { ...env, variables: [...env.variables, { key: "", value: "" }] }
        : env
    );
    setEnvironments(updated);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  };

  const removeEnv = (id: string) => {
    const updated = environments.filter(env => env.id !== id);
    setEnvironments(updated);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  };

  return (
    <div className="p-4 border border-gray-300 rounded mb-4 bg-white shadow">
      <h3 className="font-bold text-lg mb-2">Environments</h3>
      {environments.map(env => (
        <div key={env.id} className="mb-4 border rounded p-2">
          <div className="flex justify-between mb-2">
            <input
              className="border px-2 py-1 flex-1 mr-2"
              value={env.name}
              onChange={(e) => updateEnvName(env.id, e.target.value)}
            />
            <button onClick={() => removeEnv(env.id)} className="text-red-500">Delete</button>
          </div>
          {env.variables.map((v, i) => (
            <div key={i} className="flex gap-2 mb-1">
              <input
                placeholder="Key"
                value={v.key}
                onChange={(e) => updateVariable(env.id, i, "key", e.target.value)}
                className="border px-2 py-1 flex-1"
              />
              <input
                placeholder="Value"
                value={v.value}
                onChange={(e) => updateVariable(env.id, i, "value", e.target.value)}
                className="border px-2 py-1 flex-1"
              />
            </div>
          ))}
          <button onClick={() => addVariable(env.id)} className="text-blue-600 text-sm">+ Add Variable</button>
        </div>
      ))}
      <div className="flex mt-2">
        <input
          placeholder="New Environment"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="border px-2 py-1 flex-1 mr-2"
        />
        <button onClick={addEnvironment} className="bg-blue-500 text-white px-3 py-1 rounded">
          Add
        </button>
      </div>
    </div>
  );
};

export default EnvironmentManager;
