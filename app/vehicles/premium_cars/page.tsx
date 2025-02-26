"use client";

import React from "react";
import PageWrapper from "@/components/PageWrapper";

const premiumCars = [
  { id: 1, name: "BMW 5 Series", image: "/vehicles/premium1.jpg", pricePerDay: "₹6000/day" },
  { id: 2, name: "Audi Q7", image: "/vehicles/premium2.jpg", pricePerDay: "₹7000/day" },
];

export default function PremiumCarsPage() {
  return <PageWrapper title="Premium Car Rentals" vehicles={premiumCars} />;
}
