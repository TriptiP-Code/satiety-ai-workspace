import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

function AppLayout() {
  return (
    <div className="flex h-screen bg-slate-950 text-slate-100">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Header />

        <main className="flex-1 overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;