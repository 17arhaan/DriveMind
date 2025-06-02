"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Brain, User, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function LandingPage() {
  const router = useRouter()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 via-stone-900 to-gray-900 overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=20&width=20')] opacity-[0.03]" />

      {/* Animated gradient orb */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-amber-500/10 to-orange-400/5 blur-[100px] animate-slow-pulse" />

      {/* Header with user icon */}
      <header className="absolute top-0 left-0 right-0 z-20 p-4 sm:p-6">
        <div className="flex justify-end">
          <Button
            onClick={() => router.push("/login")}
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full bg-gray-800/50 backdrop-blur-sm border border-stone-700/50 hover:bg-stone-700/50 hover:border-amber-500/30 transition-all duration-200"
          >
            <User className="h-5 w-5 text-stone-300" />
            <span className="sr-only">Login</span>
          </Button>
        </div>
      </header>

      {/* Main content */}
      <div className="container relative z-10 mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen max-w-4xl">
        <motion.div
          className="text-center w-full"
          variants={containerVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
        >
          {/* Logo and title */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-amber-500/20 to-orange-400/20 rounded-2xl backdrop-blur-sm mb-6">
              <Brain className="h-12 w-12 sm:h-16 sm:w-16 text-amber-400" />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight">
              Drive<span className="text-amber-400">Mind</span>
            </h1>
            <p className="mt-4 text-lg sm:text-xl md:text-2xl text-stone-300 max-w-3xl mx-auto">
              AI-Powered Smart Navigation for India
            </p>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="mb-10 text-stone-400 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed px-4"
          >
            Revolutionizing traffic management and navigation with advanced AI technology tailored for Indian road
            conditions. Get real-time updates, smart route suggestions, and traffic predictions.
          </motion.p>

          {/* CTA button */}
          <motion.div variants={itemVariants}>
            <Button
              onClick={() => router.push("/login")}
              className="px-8 py-6 text-lg bg-amber-500 hover:bg-amber-600 transition-colors h-12 sm:h-14 text-base sm:text-lg font-medium text-gray-900"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
