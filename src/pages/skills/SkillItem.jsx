const SkillItem = ({ icon, name }) => (
  <div
    className="
      flex items-center justify-center gap-2 w-32 h-12
      rounded-md border-2

      /* LIGHT MODE */
      bg-white
      border-gray-300
      text-gray-800

      /* DARK MODE */
      dark:bg-gray-800
      dark:border-gray-700
      dark:text-white

      font-semibold text-sm
      cursor-pointer

      /* HOVER */
      hover:scale-105
      hover:border-blue-500
      dark:hover:border-blue-400

      /* FOCUS */
      focus:outline-none
      focus:ring-2
      focus:ring-blue-500
      dark:focus:ring-blue-400

      transition-transform duration-200
    "
    title={name}
  >
    {icon && (
      <img
        src={icon}
        alt={name}
        className="w-8 h-8 object-contain"
      />
    )}
    <span>{name}</span>
  </div>
);

export default SkillItem;
