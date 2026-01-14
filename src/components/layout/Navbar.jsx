import { NavLink } from "react-router-dom";
import SectionCard from "../common/SectionCard";
import { Home, Briefcase, BookOpen, Code, Mail, Sun, Moon } from "lucide-react";
import { useState } from "react";

const navItems = [
  { path: "/", label: "About", icon: Home },
  { path: "/projects", label: "Projects", icon: Briefcase },
  { path: "/education", label: "Education", icon: BookOpen },
  { path: "/skills", label: "Skills", icon: Code },
  { path: "/contact", label: "Contact", icon: Mail },
];

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  const navItemClasses = "font-[Golos, sans-serif] transition-all duration-300";
  const activeLink =
    "text-[#0965fe] font-semibold dark:text-[#4f94ff] border-b-2 border-[#0965fe]";
  const inactiveLink =
    "font-normal text-gray-700 dark:text-gray-300 hover:text-[#0965fe] dark:hover:text-[#4f94ff]";

  return (
    <>
      <SectionCard className="hidden sm:flex justify-between items-center shadow-md rounded-lg px-6 py-3">
        <ul className="flex flex-row gap-10 items-center">
          {navItems.map((item) => (
            <li key={item.path} className={navItemClasses}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive ? activeLink : inactiveLink
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </SectionCard>

      <div className="fixed bottom-0 left-0 w-full sm:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-inner z-50">
        <ul className="flex justify-around py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.path} className="flex-1">
                <NavLink to={item.path}>
                  {({ isActive }) => (
                    <div
                      className={`flex items-center justify-center gap-1 py-2 px-3 mx-1 rounded-lg transition-all duration-200 ${
                        isActive
                          ? "bg-purple-200 dark:bg-purple-600 text-purple-700 dark:text-white shadow-lg transform scale-105"
                          : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-purple-600 dark:hover:text-purple-300"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span
                        className={`text-xs font-medium transition-all duration-300 overflow-hidden ${
                          isActive ? "max-w-xs opacity-100 ml-1" : "max-w-0 opacity-0"
                        }`}
                      >
                        {item.label}
                      </span>
                    </div>
                  )}
                </NavLink>
              </li>
            );
          })}

          <li className="flex-1">
            <button
              onClick={toggleDarkMode}
              className="flex items-center justify-center gap-1 py-2 px-3 mx-1 rounded-lg transition hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {darkMode ? (
                <Sun className="h-5 w-5 text-yellow-500" />
              ) : (
                <Moon className="h-5 w-5 text-gray-700 dark:text-gray-200" />
              )}
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
