"use client";

import React from "react";
import PageWrapper from "@/components/PageWrapper";

const sportsBikeVehicles = [
  { id: 1, name: "Suzuki Hayabusa", image: "https://rentavehicleimages.s3.ap-south-1.amazonaws.com/Suzuki-Hayabusa.jpg", pricePerDay: "₹3000/day" },
  { id: 2, name: "KTM RC 390", image: "https://rentavehicleimages.s3.ap-south-1.amazonaws.com/KTM-RC-390.jpg", pricePerDay: "₹1000/day" },
];

export default function SportsBikePage() {
  return <PageWrapper title="Sports Bike Rentals" vehicles={sportsBikeVehicles} />;
}
