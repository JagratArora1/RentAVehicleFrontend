/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";

// Define Vehicle type
interface Vehicle {
  id: number;
  name: string;
  image: string;
  pricePerDay: string;
}

interface PageWrapperProps {
  title: string;
  vehicles: Vehicle[];
}

export default function PageWrapper({ title, vehicles }: PageWrapperProps) {
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-extrabold text-center mb-6">{title}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {vehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </div>
    </div>
  );
}

const VehicleCard: React.FC<{ vehicle: Vehicle }> = ({ vehicle }) => (
  <div className="bg-white p-4 rounded-lg shadow-lg">
    <img src={vehicle.image} alt={vehicle.name} className="w-full h-40 object-cover rounded-md" />
    <h2 className="text-xl font-semibold mt-2">{vehicle.name}</h2>
    <p className="text-gray-600">{vehicle.pricePerDay}</p>
    <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
      Book Now
    </button>
  </div>
);
