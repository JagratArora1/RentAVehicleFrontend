"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/app/apiconnect/api";

export default function BookingsPage() {
    const [bookings, setBookings] = useState<any[]>([]);
    const customerId=localStorage.getItem("userId");
    // console/
    // const customerId = "C0001"; // Replace this with dynamic customerId if needed

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await apiRequest(`bookings/customer/${customerId}`, "GET");
                setBookings(res);
            } catch (error) {
                console.error("Error fetching bookings:", error);
            }
        };

        fetchBookings();
    }, []);

    const formatDate = (dateString: { toString: () => string; }) => {
        if (!dateString) return "N/A"; // Handle missing dates
    
        // Ensure the date is a string
        const formattedDate = dateString.toString().trim();
    
        // Check if the format is incorrect (e.g., YYYYMMDD)
        if (formattedDate.length === 8 && !formattedDate.includes("-")) {
            return `${formattedDate.substring(0, 4)}-${formattedDate.substring(4, 6)}-${formattedDate.substring(6, 8)}`;
        }
    
        // // If it's already in a valid format (YYYY-MM-DD), return it as is
        return formattedDate.replace(/,/g, "-"); // Replace any commas with hyphens
    };
    
    

    return (
        <div className="max-w-6xl mx-auto px-6 py-8">
            <h1 className="text-3xl font-bold text-center my-5">Your Bookings</h1>

            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                {bookings.length > 0 ? (
                    bookings.map((booking) => (
                        <Card key={booking.bookingId} className="shadow-lg hover:scale-105 transition rounded-lg">
                            <CardHeader>
                                <CardTitle>{booking.vehicle.modelName}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-700">Vehicle No: {booking.vehicle.vehicleNo}</p>
                                <p className="text-gray-700">Category: {booking.vehicle.category}</p>
                                <p className="text-gray-700">Start Date: {formatDate(booking.startDate)}</p>
                                <p className="text-gray-700">End Date: {formatDate(booking.endDate)}</p>

                                <p className="text-gray-700 font-bold">Total Price: ₹{booking.totalPrice}</p>
                                <p className={`text-sm font-semibold mt-2 ${booking.status === "confirmed" ? "text-green-600" : "text-red-600"}`}>
                                    Status: {booking.status}
                                </p>
                                <Button variant="default" className="mt-3 w-full">
                                    View Details
                                </Button>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <p className="text-center col-span-3 text-gray-600">No bookings found.</p>
                )}
            </motion.div>
        </div>
    );
}

