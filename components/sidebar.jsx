"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  AlertCircle,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Cog,
  Compass,
  FileVideo,
  LogOut,
  Map,
  MapPin,
  Users,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function Sidebar({ open, setOpen }) {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: BarChart3,
    },
    {
      title: "Live Traffic",
      href: "/live-traffic",
      icon: Compass,
    },
    {
      title: "Smart Route Planner",
      href: "/route-planner",
      icon: Map,
    },
    {
      title: "Route Optimizer",
      href: "/route-optimizer",
      icon: MapPin,
    },
    {
      title: "Audio & Video Logs",
      href: "/logs",
      icon: FileVideo,
    },
    {
      title: "Alerts & Notifications",
      href: "/alerts",
      icon: AlertCircle,
    },
    {
      title: "User Profiles",
      href: "/users",
      icon: Users,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: Cog,
    },
  ]

  if (!mounted) return null

  return (
    <>
      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-[#1F1B24] transition-transform duration-300 ease-in-out md:relative md:z-0",
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0 md:w-16",
        )}
      >
        <div className="flex h-16 items-center justify-between px-4">
          {open && <span className="text-xl font-bold text-white">DriveMind</span>}
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto text-white hover:bg-cyan-500/20"
            onClick={() => setOpen(!open)}
          >
            {open ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
          </Button>
        </div>

        <nav className="flex-1 space-y-1 px-2 py-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center rounded-xl px-3 py-2 text-sm font-medium transition-all duration-200 ease-in-out",
                pathname === item.href
                  ? "bg-cyan-500/20 text-cyan-400"
                  : "text-gray-300 hover:bg-cyan-500/10 hover:text-cyan-400",
                !open && "justify-center",
              )}
            >
              <item.icon
                className={cn(
                  "h-5 w-5 flex-shrink-0",
                  pathname === item.href ? "text-cyan-400" : "text-gray-400 group-hover:text-cyan-400",
                )}
              />
              {open && <span className="ml-3">{item.title}</span>}
              {!open && (
                <span className="sr-only absolute left-full ml-2 w-auto min-w-max rounded-md bg-black px-2 py-1 text-xs font-medium text-white opacity-0 group-hover:opacity-100">
                  {item.title}
                </span>
              )}
            </Link>
          ))}
        </nav>

        <div className="p-2">
          <Link
            href="/"
            className={cn(
              "group flex items-center rounded-xl px-3 py-2 text-sm font-medium text-gray-300 transition-all duration-200 ease-in-out hover:bg-red-500/10 hover:text-red-400",
              !open && "justify-center",
            )}
          >
            <LogOut className={cn("h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-red-400")} />
            {open && <span className="ml-3">Logout</span>}
            {!open && (
              <span className="sr-only absolute left-full ml-2 w-auto min-w-max rounded-md bg-black px-2 py-1 text-xs font-medium text-white opacity-0 group-hover:opacity-100">
                Logout
              </span>
            )}
          </Link>
        </div>
      </aside>
    </>
  )
}
