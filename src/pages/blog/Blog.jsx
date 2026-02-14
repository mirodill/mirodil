import { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getPosts, getCategories } from "@/api/post.api";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Calendar } from "lucide-react";
import InfoCarousel from "@/features/carusel/InfoCarousel";

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

  const displayPosts = useMemo(() => {
    let result = [...posts];
    if (currentCategory !== "barchasi") {
      result = result.filter((post) =>
        post.categories?.some((cat) => (typeof cat === 'object' ? cat.slug : cat)?.toString().toLowerCase().trim() === currentCategory)
      );
    }
    if (searchQuery) {
      result = result.filter(post => post.title?.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    return result;
  }, [posts, currentCategory, searchQuery]);

  // Layout uchun postlarni bo'lish
  const mainPost = displayPosts[0];
  const nextThreePosts = displayPosts.slice(1, 4);
  const gridPosts = displayPosts.slice(4);

  if (loading) return <BlogSkeleton />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 font-sans bg-white dark:bg-gray-950 min-h-screen">
      
      {/* 1. SEARCH VA TABBAR */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-10">
        <div className="relative w-full md:w-72 lg:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
          <Input
            type="text"
            placeholder="Qidirish..."
            value={searchQuery}
            onChange={(e) => setSearchParams(e.target.value ? { q: e.target.value } : {})}
            className="pl-10 h-11 rounded-xl bg-secondary/30 border-none focus-visible:ring-1 focus-visible:ring-blue-500"
          />
        </div>

        <Tabs value={currentCategory} className="w-full">
          <TabsList className="w-full justify-start h-11 bg-secondary/30 p-1 overflow-x-auto no-scrollbar rounded-xl">
            {categories.map((cat) => {
               const catSlug = (cat.slug || cat.name || "").toLowerCase().trim();
               return (
                <TabsTrigger
                    key={cat.id}
                    value={catSlug}
                    onClick={() => navigate(catSlug === "barchasi" ? BASE_URL : `${BASE_URL}/category/${catSlug}`)}
                    className="rounded-lg h-9 px-6 data-[state=active]:bg-white data-[state=active]:text-blue-600 transition-all shadow-none font-medium"
                >
                    {cat.name}
                </TabsTrigger>
               )
            })}
          </TabsList>
        </Tabs>
      </div>

      {/* 2. KARUSEL (Faqat barchasi sahifasida) */}
      {currentCategory === "barchasi" && !searchQuery && (
        <InfoCarousel posts={posts} baseUrl={BASE_URL} />
      )}

      {displayPosts.length > 0 ? (
        <div className="space-y-20">
          
          {/* 3. MAIN + SIDE POSTS */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-6 flex flex-col gap-8">
               <h2 className="text-xl font-bold border-l-4 border-blue-600 pl-4">Yangi xabarlar</h2>
               {nextThreePosts.map((post) => (
                <div key={post.id} className="flex gap-4 group cursor-pointer" onClick={() => navigate(`${BASE_URL}/${post.slug}`)}>
                  <div className="w-24 h-20 sm:w-32 sm:h-24 flex-shrink-0 rounded-2xl overflow-hidden">
                    <img src={post.cover_image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={post.title} />
                  </div>
                  <div className="flex flex-col justify-between py-1 h-20 sm:h-24">
                    <h3 className="text-md md:text-base font-bold line-clamp-2 group-hover:text-blue-600 transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <span className="text-[10px] sm:text-xs text-gray-400 font-medium">
                      {new Date(post.created_at).toLocaleTimeString('uz-UZ', {hour: '2-digit', minute:'2-digit'})} / {new Date(post.created_at).toLocaleDateString('uz-UZ')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
              <div className="lg:col-span-6">
              {mainPost && (
                <Card className="border-none shadow-none bg-transparent cursor-pointer group" onClick={() => navigate(`${BASE_URL}/${mainPost.slug}`)}>
                  <div className="overflow-hidden rounded-xl aspect-video mb-2 shadow-sm">
                    <img src={mainPost.cover_image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={mainPost.title} />
                  </div>
                  <CardHeader className="p-0">
                    <CardTitle className="text-2xl md:text-3xl font-medium group-hover:text-blue-600 leading-tight transition-colors">
                      {mainPost.title}
                    </CardTitle>
                  </CardHeader>
                  <CardFooter className="p-0 mt-2 text-muted-foreground flex items-center gap-2 text-sm font-medium">
                    <Calendar className="h-4 w-4" />                         {new Date(mainPost.created_at).toLocaleTimeString('uz-UZ', {hour: '2-digit', minute:'2-digit'})} / {new Date(mainPost.created_at).toLocaleDateString('uz-UZ')}

                  </CardFooter>
                </Card>
              )}
            </div>
          </section>

          {/* 4. GRID POSTS (Pastda 3 talik) */}
          {gridPosts.length > 0 && (
            <section className="space-y-10">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Barcha maqolalar</h2>
                <div className="h-[1px] flex-grow mx-6" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {gridPosts.map((post) => (
                  <Card key={post.id} className="border-none shadow-sm hover:shadow-md transition-all rounded-xl bg-none overflow-hidden cursor-pointer group p-0" onClick={() => navigate(`${BASE_URL}/${post.slug}`)}>
                    <div className="aspect-[16/10] overflow-hidden rounded-xl">
                      <img src={post.cover_image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={post.title} />
                    </div>
                    <CardHeader className="p-2">
                      <CardTitle className="text-lg font-medium line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {post.title}
                      </CardTitle>
                      <div className="mt-4 text-md text-muted-foreground font-medium">
                                                {new Date(post.created_at).toLocaleTimeString('uz-UZ', {hour: '2-digit', minute:'2-digit'})} / {new Date(post.created_at).toLocaleDateString('uz-UZ')}
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </section>
          )}
        </div>
      ) : (
        <div className="text-center py-32 bg-secondary/10 rounded-[3rem] border-2 border-dashed border-secondary/20">
          <p className="text-muted-foreground font-medium italic">Ma'lumot topilmadi...</p>
        </div>
      )}
    </div>
  );
}

function BlogSkeleton() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
            <div className="flex gap-4"><Skeleton className="h-11 w-64 rounded-xl" /><Skeleton className="h-11 w-full rounded-xl" /></div>
            <Skeleton className="h-[350px] w-full rounded-[2.5rem]" />
            <div className="grid grid-cols-12 gap-10">
               <div className="col-span-8"><Skeleton className="h-96 w-full rounded-[2.5rem]" /></div>
               <div className="col-span-4 space-y-4"><Skeleton className="h-24 w-full" /><Skeleton className="h-24 w-full" /><Skeleton className="h-24 w-full" /></div>
            </div>
        </div>
    )
}