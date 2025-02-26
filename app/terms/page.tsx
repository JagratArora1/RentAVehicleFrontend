"use client";

import React from "react";

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-extrabold text-center mb-8">Terms and Conditions</h1>

        <p className="text-lg text-gray-700 mb-6">
          Please read these Terms and Conditions carefully before using our Rent A Car service.
        </p>

        <div className="bg-white p-8 rounded-lg shadow-lg">
          <ol className="list-decimal list-inside space-y-4 text-gray-800">
            <li>
              <strong>Eligibility:</strong> Renters must be at least 18 years old and possess a valid driving license.
            </li>
            <li>
              <strong>Booking Confirmation:</strong> A booking is confirmed only after payment is successfully processed.
            </li>
            <li>
              <strong>Rental Duration:</strong> Vehicles are rented on a daily basis. Extensions require prior approval.
            </li>
            <li>
              <strong>Identification:</strong> Renters must present government-issued ID at the time of vehicle pickup.
            </li>
            <li>
              <strong>Security Deposit:</strong> A refundable security deposit may be required depending on the vehicle type.
            </li>
            <li>
              <strong>Fuel Policy:</strong> Vehicles are provided with a full tank and must be returned with the same level.
            </li>
            <li>
              <strong>Usage Limitations:</strong> Vehicles cannot be used for illegal activities, racing, or towing.
            </li>
            <li>
              <strong>Insurance Coverage:</strong> Basic insurance is included. Renters are liable for damages beyond coverage.
            </li>
            <li>
              <strong>Late Returns:</strong> Late returns may incur additional charges per hour or day.
            </li>
            <li>
              <strong>Vehicle Condition:</strong> Renters must return the vehicle in the same condition as received.
            </li>
            <li>
              <strong>Roadside Assistance:</strong> Emergency assistance is available but may incur extra fees depending on circumstances.
            </li>
            <li>
              <strong>Cancellation Policy:</strong> Cancellations within 24 hours of booking are eligible for a full refund.
            </li>
            <li>
              <strong>Booking Modifications:</strong> Any changes to booking dates or vehicles must be requested 24 hours prior.
            </li>
            <li>
              <strong>Liability:</strong> Renters are responsible for traffic violations and parking fines incurred during the rental period.
            </li>
            <li>
              <strong>Personal Belongings:</strong> The company is not responsible for lost or stolen personal items left in the vehicle.
            </li>
            <li>
              <strong>Accident Reporting:</strong> In case of an accident, renters must report it immediately and file a police report if required.
            </li>
            <li>
              <strong>Termination of Rental:</strong> The company reserves the right to terminate the rental if terms are violated.
            </li>
            <li>
              <strong>Refunds:</strong> Refunds are processed within 7 working days after the vehicle is returned and inspected.
            </li>
            <li>
              <strong>Privacy:</strong> Personal data collected during booking is used solely for service purposes and not shared.
            </li>
            <li>
              <strong>Dispute Resolution:</strong> Any disputes will be settled under the jurisdiction of New Delhi, India.
            </li>
          </ol>

          <p className="mt-8 text-gray-700">
            By booking a vehicle with Rent A Car, you agree to abide by these terms and conditions.
          </p>
        </div>
      </div>
    </div>
  );
}
