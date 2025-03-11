"use client";

import { useEffect, useState } from "react";
import { Montserrat } from "next/font/google";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { LogOut, PlusCircle, BarChart, Star, ExternalLink, Users, Car, User, File, IndianRupee, CarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
const font = Montserrat({
  weight: "600",
  subsets: ["latin"],
});
const data = [
  { month: "Jan", current: 230000, lastYear: 120000 },
  { month: "Feb", current: 160000, lastYear: 120000 },
  { month: "Mar", current: 200000, lastYear: 120000 },
  { month: "Apr", current: 290000, lastYear: 120000 },
  { month: "May", current: 220000, lastYear: 120000 },
  { month: "Jun", current: 270000, lastYear: 150000 },
  { month: "Jul", current: 210000, lastYear: 160000 },
  { month: "Aug", current: 250000, lastYear: 180000 },
  { month: "Sep", current: 260000, lastYear: 190000 },
  { month: "Oct", current: 280000, lastYear: 200000 },
  { month: "Nov", current: 220000, lastYear: 120000 },
  { month: "Dec", current: 220000, lastYear: 120000 },
];
interface SidebarItemProps {
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  active: boolean;
  onClick: () => void;
}
//p-6 rounded-lg shadow-md flex items-center gap-4
const SidebarItem: React.FC<SidebarItemProps> = ({ label, icon: Icon, active, onClick }) => (
  <div
    className={cn(
      "flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition duration-300 text-black",
      active ? "bg-blue-600 text-white" : "hover:bg-blue-600 text-black"
    )}
    onClick={() => {
      if (label === "Crisp Dashboard") {
        window.open("https://app.crisp.chat/website/f8d6420e-9f9b-4b93-b1f7-70cca5d6ad09/inbox/", "_blank");
      } else {
        onClick();
      }
    }}
  >
    <Icon className="w-5 h-5" />
    <span className="text-sm font-medium">{label}</span>
  </div>
);

export default function AdminDashboard() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
  
    if (!token || role !== "admin") {
      setIsAuthorized(false);
      
      const timeout = setTimeout(() => {
        router.replace("/");
      }, 60000); // Redirect after 1 minute
  
      return () => clearTimeout(timeout); // Cleanup if component unmounts before timeout
    } else {
      setIsAuthorized(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    toast.success("Logged out successfully!");
    router.replace("/");
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
  const navigateTo = (path: string) => {
    router.push(path);
  };

  const sidebarItems = [
    { label: "Vehicle Details", icon: CarIcon, path: "/admin/dashboard" },
    { label: "Add a New Vehicle", icon: PlusCircle, path: "/admin/add-vehicle" },
    { label: "Upload Documents", icon: File, path: "/admin/upload-documents" },
    { label: "Revenue P&L", icon: BarChart, path: "/admin/revenue" },
    // { label: "Vehicle Reviews", icon: Star, path: "/admin/reviews" },
    { label: "Users", icon: User, path: "/admin/users" },
    { label: "Crisp Dashboard", icon: ExternalLink, path: "https://app.crisp.chat/" },
  ];

  return (
    <div className="flex h-full text-white">
      
      <aside className="w-64 bg-white p-6 flex flex-col gap-6 shadow-lg">
        <div className="text-xl font-bold flex items-center gap-2 cursor-pointer" onClick={() => router.push("/")}> 
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.jpg" alt="Elite Wheels Logo" className="w-8 h-8" /> 
          <h1 className={cn("text-xl font-extrabold bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent animate-pulse",
              font.className
            )}>ELITE WHEELS</h1>
        </div>
        <nav className="w-full flex flex-col gap-2 rounded-lg shadow-md bg-gray-100 hover:bg-gray-200 text-gray-700 transition-all duration-200 border border-gray-300">
          {sidebarItems.map((item) => (
            <SidebarItem
              key={item.label}
              label={item.label}
              icon={item.icon}
              active={activeTab === item.label}
              onClick={() => navigateTo(item.path)}
            />
          ))}
          

        </nav>
      </aside>
      <div className="flex-1 flex flex-col">
        <header className="fixed top-0 left-64 right-0 flex items-center justify-between px-6 py-4 shadow-md z-10 border-b border-gray-700">
          <Button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 flex items-center gap-2 px-4 py-2 rounded-lg shadow ml-auto">
            <LogOut className="w-5 h-5" /> Logout
          </Button>
        </header>
        <main className="p-8 flex-1 rounded-lg shadow-lg mt-16">
          <h2 className="text-2xl font-semibold mb-6 text-black">Analytics</h2>
          {/* Analytics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            <div className=" p-6 rounded-lg shadow-md flex items-center gap-4">
              <Users className="w-10 h-10 text-blue-400" />
              <div>
                <p className="text-black text-lg font-semibold">12</p>
                <p className="text-black">Total Users</p>
              </div>
            </div>
            <div className="text-black p-6 rounded-lg shadow-md flex items-center gap-4">
              <Car className="w-10 h-10 text-green-400" />
              <div>
                <p className="text-lg font-semibold">25</p>
                <p className="text-black">Total Bookings</p>
              </div>
            </div>
            <div className=" p-6 rounded-lg shadow-md flex items-center gap-4">
              <IndianRupee className="w-10 h-10 text-yellow-400" />
              <div>
                <p className="text-black text-lg font-semibold">₹23,20,400</p>
                <p className="text-black">Revenue This Month</p>
              </div>
            </div>
            <div className=" p-6 rounded-lg shadow-md flex items-center gap-4">
              <Star className="w-10 h-10 text-purple-400" />
              <div>
                <p className="text-black text-lg font-semibold">4.8</p>
                <p className="text-black">Average Rating</p>
              </div>
            </div>
            <div className=" p-6 rounded-lg shadow-md lg:col-span-4 w-full">
            <h2 className="text-black text-lg font-bold mb-4">Earning Summary</h2>
            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%" className="text-black">
                <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 10 }}>
                  <XAxis dataKey="month" stroke="black" />
                  <YAxis stroke="black" />
                  <Tooltip />
                  <Line type="monotone" dataKey="current" stroke="black" strokeWidth={3} dot={false} />
                  <Line type="monotone" dataKey="lastYear" stroke="blue" strokeWidth={2} dot={false} strokeDasharray="5 5" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          </div>
        </main>
      </div>
    </div>
  );
}

