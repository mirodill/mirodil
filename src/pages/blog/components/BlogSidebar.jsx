import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Eye,
  TrendingUp,
  Send,
  Calendar
} from 'lucide-react';

const BlogSidebar = ({ relatedPosts = [] }) => {

  // Raqamlarni chiroyli formatlash (masalan: 1200 -> 1.2k)
  const formatNumber = (num) => {
    if (!num) return 0;
    return num >= 1000 ? (num / 1000).toFixed(1) + 'k' : num;
  };

  // Rasm manbasini aniqlash funksiyasi
  const getImageSrc = (image) => {
    if (!image) return "/placeholder-image.jpg"; // Placeholder rasm yo'li
    if (image.startsWith("data:") || image.startsWith("http")) return image;
    return `data:image/jpeg;base64,${image}`;
  };

  return (
    <aside className="lg:col-span-4 space-y-8">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 sticky top-10">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100">Mashhur Maqolalar</h2>
        </div>

        <div className="space-y-5">
          {relatedPosts.length > 0 ? (
            relatedPosts.slice(0, 5).map((rPost) => (
              <Link
                key={rPost.id}
                to={`/blog/${rPost.slug || rPost.id}`}
                className="block group"
              >
                <div className="flex gap-4 group cursor-pointer p-2 -m-2 rounded-xl transition-all duration-300 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  {/* Rasm qismi */}
                  <div className="relative shrink-0 overflow-hidden rounded-lg">
                    <img
                      src={getImageSrc(rPost.cover_image || rPost.image)}
                      alt={rPost.title}
                      className="w-20 h-20 object-cover ring-1 ring-slate-200 dark:ring-slate-700 
                 transition-all duration-500 ease-out
                 group-hover:scale-110 group-hover:ring-blue-500"
                    />
                    {/* Rasm ustidagi yengil overlay */}
                    <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/5 transition-colors duration-300" />
                  </div>

                  {/* Ma'lumot qismi */}
                  <div className="flex flex-col justify-between">
                    <h3 className="font-semibold text-gray-900 dark:text-slate-200 text-lg
                   leading-snug line-clamp-2 
                   transition-colors duration-300
                   group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      {rPost.title}
                    </h3>

                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center gap-1 text-[13px] text-gray-500 dark:text-slate-400 
                      transition-colors duration-300 group-hover:text-slate-600 dark:group-hover:text-slate-300">
                        <Calendar className="w-3 h-3 text-slate-400 group-hover:text-blue-500 transition-colors" />
                        <span>
                          {new Date(rPost.created_at).toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        <span className="mx-0.5 opacity-50">/</span>
                        <span>
                          {new Date(rPost.created_at).toLocaleDateString('uz-UZ')}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 text-[13px] text-gray-500 dark:text-slate-400">
                        <Eye className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
                        {formatNumber(rPost.views_count)}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-sm text-slate-500 italic">Maqolalar topilmadi...</p>
          )}
        </div>

        <Separator className="my-8 bg-slate-100 dark:bg-slate-800" />

        {/* Telegram Obuna bo'limi (Newsletter) */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl p-5 text-white relative overflow-hidden shadow-lg shadow-blue-500/20">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <Send className="w-4 h-4 text-blue-200" />
              <span className="text-xs font-medium uppercase tracking-wider text-blue-100">Hamjamiyat</span>
            </div>
            <h4 className="font-bold text-base mb-2 text-white">Yangiliklardan qolib ketmang</h4>
            <p className="text-[11px] text-blue-100/80 mb-4 leading-relaxed">
              Eng so'nggi texnologik maqolalar va yangiliklarni Telegram kanalimizda kuzatib boring.
            </p>
            <Button
              asChild
              variant="secondary"
              className="w-full bg-white text-blue-600 hover:bg-blue-50 border-none h-9 text-xs font-bold"
            >
              <a href="https://t.me/mirodill" target="_blank" rel="noreferrer">
                Kanalga qo'shilish
              </a>
            </Button>
          </div>

          {/* Orqa fon uchun dekorativ aylana */}
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
        </div>
      </div>
    </aside>
  );
};

export default BlogSidebar;