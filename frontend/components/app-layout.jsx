"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Navbar } from "@/components/navbar"
import { Chatbot } from "@/components/chatbot"

export function AppLayout({ children, title }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="flex h-screen bg-[#02111B]">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar title={title} toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
      <Chatbot />
    </div>
  )
}
