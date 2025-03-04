// "use client";

// import React from "react";
// import PageWrapper from "@/components/PageWrapper";

// const scootyVehicles = [
//   { id: 1, name: "Honda Activa 6G", image: "https://rentavehicleimages.s3.ap-south-1.amazonaws.com/Honda+Activa+6G.jpg", pricePerDay: "₹400/day" },
//   { id: 2, name: "TVS Jupiter", image: "https://rentavehicleimages.s3.ap-south-1.amazonaws.com/Tvs-Jupiter.jpeg", pricePerDay: "₹450/day" },
// ];

// export default function ScootyPage() {
//   return <PageWrapper title="Scooty Rentals" vehicles={scootyVehicles} />;
// }

"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const scootyVehicles = [
  { id: 1, name: "Honda Activa 6G", image: "https://rentavehicleimages.s3.ap-south-1.amazonaws.com/Honda+Activa+6G.jpg", pricePerDay: "₹400/day" },
  { id: 2, name: "TVS Jupiter", image: "https://rentavehicleimages.s3.ap-south-1.amazonaws.com/Tvs-Jupiter.jpeg", pricePerDay: "₹450/day" },
];

export default function BikePage() {
  return (
    <div className="max-w-6xl mx-6 px-4">
      <h1 className="text-3xl font-bold text-center my-5">Scooty Rentals</h1>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {scootyVehicles.map((vehicle) => (
          <Card key={vehicle.id} className="shadow-lg hover:scale-105 transition rounded-lg">
            <CardHeader>
              <CardTitle>{vehicle.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <img src={vehicle.image} alt={vehicle.name} className="rounded-lg mb-2 w-full h-40 object-cover" />
              <p className="text-gray-700">{vehicle.pricePerDay}</p>
              <Link
                href={{
                  pathname: "/booknow",
                  query: {
                    name: vehicle.name,
                    image: vehicle.image,
                    price: vehicle.pricePerDay.replace("₹", "").replace("/day", ""), // Clean price
                  },
                }}
              >
                <Button variant="default" className="mt-2 w-full">
                  Book Now
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </motion.div>
    </div>
  );
}