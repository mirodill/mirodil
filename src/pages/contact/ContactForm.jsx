import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import AppButton from "@/components/common/AppButton";
import { Loader2, Send } from "lucide-react";
import { toast } from "sonner";

const TELEGRAM_BOT_TOKEN = "8570260978:AAFOGPdIkJN5pqYhQSEcs5zH1fjrUEZIWeM";
const TELEGRAM_CHAT_ID = "7426068368";

const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });
  const [phoneError, setPhoneError] = useState("");

  const uzPhoneRegex = /^(\+998|998)?(9[0-9])[0-9]{7}$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "phone") setPhoneError(""); // input o‘zgarganda errorni olib tashlash
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.message) {
      toast.error("Barcha maydonlarni to‘ldiring");
      return;
    }

    const cleanPhone = formData.phone.replace(/\D/g, "");
    const formattedPhone = cleanPhone.startsWith("998") ? cleanPhone : "998" + cleanPhone;

    if (!uzPhoneRegex.test(formattedPhone)) {
      setPhoneError("Telefon raqam noto‘g‘ri. +998901234567 ko‘rinishida bo‘lishi kerak");
      return;
    }

    setLoading(true);

    const text = `
📩 New Contact Message

👤 Name: ${formData.name}
📞 Phone: ${formData.phone}
💬 Message:
${formData.message}
    `;

    try {
      const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text }),
      });

      const data = await res.json();
      if (!data.ok) throw new Error(data.description);

      toast.success("Xabar muvaffaqiyatli yuborildi 🚀");
      setFormData({ name: "", phone: "", message: "" });
    } catch (err) {
      console.error(err);
      toast.error("Xatolik yuz berdi. Qayta urinib ko‘ring ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-2 p-4 sm:p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="name"
          placeholder="Your name"
          value={formData.name}
          onChange={handleChange}
        />

        <div className="flex flex-col">
          <Input
            name="phone"
            placeholder="+998901234567"
            value={formData.phone}
            onChange={handleChange}
            className={phoneError ? "border-red-500" : ""}
          />
          {phoneError && <span className="text-red-500 text-sm mt-1">{phoneError}</span>}
        </div>

        <Textarea
          name="message"
          placeholder="Your message"
          rows={6}
          value={formData.message}
          onChange={handleChange}
          className="h-40"
        />
        <AppButton type="submit" loading={loading}>
          {loading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Send className="h-4 w-4" />
              Send Message
            </span>
          )}
        </AppButton>
      </form>
    </Card>
  );
};

export default ContactForm;
