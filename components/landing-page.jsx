"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Brain, User, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

export function LandingPage() {
  const router = useRouter()
  const [isLoaded, setIsLoaded] = useState(false)

  // Mouse tracking for interactive button
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Spring animations for smooth mouse following
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 })

  // Transform mouse position to rotation and glow
  const rotateX = useTransform(springY, [-100, 100], [10, -10])
  const rotateY = useTransform(springX, [-100, 100], [-10, 10])
  const glowIntensity = useTransform([springX, springY], ([x, y]) => Math.min(Math.sqrt(x * x + y * y) / 100, 1))

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    mouseX.set(e.clientX - centerX)
    mouseY.set(e.clientY - centerY)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

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

          {/* Enhanced CTA button with glass effect and mouse interaction */}
          <motion.div variants={itemVariants} className="relative">
            <motion.div
              className="relative inline-block perspective-1000"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                perspective: "1000px",
              }}
            >
              {/* Animated background glow */}
              <motion.div
                className="absolute -inset-4 rounded-full opacity-60 blur-xl"
                style={{
                  background: useTransform(
                    glowIntensity,
                    [0, 1],
                    [
                      "radial-gradient(circle, rgba(245, 158, 11, 0.3) 0%, rgba(251, 191, 36, 0.1) 50%, transparent 100%)",
                      "radial-gradient(circle, rgba(245, 158, 11, 0.6) 0%, rgba(251, 191, 36, 0.3) 50%, rgba(245, 158, 11, 0.1) 100%)",
                    ],
                  ),
                }}
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.6, 0.8, 0.6],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />

              {/* Main button with glass effect */}
              <motion.button
                onClick={() => router.push("/login")}
                className="relative group px-8 py-4 h-16 sm:h-18 rounded-2xl overflow-hidden"
                style={{
                  rotateX,
                  rotateY,
                  transformStyle: "preserve-3d",
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                {/* Glass background layers */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/10 to-transparent backdrop-blur-xl rounded-2xl border border-white/20" />
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400/30 via-amber-500/20 to-orange-500/30 rounded-2xl" />

                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-2xl"
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                    ease: "linear",
                  }}
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                    transform: "skewX(-20deg)",
                  }}
                />

                {/* Interactive glow overlay */}
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background: useTransform(
                      glowIntensity,
                      [0, 1],
                      [
                        "radial-gradient(circle at center, transparent 0%, transparent 100%)",
                        "radial-gradient(circle at center, rgba(245, 158, 11, 0.3) 0%, transparent 70%)",
                      ],
                    ),
                  }}
                />

                {/* Button content */}
                <motion.div
                  className="relative z-10 flex items-center justify-center gap-3 text-lg sm:text-xl font-semibold text-white"
                  style={{
                    textShadow: "0 2px 10px rgba(0,0,0,0.3)",
                  }}
                >
                  <motion.span
                    initial={{ x: 0 }}
                    whileHover={{ x: -4 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    Get Started
                  </motion.span>

                  <motion.div
                    className="relative"
                    initial={{ x: 0, rotate: 0 }}
                    whileHover={{ x: 8, rotate: 45 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <ArrowRight className="h-6 w-6" />

                    {/* Arrow trail effect */}
                    <motion.div
                      className="absolute inset-0"
                      initial={{ opacity: 0, x: -10 }}
                      whileHover={{ opacity: [0, 1, 0], x: [0, 15, 30] }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                      <ArrowRight className="h-6 w-6 text-amber-300" />
                    </motion.div>
                  </motion.div>
                </motion.div>

                {/* Floating particles effect */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-amber-400 rounded-full opacity-60"
                    style={{
                      left: `${20 + i * 12}%`,
                      top: `${30 + (i % 2) * 40}%`,
                    }}
                    animate={{
                      y: [-5, -15, -5],
                      opacity: [0.6, 1, 0.6],
                      scale: [1, 1.5, 1],
                    }}
                    transition={{
                      duration: 2 + i * 0.3,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                      delay: i * 0.2,
                    }}
                  />
                ))}

                {/* Border highlight */}
                <div className="absolute inset-0 rounded-2xl border border-amber-400/50 group-hover:border-amber-400/80 transition-colors duration-300" />
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
