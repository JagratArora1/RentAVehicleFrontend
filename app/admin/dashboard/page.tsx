"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AdminDashboard() {
  const router = useRouter();
  const [vehicles, setVehicles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch vehicles from backend
  useEffect(() => {
    const fetchVehicles = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch("http://localhost:2237/vehicles/all");
        const data = await response.json();
        console.log(data);
        setVehicles(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setError(error.message);
        toast.error("Error fetching vehicles!");
      } finally {
        setLoading(false);
      }
    };
    fetchVehicles();
  }, []);
  // Filter vehicles based on search input
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filteredVehicles = vehicles.filter((vehicle: any) =>
    searchQuery
      ? vehicle.vehicleNo.toLowerCase().includes(searchQuery.toLowerCase()) || // Search by vehicle number
        vehicle.vehicleId?.toString().includes(searchQuery) || // Search by vehicle ID
        vehicle.modelName.toLowerCase().includes(searchQuery.toLowerCase()) // Search by model name
      : true
  );
  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className="p-6 bg-white min-h-screen text-gray-800 mt-20">
      {/* Search Bar */}
      <div className="fixed top-0 left-0 right-0 bg-gray-100 p-4 shadow-md flex gap-4 items-center w-full z-10">
        <div className="flex w-full max-w-7xl mx-auto gap-4">
        <Input
            placeholder="Search by Vehicle No, ID or Model Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
          />
          <Button
            className="bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center gap-2"
            onClick={handleSearch}
          >
            <Search className="w-4 h-4" /> Search
          </Button>
        </div>
      </div>
      {/* Display Loading or Error Message */}
      {loading ? (
        <div className="mt-10 text-center text-gray-500">Loading vehicles...</div>
      ) : error ? (
        <div className="mt-10 text-center text-red-500">{error}</div>
      ) : (
        <div className="mt-6 bg-white shadow-lg rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-700">Live Car Status</h2>
            <Button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              onClick={() => router.push("/admin")}
            >
              Admin Dashboard
            </Button>
          </div>
          <table className="w-full border-collapse border border-gray-300 rounded-lg">
            <thead className="bg-gray-200 text-gray-600">
              <tr>
                <th className="p-3 text-left">S.No.</th>
                <th className="p-3 text-left">Vehicle Id</th>
                <th className="p-3 text-left">Vehicle No.</th>
                <th className="p-3 text-left">Model Name</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {filteredVehicles.map((vehicle: any, index: number) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3 font-semibold">{vehicle.vehicleId || "N/A"}</td>
                  <td className="p-3 font-semibold">{vehicle.vehicleNo}</td>
                  <td className="p-3 flex items-center gap-2">
                    
                    {vehicle.modelName}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-white text-sm ${vehicle.status === "Available"
                          ? "bg-green-500"
                          : vehicle.status === "In Transit"
                            ? "bg-blue-500"
                            : "bg-red-500"
                        }`}
                    >
                      {vehicle.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
