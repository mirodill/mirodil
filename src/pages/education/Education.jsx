import React from "react";
import SectionCard from "@/components/common/SectionCard";
import SectionHeader from "@/components/common/SectionHeader";
import Timeline from "./Timeline";

const timelineData = [
  {
    date: "Sep 2013 – May 2024",
    title: "High School Graduate",
    subtitle: "High School",
  },
  {
    date: "Apr 2023 – Sep 2023",
    title: "Frontend Developer",
    subtitle: "Najot Ta'lim",
  },
  {
    date: "Sep 2024 – May 2028",
    title: "Software Engineering",
    subtitle: "University of Science and Technologies",
  },
];

const Education = () => {
  return (
    <SectionCard noPadding>
      <SectionHeader title="Education" />
      <div className="px-4 sm:px-6 md:px-8">
        <Timeline items={timelineData} />
      </div>
    </SectionCard>
  );
};

export default Education;
