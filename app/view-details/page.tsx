
"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { apiRequest } from "../apiconnect/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const VehicleBookings = () => {
  const searchParams = useSearchParams();
  const vehicleId = searchParams.get("vehicleId");

  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!vehicleId) return;

    const fetchDocuments = async () => {
      try {
        const res = await apiRequest(`admin/vehicle-documents/vehicle/${vehicleId}`, "GET");
        setDocuments(res);
      } catch (err) {
        console.error("Error fetching documents:", err);
        setError("Failed to fetch documents");
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, [vehicleId]);

  if (loading) return <p className="text-center text-gray-600">Loading documents...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <Card>
        <CardHeader>
          <CardTitle>Vehicle Documents (Vehicle ID: {vehicleId})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                {/* <TableHead>Document ID</TableHead> */}
                <TableHead>Type</TableHead>
                {/* <TableHead>Uploaded At</TableHead> */}
                <TableHead>File</TableHead>
                <TableHead>Vehicle Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.length > 0 ? (
                documents.map((doc) => (
                  <TableRow key={doc.documentId}>
                    {/* <TableCell>{doc.documentId}</TableCell> */}
                    <TableCell>{doc.documentType}</TableCell>
                    {/* <TableCell>{doc.uploadedAt?.join("-") || "N/A"}</TableCell> */}
                    <TableCell>
                      <a href={doc.filePath} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                        View File
                      </a>
                    </TableCell>
                    <TableCell>
                      <p><strong>Model:</strong> {doc.vehicle?.modelName || "N/A"}</p>
                      <p><strong>Type:</strong> {doc.vehicle?.vehicleType || "N/A"}</p>
                      <p><strong>Category:</strong> {doc.vehicle?.category || "N/A"}</p>
                      <p><strong>Fuel:</strong> {doc.vehicle?.fuelType || "N/A"}</p>
                      <p><strong>Kilometers Driven:</strong> {doc.vehicle?.kilometerDriven}</p>
                      <p><strong>Price/Day:</strong> ₹{doc.vehicle?.pricePerDay}</p>
                      <p><strong>Status:</strong> {doc.vehicle?.status}</p>
                      <p><strong>Vehicle No:</strong> {doc.vehicle?.vehicleNo}</p>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-gray-500">
                    No documents found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default VehicleBookings;

