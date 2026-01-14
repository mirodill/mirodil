import { Badge } from "@/components/ui/badge";

const ProjectTechBadge = ({ icon: Icon, label }) => (
  <Badge variant="secondary" className="flex items-center gap-1 px-2 py-1">
    {Icon && <Icon className="h-4 w-4" />}
    {label}
  </Badge>
);

export default ProjectTechBadge;
