import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  // admin-ni emas, tokenni tekshiramiz
  const token = localStorage.getItem("token");

  // Agar token bo'lmasa, demak foydalanuvchi login qilmagan
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Agar token bo'lsa, Dashboard-ga ruxsat beramiz.
  // Sidebar ichidagi useEffect o'zi admin ma'lumotlarini keyinroq yuklab oladi.
  return children;
}