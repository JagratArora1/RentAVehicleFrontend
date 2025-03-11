/* eslint-disable @next/next/no-img-element */
"use client";

import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { LogOut, Car, Bike } from "lucide-react";
import { Montserrat } from "next/font/google";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";


// Mock Data for Vehicles
type Vehicle = {
  name: string;
  price: string;
  img: string;
};

const vehicles: Record<string, Vehicle[]> = {
  premium: [
    { name: "Jaguar XE", price: "₹20000/day", img: "https://rentvehicledoc.s3.ap-south-1.amazonaws.com/beff88ac-1550-4249-9bf0-507e9a0c450b-Jaguar+XE.jpg" },
    { name: "BMW 3 Series", price: "₹18000/day", img: "https://rentvehicledoc.s3.ap-south-1.amazonaws.com/1354d4a3-f35a-4753-9294-f144f1658bc5-BMW+3+Series.jpg" },
    { name: "Ninja 300", price: "₹1500/day", img: "https://rentvehicledoc.s3.ap-south-1.amazonaws.com/5e5d1be1-8065-44a9-97c8-cf0c77fd4a4d-Ninja300.jpg" },
  ],
  affordable: [
    { name: "Ola S1 pro", price: "₹350/day", img: "https://rentvehicledoc.s3.ap-south-1.amazonaws.com/2a53e770-0c15-4287-b979-0c47d33bc0c5-Ola-S1-Pro.jpg" },
    { name: "Honda Activa 6G", price: "₹400/day", img: "https://rentvehicledoc.s3.ap-south-1.amazonaws.com/662e3492-8e8c-4d97-88a5-c5f6cbbf5f32-Honda+Activa+6G.jpg" },
    { name: "Maruti Suzuki", price: "₹1800/day", img: "https://rentvehicledoc.s3.ap-south-1.amazonaws.com/a070cc5c-4c3f-4bd7-bebd-21f97fee9757-marutisuzuki.jpg" },
  ],
  mostRented: [
    { name: "Ather 450X", price: "₹450/day", img: "https://rentvehicledoc.s3.ap-south-1.amazonaws.com/54da271b-d03c-4995-be3d-289eaa1b89b0-Ather+450X.jpg" },
    { name: "Honda City", price: "₹4500/day", img: "https://rentvehicledoc.s3.ap-south-1.amazonaws.com/4a34d0f1-7172-499e-8657-d69bd98a6c7e-Honda+City.jpg" },
    { name: "Hyundai Creta", price: "₹7000/day", img: "https://rentvehicledoc.s3.ap-south-1.amazonaws.com/5abecc43-f5ce-409e-9df2-ea1e45ff7b37-Hyundai+Creta.jpg" },
  ],
};


const font = Montserrat({
  weight: "600",
  subsets: ["latin"],
});


export default function UserDashboard() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    
    if (!token || role !== "user") {
      setIsAuthorized(false);
      const timeout = setTimeout(() => {
        router.replace("/");
      }, 60000);
      return () => clearTimeout(timeout);
    } else {
      setIsAuthorized(true);
    }
  },[]);

  // Logout Function with Toast Notification
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    toast.success("Logged out successfully!"); // Success Toast
    router.push("/login"); // Redirect to login page
  };
  if (isAuthorized === null) {
    return <p className="text-center text-gray-500 mt-10">Checking Authorization...</p>;
  }

  if (!isAuthorized) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold text-red-500">403 Forbidden</h1>
        <p className="text-lg text-gray-600">You are not authorized to access this page.</p>
      </div>
    );
  }
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
  {/* Toast Notifications */}
  <Toaster position="top-center" />

  {/* Full-width Top Navbar */}
  <header className="w-full px-4 sm:px-6 lg:px-8 py-4 shadow-md bg-white flex justify-between items-center">
    <Link href="/user" className="flex items-center">
      <div className="relative h-8 w-8 mr-4">
        <Image fill alt="Logo" src="/logo.jpg" />
      </div>
      <h1
        className={cn(
          "text-3xl font-extrabold bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent animate-pulse",
          font.className
        )}
      >
        Elite Wheels
      </h1>
    </Link>

    {/* Profile Dropdown */}
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src="/avatar.jpg" alt="User" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => router.push("/profile")}>Profile</DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/bookings")}>My Bookings</DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/about")}>About Us</DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/terms")}>Terms & Conditions</DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/contact")}>Contact Us</DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout} className="text-red-500">
          <LogOut className="w-4 h-4 mr-2" /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </header>

  {/* Main Content */}
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    {/* Vehicle Categories */}
    <div className="flex justify-center space-x-4 my-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <Bike className="mr-2" /> Two Wheelers
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {["E-Scooty", "Scooty", "Sports Bike", "Bike"].map((item) => (
            <DropdownMenuItem key={item} onClick={() => router.push(`/vehicles/${item.toLowerCase().replace(/[\s-]/g, "_")}`)}>
              {item}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <Car className="mr-2" /> Four Wheelers
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {["Sedan", "Hatchback", "XUV", "Premium Cars"].map((item) => (
            <DropdownMenuItem key={item} onClick={() => router.push(`/vehicles/${item.toLowerCase().replace(" ", "_")}`)}>
              {item}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>

    {/* Vehicle Listings */}
    {["Premium Vehicles", "Affordable Vehicles", "Most Rented Vehicles"].map((category, index) => (
      <section key={category} className="mb-8">
        <h2 className="text-lg font-semibold mb-4">{category}</h2>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {(vehicles[Object.keys(vehicles)[index] as keyof typeof vehicles] ?? []).map((vehicle: Vehicle) => (
            <Card key={vehicle.name} className="shadow-lg hover:scale-105 transition rounded-lg">
              <CardHeader>
                <CardTitle>{vehicle.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <img src={vehicle.img} alt={vehicle.name} className="rounded-lg mb-2 w-full h-40 object-cover" />
                <p className="text-gray-700">{vehicle.price}</p>
                  <Link
                    href={{
                      pathname: "/booknow",
                      query: {
                        name: vehicle.name,
                        image: vehicle.img,
                        price: vehicle.price.replace("₹", "").replace("/day", ""), // Clean price
                      },
                    }}
                >
                  
                  <Button variant="default" className="mt-2 w-full">
                    Book Now
                  </Button>
                  
                  </Link>
                
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </section>
    ))}
  </div>

  {/* Footer */}
  <Footer />
</div>

  );
}


