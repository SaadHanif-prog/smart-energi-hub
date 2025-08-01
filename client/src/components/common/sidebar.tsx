import { useState } from "react";
import { NavLink } from "react-router-dom";

// Constants
import { navlinks } from "../../constants/sidebar";

// Icons
import { FoldHorizontal, UnfoldHorizontal } from "lucide-react";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleCollapseToggle = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <aside
      style={{ maxHeight: "calc(100vh - 4.25rem)" }}
      className={`bg-white transition-all duration-300 overflow-y-auto
        ${isCollapsed ? "w-20" : "w-72"}`}
    >
      <div>
        {/* Menu expand Button*/}
        <div className="flex-1 transition-all duration-300">
          <div className="flex justify-center p-2">
            <button
              onClick={handleCollapseToggle}
              className="text-textLight cursor-pointer"
            >
              {isCollapsed ? (
                <UnfoldHorizontal size={25} />
              ) : (
                <FoldHorizontal size={25} />
              )}
            </button>
          </div>

          {/* NavItems */}
          <nav>
            {navlinks.map((link) => (
              <NavLink
                key={link.title}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center ${
                    isCollapsed ? "justify-center" : "gap-3"
                  } px-3 py-6 transition-colors border-b-1 ${
                    isActive
                      ? "bg-primary text-primaryDark border-b-primaryDark"
                      : "text-textLight hover:bg-primary hover:text-primaryDark border-b-white hover:border-b-primaryDark"
                  }`
                }
              >
                {link.icon}
                {!isCollapsed && (
                  <span className="whitespace-nowrap">{link.title}</span>
                )}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
