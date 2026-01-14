import SectionCard from "@/components/common/SectionCard";
import SectionHeader from "@/components/common/SectionHeader";
import ProjectItem from "./ProjectItem";
import { CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Linkedin, Instagram, Github, Facebook } from "lucide-react";
import project1 from "../../assets/images/project1.png";

const PROJECTS = [
  {
    id: 1,
    title: "Loan Data Risk Analysis",
    description:
      "Analyzed loan datasets using Python to assess credit risk, identify high-risk borrowers, and generate actionable insights for financial decision-making.",
    image: project1,
    link: "https://github.com/username/loan-data",
    technologies: [
      { icon: Github, label: "GitHub" },
      { icon: Linkedin, label: "LinkedIn" },
    ],
  },
  {
    id: 2,
    title: "Personal Portfolio Website",
    description:
      "React, Tailwind CSS va ShadCN UI yordamida yaratilgan zamonaviy va responsive portfolio web sayt.",
    image: project1,
    link: "https://yourportfolio.com",
    technologies: [
      { icon: Instagram, label: "Instagram" },
      { icon: Facebook, label: "Facebook" },
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
