"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Lock, Mail, ArrowLeft, ArrowRight, Navigation, Route } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { motion } from "framer-motion"

export function LoginForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // For demo purposes, redirect to dashboard
    router.push("/dashboard")
    setIsLoading(false)
  }

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleGuestAccess = () => {
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gradient-animate flex flex-col">
      {/* Animated gradient orb */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-[#00CFC1]/20 via-[#690B22]/15 to-transparent blur-[120px] animate-slow-pulse z-0" />

      {/* Secondary animated orb */}
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-gradient-to-l from-[#00CFC1]/15 to-[#690B22]/10 blur-[100px] animate-slow-pulse-delayed z-0" />

      {/* Full width container with responsive constraints */}
      <div className="flex-1 flex flex-col px-6 py-8 w-full max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto relative z-10">
        {/* Back to home link */}
        <Link
          href="/"
          className="inline-flex items-center text-white/70 hover:text-[#00CFC1] transition-colors mb-8 self-start"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to home
        </Link>

        {/* Main login card with full width utilization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1 flex flex-col justify-center"
        >
          <Card className="border-white/10 glass shadow-2xl w-full bg-[#02111B]/60">
            <CardHeader className="space-y-6 text-center pb-10 px-8 sm:px-12 md:px-16 lg:px-20">
              <div className="flex items-center justify-center gap-3 text-3xl sm:text-4xl font-bold">
                <div className="relative">
                  <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#00CFC1]/20 to-[#00CFC1]/10 border border-[#00CFC1]/30">
                    <Navigation className="h-6 w-6 sm:h-8 sm:w-8 text-[#00CFC1]" />
                  </div>
                  {/* Animated route indicator */}
                  <motion.div
                    className="absolute -top-1 -right-1"
                    animate={{
                      rotate: 360,
                    }}
                    transition={{
                      duration: 8,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                  >
                    <div className="h-4 w-4 rounded-full bg-[#00CFC1]/20 border border-[#00CFC1]/50 flex items-center justify-center">
                      <Route className="h-2 w-2 text-[#00CFC1]" />
                    </div>
                  </motion.div>
                </div>
                <span className="text-white">
                  Drive<span className="text-[#00CFC1]">Mind</span>
                </span>
              </div>
              <div className="space-y-3">
                <CardTitle className="text-3xl sm:text-4xl text-white font-semibold">Welcome back</CardTitle>
                <CardDescription className="text-white/70 text-lg sm:text-xl">
                  Sign in to your account to continue
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-8 px-8 sm:px-12 md:px-16 lg:px-20 pb-12">
              {/* Form container with responsive grid */}
              <div className="max-w-2xl mx-auto w-full">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-white text-base font-medium">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="pl-12 h-14 text-base bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-[#00CFC1] focus:ring-[#00CFC1]/20"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="text-white text-base font-medium">
                        Password
                      </Label>
                      <Link
                        href="/forgot-password"
                        className="text-base text-[#00CFC1] hover:text-[#00CFC1]/80 hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="pl-12 pr-14 h-14 text-base bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-[#00CFC1] focus:ring-[#00CFC1]/20"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 p-0 hover:bg-transparent text-white/60 hover:text-white"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                      </Button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full h-14 btn-primary mt-8" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>

                <Button onClick={handleGuestAccess} variant="ghost" className="w-full h-14 mt-4 btn-outline">
                  Continue as Guest
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>

                <div className="relative mt-8">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full bg-white/10" />
                  </div>
                  <div className="relative flex justify-center text-sm uppercase">
                    <span className="bg-[#02111B] px-6 text-white/50 font-medium">OR CONTINUE WITH</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                  <Button variant="outline" className="h-14 btn-outline">
                    <svg className="mr-3 h-5 w-5" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Continue with Google
                  </Button>
                  <Button variant="outline" className="h-14 btn-outline">
                    <svg className="mr-3 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                    </svg>
                    Continue with Apple
                  </Button>
                </div>

                <div className="text-center text-base text-white/70 mt-8">
                  Don't have an account?{" "}
                  <Link href="/signup" className="text-[#00CFC1] hover:text-[#00CFC1]/80 hover:underline font-medium">
                    Sign up
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
