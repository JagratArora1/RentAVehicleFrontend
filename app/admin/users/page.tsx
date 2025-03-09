"use client";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

interface User {
    customerId: string;
    fullName: string;
    contactNumber: string;
    email: string;
    address?: string | null;
    role?: string | null;
    createdAt: string;
}

export default function UserDetails() {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const res = await fetch("http://localhost:2237/customers/all", {
                    method: "GET",
                });

                if (!res.ok) {
                    throw new Error(`Error: ${res.status}`);
                }

                const data = await res.json();
                setUsers(data);
            } catch (error) {
                console.error("Failed to fetch users:", error);
            }
        };

        fetchAllUsers();
    }, []);

    console.log(users);

    return (
        <Card className="max-w-5xl mx-auto p-4">
            <CardHeader>
                <CardTitle className="text-xl font-semibold">Customers</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Contact</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Address</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Created At</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.length > 0 ? (
                            users.map((user) => (
                                <TableRow key={user.customerId}>
                                    <TableCell>{user.customerId}</TableCell>
                                    <TableCell>{user.fullName}</TableCell>
                                    <TableCell>{user.contactNumber}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.address || "N/A"}</TableCell>
                                    <TableCell>{user.role || "N/A"}</TableCell>
                                    <TableCell>{new Date(user.createdAt).toLocaleString()}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center py-4">
                                    No users found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
