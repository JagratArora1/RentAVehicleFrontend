"use client";

import React from "react";
import PageWrapper from "@/components/PageWrapper";

const eScootyVehicles = [
  { id: 1, name: "E-Scooty Model X", image: "/vehicles/e-scooty1.jpg", pricePerDay: "₹500/day" },
  { id: 2, name: "Eco Ride Z", image: "/vehicles/e-scooty2.jpg", pricePerDay: "₹450/day" },
];

export default function EScootyPage() {
  return <PageWrapper title="E-Scooty Rentals" vehicles={eScootyVehicles} />;
}
