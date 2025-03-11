// import React from "react";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { DollarSign, TrendingUp, TrendingDown } from "lucide-react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   ResponsiveContainer,
// } from "recharts";

// // Sample monthly data for revenue, expenses, and profit.
// const data = [
//   { month: "Jan", revenue: 4000, expense: 2400, profit: 1600 },
//   { month: "Feb", revenue: 3000, expense: 1398, profit: 1602 },
//   { month: "Mar", revenue: 2000, expense: 9800, profit: -7800 },
//   { month: "Apr", revenue: 2780, expense: 3908, profit: -1128 },
//   { month: "May", revenue: 1890, expense: 4800, profit: -2910 },
//   { month: "Jun", revenue: 2390, expense: 3800, profit: -410 },
//   { month: "Jul", revenue: 3490, expense: 4300, profit: -810 },
// ];

// const RevenuePnLPage = () => {
//   return (
//     <div className="min-h-screen bg-white p-8">
//       <header className="mb-12">
//         <h1 className="text-4xl font-bold text-gray-800">Revenue & P&L</h1>
//         <p className="text-gray-500 mt-2">
//           A snapshot of your revenue, expenses, and net profit
//         </p>
//       </header>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//         <Card className="bg-white shadow-md border border-gray-200">
//           <CardHeader>
//             <CardTitle className="flex items-center text-gray-700">
//               <DollarSign className="mr-2" />
//               Total Revenue
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-3xl font-semibold text-green-600">$120,000</div>
//             <div className="text-sm text-gray-500">Year-to-date</div>
//           </CardContent>
//         </Card>

//         <Card className="bg-white shadow-md border border-gray-200">
//           <CardHeader>
//             <CardTitle className="flex items-center text-gray-700">
//               <TrendingDown className="mr-2" />
//               Total Expenses
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-3xl font-semibold text-red-600">$75,000</div>
//             <div className="text-sm text-gray-500">Year-to-date</div>
//           </CardContent>
//         </Card>

//         <Card className="bg-white shadow-md border border-gray-200">
//           <CardHeader>
//             <CardTitle className="flex items-center text-gray-700">
//               <TrendingUp className="mr-2" />
//               Net Profit
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-3xl font-semibold text-blue-600">$45,000</div>
//             <div className="text-sm text-gray-500">Year-to-date</div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Monthly Bar Chart */}
//       <div className="mt-12">
//         <Card className="bg-white shadow-md border border-gray-200">
//           <CardHeader>
//             <CardTitle className="text-gray-700">Monthly P&L Overview</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart
//                 data={data}
//                 margin={{ top: 20, right: 20, left: 10, bottom: 20 }}
//               >
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="month" stroke="#4B5563" />
//                 <YAxis stroke="#4B5563" />
//                 <Tooltip />
//                 <Bar dataKey="revenue" fill="#10B981" barSize={30} />
//                 <Bar dataKey="expense" fill="#EF4444" barSize={30} />
//                 <Bar dataKey="profit" fill="#3B82F6" barSize={30} />
//               </BarChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default RevenuePnLPage;
"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { DollarSign, TrendingUp, TrendingDown, IndianRupee } from "lucide-react";

const revenueData = [
  { month: "Jan", revenue: 12000 },
  { month: "Feb", revenue: 15000 },
  { month: "Mar", revenue: 18000 },
  { month: "Apr", revenue: 17000 },
  { month: "May", revenue: 19000 },
  { month: "Jun", revenue: 22000 },
];

const expenseData = [
  { name: "Maintenance", value: 5000 },
  { name: "Insurance", value: 3000 },
  { name: "Marketing", value: 2000 },
];

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

const transactions = [
  { id: 1, description: "Booking - Sedan", amount: 500, type: "income" },
  { id: 2, description: "Maintenance - Bike", amount: 150, type: "expense" },
  { id: 3, description: "Booking - Sports Bike", amount: 700, type: "income" },
];

export default function RevenuePage() {
  return (
    <div className="p-6 space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <IndianRupee className="text-green-500" />
              <span>Total Revenue</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">₹120,000</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingDown className="text-red-500" />
              <span>Total Expenses</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">₹30,000</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="text-blue-500" />
              <span>Net Profit</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">₹90,000</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#4f46e5" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Expense Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={expenseData} dataKey="value" outerRadius={100} fill="#8884d8" label>
                  {expenseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="p-2">Description</th>
                <th className="p-2">Amount</th>
                <th className="p-2">Type</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="border-b">
                  <td className="p-2">{transaction.description}</td>
                  <td className="p-2">₹{transaction.amount}</td>
                  <td className={`p-2 font-semibold ${transaction.type === "income" ? "text-green-500" : "text-red-500"}`}>
                    {transaction.type}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
