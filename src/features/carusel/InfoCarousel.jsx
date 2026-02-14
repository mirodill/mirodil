import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CalendarDays } from "lucide-react";

const InfoCarousel = ({ posts, baseUrl = "/blog" }) => {
  const navigate = useNavigate();

  // "Axborot" kategoriyasidagi postlarni filtrlaymiz
  const infoPosts = useMemo(() => {
    if (!posts || !Array.isArray(posts)) return [];
    return posts.filter((post) =>
      post.categories?.some((cat) => {
        const name = typeof cat === "object" ? (cat.name || cat.slug || "") : (cat || "");
        return name.toString().toLowerCase().trim() === "axbarot";
      })
    ).slice(0, 5); // Oxirgi 5 ta axborot
  }, [posts]);

  if (infoPosts.length === 0) return null;

  return (
    <div className="mb-10 w-full animate-in fade-in duration-700">
      <Carousel opts={{ align: "start", loop: true }} className="w-full relative group">
        <CarouselContent>
          {infoPosts.map((post) => (
            <CarouselItem key={post.id} className="basis-full">
              <div 
                className="flex flex-col md:flex-row gap-6 overflow-hidden cursor-pointer"
                onClick={() => navigate(`${baseUrl}/${post.slug}`)}
              >
                {/* 1. RASM QISMI (Chapda) */}
                <div className="w-full md:w-[45%] aspect-[16/9] md:aspect-auto md:h-[300px] overflow-hidden rounded-xl">
                  <img
                    src={post.cover_image}
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
                    alt={post.title}
                  />
                </div>

                {/* 2. MATN QISMI (O'ngda) */}
                <div className="w-full md:w-[55%] flex flex-col justify-between py-2">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 line-clamp-3 hover:text-blue-600 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 text-base md:text-lg line-clamp-4 leading-relaxed">
                      {post.short_description || "Pensiye jamg'armasi fuqarolarni ma'lumotlar olishga harakat qiladigan firibgarlardan ogohlantirdi..."}
                    </p>
                  </div>

                  {/* SANA VA NAVIGATSIYA */}
                  <div className="flex items-center justify-between mt-6">
                    <div className="flex items-center text-gray-400 gap-2">
                      <CalendarDays className="h-5 w-5" />
                      <span className="text-sm md:text-base">
                        {new Date(post.created_at).toLocaleTimeString('uz-UZ', {hour: '2-digit', minute:'2-digit'})} / {new Date(post.created_at).toLocaleDateString('uz-UZ')}
                      </span>
                    </div>
                    
                    {/* Karusel nuqtalari yoki kichik tugmalar uchun joy */}
                    <div className="flex gap-2">
                       {/* Bu yerda Shadcn'ning CarouselNext/Previous tugmalarini ishlatamiz */}
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* BOSHQARUV TUGMALARI (Rasmga moslab o'ng pastki burchakka joylashgan) */}
        <div className="absolute bottom-0 right-0 flex gap-2">
          <CarouselPrevious className="static translate-y-0 h-10 w-10 bg-gray-100 hover:bg-gray-200 border-none" />
          <CarouselNext className="static translate-y-0 h-10 w-10 bg-gray-100 hover:bg-gray-200 border-none" />
        </div>
      </Carousel>
      
      {/* Pastki ajratuvchi chiziq (ixtiyoriy) */}
      <div className="w-full h-[1px] bg-gray-100 dark:bg-gray-800 mt-10" />
    </div>
  );
};

export default InfoCarousel;