import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ThemeToggle } from "../theme/ThemeToggle";
import SectionCard from "../common/SectionCard";
import me_img from "../../assets/images/me.jpg";

const Header = () => {
  return (
    <header>
      {/* Faqat mobileda ko'rinmasin */}
      <SectionCard className="hidden sm:flex">
        <div className="flex items-center justify-between w-full px-4 sm:px-6 py-3 sm:py-4 rounded-md border-none gap-3">

          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={me_img} alt="Mirodil Mavlonov" className="object-cover" loading="lazy"/>
            </Avatar>
            <h1 className="hidden sm:block font-semibold text-card-foreground text-lg sm:text-xl">
              Mirodil Mavlonov
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Select defaultValue="uz">
              <SelectTrigger className="w-32 sm:w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="uz">Uz</SelectItem>
                  <SelectItem value="en">En</SelectItem>
                  <SelectItem value="ru">Ru</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <ThemeToggle />
          </div>

        </div>
      </SectionCard>
    </header>
  );
};

export default Header;
