"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { loadStripe } from "@stripe/stripe-js";
import toast from "react-hot-toast";
import Link from "next/link";

function BookNowContent() {
  const searchParams = useSearchParams();

  // Extract details from query params
  const name = searchParams.get("name") || "Unknown Vehicle";
  const image = searchParams.get("image") || "";
  const vehicleId = searchParams.get("vehicleId") || "";
  const pricePerDay = Number(searchParams.get("price")) || 0;

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  const [,setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const id = localStorage.getItem("userId");
    setUserId(id || null);

    const storedToken = localStorage.getItem("token");
    setToken(storedToken || null);
  }, []);

  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      // Ensure valid dates
      if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
        const days = Math.max(Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1, 1);
        setTotalPrice(days * pricePerDay);
      } else {
        setTotalPrice(0);
      }
    }
  }, [startDate, endDate, pricePerDay]);

  const makePayment = async () => {
    try {
      if (!startDate || !endDate) {
        alert("Please select start and end dates.");
        return;
      }
      const bookdata = [
        {
          "customer": {
            "userId": userId
          },
          "vehicle": {
            "vehicleId": vehicleId
          },
          "startDate": startDate,
          "endDate": endDate,
          "totalPrice": totalPrice,
          "status": "success"
        }

      ]

      localStorage.setItem("bookdata", JSON.stringify(bookdata));

      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

      const checkoutResponse = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          totalPrice,
        }),
      });

      if (!checkoutResponse.ok) {
        throw new Error(`Failed to create Stripe session: ${checkoutResponse.statusText}`);
      }

      const session = await checkoutResponse.json();
      console.log("Stripe Session:", session);

      // Redirect to Stripe Checkout
      const result = await stripe?.redirectToCheckout({
        sessionId: session.id,
      });


      console.log(result);

      if (result?.error) {
        console.error("Stripe Error:", result.error.message);
        return;
      }

    } catch (error) {
      console.error("Payment or Booking Error:", error);
    }
  };



  return (
    <div className="max-w-4xl mx-auto p-6 flex flex-col md:flex-row gap-6">
      <header className="absolute top-0 left-0 w-full px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center z-20">
              <Link href="/user" className="flex items-center">
                <div className="relative h-8 w-8 mr-4">
                  <Image fill alt="Logo" src="/logo.jpg" />
                </div>
              </Link>
            </header>
      {/* Left: Vehicle Image */}
      <div className="w-full md:w-1/2">
        {image && (
          <Image
            src={image}
            alt={name}
            width={500}
            height={300}
            className="rounded-lg object-cover w-full"
          />
        )}
      </div>

      {/* Right: Booking Details */}
      <div className="w-full md:w-1/2 space-y-4">
        <h1 className="text-2xl font-bold">{name}</h1>
        <p className="text-gray-700 text-lg">Price Per Day: <span className="font-semibold">₹{pricePerDay}</span></p>

        {/* Date Pickers */}
        {/* Start Date */}
        <div>
          <label className="block text-sm font-medium">Start Date</label>
          <input
            type="date"
            value={startDate}
            min={new Date().toISOString().split("T")[0]} // Minimum start date = today
            onChange={(e) => {
              const selectedStartDate = new Date(e.target.value);
              const today = new Date();
              today.setHours(0, 0, 0, 0); // Reset time to avoid time mismatches

              if (selectedStartDate.getTime() < today.getTime()) {
                toast.error("Start date cannot be before today's date.");
              } else {
                setStartDate(e.target.value);

                // Reset end date if it's before the new start date
                if (endDate && selectedStartDate.getTime() > new Date(endDate).getTime()) {
                  setEndDate("");
                  toast.error("End date cannot be before start date.");
                }
              }
            }}
            className="w-full p-2 border rounded-lg mt-1"
          />
        </div>

        {/* End Date */}
        <div>
          <label className="block text-sm font-medium">End Date</label>
          <input
            type="date"
            value={endDate}
            min={startDate || new Date().toISOString().split("T")[0]} // End date cannot be before start date
            onChange={(e) => {
              const selectedEndDate = new Date(e.target.value);
              if (selectedEndDate.getTime() < new Date(startDate).getTime()) {
                toast.error("End date cannot be before start date.");
              } else {
                setEndDate(e.target.value);
              }
            }}
            className="w-full p-2 border rounded-lg mt-1"
          />
        </div>


        {/* Total Price Calculation */}
        <p className="text-lg font-semibold">Total Price: ₹{totalPrice}</p>

        {/* Pay Button */}
        <Button variant="default" className="w-full" onClick={makePayment}>
          Pay ₹{totalPrice === 0 ? 0 : totalPrice.toFixed(2)}
        </Button>
      </div>
    </div>
  );
}

export default function BookNowPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookNowContent />
    </Suspense>
  );
}