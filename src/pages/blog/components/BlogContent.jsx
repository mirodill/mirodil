import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Eye, Clock } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const BlogContent = ({ post }) => {
  const categories = Array.isArray(post.categories)
    ? post.categories.map(c => typeof c === 'object' ? c.name : c).join(", ")
    : post.categories || "Boshqa";

  const imageSrc = post.cover_image?.startsWith("data:") 
    ? post.cover_image 
    : `data:image/jpeg;base64,${post.cover_image}`;

  return (
    <main className="lg:col-span-8 flex gap-5">
      <Separator orientation="vertical" className="h-auto min-h-[400px]" />
      <div className="mb-10 w-full">
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-500">{categories}</span>
            <span className="text-gray-300">|</span>
            <span>{new Date(post.created_at).toLocaleDateString("uz-UZ")}</span>
          </div>
          <span className="flex items-center gap-1"><Eye className="size-4" /> {post.views_count}</span>
          <span className="flex items-center gap-1"><Clock className="size-4" /> {post.reading_time} daqiqa</span>
        </div>

        <h1 className="text-3xl font-bold text-slate-200 mb-8 leading-tight">{post.title}</h1>

        <div className="mb-10">
          <img src={imageSrc} alt={post.title} className="w-full h-auto object-cover max-h-[500px] rounded-xl" />
        </div>

        <article className="prose prose-slate lg:prose-lg max-w-none prose-invert">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter style={atomDark} language={match[1]} PreTag="div" className="rounded-xl my-6" {...props}>
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
        </article>
      </div>
    </main>
  );
};

export default BlogContent;