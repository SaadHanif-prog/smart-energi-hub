// Icons
import { Search, User, Bell, LogOut, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");

    navigate("/login");
  };

  return (
    <div className="w-full h-17 bg-primary px-4 py-2 flex justify-between shadow-md">
      {/* Logo Section */}
      <div className="rounded-tr-2xl hidden lg:flex items-center justify-center">
        <img
          src="/images/logo.png"
          alt="Smart Energi Hub Logo"
          className="h-10 transition-all duration-300 object-contain"
        />
      </div>

      {/* Search Box */}
      <div className="flex items-center bg-white rounded px-3 py-1 w-sm lg-w-2xl">
        <Search className="text-primaryDark" size={25} />
        <input
          type="text"
          placeholder="Search Smart Energi Hub"
          className="ml-2 h-7 outline-none text-md text-textLight placeholder:text-textLight"
        />
      </div>

      {/* Right Side Items */}
      <div className="flex items-center gap-6 text-textLight">
        {/* User Info */}
        <div className="flex items-center gap-2 cursor-pointer">
          <User size={25} />
          <span className="text-sm hidden md:inline">Rahul Sathyan</span>
        </div>

        {/* Notification Icon with Red Dot */}
        <div className="relative">
          <Bell size={25} className="cursor-pointer" />
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
        </div>

        {/* Logout Icon */}
        <div
          className="flex items-center cursor-pointer hover:text-red-500 transition"
          onClick={handleLogout}
        >
          <LogOut size={25} />
          <p className="ml-3">Logout</p>
        </div>

        {/* Book Icon */}
        <BookOpen size={25} className="cursor-pointer" />
      </div>
    </div>
  );
};

export default Navbar;
