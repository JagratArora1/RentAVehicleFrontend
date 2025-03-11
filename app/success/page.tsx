// "use client";
// import { useRouter } from "next/navigation";
// import { useEffect ,useState} from "react";
// import toast from "react-hot-toast";
// import { motion } from "framer-motion";
// import Image from "next/image";
// const ROWS = 5;
// const COLS = 4; // Fixed to a 5x5 grid for better alignment
// const TOTAL_IMAGES = 20;

// const generateAnimation = () => ({
//   scale: [1, 1.1, 1],
//   opacity: [0.7, 1, 0.7],
//   y: [0, -10, 10, 0],
//   transition: {
//     duration: 3 + Math.random() * 2,
//     repeat: Infinity,
//     ease: "easeInOut",
//   },
// });


// export default function SuccessPage() {
//   const router = useRouter();
//   const [images, setImages] = useState<string[] | null>(null);

//   useEffect(() => {
//     const imagePaths = Array.from({ length: TOTAL_IMAGES }, (_, i) => `/images/bike${i + 1}.jpg`);
//     setImages(imagePaths);
//   }, []);

//   // Retrieve and parse booking data from localStorage
//   const storedBookingData = localStorage.getItem("bookdata");
//   console.log(storedBookingData);

//   if (!storedBookingData) {
//     console.error("No booking data found in localStorage.");
//   }

//   const parsedBookingData = storedBookingData ? JSON.parse(storedBookingData) : null;

//   // Retrieve token from localStorage
//   const token = localStorage.getItem("token") || "";

//   useEffect(() => {
//     const saveBooking = async () => {
//       console.log(parsedBookingData[0].totalPrice)


//       const bookingData = {
//         customer: {
//           customerId: parsedBookingData[0].customer.userId || "Unknown",
//         },
//         vehicle: {
//           vehicleId: parsedBookingData[0].vehicle.vehicleId || 0,
//         },
//         startDate: parsedBookingData[0].startDate,
//         endDate: parsedBookingData[0].endDate,
//         totalPrice: typeof parsedBookingData[0].totalPrice === "number" ? parsedBookingData[0].totalPrice : 0,
//         status: "confirmed",
//       };

//       console.log("Sending Booking Data:", bookingData);

//       try {
//         const bookingResponse = await fetch("http://localhost:2237/bookings/create", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${token}`,
//             "Accept": "application/json",
//           },
//           body: JSON.stringify(bookingData),
//         });

//         console.log("Response Status:", bookingResponse.status);

//         if (!bookingResponse.ok) {
//           const errorText = await bookingResponse.text();
//           throw new Error(`Booking API call failed: ${errorText}`);
//         }

//         const bookingResult = await bookingResponse.json();
//         toast.success("Booking successful!");
//         localStorage.removeItem("bookdata")

//         // Redirect after successful booking
//         setTimeout(() => {
//           router.push("/bookings");
//         }, 2000);

//       } catch (error) {
//         console.error("Booking Error:", error);
//         alert("Booking failed. Please try again.");
//       }
//     };

//     saveBooking();
//   }, [parsedBookingData, token]);

//   return (
//     <div className="flex flex-col items-center justify-center h-screen">
//       <div className="absolute inset-0 grid grid-cols-5 gap-6 w-full p-10">
//          {images &&
//           Array.from({ length: ROWS }).map((_, rowIndex) =>
//             Array.from({ length: COLS }).map((_, colIndex) => {
//               const imageIndex = rowIndex * COLS + colIndex;
//               return (
//                 <motion.div
//                   key={`${rowIndex}-${colIndex}`}
//                   className="relative flex justify-center items-center"
//                   animate={generateAnimation()}
//                 >
//                   {images[imageIndex] ? (
//                     <Image
//                       src={images[imageIndex]}
//                       alt="Bike Image"
//                       width={80}
//                       height={80}
//                       className="rounded-lg shadow-lg"
//                     />
//                   ) : null}
//                 </motion.div>
//               );
//             })
//           )}
//       </div>
//       <h1 className="text-2xl font-bold text-green-600">Payment Successful! ✅</h1>
//       <p className="text-lg">Thank you for your booking.</p>
//       <button
//         onClick={() => router.push("/user")}
//         className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//       >
//         Go to home
//       </button>
//     </div>
//   );
// }



"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";


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
        const bookingResponse = await fetch("http://localhost:2237/bookings/create", {
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

        const bookingResult = await bookingResponse.json();
        toast.success("Booking successful!");
        localStorage.removeItem("bookdata")

        // Redirect after successful booking
        setTimeout(() => {
          router.push("/bookings");
        }, 2000);

      } catch (error) {
        console.error("Booking Error:", error);
        alert("Booking failed. Please try again.");
      }
    };

    saveBooking();
  }, [parsedBookingData, token]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
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
