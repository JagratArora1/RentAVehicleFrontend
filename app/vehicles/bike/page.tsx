"use client";

import React from "react";
import PageWrapper from "@/components/PageWrapper";

const bikeVehicles = [
  { id: 1, name: "Royal Enfield Classic", image: "/vehicles/bike1.jpg", pricePerDay: "₹900/day" },
  { id: 2, name: "Bajaj Pulsar 150", image: "/vehicles/bike2.jpg", pricePerDay: "₹700/day" },
];

export default function BikePage() {
  return <PageWrapper title="Bike Rentals" vehicles={bikeVehicles} />;
}
