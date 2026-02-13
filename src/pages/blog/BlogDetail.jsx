import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPostBySlug, getPosts } from "@/api/post.api";
import { toast } from "sonner";
import Loader2  from "@/components/common/Loader2";

// Komponentlarni import qilamiz
import ShareSidebar from "./components/ShareSidebar";
import BlogContent from "./components/BlogContent";
import BlogSidebar from "./components/BlogSidebar";

export default function BlogDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

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

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    toast.success("Havola nusxalandi!");
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) return <div className="flex justify-center items-center min-h-[60vh]"><Loader2 /></div>;
  if (!post) return <div className="text-center mt-20 text-gray-500 italic">Post topilmadi 😕</div>;

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <ShareSidebar 
          url={window.location.href} 
          title={post.title} 
          onCopy={handleCopyLink} 
          copied={copied} 
          onBack={() => navigate(-1)} 
        />
        
        <BlogContent post={post} />
        
        <BlogSidebar relatedPosts={relatedPosts} />
      </div>
    </div>
  );
}