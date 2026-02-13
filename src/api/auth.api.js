import axios from "axios";

// Asosiy URL (v1 bilan)
const API_BASE_URL = "https://blog-api-uzfl.onrender.com/api/v1";

const api = axios.create({ 
    baseURL: API_BASE_URL 
});

// So'rov yuborishdan oldin tokenni qo'shish
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Admin va Profil funksiyalari
// Foydalanuvchini bloklash yoki blokdan chiqarish
export const toggleBlockUser = (id, status) => api.patch(`/admin/users/${id}/block`, { is_blocked: status });
export const getProfile = () => api.get("/auth/me");
export const updateProfile = (userData) => api.put("/auth/update", userData);
export const getAdminStats = () => api.get("/admin/stats");
export const getAllUsers = () => api.get("/admin/users");
export const deleteUser = (id) => api.delete(`/admin/users/${id}`);

export default api;