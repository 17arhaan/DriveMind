"use client"

import { useState, useRef, useEffect } from "react"
import { X, Send, Loader2, Maximize2, Minimize2, Navigation, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      content:
        "Hello! I'm DriveMind Assistant powered by Grok AI. How can I help you with traffic and navigation today?",
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const handleSendMessage = async (e) => {
    if (e) e.preventDefault()
    if (!input.trim()) return

    const userMessage = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Based on current traffic data, I recommend taking the outer ring road to avoid congestion.",
        "The fastest route to your destination would save approximately 15 minutes compared to standard navigation.",
        "There's an accident reported on MG Road. I suggest an alternative route via Residency Road.",
        "Traffic is currently heavy in the Whitefield area due to ongoing construction. Plan for an extra 20 minutes.",
        "I've analyzed your frequent routes and found a pattern of congestion between 5-7 PM. Would you like me to suggest optimal departure times?",
      ]

      const botMessage = {
        id: (Date.now() + 1).toString(),
        content: responses[Math.floor(Math.random() * responses.length)],
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
      setIsLoading(false)
    }, 1500)
  }

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <>
      {/* Chatbot toggle button with enhanced animations */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <motion.div
          className="relative"
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          {/* Pulsing background effect */}
          <motion.div
            className="absolute inset-0 rounded-full bg-[#00CFC1]/20"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />

          {/* Rotating ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-[#00CFC1]/30"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />

          <Button
            onClick={() => setIsOpen(!isOpen)}
            className={`h-16 w-16 rounded-full shadow-2xl relative overflow-hidden ${
              isOpen
                ? "bg-gradient-to-r from-stone-700 to-stone-800 hover:from-stone-800 hover:to-stone-900"
                : "bg-gradient-to-r from-[#00CFC1] to-[#00CFC1]/80 hover:from-[#00CFC1]/90 hover:to-[#00CFC1]/70"
            }`}
          >
            {/* Sparkle effects */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{
                rotate: isOpen ? 180 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              {!isOpen && (
                <>
                  <motion.div
                    className="absolute top-2 right-2"
                    animate={{
                      scale: [0, 1, 0],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: 0,
                    }}
                  >
                    <Sparkles className="h-3 w-3 text-white/60" />
                  </motion.div>
                  <motion.div
                    className="absolute bottom-2 left-2"
                    animate={{
                      scale: [0, 1, 0],
                      rotate: [0, -180, -360],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: 1,
                    }}
                  >
                    <Sparkles className="h-2 w-2 text-white/40" />
                  </motion.div>
                </>
              )}

              {isOpen ? <X className="h-7 w-7 text-white" /> : <Navigation className="h-7 w-7 text-white" />}
            </motion.div>

            {/* Notification dot */}
            {!isOpen && (
              <motion.div
                className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full border-2 border-white"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            )}
          </Button>
        </motion.div>
      </motion.div>

      {/* Chatbot interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-40"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <Card
              className={`border-white/10 glass-dark shadow-2xl overflow-hidden ${
                isExpanded
                  ? "w-[90vw] h-[80vh] sm:w-[600px] sm:h-[600px]"
                  : "w-[90vw] h-[450px] sm:w-[400px] sm:h-[500px]"
              }`}
            >
              <CardHeader className="border-b border-white/10 p-4 flex flex-row items-center justify-between">
                <div className="flex items-center gap-3">
                  <motion.div
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#00CFC1]/20 to-[#00CFC1]/10 border border-[#00CFC1]/30"
                    animate={{
                      boxShadow: [
                        "0 0 10px rgba(0, 207, 193, 0.3)",
                        "0 0 20px rgba(0, 207, 193, 0.5)",
                        "0 0 10px rgba(0, 207, 193, 0.3)",
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  >
                    <Navigation className="h-5 w-5 text-[#00CFC1]" />
                  </motion.div>
                  <div>
                    <h3 className="font-medium text-white">DriveMind Assistant</h3>
                    <div className="flex items-center gap-2">
                      <motion.div
                        className="h-2 w-2 bg-green-500 rounded-full"
                        animate={{
                          opacity: [1, 0.5, 1],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                      />
                      <p className="text-xs text-white/60">Powered by Grok AI</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleExpand}
                    className="h-8 w-8 text-white/60 hover:text-white hover:bg-white/10"
                  >
                    {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="h-8 w-8 text-white/60 hover:text-white hover:bg-white/10"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="p-0">
                <div className="h-[calc(100%-120px)] overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`flex max-w-[80%] items-start gap-3 rounded-2xl p-3 ${
                          message.role === "user"
                            ? "bg-gradient-to-r from-[#00CFC1]/20 to-[#00CFC1]/10 text-white border border-[#00CFC1]/30"
                            : "bg-white/5 text-white border border-white/10"
                        }`}
                      >
                        {message.role === "assistant" && (
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/placeholder.svg?height=32&width=32&text=AI" />
                            <AvatarFallback className="bg-[#00CFC1]/20 text-[#00CFC1] border border-[#00CFC1]/30">
                              <Navigation className="h-4 w-4" />
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div className="space-y-1">
                          <p className="text-sm">{message.content}</p>
                          <p className="text-xs text-white/50">
                            {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="flex max-w-[80%] items-center gap-3 rounded-2xl p-3 bg-white/5 text-white border border-white/10">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-[#00CFC1]/20 text-[#00CFC1] border border-[#00CFC1]/30">
                            <Navigation className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                        <Loader2 className="h-4 w-4 animate-spin text-[#00CFC1]" />
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </CardContent>

              <CardFooter className="border-t border-white/10 p-4">
                <form onSubmit={handleSendMessage} className="flex w-full items-center gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about traffic, routes, or navigation..."
                    className="flex-1 bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-[#00CFC1] focus:ring-[#00CFC1]/20"
                    disabled={isLoading}
                  />
                  <Button
                    type="submit"
                    size="icon"
                    disabled={isLoading || !input.trim()}
                    className="bg-gradient-to-r from-[#00CFC1] to-[#00CFC1]/80 hover:from-[#00CFC1]/90 hover:to-[#00CFC1]/70 text-[#02111B] border-0"
                  >
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Send</span>
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
