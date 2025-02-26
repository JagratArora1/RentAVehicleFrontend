"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import Image from "next/image";

const vehicleData = [
  { id: 1, carNo: "6465", driver: "Alex Noman", status: "Available" },
  { id: 2, carNo: "5665", driver: "Razib Rahman", status: "In Transit" },
  { id: 3, carNo: "1755", driver: "Luke Norton", status: "In Servicing" },
];

export default function AdminDashboard() {
  const [searchCarNo, setSearchCarNo] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [searchTime, setSearchTime] = useState("");

  const filteredVehicles = vehicleData.filter(
    (vehicle) =>
      (!searchCarNo || vehicle.carNo.includes(searchCarNo)) &&
      (!searchDate || searchDate) &&
      (!searchTime || searchTime)
  );

  return (
    <div className="p-6 bg-white min-h-screen text-gray-800 mt-20">
      {/* Search Bar */}
      <div className="fixed top-0 left-0 right-0 bg-gray-100 p-4 shadow-md flex gap-4 items-center w-full z-10">
  <div className="flex w-full max-w-7xl mx-auto gap-4">
    <Input
      placeholder="Car number"
      value={searchCarNo}
      onChange={(e) => setSearchCarNo(e.target.value)}
      className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
    />
    <Input
      type="date"
      value={searchDate}
      onChange={(e) => setSearchDate(e.target.value)}
      className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
    />
    <Input
      type="time"
      value={searchTime}
      onChange={(e) => setSearchTime(e.target.value)}
      className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
    />
    <Button className="bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center gap-2">
      <Search className="w-4 h-4" /> Check
    </Button>
  </div>
</div>


      {/* Vehicle Status Table */}
      <div className="mt-6 bg-white shadow-lg rounded-lg p-4">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Live Car Status</h2>
        <table className="w-full border-collapse border border-gray-300 rounded-lg">
          <thead className="bg-gray-200 text-gray-600">
            <tr>
              <th className="p-3 text-left">No.</th>
              <th className="p-3 text-left">Car No.</th>
              <th className="p-3 text-left">Owner</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredVehicles.map((vehicle, index) => (
              <tr key={vehicle.id} className="border-b border-gray-200">
                <td className="p-3">{index + 1}</td>
                <td className="p-3 font-semibold">{vehicle.carNo}</td>
                <td className="p-3 flex items-center gap-2">
                  <Image
                    src="/placeholder-profile.jpg"
                    width={24}
                    height={24}
                    className="rounded-full"
                    alt={vehicle.driver}
                  />
                  {vehicle.driver}
                </td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-white text-sm ${
                      vehicle.status === "Available"
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
    </div>
  );
}
