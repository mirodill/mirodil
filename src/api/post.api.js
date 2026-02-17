import API from "./axios";

// 🔹 Barcha postlarni olish (Filtrlar bilan: categoryId, tagId)
export const getPosts = (params) => API.get("/posts", { params });

// 🔹 Bitta postni ID orqali olish (Tahrirlash sahifasi uchun)
export const getPostById = (id) => API.get(`/posts/${id}`);

// 🔹 Bitta postni SLUG orqali olish (Blog Detail sahifasi uchun)
// Eslatma: Backendda /api/v1/posts/slug/test-post ko'rinishida bo'lishi kerak
export const getPostBySlug = (slug) => API.get(`/posts/slug/${slug}`);
export const getCategories = () => API.get("/categories");
// 🔹 Post yaratish
// Data tarkibi: { title, content, slug, status, category, tags, cover_image }
export const createPost = (data) => API.post("/posts", data);

// 🔹 Post yangilash
export const updatePost = (id, data) => API.put(`/posts/${id}`, data);

// 🔹 Post o‘chirish (Soft delete)
export const deletePost = (id) => API.delete(`/posts/${id}`);

// 🔹 Post ko'rilganini hisobga olish (Unique View)
// Buni BlogDetail sahifasida useEffect ichida chaqirasiz
export const trackPostView = (id) => API.post(`/posts/${id}/view`);

export const reactToPost = (postId, type) => {
  // userId ni body'da yuborish shart emas, backend tokendan olishi kerak (xavfsizlik uchun)
  return API.post(`/interactions/react/${postId}`, { type });
};

export const toggleSavePost = (postId) => {
  return API.post(`/interactions/save/${postId}`);
}