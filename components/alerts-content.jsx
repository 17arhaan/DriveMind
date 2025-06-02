"use client"

import { useState } from "react"
import { AlertTriangle, Bell, Clock, MapPin, MoreVertical, Settings, Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

// Mock alerts data
const allAlerts = [
  {
    id: "ALT001",
    type: "Accident",
    location: "MG Road & Brigade Road Junction",
    timestamp: "10 minutes ago",
    description: "Multi-vehicle collision detected. Emergency services dispatched.",
    priority: "high",
    icon: AlertTriangle,
  },
  {
    id: "ALT002",
    type: "Congestion",
    location: "Silk Board Junction",
    timestamp: "25 minutes ago",
    description: "Heavy traffic congestion detected. Estimated delay: 35 minutes.",
    priority: "medium",
    icon: Clock,
  },
  {
    id: "ALT003",
    type: "Weather",
    location: "Outer Ring Road",
    timestamp: "1 hour ago",
    description: "Heavy rainfall affecting visibility. Drive with caution.",
    priority: "low",
    icon: Volume2,
  },
  {
    id: "ALT004",
    type: "Road Closure",
    location: "Indiranagar 100ft Road",
    timestamp: "2 hours ago",
    description: "Road closed for maintenance. Expected to reopen at 6:00 PM.",
    priority: "medium",
    icon: MapPin,
  },
  {
    id: "ALT005",
    type: "Accident",
    location: "Electronic City Flyover",
    timestamp: "30 minutes ago",
    description: "Minor collision reported. Traffic moving slowly.",
    priority: "medium",
    icon: AlertTriangle,
  },
]

// Mock notification settings
const notificationSettings = [
  { id: "accidents", label: "Accidents & Emergencies", enabled: true },
  { id: "congestion", label: "Traffic Congestion", enabled: true },
  { id: "weather", label: "Weather Alerts", enabled: true },
  { id: "roadwork", label: "Road Work & Closures", enabled: false },
  { id: "events", label: "Special Events", enabled: true },
  { id: "public", label: "Public Transport Disruptions", enabled: false },
]

export function AlertsContent() {
  const [activeTab, setActiveTab] = useState("all")
  const [settings, setSettings] = useState(notificationSettings)

  const toggleSetting = (id) => {
    setSettings(settings.map((setting) => (setting.id === id ? { ...setting, enabled: !setting.enabled } : setting)))
  }

  const filteredAlerts = allAlerts.filter((alert) => {
    if (activeTab === "all") return true
    if (activeTab === "high") return alert.priority === "high"
    if (activeTab === "medium") return alert.priority === "medium"
    if (activeTab === "low") return alert.priority === "low"
    return true
  })

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-500/20 text-red-500 border-red-500/30"
      case "medium":
        return "bg-yellow-500/20 text-yellow-500 border-yellow-500/30"
      case "low":
        return "bg-green-500/20 text-green-500 border-green-500/30"
      default:
        return "bg-blue-500/20 text-blue-500 border-blue-500/30"
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <Card className="overflow-hidden rounded-2xl bg-card/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Traffic Alerts</CardTitle>
              <CardDescription>Real-time traffic alerts and notifications</CardDescription>
            </div>
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="high">High</TabsTrigger>
                <TabsTrigger value="medium">Medium</TabsTrigger>
                <TabsTrigger value="low">Low</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredAlerts.length > 0 ? (
                filteredAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="flex flex-col gap-3 rounded-xl border border-border/50 bg-card/50 p-4 transition-all duration-200 hover:border-cyan-500/30"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-full ${getPriorityColor(
                            alert.priority,
                          )}`}
                        >
                          <alert.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">{alert.type}</h4>
                          <p className="text-sm text-muted-foreground">{alert.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={`${getPriorityColor(alert.priority)} border capitalize`}>
                          {alert.priority}
                        </Badge>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                              <span className="sr-only">More</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>View on map</DropdownMenuItem>
                            <DropdownMenuItem>Mark as read</DropdownMenuItem>
                            <DropdownMenuItem>Share alert</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-500">Dismiss</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <p className="text-sm">{alert.description}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{alert.timestamp}</span>
                      <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                        View details
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex h-32 items-center justify-center text-center text-muted-foreground">
                  <p>No alerts matching the selected filter.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card className="overflow-hidden rounded-2xl bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Notification Settings</CardTitle>
              <Button variant="outline" size="icon">
                <Settings className="h-4 w-4" />
                <span className="sr-only">Settings</span>
              </Button>
            </div>
            <CardDescription>Configure your alert preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-amber-400" />
                  <h3 className="font-medium">Push Notifications</h3>
                </div>
                <Switch checked={true} />
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-medium text-muted-foreground">Alert Types</h4>
                {settings.map((setting) => (
                  <div key={setting.id} className="flex items-center justify-between">
                    <Label htmlFor={setting.id} className="flex-1 cursor-pointer">
                      {setting.label}
                    </Label>
                    <Switch
                      id={setting.id}
                      checked={setting.enabled}
                      onCheckedChange={() => toggleSetting(setting.id)}
                    />
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-medium text-muted-foreground">Alert Radius</h4>
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline" size="sm" className="bg-muted/50">
                    1 km
                  </Button>
                  <Button variant="outline" size="sm" className="bg-cyan-500/20 border-cyan-500/30 text-cyan-400">
                    5 km
                  </Button>
                  <Button variant="outline" size="sm" className="bg-muted/50">
                    10 km
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-medium text-muted-foreground">Notification Sound</h4>
                <div className="flex items-center justify-between">
                  <Label htmlFor="sound" className="flex-1 cursor-pointer">
                    Alert Sound
                  </Label>
                  <Switch id="sound" checked={true} />
                </div>
              </div>

              <Button className="w-full bg-cyan-500 hover:bg-cyan-400">Save Preferences</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
