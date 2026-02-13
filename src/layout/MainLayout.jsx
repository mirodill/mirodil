import { useLocation } from "react-router-dom";
import Container from "@/layout/Container"; // components ichiga ko'chirdik
import Header from "@/layout/Header"; // Layoutga tegishli qismlar
import Navbar from "@/layout/Navbar";
import Footer from "@/layout/Footer";
import Profile from "@/features/profile/Profile";
import AppRoutes from "@/routes/AppRoutes";

const MainLayout = () => {
  const { pathname } = useLocation();

  // Blog va uning ichki sahifalarida ekanligimizni tekshiramiz
  const isBlogPage = pathname.startsWith('/blog');
  const isAuthPage = pathname === '/login' || pathname === '/register';

  return (
    <Container className="flex flex-col min-h-screen relative z-10">
      {/* Header har doim bo'ladi */}
      <Header />
      
      {/* Blog va Auth sahifalarida Profile ko'rinmaydi */}
      {!isBlogPage && !isAuthPage && <Profile />}
      
      <Navbar />

      <main className="flex-1 w-full py-6">
        <AppRoutes />
      </main>

      <Footer />
    </Container>
  );
};

export default MainLayout;