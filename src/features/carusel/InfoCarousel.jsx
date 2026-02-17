import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Autoplay from "embla-carousel-autoplay"; 
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

  // 1. Autoplay instansiyasini useMemo ichida yaratamiz (har renderda yangilanmasligi uchun)
  const autoplayPlugin = useMemo(
    () => Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true }),
    []
  );

  const infoPosts = useMemo(() => {
    if (!posts || !Array.isArray(posts)) return [];
    return posts
      .filter((post) =>
        post.categories?.some((cat) => {
          const name = typeof cat === "object" ? (cat.name || cat.slug || "") : (cat || "");
          // "axbarot" so'zidagi xatoni (axborot) ham hisobga olishingiz mumkin
          return name.toString().toLowerCase().trim() === "axbarot";
        })
      )
      .slice(0, 5);
  }, [posts]);

  if (infoPosts.length === 0) return null;

  const getImageSrc = (img) => {
    if (!img) return "/placeholder-image.jpg";
    if (img.startsWith("data:") || img.startsWith("http")) return img;
    return `data:image/jpeg;base64,${img}`;
  };

  return (
    <div className="mb-10 w-full animate-in fade-in duration-700">
      <Carousel
        opts={{ 
          align: "start", 
          loop: true 
        }}
        // 2. Plaginni massiv ko'rinishida beramiz
        plugins={[autoplayPlugin]}
        className="w-full relative group"
      >
        <CarouselContent>
          {infoPosts.map((post) => (
            <CarouselItem key={post.id} className="basis-full">
              <div
                className="flex flex-col md:flex-row gap-6 overflow-hidden cursor-pointer"
                onClick={() => navigate(`${baseUrl}/${post.slug || post.id}`)}
              >
                {/* RASM */}
                <div className="w-full relative md:w-[45%] aspect-[16/9] md:aspect-auto md:h-[350px] overflow-hidden rounded-3xl shadow-sm">
                  <img
                    src={getImageSrc(post.cover_image)}
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
                    alt={post.title}
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-2 mb-3">
                    <span className="bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                      Axborot
                    </span>
                  </div>
                </div>

                {/* MATN */}
                <div className="w-full md:w-[55%] flex flex-col justify-between py-4">
                  <div>
                    <h2 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 text-base md:text-lg line-clamp-4 leading-relaxed">
                      {post.short_description || "Maqola haqida qisqacha ma'lumot mavjud emas."}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-6">
                    <div className="flex items-center text-gray-400 gap-2">
                      <CalendarDays className="h-5 w-5 text-blue-500" />
                      <span className="text-sm font-medium">
                        {new Date(post.created_at).toLocaleDateString('uz-UZ')} {new Date(post.created_at).toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="absolute -bottom-2 right-0 flex gap-2 z-20">
          <CarouselPrevious className="static translate-y-0 h-11 w-11 bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white border-none transition-all shadow-sm" />
          <CarouselNext className="static translate-y-0 h-11 w-11 bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white border-none transition-all shadow-sm" />
        </div>
      </Carousel>

      <div className="w-full h-[1px] bg-slate-100 dark:bg-slate-800 mt-12" />
    </div>
  );
};

export default InfoCarousel;