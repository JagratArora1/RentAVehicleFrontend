"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";

export default function AddVehiclePage() {
  const router = useRouter();
  const [vehicleType, setVehicleType] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [vehicleId, setVehicleId] = useState<any>();
  useEffect(() => {
    const id = localStorage.getItem("userId");
    setUserId(id || null);

    const storedToken = localStorage.getItem("token");
    setToken(storedToken || null);
  }, []);
  const [formData, setFormData] = useState({
    modelName: "",
    vehicleNumber: "",
    kilometersDriven: "",
    fuelType: "",
    status: "",
    pricePerDay: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const twoWheelerOptions = ["E_Scooty", "Scooty", "Sports_Bike", "Bike"];
  const fourWheelerOptions = ["Sedan", "XUV", "Hatchback", "Premium"];

  // Handle input field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");

    if (!vehicleType || !subCategory || !formData.modelName || !formData.vehicleNumber || !formData.pricePerDay) {
      setMessage("Please fill all required fields.");
      setLoading(false);
      return;
    }

    const vehicleData = {
      vehicleNo: formData.vehicleNumber,
      modelName: formData.modelName,
      kilometerDriven: formData.kilometersDriven ? parseInt(formData.kilometersDriven) : 0, // Ensure valid number
      fuelType: formData.fuelType,
      vehicleType: vehicleType,
      category: subCategory,
      status: formData.status || "available", // Default value
      pricePerDay: formData.pricePerDay ? parseFloat(formData.pricePerDay) : 0.0, // Ensure valid number
    };

    console.log("Sending JSON:", JSON.stringify(vehicleData));

    try {
      const response = await fetch("http://localhost:2237/vehicles/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json",
        },
        body: JSON.stringify(vehicleData),
      });

      console.log("Response:", response);
      // setVehicleId(response.vehicleId);

      if (response.ok) {
        setMessage("Vehicle added successfully!");
        setTimeout(() => {
          router.push(`../admin/upload-documents?vehicleId=${15}`);
        }, 2000);

      } else {
        const result = await response.json();
        setMessage(result || "Failed to add vehicle. Please try again.");
      }
    } catch (error) {
      console.error("Error adding vehicle:", error);
      setMessage("Error adding vehicle.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <motion.div
      className="max-w-4xl mx-auto p-6 space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Add a New Vehicle</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Vehicle Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>Vehicle Type</Label>
              <Select onValueChange={setVehicleType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Vehicle Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2-wheeler">2-Wheeler</SelectItem>
                  <SelectItem value="4-wheeler">4-Wheeler</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Subcategory</Label>
              <Select value={subCategory} onValueChange={setSubCategory} disabled={!vehicleType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Subcategory" />
                </SelectTrigger>
                <SelectContent>
                  {(vehicleType === "2-wheeler" ? twoWheelerOptions : fourWheelerOptions).map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Other Vehicle Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>Model Name</Label>
              <Input name="modelName" type="text" placeholder="Enter model name" onChange={handleChange} />
            </div>
            <div>
              <Label>Vehicle Number</Label>
              <Input name="vehicleNumber" type="text" placeholder="Enter vehicle number" onChange={handleChange} />
            </div>
            <div>
              <Label>Kilometers Driven</Label>
              <Input name="kilometersDriven" type="text" placeholder="Enter km driven" onChange={handleChange} />
            </div>
            <div>
              <Label>Fuel Type</Label>
              <Select onValueChange={(value) => setFormData({ ...formData, fuelType: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Fuel Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="petrol">Petrol</SelectItem>
                  <SelectItem value="diesel">Diesel</SelectItem>
                  <SelectItem value="cng">CNG</SelectItem>
                  <SelectItem value="electric">Electric</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Status</Label>
              <Select onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="in-transit">In Transit</SelectItem>
                  <SelectItem value="in-service">In Service</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Price Per Day</Label>
              <Input name="pricePerDay" type="text" placeholder="Enter price per day" onChange={handleChange} />
            </div>
          </div>

          {/* Status Message */}
          {message && (
            <p className={`text-center font-semibold ${message.includes("success") ? "text-green-600" : "text-red-600"}`}>
              {message}
            </p>
          )}

          {/* Save Changes Button */}
          <div className="flex justify-end">
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSubmit} disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
