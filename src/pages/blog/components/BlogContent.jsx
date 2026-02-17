import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom"; // Navigatsiya uchun
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Eye, Clock, Calendar, ArrowLeft } from "lucide-react"; // ArrowLeft qo'shildi
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import ShareSidebar from './ShareSidebar';

const BlogContent = ({ post }) => {
  const navigate = useNavigate();

  // --- BRAUZER SARLAVHASINI O'ZGARTIRISH ---
  useEffect(() => {
    if (post?.title) {
      document.title = `${post.title} | Blog`;
    }
    return () => {
      document.title = "Mirodil's Blog";
    };
  }, [post?.title]);

  if (!post) return null;

  const userId = localStorage.getItem("userId") || "guest_123";

  // Kategoriyalarni formatlash
  const categories = Array.isArray(post.categories)
    ? post.categories.map(c => typeof c === 'object' ? c.name : c).join(", ")
    : post.categories || "Boshqa";

  // Image src handle
  const imageSrc = post.cover_image?.startsWith("data:") || post.cover_image?.startsWith("http")
    ? post.cover_image
    : `data:image/jpeg;base64,${post.cover_image}`;

  const tags = Array.isArray(post.tags) ? post.tags : [];

  return (
    <main className="lg:col-span-8 flex flex-col gap-5">

      {/* --- ORQAGA QAYTISH TUGMASI --- */}
      <div className="flex items-center mb-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          className="group flex items-center gap-3 px-0 hover:bg-transparent text-slate-400 hover:text-blue-500 transition-all"
        >
          <ArrowLeft className="size-5 group-hover:-translate-x-1 transition-transform" />

          <span className="text-sm font-medium tracking-wide">Orqaga qaytish</span>
        </Button>

      </div>

      <div className="mb-10 w-full bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        {/* Rasm va Kategoriya */}
        <div className="relative group">
          <img
            src={imageSrc}
            alt={post.title}
            className="w-full h-auto object-cover max-h-[500px] transition-transform duration-700 group-hover:scale-105"
          />
          <Badge className="absolute top-5 left-5 bg-blue-600 hover:bg-blue-700 text-white border-none shadow-lg px-3 py-2">
            {categories}
          </Badge>
        </div>

        <article className="prose prose-slate lg:prose-lg max-w-none prose-invert px-6 py-8">
          {/* Sarlavha va Metama'lumotlar */}
          <div className="flex flex-col gap-4 mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-100 mb-2 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap gap-6 items-center text-sm text-gray-400">
              <span className='flex items-center gap-2 text-slate-300'>
                <Calendar className="size-4 text-blue-500" />
                {new Date(post.created_at).toLocaleDateString('uz-UZ')} {new Date(post.created_at).toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' })}
              </span>
              <span className="flex items-center gap-2 text-slate-300">
                <Clock className="size-4 text-amber-500" />
                {post.reading_time || 5} daqiqa
              </span>
              <span className="flex items-center gap-2 text-slate-300">
                <Eye className="size-4 text-emerald-500" />
                {post.views_count || 0} marta ko'rildi
              </span>
            </div>
          </div>

          <Separator className="bg-slate-800 mb-8" />

          {/* Interaktiv sidebar (Like, Dislike, Share) */}
          <ShareSidebar post={post} userId={userId} />

          {/* Maqola Matni (Markdown) */}
          <div className="mt-8 text-slate-300 leading-relaxed overflow-x-hidden">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code({ inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={atomDark}
                      language={match[1]}
                      PreTag="div"
                      className="rounded-xl my-6 border border-slate-700 shadow-2xl custom-scrollbar"
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className="bg-slate-800 text-pink-400 px-1.5 py-0.5 rounded font-mono text-sm" {...props}>
                      {children}
                    </code>
                  )
                }
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          <Separator className="bg-slate-800 mt-12" />

          {/* Teglar */}
          {tags.length > 0 && (
            <div className="mt-6">
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => {
                  const tagName = typeof tag === 'object' ? tag?.name : tag;
                  if (!tagName) return null;
                  return (
                    <button
                      key={index}
                      className="px-4 py-1.5 bg-slate-800 border border-slate-700 text-slate-300 rounded-full text-xs font-medium hover:bg-blue-600 hover:text-white hover:border-blue-500 transition-all duration-300"
                    >
                      #{tagName}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </article>
      </div>
    </main>
  );
};

export default BlogContent;