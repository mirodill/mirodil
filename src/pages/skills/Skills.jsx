import { CardContent } from "@/components/ui/card";
import SkillGroup from "./SkillGroup";
import SectionCard from "@/components/common/SectionCard";
import SectionHeader from "@/components/common/SectionHeader";

import pandas from '../../assets/images/pandas.svg';
import python from '../../assets/images/python.svg';
import bootstrap from '../../assets/images/bootstrap.svg';
import excel from '../../assets/images/excel.svg';
import github from '../../assets/images/github.svg';
import html from '../../assets/images/html.svg';
import javascript from '../../assets/images/javascript.svg';
import matplotlib from '../../assets/images/matplotlib.svg';
import numpy from '../../assets/images/numpy.svg';
import postgresql from '../../assets/images/postgresql.svg';
import react from '../../assets/images/react.svg';
import redux from '../../assets/images/redux.svg';
import sass from '../../assets/images/sass.svg';
import seaborn from '../../assets/images/seaborn.svg';
import tailwindcss from '../../assets/images/tailwindcss.svg';
import power from '../../assets/images/power.png';
import css from '../../assets/images/css.png';
import git from '../../assets/images/git.png';
import uz from '../../assets/images/uzb.png';
import en from '../../assets/images/eng.png';
import ru from '../../assets/images/rus.png';

const skillGroups = [
  {
    category: "Programming Languages",
    skills: [
      { icon: python, name: "Python" },
      { icon: javascript, name: "JavaScript" },
      { icon: html, name: "HTML" },
      { icon: css, name: "CSS" },
      { icon: postgresql, name: "SQL" },
    ],
  },
  {
    category: "Data Analysis & Visualization",
    skills: [
      { icon: pandas, name: "Pandas" },
      { icon: numpy, name: "NumPy" },
      { icon: matplotlib, name: "Matplotlib" },
      { icon: seaborn, name: "Seaborn" },
      { icon: excel, name: "Excel" },
      { icon: power, name: "Power BI" },
    ],
  },
  {
    category: "Frameworks & Libraries",
    skills: [
      { icon: react, name: "React" },
      { icon: redux, name: "Redux" },
      { icon: bootstrap, name: "Bootstrap" },
      { icon: tailwindcss, name: "TailwindCSS" },
      { icon: sass, name: "Sass" },
    ],
  },
  {
    category: "Tools & Platforms",
    skills: [
      { icon: github, name: "GitHub" },
      { icon: git, name: "Git" },
    ],
  },
  {
    category: "Languages",
    skills: [
      { icon: uz, name: "Uzbek" },
      { icon: en, name: "English" },
      { icon: ru, name: "Russian" },
    ],
  },
];

const Skills = () => (
  <SectionCard noPadding>
    <SectionHeader title="Skills" />
    <CardContent className="flex flex-col gap-6">
      {skillGroups.map((group, idx) => (
        <SkillGroup key={idx} category={group.category} skills={group.skills} />
      ))}
    </CardContent>
  </SectionCard>
);

export default Skills;
