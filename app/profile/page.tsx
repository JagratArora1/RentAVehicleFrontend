"use client"
import React, { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { apiRequest } from "../apiconnect/api";
import Link from "next/link";

interface DocumentFiles {
  drivingLicense: File | null;
  idProof: File | null;
  intlDrivingPermit: File | null;
  passport: File | null;
}

interface UserProfileData {
  fullName: string;
  email: string;
  mobile: string;
  address: string;
  emergencyContact: string;
  profilePicture: File | null;
  userType: "Indian" | "NRI";
  documents: DocumentFiles;
}

export default function UserProfile() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfileData>({
    fullName: "",
    email: "",
    mobile: "",
    address: "",
    emergencyContact: "",
    profilePicture: null,
    userType: "Indian", // Default
    documents: {
      drivingLicense: null,
      idProof: null,
      intlDrivingPermit: null,
      passport: null,
    },
  });

  const [completion, setCompletion] = useState(0);

  // Fetch User Profile Data
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userId = localStorage.getItem("userId"); // Retrieve user ID from local storage
        if (!userId) return;

        const userData = await apiRequest(`customers/${userId}`, "GET");
        console.log(userData);

        const documents: DocumentFiles = {
          drivingLicense: userData.documents?.drivingLicense ? new File([], userData.documents.drivingLicense) : null,
          idProof: userData.documents?.idProof ? new File([], userData.documents.idProof) : null,
          intlDrivingPermit: userData.documents?.intlDrivingPermit ? new File([], userData.documents.intlDrivingPermit) : null,
          passport: userData.documents?.passport ? new File([], userData.documents.passport) : null,
        };

        setProfile({
          fullName: userData.fullName || "",
          email: userData.email || "",
          mobile: userData.contactNumber || "",
          address: userData.address || "",
          emergencyContact: userData.emergencyContact || "",
          profilePicture: userData.profilePicture ? new File([], userData.profilePicture) : null,
          userType: userData.userType || "Indian",
          documents,
        });
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    const requiredDocs = profile.userType === "Indian"
      ? [profile.documents.drivingLicense, profile.documents.idProof]
      : [profile.documents.intlDrivingPermit, profile.documents.passport];
    const totalFields = Object.keys(profile).length + requiredDocs.length;

    setCompletion(( totalFields) * 10);
  }, [profile]);

  if (!profile.fullName) return <p>Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <header className="absolute top-0 left-0 w-full px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center z-20">
              <Link href="/user" className="flex items-center">
                <div className="relative h-8 w-8 mr-4">
                  <Image fill alt="Logo" src="/logo.jpg" />
                </div>
              </Link>
            </header>
      <h1 className="text-3xl font-bold mb-6">User Profile</h1>

      {/* Profile Completion Progress Bar */}
      <div className="mb-6">
        <Label className="font-semibold">Profile Completion</Label>
        <Progress value={completion} className="h-4 mt-2" />
        <p className="text-sm text-gray-600 mt-1">{completion.toFixed(0)}% Complete</p>
      </div>

      {/* User Details Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label>Full Name<span className="text-red-500">*</span></Label>
          <Input type="text" name="fullName" value={profile.fullName} disabled />
        </div>
        <div>
          <Label>Email <span className="text-red-500">*</span></Label>
          <Input type="email" name="email" value={profile.email} disabled />
        </div>
        <div>
          <Label>Mobile Number <span className="text-red-500">*</span></Label>
          <Input type="text" name="mobile" value={profile.mobile} disabled />
        </div>
        <div>
          <Label>Current Residing Address <span className="text-red-500">*</span></Label>
          <Input type="text" name="address" value={profile.address} disabled />
        </div>
      </div>
      <div className="flex justify-end item-center">
        <Button className="mt-8" onClick={() => router.push("/user")}>Go Back</Button>
      </ div>
    </div>
  );
}