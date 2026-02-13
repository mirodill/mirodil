import { useState, useEffect } from "react";
import { getPosts, deletePost } from "@/api/post.api";

export const useLastPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const res = await getPosts();
      setPosts(res.data?.data || res.data || []);
    } catch (err) {
      console.error("Postlarni olishda xato:", err);
    } finally {
      setLoading(false);
    }
  };

  const removePost = async (id) => {
    if (!confirm("Postni o‘chirilsinmi?")) return;
    try {
      await deletePost(id);
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Postni o‘chirishda xato:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return { posts, loading, removePost };
};