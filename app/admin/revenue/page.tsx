"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, TrendingDown, IndianRupee } from "lucide-react";

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
