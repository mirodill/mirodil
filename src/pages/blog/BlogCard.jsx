import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";

export default function BlogCard({ post, onClick }) {
  // Rasm manzilini aniqlash
  const getImageSource = (img) => {
    if (!img) return "/placeholder-image.jpg"; // Placeholder qo'shish tavsiya etiladi
    if (img.startsWith("http") || img.startsWith("data:")) return img;
    return `data:image/jpeg;base64,${img}`;
  };

  const categoryName = post.categories?.[0]?.name || post.categories?.[0] || "Umumiy";

  return (
    <Card
      onClick={onClick}
      className="overflow-hidden group cursor-pointer border-none bg-transparent hover:shadow-none transition-all duration-300"
    >
      <div className="relative aspect-video overflow-hidden rounded-2xl mb-4">
        <img
          src={getImageSource(post.cover_image)}
          alt={post.title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <Badge className="bg-white/90 backdrop-blur-md text-slate-900 hover:bg-white border-none shadow-sm">
            {categoryName}
          </Badge>
        </div>
      </div>

      <div className="px-1 space-y-2">
        <div className="flex items-center text-[12px] font-medium text-slate-400">
          <Calendar className="size-3.5 mr-1.5 text-blue-500" />
         {new Date(post.created_at).toLocaleDateString("uz-UZ")}
        </div>
        <CardTitle className="text-xl line-clamp-2 group-hover:text-blue-600 transition-colors leading-snug font-bold">
          {post.title}
        </CardTitle>
      </div>
    </Card>
  );
}