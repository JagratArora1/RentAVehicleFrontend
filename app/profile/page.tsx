"use client";

import React, { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

// Define types for better TypeScript support
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
  documents: DocumentFiles;
}

export default function UserProfile() {
  const [profile, setProfile] = useState<UserProfileData>({
    fullName: "",
    email: "",
    mobile: "",
    address: "",
    emergencyContact: "",
    profilePicture: null,
    documents: {
      drivingLicense: null,
      idProof: null,
      intlDrivingPermit: null,
      passport: null,
    },
  });

  const [completion, setCompletion] = useState(0);

  // Calculate profile completion percentage
  useEffect(() => {
    const filledFields = Object.values(profile).filter(
      (value) => value && value !== ""
    ).length;

    const completedDocs = [
      profile.documents.drivingLicense,
      profile.documents.idProof,
    ].filter(Boolean).length;

    const totalFields = Object.keys(profile).length + 2; // Including mandatory docs
    setCompletion(((filledFields + completedDocs) / totalFields) * 100);
  }, [profile]);

  // Handle text input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  // Handle file uploads
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const file = e.target.files?.[0] || null; // Safely handle null values
    setProfile((prev) => ({
      ...prev,
      documents: { ...prev.documents, [name]: file },
    }));
  };

  // Handle profile picture upload
  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setProfile({ ...profile, profilePicture: file });
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg">
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
          <Label>Full Name</Label>
          <Input type="text" name="fullName" value={profile.fullName} onChange={handleChange} disabled />
        </div>

        <div>
          <Label>Email</Label>
          <Input type="email" name="email" value={profile.email} onChange={handleChange} disabled />
        </div>

        <div>
          <Label>Mobile Number</Label>
          <Input type="text" name="mobile" value={profile.mobile} onChange={handleChange} disabled />
        </div>

        <div>
          <Label>Current Residing Address</Label>
          <Input type="text" name="address" value={profile.address} onChange={handleChange} />
        </div>

        <div>
          <Label>Emergency Contact Number</Label>
          <Input type="text" name="emergencyContact" value={profile.emergencyContact} onChange={handleChange} />
        </div>
      </div>

      {/* Profile Picture Upload Section */}
      <div className="mt-6">
        <Label>Profile Picture</Label>
        <Input type="file" accept="image/*" onChange={handleProfilePictureChange} />
        {profile.profilePicture && (
          <Image
            src={URL.createObjectURL(profile.profilePicture)}
            alt="Profile"
            width={100}
            height={100}
            className="mt-2 rounded-full"
          />
        )}
      </div>

      <Button className="mt-6">Change Password</Button>

      {/* Document Upload Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Upload Documents</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Driving License (Mandatory)</Label>
            <Input type="file" name="drivingLicense" accept="image/*,application/pdf" onChange={handleFileChange} required />
          </div>
          <div>
            <Label>Aadhar/PAN Card (Mandatory)</Label>
            <Input type="file" name="idProof" accept="image/*,application/pdf" onChange={handleFileChange} required />
          </div>
          <div>
            <Label>International Driving Permit (Optional)</Label>
            <Input type="file" name="intlDrivingPermit" accept="image/*,application/pdf" onChange={handleFileChange} />
          </div>
          <div>
            <Label>Passport (Optional)</Label>
            <Input type="file" name="passport" accept="image/*,application/pdf" onChange={handleFileChange} />
          </div>
        </div>
      </div>

      <Button className="mt-8">Save Profile</Button>
    </div>
  );
}