"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
  CardHeader,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { endOfDay, startOfDay, subDays, format } from "date-fns";
import React, { useMemo, useState, useEffect } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Custom animated dot component
const AnimatedDot = (props) => {
  const { cx, cy, stroke } = props;
  return (
    <circle
      cx={cx}
      cy={cy}
      r="5"
      fill={stroke}
      className="animate-pulse"
    />
  );
};

// Date ranges for filtering transactions
const DATE_FORMAT = {
  "7D": { label: "7 Days", days: 7 },
  "1M": { label: "30 Days", days: 30 },
  "3M": { label: "90 Days", days: 90 },
  "6M": { label: "180 Days", days: 180 },
  "1Y": { label: "1 Year", days: 365 },
  ALL: { label: "All", days: null },
};

const AccountChart = ({ transactions }) => {
  const [dateRange, setDateRange] = useState("3M");
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading effect
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 1500); // Simulated delay
    return () => clearTimeout(timer);
  }, [dateRange]);

  // Filter transactions based on the selected date range
  const filteredData = useMemo(() => {
    const range = DATE_FORMAT[dateRange];
    const now = new Date();
    const startDate = range.days
      ? startOfDay(subDays(now, range.days))
      : startOfDay(new Date(0));

    const filtered = transactions.filter(
      (t) => new Date(t.date) >= startDate && new Date(t.date) <= endOfDay(now)
    );

    // Group transactions by date
    const grouped = filtered.reduce((acc, transaction) => {
      const date = format(new Date(transaction.date), "MMM dd");
      if (!acc[date]) {
        acc[date] = { date, income: 0, expense: 0 };
      }
      if (transaction.type === "INCOME") {
        acc[date].income += transaction.amount;
      } else {
        acc[date].expense += transaction.amount;
      }
      return acc;
    }, {});

    // Convert to array and sort by date
    return Object.values(grouped).sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
  }, [transactions, dateRange]);

  // Calculate total income and expense
  const totals = useMemo(() => {
    return filteredData.reduce(
      (acc, day) => ({
        income: acc.income + day.income,
        expense: acc.expense + day.expense,
      }),
      { income: 0, expense: 0 }
    );
  }, [filteredData]);

  return (
    <div className="w-full px-4 md:px-8">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <CardTitle className="text-lg md:text-xl font-semibold">
            Transaction Overview
          </CardTitle>
          <Select defaultValue={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[120px] md:w-[150px]">
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(DATE_FORMAT).map(([key, value]) => (
                <SelectItem key={key} value={key}>
                  {value.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardHeader>

        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center h-[300px]">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-green-600 rounded-full animate-bounce delay-200"></div>
                <div className="w-3 h-3 bg-red-600 rounded-full animate-bounce delay-400"></div>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-gray-100 rounded-md">
                  <p className="text-gray-600 text-sm">Total Income</p>
                  <p className="text-lg font-semibold text-green-600">
                    ${totals.income.toFixed(2)}
                  </p>
                </div>
                <div className="p-4 bg-gray-100 rounded-md">
                  <p className="text-gray-600 text-sm">Total Expense</p>
                  <p className="text-lg font-semibold text-red-600">
                    ${totals.expense.toFixed(2)}
                  </p>
                </div>
                <div className="p-4 bg-gray-100 rounded-md">
                  <p className="text-gray-600 text-sm">Net</p>
                  <p
                    className={`text-lg font-semibold ${
                      totals.income - totals.expense >= 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    ${(totals.income - totals.expense).toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="h-[300px] w-full mt-6">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={filteredData}
                    margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="date" />
                    <YAxis
                      fontSize={12}
                      tickFormatter={(value) => `$${value}`}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip formatter={(value) => [`$${value}`, undefined]} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="income"
                      name="Income"
                      stroke="#8884d8"
                      strokeWidth={2}
                      dot={<AnimatedDot stroke="#8884d8" />}
                      animationDuration={1500}
                      animationEasing="ease-in-out"
                    />
                    <Line
                      type="monotone"
                      dataKey="expense"
                      name="Expense"
                      stroke="#82ca9d"
                      strokeWidth={2}
                      dot={<AnimatedDot stroke="#82ca9d" />}
                      animationDuration={1500}
                      animationEasing="ease-in-out"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountChart;
