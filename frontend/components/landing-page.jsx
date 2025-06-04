"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Navigation, MapPin, Route, User, ArrowRight } from "lucide-react"
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

  const logoVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 0.8,
      },
    },
  }

  const iconVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Moving gradient background */}
      <div className="absolute inset-0 bg-gradient-animate z-0"></div>

      {/* Animated gradient orb */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-[#00CFC1]/20 via-[#690B22]/15 to-transparent blur-[120px] animate-slow-pulse z-0" />

      {/* Secondary animated orb */}
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-gradient-to-l from-[#00CFC1]/15 to-[#690B22]/10 blur-[100px] animate-slow-pulse-delayed z-0" />

      {/* Header with user icon */}
      <header className="absolute top-0 left-0 right-0 z-20 p-4 sm:p-6">
        <div className="flex justify-end">
          <Button
            onClick={() => router.push("/login")}
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full glass border border-white/20 hover:border-[#00CFC1]/40 transition-all duration-200"
          >
            <User className="h-5 w-5 text-white" />
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
            <motion.div
              variants={logoVariants}
              className="inline-flex items-center justify-center p-4 glass-accent rounded-3xl mb-6 border border-[#00CFC1]/30 relative"
            >
              {/* Animated background elements */}
              <motion.div
                className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#00CFC1]/10 to-[#00CFC1]/5"
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />

              {/* Main navigation icon */}
              <motion.div variants={iconVariants} animate="animate" className="relative z-10">
                <Navigation className="h-16 w-16 sm:h-20 sm:w-20 text-[#00CFC1]" />
              </motion.div>

              {/* Floating route indicators */}
              <motion.div
                className="absolute -top-2 -right-2"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                <div className="h-6 w-6 rounded-full bg-[#00CFC1]/20 border border-[#00CFC1]/50 flex items-center justify-center">
                  <Route className="h-3 w-3 text-[#00CFC1]" />
                </div>
              </motion.div>

              <motion.div
                className="absolute -bottom-2 -left-2"
                animate={{
                  y: [0, -8, 0],
                  rotate: [0, 10, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 1,
                }}
              >
                <div className="h-6 w-6 rounded-full bg-[#00CFC1]/20 border border-[#00CFC1]/50 flex items-center justify-center">
                  <MapPin className="h-3 w-3 text-[#00CFC1]" />
                </div>
              </motion.div>
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight"
              animate={{
                textShadow: [
                  "0 0 20px rgba(0, 207, 193, 0.3)",
                  "0 0 30px rgba(0, 207, 193, 0.5)",
                  "0 0 20px rgba(0, 207, 193, 0.3)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              Drive<span className="text-[#00CFC1]">Mind</span>
            </motion.h1>
            <p className="mt-4 text-lg sm:text-xl md:text-2xl text-white/80 max-w-3xl mx-auto">
              AI-Powered Smart Navigation for India
            </p>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="mb-10 text-white/70 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed px-4"
          >
            Revolutionizing traffic management and navigation with advanced AI technology tailored for Indian road
            conditions. Get real-time updates, smart route suggestions, and traffic predictions.
          </motion.p>

          {/* Glass effect CTA button */}
          <motion.div variants={itemVariants} className="flex justify-center">
            <motion.button
              onClick={() => router.push("/login")}
              className="px-8 py-3 rounded-lg btn-glass-white text-white font-medium text-base sm:text-lg flex items-center justify-center gap-2 transition-all duration-300"
              whileHover={{
                scale: 1.02,
                boxShadow: "0 0 30px rgba(0, 207, 193, 0.3)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Get Started</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              >
                <ArrowRight className="h-5 w-5" />
              </motion.div>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
