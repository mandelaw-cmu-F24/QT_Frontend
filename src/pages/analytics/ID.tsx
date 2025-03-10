import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  FaCalendarAlt,
  FaArrowLeft,
  FaDownload,
  FaExternalLinkAlt,
} from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  TooltipProps,
} from "recharts";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

interface ClickData {
  date: string;
  clicks: number;
}

interface DeviceData {
  name: string;
  value: number;
  color: string;
}

interface ReferrerData {
  name: string;
  value: number;
}

interface LocationData {
  name: string;
  value: number;
}

interface UrlDetails {
  id: string;
  originalUrl: string;
  shortUrl: string;
  createdAt: string;
  totalClicks: number;
  clicksByDay: ClickData[];
  deviceData: DeviceData[];
  referrerData: ReferrerData[];
  locationData: LocationData[];
}

interface PieLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
  name: string;
}

export default function LinkAnalytics() {
  const router = useRouter();
  const { id } = router.query;
  const [urlData, setUrlData] = useState<UrlDetails | null>(null);
  const [dateRange, setDateRange] = useState("last30days");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchAnalytics = async () => {
      try {
        // In a real application, you would fetch this from your API
        // const response = await fetch(`/api/analytics/${id}`);
        // const data = await response.json();

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock data
        const mockData: UrlDetails = {
          id: id as string,
          originalUrl: "https://www.youtube.com/watch?v=GYTvdRdEUEs",
          shortUrl: "yourbrnd.co/yt4video",
          createdAt: "2025-02-15",
          totalClicks: 381,
          clicksByDay: generateMockClickData(),
          deviceData: [
            { name: "Desktop", value: 146, color: "#06b6d4" },
            { name: "Mobile", value: 101, color: "#3b82f6" },
            { name: "Tablet", value: 70, color: "#6366f1" },
            { name: "Unknown", value: 50, color: "#f59e0b" },
            { name: "Other", value: 14, color: "#d1d5db" },
          ],
          referrerData: [
            { name: "LinkedIn", value: 40 },
            { name: "Facebook", value: 5 },
            { name: "Google", value: 20 },
            { name: "Twitter", value: 5 },
            { name: "Bitly", value: 15 },
            { name: "Direct", value: 8 },
            { name: "Other", value: 4 },
          ],
          locationData: [
            { name: "United States", value: 150 },
            { name: "United Kingdom", value: 85 },
            { name: "Germany", value: 45 },
            { name: "India", value: 35 },
            { name: "Canada", value: 30 },
            { name: "Other", value: 36 },
          ],
        };

        setUrlData(mockData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching analytics:", error);
        setIsLoading(false);
      }
    };

    fetchAnalytics();
  }, [id]);

  function generateMockClickData(): ClickData[] {
    const data: ClickData[] = [];
    const today = new Date();
    for (let i = 30; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);

      const clicks = Math.floor(Math.random() * 40) + 5;

      data.push({
        date: date.toISOString().split("T")[0],
        clicks,
      });
    }
    return data;
  }

  const handleBackToDashboard = () => {
    router.push("/links");
  };

  const handleDateRangeChange = (range: string) => {
    setDateRange(range);
    // In a real application, you would fetch new data based on the date range
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  // Custom label for pie chart
  const renderCustomizedPieLabel = ({
    name,
    percent,
  }: {
    name: string;
    percent: number;
  }): string => {
    return `${name} ${(percent * 100).toFixed(0)}%`;
  };

  // Custom formatter for tooltip
  const customTooltipFormatter = (value: number): [string, string] => {
    return [`${value} clicks`, "Clicks"];
  };

  // Custom label formatter for tooltip
  const customLabelFormatter = (label: string): string => {
    return formatDate(label);
  };

  // Referrer tooltip formatter
  const referrerTooltipFormatter = (value: number): [string, string] => {
    return [`${value} clicks`, "Clicks"];
  };

  // Device tooltip formatter
  const deviceTooltipFormatter = (value: number): [string, string] => {
    if (!urlData) return [`${value} clicks`, "Clicks"];
    return [
      `${value} clicks (${((value / urlData.totalClicks) * 100).toFixed(1)}%)`,
      "Clicks",
    ];
  };

  if (isLoading || !urlData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mb-4"></div>
          <p className="text-black">Loading analytics data...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Link Analytics - Your URL Shortener</title>
      </Head>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <button
            onClick={handleBackToDashboard}
            className="flex items-center text-black hover:text-blue-700 mr-4"
          >
            <FaArrowLeft className="h-5 w-5 mr-1" />
            Back to Links
          </button>

          <h1 className="text-2xl font-bold text-black">
            Analytics for {urlData.shortUrl}
          </h1>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div>
              <p className="text-sm text-black">Original URL</p>
              <div className="flex items-center">
                <a
                  href={urlData.originalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline truncate max-w-sm sm:max-w-md md:max-w-lg"
                >
                  {urlData.originalUrl}
                </a>
                <FaExternalLinkAlt className="h-4 w-4 ml-1 text-black" />
              </div>
            </div>

            <div className="mt-3 md:mt-0">
              <p className="text-sm text-black">Created on</p>
              <p className="font-medium text-black">
                {new Date(urlData.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="mt-3 md:mt-0">
              <p className="text-sm text-black">Total Clicks</p>
              <p className="font-medium text-xl text-black">
                {urlData.totalClicks.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex flex-wrap items-center gap-4">
          <div className="flex items-center">
            <FaCalendarAlt className="h-5 w-5 text-black mr-2" />
            <span className="text-black font-medium">Date Range:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {["last7days", "last30days", "last3months", "allTime"].map(
              (range) => (
                <button
                  key={range}
                  onClick={() => handleDateRangeChange(range)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    dateRange === range
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-black hover:bg-gray-200"
                  }`}
                >
                  {range === "last7days" && "Last 7 days"}
                  {range === "last30days" && "Last 30 days"}
                  {range === "last3months" && "Last 3 months"}
                  {range === "allTime" && "All time"}
                </button>
              )
            )}
          </div>

          <button className="ml-auto flex items-center text-blue-600 hover:text-blue-700">
            <FaDownload className="h-4 w-4 mr-1" />
            Export Data
          </button>
        </div>

        {/* Clicks Over Time Chart */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <h2 className="text-lg font-medium mb-4 text-black">
            Clicks Over Time
          </h2>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={urlData.clicksByDay}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickFormatter={formatDate}
                  tick={{ fontSize: 12 }}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  formatter={(value: number) => customTooltipFormatter(value)}
                  labelFormatter={(label: string) =>
                    customLabelFormatter(label)
                  }
                />
                <Line
                  type="monotone"
                  dataKey="clicks"
                  stroke="#06b6d4"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Device, Referrer, and Location Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Device Breakdown */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-medium mb-4 text-black">
              Clicks by Device
            </h2>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={urlData.deviceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={renderCustomizedPieLabel}
                  >
                    {urlData.deviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => deviceTooltipFormatter(value)}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4">
              <ul className="space-y-1 text-sm">
                {urlData.deviceData.map((device, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span
                        className="inline-block w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: device.color }}
                      ></span>
                      <span className="text-black">{device.name}</span>
                    </div>
                    <span className="font-medium text-black">
                      {device.value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Referrer Breakdown - Using BarChart instead of LineChart */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-medium mb-4 text-black">
              Clicks by Referrer
            </h2>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={urlData.referrerData}
                  margin={{ top: 5, right: 30, left: 60, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis
                    dataKey="name"
                    type="category"
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip
                    formatter={(value: number) =>
                      referrerTooltipFormatter(value)
                    }
                  />
                  <Bar
                    dataKey="value"
                    fill="#06b6d4"
                    barSize={20}
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Location Breakdown */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <h2 className="text-lg font-medium mb-4 text-black">Top Locations</h2>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                  >
                    Location
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                  >
                    Clicks
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                  >
                    Percentage
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {urlData.locationData.map((location, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
                      {location.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                      {location.value}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                      {((location.value / urlData.totalClicks) * 100).toFixed(
                        1
                      )}
                      %
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
