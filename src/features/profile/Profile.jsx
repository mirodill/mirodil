import ProfileHeader from "./components/ProfileHeader";
import ProfileInfo from "./components/ProfileInfo";
import ProfileSocials from "./components/ProfileSocials";
import ProfileActions from "./components/ProfileActions";
import cover from "@/assets/images/banner.png";
import avatar from "@/assets/images/me.jpg";
import SectionCard from "@/components/common/SectionCard";
import { StarsCanvas } from "@/components/canvas";

const Profile = () => {
  return (
    <>
    <StarsCanvas/>
    <SectionCard noPadding className="p-0">
      <ProfileHeader cover={cover} avatar={avatar} />

      <div className="pt-18 px-4 sm:px-6 pb-5">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-6 lg:gap-4">
          <ProfileInfo />
          <ProfileSocials />
        </div>

        <div className="mt-2">
          <ProfileActions />
        </div>
      </div>
    </SectionCard>
    </>
  );
};

export default Profile;
