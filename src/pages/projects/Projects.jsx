import SectionCard from "@/components/common/SectionCard";
import SectionHeader from "@/components/common/SectionHeader";
import ProjectItem from "./ProjectItem";
import { CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Linkedin, Instagram, Github, Facebook } from "lucide-react";
import { FaKaggle } from "react-icons/fa";
import { SiPandas, SiPython, SiPostgresql, SiReact, SiRedux, SiTailwindcss } from "react-icons/si";

import project1 from "../../assets/images/project1.png";
import project2 from "../../assets/images/transactions.png";
import project3 from "../../assets/images/shop.png";



const PROJECTS = [
  {
    id: 1,
    title: "Loan Data Risk Analysis",
    description:
      "Analyzed loan datasets using Python to assess credit risk, identify high-risk borrowers, and generate actionable insights for financial decision-making.",
    image: project1,
    link: "https://github.com/mirodill/loan_data_risk_analysis",
    technologies: [
      { icon: SiPython, label: "Python" },
      { icon: SiPandas, label: "Pandas" },
      { icon: FaKaggle, label: "Kaggle" },

    ],
  },
  {
    id: 2,
    title: "Transaction Analysis",
    description:
      "Analyzed customer transactions using a Kaggle dataset; performed data cleaning, visualization, statistical analysis, and derived actionable insights.",
    image: project2,
    link: "https://github.com/mirodill/transaction-analysis",
    technologies: [
      { icon: SiPython, label: "Python" },
      { icon: SiPandas, label: "Pandas" },
      { icon: SiPostgresql, label: "PostgreSQL" },
    ],
  },
  {
    id: 3,
    title: "Shop-Line E-commerce",
    description:
      "Developed a responsive e-commerce web application using React, Redux, and Tailwind CSS. Implemented client-side routing with React Router, state management with Redux, and API integration using Axios. Enhanced user experience with React Toastify for notifications, Swiper for product carousels, and React Icons for intuitive UI elements. Unique product IDs were handled with UUID to ensure seamless cart and checkout functionality.",
    image: project3,
    link: "https://shopline-uz.netlify.app/",
    technologies: [
        { icon: SiReact, label: "React" },
      { icon: SiRedux, label: "Redux" },
      { icon: SiTailwindcss, label: "Tailwindcss" },
    ],
  },
];

const Projects = () => {
  return (
    <SectionCard noPadding>
      <SectionHeader title="Projects" />
      <Separator className="my-4" />

      <CardContent className="flex flex-col gap-6">
        {PROJECTS.map((project) => (
          <ProjectItem key={project.id} {...project} />
        ))}
      </CardContent>
    </SectionCard>
  );
};

export default Projects;
