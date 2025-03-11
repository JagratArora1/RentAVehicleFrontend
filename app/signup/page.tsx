"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircleIcon, XCircleIcon, MailIcon, PhoneIcon, LockIcon, UserIcon, HomeIcon } from "lucide-react";
import { motion } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha";
import toast from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";

const isValidEmail = (email: string) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
const isValidMobile = (mobile: string) => /^[0-9]{10}$/.test(mobile);
const isStrongPassword = (password: string) =>
  /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(password);
const isValidAddress = (address: string) => address.trim().length >= 5;
function SignupPageContent() {
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
    address: ""
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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);
  const formFields = [
    { name: "username", icon: UserIcon, placeholder: "Full Name" },
    { name: "email", icon: MailIcon, placeholder: "Email" },
    { name: "mobile", icon: PhoneIcon, placeholder: "Mobile Number" },
    { name: "password", icon: LockIcon, placeholder: "Create Password", isPassword: true },
    { name: "confirmPassword", icon: LockIcon, placeholder: "Confirm Password", isPassword: true },
    { name: "address", icon: HomeIcon, placeholder: "Address..." },
  ];
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.username.trim()) {
      return toast.error("Please enter your full name.");
    }
    if (!isValidEmail(formData.email)) {
      return toast.error("Invalid email format.");
    }
    if (!isValidMobile(formData.mobile)) {
      return toast.error("Mobile number must be 10 digits.");
    }
    if (!isStrongPassword(formData.password)) {
      return toast.error("Password must be at least 8 characters long, include an uppercase letter, a number, and a special character.");
    }
    if (!passwordsMatch) {
      return toast.error("Passwords do not match!");
    }
    if (!isValidAddress(formData.address)) {
      return toast.error("Address must be at least 5 characters long.");
    }
    if (!captchaToken) {
      return toast.error("Please verify the reCAPTCHA!");
    }
    if (!captchaToken) {
      toast.error("Please verify the reCAPTCHA!");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("https://web-production-7c280.up.railway.app/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName: formData.username,
            email: formData.email,
            passwordHash: formData.password,
            contactNumber: formData.mobile,
            address: formData.address,
            role: "Customer"

          })
        }
      )
      const data = await res.json();
      if (data.status == "success") {
        toast.success(data.message);
        setTimeout(() => {
          setIsLoading(false);
          router.replace("/login"); // Redirecting to the login page after successful signup
        }, 1500);
      } else {
        toast.error(data.message);
        setIsLoading(false);
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    } catch (error: any) {
      toast.error("An error occurred during signup.");
      setIsLoading(false);
    }    
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        localStorage.setItem("token", "mocked_jwt_token");
        localStorage.setItem("role", role);
        setIsLoading(false);
        toast.success(`${role === "admin" ? "Admin" : "User"} signup successful!`);
        router.replace(role === "admin" ? "/admin" : "/login");
      }, 3500);
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
          {role === "admin" ? "Admin Signup" : "User Signup"}
        </motion.h1>

        <div className="space-y-4">
        {formFields.map((field) => (
      <motion.div
        key={field.name}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative"
      >
        {/* Icon */}
        <field.icon className="absolute left-3 top-3 text-gray-500" size={20} />
        
        {/* Input */}
        <input
          type={
            field.name === "password"
              ? showPassword
                ? "text"
                : "password"
              : field.name === "confirmPassword"
                ? showConfirmPassword
                  ? "text"
                  : "password"
                : "text"
          }
          name={field.name}
          placeholder={field.placeholder}
          value={formData[field.name as keyof typeof formData]}
          onChange={handleChange}
          autoComplete="off"
          className="w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-purple-500"
          required
        />

        {/* Toggle Button for Password and Confirm Password */}
        {field.isPassword && (
          <span
            className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
            onClick={
              field.name === "password"
                ? togglePasswordVisibility
                : toggleConfirmPasswordVisibility
            }
          >
            {field.name === "password"
              ? showPassword
                ? "👁️"
                : "🙈"
              : showConfirmPassword
                ? "👁️"
                : "🙈"}
          </span>
        )}

        {/* Match Indicator for Confirm Password */}
        {field.name === "confirmPassword" && formData.confirmPassword && (
          <span className="absolute inset-y-0 right-10 flex items-center">
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


export default function SignupPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignupPageContent />
    </Suspense>
  );
}