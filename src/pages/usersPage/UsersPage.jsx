import React, { useEffect, useState } from 'react';
import { getAllUsers, deleteUser, toggleBlockUser } from '@/api/auth.api';
import { toast } from 'sonner';
import { Trash2, Shield, User, Ban, CheckCircle, Calendar, UserPlus, BellRing } from 'lucide-react';
import { format } from 'date-fns';
import { uz } from 'date-fns/locale';
import { io } from 'socket.io-client'; // Socketni import qilamiz

// 1. Backend manzilingizni kiriting
const socket = io('https://blog-api-uzfl.onrender.com');

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await getAllUsers();
      setUsers(res.data?.data || res.data || []);
    } catch (err) {
      toast.error("Ma'lumotlarni yuklab bo'lmadi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();

    // 2. SOCKET LISTENER: Yangi user qo'shilganda ishlaydi
    socket.on('new_user_registered', (newUser) => {
      // Ovozli bildirishnoma (Ixtiyoriy)
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
      audio.play().catch(() => console.log("Audio play blocked by browser"));

      // Ekrandagi xabarnoma (Sonner toast)
      toast.success("Yangi foydalanuvchi qo'shildi!", {
        description: `${newUser.full_name} hozirgina ro'yxatdan o'tdi.`,
        icon: <BellRing className="text-blue-500 animate-bounce" />,
        duration: 6000,
        position: 'top-right',
      });

      // Ro'yxatni refreshsiz yangilash (yangi userni tepaga qo'shamiz)
      setUsers((prevUsers) => [newUser, ...prevUsers]);
    });

    // Komponent yopilganda socketni o'chirish
    return () => {
      socket.off('new_user_registered');
    };
  }, []);

  const handleToggleBlock = async (id, currentStatus) => {
    try {
      const newStatus = !currentStatus;
      await toggleBlockUser(id, newStatus);
      setUsers(users.map(u => u.id === id ? { ...u, is_blocked: newStatus } : u));
      toast.success(newStatus ? "Foydalanuvchi bloklandi" : "Foydalanuvchi aktivlashtirildi");
    } catch (err) {
      toast.error("Bloklashda xatolik yuz berdi");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Rostdan ham ushbu foydalanuvchini o'chirmoqchimisiz?")) return;
    try {
      await deleteUser(id);
      setUsers(users.filter(u => u.id !== id));
      toast.success("Muvaffaqiyatli o'chirildi");
    } catch (err) {
      toast.error("O'chirishda xatolik");
    }
  };

  if (loading) return <div className="p-10 text-center animate-pulse text-blue-500 font-bold">Foydalanuvchilar yuklanmoqda...</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8 border-b pb-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-100 flex items-center gap-3">
            <User className="text-blue-600 w-8 h-8" /> Foydalanuvchilar
          </h1>
          <p className="text-gray-300 text-sm mt-1">Boshqaruv va real-vaqt monitoringi</p>
        </div>
        <div className="bg-blue-50 border border-blue-200 px-5 py-2 rounded-2xl">
          <span className="text-blue-700 font-bold text-lg">{users.length}</span>
          <span className="text-blue-600 text-sm ml-2 font-medium">ta a'zo</span>
        </div>
      </div>
      
      <div className="border rounded-2xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-widest font-bold">
              <tr>
                <th className="p-5">Foydalanuvchi</th>
                <th className="p-5">Huquqi</th>
                <th className="p-5">Ro'yxatdan o'tdi</th>
                <th className="p-5">Status</th>
                <th className="p-5 text-right">Boshqarish</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map(user => (
                <tr key={user.id} className={`transition-all duration-300 ${user.is_blocked ? 'bg-red-50/30' : 'hover:bg-blue-50/40'}`}>
                  <td className="p-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                        {user.full_name ? user.full_name[0].toUpperCase() : 'U'}
                      </div>
                      <div>
                        <div className="font-bold text-gray-200">{user.full_name}</div>
                        <div className="text-xs text-gray-400 font-mono tracking-tighter">+{user.phone_number}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-5 text-sm">
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase border ${
                      user.role === 'admin' ? 'bg-purple-50 text-purple-700 border-purple-200' : 'bg-blue-50 text-blue-700 border-blue-200'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="p-5 text-sm text-gray-500 italic">
                    <div className="flex items-center gap-2">
                      <Calendar size={15} className="text-gray-400" />
                      {user.created_at ? format(new Date(user.created_at), 'd-MMM, yyyy', { locale: uz }) : '...'}
                    </div>
                  </td>
                  <td className="p-5">
                    {user.is_blocked ? 
                      <span className="text-red-500 flex items-center gap-1.5 text-xs font-bold ring-1 ring-red-200 px-2 py-1 rounded-md bg-red-50"><Ban size={14}/> Bloklangan</span> : 
                      <span className="text-emerald-600 flex items-center gap-1.5 text-xs font-bold ring-1 ring-emerald-200 px-2 py-1 rounded-md bg-emerald-50"><CheckCircle size={14}/> Aktiv</span>
                    }
                  </td>
                  <td className="p-5 text-right">
                    <div className="flex justify-end gap-3">
                      <button 
                        onClick={() => handleToggleBlock(user.id, user.is_blocked)}
                        className={`p-2.5 rounded-xl transition-all shadow-sm ${user.is_blocked ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' : 'bg-amber-100 text-amber-700 hover:bg-amber-200'}`}
                      >
                        {user.is_blocked ? <CheckCircle size={20} /> : <Ban size={20} />}
                      </button>
                      <button 
                        onClick={() => handleDelete(user.id)} 
                        className="p-2.5 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-all shadow-sm"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;