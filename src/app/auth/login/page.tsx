"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const LoginPage = () => {
  const [authMethod, setAuthMethod] = useState<"email" | "phone">("phone")
  const [phone, setPhone] = useState("")

  // Formats input automatically to Uzbekistan format: +998 (XX) XXX-XX-XX
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/\D/g, "") // Remove non-digits

    // Ensure it always starts with Uzbekistan country code 998
    if (!input.startsWith("998")) {
      input = "998" + input.replace(/^998?/, "")
    }

    // Limit length to 12 digits (998 + 9 local digits)
    input = input.slice(0, 12)

    // Apply standard format
    let formatted = "+998"
    if (input.length > 3) formatted += ` (${input.slice(3, 5)}`
    if (input.length >= 5) formatted += `) ${input.slice(5, 8)}`
    if (input.length >= 8) formatted += `-${input.slice(8, 10)}`
    if (input.length >= 10) formatted += `-${input.slice(10, 12)}`

    setPhone(formatted)
  }

  return (
    <div className="flex flex-col justify-center min-h-screen max-w-md mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col items-center justify-center mb-6 text-center">
        <h3 className="text-lg text-[#3525CD] font-semibold">SalonFlow</h3>
        <h2 className="text-3xl font-bold mb-2">Welcome back</h2>
        <p className="text-sm text-gray-600 font-light">
          Enter your details to access your wellness dashboard.
        </p>
      </div>

      {/* Social Login */}
      <div className="w-full mb-6 space-y-3">
        <Link href="/auth/telegram" className="block">
          <Button className="w-full flex items-center justify-center gap-2" variant="outline">
            <svg width="20px" height="20px" viewBox="0 0 256 256" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <g>
                <path d="M128,0 C57.307,0 0,57.307 0,128 C0,198.693 57.307,256 128,256 C198.693,256 256,198.693 256,128 C256,57.307 198.693,0 128,0 Z" fill="#40B3E0" />
                <path d="M190.2826,73.6308 L167.4206,188.8978 C167.4206,188.8978 164.2236,196.8918 155.4306,193.0548 L102.6726,152.6068 L83.4886,143.3348 L51.1946,132.4628 C51.1946,132.4628 46.2386,130.7048 45.7586,126.8678 C45.2796,123.0308 51.3546,120.9528 51.3546,120.9528 L179.7306,70.5928 C179.7306,70.5928 190.2826,65.9568 190.2826,73.6308" fill="#FFFFFF" />
                <path d="M98.6178,187.6035 C98.6178,187.6035 97.0778,187.4595 95.1588,181.3835 C93.2408,175.3085 83.4888,143.3345 83.4888,143.3345 L161.0258,94.0945 C161.0258,94.0945 165.5028,91.3765 165.3428,94.0945 C165.3428,94.0945 166.1418,94.5735 163.7438,96.8115 C161.3458,99.0505 102.8328,151.6475 102.8328,151.6475" fill="#D2E5F1" />
                <path d="M122.9015,168.1154 L102.0335,187.1414 C102.0335,188.3794 98.6175,187.6034 L102.6135,152.2624" fill="#B5CFE4" />
              </g>
            </svg>
            <span>Sign in with Telegram</span>
          </Button>
        </Link>
        <Link href="/auth/google" className="block">
          <Button className="w-full flex items-center justify-center gap-2" variant="outline">
            <svg width="20px" height="20px" viewBox="-3 0 262 262" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
              <path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4" />
              <path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853" />
              <path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05" />
              <path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335" />
            </svg>
            <span>Sign in with Google</span>
          </Button>
        </Link>
      </div>

      {/* Divider */}
      <div className="flex w-full items-center gap-2 mb-6">
        <div className="w-full h-[1px] bg-gray-200"></div>
        <span className="shrink-0 uppercase text-xs font-semibold text-[#777587]">OR</span>
        <div className="w-full h-[1px] bg-gray-200"></div>
      </div>

      {/* Method Switcher Tabs */}
      <div className="grid grid-cols-2 gap-1 p-1 bg-gray-100 rounded-lg mb-6 text-sm font-medium">
        <button
          type="button"
          onClick={() => setAuthMethod("phone")}
          className={`py-2 rounded-md transition-all ${authMethod === "phone"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-500 hover:text-gray-900"
            }`}
        >
          Phone Number
        </button>
        <button
          type="button"
          onClick={() => setAuthMethod("email")}
          className={`py-2 rounded-md transition-all ${authMethod === "email"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-500 hover:text-gray-900"
            }`}
        >
          Email
        </button>
      </div>

      {/* Form */}
      <form className="w-full">
        {authMethod === "phone" ? (
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
              Phone Number
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-lg select-none">🇺🇿</span>
              <input
                className="shadow appearance-none border rounded w-full py-2 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="phone"
                type="tel"
                value={phone}
                onChange={handlePhoneChange}
                placeholder="+998 (90) 123-45-67"
                required
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Uzbekistan phone numbers only (+998)</p>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email Address
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="email"
                type="email"
                placeholder="name@example.com"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="password"
                type="password"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="mb-6 flex items-center justify-between">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-blue-500 rounded border-gray-300"
                />
                <span className="ml-2 text-gray-700 text-sm">Remember me</span>
              </label>
              <a href="/auth/forgot-password" className="text-blue-500 text-sm hover:underline">
                Forgot password?
              </a>
            </div>
          </>
        )}

        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          type="submit"
        >
          {authMethod === "phone" ? "Send SMS Code" : "Sign In"}
        </button>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link href="/auth/register" className="text-blue-500 font-semibold hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  )
}

export default LoginPage