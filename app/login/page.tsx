"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MailIcon, LockIcon } from "lucide-react";
import { motion } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha";
import toast from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "user";
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    document.title = role === "admin" ? "Admin Login" : "User Login";
  }, [role]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validate fields on change
    if (name === "email") {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        setErrors((prev) => ({ ...prev, email: "Invalid email format" }));
      } else {
        setErrors((prev) => ({ ...prev, email: "" }));
      }
    }

    if (name === "password") {
      if (value.length < 8) {
        setErrors((prev) => ({
          ...prev,
          password: "Password must be at least 8 characters",
        }));
      } else {
        setErrors((prev) => ({ ...prev, password: "" }));
      }
    }
  };
  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (errors.email || errors.password) {
      toast.error("Please fix the errors before submitting.");
      return;
    }
    if (!captchaToken) {
      toast.error("Please verify the reCAPTCHA!");
      return;
    }

    setIsLoading(true);

    const endpoint =
      role === "admin"
        ? "http://localhost:2237/auth/admin/login"
        : "http://localhost:2237/auth/customer/login";

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          passwordHash: formData.password,
        }),
      });

      const data = await res.json();

      if (data.status === "error") {
        toast.error("Login failed! Invalid credentials.");
      } else if (data.status === "success") {
        localStorage.setItem("token", data.token || data.message);
        localStorage.setItem("role", role);
        if (data.userId) {
          localStorage.setItem("userId", data.userId);
        } else {
          console.warn("Warning: userId not received in response!");
        }
  
        toast.success(`${role === "admin" ? "Admin" : "User"} login successful!`);
        router.replace(role === "admin" ? "/admin" : "/user");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred during login.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 via-blue-500 to-purple-800">
      <header className="absolute top-0 left-0 w-full px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center z-20">
        <Link href="/home" className="flex items-center">
          <div className="relative h-8 w-8 mr-4">
            <Image fill alt="Logo" src="/logo.jpg" />
          </div>
        </Link>
      </header>
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
          {role === "admin" ? "Admin Login" : "User Login"}
        </motion.h1>

        <div className="space-y-4">
          {[
            { name: "email", icon: MailIcon, placeholder: "Email" },
            { name: "password", icon: LockIcon, placeholder: "Password" },
          ].map((field, index) => (
            <motion.div
              key={field.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="relative"
            >
              <field.icon
                className="absolute left-3 top-3 text-gray-500"
                size={20}
              />
              <input
                type={field.name === "password" ? "password" : "text"}
                name={field.name}
                placeholder={field.placeholder}
                value={formData[field.name as keyof typeof formData]}
                onChange={handleChange}
                className="w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-purple-500"
                required
              />
              {errors[field.name as keyof typeof errors] && (
              <p className="text-red-500 text-sm mt-1">
                {errors[field.name as keyof typeof errors]}
              </p>
            )}
            </motion.div>
          ))}

          {/* reCAPTCHA Field */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex justify-center mt-4"
          >
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
              onChange={handleCaptchaChange}
            />
          </motion.div>
          {/* Login Button with Car Animation */}
          <motion.div className="relative mt-6">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isLoading}
              className="w-full bg-purple-700 text-white p-3 rounded-lg min-h-[50px] relative overflow-hidden"
            >
              {!isLoading ? (
                "Log In"
              ) : (
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2.5, ease: "easeInOut" }}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full flex items-center justify-start"
                >
                  <div className="emote">🚗💨</div>
                </motion.div>
              )}
            </motion.button>

            {isLoading && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 2.5 }}
                className="flex justify-center mt-2 text-green-600"
              >
                Attempting to log in...
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Hide Signup Link for Admin */}
        {role !== "admin" && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center text-gray-600 mt-4"
          >
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-purple-600 hover:underline">
              Sign up
            </Link>
          </motion.p>
        )}
      </motion.form>
    </div>
  );
}