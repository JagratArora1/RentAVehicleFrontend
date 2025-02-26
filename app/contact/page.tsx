// export default function ContactUs() {
//   return (
//     <div className="min-h-screen bg-gray-100 py-10">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Company Info */}
//         <div className="text-center mb-12">
//           <h1 className="text-4xl font-extrabold text-gray-800">Contact Us</h1>
//           <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
//             We&apos;d love to hear from you! Whether you have questions,
//             feedback, or need assistance, feel free to reach out to us using the
//             details below or you can initiate an end-to-end chat with our admin through the chatbot.
//           </p>
//         </div>

//         {/* Contact Details */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
//           <div className="bg-white shadow-lg rounded-xl p-6">
//             <h2 className="text-2xl font-bold text-gray-800 mb-4">
//               Our Contact Information
//             </h2>
//             <p className="text-gray-700 mb-2">
//               <strong>Email:</strong> jagratarora293@gmail.com
//             </p>
//             <p className="text-gray-700 mb-2">
//               <strong>Phone:</strong> 9582312907
//             </p>
//             <p className="text-gray-700 mb-2">
//               <strong>Address:</strong> FIL, Gurugram, Haryana, India
//             </p>
//             <p className="text-gray-700">
//               <strong>Working Hours:</strong> Mon - Fri, 9:00 AM - 6:00 PM
//             </p>
//           </div>

//           {/* Contact Form */}
//           <div className="bg-white shadow-lg rounded-xl p-6">
//             <h2 className="text-2xl font-bold text-gray-800 mb-4">
//               Send Us a Message
//             </h2>
//             <form className="space-y-4">
//               <div>
//                 <label
//                   htmlFor="name"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Full Name
//                 </label>
//                 <input
//                   type="text"
//                   id="name"
//                   name="name"
//                   required
//                   className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>

//               <div>
//                 <label
//                   htmlFor="email"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Email Address
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   required
//                   className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>

//               <div>
//                 <label
//                   htmlFor="message"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Message
//                 </label>
//                 <textarea
//                   id="message"
//                   name="message"
//                   rows={4}
//                   required
//                   className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                 ></textarea>
//               </div>

//               <div>
//                 <button
//                   type="submit"
//                   className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
//                 >
//                   Send Message
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";

// import React, { useState } from "react";
// import emailjs from "@emailjs/browser";

// export default function ContactUs() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });

//   const [loading, setLoading] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };
  

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setLoading(true);

//     const templateParams = {
//       from_name: formData.name,
//       from_email: formData.email,
//       message: formData.message,
//     };

//     try {
//       await emailjs.send(
//         process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string,
//         process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string,
//         templateParams,
//         process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
//       );

//       alert("Message sent successfully!");
//       setFormData({ name: "", email: "", message: "" });
//     } catch (error) {
//       console.error("Failed to send message:", error);
//       alert("Failed to send message. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 py-10">
//       <div className="container mx-auto px-4">
//         <h1 className="text-4xl font-extrabold text-center mb-6">Contact Us</h1>
//         <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-8 shadow-lg rounded-lg">
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">Full Name</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className="w-full p-2 border rounded-lg"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">Email Address</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full p-2 border rounded-lg"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">Message</label>
//             <textarea
//               name="message"
//               value={formData.message}
//               onChange={handleChange}
//               className="w-full p-2 border rounded-lg"
//               required
//             ></textarea>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
//             disabled={loading}
//           >
//             {loading ? "Sending..." : "Send Message"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// "use client";

// import React, { useState } from "react";
// import emailjs from "@emailjs/browser";

// export default function ContactUs() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });

//   const [loading, setLoading] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setLoading(true);

//     const templateParams = {
//       from_name: formData.name,
//       from_email: formData.email,
//       message: formData.message,
//     };

//     try {
//       await emailjs.send(
//         process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string,
//         process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string,
//         templateParams,
//         process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string
//       );

//       alert("Message sent successfully!");
//       setFormData({ name: "", email: "", message: "" });
//     } catch (error) {
//       console.error("Failed to send message:", error);
//       alert("Failed to send message. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 py-10">
//       <div className="container mx-auto px-4">
//         <h1 className="text-4xl font-extrabold text-center mb-10">Contact Us</h1>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            
//             {/* Contact Details */}
//           <div className="bg-white p-8 shadow-lg rounded-lg">
//             <h2 className="text-2xl font-bold mb-6">Contact Details</h2>

//             <div className="space-y-4">
//               <div>
//                 <h3 className="text-lg font-semibold">📍 Address</h3>
//                 <p className="text-gray-700">123 Rent A Car Street, New Delhi, India</p>
//               </div>

//               <div>
//                 <h3 className="text-lg font-semibold">📞 Phone</h3>
//                 <p className="text-gray-700">+91 98765 43210</p>
//               </div>

//               <div>
//                 <h3 className="text-lg font-semibold">✉️ Email</h3>
//                 <p className="text-gray-700">support@rentacar.com</p>
//               </div>

//               <div>
//                 <h3 className="text-lg font-semibold">🕔 Business Hours</h3>
//                 <p className="text-gray-700">Mon - Fri: 9:00 AM to 6:00 PM</p>
//               </div>
//             </div>
//           </div>
//           {/* Contact Form */}
//           <form onSubmit={handleSubmit} className="bg-white p-8 shadow-lg rounded-lg">
//             <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>

//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700">Full Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded-lg"
//                 required
//               />
//             </div>

//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700">Email Address</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded-lg"
//                 required
//               />
//             </div>

//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700">Message</label>
//               <textarea
//                 name="message"
//                 value={formData.message}
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded-lg"
//                 required
//               ></textarea>
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
//               disabled={loading}
//             >
//               {loading ? "Sending..." : "Send Message"}
//             </button>
//           </form>

          
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useState } from "react";
import emailjs from "@emailjs/browser";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
    };

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string
      );

      alert("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Failed to send message:", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        {/* Company Info */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-800">Contact Us</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            We&apos;d love to hear from you! Whether you have questions, feedback, or need assistance, 
            feel free to reach out to us using the details below. 
            You can also initiate an end-to-end chat with our admin through the chatbot.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="bg-white p-8 shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>

          {/* Contact Details */}
          <div className="bg-white p-8 shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-6">Contact Details</h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">📍 Address</h3>
                <p className="text-gray-700">123 Rent A Car Street, New Delhi, India</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold">📞 Phone</h3>
                <p className="text-gray-700">+91 98765 43210</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold">✉️ Email</h3>
                <p className="text-gray-700">support@rentacar.com</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold">🕔 Business Hours</h3>
                <p className="text-gray-700">Mon - Fri: 9:00 AM to 6:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

