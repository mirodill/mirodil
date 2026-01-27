import ProfileHeader from "./ProfileHeader";
import ProfileInfo from "./ProfileInfo";
import ProfileSocials from "./ProfileSocials";
import ProfileActions from "./ProfileActions";
import cover from "@/assets/images/banner.png";
import avatar from "@/assets/images/me.jpg";
import SectionCard from "../common/SectionCard";

const Profile = () => {
  return (
    <SectionCard noPadding>
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
  );
};

export default Profile;
