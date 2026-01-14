const SkillItem = ({ icon, name }) => (
  <div
    className="
      flex items-center justify-center gap-2 w-32 h-12
      rounded-md border-2 border-gray-700
      bg-gray-800
      text-white
      font-semibold text-sm
      cursor-pointer
      transition-transform duration-200
      hover:scale-105
      focus:outline-none focus:ring-2 focus:ring-blue-500
    "
    title={name} 
  >
    {icon && <img src={icon} alt={name} className="w-8 h-8 object-contain" />}
    <span>{name}</span>
  </div>
);

export default SkillItem;
