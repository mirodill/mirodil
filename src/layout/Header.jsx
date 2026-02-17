import React, { useState, useEffect } from "react";
import { useNavigate, Link, NavLink } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { 
  Home, Briefcase, BookOpen, Code, Mail, 
  LayoutDashboard, Loader2, LogOut, Flame
} from "lucide-react";
import { getProfile } from "@/api/auth.api";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) { setLoading(false); return; }
      try {
        const res = await getProfile();
        setUser(res.data?.user || res.data?.data || res.data);
      } catch (err) {
        console.error("Profil yuklanmadi:", err);
      } finally { setLoading(false); }
    };
    fetchProfile();
  }, []);

  const navItems = [
    { path: "/", label: "Haqimda", icon: Home },
    { path: "/projects", label: "Loyihalar", icon: Briefcase },
    { path: "/blog", label: "Blog", icon: BookOpen },
    { path: "/skills", label: "Skills", icon: Code },
    { path: "/contact", label: "Aloqa", icon: Mail },
  ];

  return (
    <>
      {/* Header foni orqadagi narsalarni to'sib turishi uchun 
        bg-background/95 va backdrop-blur ishlatildi.
      */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 
        ${isScrolled 
          ? "py-2 bg-background/80 backdrop-blur-md border-b shadow-sm" 
          : "py-4 bg-background"}`}>
        
        <div className="max-w-7xl mx-auto px-4 md:px-10">
          <div className="flex items-center justify-between py-2 transition-all duration-300">
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="size-9 flex items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
                <Flame size={20} fill="currentColor" />
              </div>
              <span className="text-xl font-bold tracking-tight text-foreground uppercase italic">
                Mirodil<span className="text-blue-600">.</span>
              </span>
            </Link>

            {/* Nav Links (Desktop) */}
            <nav className="hidden lg:block">
              <ul className="flex items-center gap-1">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) => `
                        px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg
                        ${isActive 
                          ? "text-blue-600 bg-blue-500/10 dark:text-blue-400" 
                          : "text-muted-foreground hover:text-foreground hover:bg-accent"
                        }
                      `}
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <ThemeToggle />

              {loading ? (
                <Loader2 className="size-5 animate-spin text-blue-500" />
              ) : user ? (
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="outline-none group">
                      <Avatar className="size-9 border transition-all group-hover:border-blue-500">
                        <AvatarImage src={user.avatar} className="object-cover" />
                        <AvatarFallback className="bg-accent text-foreground text-xs font-bold">M</AvatarFallback>
                      </Avatar>
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-56 mt-2 p-1 rounded-xl bg-popover border shadow-xl" align="end">
                      <div className="px-3 py-2 border-b border-border/50">
                        <p className="text-sm font-bold truncate text-foreground">{user.full_name}</p>
                        <p className="text-[11px] text-muted-foreground">{user.username || 'user'}</p>
                      </div>
                      <div className="p-1">
                        {user.role === "admin" && (
                          <Button variant="ghost" className="w-full justify-start gap-2 h-9 text-sm rounded-lg" onClick={() => navigate("/dashboard")}>
                            <LayoutDashboard size={15} /> Dashboard
                          </Button>
                        )}
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start gap-2 h-9 text-sm text-destructive hover:text-destructive hover:bg-destructive/10 rounded-lg" 
                          onClick={() => { localStorage.removeItem("token"); window.location.href="/"; }}
                        >
                          <LogOut size={15} /> Chiqish
                        </Button>
                      </div>
                  </PopoverContent>
                </Popover>
              ) : (
                <Button 
                  onClick={() => navigate("/login")}
                  className="bg-primary hover:opacity-90 text-primary-foreground rounded-lg px-6 h-9 text-sm font-bold transition-all shadow-sm"
                >
                  Kirish
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* DIQQAT: Header fixed bo'lgani uchun sahifa mazmuni uning tegida qolib ketmasligi uchun
        bo'sh joy (Spacer) qo'shib qo'yamiz.
      */}
      <div className="h-20 lg:h-24"></div>

      {/* MOBILE BOTTOM NAV */}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-sm z-50">
        <nav className="bg-background/95 backdrop-blur-lg rounded-2xl p-1.5 flex justify-around items-center shadow-2xl border border-border">
           {navItems.map((item) => {
             const Icon = item.icon;
             return (
               <NavLink key={item.path} to={item.path} className={({isActive}) => `
                 p-3 rounded-xl transition-all duration-200
                 ${isActive ? "bg-primary text-primary-foreground shadow-md" : "text-muted-foreground hover:bg-accent"}
               `}>
                 <Icon size={20} />
               </NavLink>
             )
           })}
        </nav>
      </div>
    </>
  );
};

export default Header;