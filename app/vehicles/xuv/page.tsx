"use client";

import React from "react";
import PageWrapper from "@/components/PageWrapper";

const xuvVehicles = [
  { id: 1, name: "Tata Harrier", image: "https://rentavehicleimages.s3.ap-south-1.amazonaws.com/Tata+Harrier.jpg", pricePerDay: "₹9000/day" },
  { id: 2, name: "Kia Seltos", image: "https://rentavehicleimages.s3.ap-south-1.amazonaws.com/Kia+Seltos.jpg", pricePerDay: "₹7500/day" },
];

export default function XUVPage() {
  return <PageWrapper title="XUV Rentals" vehicles={xuvVehicles} />;
}
