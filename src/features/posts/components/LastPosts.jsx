import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useLastPosts } from "@/hooks/useLastPosts";
import PostItem from "./PostItem";

const LastPosts = () => {
  const { posts, loading, removePost } = useLastPosts();

  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Barcha postlar</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-8 text-muted-foreground italic">
            Yuklanmoqda...
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            Postlar topilmadi
          </div>
        ) : (
          <div className="space-y-3">
            {posts.map((post) => (
              <PostItem 
                key={post.id} 
                post={post} 
                onDelete={removePost} 
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LastPosts;