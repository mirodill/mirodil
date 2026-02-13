import Sidebar from "@/layout/Sidebar";
import { Outlet } from "react-router-dom";


export default function Dashboard() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 ml-64 p-8">
        <Outlet />
      </main>
    </div>
  );
}
