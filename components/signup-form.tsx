"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Brain, Car, Eye, EyeOff, Lock, Mail, MapPin, Phone, User, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { motion } from "framer-motion"

const indianCities = [
  "Bengaluru",
  "Mumbai",
  "Delhi",
  "Chennai",
  "Kolkata",
  "Hyderabad",
  "Pune",
  "Ahmedabad",
  "Jaipur",
  "Surat",
  "Lucknow",
  "Kanpur",
  "Nagpur",
  "Indore",
  "Thane",
  "Bhopal",
  "Visakhapatnam",
  "Pimpri-Chinchwad",
  "Patna",
  "Vadodara",
  "Ghaziabad",
  "Ludhiana",
  "Agra",
  "Nashik",
  "Faridabad",
  "Meerut",
  "Rajkot",
  "Kalyan-Dombivli",
  "Vasai-Virar",
  "Varanasi",
  "Srinagar",
  "Dhanbad",
  "Jodhpur",
  "Amritsar",
  "Raipur",
  "Allahabad",
  "Coimbatore",
  "Jabalpur",
  "Gwalior",
  "Vijayawada",
  "Madurai",
  "Guwahati",
  "Chandigarh",
  "Hubli-Dharwad",
  "Mysore",
  "Tiruchirappalli",
  "Bareilly",
  "Aligarh",
  "Tiruppur",
  "Moradabad",
]

const vehicleTypes = ["Car", "Motorcycle", "Auto Rickshaw", "Bus", "Truck", "Bicycle", "Electric Vehicle", "Other"]

const userRoles = [
  "Regular Commuter",
  "Professional Driver",
  "Traffic Police",
  "Emergency Services",
  "Public Transport Operator",
  "Delivery Personnel",
  "Fleet Manager",
  "City Planner",
]

export function SignupForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // Basic Info
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",

    // Location & Role
    city: "",
    area: "",
    role: "",

    // Vehicle & Preferences
    primaryVehicle: "",
    licenseNumber: "",
    frequentRoutes: "",
    emergencyContact: "",

    // Agreements
    termsAccepted: false,
    dataProcessingAccepted: false,
    notificationsAccepted: true,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (step < 3) {
      setStep(step + 1)
      return
    }

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // For demo purposes, redirect to dashboard
    router.push("/dashboard")
    setIsLoading(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }))
  }

  const canProceedStep1 =
    formData.firstName &&
    formData.lastName &&
    formData.email &&
    formData.password &&
    formData.confirmPassword &&
    formData.phone &&
    formData.password === formData.confirmPassword

  const canProceedStep2 = formData.city && formData.role

  const canSubmit = canProceedStep2 && formData.termsAccepted && formData.dataProcessingAccepted

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-stone-900 to-gray-900 flex flex-col">
      {/* Animated gradient orb */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-amber-500/10 to-orange-400/5 blur-[100px] animate-slow-pulse" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg z-10 mx-auto px-4 py-6"
      >
        <Link href="/" className="inline-flex items-center text-stone-400 hover:text-amber-400 transition-colors mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to home
        </Link>

        <Card className="border-stone-700/50 bg-gray-800/40 backdrop-blur-sm shadow-2xl">
          <CardHeader className="space-y-1 text-center">
            <div className="flex items-center justify-center gap-2 text-2xl font-bold">
              <Brain className="h-8 w-8 text-amber-400" />
              <span className="text-white">DriveMind</span>
            </div>
            <CardTitle className="text-xl text-white">Create your account</CardTitle>
            <CardDescription className="text-stone-400">Join India's smart navigation network</CardDescription>
            <div className="flex justify-center space-x-2 pt-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`h-1.5 w-8 rounded-full transition-colors ${i <= step ? "bg-amber-500" : "bg-stone-700"}`}
                />
              ))}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-stone-300">
                        First Name
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-stone-500" />
                        <Input
                          id="firstName"
                          name="firstName"
                          placeholder="First name"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="pl-10 bg-stone-700/50 border-stone-600/50 text-white placeholder:text-stone-500 focus:border-amber-500"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-stone-300">
                        Last Name
                      </Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        placeholder="Last name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="bg-stone-700/50 border-stone-600/50 text-white placeholder:text-stone-500 focus:border-amber-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-stone-300">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-stone-500" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="pl-10 bg-stone-700/50 border-stone-600/50 text-white placeholder:text-stone-500 focus:border-amber-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-stone-300">
                      Phone Number
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-stone-500" />
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+91 XXXXX XXXXX"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="pl-10 bg-stone-700/50 border-stone-600/50 text-white placeholder:text-stone-500 focus:border-amber-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-stone-300">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-stone-500" />
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="pl-10 pr-10 bg-stone-700/50 border-stone-600/50 text-white placeholder:text-stone-500 focus:border-amber-500"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-stone-400 hover:text-white"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-stone-300">
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-stone-500" />
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="pl-10 pr-10 bg-stone-700/50 border-stone-600/50 text-white placeholder:text-stone-500 focus:border-amber-500"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-stone-400 hover:text-white"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  {formData.password !== formData.confirmPassword && formData.confirmPassword && (
                    <p className="text-sm text-red-400">Passwords do not match</p>
                  )}
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-stone-300">
                      City
                    </Label>
                    <Select onValueChange={(value) => handleSelectChange("city", value)} required>
                      <SelectTrigger className="bg-stone-700/50 border-stone-600/50 text-white focus:border-amber-500">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-stone-500" />
                          <SelectValue placeholder="Select your city" />
                        </div>
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-stone-700 text-white">
                        {indianCities.map((city) => (
                          <SelectItem key={city} value={city} className="focus:bg-stone-700 focus:text-white">
                            {city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="area" className="text-stone-300">
                      Area/Locality (Optional)
                    </Label>
                    <Input
                      id="area"
                      name="area"
                      placeholder="e.g., Koramangala, Whitefield"
                      value={formData.area}
                      onChange={handleInputChange}
                      className="bg-stone-700/50 border-stone-600/50 text-white placeholder:text-stone-500 focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="role" className="text-stone-300">
                      Role/Profession
                    </Label>
                    <Select onValueChange={(value) => handleSelectChange("role", value)} required>
                      <SelectTrigger className="bg-stone-700/50 border-stone-600/50 text-white focus:border-amber-500">
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-stone-700 text-white">
                        {userRoles.map((role) => (
                          <SelectItem key={role} value={role} className="focus:bg-stone-700 focus:text-white">
                            {role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="primaryVehicle" className="text-stone-300">
                      Primary Vehicle (Optional)
                    </Label>
                    <Select onValueChange={(value) => handleSelectChange("primaryVehicle", value)}>
                      <SelectTrigger className="bg-stone-700/50 border-stone-600/50 text-white focus:border-amber-500">
                        <div className="flex items-center gap-2">
                          <Car className="h-4 w-4 text-stone-500" />
                          <SelectValue placeholder="Select vehicle type" />
                        </div>
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-stone-700 text-white">
                        {vehicleTypes.map((vehicle) => (
                          <SelectItem key={vehicle} value={vehicle} className="focus:bg-stone-700 focus:text-white">
                            {vehicle}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="frequentRoutes" className="text-stone-300">
                      Frequent Routes (Optional)
                    </Label>
                    <Input
                      id="frequentRoutes"
                      name="frequentRoutes"
                      placeholder="e.g., Home to Office, Airport route"
                      value={formData.frequentRoutes}
                      onChange={handleInputChange}
                      className="bg-stone-700/50 border-stone-600/50 text-white placeholder:text-stone-500 focus:border-amber-500"
                    />
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="licenseNumber" className="text-stone-300">
                      Driving License Number (Optional)
                    </Label>
                    <Input
                      id="licenseNumber"
                      name="licenseNumber"
                      placeholder="DL number for verification"
                      value={formData.licenseNumber}
                      onChange={handleInputChange}
                      className="bg-stone-700/50 border-stone-600/50 text-white placeholder:text-stone-500 focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="emergencyContact" className="text-stone-300">
                      Emergency Contact (Optional)
                    </Label>
                    <Input
                      id="emergencyContact"
                      name="emergencyContact"
                      placeholder="Emergency contact number"
                      value={formData.emergencyContact}
                      onChange={handleInputChange}
                      className="bg-stone-700/50 border-stone-600/50 text-white placeholder:text-stone-500 focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="terms"
                        checked={formData.termsAccepted}
                        onCheckedChange={(checked) => handleCheckboxChange("termsAccepted", checked as boolean)}
                        className="border-stone-600 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
                      />
                      <Label htmlFor="terms" className="text-sm text-stone-300">
                        I agree to the{" "}
                        <Link href="/terms" className="text-amber-400 hover:underline">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy" className="text-amber-400 hover:underline">
                          Privacy Policy
                        </Link>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="dataProcessing"
                        checked={formData.dataProcessingAccepted}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange("dataProcessingAccepted", checked as boolean)
                        }
                        className="border-stone-600 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
                      />
                      <Label htmlFor="dataProcessing" className="text-sm text-stone-300">
                        I consent to processing of my location data for traffic optimization
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="notifications"
                        checked={formData.notificationsAccepted}
                        onCheckedChange={(checked) => handleCheckboxChange("notificationsAccepted", checked as boolean)}
                        className="border-stone-600 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
                      />
                      <Label htmlFor="notifications" className="text-sm text-stone-300">
                        Send me traffic alerts and route notifications
                      </Label>
                    </div>
                  </div>
                </motion.div>
              )}

              <div className="flex gap-3">
                {step > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(step - 1)}
                    className="flex-1 bg-transparent border-stone-600 text-stone-300 hover:bg-stone-700 hover:text-white"
                  >
                    Back
                  </Button>
                )}
                <Button
                  type="submit"
                  className="flex-1 bg-amber-500 hover:bg-amber-600 text-gray-900 font-medium transition-colors"
                  disabled={
                    (step === 1 && !canProceedStep1) ||
                    (step === 2 && !canProceedStep2) ||
                    (step === 3 && (!canSubmit || isLoading))
                  }
                >
                  {step === 3 ? (isLoading ? "Creating Account..." : "Create Account") : "Continue"}
                </Button>
              </div>
            </form>

            {step === 1 && (
              <>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full bg-stone-700/50" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-gray-800 px-2 text-stone-500">Or</span>
                  </div>
                </div>

                <div className="text-center text-sm text-stone-400">
                  Already have an account?{" "}
                  <Link href="/login" className="text-amber-400 hover:text-amber-300 hover:underline">
                    Sign in
                  </Link>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
