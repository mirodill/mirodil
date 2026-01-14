import ContactItem from "./ContactItem";
import ContactForm from "./ContactForm";
import { CONTACT_INFO } from "@/data/contact-info";
import SectionCard from "@/components/common/SectionCard";
import SectionHeader from "@/components/common/SectionHeader";

const Contact = () => {
  return (
    <SectionCard noPadding>
      <SectionHeader title="Contact" />

      <div className="p-4 sm:p-6">
        <div className="mx-auto max-w-6xl grid grid-cols-1 gap-10 md:grid-cols-2">
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extralight">
              Don’t be shy
            </h2>

            <p className="text-muted-foreground text-sm sm:text-base">
              Feel free to get in touch with me. I am always open to new
              project ideas. Get in touch to organize and develop your
              business.
            </p>

            <div className="space-y-4">
              {CONTACT_INFO.map((item, i) => (
                <ContactItem key={i} {...item} />
              ))}
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </SectionCard>
  );
};

export default Contact;
