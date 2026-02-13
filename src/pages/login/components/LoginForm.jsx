import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

export const LoginForm = ({ formData, setFormData, onSubmit, loading }) => {
  const handleSubmit = (e) => {
    e.preventDefault(); 
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input 
          id="username"
          required
          placeholder="admin_uz" 
          value={formData.username}
          onChange={(e) => setFormData({...formData, username: e.target.value})} 
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Parol</Label>
        <Input 
          id="password"
          type="password" 
          required
          placeholder="••••••••" 
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})} 
        />
      </div>
      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Tekshirilmoqda...
          </>
        ) : "Kirish"}
      </Button>
    </form>
  );
};