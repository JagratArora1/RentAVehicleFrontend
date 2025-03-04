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


// Mock Data for Vehicles
type Vehicle = {
  name: string;
  price: string;
  img: string;
};

const vehicles: Record<string, Vehicle[]> = {
  premium: [
    { name: "Jaguar XE", price: "₹20000/day", img: "https://rentavehicleimages.s3.ap-south-1.amazonaws.com/Jaguar+XE.jpg" },
    { name: "BMW 3 Series", price: "₹18000/day", img: "https://rentavehicleimages.s3.ap-south-1.amazonaws.com/BMW+3+Series.jpg" },
    { name: "Ninja 300", price: "₹1500/day", img: "https://rentavehicleimages.s3.ap-south-1.amazonaws.com/Ninja-300-front-static.jpg" },
  ],
  affordable: [
    { name: "Ola S1 pro", price: "₹350/day", img: "https://rentavehicleimages.s3.ap-south-1.amazonaws.com/Ola-S1-Pro.jpg" },
    { name: "Honda Activa 6G", price: "₹400/day", img: "https://rentavehicleimages.s3.ap-south-1.amazonaws.com/Honda+Activa+6G.jpg" },
    { name: "Maruti Suzuki", price: "₹1800/day", img: "https://rentavehicleimages.s3.ap-south-1.amazonaws.com/marutisuzuki.jpg" },
  ],
  mostRented: [
    { name: "Ather 450X", price: "₹450/day", img: "https://rentavehicleimages.s3.ap-south-1.amazonaws.com/Ather+450X.jpg" },
    { name: "Honda City", price: "₹4500/day", img: "https://rentavehicleimages.s3.ap-south-1.amazonaws.com/Honda+City.jpg" },
    { name: "Hyundai Creta", price: "₹7000/day", img: "https://rentavehicleimages.s3.ap-south-1.amazonaws.com/Hyundai+Creta.jpg" },
  ],
};


const font = Montserrat({
  weight: "600",
  subsets: ["latin"],
});


export default function UserDashboard() {
  const router = useRouter();

  // Logout Function with Toast Notification
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    toast.success("Logged out successfully!"); // Success Toast
    router.push("/login"); // Redirect to login page
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
  {/* Toast Notifications */}
  <Toaster position="top-center" />

  {/* Full-width Top Navbar */}
  <header className="w-full px-4 sm:px-6 lg:px-8 py-4 shadow-md bg-white flex justify-between items-center">
    <Link href="/home" className="flex items-center">
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
          <AvatarImage src="/user-avatar.png" alt="User" />
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