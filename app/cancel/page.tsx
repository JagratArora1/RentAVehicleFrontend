export default function CancelPage() {
  localStorage.removeItem("bookdata");
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold text-red-600">Payment Failed ❌</h1>
      <p className="text-lg mt-4">Your booking was not completed. Please try again.</p>
    </div>
  );
}
