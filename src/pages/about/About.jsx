import React from "react";
import { Separator } from "@/components/ui/separator";
import AboutImage from "./AboutImage";
import AboutDetails from "./AboutDetails";
import AboutBio from "./AboutBio";
import me from '../../assets/images/me.jpg';
import SectionCard from "@/components/common/SectionCard";
import SectionHeader from "@/components/common/SectionHeader";

const profileData = {
  name: "Data Analyst | Frontend Developer",
  details: [
    { label: "Birthday", value: "23.06.2006" },
    { label: "Website", value: "mirodil.codes" },
    { label: "Phone", value: "+998 93 421 16 23" },
    { label: "City", value: "Tashkent, Uzbekistan" },
    { label: "Age", value: "19" },
    { label: "Degree", value: "Bachelor" },
    { label: "Email", value: "mirodil.dev@gmail.com" },
    { label: "Freelance", value: "Available" },
  ],
  bio: `I’m a Junior Data Analyst with skills in Python, Pandas, NumPy, SQL, Power BI, Matplotlib, and Seaborn. I enjoy turning raw data into meaningful insights, building dashboards, and exploring patterns that help make data-driven decisions. I am constantly learning new tools and working on real-world data projects to improve my analytical and problem-solving abilities.`,
  image: me,
};

const About = () => {
  return (
    <SectionCard noPadding>
      <SectionHeader title="About me" />

      <div className="container mx-auto flex flex-col md:flex-row items-start gap-8 p-4 sm:p-6">
        {/* Profile Image */}
        <AboutImage src={profileData.image} alt={profileData.name} />

        {/* Details + Bio */}
        <div className="w-full md:w-2/3">
          <h1 className="text-xl sm:text-2xl font-semibold mb-4">
            {profileData.name}
          </h1>

          {/* Profile Details */}
          <AboutDetails details={profileData.details} />

          <Separator className="my-4 border-dashed" />

          {/* Bio */}
          <AboutBio text={profileData.bio} />
        </div>
      </div>
    </SectionCard>
  );
};

export default About;
