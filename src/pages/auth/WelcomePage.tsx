import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  Brain,
  FolderOpen,
  MessageSquare,
} from "lucide-react";

import Button from "../../components/ui/Button";
import { useTheme } from "../../context/ThemeContext";

function WelcomePage() {
  const navigate = useNavigate();

  const { theme } = useTheme();

  return (
    <div
      className={`relative flex min-h-[100dvh] items-center justify-center overflow-hidden px-6 transition-colors duration-500 ${
        theme === "dark"
          ? "bg-slate-950"
          : "bg-slate-100"
      }`}
    >
      {/* Background */}

      <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl animate-blob" />

      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl animate-blob animation-delay-2000" />

      <div className="absolute left-1/2 top-1/2 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl animate-blob animation-delay-4000" />

      <div
        className={`relative z-10 w-full max-w-xl rounded-3xl border p-10 shadow-2xl backdrop-blur-xl transition-all ${
          theme === "dark"
            ? "border-white/10 bg-white/5"
            : "border-white/60 bg-white/70"
        }`}
      >
        {/* Logo */}

        <div className="flex justify-center">
          <div
            className={`rounded-3xl p-5 ${
              theme === "dark"
                ? "bg-indigo-500/20"
                : "bg-indigo-100"
            }`}
          >
            <Sparkles
              size={42}
              className="text-indigo-500"
            />
          </div>
        </div>

        {/* Heading */}

        <h1
          className={`mt-6 text-center text-5xl font-bold ${
            theme === "dark"
              ? "text-white"
              : "text-slate-900"
          }`}
        >
          Satiety
        </h1>

        <p
          className={`mt-3 text-center text-xl ${
            theme === "dark"
              ? "text-indigo-300"
              : "text-indigo-600"
          }`}
        >
          Your AI Workspace
        </p>

        <p
          className={`mx-auto mt-6 max-w-md text-center leading-7 ${
            theme === "dark"
              ? "text-slate-400"
              : "text-slate-600"
          }`}
        >
          Chat with AI, organize conversations into
          workspaces and build a searchable knowledge
          base that grows with you.
        </p>

        {/* Buttons */}

        <div className="mt-10 space-y-4">
          <Button
            className="w-full py-3"
            onClick={() => navigate("/login")}
          >
            Get Started →
          </Button>

          <Button
            variant="secondary"
            className="w-full py-3"
            onClick={() =>
              navigate("/register")
            }
          >
            Create Free Account
          </Button>
        </div>

        {/* Features */}

        <div
          className={`mt-10 grid grid-cols-1 gap-4 md:grid-cols-3 ${
            theme === "dark"
              ? "text-slate-300"
              : "text-slate-700"
          }`}
        >
          <div
            className={`rounded-xl border p-4 text-center ${
              theme === "dark"
                ? "border-slate-800 bg-slate-900/40"
                : "border-slate-200 bg-white/60"
            }`}
          >
            <MessageSquare
              className="mx-auto mb-2 text-indigo-500"
              size={24}
            />

            <p className="font-medium">
              AI Conversations
            </p>
          </div>

          <div
            className={`rounded-xl border p-4 text-center ${
              theme === "dark"
                ? "border-slate-800 bg-slate-900/40"
                : "border-slate-200 bg-white/60"
            }`}
          >
            <FolderOpen
              className="mx-auto mb-2 text-indigo-500"
              size={24}
            />

            <p className="font-medium">
              Smart Workspaces
            </p>
          </div>

          <div
            className={`rounded-xl border p-4 text-center ${
              theme === "dark"
                ? "border-slate-800 bg-slate-900/40"
                : "border-slate-200 bg-white/60"
            }`}
          >
            <Brain
              className="mx-auto mb-2 text-indigo-500"
              size={24}
            />

            <p className="font-medium">
              Your Second Brain
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;