import { useState, useEffect, useCallback } from "react";
import { getPosts, deletePost } from "@/api/post.api";

export const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getPosts();
      setPosts(res.data?.posts || res.data?.data || []);
    } catch (error) {
      console.error("Postlarni olishda xato:", error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const removePost = async (id) => {
    if (!window.confirm("Rostdan ham o‘chirmoqchimisiz?")) return;
    try {
      await deletePost(id);
      fetchPosts();
    } catch (error) {
      console.error("O‘chirishda xato:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return { posts, loading, fetchPosts, removePost };
};