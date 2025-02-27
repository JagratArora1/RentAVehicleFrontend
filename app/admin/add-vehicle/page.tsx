"use client";

import { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from "lucide-react";
import { motion } from "framer-motion";


export default function AddVehiclePage() {
  const [vehicleType, setVehicleType] = useState("");
  const [subCategory, setSubCategory] = useState("");

  const twoWheelerOptions = ["E-Scooty", "Scooty", "Sports Bike", "Bike"];
  const fourWheelerOptions = ["Sedan", "XUV", "Hatchback", "Premium"];

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

            {/* Subcategories based on selection */}
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
              <Input type="text" placeholder="Enter model name" />
            </div>
            <div>
              <Label>Vehicle Number</Label>
              <Input type="text" placeholder="Enter vehicle number" />
            </div>
            <div>
              <Label>Owner Name</Label>
              <Input type="text" placeholder="Enter owner name" />
            </div>
            <div>
              <Label>Chassis Number</Label>
              <Input type="text" placeholder="Enter chassis number" />
            </div>
            <div>
              <Label>Engine Number</Label>
              <Input type="text" placeholder="Enter engine number" />
            </div>
            <div>
              <Label>Registration Date</Label>
              <Input type="date" />
            </div>
            <div>
              <Label>Kilometers Driven</Label>
              <Input type="text" placeholder="Enter km driven" />
            </div>
            <div>
              <Label>Fuel Type</Label>
              <Select>
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
              <Label>Financier Name</Label>
              <Input type="text" placeholder="Enter financier name" />
            </div>
            <div>
              <Label>Insurance Company</Label>
              <Input type="text" placeholder="Enter insurance company" />
            </div>
            <div>
              <Label>Insurance Policy Number</Label>
              <Input type="text" placeholder="Enter policy number" />
            </div>
            <div>
              <Label>Insurance Valid Upto</Label>
              <Input type="date" />
            </div>
            <div>
              <Label>Fitness Valid Upto</Label>
              <Input type="date" />
            </div>
            <div>
              <Label>PUC Certificate Number</Label>
              <Input type="text" placeholder="Enter PUC number" />
            </div>
            <div>
              <Label>PUC Valid Upto</Label>
              <Input type="date" />
            </div>
            <div>
              <Label>Registering Authority</Label>
              <Input type="text" placeholder="Enter registering authority" />
            </div>
            <div>
              <Label>Mileage</Label>
              <Input type="text" placeholder="Enter mileage" />
            </div>
            <div>
              <Label>Vehicle Service History</Label>
              <Textarea placeholder="Enter service history" />
            </div>
            <div>
              <Label>Status</Label>
              <Select>
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
              <Input type="text" placeholder="Enter price per day" />
            </div>
          </div>

          {/* Upload Documents */}
          <div className="space-y-3">
            <Label>Upload Documents</Label>
            {["Driving License", "Registration Certificate", "Insurance Policy", "PUC Certificate", "ID Proof"].map((doc) => (
              <div key={doc} className="flex items-center space-x-3">
                <Button variant="outline">
                  <Upload className="mr-2 h-5 w-5" />
                  Upload {doc}
                </Button>
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button className="bg-blue-600 hover:bg-blue-700">Submit Vehicle</Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
