import { useEffect, useState } from "react";
import Loader from "./components/common/Loader";
import { Route, Routes } from "react-router-dom";
import Container from './components/layout/Container';
import Header from './components/layout/Header';
import Profile from "./components/profile/Profile";
import Navbar from "./components/layout/Navbar";
import Education from './pages/education/Education';
import About from './pages/about/About';
import Projects from './pages/projects/Projects';
import Skills from './pages/skills/Skills';
import Contact from './pages/contact/Contact';
import Footer from "./components/layout/Footer";
import { Toaster } from "@/components/ui/sonner";
import ScrollToTop from "./components/common/ScrollToTop";



const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Sayt to‘liq yuklanganda ishlaydi
    const handleLoad = () => {
      setLoading(false);
    };

    window.addEventListener("load", handleLoad);

    return () => window.removeEventListener("load", handleLoad);
  }, []);

  if (loading) return <Loader />;
  return (
    <Container className="flex flex-col min-h-screen">
      <Header />
      <Profile />
      <Navbar />

      <main className="flex-1 w-full">
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/education" element={<Education />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      <Footer />
    <ScrollToTop/>
      <Toaster richColors position="top-right" />
    </Container>
  );
};

export default App;
