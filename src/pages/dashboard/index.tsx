import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  FaCopy,
  FaChartBar,
  FaExternalLinkAlt,
  FaLink,
  FaQrcode,
  FaFile,
  FaCheckCircle,
  FaEye,
  FaArrowRight,
} from "react-icons/fa";

export default function Dashboard() {
  const router = useRouter();
  const [isProgressVisible, setIsProgressVisible] = useState(true);

  const handleCloseProgress = () => {
    setIsProgressVisible(false);
  };

  const goToLinks = () => {
    router.push("/links");
  };

  const goToCreateLink = () => {
    router.push("/create");
  };

  return (
    <>
      <Head>
        <title>Dashboard - Your URL Shortener</title>
      </Head>

      <div className="container px-4 py-8 max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-800">
              Your Connections Platform
            </h1>
            <div className="flex items-center text-sm">
              <span className="text-teal-500 mr-1">💎</span>
              <span>Get custom links and a complimentary domain. </span>
              <button className="text-blue-600 hover:underline ml-1 font-medium">
                Upgrade now
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-lg font-medium text-gray-800 mb-2">
                    Make it short
                  </h2>
                  <div className="bg-gray-100 text-sm py-1 px-3 rounded-md inline-flex items-center mb-4">
                    <span className="text-gray-800">yourbrnd.co/link</span>
                    <span className="ml-1 bg-blue-600 text-white rounded-full p-1 flex items-center justify-center w-4 h-4">
                      <FaCheckCircle className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={goToLinks}
                className="mt-auto bg-white hover:bg-gray-50 border border-gray-300 rounded-md text-blue-600 font-medium px-4 py-2 text-sm"
              >
                Go to links
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-lg font-medium text-gray-800 mb-2">
                    Make it scannable
                  </h2>
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="flex items-center bg-gray-100 text-sm py-1 px-2 rounded-md">
                      <span className="text-gray-700 text-xs">bit.ly/</span>
                      <span className="text-gray-700 text-xs ml-0.5">
                        4.3.6
                      </span>
                    </div>
                    <div className="w-8 h-8">
                      <FaQrcode className="w-full h-full text-orange-500" />
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={goToLinks}
                className="mt-auto bg-white hover:bg-gray-50 border border-gray-300 rounded-md text-blue-600 font-medium px-4 py-2 text-sm"
              >
                Go to Links
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-lg font-medium text-gray-800 mb-2">
                    Make a page
                  </h2>
                  <div className="w-10 h-10 mb-4">
                    <div className="bg-gray-100 rounded-md w-10 h-10 flex items-center justify-center">
                      <FaFile className="w-5 h-5 text-blue-400" />
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={goToLinks}
                className="mt-auto bg-white hover:bg-gray-50 border border-gray-300 rounded-md text-blue-600 font-medium px-4 py-2 text-sm"
              >
                Go to Links
              </button>
            </div>
          </div>

          <div className="border-l-4 border-red-500 bg-white p-4 mb-8 rounded-md shadow-sm flex justify-between items-center">
            <div className="flex items-start">
              <div className="mr-4 text-red-500 mt-1">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <circle cx="12" cy="12" r="3" fill="currentColor" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-1">
                  Bring people to your content
                </h3>
                <p className="text-gray-600 text-sm">
                  Create and share unique links to attract attention, connect
                  with more followers, and drive traffic to your content.
                </p>
              </div>
            </div>
            <button
              className="text-gray-400 hover:text-gray-600"
              onClick={handleCloseProgress}
            >
              ✕
            </button>
          </div>

          {isProgressVisible && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="col-span-2 bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium text-gray-800">
                    Getting started with URL Shortener
                  </h2>
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-2 text-sm">50%</span>
                    <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="w-1/2 h-full bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="flex items-center mb-2">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-green-600 mr-3">
                        <FaCheckCircle className="w-4 h-4" />
                      </div>
                      <p className="text-gray-400 line-through">Make a Link.</p>
                    </div>
                    <div className="flex ml-9 space-x-2">
                      <button
                        onClick={goToCreateLink}
                        className="bg-white border border-gray-300 text-blue-600 hover:bg-gray-50 rounded-md px-3 py-1 text-sm flex items-center"
                      >
                        <span className="mr-1 text-blue-600">
                          <FaLink className="w-4 h-4 inline" />
                        </span>
                        Create a link
                      </button>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center mb-2">
                      <div className="w-6 h-6 border-2 border-gray-200 rounded-full flex items-center justify-center text-white mr-3"></div>
                      <p className="text-gray-700">
                        Click it, scan it, or share it.
                      </p>
                    </div>
                    <div className="flex ml-9 space-x-2">
                      <button
                        onClick={goToLinks}
                        className="bg-white border border-gray-300 text-blue-600 hover:bg-gray-50 rounded-md px-3 py-1 text-sm flex items-center"
                      >
                        <span className="mr-1 text-blue-600">
                          <FaEye className="w-4 h-4 inline" />
                        </span>
                        View your links
                      </button>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center mb-2">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-green-600 mr-3">
                        <FaCheckCircle className="w-4 h-4" />
                      </div>
                      <p className="text-gray-400 line-through">
                        Check out Analytics.
                      </p>
                    </div>
                    <div className="flex ml-9 space-x-2">
                      <Link
                        href="/analytics"
                        className="bg-white border border-gray-300 text-blue-600 hover:bg-gray-50 rounded-md px-3 py-1 text-sm flex items-center"
                      >
                        <span className="mr-1 text-blue-600">
                          <FaChartBar className="w-4 h-4 inline" />
                        </span>
                        View Analytics
                      </Link>
                      <button className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-md px-3 py-1 text-sm">
                        View plans
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <div className="flex-1 pr-4">
                      <div className="relative w-full">
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded-md px-3 py-2 pr-8 text-sm text-black placeholder-black"
                          value="bit.ly/2BN6kd"
                          readOnly
                        />
                        <div className="absolute inset-y-0 right-3 flex items-center">
                          <FaArrowRight className="text-black w-3 h-3" />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-1 text-yellow-500">⭐</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between bg-gray-100 p-2 rounded-md mb-4">
                    <div className="flex-1 pl-2">
                      <button className="flex items-center">
                        <span className="text-gray-800 text-sm">
                          yourbrnd.co/link
                        </span>
                        <span className="ml-1 bg-blue-600 text-white rounded-full p-1 flex items-center justify-center w-4 h-4">
                          <FaCheckCircle className="w-3 h-3" />
                        </span>
                      </button>
                    </div>
                    <div className="flex items-center">
                      <FaLink className="text-gray-500 w-4 h-4" />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-1">
                    Replace "bit.ly" with your brand.
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Click it, scan it, or share it.
                  </p>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-4 py-2 text-sm font-medium w-full">
                    View our plans
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-8">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-medium text-gray-800">
                Your Recent Links
              </h2>
            </div>
            <div className="p-6">
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">
                  You don't have any links yet.
                </p>
                <button
                  onClick={goToCreateLink}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md"
                >
                  Create your first link
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
