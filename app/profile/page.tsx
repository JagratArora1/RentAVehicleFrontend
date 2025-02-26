// "use client";

// import React, { useState, useEffect } from "react";
// import { Progress } from "@/components/ui/progress";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import Image from "next/image";

// // Define types for better TypeScript support
// interface DocumentFiles {
//   drivingLicense: File | null;
//   idProof: File | null;
//   intlDrivingPermit: File | null;
//   passport: File | null;
// }

// interface UserProfileData {
//   fullName: string;
//   email: string;
//   mobile: string;
//   address: string;
//   emergencyContact: string;
//   profilePicture: File | null;
//   documents: DocumentFiles;
// }

// export default function UserProfile() {
//   const [profile, setProfile] = useState<UserProfileData>({
//     fullName: "",
//     email: "",
//     mobile: "",
//     address: "",
//     emergencyContact: "",
//     profilePicture: null,
//     documents: {
//       drivingLicense: null,
//       idProof: null,
//       intlDrivingPermit: null,
//       passport: null,
//     },
//   });

//   const [completion, setCompletion] = useState(0);

//   // Calculate profile completion percentage
//   useEffect(() => {
//     const filledFields = Object.values(profile).filter(
//       (value) => value && value !== ""
//     ).length;

//     const completedDocs = [
//       profile.documents.drivingLicense,
//       profile.documents.idProof,
//     ].filter(Boolean).length;

//     const totalFields = Object.keys(profile).length + 2; // Including mandatory docs
//     setCompletion(((filledFields + completedDocs) / totalFields) * 100);
//   }, [profile]);

//   // Handle text input changes
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setProfile({ ...profile, [name]: value });
//   };

//   // Handle file uploads
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name } = e.target;
//     const file = e.target.files?.[0] || null; // Safely handle null values
//     setProfile((prev) => ({
//       ...prev,
//       documents: { ...prev.documents, [name]: file },
//     }));
//   };

//   // Handle profile picture upload
//   const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0] || null;
//     setProfile({ ...profile, profilePicture: file });
//   };

//   return (
//     <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg">
//       <h1 className="text-3xl font-bold mb-6">User Profile</h1>

//       {/* Profile Completion Progress Bar */}
//       <div className="mb-6">
//         <Label className="font-semibold">Profile Completion</Label>
//         <Progress value={completion} className="h-4 mt-2" />
//         <p className="text-sm text-gray-600 mt-1">{completion.toFixed(0)}% Complete</p>
//       </div>

//       {/* User Details Section */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <Label>Full Name</Label>
//           <Input type="text" name="fullName" value={profile.fullName} onChange={handleChange} disabled />
//         </div>

//         <div>
//           <Label>Email</Label>
//           <Input type="email" name="email" value={profile.email} onChange={handleChange} disabled />
//         </div>

//         <div>
//           <Label>Mobile Number</Label>
//           <Input type="text" name="mobile" value={profile.mobile} onChange={handleChange} disabled />
//         </div>

//         <div>
//           <Label>Current Residing Address</Label>
//           <Input type="text" name="address" value={profile.address} onChange={handleChange} />
//         </div>

//         <div>
//           <Label>Emergency Contact Number</Label>
//           <Input type="text" name="emergencyContact" value={profile.emergencyContact} onChange={handleChange} />
//         </div>
//       </div>

//       {/* Profile Picture Upload Section */}
//       <div className="mt-6">
//         <Label>Profile Picture</Label>
//         <Input type="file" accept="image/*" onChange={handleProfilePictureChange} />
//         {profile.profilePicture && (
//           <Image
//             src={URL.createObjectURL(profile.profilePicture)}
//             alt="Profile"
//             width={100}
//             height={100}
//             className="mt-2 rounded-full"
//           />
//         )}
//       </div>

//       <Button className="mt-6">Change Password</Button>

//       {/* Document Upload Section */}
//       <div className="mt-8">
//         <h2 className="text-2xl font-semibold mb-4">Upload Documents</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <Label>Driving License (Mandatory)</Label>
//             <Input type="file" name="drivingLicense" accept="image/*,application/pdf" onChange={handleFileChange} required />
//           </div>
//           <div>
//             <Label>Aadhar/PAN Card (Mandatory)</Label>
//             <Input type="file" name="idProof" accept="image/*,application/pdf" onChange={handleFileChange} required />
//           </div>
//           <div>
//             <Label>International Driving Permit (Optional)</Label>
//             <Input type="file" name="intlDrivingPermit" accept="image/*,application/pdf" onChange={handleFileChange} />
//           </div>
//           <div>
//             <Label>Passport (Optional)</Label>
//             <Input type="file" name="passport" accept="image/*,application/pdf" onChange={handleFileChange} />
//           </div>
//         </div>
//       </div>

//       <Button className="mt-8">Save Profile</Button>
//     </div>
//   );
// }

// "use client";

// import React, { useState, useEffect } from "react";
// import { Progress } from "@/components/ui/progress";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import Image from "next/image";
// // import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// // Define types for better TypeScript support
// interface DocumentFiles {
//   drivingLicense: File | null;
//   idProof: File | null;
//   intlDrivingPermit: File | null;
//   passport: File | null;
// }

// interface UserProfileData {
//   fullName: string;
//   email: string;
//   mobile: string;
//   address: string;
//   emergencyContact: string;
//   profilePicture: File | null;
//   userType: "Indian" | "NRI";
//   documents: DocumentFiles;
// }

// export default function UserProfile() {
//   const [profile, setProfile] = useState<UserProfileData>({
//     fullName: "",
//     email: "",
//     mobile: "",
//     address: "",
//     emergencyContact: "",
//     profilePicture: null,
//     userType: "Indian",
//     documents: {
//       drivingLicense: null,
//       idProof: null,
//       intlDrivingPermit: null,
//       passport: null,
//     },
//   });

//   const [completion, setCompletion] = useState(0);
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const [showPasswordModal, setShowPasswordModal] = useState(false);

//   // Calculate profile completion percentage
//   useEffect(() => {
//     const filledFields = Object.values(profile).filter(
//       (value) => value && value !== ""
//     ).length;

//     const requiredDocs =
//       profile.userType === "Indian"
//         ? [profile.documents.drivingLicense, profile.documents.idProof]
//         : [profile.documents.intlDrivingPermit, profile.documents.passport];

//     const completedDocs = requiredDocs.filter(Boolean).length;
//     const totalFields = Object.keys(profile).length + requiredDocs.length;
//     const progress = ((filledFields + completedDocs) / totalFields) * 100;
//     setCompletion(progress >= 100 ? 99 : progress); // Ensure 100% only when truly complete
//   }, [profile]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setProfile({ ...profile, [name]: value });
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name } = e.target;
//     const file = e.target.files?.[0] || null;
//     setProfile((prev) => ({
//       ...prev,
//       documents: { ...prev.documents, [name]: file },
//     }));
//   };

//   const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0] || null;
//     setProfile({ ...profile, profilePicture: file });
//   };

//   return (
//     <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg">
//       <h1 className="text-3xl font-bold mb-6">User Profile</h1>

//       {/* Profile Completion Progress Bar */}
//       <div className="mb-6">
//         <Label className="font-semibold">Profile Completion</Label>
//         <Progress value={completion} className="h-4 mt-2" />
//         <p className="text-sm text-gray-600 mt-1">{completion.toFixed(0)}% Complete</p>
//       </div>

//       {/* User Details Section */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <Label>Full Name *</Label>
//           <Input type="text" name="fullName" value={profile.fullName} onChange={handleChange} disabled />
//         </div>

//         <div>
//           <Label>Email *</Label>
//           <Input type="email" name="email" value={profile.email} onChange={handleChange} disabled />
//         </div>

//         <div>
//           <Label>Mobile Number *</Label>
//           <Input type="text" name="mobile" value={profile.mobile} onChange={handleChange} disabled />
//         </div>

//         <div>
//           <Label>Current Residing Address *</Label>
//           <Input type="text" name="address" value={profile.address} onChange={handleChange} />
//         </div>

//         <div>
//           <Label>Emergency Contact Number *</Label>
//           <Input type="text" name="emergencyContact" value={profile.emergencyContact} onChange={handleChange} />
//         </div>
//       </div>

//       {/* Profile Picture Upload */}
//       <div className="mt-6">
//         <Label>Profile Picture</Label>
//         <Input type="file" accept="image/*" onChange={handleProfilePictureChange} />
//         {profile.profilePicture && (
//           <Image
//             src={URL.createObjectURL(profile.profilePicture)}
//             alt="Profile"
//             width={100}
//             height={100}
//             className="mt-2 rounded-full"
//           />
//         )}
//       </div>

//       {/* Change Password Button */}
//       <Button className="mt-6" onClick={() => setShowPasswordModal(true)}>
//         Change Password
//       </Button>

//       {/* Document Upload Section */}
//       <div className="mt-8">
//         <h2 className="text-2xl font-semibold mb-4">Upload Documents</h2>
//         <Label>User Type *</Label>
//         <select
//           className="border p-2 rounded w-full mb-4"
//           value={profile.userType}
//           onChange={(e) => setProfile({ ...profile, userType: e.target.value as "Indian" | "NRI" })}
//         >
//           <option value="Indian">Indian</option>
//           <option value="NRI">NRI</option>
//         </select>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {profile.userType === "Indian" ? (
//             <>
//               <div>
//                 <Label>Driving License *</Label>
//                 <Input type="file" name="drivingLicense" accept="image/*,application/pdf" onChange={handleFileChange} required />
//               </div>
//               <div>
//                 <Label>Aadhar/PAN Card *</Label>
//                 <Input type="file" name="idProof" accept="image/*,application/pdf" onChange={handleFileChange} required />
//               </div>
//             </>
//           ) : (
//             <>
//               <div>
//                 <Label>International Driving Permit *</Label>
//                 <Input type="file" name="intlDrivingPermit" accept="image/*,application/pdf" onChange={handleFileChange} required />
//               </div>
//               <div>
//                 <Label>Passport *</Label>
//                 <Input type="file" name="passport" accept="image/*,application/pdf" onChange={handleFileChange} required />
//               </div>
//             </>
//           )}
//         </div>
//       </div>

//       <Button className="mt-8">Save Profile</Button>
//     </div>
//   );
// }

"use client";

import React, { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ChangePasswordModal from "@/components/ChangePasswordModal";

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
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
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

  useEffect(() => {
    const filledFields = Object.values(profile).filter(
      (value) => value && value !== ""
    ).length;
    
    const requiredDocs = profile.userType === "Indian" 
      ? [profile.documents.drivingLicense, profile.documents.idProof]
      : [profile.documents.intlDrivingPermit, profile.documents.passport];
    
    const completedDocs = requiredDocs.filter(Boolean).length;
    const totalFields = Object.keys(profile).length + requiredDocs.length;

    setCompletion(((filledFields + completedDocs) / totalFields) * 100);
  }, [profile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const file = e.target.files?.[0] || null;
    setProfile((prev) => ({
      ...prev,
      documents: { ...prev.documents, [name]: file },
    }));
  };

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setProfile({ ...profile, profilePicture: file });
  };

  const handleSaveProfile = () => {
    // Simulating saving data
    setTimeout(() => {
      router.push("/user/page.tsx"); // Redirect after saving
    }, 1000);
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
          <Input type="text" name="address" value={profile.address} onChange={handleChange} />
        </div>
        <div>
          <Label>Emergency Contact Number <span className="text-red-500">*</span></Label>
          <Input type="text" name="emergencyContact" value={profile.emergencyContact} onChange={handleChange} />
        </div>
      </div>

      {/* Profile Picture Upload */}
      <div className="mt-6">
        <Label>Profile Picture <span className="text-red-500">*</span></Label>
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

      {/* Change Password Button */}
      <Button className="mt-6" onClick={() => setIsPasswordModalOpen(true)}>Change Password</Button>
      <ChangePasswordModal isOpen={isPasswordModalOpen} onClose={() => setIsPasswordModalOpen(false)} />

      {/* User Type Selection */}
      <div className="mt-6">
        <Label>User Type <span className="text-red-500">*</span></Label>
        <select className="border rounded p-2 w-full" value={profile.userType} onChange={(e) => setProfile({ ...profile, userType: e.target.value as "Indian" | "NRI" })}>
          <option value="Indian">Indian</option>
          <option value="NRI">NRI</option>
        </select>
      </div>

      {/* Document Upload Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Upload Documents</h2>
        {profile.userType === "Indian" ? (
          <>
            <Label>Driving License <span className="text-red-500">*</span></Label>
            <Input type="file" name="drivingLicense" onChange={handleFileChange} required />
            <Label>Aadhar/PAN Card <span className="text-red-500">*</span></Label>
            <Input type="file" name="idProof" onChange={handleFileChange} required />
          </>
        ) : (
          <>
            <Label>International Driving Permit <span className="text-red-500">*</span></Label>
            <Input type="file" name="intlDrivingPermit" onChange={handleFileChange} required />
            <Label>Passport <span className="text-red-500">*</span></Label>
            <Input type="file" name="passport" onChange={handleFileChange} required />
          </>
        )}
      </div>

      <Button className="mt-8" onClick={handleSaveProfile}>Save Profile</Button>
    </div>
  );
}