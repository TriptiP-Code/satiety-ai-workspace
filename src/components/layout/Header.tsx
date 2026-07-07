function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-800 bg-slate-950 px-6">
      <div>
        <h2 className="text-lg font-semibold text-white">
          Satiety
        </h2>

        <p className="text-sm text-slate-400">
          Your AI Workspace
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button className="rounded-lg bg-slate-800 p-2 transition hover:bg-slate-700">
          🌙
        </button>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 font-semibold">
          T
        </div>
      </div>
    </header>
  );
}

export default Header;