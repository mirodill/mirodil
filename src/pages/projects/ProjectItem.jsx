import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const ProjectItem = ({ title, description, image, technologies = [], link }) => {
  return (
    <div className="relative p-4 pt-12 mt-6">
      {link && (
        <Button
          variant="outline"
          size="icon"
          aria-label="Visit project"
          className="absolute top-4 right-4 z-30"
        >
          <a href={link} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      )}

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/4 flex-shrink-0">
          <img
            src={image}
            alt={title}
        loading="lazy"
            className="w-full h-32 md:h-40 rounded-lg object-cover"
          />
        </div>

        <div className="flex-1 flex flex-col gap-3 md:w-3/5">
          <h2 className="text-lg md:text-[17px] font-semibold">{title}</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>

          {technologies.length > 0 && (
            <ul className="flex flex-wrap gap-2 pt-2">
              {technologies.map(({ icon: Icon, label }) => (
                <li key={label}>
                  <Badge variant="secondary" className="flex items-center gap-1 px-2 py-1">
                    {Icon && <Icon className="h-4 w-4" />}
                    {label}
                  </Badge>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectItem;
