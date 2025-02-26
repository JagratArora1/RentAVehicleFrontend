"use client";

import React from "react";
import PageWrapper from "@/components/PageWrapper";

const scootyVehicles = [
  { id: 1, name: "Honda Activa 6G", image: "/vehicles/scooty1.jpg", pricePerDay: "₹400/day" },
  { id: 2, name: "TVS Jupiter", image: "/vehicles/scooty2.jpg", pricePerDay: "₹380/day" },
];

export default function ScootyPage() {
  return <PageWrapper title="Scooty Rentals" vehicles={scootyVehicles} />;
}
