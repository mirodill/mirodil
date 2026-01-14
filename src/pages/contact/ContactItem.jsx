import { cn } from "@/lib/utils";

const ContactItem = ({ icon: Icon, title, value, href }) => {
  return (
    <div className="flex items-start gap-4">
      <div className="rounded-lg border-2 bg-primary/10 p-3 text-primary flex-shrink-0">
        <Icon className="h-5 w-5" />
      </div>

      <div className="flex-1">
        <h3 className="font-medium">{title}</h3>
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:underline break-words"
          >
            {value}
          </a>
        ) : (
          <p className="text-sm text-muted-foreground break-words">{value}</p>
        )}
      </div>
    </div>
  );
};

export default ContactItem;
