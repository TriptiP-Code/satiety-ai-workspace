function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-800 px-8">
      <h2 className="text-lg font-semibold">
        Home
      </h2>

      <div className="flex items-center gap-4">
        <button className="rounded-lg bg-slate-800 p-2 hover:bg-slate-700">
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