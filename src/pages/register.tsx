import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import Head from "next/head";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";

// Validation schema for the registration form with password requirements
const registerSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(9, "Please enter at least 9 characters")
    .refine((value) => /[A-Za-z]/.test(value), {
      message: "One letter",
    })
    .refine((value) => /[0-9]/.test(value), {
      message: "One number",
    })
    .refine((value) => /[^A-Za-z0-9]/.test(value), {
      message: "One special character",
    }),
});

// TypeScript type for our form data
type RegisterFormData = z.infer<typeof registerSchema>;

export default function Register() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);

  // Initializing form with react-hook-form and zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const password = watch("password", "");
  const email = watch("email", "");
  const hasLetter = /[A-Za-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[^A-Za-z0-9]/.test(password);
  const hasMinLength = password.length >= 9;

  // Handling form submission
  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);

    try {
      // Here you would normally call your backend API
      console.log("Registration data submitted:", data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Show success toast
      toast.success("Account created successfully!");

      // Redirect to login
      router.push("/login");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Head>
        <title>Create Account | Bitly</title>
        <meta name="description" content="Create a new Bitly account" />
      </Head>

      <div className="flex min-h-screen">
        {/* Left side - Registration form */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 bg-white sm:px-16 md:px-24 lg:px-32 xl:px-40">
          <div className="mb-8">
            <Link href="/">
              <div className="text-[#f26e21] text-3xl font-bold">bitly</div>
            </Link>
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Create your account
          </h1>
          <p className="text-gray-600 mb-8">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Log in
            </Link>{" "}
            or{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Log in with SSO
            </Link>
          </p>

          {/* OAuth button */}
          <div className="space-y-4 mb-6">
            <button
              type="button"
              className="w-full flex items-center justify-center py-2.5 px-4 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <FaGoogle className="h-5 w-5 mr-2 text-gray-600" />
              Continue with Google
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
                    errors.email && emailFocused
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-blue-500 text-black focus:border-blue-500`}
                  onFocus={() => setEmailFocused(true)}
                />
                {errors.email && emailFocused && (
                  <p className="mt-1 text-sm text-red-600">
                    Please enter a valid email address
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
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    className={`w-full px-3 py-2 border ${
                      errors.password && passwordFocused
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-blue-500 text-black focus:border-blue-500`}
                    onFocus={() => setPasswordFocused(true)}
                  />
                </div>

                {/* Password requirements list - only show when password field is focused or has content */}
                {(passwordFocused || password.length > 0) && (
                  <div className="mt-2 space-y-1">
                    <div
                      className={`flex items-center text-sm ${
                        hasLetter ? "text-green-600" : "text-red-500"
                      }`}
                    >
                      <span className="inline-block w-4 mr-1">
                        {hasLetter ? "✓" : "×"}
                      </span>
                      One letter
                    </div>
                    <div
                      className={`flex items-center text-sm ${
                        hasNumber ? "text-green-600" : "text-red-500"
                      }`}
                    >
                      <span className="inline-block w-4 mr-1">
                        {hasNumber ? "✓" : "×"}
                      </span>
                      One number
                    </div>
                    <div
                      className={`flex items-center text-sm ${
                        hasSpecialChar ? "text-green-600" : "text-red-500"
                      }`}
                    >
                      <span className="inline-block w-4 mr-1">
                        {hasSpecialChar ? "✓" : "×"}
                      </span>
                      One special character
                    </div>
                    <div
                      className={`flex items-center text-sm ${
                        hasMinLength ? "text-green-600" : "text-red-500"
                      }`}
                    >
                      <span className="inline-block w-4 mr-1">
                        {hasMinLength ? "✓" : "×"}
                      </span>
                      9 or more characters
                    </div>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading || !!errors.email || !!errors.password}
                className="w-full py-2.5 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Creating account..." : "Create free account"}
              </button>
            </div>
          </form>

          <p className="mt-8 text-xs text-gray-500">
            By creating an account, you agree to Bitly's{" "}
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
                src="/qr-code-display.png"
                alt="QR Code example"
                className="w-full h-auto mb-8"
              />
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Power your links, QR Codes, and landing pages with Bitly's
                Connections Platform.
              </h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
