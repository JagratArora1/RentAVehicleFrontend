"use client";

import React from "react";
import PageWrapper from "@/components/PageWrapper";

const sportsBikeVehicles = [
  { id: 1, name: "Kawasaki Ninja 300", image: "/vehicles/sports-bike1.jpg", pricePerDay: "₹1500/day" },
  { id: 2, name: "Yamaha R15 V4", image: "/vehicles/sports-bike2.jpg", pricePerDay: "₹1300/day" },
];

export default function SportsBikePage() {
  return <PageWrapper title="Sports Bike Rentals" vehicles={sportsBikeVehicles} />;
}
