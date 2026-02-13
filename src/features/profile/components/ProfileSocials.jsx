import { Button } from "@/components/ui/button";
import { Linkedin, Instagram, Github, Facebook } from "lucide-react";

const socials = [
  { icon: Linkedin, url: "https://www.linkedin.com/in/mavlonov-mirodil-34180128b/" },
  { icon: Instagram, url: "https://www.instagram.com/mirodil_uz/" },
  { icon: Github, url: "https://github.com/mirodill" },
  { icon: Facebook, url: "https://www.facebook.com/profile.php?id=61554964870662" },
];

const ProfileSocials = () => {
  return (
    <ul className="flex flex-wrap gap-2">
      {socials.map((item, index) => {
        const Icon = item.icon;
        return (
          <li key={index}>
            <Button
              asChild
              size="icon"
              variant="outline"
              className="cursor-pointer"
            >
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                <Icon size={18} />
              </a>
            </Button>
          </li>
        );
      })}
    </ul>
  );
};

export default ProfileSocials;
