import React from "react";
import { AlertCircle, X } from "lucide-react";

export default function ErrorMessage({
  message = "Something went wrong.",
  onClose,
}) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">
      <AlertCircle
        size={20}
        className="mt-0.5 shrink-0"
      />

      <div className="flex-1">
        <p className="text-sm font-medium">
          {message}
        </p>
      </div>

      {onClose && (
        <button
          onClick={onClose}
          className="rounded p-1 hover:bg-red-100"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}