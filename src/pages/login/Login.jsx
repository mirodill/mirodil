import React, { useState, useEffect } from "react";
import axios from "axios";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

// URL manzilini o'zgarmas qilib belgilaymiz
const VERIFY_URL = "https://blog-api-uzfl.onrender.com/api/v1/auth/verify";

export default function Login() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 5 xonali kod bo'lishi bilan tekshirish
  useEffect(() => {
    if (otp.length === 5) {
      handleVerify(otp);
    }
  }, [otp]);

 const handleVerify = async (code) => {
    setLoading(true);
    setError("");
    try {
      // API ga so'rov yuborish
      const { data } = await axios.post(VERIFY_URL, { code });
      
      // Ma'lumotlarni saqlash
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // ROLE TEKSHIRISH
      // Agar role 'admin' bo'lsa dashboardga, aks holda bosh sahifaga
      if (data.user?.role === 'admin') {
        window.location.href = '/mirodil/dashboard'; // Admin uchun dashboard
      } else {
        window.location.href = '/mirodil/'; // Oddiy user uchun bosh sahifa
      }
      
    } catch (err) {
      setError(err.response?.data?.message || "Kod noto'g'ri kiritildi");
      setOtp(""); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#020817] text-white p-6">
      <h2 className="text-3xl font-bold mb-4">Kodni Kiriting</h2>

      <div className="text-center mb-10 space-y-2">
        <p className="text-gray-400 text-lg">
          <a 
            href="https://t.me/mirodil_blog_bot" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-white underline underline-offset-4 font-medium mr-2"
          >
            @mirodil_blog_bot
          </a>
          telegram botiga kiring va kodingizni oling.
        </p>
      </div>

      <div className="space-y-6 flex flex-col items-center">
        <InputOTP
          maxLength={5}
          value={otp}
          onChange={(value) => setOtp(value)}
          pattern={REGEXP_ONLY_DIGITS}
          disabled={loading}
        >
          <InputOTPGroup className="gap-3">
            {[...Array(5)].map((_, index) => (
              <InputOTPSlot
                key={index}
                index={index}
                className="w-14 h-20 text-2xl border-gray-700 bg-transparent rounded-xl focus:ring-2 focus:ring-blue-500 transition-all"
              />
            ))}
          </InputOTPGroup>
        </InputOTP>

        {loading ? (
          <div className="flex items-center text-blue-400">
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Tekshirilmoqda...
          </div>
        ) : (
          error && <p className="text-red-500 font-medium animate-pulse">{error}</p>
        )}
      </div>

      <Button 
        variant="ghost" 
        className="mt-12 text-gray-500 hover:text-white"
        onClick={() => setOtp("")}
        disabled={loading}
      >
        Kodni qayta kiritish
      </Button>
    </div>
  );
}