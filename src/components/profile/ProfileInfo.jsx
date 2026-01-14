import { BadgeCheckIcon } from "lucide-react";

const ProfileInfo = () => {
  return (
    <div>
      <h1 className="font-semibold text-lg sm:text-[20px] flex items-center gap-2">
        Mirodil Mavlonov 
        <BadgeCheckIcon className="text-[#0965fe] h-5 w-5" />
      </h1>

      <ul className="pt-1 text-sm sm:text-base space-y-1">
        <li className="flex gap-2">
          🧑‍💻 Data Analyst | Frontend Developer
        </li>
        <li className="flex gap-2">
          🌐 Tashkent, Uzbekistan
        </li>
      </ul>
    </div>
  );
};

export default ProfileInfo;
