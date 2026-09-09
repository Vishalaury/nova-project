import { ArrowLeft, Home, SearchX } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Button from "../components/common/Button";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg">
          <SearchX size={36} />
        </div>

        <p className="mt-6 text-7xl font-black text-slate-900">
          404
        </p>

        <h1 className="mt-3 text-2xl font-bold text-slate-900">
          Page Not Found
        </h1>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          The page you're looking for doesn't exist or may
          have been moved.
        </p>

        <div className="mt-7 flex justify-center gap-3">
          <Button
            variant="secondary"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={17} />
            Go Back
          </Button>

          <Button
            onClick={() => navigate("/dashboard")}
          >
            <Home size={17} />
            Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}