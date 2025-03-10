// "use client";

// import React from "react";
// import PageWrapper from "@/components/PageWrapper";

// const sportsBikeVehicles = [
//   { id: 1, name: "Suzuki Hayabusa", image: "https://rentavehicleimages.s3.ap-south-1.amazonaws.com/Suzuki-Hayabusa.jpg", pricePerDay: "₹3000/day" },
//   { id: 2, name: "KTM RC 390", image: "https://rentavehicleimages.s3.ap-south-1.amazonaws.com/KTM-RC-390.jpg", pricePerDay: "₹1000/day" },
// ];

// export default function SportsBikePage() {
//   return <PageWrapper title="Sports Bike Rentals" vehicles={sportsBikeVehicles} />;
// }


// "use client";

// import React from "react";
// import { motion } from "framer-motion";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";

// const sportsBikeVehicles = [
//   { id: 1, name: "Suzuki Hayabusa", image: "https://rentavehicleimages.s3.ap-south-1.amazonaws.com/Suzuki-Hayabusa.jpg", pricePerDay: "₹3000/day" },
//   { id: 2, name: "KTM RC 390", image: "https://rentavehicleimages.s3.ap-south-1.amazonaws.com/KTM-RC-390.jpg", pricePerDay: "₹1000/day" },
// ];

// export default function BikePage() {
//   return (
//     <div className="max-w-6xl mx-6 px-4">
//       <h1 className="text-3xl font-bold text-center my-5">Sports Bike Rentals</h1>
//       <motion.div
//         className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.5 }}
//       >
//         {sportsBikeVehicles.map((vehicle) => (
//           <Card key={vehicle.id} className="shadow-lg hover:scale-105 transition rounded-lg">
//             <CardHeader>
//               <CardTitle>{vehicle.name}</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <img src={vehicle.image} alt={vehicle.name} className="rounded-lg mb-2 w-full h-40 object-cover" />
//               <p className="text-gray-700">{vehicle.pricePerDay}</p>
//               <Link
//                 href={{
//                   pathname: "/booknow",
//                   query: {
//                     name: vehicle.name,
//                     image: vehicle.image,
//                     price: vehicle.pricePerDay.replace("₹", "").replace("/day", ""), // Clean price
//                   },
//                 }}
//               >
//                 <Button variant="default" className="mt-2 w-full">
//                   Book Now
//                 </Button>
//               </Link>
//             </CardContent>
//           </Card>
//         ))}
//       </motion.div>
//     </div>
//   );
// }



// "use client";

// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { apiRequest } from "@/app/apiconnect/api";

// // const eScootyVehicles = [
// //   { id: 1, name: "Ather 450X", image: "https://rentavehicleimages.s3.ap-south-1.amazonaws.com/Ather+450X.jpg", pricePerDay: "₹450/day" },
// //   { id: 2, name: "Ola S1 pro", image: "https://rentavehicleimages.s3.ap-south-1.amazonaws.com/Ola-S1-Pro.jpg", pricePerDay: "₹350/day" },
// // ];

// export default function SportsBikePage() {
//   const [vehicles, setVehicles] = useState<any[]>([]);

//   useEffect(() => {
//     const getTheVehicle = async () => {
//       try {
//         const res = await apiRequest("vehicles/category/sports_bike", "GET");
//         setVehicles(res);
//       } catch (error) {
//         console.error("Error fetching vehicles:", error);
//       }
//     };

//     getTheVehicle();
//   }, []);
//   return (
//     <div className="max-w-6xl mx-6 px-4">
//       <h1 className="text-3xl font-bold text-center my-5">Sports_Bike Rentals</h1>
//       <motion.div
//         className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.5 }}
//       >
//         {vehicles.length > 0 &&
//           vehicles.map((vehicle: any) => (
//             <Card
//               key={vehicle.vehicleId}
//               className="shadow-lg hover:scale-105 transition rounded-lg"
//             >
//               <CardHeader>
//                 <CardTitle>{vehicle.modelName}</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 {/* Uncomment if image URLs are available in API response */}
//                 {/* <img
//                   src={vehicle.image}
//                   alt={vehicle.modelName}
//                   className="rounded-lg mb-2 w-full h-40 object-cover"
//                 /> */}
//                 <p className="text-gray-700">₹{vehicle.pricePerDay}/day</p>
//                 <Link
//                   href={{
//                     pathname: "/booknow",
//                     query: {
//                       name: vehicle.modelName,
//                       image: vehicle.image || "",
//                       price: vehicle.pricePerDay.toString(),
//                     },
//                   }}
//                 >
//                   <Button variant="default" className="mt-2 w-full">
//                     Book Now
//                   </Button>
//                 </Link>
//               </CardContent>
//             </Card>
//           ))}
//       </motion.div>
//     </div>
//   );
// }

// "use client";

// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { apiRequest } from "@/app/apiconnect/api";

// export default function PremiumCarsPage() {
//   const [vehicles, setVehicles] = useState<any[]>([]);
//   const [urls, setUrls] = useState<string[]>([]); // Store URLs as an array of strings

//   useEffect(() => {
//     const getTheVehicle = async () => {
//       try {
//         const res = await apiRequest("vehicles/category/sports_bike", "GET");
//         console.log(res)
//         setVehicles(res);
//         // Fetch vehicle documents
//         const res2 = await apiRequest("admin/vehicle-documents/vehicle/7", "GET");
//         setUrls(Array.isArray(res2) ? res2.map(doc => doc.filePath) : []);


//       } catch (error) {
//         console.error("Error fetching vehicles:", error);
//       }
//     };

//     getTheVehicle();
//   }, []);

//   return (
//     <div className="max-w-6xl mx-auto px-4">
//       <h1 className="text-3xl font-bold text-center my-5">Sports_Bike Rentals</h1>
//       <motion.div
//         className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.5 }}
//       >
//         {vehicles.length > 0 &&
//           vehicles.map((vehicle, index) => (
//             <Card key={vehicle.vehicleId} className="shadow-lg hover:scale-105 transition rounded-lg">
//               <CardHeader>
//                 <CardTitle>{vehicle.modelName}</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 {/* Display image from fetched URLs */}
//                 {urls.length > 0 && urls[index] && (
//                   <img
//                     src={urls[index]}
//                     alt={vehicle.modelName}
//                     className="rounded-lg mb-2 w-full h-40 object-cover"
//                   />
//                 )}
//                 <p className="text-gray-700">₹{vehicle.pricePerDay}/day</p>
//                 <Link
//                   href={{
//                     pathname: "/booknow",
//                     query: {
//                       name: vehicle.modelName,
//                       image: vehicle.image || "",
//                       price: vehicle.pricePerDay.toString(),
//                     },
//                   }}
//                 >
//                   <Button variant="default" className="mt-2 w-full">
//                     Book Now
//                   </Button>
//                 </Link>
//               </CardContent>
//             </Card>
//           ))}
//       </motion.div>
//     </div>
//   );
// }

"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { apiRequest } from "@/app/apiconnect/api";

export default function SportsBikePage() {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [imageMap, setImageMap] = useState<{ [key: number]: string }>({}); // Stores images by vehicleId

  useEffect(() => {
    const getVehiclesWithImages = async () => {
      try {
        const res = await apiRequest("vehicles/category/sports_bike", "GET");
        console.log(res);
        setVehicles(res);

       
        const imageRequests = res.map(async (vehicle: any) => {
          const res2 = await apiRequest(`admin/vehicle-documents/vehicle/${vehicle.vehicleId}`, "GET");
          console.log(`Documents for Vehicle ID ${vehicle.vehicleId}:`, res2);

          if (Array.isArray(res2)) {
            const imageDoc = res2.find(doc => doc.documentType === "VEHICLE_IMAGE"); 
            return { vehicleId: vehicle.vehicleId, imageUrl: imageDoc ? imageDoc.filePath : "" };
          }
          return { vehicleId: vehicle.vehicleId, imageUrl: "" };
        });

        // Resolve all image requests
        const images = await Promise.all(imageRequests);

        // Store images in a map
        const imageMapData: { [key: number]: string } = {};
        images.forEach(({ vehicleId, imageUrl }) => {
          imageMapData[vehicleId] = imageUrl;
        });

        setImageMap(imageMapData);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };

    getVehiclesWithImages();
  }, []);

  console.log("Vehicle Image Map:", imageMap);

  return (
    <div className="max-w-6xl mx-auto px-4">
      <h1 className="text-3xl font-bold text-center my-5">Sports_Bike Rentals</h1>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {vehicles.length > 0 &&
          vehicles.map((vehicle) => (
            <Card key={vehicle.vehicleId} className="shadow-lg hover:scale-105 transition rounded-lg">
              <CardHeader>
                <CardTitle>{vehicle.modelName}</CardTitle>
              </CardHeader>
              <CardContent>
                {/* ✅ Display image using imageMap */}
                {imageMap[vehicle.vehicleId] ? (
                  <img
                    src={imageMap[vehicle.vehicleId]}
                    alt={vehicle.modelName}
                    className="rounded-lg mb-2 w-full h-40 object-cover"
                  />
                ) : (
                  <p className="text-gray-500">No Image Available</p>
                )}
                <p className="text-gray-700">₹{vehicle.pricePerDay}/day</p>
                <Link
                  href={{
                    pathname: "/booknow",
                    query: {
                      name: vehicle.modelName,
                      image: imageMap[vehicle.vehicleId] || "",
                      price: vehicle.pricePerDay.toString(),
                      vehicleId:vehicle.vehicleId
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
