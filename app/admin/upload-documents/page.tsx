"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { motion } from "framer-motion";
import { json } from "stream/consumers";
import toast from "react-hot-toast";

export default function UploadDocumentsPage() {
    const router = useRouter();
    const [files, setFiles] = useState<{ [key: string]: File | null }>({});
    const [vehicleId, setVehicleId] = useState(""); // Vehicle ID state

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, doc: string) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            setFiles((prevFiles) => ({
                ...prevFiles,
                [doc]: selectedFile,
            }));
        }
    };

    const handleUpload = async () => {
        if (!vehicleId) {
            alert("Please enter a Vehicle ID");
            return;
        }

        for (const docType in files) {
            const file = files[docType];
            if (file) {
                const formData = new FormData();
                formData.append("file", file);
                formData.append("vehicleId", vehicleId);
                formData.append("documentType", docType);


                console.log(formData);
                try {
                    const response = await fetch("http://localhost:2237/admin/vehicle-documents/upload", {
                        method: "POST",
                        body: formData, 
                    });

                    console.log(response);
                    if (response.status == 200) {
                        toast.success("uploaded successfully!");
                        router.push("/admin")
                    }
                    else {
                        toast.error("File upload failed")
                    }

                } catch (error: any) {
                    console.error("Upload error:", error);
                    alert(`Error uploading ${docType}: ${error.message}`);
                }
            }
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
                    <CardTitle>Upload Vehicle Documents</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Vehicle ID Input */}
                    <div className="flex flex-col">
                        <label className="font-semibold">Vehicle ID:</label>
                        <Input
                            type="text"
                            placeholder="Enter Vehicle ID"
                            value={vehicleId}
                            onChange={(e) => setVehicleId(e.target.value)}
                            className="p-2 border rounded"
                        />
                    </div>

                    {["Driving License", "RC", "Insurance Policy", "PUC Certificate", "ID Proof", "Vehicle Image"].map((doc) => (
                        <div key={doc} className="flex items-center space-x-3">
                            <label htmlFor={doc} className="flex items-center space-x-2">
                                <Button variant="outline" asChild>
                                    <label htmlFor={doc} className="cursor-pointer flex items-center">
                                        <Upload className="mr-2 h-5 w-5" />
                                        Upload {doc}
                                    </label>
                                </Button>
                                <Input
                                    id={doc}
                                    type="file"
                                    className="hidden"
                                    onChange={(e) => handleFileChange(e, doc)}
                                />
                            </label>
                            {files[doc] && <span className="text-sm text-green-600">{files[doc]?.name}</span>}
                        </div>
                    ))}

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <Button className="bg-green-600 hover:bg-green-700" onClick={handleUpload}>
                            Submit
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
