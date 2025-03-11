// "use client";

// import { useEffect } from "react";
// import { usePathname, useRouter } from "next/navigation";

// export default function AuthProvider({ children }: { children: React.ReactNode }) {
//   const router = useRouter();
//   const pathname = usePathname();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const role = localStorage.getItem("role");

//     const publicPages = ["/home", "/login", "/signup","/admin","/user", "/about-us", "/contact","/bookings","/profile","/terms","/success"];

//     if (!token && !publicPages.includes(pathname)) {
//       router.replace("/home");
//       return;
//     }

//     if (token) {
//       if (role === "admin" && pathname === "/login") {
//         router.replace("/admin");
//       } else if (role === "user" && pathname === "/login") {
//         router.replace("/user");
//       }
//     }
//   }, [pathname, router]);

//   return <>{children}</>;
// }

"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") { // Ensure client-side execution
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");

      const publicPages = [
        "/home",
        "/login",
        "/signup",
        "/admin",
        "/user",
        "/about-us",
        "/contact",
        "/bookings",
        "/profile",
        "/terms",
        "/success"
      ];

      if (!token && !publicPages.includes(pathname)) {
        router.replace("/home");
        return;
      }

      if (token) {
        if (role === "admin" && pathname === "/login") {
          router.replace("/admin");
        } else if (role === "user" && pathname === "/login") {
          router.replace("/user");
        }
      }
    }
  }, [pathname, router]);

  return <>{children}</>;
}
