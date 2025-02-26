"use client";

import React from "react";
import PageWrapper from "@/components/PageWrapper";

const xuvVehicles = [
  { id: 1, name: "Mahindra XUV700", image: "/vehicles/xuv1.jpg", pricePerDay: "₹2500/day" },
  { id: 2, name: "Tata Harrier", image: "/vehicles/xuv2.jpg", pricePerDay: "₹2300/day" },
];

export default function XUVPage() {
  return <PageWrapper title="XUV Rentals" vehicles={xuvVehicles} />;
}
