import { Button } from "@/components/ui/button";

const PostTableRow = ({ post, onEdit, onDelete }) => (
  <tr className="border-t hover:bg-slate-50 transition-colors">
    <td className="p-3 font-medium text-slate-700">{post.title}</td>
    <td className="p-3 text-slate-600">{post.category_name || "Kategoriya yo'q"}</td>
    <td className="p-3">
      <span className={`px-2 py-1 rounded text-xs font-semibold ${
        post.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'
      }`}>
        {post.status}
      </span>
    </td>
    <td className="p-3 space-x-2">
      <Button variant="outline" size="sm" onClick={() => onEdit(post)}>
        Edit
      </Button>
      <Button variant="destructive" size="sm" onClick={() => onDelete(post.id)}>
        Delete
      </Button>
    </td>
  </tr>
);

export default PostTableRow;