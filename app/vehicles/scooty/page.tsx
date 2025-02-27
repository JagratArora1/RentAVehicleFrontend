"use client";

import React from "react";
import PageWrapper from "@/components/PageWrapper";

const scootyVehicles = [
  { id: 1, name: "Honda Activa 6G", image: "https://rentavehicleimages.s3.ap-south-1.amazonaws.com/Honda+Activa+6G.jpg", pricePerDay: "₹400/day" },
  { id: 2, name: "TVS Jupiter", image: "https://rentavehicleimages.s3.ap-south-1.amazonaws.com/Tvs-Jupiter.jpeg", pricePerDay: "₹450/day" },
];

export default function ScootyPage() {
  return <PageWrapper title="Scooty Rentals" vehicles={scootyVehicles} />;
}
