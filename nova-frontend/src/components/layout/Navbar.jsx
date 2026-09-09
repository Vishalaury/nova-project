import React from "react";
import { Menu, LogOut, UserCircle } from "lucide-react";
import useAuth from "../../hooks/useAuth";

export default function Navbar({ setMobileOpen }) {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6">
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setMobileOpen(true)}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
        >
          <Menu size={22} />
        </button>

        <div>
          <p className="hidden text-xs text-slate-400 sm:block">
            Workspace
          </p>

          <h2 className="text-sm font-semibold text-slate-900 sm:text-base">
            Project Management
          </h2>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-2 sm:flex">
          <UserCircle
            size={22}
            className="text-slate-400"
          />

          <div className="leading-tight">
            <p className="max-w-[140px] truncate text-sm font-medium text-slate-700">
              {user?.name || user?.username || "User"}
            </p>

            <p className="text-xs text-slate-400">
              {user?.email || ""}
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          title="Logout"
          className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
        >
          <LogOut size={17} />

          <span className="hidden sm:inline">
            Logout
          </span>
        </button>
      </div>
    </header>
  );
}