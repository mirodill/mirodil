import { useState } from "react";
import { usePosts } from "../hooks/usePosts";
import PostForm from "./PostForm";
import PostTableRow from "./PostTableRow";

export default function PostTable() {
  const { posts, loading, fetchPosts, removePost } = usePosts();
  const [selectedPost, setSelectedPost] = useState(null);

  const handleRefresh = () => {
    fetchPosts();
    setSelectedPost(null);
  };

  return (
    <div className="space-y-8">
      {/* FORM SECTION */}
      <section className="bg-white p-6 rounded-xl border shadow-sm">
        <PostForm selectedPost={selectedPost} refresh={handleRefresh} />
      </section>

      {/* TABLE SECTION */}
      <div className="border rounded-xl overflow-hidden bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="text-left p-4 font-semibold text-slate-600">Title</th>
              <th className="text-left p-4 font-semibold text-slate-600">Category</th>
              <th className="text-left p-4 font-semibold text-slate-600">Status</th>
              <th className="text-left p-4 font-semibold text-slate-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="4" className="p-8 text-center text-slate-400 italic">Yuklanmoqda...</td></tr>
            ) : posts.length === 0 ? (
              <tr><td colSpan="4" className="p-8 text-center text-slate-400">Postlar mavjud emas</td></tr>
            ) : (
              posts.map((post) => (
                <PostTableRow 
                  key={post.id} 
                  post={post} 
                  onEdit={setSelectedPost} 
                  onDelete={removePost} 
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}