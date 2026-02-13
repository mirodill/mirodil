import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import SectionCard from "@/components/common/SectionCard";
import { 
  User, LayoutDashboard, Loader2, LogIn, 
  Settings, LogOut, ChevronDown 
} from "lucide-react";
import { getProfile } from "@/api/auth.api";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const res = await getProfile();
        const userData = res.data?.user || res.data?.data || res.data;
        setUser(userData);
      } catch (err) {
        console.error("Profil yuklanmadi:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const isAdmin = user?.role === "admin";

  return (
    <header className="w-full">
      <SectionCard className="border-none shadow-sm bg-white dark:bg-gray-950">
        <div className="flex items-center justify-between w-full px-4 sm:px-6">
          
          {/* CHAP TOMON: Logo */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2 group transition-all">
              <div className="bg-blue-600 p-2 rounded-lg text-white group-hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition">
                <LayoutDashboard size={20} />
              </div>
              <h1 className="font-bold text-xl tracking-tight hidden md:block">
                Mirodil <span className="text-blue-600">Codes</span>
              </h1>
            </Link>
          </div>

          {/* O'NG TOMON */}
          <div className="flex items-center gap-3">
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
            ) : user ? (
              <div className="flex items-center gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-900 p-1 pr-3 rounded-full transition-all border border-transparent hover:border-gray-200 dark:hover:border-gray-800">
                      <Avatar className="h-9 w-9 border-2 border-blue-500/20">
                        <AvatarImage src={user.avatar} className="object-cover" />
                        <AvatarFallback className="bg-blue-50 text-blue-600">
                          <User size={18} />
                        </AvatarFallback>
                      </Avatar>
                      <ChevronDown size={14} className="text-gray-500" />
                    </div>
                  </PopoverTrigger>
                  
                  <PopoverContent className="w-72 mt-2 p-0 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 shadow-xl rounded-2xl overflow-hidden" align="end">
                    {/* User Card Header */}
                    <div className="p-4 bg-blue-600 dark:bg-blue-700 text-white">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12 border-2 border-white/20">
                          <AvatarImage src={user.avatar} className="object-cover" />
                          <AvatarFallback><User /></AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-bold truncate w-40">{user.full_name}</span>
                          <span className="text-xs text-blue-100 italic">{user.username}</span>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="p-2 space-y-1">
                      
                      {/* FAQAT ADMINLAR UCHUN DASHBOARD */}
                      {isAdmin && (
                        <button 
                          onClick={() => navigate("/dashboard")}
                          className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition"
                        >
                          <LayoutDashboard size={18} className="text-orange-500" />
                          Admin Dashboard
                        </button>
                      )}

                      {/* SOZLAMALAR (TUNGI REJIM) */}
                      <div className="flex items-center justify-between px-3 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition">
                        <div className="flex items-center gap-3">
                          <Settings size={18} className="text-gray-500" />
                          Tungi rejim
                        </div>
                        <ThemeToggle />
                      </div>

                      <div className="h-[1px] bg-gray-100 dark:bg-gray-800 my-1" />

                      {/* CHIQISH */}
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition"
                      >
                        <LogOut size={18} />
                        Chiqish
                      </button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <ThemeToggle />
                <Button 
                  onClick={() => navigate("/login")}
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6"
                >
                  <LogIn size={18} className="mr-2" />
                  Kirish
                </Button>
              </div>
            )}
          </div>
        </div>
      </SectionCard>
    </header>
  );
};

export default Header;