"use client";

import React from "react";
import PageWrapper from "@/components/PageWrapper";

const hatchbackVehicles = [
  { id: 1, name: "Maruti Swift", image: "/vehicles/hatchback1.jpg", pricePerDay: "₹1400/day" },
  { id: 2, name: "Hyundai i20", image: "/vehicles/hatchback2.jpg", pricePerDay: "₹1350/day" },
];

export default function HatchbackPage() {
  return <PageWrapper title="Hatchback Rentals" vehicles={hatchbackVehicles} />;
}
