import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const BlogSidebar = ({ relatedPosts }) => (
  <aside className="lg:col-span-3">
    <div className="sticky top-10">
      <h3 className="text-xl font-bold text-slate-200 mb-6 flex items-center gap-2">
        <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
        So'nggi maqolalar
      </h3>

      <div className="space-y-6">
        {relatedPosts.map((rPost) => (
          <Link key={rPost.id} to={`/blog/${rPost.slug}`} className="group flex flex-col gap-3">
            <div>
              <h4 className="text-sm font-medium text-slate-200 line-clamp-2 group-hover:text-blue-600 transition-colors">
                {rPost.title}
              </h4>
              <p className="text-xs text-gray-400 mt-1">
                {new Date(rPost.created_at).toLocaleDateString("uz-UZ")}
              </p>
            </div>
            <Separator className="mt-2" />
          </Link>
        ))}
      </div>

      {/* Newsletter Card */}
      <div className="mt-10 p-6 bg-slate-900 rounded-2xl text-white border border-slate-800">
        <h4 className="font-bold mb-2">Yangiliklardan xabardor bo'ling</h4>
        <p className="text-xs text-slate-400 mb-4">Ko'proq yangiliklar uchun Telegram kanalimizga qo'shiling.</p>
        <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-xs text-white">
          <a href="https://t.me/mirodill" target="_blank" rel="noreferrer">Obuna bo'lish</a>
        </Button>
      </div>
    </div>
  </aside>
);

export default BlogSidebar;