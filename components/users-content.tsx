"use client"

import { useState } from "react"
import { RefreshCw, Search, Shield, ShieldCheck, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock user data
const users = [
  {
    id: "USR001",
    name: "Rajesh Kumar",
    email: "rajesh.kumar@email.com",
    role: "Regular Commuter",
    city: "Bengaluru",
    area: "Koramangala",
    vehicle: "Car",
    accessStatus: "Authorized",
    lastLogin: "2 hours ago",
    avatar: "/placeholder.svg?height=40&width=40&text=RK",
  },
  {
    id: "USR002",
    name: "Priya Sharma",
    email: "priya.sharma@email.com",
    role: "Professional Driver",
    city: "Mumbai",
    area: "Andheri",
    vehicle: "Taxi",
    accessStatus: "Authorized",
    lastLogin: "1 day ago",
    avatar: "/placeholder.svg?height=40&width=40&text=PS",
  },
  {
    id: "USR003",
    name: "Amit Patel",
    email: "amit.patel@email.com",
    role: "Traffic Police",
    city: "Ahmedabad",
    area: "Satellite",
    vehicle: "Motorcycle",
    accessStatus: "Authorized",
    lastLogin: "30 minutes ago",
    avatar: "/placeholder.svg?height=40&width=40&text=AP",
  },
  {
    id: "USR004",
    name: "Sneha Reddy",
    email: "sneha.reddy@email.com",
    role: "Emergency Services",
    city: "Hyderabad",
    area: "Gachibowli",
    vehicle: "Ambulance",
    accessStatus: "Denied",
    lastLogin: "3 days ago",
    avatar: "/placeholder.svg?height=40&width=40&text=SR",
  },
  {
    id: "USR005",
    name: "Vikram Singh",
    email: "vikram.singh@email.com",
    role: "Delivery Personnel",
    city: "Delhi",
    area: "Connaught Place",
    vehicle: "Motorcycle",
    accessStatus: "Authorized",
    lastLogin: "5 hours ago",
    avatar: "/placeholder.svg?height=40&width=40&text=VS",
  },
  {
    id: "USR006",
    name: "Anita Gupta",
    email: "anita.gupta@email.com",
    role: "Fleet Manager",
    city: "Pune",
    area: "Hinjewadi",
    vehicle: "Multiple",
    accessStatus: "Authorized",
    lastLogin: "1 hour ago",
    avatar: "/placeholder.svg?height=40&width=40&text=AG",
  },
  {
    id: "USR007",
    name: "Ravi Krishnan",
    email: "ravi.krishnan@email.com",
    role: "Public Transport Operator",
    city: "Chennai",
    area: "T. Nagar",
    vehicle: "Bus",
    accessStatus: "Authorized",
    lastLogin: "4 hours ago",
    avatar: "/placeholder.svg?height=40&width=40&text=RK",
  },
  {
    id: "USR008",
    name: "Meera Joshi",
    email: "meera.joshi@email.com",
    role: "City Planner",
    city: "Jaipur",
    area: "Malviya Nagar",
    vehicle: "Car",
    accessStatus: "Denied",
    lastLogin: "1 week ago",
    avatar: "/placeholder.svg?height=40&width=40&text=MJ",
  },
]

export function UsersContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isRefreshing, setIsRefreshing] = useState(false)

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.city.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsRefreshing(false)
  }

  return (
    <Card className="overflow-hidden rounded-2xl bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <CardTitle>User Management</CardTitle>
          <div className="flex flex-wrap gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 sm:w-[300px]"
              />
            </div>
            <Button
              onClick={handleRefresh}
              disabled={isRefreshing}
              variant="outline"
              className="flex items-center gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-xl border border-border/50">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Vehicle</TableHead>
                <TableHead>Access Status</TableHead>
                <TableHead>Last Login</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id} className="transition-colors hover:bg-muted/50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                        <div className="text-xs text-muted-foreground">{user.id}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{user.city}</div>
                      <div className="text-sm text-muted-foreground">{user.area}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="text-xs">
                      {user.vehicle}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {user.accessStatus === "Authorized" ? (
                        <ShieldCheck className="h-4 w-4 text-green-500" />
                      ) : (
                        <Shield className="h-4 w-4 text-red-500" />
                      )}
                      <Badge
                        variant={user.accessStatus === "Authorized" ? "default" : "destructive"}
                        className="text-xs"
                      >
                        {user.accessStatus}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{user.lastLogin}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="flex h-32 items-center justify-center text-muted-foreground">
            No users found matching your search.
          </div>
        )}
      </CardContent>
    </Card>
  )
}
