import { FileText, Calendar, Eye } from "lucide-react";

const PostItem = ({ post }) => {
  const date = new Date(post.created_at).toLocaleDateString("uz-UZ");
  const category = post.categories?.[0]?.name || post.categories?.[0] || "Kategoriya yo'q";

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 transition-colors">
      <div className="flex items-start gap-4 flex-1">
        <div className="p-2 bg-blue-50 rounded">
          <FileText className="h-5 w-5 text-blue-600" />
        </div>
        <div className="flex-1">
          <h3 className="font-medium mb-1 line-clamp-1">{post.title}</h3>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="font-medium">{category}</span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" /> {date}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="h-3.5 w-3.5" /> {post.views_count}
            </span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
          post.status === 'published' 
            ? 'bg-green-100 text-green-700' 
            : 'bg-yellow-100 text-yellow-700'
        }`}>
          {post.status}
        </span>
        
      </div>
    </div>
  );
};

export default PostItem;