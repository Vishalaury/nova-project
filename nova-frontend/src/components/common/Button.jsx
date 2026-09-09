import React from "react";

const variants = {
  primary:
    "bg-slate-900 text-white hover:bg-slate-800 focus:ring-slate-400",
  secondary:
    "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 focus:ring-slate-300",
  danger:
    "bg-red-600 text-white hover:bg-red-700 focus:ring-red-300",
  success:
    "bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-300",
  ghost:
    "bg-transparent text-slate-600 hover:bg-slate-100 focus:ring-slate-200",
};

export default function Button({
  children,
  type = "button",
  variant = "primary",
  loading = false,
  disabled = false,
  className = "",
  onClick,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center gap-2
        rounded-lg px-4 py-2.5
        text-sm font-medium
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-offset-1
        disabled:cursor-not-allowed disabled:opacity-60
        ${variants[variant] || variants.primary}
        ${className}
      `}
    >
      {loading && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}

      {children}
    </button>
  );
}