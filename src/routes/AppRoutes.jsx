import { Routes, Route } from "react-router-dom";
import About from "@/pages/about/About";
import Projects from "@/pages/projects/Projects";
import Education from "@/pages/education/Education";
import Blog from "@/pages/blog/Blog";
import BlogDetail from "@/pages/blog/BlogDetail";
import Skills from "@/pages/skills/Skills";
import Contact from "@/pages/contact/Contact";
import Login from "@/pages/login/Login";
import Register from "@/pages/register/Register";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<About />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/education" element={<Education />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/category/:categoryName" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogDetail />} />
      <Route path="/skills" element={<Skills />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default AppRoutes;