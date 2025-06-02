"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Bot, X, Send, Loader2, Maximize2, Minimize2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Brain } from "lucide-react"

type Message = {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
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
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = {
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

      const botMessage: Message = {
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
      {/* Chatbot toggle button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className={`h-14 w-14 rounded-full shadow-lg ${
            isOpen ? "bg-stone-700 hover:bg-stone-800" : "bg-amber-500 hover:bg-amber-600"
          }`}
        >
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
            {isOpen ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
          </motion.div>
        </Button>
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
              className={`border-stone-700/50 bg-gray-800/90 backdrop-blur-sm shadow-2xl overflow-hidden ${
                isExpanded
                  ? "w-[90vw] h-[80vh] sm:w-[600px] sm:h-[600px]"
                  : "w-[90vw] h-[450px] sm:w-[400px] sm:h-[500px]"
              }`}
            >
              <CardHeader className="border-b border-stone-700/50 p-4 flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/20">
                    <Brain className="h-4 w-4 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">DriveMind Assistant</h3>
                    <p className="text-xs text-stone-400">Powered by Grok AI</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleExpand}
                    className="h-8 w-8 text-stone-400 hover:text-white"
                  >
                    {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="h-8 w-8 text-stone-400 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="p-0">
                <div className="h-[calc(100%-120px)] overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`flex max-w-[80%] items-start gap-3 rounded-2xl p-3 ${
                          message.role === "user" ? "bg-amber-500/20 text-white" : "bg-stone-700/50 text-white"
                        }`}
                      >
                        {message.role === "assistant" && (
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/placeholder.svg?height=32&width=32&text=AI" />
                            <AvatarFallback className="bg-amber-500/20 text-amber-400">
                              <Brain className="h-4 w-4" />
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div className="space-y-1">
                          <p className="text-sm">{message.content}</p>
                          <p className="text-xs text-stone-400">
                            {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="flex max-w-[80%] items-center gap-3 rounded-2xl p-3 bg-stone-700/50 text-white">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-amber-500/20 text-amber-400">
                            <Brain className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                        <Loader2 className="h-4 w-4 animate-spin text-amber-400" />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </CardContent>

              <CardFooter className="border-t border-stone-700/50 p-4">
                <form onSubmit={handleSendMessage} className="flex w-full items-center gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about traffic, routes, or navigation..."
                    className="flex-1 bg-stone-700/50 border-stone-600/50 text-white placeholder:text-stone-500 focus:border-amber-500"
                    disabled={isLoading}
                  />
                  <Button
                    type="submit"
                    size="icon"
                    disabled={isLoading || !input.trim()}
                    className="bg-amber-500 hover:bg-amber-600 text-gray-900"
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
