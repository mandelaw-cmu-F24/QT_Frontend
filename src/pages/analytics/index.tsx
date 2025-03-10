// src/pages/analytics/index.tsx
import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  FaCalendarAlt,
  FaDownload,
  FaFilter,
  FaEllipsisH,
} from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function AnalyticsDashboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [dateRange, setDateRange] = useState({
    start: "03/04/2025",
    end: "03/10/2025",
  });
  const [showFilters, setShowFilters] = useState(false);

  // Sample data for charts
  const deviceData = [
    { name: "Desktop", value: 146, color: "#06b6d4" },
    { name: "E-Reader", value: 101, color: "#bae6fd" },
    { name: "Tablet", value: 70, color: "#3b82f6" },
    { name: "Mobile", value: 50, color: "#c4b5fd" },
    { name: "Unknown", value: 14, color: "#f59e0b" },
  ];

  const timeData = generateTimeData();

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  function generateTimeData() {
    const data = [];
    const now = new Date();

    for (let i = 30; i > 0; i--) {
      const date = new Date();
      date.setDate(now.getDate() - i);

      // Generate random clicks between 10 and 50
      const clicks = Math.floor(Math.random() * 40) + 10;

      data.push({
        date: date.toISOString().split("T")[0],
        clicks,
      });
    }

    return data;
  }

  const handleAddModule = () => {
    // In a real app, this would open a module selector
    alert("Add module functionality would be implemented here");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const renderCustomizedPieLabel = ({ name, value, percent }: any) => {
    return `${name}: ${value}`;
  };

  return (
    <>
      <Head>
        <title>Analytics Dashboard - URL Shortener</title>
      </Head>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-black">Analytics</h1>
          <button
            onClick={handleAddModule}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md flex items-center"
          >
            <svg
              className="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Add module
          </button>
        </div>

        {/* Preview Banner */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6 rounded-md flex">
          <div className="mr-3 text-blue-400">
            <svg className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-blue-800 font-medium mb-1">Free preview</p>
            <p className="text-blue-600">
              This is an example of our new Analytics dashboard using sample
              data.{" "}
              <a href="#" className="text-blue-700 underline">
                Upgrade
              </a>{" "}
              to display your data in real-time and make this report actionable.
            </p>
          </div>
        </div>

        {/* Date Range and Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center p-2 border border-gray-300 rounded-md">
            <FaCalendarAlt className="text-gray-500 mr-2" />
            <span className="text-black">{dateRange.start}</span>
            <span className="mx-2 text-gray-500">-</span>
            <span className="text-black">{dateRange.end}</span>
            <button className="ml-2 text-gray-400">
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          <button
            className="flex items-center p-2 border border-gray-300 rounded-md text-black"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FaFilter className="mr-2" />
            Add filters
          </button>

          <div className="flex-grow text-right">
            <span className="text-gray-500">
              Showing data for all links and QR Codes
            </span>
          </div>
        </div>

        {/* Analytics Modules - First Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Top Performing Date */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <span className="text-gray-400 mr-2">⋮⋮</span>
                <h2 className="text-lg font-medium text-black">
                  Top performing date by clicks + scans
                </h2>
              </div>
              <button className="text-gray-400">
                <FaEllipsisH />
              </button>
            </div>

            <div className="text-center py-6">
              <div className="flex items-center justify-center mb-2">
                <svg
                  className="h-6 w-6 text-gray-700 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <h3 className="text-2xl font-bold text-black">March 2, 2025</h3>
              </div>
              <p className="text-lg font-medium text-black mb-4">
                48 Clicks + scans
              </p>
              <p className="text-sm text-gray-500">Mar 04 - Mar 10, 2025</p>
            </div>
          </div>

          {/* Clicks by Device */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <span className="text-gray-400 mr-2">⋮⋮</span>
                <h2 className="text-lg font-medium text-black">
                  Clicks + scans by device
                </h2>
              </div>
              <div className="flex">
                <button className="text-gray-400 mr-2">
                  <FaDownload />
                </button>
                <button className="text-gray-400">
                  <FaEllipsisH />
                </button>
              </div>
            </div>

            <div className="h-64 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={deviceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {deviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`${value} clicks`, "Clicks"]}
                  />
                </PieChart>
              </ResponsiveContainer>

              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <h3 className="text-2xl font-bold text-black">381</h3>
                <p className="text-xs uppercase text-gray-500">
                  CLICKS + SCANS
                </p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              {deviceData.map((device, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span
                      className="inline-block w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: device.color }}
                    ></span>
                    <span className="text-black">{device.name}</span>
                  </div>
                  <span className="text-black font-medium">{device.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Analytics Modules - Second Row */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <span className="text-gray-400 mr-2">⋮⋮</span>
              <h2 className="text-lg font-medium text-black">
                Clicks + scans over time
              </h2>
            </div>
            <div className="flex">
              <button className="text-gray-400 mr-2">
                <FaDownload />
              </button>
              <button className="text-gray-400">
                <FaEllipsisH />
              </button>
            </div>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={timeData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickFormatter={formatDate}
                  tick={{ fontSize: 12 }}
                />
                <YAxis tick={{ fontSize: 12 }} domain={[0, 60]} tickCount={7} />
                <Tooltip
                  formatter={(value) => [`${value} clicks`, "Clicks"]}
                  labelFormatter={formatDate}
                />
                <Line
                  type="monotone"
                  dataKey="clicks"
                  stroke="#06b6d4"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Locations (Simplified) */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <span className="text-gray-400 mr-2">⋮⋮</span>
              <h2 className="text-lg font-medium text-black">
                Top performing location by clicks + scans
              </h2>
            </div>
            <button className="text-gray-400">
              <FaEllipsisH />
            </button>
          </div>

          <div className="text-center py-6">
            <div className="flex items-center justify-center mb-2">
              <svg
                className="h-6 w-6 text-gray-700 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              <h3 className="text-2xl font-bold text-black">
                United States & United Kingdom
              </h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
