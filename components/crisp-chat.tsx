"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
    useEffect(() => {
        Crisp.configure("f8d6420e-9f9b-4b93-b1f7-70cca5d6ad09");
    }, []);
    return null;
}