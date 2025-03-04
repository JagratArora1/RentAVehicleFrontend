"use client"; 
import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const router = useRouter();
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
  
// "use client";

// import { useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";
// import axios from "axios";

// const SuccessPage = () => {
//   const searchParams = useSearchParams();
//   const sessionId = searchParams.get("session_id");
//   const [invoiceUrl, setInvoiceUrl] = useState<string | null>(null);

//   useEffect(() => {
//     if (sessionId) {
//       axios
//         .get(`/api/invoice?session_id=${sessionId}`)
//         .then((res) => {
//           setInvoiceUrl(res.data.invoiceUrl);
//         })
//         .catch((err) => console.error("Error fetching invoice:", err));
//     }
//   }, [sessionId]);

//   return (
//     <div className="flex flex-col items-center justify-center h-screen">
//       <h1 className="text-2xl font-bold text-green-600">Payment Successful! ✅</h1>
//       <p className="text-lg">Thank you for your booking.</p>
//       {invoiceUrl ? (
//         <a
//           href={invoiceUrl}
//           download
//           className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//         >
//           Download Invoice
//         </a>
//       ) : (
//         <p className="mt-4 text-gray-500">Generating invoice...</p>
//       )}
//     </div>
//   );
// };

// export default SuccessPage;
