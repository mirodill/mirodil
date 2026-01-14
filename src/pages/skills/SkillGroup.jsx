import SkillItem from "./SkillItem";

const SkillGroup = ({ category, skills = [] }) => (
  <div className="pt-6">
    <h3 className="text-lg font-mono mb-4">{category}</h3>

    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 justify-items-center">
      {skills.map(({ icon, name }, index) => (
        <SkillItem key={index} icon={icon} name={name} />
      ))}
    </div>
  </div>
);

export default SkillGroup;
