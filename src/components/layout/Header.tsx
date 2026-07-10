import { useEffect, useRef, useState } from "react";
import { Moon, Sun } from "lucide-react";

import ProfileDropdown from "../profile/ProfileDropdown";

interface HeaderProps {
  theme: "dark" | "light";
  toggleTheme: () => void;
}

function Header({
  theme,
  toggleTheme,
}: HeaderProps) {
  const [showProfile, setShowProfile] =
    useState(false);

  const profileRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(
      event: MouseEvent
    ) {
      if (
        profileRef.current &&
        !profileRef.current.contains(
          event.target as Node
        )
      ) {
        setShowProfile(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
  }, []);

  return (
    <header
      className={`flex h-16 items-center justify-between border-b px-6 transition-colors duration-300 ${
        theme === "dark"
          ? "border-slate-800 bg-slate-950"
          : "border-slate-300 bg-white"
      }`}
    >
      <div>
        <h2
          className={`text-lg font-semibold ${
            theme === "dark"
              ? "text-white"
              : "text-slate-900"
          }`}
        >
          Satiety
        </h2>

        <p
          className={`text-sm ${
            theme === "dark"
              ? "text-slate-400"
              : "text-slate-600"
          }`}
        >
          Your AI Workspace
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={toggleTheme}
          className={`rounded-lg p-2 transition-all duration-300 hover:scale-105 ${
            theme === "dark"
              ? "bg-slate-800 hover:bg-slate-700"
              : "bg-slate-200 hover:bg-slate-300"
          }`}
        >
          {theme === "dark" ? (
            <Sun
              size={20}
              className="text-yellow-400"
            />
          ) : (
            <Moon
              size={20}
              className="text-slate-700"
            />
          )}
        </button>

        <div
          ref={profileRef}
          className="relative"
        >
          <button
            onClick={() =>
              setShowProfile(
                (prev) => !prev
              )
            }
            className={`flex h-10 w-10 items-center justify-center rounded-full font-semibold transition-all duration-300 hover:scale-105 ${
              theme === "dark"
                ? "bg-indigo-600 text-white"
                : "border border-indigo-200 bg-indigo-100 text-indigo-700"
            }`}
          >
            T
          </button>

          <ProfileDropdown
            open={showProfile}
          />
        </div>
      </div>
    </header>
  );
}

export default Header;