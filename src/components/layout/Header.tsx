import { useEffect, useRef, useState } from "react";
import { Menu, Moon, Sun } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";


interface HeaderProps {
  theme: "dark" | "light";
  toggleTheme: () => void;

  setSidebarOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

function Header({
  theme,
  toggleTheme,
  setSidebarOpen,
}: HeaderProps) {

  const profileRef =
    useRef<HTMLDivElement>(null);

    const { user, logout } = useAuth();
    

const navigate = useNavigate();

const [showProfileMenu, setShowProfileMenu] =
  useState(false);

  const initials =
  user?.name
    ?.split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase() ?? "";

    useEffect(() => {
  function handleClick(
    event: MouseEvent
  ) {
    if (
      profileRef.current &&
      !profileRef.current.contains(
        event.target as Node
      )
    ) {
      setShowProfileMenu(false);
    }
  }

  document.addEventListener(
    "mousedown",
    handleClick
  );

  return () =>
    document.removeEventListener(
      "mousedown",
      handleClick
    );
}, []);


  return (
    <header
  className={`sticky top-0 z-20 shrink-0 flex h-16 items-center justify-between border-b px-6 transition-colors duration-300 ${
        theme === "dark"
          ? "border-slate-800 bg-slate-950"
          : "border-slate-300 bg-white"
      }`}
    >
      <div className="flex items-center gap-3">
  {/* Mobile Hamburger */}
  <button
    onClick={() => setSidebarOpen(true)}
    className={`rounded-lg p-2 lg:hidden ${
      theme === "dark"
        ? "hover:bg-slate-800"
        : "hover:bg-slate-200"
    }`}
  >
    <Menu size={22} />
  </button>

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
      setShowProfileMenu((prev) => !prev)
    }
    className="
      ml-3
      flex
      h-10
      w-10
      items-center
      justify-center
      rounded-full
      bg-gradient-to-r from-indigo-500 to-purple-600
      text-sm
      font-semibold
      text-white
      transition
      hover:scale-105
    "
  >
    {initials}
  </button>

  {showProfileMenu && (
    <div
      className={`absolute right-0 mt-3 w-64 rounded-2xl border shadow-xl ${
        theme === "dark"
          ? "border-slate-700 bg-slate-900"
          : "border-slate-200 bg-white"
      }`}
    >
      <div className="border-b p-5">

        <div
          className="
            mx-auto
            mb-3
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-full
            bg-gradient-to-r from-indigo-500 to-purple-600
            text-lg
            font-bold
            text-white
          "
        >
          {initials}
        </div>

        <p className="font-semibold text-center">
          {user?.name}
        </p>

        <p
          className={`text-center text-sm ${
            theme === "dark"
              ? "text-slate-400"
              : "text-slate-600"
          }`}
        >
          {user?.email}
        </p>

      </div>

      <button
        onClick={() => {
          navigate("/settings");
          setShowProfileMenu(false);
        }}
        className={`block w-full px-5 py-3 text-left ${
          theme === "dark"
            ? "hover:bg-slate-800"
            : "hover:bg-slate-100"
        }`}
      >
        ⚙ Settings
      </button>

      <button
        onClick={() => {
          logout();
          navigate("/welcome");
        }}
        className="block w-full px-5 py-3 text-left text-red-500 hover:bg-red-50"
      >
        🚪 Logout
      </button>

    </div>
  )}

</div>

        <div
          ref={profileRef}
          className="relative"
        >
        </div>
      </div>
    </header>
  );
}

export default Header;