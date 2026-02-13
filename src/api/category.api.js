import API from "./axios";

// Barcha kategoriyalarni olish
export const getCategories = () => API.get("/categories");

// Yangi kategoriya qo‘shish
export const createCategory = (data) => API.post("/categories", data);

// Kategoriyani tahrirlash
export const updateCategory = (id, data) => API.put(`/categories/${id}`, data);

// Kategoriyani o‘chirish
export const deleteCategory = (id) => API.delete(`/categories/${id}`);
