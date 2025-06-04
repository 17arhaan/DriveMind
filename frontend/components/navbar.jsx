"use client"

import { Bell, Menu, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

export function Navbar({ className, title, toggleSidebar }) {
  return (
    <header className={cn("sticky top-0 z-30 flex h-14 items-center gap-4 glass-navbar px-4 sm:px-6", className)}>
      <Button variant="ghost" size="icon" className="lg:hidden text-white" onClick={toggleSidebar}>
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="font-semibold text-lg text-white">{title}</div>
      <div className="relative ml-auto flex-1 max-w-md">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-white/50" />
        <Input
          type="search"
          placeholder="Search..."
          className="w-full pl-8 text-white placeholder:text-white/40 focus:border-[#00CFC1] focus:ring-[#00CFC1]/20"
        />
      </div>
      <Button variant="ghost" size="icon" className="text-white relative glass rounded-full">
        <Bell className="h-5 w-5" />
        <span className="absolute top-1 right-1 w-2 h-2 bg-[#00CFC1] rounded-full"></span>
        <span className="sr-only">Notifications</span>
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full h-8 w-8 aspect-square glass text-white hover:bg-white/10"
          >
            <span className="font-semibold text-sm">JD</span>
            <span className="sr-only">User menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="glass-dark border-white/10 text-white">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-white/10" />
          <DropdownMenuItem className="hover:bg-white/5 focus:bg-white/5 cursor-pointer">Profile</DropdownMenuItem>
          <DropdownMenuItem className="hover:bg-white/5 focus:bg-white/5 cursor-pointer">Settings</DropdownMenuItem>
          <DropdownMenuSeparator className="bg-white/10" />
          <DropdownMenuItem asChild>
            <Link href="/" className="hover:bg-white/5 focus:bg-white/5 cursor-pointer">
              Logout
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
