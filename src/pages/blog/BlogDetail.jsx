import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPostBySlug, getPosts, reactToPost, toggleSavePost } from "@/api/post.api"; // API larni qo'shdik
import { toast } from "sonner";
import Loader2 from "@/components/common/Loader2";

import BlogContent from "./components/BlogContent";
import BlogSidebar from "./components/BlogSidebar";

export default function BlogDetail() {
  const { slug } = useParams();
  
  // State-lar
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getPostBySlug(slug);
        setPost(res.data.data);

        const relatedRes = await getPosts({ limit: 5 });
        setRelatedPosts(relatedRes.data.data.filter(p => p.slug !== slug).slice(0, 4));
      } catch (err) {
        toast.error("Ma'lumotni yuklashda xatolik");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    window.scrollTo(0, 0);
  }, [slug]);


  if (loading) return <div className="flex justify-center items-center min-h-[60vh]"><Loader2 /></div>;
  if (!post) return <div className="text-center mt-20 text-gray-500 italic">Post topilmadi 😕</div>;

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">        
        <BlogContent post={post} />
        
        <BlogSidebar relatedPosts={relatedPosts} />
      </div>
    </div>
  );
}