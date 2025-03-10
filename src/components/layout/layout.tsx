// src/components/layout/Layout.tsx
import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  FaHome,
  FaLink,
  FaChartBar,
  FaPlus,
  FaChevronLeft,
} from "react-icons/fa";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return router.pathname === path || router.pathname.startsWith(`${path}/`);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-200 py-3 px-4">
        <div className="container mx-auto max-w-6xl flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/dashboard" className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                <FaLink className="h-4 w-4 text-white" />
              </div>
              <span className="ml-2 md:text-lg font-bold text-black hidden md:block">
                URL Shortener
              </span>
            </Link>

            <button className="ml-4 md:hidden text-black" onClick={toggleMenu}>
              {isMenuOpen ? (
                <FaChevronLeft className="h-5 w-5" />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>

          <div className="flex items-center">
            <div className="relative mr-4">
              <input
                type="text"
                placeholder="Search..."
                className="border border-gray-300 rounded-md py-1.5 px-3 text-sm w-40 md:w-64 text-black placeholder-black"
              />
              <button className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-black"
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
              </button>
            </div>

            <Link
              href="/upgrade"
              className="mr-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md text-sm font-medium"
            >
              Upgrade
            </Link>

            <div className="relative">
              <button className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                M
              </button>
              <span className="absolute -top-1 -right-1 bg-white rounded-full w-3 h-3 border border-gray-300"></span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        <aside
          className={`hidden md:flex md:flex-col md:w-48 md:fixed md:inset-y-16 z-10 pt-4 bg-white border-r border-gray-200 h-full`}
        >
          <div className="px-4 mb-6">
            <Link
              href="/create"
              className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              <FaPlus className="mr-2 h-3 w-3" />
              Create new
            </Link>
          </div>

          <nav className="flex-1 px-2 space-y-1">
            <Link
              href="/dashboard"
              className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                isActive("/dashboard")
                  ? "bg-blue-50 text-blue-700"
                  : "text-black hover:bg-gray-50 hover:text-blue-700"
              }`}
            >
              <FaHome
                className={`mr-3 h-5 w-5 ${
                  isActive("/dashboard")
                    ? "text-blue-700"
                    : "text-black group-hover:text-blue-700"
                }`}
              />
              Home
            </Link>

            <Link
              href="/links"
              className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                isActive("/links")
                  ? "bg-blue-50 text-blue-700"
                  : "text-black hover:bg-gray-50 hover:text-blue-700"
              }`}
            >
              <FaLink
                className={`mr-3 h-5 w-5 ${
                  isActive("/links")
                    ? "text-blue-700"
                    : "text-black group-hover:text-blue-700"
                }`}
              />
              Links
            </Link>

            <Link
              href="/analytics"
              className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                isActive("/analytics")
                  ? "bg-blue-50 text-blue-700"
                  : "text-black hover:bg-gray-50 hover:text-blue-700"
              }`}
            >
              <FaChartBar
                className={`mr-3 h-5 w-5 ${
                  isActive("/analytics")
                    ? "text-blue-700"
                    : "text-black group-hover:text-blue-700"
                }`}
              />
              Analytics
            </Link>
          </nav>
        </aside>

        {isMenuOpen && (
          <div className="fixed inset-0 flex z-40 md:hidden">
            <div
              className="fixed inset-0 bg-gray-600 bg-opacity-75"
              onClick={toggleMenu}
            ></div>
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
              <div className="pt-5 pb-4 border-b border-gray-200">
                <Link
                  href="/create"
                  className="flex items-center justify-center mb-4"
                >
                  <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
                    <FaPlus className="mr-2 h-3 w-3" />
                    Create new
                  </button>
                </Link>
                <nav className="mt-5 px-2 space-y-1">
                  <Link
                    href="/dashboard"
                    className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                      isActive("/dashboard")
                        ? "bg-blue-50 text-blue-700"
                        : "text-black hover:bg-gray-50 hover:text-blue-700"
                    }`}
                  >
                    <FaHome
                      className={`mr-3 h-5 w-5 ${
                        isActive("/dashboard")
                          ? "text-blue-700"
                          : "text-black group-hover:text-blue-700"
                      }`}
                    />
                    Home
                  </Link>

                  <Link
                    href="/links"
                    className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                      isActive("/links")
                        ? "bg-blue-50 text-blue-700"
                        : "text-black hover:bg-gray-50 hover:text-blue-700"
                    }`}
                  >
                    <FaLink
                      className={`mr-3 h-5 w-5 ${
                        isActive("/links")
                          ? "text-blue-700"
                          : "text-black group-hover:text-blue-700"
                      }`}
                    />
                    Links
                  </Link>

                  <Link
                    href="/analytics"
                    className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                      isActive("/analytics")
                        ? "bg-blue-50 text-blue-700"
                        : "text-black hover:bg-gray-50 hover:text-blue-700"
                    }`}
                  >
                    <FaChartBar
                      className={`mr-3 h-5 w-5 ${
                        isActive("/analytics")
                          ? "text-blue-700"
                          : "text-black group-hover:text-blue-700"
                      }`}
                    />
                    Analytics
                    <span className="ml-auto bg-orange-100 text-orange-800 text-xs py-0.5 px-1.5 rounded-md">
                      Try it
                    </span>
                  </Link>
                </nav>
              </div>
            </div>
          </div>
        )}

        <main className="flex-1 md:ml-48">
          <div className="pt-5 md:pt-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
