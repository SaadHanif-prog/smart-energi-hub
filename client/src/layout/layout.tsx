import { Outlet } from "react-router-dom";

// components
import Navbar from "../components/common/navbar";
import Sidebar from "../components/common/sidebar";

// Icons
import { CircleQuestionMark } from "lucide-react";

const Layout = () => {
  return (
    <div className="h-screen flex flex-col bg-layout overflow-scroll">
      {/* Fixed Navbar */}
      <div className="fixed top-0 w-full z-50">
        <Navbar />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 pt-[64px] min-w-[800px]">
        {/* Sidebar */}
        <Sidebar />
        {/* Scrollable Outlet Area */}
        <div
          className="flex-1 max-w-[1280px] mx-auto overflow-y-auto"
          style={{ maxHeight: "calc(100vh - 4.25rem)" }}
        >
          <Outlet />
        </div>
      </div>

      {/* Support Button */}
      <button className="hidden cursor-pointer font-medium md:flex justify-center gap-x-2 w-[120px] fixed bottom-3 z-[999] right-6 bg-primary rounded p-2 text-primaryDark">
        <CircleQuestionMark />
        Support
      </button>
    </div>
  );
};

export default Layout;
