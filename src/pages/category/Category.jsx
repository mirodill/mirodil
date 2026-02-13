import React, { useEffect, useState, useCallback } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner"; // yoki o'zingizni xabarnoma kutubxonangiz
import { getCategories, createCategory, updateCategory, deleteCategory } from "@/api/category.api";
import { getPosts } from "@/api/post.api";
import { StatsCards } from "./components/StatsCards";
import { CategoryTable } from "./components/CategoryTable";
import { CategoryFormDialog } from "./components/CategoryFormDialog";
import Loader2 from "@/components/common/Loader2";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [catRes, postRes] = await Promise.all([getCategories(), getPosts()]);
      setCategories(catRes.data?.data || []);
      setPosts(postRes.data?.data || postRes.data || []);
    } catch (err) {
      toast.error("Ma'lumotlarni yuklashda xatolik");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const getPostCount = (categoryId) => {
    return posts.filter(post => 
      post.categories?.some(cat => (cat.id || cat._id || cat) === categoryId)
    ).length;
  };

  const handleOpenDialog = (category = null) => {
    setEditingCategory(category);
    setName(category?.name || "");
    setSlug(category?.slug || "");
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!name.trim()) return;
    try {
      setSubmitLoading(true);
      const payload = { name, slug };
      editingCategory 
        ? await updateCategory(editingCategory.id, payload)
        : await createCategory(payload);
      
      await fetchData();
      setIsDialogOpen(false);
      toast.success("Muvaffaqiyatli saqlandi");
    } catch (err) {
      toast.error("Xatolik yuz berdi");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDelete = async (id, catName) => {
    if (!confirm(`"${catName}" o'chirilsinmi?`)) return;
    try {
      await deleteCategory(id);
      setCategories(prev => prev.filter(c => c.id !== id));
      toast.success("O'chirildi");
    } catch (err) {
      toast.error("O'chirish imkonsiz");
    }
  };

  if (loading) return <div className="flex h-[400px] items-center justify-center"><Loader2/></div>;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Kategoriyalar</h1>
          <p className="text-muted-foreground">Bo'limlarni boshqarish paneli</p>
        </div>
        <Button onClick={() => handleOpenDialog()} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" /> Yangi qo'shish
        </Button>
      </div>

      <StatsCards categoriesCount={categories.length} postsCount={posts.length} />

      <Card>
        <CardHeader>
          <CardTitle>Ro'yxat</CardTitle>
          <CardDescription>Mavjud barcha kategoriyalar boshqaruvi</CardDescription>
        </CardHeader>
        <CardContent>
          <CategoryTable 
            categories={categories} 
            getPostCount={getPostCount} 
            onEdit={handleOpenDialog} 
            onDelete={handleDelete} 
          />
        </CardContent>
      </Card>

      <CategoryFormDialog 
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        editingCategory={editingCategory}
        name={name}
        setName={setName}
        slug={slug}
        setSlug={setSlug}
        onSave={handleSave}
        loading={submitLoading}
      />
    </div>
  );
};

export default Category;