"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";


export default function SuccessPage() {
  const router = useRouter();

  // Retrieve and parse booking data from localStorage
  const storedBookingData = localStorage.getItem("bookdata");
  console.log(storedBookingData);

  if (!storedBookingData) {
    console.error("No booking data found in localStorage.");
  }

  const parsedBookingData = storedBookingData ? JSON.parse(storedBookingData) : null;

  // Retrieve token from localStorage
  const token = localStorage.getItem("token") || "";

  useEffect(() => {
    const saveBooking = async () => {
      console.log(parsedBookingData[0].totalPrice)


      const bookingData = {
        customer: {
          customerId: parsedBookingData[0].customer.userId || "Unknown",
        },
        vehicle: {
          vehicleId: parsedBookingData[0].vehicle.vehicleId || 0,
        },
        startDate: parsedBookingData[0].startDate,
        endDate: parsedBookingData[0].endDate,
        totalPrice: typeof parsedBookingData[0].totalPrice === "number" ? parsedBookingData[0].totalPrice : 0,
        status: "confirmed",
      };

      console.log("Sending Booking Data:", bookingData);

      try {
        const bookingResponse = await fetch("https://web-production-7c280.up.railway.app/bookings/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json",
          },
          body: JSON.stringify(bookingData),
        });

        console.log("Response Status:", bookingResponse.status);

        if (!bookingResponse.ok) {
          const errorText = await bookingResponse.text();
          throw new Error(`Booking API call failed: ${errorText}`);
        }
        toast.success("Booking successful!");
        localStorage.removeItem("bookdata")
      } catch (error) {
        console.error("Booking Error:", error);
        alert("Booking failed. Please try again.");
      }
    };

    saveBooking();
  }, [parsedBookingData, token]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <header className="absolute top-0 left-0 w-full px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center z-20">
              <Link href="/user" className="flex items-center">
                <div className="relative h-8 w-8 mr-4">
                  <Image fill alt="Logo" src="/logo.jpg" />
                </div>
              </Link>
            </header>
      <h1 className="text-2xl font-bold text-green-600">Payment Successful! ✅</h1>
      <p className="text-lg">Thank you for your booking.</p>
      <button
        onClick={() => router.push("/user")}
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Go to home
      </button>
    </div>
  );
}

