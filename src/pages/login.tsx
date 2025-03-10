import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import Head from "next/head";
import { FaGoogle, FaApple, FaEye, FaEyeSlash } from "react-icons/fa";

// Validation schema for the login form
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address or username"),
  password: z.string().min(1, "Please enter your password"),
});

// TypeScript type for our form data
type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [showEmailError, setShowEmailError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);

  // Initializing form with react-hook-form and zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const email = watch("email", "");
  const password = watch("password", "");

  // Show errors immediately when field is focused
  useEffect(() => {
    if (emailFocused) {
      setShowEmailError(true);
    }
  }, [emailFocused]);

  useEffect(() => {
    if (passwordFocused) {
      setShowPasswordError(true);
    }
  }, [passwordFocused]);

  // Handling form submission
  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);

    try {
      // Here you would normally call your backend API
      console.log("Login data submitted:", data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Show success toast
      toast.success("Logged in successfully!");

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Failed to login. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Handle email input focus
  const handleEmailFocus = () => {
    setEmailFocused(true);
    trigger("email"); // Trigger validation immediately
  };

  // Handle password input focus
  const handlePasswordFocus = () => {
    setPasswordFocused(true);
    trigger("password"); // Trigger validation immediately
  };

  return (
    <>
      <Head>
        <title>Log in | Bitly</title>
        <meta name="description" content="Log in to your Bitly account" />
      </Head>

      <div className="flex min-h-screen">
        {/* Left side - Login form */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 md:px-24 lg:px-32 xl:px-40 bg-white">
          <div className="mb-8">
            <Link href="/">
              <div className="text-[#f26e21] text-3xl font-bold">bitly</div>
            </Link>
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Log in and start sharing
          </h1>
          <p className="text-gray-600 mb-8">
            Don't have an account?{" "}
            <Link href="/register" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>

          {/* OAuth buttons */}
          <div className="space-y-4 mb-6">
            <button
              type="button"
              className="w-full flex items-center justify-center py-2.5 px-4 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <FaGoogle className="h-5 w-5 mr-2 text-gray-600" />
              Continue with Google
            </button>

            <button
              type="button"
              className="w-full flex items-center justify-center py-2.5 px-4 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <FaApple className="h-5 w-5 mr-2 text-gray-800" />
              Continue with Apple
            </button>

            <button
              type="button"
              className="w-full flex items-center justify-center py-2.5 px-4 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Continue with Single Sign On
            </button>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">OR</span>
            </div>
          </div>

          {/* Email/Password form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  className={`w-full px-3 py-2 border ${
                    errors.email && showEmailError
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-blue-500 text-black focus:border-blue-500`}
                  onFocus={handleEmailFocus}
                />
                {errors.email && showEmailError && (
                  <p className="mt-1 text-sm text-red-600">
                    Please enter a valid email address or username
                  </p>
                )}
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="text-blue-600 text-sm flex items-center"
                  >
                    {showPassword ? (
                      <>
                        <FaEyeSlash className="mr-1" /> Hide
                      </>
                    ) : (
                      <>
                        <FaEye className="mr-1" /> Show
                      </>
                    )}
                  </button>
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className={`w-full px-3 py-2 border ${
                    errors.password && showPasswordError
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-blue-500 text-black focus:border-blue-500`}
                  onFocus={handlePasswordFocus}
                />
                {errors.password && showPasswordError && (
                  <p className="mt-1 text-sm text-red-600">
                    Please enter your password
                  </p>
                )}
              </div>

              <div className="flex justify-end">
                <Link
                  href="/forgot-password"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Logging in..." : "Log in"}
              </button>
            </div>
          </form>

          <p className="mt-8 text-xs text-gray-500">
            By logging in with an account, you agree to Bitly's{" "}
            <Link href="/terms" className="text-blue-600 hover:underline">
              Terms of Service
            </Link>
            ,{" "}
            <Link href="/privacy" className="text-blue-600 hover:underline">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link
              href="/acceptable-use"
              className="text-blue-600 hover:underline"
            >
              Acceptable Use Policy
            </Link>
            .
          </p>
        </div>

        {/* Right side - Image/Info */}
        <div className="hidden lg:block lg:w-1/2 bg-[#f0f5fa]">
          <div className="h-full flex flex-col justify-center items-center px-12">
            <div className="max-w-lg">
              <img
                src="/analytics-dashboard.png"
                alt="Analytics Dashboard"
                className="w-full h-auto mb-8"
              />
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Analyze your links and QR Codes as easily as creating them
              </h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
