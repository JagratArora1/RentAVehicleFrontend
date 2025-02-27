"use client";

import React from "react";
import PageWrapper from "@/components/PageWrapper";

const hatchbackVehicles = [
  { id: 1, name: "Maruti Suzuki", image: "https://rentavehicleimages.s3.ap-south-1.amazonaws.com/marutisuzuki.jpg", pricePerDay: "₹1800/day" },
  { id: 2, name: "Hyundai Grand i10", image: "https://rentavehicleimages.s3.ap-south-1.amazonaws.com/Hyundai+Grand+i10.jpg", pricePerDay: "₹2500/day" },
];

export default function HatchbackPage() {
  return <PageWrapper title="Hatchback Rentals" vehicles={hatchbackVehicles} />;
}
