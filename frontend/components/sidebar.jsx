"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  Clock,
  LayoutDashboard,
  LogOut,
  Map,
  Settings,
  Users,
  X,
  AlertTriangle,
  Navigation,
  ChevronRight,
  Activity,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

const navigationItems = [
  {
    title: "Overview",
    items: [
      { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard", badge: null },
      { href: "/live-traffic", icon: BarChart3, label: "Live Traffic", badge: "24" },
      { href: "/alerts", icon: AlertTriangle, label: "Alerts", badge: "3" },
    ],
  },
  {
    title: "Navigation",
    items: [
      { href: "/route-planner", icon: Map, label: "Route Planner", badge: null },
      { href: "/route-optimizer", icon: Clock, label: "Route Optimizer", badge: "AI" },
    ],
  },
  {
    title: "Management",
    items: [
      { href: "/logs", icon: Activity, label: "Logs", badge: null },
      { href: "/users", icon: Users, label: "Users", badge: null },
      { href: "/settings", icon: Settings, label: "Settings", badge: null },
    ],
  },
]

export function Sidebar({ className, open, setOpen }) {
  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="p-0 glass-sidebar border-r border-white/10 w-80">
          <SidebarContent setOpen={setOpen} />
        </SheetContent>
      </Sheet>
      <div className={cn("hidden border-r border-white/10 glass-sidebar lg:block", className)}>
        <div className="flex h-full w-80 flex-col">
          <SidebarContent />
        </div>
      </div>
    </>
  )
}

function SidebarContent({ setOpen }) {
  return (
    <nav className="flex h-full flex-col">
      {/* Header */}
      <div className="flex h-16 items-center justify-between border-b border-white/10 px-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#00CFC1] to-[#00CFC1]/80 shadow-lg">
            <Navigation className="h-6 w-6 text-[#02111B]" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">DriveMind</h1>
            <p className="text-xs text-white/60">Smart Navigation</p>
          </div>
        </Link>
        {setOpen && (
          <Button variant="ghost" size="icon" className="h-8 w-8 text-white lg:hidden" onClick={() => setOpen(false)}>
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        )}
      </div>

      {/* User Profile Section */}
      <div className="border-b border-white/10 p-6">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar className="h-12 w-12 border-2 border-[#00CFC1]/30">
              <AvatarImage src="/placeholder.svg?height=48&width=48&text=JD" />
              <AvatarFallback className="bg-[#00CFC1]/20 text-[#00CFC1] font-semibold">JD</AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-green-500 border-2 border-[#02111B]" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-white truncate">John Doe</h3>
            <p className="text-sm text-white/60 truncate">Traffic Manager</p>
            <div className="flex items-center gap-1 mt-1">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span className="text-xs text-green-400">Online</span>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-white/60 hover:text-white">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-4 py-4">
        <div className="space-y-6">
          {navigationItems.map((section, index) => (
            <div key={index}>
              <h4 className="mb-3 px-2 text-xs font-semibold text-white/50 uppercase tracking-wider">
                {section.title}
              </h4>
              <div className="space-y-1">
                {section.items.map((item) => (
                  <NavLink key={item.href} {...item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Logout */}
      <div className="border-t border-white/10 p-4">
        <Button
          variant="ghost"
          className="w-full justify-start text-white/70 hover:text-white hover:bg-white/5 glass rounded-xl h-12"
        >
          <LogOut className="mr-3 h-5 w-5" />
          <span className="font-medium">Log out</span>
        </Button>
      </div>
    </nav>
  )
}

function NavLink({ href, icon: Icon, label, badge }) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200 group",
        isActive
          ? "bg-gradient-to-r from-[#00CFC1]/20 to-[#00CFC1]/10 text-[#00CFC1] shadow-lg border border-[#00CFC1]/30"
          : "text-white/70 hover:text-white hover:bg-white/5 hover:shadow-md",
      )}
    >
      <div
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-lg transition-colors",
          isActive
            ? "bg-[#00CFC1]/20 text-[#00CFC1]"
            : "bg-white/5 text-white/60 group-hover:bg-white/10 group-hover:text-white",
        )}
      >
        <Icon className="h-4 w-4" />
      </div>
      <span className="flex-1">{label}</span>
      {badge && (
        <Badge
          variant={badge === "AI" ? "default" : "secondary"}
          className={cn(
            "text-xs font-medium",
            badge === "AI"
              ? "bg-gradient-to-r from-purple-500 to-violet-500 text-white border-0"
              : isActive
                ? "bg-[#00CFC1]/20 text-[#00CFC1] border-[#00CFC1]/30"
                : "bg-white/10 text-white/70 border-white/20",
          )}
        >
          {badge}
        </Badge>
      )}
    </Link>
  )
}
