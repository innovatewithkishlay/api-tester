import React from "react";

interface ResponseViewerProps {
  status: number | null;
  data: unknown;
}

const ResponseViewer: React.FC<ResponseViewerProps> = ({ status, data }) => {
  if (status === null) {
    return null;
  }

  return (
    <div className="mt-6 p-4 bg-gray-900 text-green-400 rounded-lg overflow-auto max-h-96">
      <div className="mb-2 text-sm text-gray-400">Status: {status}</div>
      <pre className="whitespace-pre-wrap break-all">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
};

export default ResponseViewer;
