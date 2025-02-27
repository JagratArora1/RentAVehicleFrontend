"use client";

import React from "react";
import PageWrapper from "@/components/PageWrapper";

const bikeVehicles = [
  { id: 1, name: "Honda Shine", image: "https://rentavehicleimages.s3.ap-south-1.amazonaws.com/Honda-Shine.jpg", pricePerDay: "₹400/day" },
  { id: 2, name: "Bajaj Pulsar", image: "https://rentavehicleimages.s3.ap-south-1.amazonaws.com/Bajaj-Pulsar.jpg", pricePerDay: "₹500/day" },
];

export default function BikePage() {
  return <PageWrapper title="Bike Rentals" vehicles={bikeVehicles} />;
}
