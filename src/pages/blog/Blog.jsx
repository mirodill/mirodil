// src/pages/blog/Blog.jsx
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getPosts } from "@/api/post.api";
import BlogCard from "./BlogCard";
import Loader2  from '@/components/common/Loader2';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getPosts();
      // API strukturangizga qarab data olishni xavfsizroq qilamiz
      const data = res.data?.data || res.data?.posts || [];
      setPosts(data);
    } catch (err) {
      console.error("Postlarni olishda xato:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh] gap-4">
        <Loader2 className="size-10 text-blue-600" />
        <p className="text-muted-foreground animate-pulse text-sm font-medium">
          Maqolalar yuklanmoqda...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-5 py-10">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold mb-3">Blog & Maqolalar</h1>
        <p className="text-muted-foreground">Texnologiyalar va dasturlash olamidagi yangiliklar</p>
      </div>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogCard
              key={post._id || post.id} 
              post={post}
              onClick={() => navigate(`/blog/${post.slug}`)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
          <div className="bg-white p-4 rounded-full shadow-sm mb-4 text-3xl">😕</div>
          <p className="text-xl text-muted-foreground font-medium">
            Hozircha maqolalar mavjud emas
          </p>
        </div>
      )}
    </div>
  );
}