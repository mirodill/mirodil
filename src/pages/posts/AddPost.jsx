import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save, Loader2, Eye } from "lucide-react";
import { toast } from "sonner";

import { createPost, updatePost, getPostById } from "../../api/post.api";
import { getCategories } from "../../api/category.api";

import PostEditor from "./components/PostEditor";
import PostSidebar from "./components/PostSidebar";
import LivePreview from "./components/LivePreview";

const AddPost = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '', slug: '', content: '', status: 'draft',
    category: '', cover_image: '', tags: [],
  });

  const createSlug = (text) => text.toString().toLowerCase().trim()
    .replace(/\s+/g, '-').replace(/[^\w-]+/g, '').replace(/--+/g, '-');

  // API orqali kategoriyalarni olish
  useEffect(() => {
    (async () => {
      try {
        const catRes = await getCategories();
        setCategories(catRes.data?.data || []);
      } catch (err) { console.error("Kategoriyalarni yuklashda xatolik:", err); }
    })();
  }, []);

  // Tahrirlash rejimi bo'lsa, postni olish
  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        setLoading(true);
        const res = await getPostById(id);
        const post = res.data?.data;
        if (post) setFormData({
          title: post.title || '',
          slug: post.slug || '',
          content: post.content || '',
          status: post.status || 'draft',
          category: post.categories?.length > 0 ? String(post.categories[0].id) : '',
          cover_image: post.cover_image || '',
          tags: post.tags ? post.tags.map(t => ({ label: t, value: t })) : [],
        });
      } catch (err) { toast.error("Ma'lumotni yuklashda xato"); }
      finally { setLoading(false); }
    })();
  }, [id]);

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setFormData(prev => ({ ...prev, title, slug: createSlug(title) }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) return toast.error("Rasm 2MB dan oshmasligi kerak!");
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => setFormData(prev => ({ ...prev, cover_image: reader.result }));
    }
  };

  const handleSubmit = async () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      return toast.error("Sarlavha va matnni to'ldiring!");
    }
    
    try {
      setLoading(true);
      const payload = {
        ...formData,
        categories: formData.category ? [parseInt(formData.category)] : [],
        tags: formData.tags.map(t => t.value)
      };
      
      const res = id ? await updatePost(id, payload) : await createPost(payload);
      
      if (res.data.success) {
        toast.success(id ? "Post yangilandi!" : "Post yaratildi!");
        navigate("/dashboard/posts");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Saqlashda xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate(-1)} className="hover:bg-slate-100">
            <ArrowLeft className="mr-2 h-4 w-4" /> Orqaga
          </Button>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            {id ? "Postni tahrirlash" : "Yangi maqola yaratish"}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setIsPreviewOpen(true)}>
            <Eye className="mr-2 h-4 w-4" /> Ko'rish
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg" onClick={handleSubmit} disabled={loading}>
            {loading ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : <Save className="mr-2 h-4 w-4" />} 
            Saqlash
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Editor - Endi setFormData uzatiladi */}
          <PostEditor 
            formData={formData} 
            handleTitleChange={handleTitleChange} 
            setFormData={setFormData} 
          />
        </div>
        <div className="space-y-6">
          <PostSidebar 
            formData={formData} 
            setFormData={setFormData} 
            categories={categories} 
            handleImageChange={handleImageChange} 
          />
        </div>
      </div>

      <LivePreview 
        isOpen={isPreviewOpen} 
        setIsOpen={setIsPreviewOpen} 
        formData={formData} 
        categoryName={categories.find(c => String(c.id) === formData.category)?.name} 
      />
    </div>
  );
};

export default AddPost;