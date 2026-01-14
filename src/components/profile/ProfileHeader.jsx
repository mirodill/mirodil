import MessageBox from "../MessageBox";

const ProfileHeader = ({ cover, avatar }) => {
  return (
    <div className="relative">
      <img
        src={cover}
        alt="Cover"
        className="w-full h-52 sm:h-64 md:h-72 object-cover"
      />

      <div className="relative">
        <div className="absolute bottom-22 left-3 sm:left-5">
          <MessageBox />
        </div>

        <img
          src={avatar}
          alt="Avatar"
          className="w-32 h-32 sm:w-40 sm:h-40 rounded-full absolute -bottom-16 left-5 object-cover border-4 border-background"
        />
      </div>
    </div>
  );
};

export default ProfileHeader;
