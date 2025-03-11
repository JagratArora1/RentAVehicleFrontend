import Link from "next/link";
import Image from "next/image";
export default function CancelPage() {
  localStorage.removeItem("bookdata");
  return (
    
    <div className="flex flex-col items-center justify-center h-screen">
      <header className="absolute top-0 left-0 w-full px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center z-20">
              <Link href="/user" className="flex items-center">
                <div className="relative h-8 w-8 mr-4">
                  <Image fill alt="Logo" src="/logo.jpg" />
                </div>
              </Link>
            </header>
      <h1 className="text-3xl font-bold text-red-600">Payment Failed ❌</h1>
      <p className="text-lg mt-4">Your booking was not completed. Please try again.</p>
    </div>
  );
}
