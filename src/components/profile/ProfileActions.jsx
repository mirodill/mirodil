import { Button } from "@/components/ui/button";
import { Mail, Phone, FileText } from "lucide-react";


const ProfileActions = () => {
  return (
    <div className="pt-6 flex flex-wrap gap-2">
      
      {/* Email Button */}
      <a href="mailto:mirodil.mavlonov.2023@gmail.com">
        <Button className="bg-[#0965fe] hover:bg-[#508eeb] text-white flex items-center gap-2 cursor-pointer">
          <Mail className="h-4 w-4" />
          <span>Email</span>
        </Button>
      </a>

      {/* Phone Button */}
      <a href="tel:+998934211623">
        <Button className="bg-[#0965fe] hover:bg-[#508eeb] text-white flex items-center justify-center cursor-pointer">
          <Phone className="h-4 w-4" />
        </Button>
      </a>

      {/* Resume Button */}
      <a href="../../../public/Mirodil_CV.pdf" download="Mirodil_CV.pdf">
        <Button variant="outline" className="flex items-center gap-2 cursor-pointer">
          <FileText className="h-4 w-4" />
          <span>Resume</span>
        </Button>
      </a>

    </div>
  );
};

export default ProfileActions;
