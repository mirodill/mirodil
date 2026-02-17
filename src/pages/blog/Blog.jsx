import { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getPosts, getCategories } from "@/api/post.api";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Calendar } from "lucide-react";
import InfoCarousel from "@/features/carusel/InfoCarousel";

// --- YORDAMCHI KOMPONENTLAR ---

const PostMeta = ({ post, getCategoryName, className = "" }) => (
  <div className={`flex items-center gap-2 text-sm ${className}`}>
    <span className="font-medium">
      {getCategoryName(post)}
    </span>
    <span className="text-slate-300 dark:text-slate-700">|</span>
    <span className="flex items-center gap-1">
      <Calendar className="w-3 h-3" />
      {new Date(post.created_at).toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' })} / {new Date(post.created_at).toLocaleDateString('uz-UZ')}
    </span>
  </div>
);

const PostImage = ({ src, alt, className = "" }) => (
  <img 
    src={src || "/placeholder-image.jpg"} 
    className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ${className}`} 
    alt={alt} 
  />
);

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { categoryName } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || "";

  const BASE_URL = "/blog";
  const currentCategory = categoryName ? decodeURIComponent(categoryName).toLowerCase().trim() : "barchasi";

  // --- LOGIKA ---

  const getCategoryName = useCallback((post) => {
    if (!post.categories?.length) return "Umumiy";
    const firstCat = post.categories[0];
    return typeof firstCat === 'object' ? firstCat.name : firstCat;
  }, []);

  const getImageSrc = useCallback((img) => {
    if (!img) return null;
    if (img.startsWith("data:") || img.startsWith("http")) return img;
    return `data:image/jpeg;base64,${img}`;
  }, []);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [postsRes, catRes] = await Promise.all([getPosts(), getCategories()]);
      const allPosts = postsRes.data?.data || postsRes.data || [];
      const allCategories = catRes.data?.data || catRes.data || [];
      setPosts(allPosts);
      setCategories([{ id: 'all', name: "Barchasi", slug: "barchasi" }, ...allCategories]);
    } catch (err) {
      console.error("Xatolik:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  useEffect(() => {
    let title = "Mirodil's Blog";
    if (searchQuery) title = `"${searchQuery}" qidiruvi | Blog`;
    else if (currentCategory !== "barchasi") title = `${currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1)} | Blog`;
    document.title = title;
  }, [currentCategory, searchQuery]);

  const displayPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesCategory = currentCategory === "barchasi" || 
        post.categories?.some(cat => (cat.slug || cat).toString().toLowerCase() === currentCategory);
      const matchesSearch = !searchQuery || post.title?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [posts, currentCategory, searchQuery]);

  const navigateToDetail = (post) => navigate(`${BASE_URL}/${post.slug || post.id}`);

  if (loading) return <BlogSkeleton />;

  return (
    <div className="max-w-7xl mx-auto py-8 font-sans bg-white dark:bg-gray-950 min-h-screen transition-colors duration-300 px-4">
      
      {/* 1. QIDIRUV VA KATEGORIYALAR */}
      <div className="flex flex-col md:flex-row items-center gap-6 mb-10">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
          <Input
            placeholder="Qidirish..."
            value={searchQuery}
            onChange={(e) => setSearchParams(e.target.value ? { q: e.target.value } : {})}
            className="pl-10 h-11 rounded-xl bg-slate-100 dark:bg-slate-800 border-none focus-visible:ring-2 focus-visible:ring-blue-500"
          />
        </div>

        <Tabs value={currentCategory} className="w-full">
      <TabsList 
        className="
          w-full justify-start h-11 
          bg-slate-100 dark:bg-slate-800 
          p-1 rounded-xl
          overflow-x-auto 
          flex flex-nowrap
          scrollbar-hide 
          [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
        "
      >
        {categories.map((cat) => (
          <TabsTrigger
            key={cat.id}
            value={(cat.slug || cat.name || "").toLowerCase().trim()}
            onClick={() => navigate(cat.slug === "barchasi" ? BASE_URL : `${BASE_URL}/category/${cat.slug}`)}
            className="
              rounded-lg h-9 px-5 
              font-medium whitespace-nowrap 
              transition-all
              data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 
              data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400
              data-[state=active]:shadow-sm
            "
          >
            {cat.name}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
      </div>

      {/* 2. KARUSEL */}
      {currentCategory === "barchasi" && !searchQuery && (
        <div className="mb-16">
          <InfoCarousel posts={posts} baseUrl={BASE_URL} />
        </div>
      )}

      {displayPosts.length > 0 ? (
        <div className="space-y-24">
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Yangi xabarlar */}
            <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col gap-6">
              {displayPosts.slice(1, 4).map((post) => (
                <div key={post.id} className="flex gap-4 group cursor-pointer p-2 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-900 transition-all" onClick={() => navigateToDetail(post)}>
                  <div className="w-24 h-24 sm:w-32 sm:h-28 flex-shrink-0 rounded-2xl overflow-hidden">
                    <PostImage src={getImageSrc(post.cover_image)} alt={post.title} />
                  </div>
                  <div className="flex flex-col justify-between py-1">
                    <h3 className="text-xl font-medium line-clamp-2 group-hover:text-blue-600 transition-colors leading-snug">{post.title}</h3>
                    <PostMeta post={post} getCategoryName={getCategoryName} />
                  </div>
                </div>
              ))}
            </div>

            {/* Asosiy maqola */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              {displayPosts[0] && (
                <div className="relative group cursor-pointer overflow-hidden rounded-3xl shadow-lg" onClick={() => navigateToDetail(displayPosts[0])}>
                  <div className="aspect-[16/14] sm:aspect-video overflow-hidden">
                    <PostImage src={getImageSrc(displayPosts[0].cover_image)} alt={displayPosts[0].title} className="duration-1000" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 sm:p-10">
                    <h2 className="text-white text-2xl sm:text-4xl font-extrabold mb-4 line-clamp-2 leading-tight">{displayPosts[0].title}</h2>
                    <PostMeta post={displayPosts[0]} getCategoryName={getCategoryName} className="text-slate-200" />
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Grid Maqolalar */}
          {displayPosts.length > 4 && (
            <section className="space-y-10 pb-12">
              <div className="flex items-center gap-4">
                <h2 className="text-3xl font-extrabold whitespace-nowrap">Barcha maqolalar</h2>
                <div className="h-[1px] w-full bg-slate-200 dark:bg-slate-800" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayPosts.slice(4).map((post) => (
                  <Card key={post.id} className="border shadow-none p-0 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 rounded-2xl overflow-hidden cursor-pointer group bg-slate-50/50 dark:bg-slate-900/50" onClick={() => navigateToDetail(post)}>
                    <div className="aspect-[16/10] overflow-hidden">
                      <PostImage src={getImageSrc(post.cover_image)} alt={post.title} />
                    </div>
                    <CardHeader className="px-5 pb-4">
                      <CardTitle className="text-xl font-bold line-clamp-2 group-hover:text-blue-600 mb-3">{post.title}</CardTitle>
                      <PostMeta post={post} getCategoryName={getCategoryName} />
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </section>
          )}
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  );
}

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-40 bg-slate-50 dark:bg-slate-900 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
    <Search className="w-12 h-12 text-slate-300 mb-4" />
    <p className="text-slate-500 dark:text-slate-400 font-semibold text-lg italic text-center px-4">
      Afuski, hech narsa topilmadi.
    </p>
  </div>
);


function BlogSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-16 animate-pulse">
      <div className="flex flex-col md:flex-row gap-6">
        <Skeleton className="h-11 w-full md:w-80 rounded-xl" />
        <Skeleton className="h-11 flex-grow rounded-xl" />
      </div>

      <Skeleton className="h-[450px] w-full rounded-[2.5rem]" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5 space-y-8">
          <Skeleton className="h-6 w-48 mb-4" />
          {[1, 2, 3].map(i => (
            <div key={i} className="flex gap-4">
              <Skeleton className="h-28 w-32 rounded-2xl shrink-0" />
              <div className="flex-grow space-y-3 py-2">
                <Skeleton className="h-5 w-full rounded-md" />
                <Skeleton className="h-5 w-4/5 rounded-md" />
                <Skeleton className="h-4 w-24 rounded-md mt-4" />
              </div>
            </div>
          ))}
        </div>
        <div className="lg:col-span-7">
          <Skeleton className="aspect-video w-full rounded-[2rem]" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map(i => (
          <div key={i} className="space-y-4">
            <Skeleton className="aspect-[16/10] w-full rounded-2xl" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-2/3" />
          </div>
        ))}
      </div>
    </div>
  )
}