"use client";

import React from "react";
import PageWrapper from "@/components/PageWrapper";

const premiumCars = [
  { id: 1, name: "Jaguar XE", image: "https://rentavehicleimages.s3.ap-south-1.amazonaws.com/Jaguar+XE.jpg", pricePerDay: "₹20000/day" },
  { id: 2, name: "Mercedes Benz C class", image: "https://rentavehicleimages.s3.ap-south-1.amazonaws.com/Mercedes-Benz+C-Class.jpg", pricePerDay: "₹17000/day" },
];

export default function PremiumCarsPage() {
  return <PageWrapper title="Premium Car Rentals" vehicles={premiumCars} />;
}
