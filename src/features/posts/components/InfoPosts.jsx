import { FileText, FolderOpen, Eye, Zap } from "lucide-react";
import { usePostStats } from "@/hooks/usePostStats";
import StatCard from "@/components/common/StatCard";

const InfoPosts = () => {
  const { stats, loading } = usePostStats();

  const statItems = [
    { 
      title: "Jami Postlar", 
      value: stats.totalPosts, 
      desc: "Barcha maqolalar", 
      icon: FileText 
    },
    { 
      title: "Kategoriyalar", 
      value: stats.totalCategories, 
      desc: "Mavjud yo'nalishlar", 
      icon: FolderOpen 
    },
    { 
      title: "Ko'rishlar", 
      value: stats.totalViews.toLocaleString(), 
      desc: "Barcha o'qishlar soni", 
      icon: Eye 
    },
    { 
      title: "Bugungi Postlar", 
      value: stats.newPostsToday, 
      desc: "Oxirgi 24 soat ichida", 
      icon: Zap 
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statItems.map((item, index) => (
        <StatCard
          key={index}
          title={item.title}
          value={item.value}
          description={item.desc}
          icon={item.icon}
          loading={loading}
        />
      ))}
    </div>
  );
};

export default InfoPosts;