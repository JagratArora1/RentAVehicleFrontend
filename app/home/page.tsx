"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import TypewriterComponent from "typewriter-effect";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

/* Font */
const font = Montserrat({
  weight: "600",
  subsets: ["latin"],
});

/* Navbar with Dropdown */
const LandingNavbar = () => {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token && role) {
      setUserRole(role);
    }
  }, []);

  return (
    <nav className="p-4 bg-transparent flex items-center justify-between">
      <Link href="/" className="flex items-center">
        <div className="relative h-8 w-8 mr-8">
          <Image fill alt="Logo" src="/logo.jpg" />
        </div>
        <h1 className={cn("text-3xl font-extrabold bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent animate-pulse",
    font.className
  )}>
          Elite Wheels
        </h1>
      </Link>

      <div className="relative">
        {userRole ? (
          <Link href={userRole === "admin" ? "/admin" : "/user"}>
            <Button variant="outline" className="rounded-full">
              Dashboard
            </Button>
          </Link>
        ) : (
          <div>
            <Button
              variant="premium"
              className="rounded-full"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              Get Started
            </Button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg z-10">
                <button
                  onClick={() => (window.location.href = "/signup")}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                >
                  Sign Up as User
                </button>
                <button
                  onClick={() => (window.location.href = "/login?role=admin")}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                >
                  Login as Admin
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

/* Home Page */
const Home = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-800 to-purple-500 text-white font-bold">
      {/* Navbar */}
      <LandingNavbar />

      {/* Hero Section */}
      <div className="py-20 text-center space-y-8 relative">
        {/* Headings */}
        <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
          <h1>The Best Vehicle Rental Service</h1>
          <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-400">
            <TypewriterComponent
              options={{
                strings: [
                  "Luxury Cars",
                  "Affordable Rentals",
                  "Instant Booking",
                  "Premium Support",
                ],
                autoStart: true,
                loop: true,
              }}
            />
          </div>
        </div>

        {/* Subtext */}
        <div className="text-sm md:text-xl font-light text-zinc-200">
          Rent your dream Vehicle with ease.
        </div>

        {/* Start Renting Now with Dropdown */}
        <div className="relative">
          <Button
            variant="default"
            className="md:text-lg p-4 md:p-6 rounded-full font-semibold bg-purple-600 hover:bg-purple-700 transition"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            Start Renting Now
          </Button>

          {dropdownOpen && (
            <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-56 bg-white text-black rounded shadow-lg z-10">
              <button
                onClick={() => (window.location.href = "/login")}
                className="block w-full text-left px-4 py-2 hover:bg-gray-200"
              >
                Login as User
              </button>
              {/* <button
                onClick={() => (window.location.href = "/login?role=admin")}
                className="block w-full text-left px-4 py-2 hover:bg-gray-200"
              >
                Login as Admin
              </button> */}
            </div>
          )}
        </div>
      </div>

      {/* Founders Section */}
      <div className="py-16 text-center">
        <h2 className="text-3xl font-bold text-white mb-8">Founders</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 px-4">
          {[
            { name: "Jagrat", role: "Frontend Developer", image: "/founder1.jpg"},
            { name: "Akshat", role: "DBA", image: "/founder2.jpg" },
            { name: "Shambhavi", role: "Backend Developer", image: "/founder3.jpg" },
            { name: "Durga", role: "Backend Developer", image: "/founder4.jpg" },
            { name: "Saumyajit", role: "DBA", image: "/founder5.jpg" },
          ].map((founder, index) => (
            <Card
              key={index}
              className="bg-gradient-to-br from-purple-300/20 to-purple-700/20 shadow-xl rounded-xl overflow-hidden transform transition duration-300 hover:scale-105"
            >
              <CardHeader className="flex flex-col items-center justify-center pt-6">
                <div className="relative w-24 h-24">
                  <Image
                    src={founder.image}
                    alt={founder.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full border-4 border-purple-400 shadow-lg"
                  />
                </div>
              </CardHeader>
              <CardContent className="text-center pb-6">
                <CardTitle className="text-white text-xl">{founder.name}</CardTitle>
                <p className="text-gray-300">{founder.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;