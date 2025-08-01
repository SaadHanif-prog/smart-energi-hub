// Icons
import { Search, User, Bell, LogOut, BookOpen } from "lucide-react";

const Navbar = () => {
  return (
    <div className="w-full h-17 bg-primary px-4 py-2 flex justify-between shadow-md">
      {/* Logo Section */}
      <div className="rounded-tr-2xl  flex items-center justify-center ">
        <img
          src="/images/logo.png"
          alt="Smart Energi Hub Logo"
          className="h-10 transition-all duration-300 object-contain"
        />
      </div>

      {/* Search Box */}
      <div className="flex items-center bg-white rounded px-3 py-1 w-md  md:w-xl lg-w-3xl">
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
          <Bell size={25} className=" cursor-pointer" />
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
        </div>

        {/* Logout Icon */}
        <div className="flex">
          <LogOut size={25} className=" cursor-pointer" />
          <p className="ml-3">Logout</p>
        </div>

        {/* Book Icon */}
        <BookOpen size={25} className="cursor-pointer" />
      </div>
    </div>
  );
};

export default Navbar;
