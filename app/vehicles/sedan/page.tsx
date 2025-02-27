"use client";

import React from "react";
import PageWrapper from "@/components/PageWrapper";

const sedanVehicles = [
  { id: 1, name: "Honda City", image: "https://rentavehicleimages.s3.ap-south-1.amazonaws.com/Honda+City.jpg", pricePerDay: "₹4500/day" },
  { id: 2, name: "Toyota Camry", image: "https://rentavehicleimages.s3.ap-south-1.amazonaws.com/Toyota+Camry.jpg", pricePerDay: "₹6000/day" },
];

export default function SedanPage() {
  return <PageWrapper title="Sedan Rentals" vehicles={sedanVehicles} />;
}
