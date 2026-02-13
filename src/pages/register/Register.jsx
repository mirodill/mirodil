import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/providers/AuthContext";
import API from "../../api/axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner"; // Yoki alert ishlatsangiz bo'ladi

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

 const handleRegister = async (e) => {
  e.preventDefault();
  setLoading(true);

  console.log("Yuborilayotgan ma'lumot:", formData); // 1. Buni tekshiring

  try {
    const res = await API.post("/auth/register", formData);
    // ... muvaffaqiyatli kod
  } catch (error) {
    // 2. Serverdan kelgan aniq xabarni ko'rish:
    console.error("Server xatosi tafsiloti:", error.response?.data);
    
    const msg = error.response?.data?.message || "Serverda ichki xatolik (500)";
    toast.error(msg);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <Card className="w-96 p-6 shadow-lg">
        <CardContent className="space-y-4 pt-4">
          <h2 className="text-2xl font-bold text-center">Ro'yxatdan o'tish</h2>
          
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-1">
              <Input
                placeholder="Username"
                required
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
            </div>

            <div className="space-y-1">
              <Input
                type="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="space-y-1">
              <Input
                type="password"
                placeholder="Parol"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Yuklanmoqda..." : "Ro'yxatdan o'tish"}
            </Button>
          </form>

          <p className="text-sm text-center">
            Akkountingiz bormi?{" "}
            <span
              className="text-blue-500 cursor-pointer hover:underline"
              onClick={() => navigate("/login")}
            >
              Kirish
            </span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}