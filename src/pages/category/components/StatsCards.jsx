import { Card, CardContent } from "@/components/ui/card";
import { Layers, FileText } from "lucide-react";

export const StatsCards = ({ categoriesCount, postsCount }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <Card>
      <CardContent className="pt-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Jami bo'limlar</p>
          <h3 className="text-2xl font-bold">{categoriesCount}</h3>
        </div>
        <Layers className="h-8 w-8 text-blue-500 opacity-20" />
      </CardContent>
    </Card>
    <Card>
      <CardContent className="pt-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Jami maqolalar</p>
          <h3 className="text-2xl font-bold">{postsCount}</h3>
        </div>
        <FileText className="h-8 w-8 text-purple-500 opacity-20" />
      </CardContent>
    </Card>
  </div>
);