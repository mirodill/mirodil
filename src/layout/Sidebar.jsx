import { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, FileText, FolderOpen, LogOut, 
  Settings, Camera, Loader2, Globe, UserRoundCog 
} from "lucide-react";
import { toast } from "sonner";
import { getProfile, updateProfile } from "@/api/auth.api";
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, 
  DialogFooter, DialogTrigger 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [admin, setAdmin] = useState({
    username: "",
    full_name: "",
    avatar: "",
    bio: ""
  });
  
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");

  // 1. Admin ma'lumotlarini yuklash
  useEffect(() => {
    const fetchAdmin = async () => {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/login");

      try {
        setLoading(true);
        const res = await getProfile();
        
        // DIQQAT: Postman-da kelgan format 'res.data.user' ekan
        if (res.data.success && res.data.user) {
          const userData = res.data.user;
          setAdmin({
            username: userData.username || "",
            full_name: userData.full_name || "",
            avatar: userData.avatar || "",
            bio: userData.bio || ""
          });
          setPreviewUrl(userData.avatar || "");
        }
      } catch (err) {
        console.error("Profil yuklashda xato:", err);
        // Faqat token haqiqatda yaroqsiz bo'lsa login-ga yuboramiz
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchAdmin();
  }, [navigate]);

  // 2. Rasm tanlanganda uni Base64 ga o'tkazish
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1.5 * 1024 * 1024) {
        return toast.error("Rasm hajmi juda katta (Max: 1.5MB)");
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setPreviewUrl(base64String);
        setAdmin((prev) => ({ ...prev, avatar: base64String }));
      };
      reader.readAsDataURL(file);
    }
  };

  // 3. Profilni yangilash
  const handleUpdate = async () => {
    try {
      setBtnLoading(true);
      const res = await updateProfile(admin);
      
      if (res.data.success) {
        toast.success("Profil muvaffaqiyatli yangilandi!");
        setIsEditOpen(false);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Xatolik yuz berdi");
    } finally {
      setBtnLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Tizimdan chiqdingiz");
    navigate("/login");
  };

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-gray-950 text-gray-100 flex flex-col border-r border-gray-800 shadow-2xl">
      <div className="px-6 py-8 border-b border-gray-800/50 text-2xl font-bold italic tracking-wider">
        ADMIN
      </div>

      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-1.5">
          <p className="text-[10px] uppercase font-bold text-gray-600 px-4 mb-2 tracking-widest">Menyu</p>
          <li>
            <Link to="/dashboard/hero" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive("/dashboard/hero") ? "bg-blue-600/10 text-blue-400" : "hover:bg-gray-900 text-gray-400"}`}>
              <LayoutDashboard className="w-5 h-5" /> <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/posts" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive("/dashboard/posts") ? "bg-blue-600/10 text-blue-400" : "hover:bg-gray-900 text-gray-400"}`}>
              <FileText className="w-5 h-5" /> <span>Maqolalar</span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/category" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive("/dashboard/category") ? "bg-blue-600/10 text-blue-400" : "hover:bg-gray-900 text-gray-400"}`}>
              <FolderOpen className="w-5 h-5" /> <span className="font-medium">Kategoriyalar</span>
            </Link>
          </li>
           <li>
            <Link to="/dashboard/users" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive("/dashboard/users") ? "bg-blue-600/10 text-blue-400" : "hover:bg-gray-900 text-gray-400"}`}>
            <UserRoundCog className="w-5 h-5" /> <span className="font-medium">Users</span>
            </Link>
          </li>
          <li>
            <Link to="/blog" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-900 hover:text-white transition">
              <Globe className="w-5 h-5" /> <span className="font-medium">Saytga o'tish</span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* ADMIN INFO BOX */}
      <div className="px-4 py-4 border-t border-gray-800 bg-gray-900/30 mx-2 mb-2 rounded-xl">
        {loading ? (
          <div className="flex items-center gap-3 animate-pulse">
            <div className="w-10 h-10 bg-gray-800 rounded-full" />
            <div className="flex-1 space-y-2"><div className="h-2 bg-gray-800 rounded w-20" /></div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div className="relative group">
              <img 
                src={previewUrl || "https://github.com/shadcn.png"} 
                className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-500/20"
                alt="Admin"
              />
              <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogTrigger asChild>
                  <button className="absolute -bottom-1 -right-1 bg-blue-600 rounded-full p-1 hover:scale-110 transition shadow-lg border border-gray-950">
                    <Settings className="w-3 h-3 text-white" />
                  </button>
                </DialogTrigger>
                <DialogContent className="bg-gray-950 border-gray-800 text-white shadow-2xl sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-bold">Profilni tahrirlash</DialogTitle>
                  </DialogHeader>
                  
                  <div className="space-y-6 py-4">
                    <div className="flex flex-col items-center gap-4">
                      <div className="relative group cursor-pointer" onClick={() => fileInputRef.current.click()}>
                        <img 
                          src={previewUrl || "https://github.com/shadcn.png"} 
                          className="w-24 h-24 rounded-full object-cover border-4 border-gray-800 group-hover:opacity-70 transition"
                        />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                          <Camera className="w-8 h-8 text-white" />
                        </div>
                      </div>
                      <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                      <p className="text-[11px] text-gray-500">Rasm o'zgartirish uchun ustiga bosing</p>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>To'liq ism-sharif</Label>
                        <Input value={admin.full_name} onChange={(e) => setAdmin({...admin, full_name: e.target.value})} className="bg-gray-900 border-gray-700" />
                      </div>
                      <div className="space-y-2">
                        <Label>Username</Label>
                        <Input value={admin.username} onChange={(e) => setAdmin({...admin, username: e.target.value})} className="bg-gray-900 border-gray-700" />
                      </div>
                      <div className="space-y-2">
                        <Label>Bio (Ma'lumot)</Label>
                        <Input value={admin.bio} onChange={(e) => setAdmin({...admin, bio: e.target.value})} className="bg-gray-900 border-gray-700" />
                      </div>
                    </div>
                  </div>

                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsEditOpen(false)} className="border-gray-700 text-gray-300">Bekor qilish</Button>
                    <Button onClick={handleUpdate} disabled={btnLoading} className="bg-blue-600 hover:bg-blue-700 px-8">
                      {btnLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Saqlash"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-sm font-semibold truncate text-gray-200">
                {admin.full_name || "Admin"}
              </h2>
              <p className="text-[10px] text-gray-500 truncate uppercase tracking-widest">Super Admin</p>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-gray-950">
        <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all font-semibold group border border-transparent hover:border-red-500/20">
          <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Chiqish</span>
        </button>
      </div>
    </aside>
  );
}