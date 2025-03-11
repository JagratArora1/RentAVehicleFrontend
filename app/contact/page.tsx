"use client";

import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import Link from "next/link";
import Image from "next/image";

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
      <header className="absolute top-0 left-0 w-full px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center z-20">
              <Link href="/user" className="flex items-center">
                <div className="relative h-8 w-8 mr-4">
                  <Image fill alt="Logo" src="/logo.jpg" />
                </div>
              </Link>
            </header>
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
                <p className="text-gray-700">FIL Office, Tower 9, Gurugram</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold">📞 Phone</h3>
                <p className="text-gray-700">+91 98261 11153</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold">✉️ Email</h3>
                <p className="text-gray-700">jagrat@elitewheels.com</p>
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

