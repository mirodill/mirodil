import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Plus, Edit, Trash2, MoreVertical, Search, Calendar, Eye as EyeIcon } from "lucide-react";
import { getPosts, deletePost } from "../../api/post.api";
import { toast } from "sonner";
import Loader2 from "@/components/common/Loader2";

const Posts = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await getPosts();
      const data = res.data?.data || res.data || [];
      setPosts(Array.isArray(data) ? data : []);
    } catch (err) {
      toast.error("Ma'lumotlarni yuklashda xatolik");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPosts(); }, []);

  const handleDelete = async (id, title) => {
    if (!window.confirm(`"${title}" postini o'chirishni tasdiqlaysizmi?`)) return;
    try {
      await deletePost(id);
      setPosts(prev => prev.filter(p => p.id !== id));
      toast.success("Post o'chirildi");
    } catch (err) {
      toast.error("O'chirishda xatolik yuz berdi");
    }
  };

  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesStatus = filterStatus === "all" || post.status === filterStatus;
      const matchesSearch = post.title?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [posts, filterStatus, searchQuery]);

  return (
    <div className="p-6 space-y-6 min-h-screen">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Maqolalar</h1>
          <p className="text-muted-foreground">Kontentni boshqarish va tahlil qilish paneli</p>
        </div>
        <Button onClick={() => navigate("/dashboard/addpost")} className="bg-blue-600 hover:bg-blue-700 shadow-md">
          <Plus className="mr-2 h-4 w-4" /> Yangi post qo'shish
        </Button>
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader className="pb-3 border-b">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <CardTitle className="text-xl font-semibold">Barcha postlar ({filteredPosts.length})</CardTitle>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Sarlavha bo'yicha qidiruv..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="pl-9 border-slate-200 focus-visible:ring-blue-500"
                />
              </div>
              
              <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
                {['all', 'published', 'draft'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setFilterStatus(s)}
                    className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all ${
                      filterStatus === s ? "bg-white shadow-sm text-blue-600" : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    {s === 'all' ? 'Hammasi' : s === 'published' ? 'Nashr etilgan' : 'Qoralama'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-50/50">
                <TableRow>
                  <TableHead className="font-semibold py-4">Sarlavha</TableHead>
                  <TableHead className="font-semibold">Kategoriya</TableHead>
                  <TableHead className="font-semibold">Sana</TableHead>
                  <TableHead className="font-semibold text-center">Statistika</TableHead>
                  <TableHead className="font-semibold">Holat</TableHead>
                  <TableHead className="text-right font-semibold pr-6">Amallar</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {loading ? (
                  /* --- BLOG STYLE LOADER --- */
                  <TableRow className="hover:bg-transparent">
                    <TableCell colSpan={6} className="h-80">
                      <div className="flex flex-col justify-center items-center gap-4">
                         <Loader2 className="size-10 text-blue-600" />
                      </div>
                    </TableCell>
                  </TableRow>
                ) : filteredPosts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-40 text-center">
                      <div className="flex flex-col items-center justify-center py-10 opacity-60">
                         <div className="text-3xl mb-2">😕</div>
                         <p className="text-muted-foreground font-medium italic">Ma'lumot topilmadi</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPosts.map(post => (
                    <TableRow key={post.id} className="group hover:bg-slate-50 transition-colors">
                      <TableCell className="font-medium max-w-[300px] truncate py-4">
                        {post.title}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="font-normal bg-slate-100 text-slate-700 border-none">
                           {post.categories?.[0]?.name || post.categories || "Boshqalar"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate-500 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3.5 w-3.5" />
                          {post.created_at ? new Date(post.created_at).toLocaleDateString("uz-UZ") : "---"}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-1.5 text-slate-500 text-sm">
                          <EyeIcon className="h-4 w-4" /> {post.views_count || 0}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          className={post.status === 'published' 
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
                            : "bg-orange-50 text-orange-700 border-orange-200"}
                          variant="outline"
                        >
                          <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${post.status === 'published' ? 'bg-emerald-500' : 'bg-orange-500'}`}></span>
                          {post.status === 'published' ? 'Nashr etilgan' : 'Qoralama'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right pr-6">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-slate-200">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-36">
                            <DropdownMenuItem onClick={() => navigate(`/dashboard/addposts/${post.id}`)} className="cursor-pointer">
                              <Edit className="h-4 w-4 mr-2 text-blue-600" /> Tahrirlash
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDelete(post.id, post.title)} className="text-red-600 cursor-pointer">
                              <Trash2 className="h-4 w-4 mr-2" /> O'chirish
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Posts;