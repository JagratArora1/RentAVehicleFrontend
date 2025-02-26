"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircleIcon, XCircleIcon, MailIcon, PhoneIcon, LockIcon, UserIcon } from "lucide-react";
import { motion } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "user";

  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const passwordsMatch = formData.password && formData.password === formData.confirmPassword;

  useEffect(() => {
    document.title = role === "admin" ? "Admin Signup" : "User Signup";
  }, [role]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordsMatch) {
      toast.error("Passwords do not match!");
      return;
    }

    if (!captchaToken) {
      toast.error("Please verify the reCAPTCHA!");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      localStorage.setItem("token", "mocked_jwt_token");
      localStorage.setItem("role", role);
      setIsLoading(false);
      toast.success(`${role === "admin" ? "Admin" : "User"} signup successful!`);
      router.replace(role === "admin" ? "/admin" : "/user");
    }, 3500);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 via-blue-500 to-purple-800">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 p-8 bg-white/50 backdrop-blur-xl shadow-2xl rounded-xl w-full max-w-xl"
      >
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-4xl font-extrabold mb-6 text-center text-purple-700"
        >
          {role === "admin" ? "Admin Signup" : "User Signup"}
        </motion.h1>

        <div className="space-y-4">
          {[
            { name: "username", icon: UserIcon, placeholder: "Full Name" },
            { name: "email", icon: MailIcon, placeholder: "Email" },
            { name: "mobile", icon: PhoneIcon, placeholder: "Mobile Number" },
            { name: "password", icon: LockIcon, placeholder: "Create Password" },
            { name: "confirmPassword", icon: LockIcon, placeholder: "Confirm Password" },
          ].map((field, index) => (
            <motion.div
              key={field.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="relative"
            >
              <field.icon className="absolute left-3 top-3 text-gray-500" size={20} />
              <input
                type={field.name.includes("password") ? "password" : "text"}
                name={field.name}
                placeholder={field.placeholder}
                value={formData[field.name as keyof typeof formData]}
                onChange={handleChange}
                className="w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-purple-500"
                required
              />
              {field.name === "confirmPassword" && formData.confirmPassword && (
                <span className="absolute inset-y-0 right-3 flex items-center">
                  {passwordsMatch ? (
                    <CheckCircleIcon className="text-green-500" size={24} />
                  ) : (
                    <XCircleIcon className="text-red-500" size={24} />
                  )}
                </span>
              )}
            </motion.div>
          ))}

          {/* reCAPTCHA Field */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex justify-center mt-4"
          >
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
              onChange={handleCaptchaChange}
            />
          </motion.div>

          {/* Signup Button with Car Animation */}
          <motion.div className="relative mt-6">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isLoading}
              className="w-full bg-purple-700 text-white p-3 rounded-lg min-h-[50px] relative overflow-hidden"
            >
              {!isLoading ? (
                "Sign Up"
              ) : (
                <>
                  <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 2.5, ease: "easeInOut" }}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full flex items-center justify-start"
                  >
                    <div className="emote">🚗💨</div>
                  </motion.div>
                </>
              )}
            </motion.button>

            {isLoading && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 2.5 }}
                className="flex justify-center mt-2 text-green-600"
              >
                ✅ Signup Successful!
              </motion.div>
            )}
          </motion.div>

          <p className="mt-4 text-center text-gray-700">
            Already have an account?{" "}
            <span
              className="text-purple-600 cursor-pointer underline"
              onClick={() => router.push(`/login?role=${role}`)}
            >
              Log in
            </span>
          </p>
        </div>
      </motion.form>
    </div>
  );
}