import { useState, useEffect } from 'react';
import axios from 'axios';

export const usePostForm = () => {
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category_id: '',
    tag_ids: [],
    cover_image: null
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, tagRes] = await Promise.all([
          axios.get('https://blog-api-uzfl.onrender.com/api/v1/categories'),
          axios.get('https://blog-api-uzfl.onrender.com/api/v1/tags')
        ]);
        setCategories(catRes.data.data || []);
        setTags(tagRes.data.data || []);
      } catch (err) {
        console.error("Ma'lumotlarni yuklashda xatolik:", err);
      }
    };
    fetchData();
  }, []);

  const resetForm = () => {
    setFormData({ title: '', content: '', category_id: '', tag_ids: [], cover_image: null });
  };

  const submitPost = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'tag_ids') {
        formData.tag_ids.forEach(id => data.append('tag_ids[]', id));
      } else {
        data.append(key, formData[key]);
      }
    });

    try {
      const token = localStorage.getItem('token');
      await axios.post('https://blog-api-uzfl.onrender.com/api/v1/posts', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
      alert("Post muvaffaqiyatli qo'shildi!");
      resetForm();
    } catch (err) {
      alert(err.response?.data?.message || "Xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  return { formData, setFormData, categories, tags, loading, submitPost };
};