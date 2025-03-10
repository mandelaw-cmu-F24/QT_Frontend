// src/pages/links.tsx
import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  FaCopy,
  FaChartBar,
  FaExternalLinkAlt,
  FaLock,
  FaShareAlt,
  FaPencilAlt,
  FaEllipsisH,
  FaCalendarAlt,
  FaTag,
  FaYoutube,
} from "react-icons/fa";

interface ShortenedLink {
  id: string;
  title: string;
  shortCode: string;
  originalUrl: string;
  createdAt: string;
  tags: string[];
  clickCount: number;
}

export default function Links() {
  const router = useRouter();
  const [links, setLinks] = useState<ShortenedLink[]>([]);
  const [selectedLinks, setSelectedLinks] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("Active");

  useEffect(() => {
    // In a real application, you would fetch links from your API
    const fetchLinks = async () => {
      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock data
        const mockLinks: ShortenedLink[] = [
          {
            id: "1",
            title: "YouTube",
            shortCode: "4tLWAad",
            originalUrl: "https://www.youtube.com/watch?v=GYTvdRdEUBs",
            createdAt: "2025-03-09T00:00:00Z",
            tags: [],
            clickCount: 42,
          },
        ];

        setLinks(mockLinks);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching links:", error);
        setIsLoading(false);
      }
    };

    fetchLinks();
  }, []);

  const handleSelectLink = (id: string) => {
    setSelectedLinks((prev) =>
      prev.includes(id) ? prev.filter((linkId) => linkId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedLinks.length === links.length) {
      setSelectedLinks([]);
    } else {
      setSelectedLinks(links.map((link) => link.id));
    }
  };

  const handleCopyLink = (shortCode: string) => {
    const fullUrl = `bit.ly/${shortCode}`;
    navigator.clipboard.writeText(fullUrl);
    // You could add a toast notification here
    alert(`Copied to clipboard: ${fullUrl}`);
  };

  const handleShareLink = (id: string) => {
    // Share functionality would go here
    alert(`Share link ID: ${id}`);
  };

  const handleViewAnalytics = (id: string) => {
    router.push(`/analytics/${id}`);
  };

  const handleCreateLink = () => {
    router.push("/create");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <>
      <Head>
        <title>Links - URL Shortener</title>
      </Head>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-black">Links</h1>
          <button
            onClick={handleCreateLink}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
          >
            Create link
          </button>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-grow">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-black"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search links..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black placeholder-black"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <button className="px-4 py-2 flex items-center text-black border border-gray-300 rounded-md">
            <FaCalendarAlt className="mr-2 text-black" />
            Filter by created date
          </button>

          <button className="px-4 py-2 text-black border border-gray-300 rounded-md">
            Add filters
          </button>
        </div>

        {/* Links Table */}
        {isLoading ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mb-4"></div>
            <p className="text-black">Loading your links...</p>
          </div>
        ) : links.length > 0 ? (
          <div className="bg-white rounded-lg shadow-md">
            {/* Table Header Actions */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                  checked={
                    selectedLinks.length === links.length && links.length > 0
                  }
                  onChange={handleSelectAll}
                />
                <span className="text-black">
                  {selectedLinks.length} selected
                </span>

                {selectedLinks.length > 0 && (
                  <>
                    <button className="text-black flex items-center">
                      <FaLock className="mr-1" />
                      Export
                    </button>
                    <button className="text-black">Hide</button>
                    <button className="text-black">Tag</button>
                  </>
                )}
              </div>

              <div className="flex items-center">
                <span className="mr-2 text-black">Show:</span>
                <select
                  className="border border-gray-300 rounded-md py-1 px-2 text-black bg-white"
                  value={activeFilter}
                  onChange={(e) => setActiveFilter(e.target.value)}
                >
                  <option value="Active">Active</option>
                  <option value="Archived">Archived</option>
                  <option value="All">All</option>
                </select>
              </div>
            </div>

            {/* Links List */}
            <div>
              {links.map((link) => (
                <div
                  key={link.id}
                  className="border-b border-gray-200 p-4 hover:bg-gray-50"
                >
                  <div className="flex items-start">
                    <div className="mr-4 pt-1">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                        checked={selectedLinks.includes(link.id)}
                        onChange={() => handleSelectLink(link.id)}
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center mb-1">
                        <div className="flex items-center justify-center w-8 h-8 bg-red-100 rounded-full mr-2">
                          <FaYoutube className="text-red-600" />
                        </div>
                        <h3 className="text-lg font-medium text-black">
                          - {link.title}
                        </h3>
                      </div>

                      <div className="ml-10">
                        <a
                          href={`https://bit.ly/${link.shortCode}`}
                          className="text-blue-600 hover:underline block"
                        >
                          bit.ly/{link.shortCode}
                        </a>
                        <a
                          href={link.originalUrl}
                          className="text-black text-sm truncate block max-w-lg"
                        >
                          {link.originalUrl}
                        </a>
                      </div>

                      <div className="ml-10 mt-3 flex items-center text-sm text-black">
                        <button className="flex items-center mr-4">
                          <svg
                            className="h-4 w-4 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                            />
                          </svg>
                          Click data
                        </button>
                        <div className="flex items-center mr-4">
                          <FaCalendarAlt className="h-4 w-4 mr-1 text-black" />
                          {formatDate(link.createdAt)}
                        </div>
                        <div className="flex items-center">
                          <FaTag className="h-4 w-4 mr-1 text-black" />
                          No tags
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleCopyLink(link.shortCode)}
                        className="p-2 text-black hover:bg-gray-100 rounded"
                        title="Copy"
                      >
                        <FaCopy className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleShareLink(link.id)}
                        className="p-2 text-black hover:bg-gray-100 rounded"
                        title="Share"
                      >
                        <FaShareAlt className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => router.push(`/edit/${link.id}`)}
                        className="p-2 text-black hover:bg-gray-100 rounded"
                        title="Edit"
                      >
                        <FaPencilAlt className="h-5 w-5" />
                      </button>
                      <button
                        className="p-2 text-black hover:bg-gray-100 rounded"
                        title="More options"
                      >
                        <FaEllipsisH className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-xl font-medium text-black mb-4">
              You don't have any links yet
            </p>
            <p className="text-black mb-6">
              Create your first shortened URL to get started
            </p>
            <button
              onClick={handleCreateLink}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md"
            >
              Create a link
            </button>
          </div>
        )}
      </div>
    </>
  );
}
