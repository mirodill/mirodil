import { useState, useEffect } from "react";
import { getPosts } from "@/api/post.api";
import { getCategories } from "@/api/category.api";

export const usePostStats = () => {
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalCategories: 0,
    totalViews: 0,
    newPostsToday: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsRes, catsRes] = await Promise.all([getPosts(), getCategories()]);
        
        const posts = postsRes.data?.data || postsRes.data || [];
        const categories = catsRes.data?.data || catsRes.data || [];

        const oneDayAgo = new Date();
        oneDayAgo.setHours(oneDayAgo.getHours() - 24);

        setStats({
          totalPosts: posts.length,
          totalCategories: Array.isArray(categories) ? categories.length : 0,
          totalViews: posts.reduce((acc, p) => acc + (Number(p.views_count) || 0), 0),
          newPostsToday: posts.filter(p => new Date(p.createdAt || p.created_at) > oneDayAgo).length
        });
      } catch (err) {
        console.error("Stats fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { stats, loading };
};