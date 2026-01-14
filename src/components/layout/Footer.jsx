import SectionCard from "../common/SectionCard";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <SectionCard noPadding>
      <p className="text-sm sm:text-md md:text-lg text-gray-600 dark:text-gray-400 text-center py-3 sm:py-4">
        {currentYear} © - All rights reserved.
      </p>
    </SectionCard>
  );
};

export default Footer;
