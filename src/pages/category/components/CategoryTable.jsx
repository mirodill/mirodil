import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FolderOpen, Edit, Trash2 } from "lucide-react";

export const CategoryTable = ({ categories, getPostCount, onEdit, onDelete }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Nomi</TableHead>
        <TableHead>Slug</TableHead>
        <TableHead>Maqolalar soni</TableHead>
        <TableHead className="text-right">Amallar</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {categories.map((category) => (
        <TableRow key={category.id}>
          <TableCell className="font-medium">
            <div className="flex items-center gap-2">
              <FolderOpen className="h-4 w-4 text-blue-600" />
              {category.name}
            </div>
          </TableCell>
          <TableCell>
            <code className="text-sm bg-muted px-2 py-1 rounded">{category.slug}</code>
          </TableCell>
          <TableCell>
            <Badge variant="secondary">{getPostCount(category.id)} ta maqola</Badge>
          </TableCell>
          <TableCell className="text-right">
            <div className="flex items-center justify-end gap-2">
              <Button variant="ghost" size="sm" onClick={() => onEdit(category)}>
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => onDelete(category.id, category.name)}>
                <Trash2 className="h-4 w-4 text-red-600" />
              </Button>
            </div>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);