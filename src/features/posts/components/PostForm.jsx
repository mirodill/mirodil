import React from 'react';
import { usePostForm } from '../hooks/usePostForm';
import { FormField, Input } from './form-fields';

const PostForm = () => {
  const { formData, setFormData, categories, tags, loading, submitPost } = usePostForm();

  const handleChange = (e) => {
    const { name, value, files, options } = e.target;
    if (name === 'cover_image') {
      setFormData(prev => ({ ...prev, cover_image: files[0] }));
    } else if (name === 'tag_ids') {
      const selected = Array.from(options).filter(o => o.selected).map(o => o.value);
      setFormData(prev => ({ ...prev, tag_ids: selected }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-2xl rounded-2xl mt-10">
      <h2 className="text-3xl font-extrabold mb-8 text-gray-900 border-b pb-4">Yangi maqola yaratish</h2>
      
      <form onSubmit={submitPost} className="space-y-6">
        <FormField label="Maqola sarlavhasi">
          <Input name="title" required value={formData.title} onChange={handleChange} placeholder="Sarlavhani kiriting..." />
        </FormField>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="Kategoriya">
            <select name="category_id" required value={formData.category_id} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white">
              <option value="">Tanlang</option>
              {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
            </select>
          </FormField>

          <FormField label="Taglar (Ctrl bilan tanlang)">
            <select name="tag_ids" multiple value={formData.tag_ids} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 h-32">
              {tags.map(tag => <option key={tag.id} value={tag.id}>#{tag.name}</option>)}
            </select>
          </FormField>
        </div>

        <FormField label="Asosiy rasm (Cover)">
          <input type="file" name="cover_image" accept="image/*" required onChange={handleChange} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-6 file:rounded-full file:bg-blue-50 file:text-blue-700 cursor-pointer" />
        </FormField>

        <FormField label="Maqola matni">
          <textarea name="content" required rows="8" value={formData.content} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Maqolangizni yozing..." />
        </FormField>

        <button type="submit" disabled={loading} className={`w-full py-4 text-white font-bold rounded-lg transition-all ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}>
          {loading ? "Yuborilmoqda..." : "Maqolani chop etish"}
        </button>
      </form>
    </div>
  );
};

export default PostForm;