import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <Header />

      <main className="flex-1 pt-20 px-4 sm:px-6 lg:px-8">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
