import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { isValidUrl } from "@/lib/utils";
import {
  FiArrowRight,
  FiLink,
  FiEdit,
  FiBook,
  FiHelpCircle,
  FiInfo,
  FiCode,
  FiMessageSquare,
  FiTarget,
  FiBarChart2,
  FiFileText,
  FiShoppingBag,
  FiBriefcase,
  FiServer,
  FiCreditCard,
  FiHash,
  FiSmartphone,
  FiGlobe,
  FiImage,
  FiPackage,
  FiPrinter,
  FiMonitor,
  FiShare2,
  FiCheck,
  FiUsers,
} from "react-icons/fi";

export default function Home() {
  const router = useRouter();
  const [url, setUrl] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // States for dropdown menus
  const [showPlatformMenu, setShowPlatformMenu] = useState<boolean>(false);
  const [showSolutionsMenu, setShowSolutionsMenu] = useState<boolean>(false);
  const [showResourcesMenu, setShowResourcesMenu] = useState<boolean>(false);

  const handleShorten = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset error state
    setError(null);

    // Validate URL
    if (!url.trim()) {
      setError("Please enter a URL");
      return;
    }

    if (!isValidUrl(url)) {
      setError("Please enter a valid URL");
      return;
    }

    setIsSubmitting(true);

    try {
      // In a real app, this would call your backend API
      // For now, let's simulate an API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // If the user is logged in, redirect to dashboard
      // Otherwise, show the shortened URL
      const isLoggedIn = false; // This would be determined by your auth state

      if (isLoggedIn) {
        router.push("/dashboard");
      } else {
        // For demo purposes, just show a success message
        toast.success("URL shortened successfully!");
        // In a real app, you'd show the shortened URL here
      }
    } catch (error) {
      console.error("Error shortening URL:", error);
      toast.error("Failed to shorten URL. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Bitly | URL Shortener, Link Management & Branded Links</title>
        <meta
          name="description"
          content="Shorten, create and share trusted, powerful links for your business. Bitly's url and link shortener helps you with link management."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-[#0c2c4d]">
        {/* Announcement Banner */}
        <div className="bg-[#12294d] text-white text-center p-2 text-sm">
          <span className="inline-block bg-[#274871] text-white px-1.5 py-0.5 text-xs font-bold rounded mr-1.5">
            NEW
          </span>
          Explore innovative ways to connect! Dive into our{" "}
          <Link href="#" className="text-white underline hover:no-underline">
            QR Code Inspiration Gallery
          </Link>{" "}
          today.
        </div>

        {/* Header/Navigation */}
        <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-white text-3xl font-bold">
            <Link href="/" className="flex items-center">
              <svg
                width="78"
                height="40"
                viewBox="0 0 78 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-24"
              >
                <path
                  d="M23.3963 8.17046C19.8471 8.17046 16.9741 11.0435 16.9741 14.5926C16.9741 18.1418 19.8471 21.0148 23.3963 21.0148C26.9454 21.0148 29.8184 18.1418 29.8184 14.5926C29.8184 11.0435 26.9454 8.17046 23.3963 8.17046Z"
                  fill="#EE6123"
                />
                <path
                  d="M68.288 21.0148H70.0995V8.92212H68.288V21.0148Z"
                  fill="#EE6123"
                />
                <path
                  d="M37.5723 8.92212L33.8598 17.1503L30.1474 8.92212H28.1836L33.0455 19.9481L30.4036 26.0002H32.3389L39.5362 8.92212H37.5723Z"
                  fill="#EE6123"
                />
                <path
                  d="M48.3824 8.92212V15.1221C48.3824 17.4421 46.6281 19.1965 44.3081 19.1965C41.9881 19.1965 40.2338 17.4421 40.2338 15.1221V8.92212H38.4224V15.1221C38.4224 18.382 41.0482 21.0078 44.3081 21.0078C47.568 21.0078 50.1938 18.382 50.1938 15.1221V8.92212H48.3824Z"
                  fill="#EE6123"
                />
                <path
                  d="M68.2879 8.17042C67.7294 8.17042 67.2881 7.70061 67.2881 7.17042C67.2881 6.61193 67.7294 6.17042 68.2879 6.17042C68.8464 6.17042 69.2879 6.61193 69.2879 7.17042C69.2879 7.72891 68.8464 8.17042 68.2879 8.17042Z"
                  fill="#EE6123"
                />
                <path
                  d="M13.9172 25.9995L10.4251 21.2542L13.5468 17.0659H11.0779L8.56362 20.4578L6.04936 17.0659H3.58044L6.70217 21.2542L3.21001 25.9995H5.67892L8.56362 22.1676L11.4483 25.9995H13.9172Z"
                  fill="#EE6123"
                />
                <path
                  d="M58.6653 8.92212V9.98384C57.2311 9.05923 55.6309 8.53989 53.9336 8.53989C49.9496 8.53989 46.7196 11.7698 46.7196 15.7539C46.7196 19.738 49.9496 22.9679 53.9336 22.9679C55.6309 22.9679 57.2311 22.4486 58.6653 21.524V22.5857H60.4767V8.92212H58.6653ZM53.9336 21.1565C50.9605 21.1565 48.531 18.727 48.531 15.7539C48.531 12.7808 50.9605 10.3513 53.9336 10.3513C56.9067 10.3513 59.3362 12.7808 59.3362 15.7539C59.3362 18.727 56.9067 21.1565 53.9336 21.1565Z"
                  fill="#EE6123"
                />
                <path
                  d="M21.1834 17.0659V18.1276C19.7493 17.203 18.149 16.6837 16.4517 16.6837C12.4677 16.6837 9.23773 19.9136 9.23773 23.8977C9.23773 27.8818 12.4677 31.1117 16.4517 31.1117C18.149 31.1117 19.7493 30.5924 21.1834 29.6678V30.7295H22.9948V17.0659H21.1834ZM16.4517 29.3003C13.4786 29.3003 11.0492 26.8708 11.0492 23.8977C11.0492 20.9246 13.4786 18.4951 16.4517 18.4951C19.4248 18.4951 21.8543 20.9246 21.8543 23.8977C21.8543 26.8708 19.4248 29.3003 16.4517 29.3003Z"
                  fill="#EE6123"
                />
                <path
                  d="M76.6809 25.9992H74.8694V16.6836H70.5999V25.9992H68.7885V14.8722H76.6809V25.9992Z"
                  fill="#EE6123"
                />
                <path
                  d="M42.2534 30.7295V18.4376H45.9941V16.6262H36.7168V18.4376H40.4575V30.7295H42.2534Z"
                  fill="#EE6123"
                />
                <path
                  d="M55.8855 25.2995L58.9137 17.0659H60.8491L56.7853 28.144L52.6931 17.0659H54.6284L57.6567 25.2995H55.8855Z"
                  fill="#EE6123"
                />
                <path
                  d="M15.3277 32.8937C14.0095 32.8937 12.6913 33.1783 11.6013 33.7475L12.2848 35.3194C13.0969 34.8646 14.1588 34.6372 15.3277 34.6372C17.0571 34.6372 18.064 35.3479 18.064 36.3548C18.064 37.3617 17.1143 37.9309 15.3849 37.9309H14.1588V39.6532H15.3849C17.6477 39.6532 19.8355 38.7606 19.8355 36.3548C19.8355 33.949 17.8501 32.8937 15.3277 32.8937Z"
                  fill="#EE6123"
                />
                <path
                  d="M22.9946 32.8937C21.6764 32.8937 20.3583 33.1783 19.2683 33.7475L19.9517 35.3194C20.7638 34.8646 21.8258 34.6372 22.9946 34.6372C24.724 34.6372 25.7309 35.3479 25.7309 36.3548C25.7309 37.3617 24.7812 37.9309 23.0518 37.9309H21.8257V39.6532H23.0518C25.3146 39.6532 27.5024 38.7606 27.5024 36.3548C27.5024 33.949 25.517 32.8937 22.9946 32.8937Z"
                  fill="#EE6123"
                />
              </svg>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-4">
            {/* Platform Dropdown */}
            <div className="relative group">
              <button
                className="text-white hover:text-gray-300 py-2 px-3 font-medium flex items-center"
                onMouseEnter={() => setShowPlatformMenu(true)}
                onMouseLeave={() => setShowPlatformMenu(false)}
              >
                Platform
                <svg
                  className="ml-1 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {showPlatformMenu && (
                <div
                  className="absolute left-0 right-0 w-full mt-2 bg-white rounded-none border-t-4 border-[#EE6123] shadow-lg p-0 z-20"
                  style={{ top: "40px" }}
                  onMouseEnter={() => setShowPlatformMenu(true)}
                  onMouseLeave={() => setShowPlatformMenu(false)}
                >
                  <div className="max-w-7xl mx-auto flex p-4">
                    <div className="w-2/3 border-r border-gray-200 pr-8">
                      <h2 className="text-gray-500 font-medium uppercase tracking-wide text-sm mb-3">
                        PRODUCTS
                      </h2>
                      <div className="grid grid-cols-2 gap-6">
                        <Link
                          href="/url-shortener"
                          className="flex items-start space-x-3 text-gray-700 hover:text-[#EE6123]"
                        >
                          <FiLink className="w-6 h-6 mt-1 text-gray-700" />
                          <div>
                            <span className="block font-medium">
                              URL Shortener
                            </span>
                            <span className="block text-sm text-gray-500">
                              Customize, share and track links
                            </span>
                          </div>
                        </Link>
                        <Link
                          href="/qr-codes"
                          className="flex items-start space-x-3 text-gray-700 hover:text-[#EE6123]"
                        >
                          <FiHash className="w-6 h-6 mt-1 text-gray-700" />
                          <div>
                            <span className="block font-medium">
                              QR Code Generator
                            </span>
                            <span className="block text-sm text-gray-500">
                              Dynamic solutions to fit every business need
                            </span>
                          </div>
                        </Link>
                        <Link
                          href="/2d-barcodes"
                          className="flex items-start space-x-3 text-gray-700 hover:text-[#EE6123]"
                        >
                          <FiPackage className="w-6 h-6 mt-1 text-gray-700" />
                          <div>
                            <span className="block font-medium">
                              2D Barcodes
                            </span>
                            <span className="block text-sm text-gray-500">
                              Add a Global Trade Number (GTIN) to QR Codes
                              designed for packaging
                            </span>
                          </div>
                        </Link>
                        <Link
                          href="/analytics"
                          className="flex items-start space-x-3 text-gray-700 hover:text-[#EE6123]"
                        >
                          <FiBarChart2 className="w-6 h-6 mt-1 text-gray-700" />
                          <div>
                            <span className="block font-medium">Analytics</span>
                            <span className="block text-sm text-gray-500">
                              A central place to track and analyze performance
                            </span>
                          </div>
                        </Link>
                        <Link
                          href="/pages"
                          className="flex items-start space-x-3 text-gray-700 hover:text-[#EE6123]"
                        >
                          <FiFileText className="w-6 h-6 mt-1 text-gray-700" />
                          <div>
                            <span className="block font-medium">Pages</span>
                            <span className="block text-sm text-gray-500">
                              Mobile-friendly, no-code landing pages
                            </span>
                          </div>
                        </Link>
                      </div>

                      <h2 className="text-gray-500 font-medium uppercase tracking-wide text-sm mb-3 mt-8">
                        FEATURES
                      </h2>
                      <div className="grid grid-cols-2 gap-6">
                        <Link
                          href="/link-in-bio"
                          className="flex items-start space-x-3 text-gray-700 hover:text-[#EE6123]"
                        >
                          <FiFileText className="w-6 h-6 mt-1 text-gray-700" />
                          <div>
                            <span className="block font-medium">
                              Link-in-bio
                            </span>
                            <span className="block text-sm text-gray-500">
                              Curate and track links and content for social
                              media profiles
                            </span>
                          </div>
                        </Link>
                        <Link
                          href="/branded-links"
                          className="flex items-start space-x-3 text-gray-700 hover:text-[#EE6123]"
                        >
                          <FiLink className="w-6 h-6 mt-1 text-gray-700" />
                          <div>
                            <span className="block font-medium">
                              Branded Links
                            </span>
                            <span className="block text-sm text-gray-500">
                              Customize links with your brand's URL
                            </span>
                          </div>
                        </Link>
                        <Link
                          href="/mobile-links"
                          className="flex items-start space-x-3 text-gray-700 hover:text-[#EE6123]"
                        >
                          <FiSmartphone className="w-6 h-6 mt-1 text-gray-700" />
                          <div>
                            <span className="block font-medium">
                              Mobile Links
                            </span>
                            <span className="block text-sm text-gray-500">
                              Short links for SMS messages
                            </span>
                          </div>
                        </Link>
                        <Link
                          href="/utm-campaigns"
                          className="flex items-start space-x-3 text-gray-700 hover:text-[#EE6123]"
                        >
                          <FiTarget className="w-6 h-6 mt-1 text-gray-700" />
                          <div>
                            <span className="block font-medium">
                              UTM Campaigns
                            </span>
                            <span className="block text-sm text-gray-500">
                              Track links and QR Codes with UTM parameters
                            </span>
                          </div>
                        </Link>
                      </div>
                    </div>

                    <div className="w-1/3 pl-8">
                      <h2 className="text-gray-500 font-medium uppercase tracking-wide text-sm mb-3">
                        INTEGRATIONS
                      </h2>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="border border-gray-200 p-4 rounded">
                          <img
                            src="/hubspot-logo.png"
                            alt="HubSpot"
                            className="h-10 w-auto mb-2"
                            onError={(e) => {
                              e.currentTarget.src =
                                "https://via.placeholder.com/100x40?text=HubSpot";
                            }}
                          />
                          <span className="text-sm text-gray-700">
                            Bitly HubSpot Connector
                          </span>
                        </div>
                        <div className="border border-gray-200 p-4 rounded">
                          <img
                            src="/canva-logo.png"
                            alt="Canva"
                            className="h-10 w-auto mb-2"
                            onError={(e) => {
                              e.currentTarget.src =
                                "https://via.placeholder.com/100x40?text=Canva";
                            }}
                          />
                          <span className="text-sm text-gray-700">
                            Bitly + Canva Integration
                          </span>
                        </div>
                      </div>

                      <Link
                        href="/integrations"
                        className="mt-4 text-blue-600 hover:text-blue-800 font-medium flex items-center"
                      >
                        See all integrations
                        <FiArrowRight className="ml-1" />
                      </Link>

                      <h2 className="text-gray-500 font-medium uppercase tracking-wide text-sm mb-3 mt-6">
                        DISCOVER MORE
                      </h2>
                      <Link
                        href="/api-documentation"
                        className="flex items-center text-blue-600 hover:text-blue-800 font-medium my-2"
                      >
                        API & Documentation
                        <FiArrowRight className="ml-1" />
                      </Link>
                      <Link
                        href="/trust-center"
                        className="flex items-center text-blue-600 hover:text-blue-800 font-medium my-2"
                      >
                        Trust Center
                        <FiArrowRight className="ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Solutions Dropdown */}
            <div className="relative group">
              <button
                className="text-white hover:text-gray-300 py-2 px-3 font-medium flex items-center"
                onMouseEnter={() => setShowSolutionsMenu(true)}
                onMouseLeave={() => setShowSolutionsMenu(false)}
              >
                Solutions
                <svg
                  className="ml-1 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {showSolutionsMenu && (
                <div
                  className="absolute left-0 right-0 w-full mt-2 bg-white rounded-none border-t-4 border-[#EE6123] shadow-lg p-0 z-20"
                  style={{ top: "40px" }}
                  onMouseEnter={() => setShowSolutionsMenu(true)}
                  onMouseLeave={() => setShowSolutionsMenu(false)}
                >
                  <div className="max-w-7xl mx-auto flex p-4">
                    <div className="w-1/3 border-r border-gray-200 pr-8">
                      <h2 className="text-gray-500 font-medium uppercase tracking-wide text-sm mb-3">
                        BY INDUSTRY
                      </h2>
                      <div className="grid grid-cols-1 gap-4">
                        <Link
                          href="/industries/retail"
                          className="flex items-center text-gray-700 hover:text-[#EE6123]"
                        >
                          <FiShoppingBag className="mr-2 text-gray-700" />
                          <span>Retail</span>
                        </Link>
                        <Link
                          href="/industries/hospitality"
                          className="flex items-center text-gray-700 hover:text-[#EE6123]"
                        >
                          <FiBriefcase className="mr-2 text-gray-700" />
                          <span>Hospitality</span>
                        </Link>
                        <Link
                          href="/industries/technology"
                          className="flex items-center text-gray-700 hover:text-[#EE6123]"
                        >
                          <FiServer className="mr-2 text-gray-700" />
                          <span>Technology Software & Hardware</span>
                        </Link>
                        <Link
                          href="/industries/insurance"
                          className="flex items-center text-gray-700 hover:text-[#EE6123]"
                        >
                          <FiGlobe className="mr-2 text-gray-700" />
                          <span>Insurance</span>
                        </Link>
                        <Link
                          href="/industries/professional-services"
                          className="flex items-center text-gray-700 hover:text-[#EE6123]"
                        >
                          <FiBriefcase className="mr-2 text-gray-700" />
                          <span>Professional Services</span>
                        </Link>
                        <Link
                          href="/industries/cpg"
                          className="flex items-center text-gray-700 hover:text-[#EE6123]"
                        >
                          <FiPackage className="mr-2 text-gray-700" />
                          <span>Consumer Packaged Goods</span>
                        </Link>
                        <Link
                          href="/industries/media"
                          className="flex items-center text-gray-700 hover:text-[#EE6123]"
                        >
                          <FiImage className="mr-2 text-gray-700" />
                          <span>Media & Entertainment</span>
                        </Link>
                        <Link
                          href="/industries/healthcare"
                          className="flex items-center text-gray-700 hover:text-[#EE6123]"
                        >
                          <FiHelpCircle className="mr-2 text-gray-700" />
                          <span>Healthcare</span>
                        </Link>
                        <Link
                          href="/industries/financial"
                          className="flex items-center text-gray-700 hover:text-[#EE6123]"
                        >
                          <FiCreditCard className="mr-2 text-gray-700" />
                          <span>Financial Services</span>
                        </Link>
                        <Link
                          href="/industries/education"
                          className="flex items-center text-gray-700 hover:text-[#EE6123]"
                        >
                          <FiBook className="mr-2 text-gray-700" />
                          <span>Education</span>
                        </Link>
                      </div>
                    </div>

                    <div className="w-1/3 border-r border-gray-200 px-8">
                      <h2 className="text-gray-500 font-medium uppercase tracking-wide text-sm mb-3">
                        BY TEAM
                      </h2>
                      <div className="grid grid-cols-1 gap-4 mb-8">
                        <Link
                          href="/teams/developers"
                          className="flex items-center text-gray-700 hover:text-[#EE6123]"
                        >
                          <FiCode className="mr-2 text-gray-700" />
                          <span>Developers</span>
                        </Link>
                        <Link
                          href="/teams/marketing"
                          className="flex items-center text-gray-700 hover:text-[#EE6123]"
                        >
                          <FiTarget className="mr-2 text-gray-700" />
                          <span>Marketing</span>
                        </Link>
                        <Link
                          href="/teams/customer-service"
                          className="flex items-center text-gray-700 hover:text-[#EE6123]"
                        >
                          <FiMessageSquare className="mr-2 text-gray-700" />
                          <span>Customer Service</span>
                        </Link>
                      </div>

                      <h2 className="text-gray-500 font-medium uppercase tracking-wide text-sm mb-3">
                        BY BUSINESS
                      </h2>
                      <div className="grid grid-cols-1 gap-4">
                        <Link
                          href="/business/small-business"
                          className="flex items-center text-gray-700 hover:text-[#EE6123]"
                        >
                          <FiShoppingBag className="mr-2 text-gray-700" />
                          <span>Small Business</span>
                        </Link>
                        <Link
                          href="/business/midmarket"
                          className="flex items-center text-gray-700 hover:text-[#EE6123]"
                        >
                          <FiBarChart2 className="mr-2 text-gray-700" />
                          <span>Midmarket</span>
                        </Link>
                        <Link
                          href="/business/enterprise"
                          className="flex items-center text-gray-700 hover:text-[#EE6123]"
                        >
                          <FiServer className="mr-2 text-gray-700" />
                          <span>Enterprise</span>
                        </Link>
                      </div>
                    </div>

                    <div className="w-1/3 pl-8">
                      <h2 className="text-gray-500 font-medium uppercase tracking-wide text-sm mb-3">
                        USE CASES
                      </h2>
                      <div className="grid grid-cols-1 gap-4">
                        <Link
                          href="/use-cases/order-confirmation"
                          className="flex items-center text-gray-700 hover:text-[#EE6123]"
                        >
                          <FiCheck className="mr-2 text-gray-700" />
                          <span>Order Confirmation</span>
                        </Link>
                        <Link
                          href="/use-cases/surveys"
                          className="flex items-center text-gray-700 hover:text-[#EE6123]"
                        >
                          <FiUsers className="mr-2 text-gray-700" />
                          <span>Surveys and Feedback</span>
                        </Link>
                        <Link
                          href="/use-cases/product-packaging"
                          className="flex items-center text-gray-700 hover:text-[#EE6123]"
                        >
                          <FiPackage className="mr-2 text-gray-700" />
                          <span>Product Packaging</span>
                        </Link>
                        <Link
                          href="/use-cases/print-advertising"
                          className="flex items-center text-gray-700 hover:text-[#EE6123]"
                        >
                          <FiPrinter className="mr-2 text-gray-700" />
                          <span>Print Advertising</span>
                        </Link>
                        <Link
                          href="/use-cases/digital-advertising"
                          className="flex items-center text-gray-700 hover:text-[#EE6123]"
                        >
                          <FiMonitor className="mr-2 text-gray-700" />
                          <span>Digital Advertising</span>
                        </Link>
                        <Link
                          href="/use-cases/content-sharing"
                          className="flex items-center text-gray-700 hover:text-[#EE6123]"
                        >
                          <FiShare2 className="mr-2 text-gray-700" />
                          <span>Content Sharing</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/pricing"
              className="text-white hover:text-gray-300 py-2 px-3 font-medium"
            >
              Pricing
            </Link>

            {/* Resources dropdown */}
            <div className="relative group">
              <button
                className="text-white hover:text-gray-300 py-2 px-3 font-medium flex items-center"
                onMouseEnter={() => setShowResourcesMenu(true)}
                onMouseLeave={() => setShowResourcesMenu(false)}
              >
                Resources
                <svg
                  className="ml-1 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {showResourcesMenu && (
                <div
                  className="absolute left-0 right-0 w-full mt-2 bg-white rounded-none border-t-4 border-[#EE6123] shadow-lg p-0 z-20"
                  style={{ top: "40px" }}
                  onMouseEnter={() => setShowResourcesMenu(true)}
                  onMouseLeave={() => setShowResourcesMenu(false)}
                >
                  <div className="max-w-7xl mx-auto flex p-4 text-left">
                    <div className="flex-1 px-4">
                      <h2 className="text-gray-500 font-medium uppercase tracking-wide text-sm mb-3">
                        LEARN MORE
                      </h2>
                      <ul className="space-y-4">
                        <li>
                          <Link
                            href="/blog"
                            className="flex items-start space-x-3 text-gray-700 hover:text-[#EE6123]"
                          >
                            <FiEdit className="w-6 h-6 mt-1 text-gray-700" />
                            <div>
                              <span className="block font-medium">Blog</span>
                              <span className="block text-sm text-gray-500">
                                Get the latest trends, tips, and best practices
                              </span>
                            </div>
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/guides"
                            className="flex items-start space-x-3 text-gray-700 hover:text-[#EE6123]"
                          >
                            <FiBook className="w-6 h-6 mt-1 text-gray-700" />
                            <div>
                              <span className="block font-medium">
                                Guides & eBooks
                              </span>
                              <span className="block text-sm text-gray-500">
                                Dig into in-depth resources and expert insights
                              </span>
                            </div>
                          </Link>
                        </li>
                      </ul>

                      <h2 className="text-gray-500 font-medium uppercase tracking-wide text-sm mb-3 mt-8">
                        FIND ANSWERS
                      </h2>
                      <ul className="space-y-4">
                        <li>
                          <Link
                            href="/help"
                            className="flex items-start space-x-3 text-gray-700 hover:text-[#EE6123]"
                          >
                            <FiHelpCircle className="w-6 h-6 mt-1 text-gray-700" />
                            <div>
                              <span className="block font-medium">
                                Help Center
                              </span>
                            </div>
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/trust"
                            className="flex items-start space-x-3 text-gray-700 hover:text-[#EE6123]"
                          >
                            <FiInfo className="w-6 h-6 mt-1 text-gray-700" />
                            <div>
                              <span className="block font-medium">
                                Trust Center
                              </span>
                            </div>
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/developer"
                            className="flex items-start space-x-3 text-gray-700 hover:text-[#EE6123]"
                          >
                            <FiCode className="w-6 h-6 mt-1 text-gray-700" />
                            <div>
                              <span className="block font-medium">
                                Developers
                              </span>
                            </div>
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="flex-1 px-4">
                      <h2 className="text-gray-500 font-medium uppercase tracking-wide text-sm mb-3">
                        GET INSPIRED
                      </h2>
                      <ul className="space-y-4">
                        <li>
                          <Link
                            href="/customer-stories"
                            className="flex items-start space-x-3 text-gray-700 hover:text-[#EE6123]"
                          >
                            <FiMessageSquare className="w-6 h-6 mt-1 text-gray-700" />
                            <div>
                              <span className="block font-medium">
                                Customer Stories
                              </span>
                              <span className="block text-sm text-gray-500">
                                Explore success stories from Bitly customers
                              </span>
                            </div>
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/qr-inspiration"
                            className="flex items-start space-x-3 text-gray-700 hover:text-[#EE6123]"
                          >
                            <FiTarget className="w-6 h-6 mt-1 text-gray-700" />
                            <div>
                              <span className="block font-medium">
                                QR Code Inspiration Gallery
                              </span>
                              <span className="block text-sm text-gray-500">
                                Check out QR Code examples for every industry
                              </span>
                            </div>
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="flex-1 px-4">
                      <h2 className="text-gray-500 font-medium uppercase tracking-wide text-sm mb-3">
                        WHAT'S NEW
                      </h2>
                      <div className="bg-blue-50 rounded-lg p-4">
                        <img
                          src="/qr-webinar.png"
                          alt="QR Codes Webinar"
                          className="w-full h-auto mb-4 rounded"
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://via.placeholder.com/300x200/e0f2fe/0369a1?text=QR+Codes+Webinar";
                          }}
                        />
                        <h3 className="text-gray-800 font-medium mb-1">
                          WEBINAR
                        </h3>
                        <h4 className="text-gray-800 font-bold text-lg mb-2">
                          QR Codes and the Future of Retail Webinar Recap
                        </h4>
                        <Link
                          href="/webinar"
                          className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                        >
                          Watch Now
                          <FiArrowRight className="ml-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </nav>

          <div className="flex items-center space-x-3">
            <div className="hidden md:flex items-center mr-2">
              <button className="text-white flex items-center">
                <FiGlobe className="w-5 h-5 mr-1" />
                EN
                <svg
                  className="ml-1 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>
            <Link
              href="/login"
              className="text-white hover:text-gray-300 font-medium"
            >
              Log in
            </Link>

            <Link
              href="/quote"
              className="hidden md:block bg-transparent text-white hover:bg-[#0046b3] hover:border-[#0046b3] py-2 px-4 rounded-md font-medium transition-colors border border-white"
            >
              Get a Quote
            </Link>

            <Link
              href="/register"
              className="bg-white text-[#0c2c4d] hover:bg-gray-100 py-2 px-4 rounded-md font-medium transition-colors border border-white"
            >
              Sign up Free
            </Link>
          </div>
        </header>

        {/* Hero Section */}
        <div className="relative pt-12 md:pt-16 pb-20 md:pb-32">
          <div className="absolute inset-0 overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute left-0 top-40 opacity-30">
              <svg
                width="100"
                height="100"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-blue-300"
              >
                <path
                  d="M50 0L61.2257 38.7743L100 50L61.2257 61.2257L50 100L38.7743 61.2257L0 50L38.7743 38.7743L50 0Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div className="absolute right-10 top-16 opacity-30">
              <svg
                width="60"
                height="60"
                viewBox="0 0 60 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-blue-300"
              >
                <path
                  d="M30 0L36.7353 23.2647L60 30L36.7353 36.7353L30 60L23.2647 36.7353L0 30L23.2647 23.2647L30 0Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div className="absolute right-32 bottom-32 opacity-30">
              <svg
                width="120"
                height="120"
                viewBox="0 0 120 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-blue-300"
              >
                <path
                  d="M60 0L73.4709 46.5291L120 60L73.4709 73.4709L60 120L46.5291 73.4709L0 60L46.5291 46.5291L60 0Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>

          <div className="container relative mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
                Build stronger digital connections
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed mx-auto max-w-3xl">
                Use our URL shortener, QR Codes, and landing pages to engage
                your audience and connect them to the right information. Build,
                edit, and track everything inside the Bitly Connections
                Platform.
              </p>

              {/* Feature Pills */}
              <div className="flex flex-wrap justify-center gap-3 mt-10 mb-12">
                <div className="bg-white rounded-full py-3 px-6 flex items-center space-x-2">
                  <FiLink className="w-6 h-6 text-[#EE6123]" />
                  <span className="font-medium text-[#0c2c4d]">Short link</span>
                </div>

                <div className="bg-transparent py-3 px-6 flex items-center space-x-2">
                  <FiHash className="w-6 h-6 text-[#EE6123]" />
                  <span className="font-medium text-white">QR Code</span>
                </div>
              </div>

              {/* URL Shortening Form */}
              <div className="bg-white rounded-lg p-8 shadow-xl max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold text-[#0c2c4d] mb-1 text-left">
                  Shorten a long link
                </h2>
                <p className="text-[#0c2c4d] mb-10 text-left">
                  No credit card required.
                </p>

                <form onSubmit={handleShorten}>
                  <div className="mb-6">
                    <label
                      htmlFor="url"
                      className="block text-left text-[#0c2c4d] mb-2 font-medium"
                    >
                      Paste your long link here
                    </label>
                    <input
                      type="text"
                      id="url"
                      className={`w-full px-4 py-3 rounded-md border ${
                        error ? "border-red-500" : "border-gray-300"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#5f6368]`}
                      placeholder="https://example.com/my-long-url"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                    />
                    {error && (
                      <p className="text-red-500 text-sm mt-1 text-left">
                        {error}
                      </p>
                    )}
                  </div>

                  <div className="flex justify-start">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-5 rounded-3xl transition-colors flex items-center"
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        <div className="flex items-center ">
                          <span>Get your link for free</span>
                          <FiArrowRight className="ml-2 w-5 h-5" />
                        </div>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
