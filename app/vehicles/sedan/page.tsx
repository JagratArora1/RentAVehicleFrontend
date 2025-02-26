"use client";

import React from "react";
import PageWrapper from "@/components/PageWrapper";

const sedanVehicles = [
  { id: 1, name: "Honda City", image: "/vehicles/sedan1.jpg", pricePerDay: "₹1800/day" },
  { id: 2, name: "Hyundai Verna", image: "/vehicles/sedan2.jpg", pricePerDay: "₹1700/day" },
];

export default function SedanPage() {
  return <PageWrapper title="Sedan Rentals" vehicles={sedanVehicles} />;
}
