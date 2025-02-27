"use client";

import React from "react";
import PageWrapper from "@/components/PageWrapper";

const eScootyVehicles = [
  { id: 1, name: "Ather 450X", image: "https://rentavehicleimages.s3.ap-south-1.amazonaws.com/Ather+450X.jpg", pricePerDay: "₹450/day" },
  { id: 2, name: "Ola S1 pro", image: "https://rentavehicleimages.s3.ap-south-1.amazonaws.com/Ola-S1-Pro.jpg", pricePerDay: "₹350/day" },
];

export default function EScootyPage() {
  return <PageWrapper title="E-Scooty Rentals" vehicles={eScootyVehicles} />;
}
