import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { FaCheck, FaCopy, FaArrowRight, FaLink } from "react-icons/fa";

export default function CreateShortLink() {
  const [url, setUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [isCustomAliasEnabled, setIsCustomAliasEnabled] = useState(false);
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!url) {
      setError("Please enter a URL");
      return;
    }

    // Simple URL validation
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      setError("Please enter a valid URL including http:// or https://");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // In a real application, you would make an API call here
      // const response = await fetch('/api/shorten', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     url,
      //     customAlias: isCustomAliasEnabled ? customAlias : undefined,
      //   }),
      // });

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock successful response
      // const data = await response.json();
      const mockShortCode =
        isCustomAliasEnabled && customAlias
          ? customAlias
          : `${Math.random().toString(36).substr(2, 6)}`;

      setShortenedUrl(`yourbrnd.co/${mockShortCode}`);
      setIsLoading(false);
    } catch (error) {
      console.error("Error shortening URL:", error);
      setError("Failed to shorten URL. Please try again.");
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`https://${shortenedUrl}`);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleCreateAnother = () => {
    setUrl("");
    setCustomAlias("");
    setShortenedUrl("");
    setError("");
  };

  const handleViewLinks = () => {
    router.push("/links");
  };

  return (
    <>
      <Head>
        <title>Create Short URL - Your URL Shortener</title>
      </Head>

      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-3xl font-bold text-center mb-8">
          Shorten Your URL
        </h1>

        {!shortenedUrl ? (
          <div className="bg-white rounded-lg shadow-md p-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label
                  htmlFor="url"
                  className="block text-sm font-medium text-black mb-1"
                >
                  Enter the long URL
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLink className="h-5 w-5 text-black" />
                  </div>
                  <input
                    type="text"
                    id="url"
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-12 py-3 sm:text-sm border-gray-300 rounded-md text-black placeholder-black"
                    placeholder="https://example.com/your-long-url-goes-here"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                </div>
                {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
              </div>

              <div className="mb-6">
                <div className="flex items-center">
                  <input
                    id="custom-alias"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={isCustomAliasEnabled}
                    onChange={() =>
                      setIsCustomAliasEnabled(!isCustomAliasEnabled)
                    }
                  />
                  <label
                    htmlFor="custom-alias"
                    className="ml-2 block text-sm text-black"
                  >
                    Use custom alias (optional)
                  </label>
                </div>

                {isCustomAliasEnabled && (
                  <div className="mt-3">
                    <label
                      htmlFor="alias"
                      className="block text-sm font-medium text-black"
                    >
                      Custom alias
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-black sm:text-sm">
                        yourbrnd.co/
                      </span>
                      <input
                        type="text"
                        id="alias"
                        className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 text-black placeholder-black"
                        placeholder="my-custom-url"
                        value={customAlias}
                        onChange={(e) => setCustomAlias(e.target.value)}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                      Shortening...
                    </>
                  ) : (
                    <>
                      Shorten URL
                      <FaArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <FaCheck className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">
                URL shortened successfully!
              </h2>
            </div>

            <div className="mb-6">
              <label
                htmlFor="shortened-url"
                className="block text-sm font-medium text-black mb-1"
              >
                Your shortened URL
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="text"
                  id="shortened-url"
                  className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-l-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 text-black"
                  value={`https://${shortenedUrl}`}
                  readOnly
                />
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-black sm:text-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {isCopied ? (
                    <>
                      <FaCheck className="h-5 w-5 text-green-600" />
                      <span className="ml-1 text-green-600">Copied!</span>
                    </>
                  ) : (
                    <>
                      <FaCopy className="h-5 w-5" />
                      <span className="ml-1">Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
              <button
                type="button"
                onClick={handleCreateAnother}
                className="w-full sm:w-1/2 bg-white border border-gray-300 hover:bg-gray-50 text-black font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Create another
              </button>
              <button
                type="button"
                onClick={handleViewLinks}
                className="w-full sm:w-1/2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                View all links
              </button>
            </div>
          </div>
        )}

        <div className="mt-8 bg-gray-50 rounded-lg p-6 border border-gray-200">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Pro Tips</h2>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="flex-shrink-0 h-5 w-5 text-blue-500">•</span>
              <span className="ml-2 text-gray-600">
                Use custom aliases for memorable and branded short links
              </span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-5 w-5 text-blue-500">•</span>
              <span className="ml-2 text-gray-600">
                Track clicks and analytics for all your shortened URLs
              </span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-5 w-5 text-blue-500">•</span>
              <span className="ml-2 text-gray-600">
                Create QR codes from your short links for print materials
              </span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
