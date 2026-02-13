import { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

// Components
import Loader from "./components/common/Loader";
import ScrollToTop from "./components/common/ScrollToTop";
import { Toaster } from "@/components/ui/sonner";

// Layouts & Pages
import MainLayout from "@/layout/MainLayout";
import DashboardLayout from "./pages/dashboard/Dashboard";
import Category from './pages/category/Category';
import Hero from './pages/hero/Hero';
import Posts from './pages/posts/Posts';
import UsersPage from './pages/usersPage/UsersPage';
import AddPost from './pages/posts/AddPost';

// Auth
import ProtectedRoute from "./routes/ProtectedRoute";
import { AuthProvider } from "@/providers/AuthContext";

const App = () => {
const [loading, setLoading] = useState(true);

  useEffect(() => {
    const visited = sessionStorage.getItem("visited");
    if (visited) {
      setLoading(false);
    } else {
      sessionStorage.setItem("visited", "true");
      const timer = setTimeout(() => setLoading(false), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  if (loading) return <Loader />;

  return (
    <AuthProvider>
      <Routes>
        {/* 1. PROTECTED ROUTES (Buni birinchi o'ringa qo'yamiz) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Hero />} />
          <Route path="hero" element={<Hero />} />
          <Route path="posts" element={<Posts />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="addpost" element={<AddPost />} />
          <Route path="addposts/:id" element={<AddPost />} />
          <Route path="category" element={<Category />} />
        </Route>

        {/* 2. PUBLIC ROUTES (Dashboarddan keyin kelishi shart) */}
        {/* path="/*" o'rniga aniqroq mantiq ishlating yoki eng oxiriga qo'ying */}
        <Route path="/*" element={<MainLayout />} />

        {/* 3. 404 NOT FOUND */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <ScrollToTop />
      <Toaster richColors position="top-right" />
    </AuthProvider>
  );
};

export default App;