"use client"

import { useState } from "react"
import { Camera, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock camera data
const cameras = [
  {
    id: "CAM001",
    location: "MG Road Junction",
    status: "active",
    congestion: "high",
    lastUpdated: "2 mins ago",
  },
  {
    id: "CAM002",
    location: "Silk Board Junction",
    status: "active",
    congestion: "high",
    lastUpdated: "1 min ago",
  },
  {
    id: "CAM003",
    location: "Whitefield Main Road",
    status: "active",
    congestion: "medium",
    lastUpdated: "Just now",
  },
  {
    id: "CAM004",
    location: "Electronic City Flyover",
    status: "active",
    congestion: "low",
    lastUpdated: "5 mins ago",
  },
  {
    id: "CAM005",
    location: "Hebbal Flyover",
    status: "inactive",
    congestion: "unknown",
    lastUpdated: "1 hour ago",
  },
  {
    id: "CAM006",
    location: "Marathahalli Bridge",
    status: "active",
    congestion: "medium",
    lastUpdated: "3 mins ago",
  },
  {
    id: "CAM007",
    location: "Koramangala Inner Ring Road",
    status: "active",
    congestion: "high",
    lastUpdated: "Just now",
  },
  {
    id: "CAM008",
    location: "Indiranagar 100ft Road",
    status: "active",
    congestion: "low",
    lastUpdated: "7 mins ago",
  },
  {
    id: "CAM009",
    location: "Jayanagar 4th Block",
    status: "active",
    congestion: "medium",
    lastUpdated: "4 mins ago",
  },
  {
    id: "CAM010",
    location: "Bannerghatta Road",
    status: "active",
    congestion: "high",
    lastUpdated: "2 mins ago",
  },
  {
    id: "CAM011",
    location: "Mysore Road",
    status: "inactive",
    congestion: "unknown",
    lastUpdated: "30 mins ago",
  },
  {
    id: "CAM012",
    location: "Tumkur Road",
    status: "active",
    congestion: "medium",
    lastUpdated: "8 mins ago",
  },
]

export function LiveTrafficContent() {
  const [filter, setFilter] = useState("all")
  const [visibleCameras, setVisibleCameras] = useState(8)

  const filteredCameras = cameras.filter((camera) => {
    if (filter === "all") return true
    if (filter === "active") return camera.status === "active"
    if (filter === "inactive") return camera.status === "inactive"
    return camera.congestion === filter
  })

  const loadMore = () => {
    setVisibleCameras((prev) => Math.min(prev + 4, filteredCameras.length))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h2 className="text-2xl font-bold">Traffic Camera Feed</h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Filter by</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={filter} onValueChange={setFilter}>
              <DropdownMenuRadioItem value="all">All Cameras</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="active">Active Only</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="inactive">Inactive Only</DropdownMenuRadioItem>
              <DropdownMenuSeparator />
              <DropdownMenuRadioItem value="high">High Congestion</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="medium">Medium Congestion</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="low">Low Congestion</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredCameras.slice(0, visibleCameras).map((camera) => (
          <Card
            key={camera.id}
            className="overflow-hidden rounded-2xl bg-card/80 backdrop-blur-sm transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]"
          >
            <div className="aspect-video bg-muted/30 p-2">
              <div className="flex h-full items-center justify-center rounded bg-muted/50">
                <Camera className="h-12 w-12 text-muted-foreground" />
              </div>
            </div>
            <CardContent className="p-4">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="font-semibold">{camera.id}</h3>
                <div
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    camera.congestion === "high"
                      ? "bg-red-500/20 text-red-500"
                      : camera.congestion === "medium"
                        ? "bg-yellow-500/20 text-yellow-500"
                        : camera.congestion === "low"
                          ? "bg-green-500/20 text-green-500"
                          : "bg-gray-500/20 text-gray-500"
                  }`}
                >
                  {camera.congestion === "unknown" ? "Unknown" : `${camera.congestion} congestion`}
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{camera.location}</p>
              <div className="mt-2 flex items-center justify-between text-xs">
                <span
                  className={`flex items-center gap-1 ${
                    camera.status === "active" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${camera.status === "active" ? "bg-green-500" : "bg-red-500"}`}
                  />
                  {camera.status === "active" ? "Live" : "Offline"}
                </span>
                <span className="text-muted-foreground">Updated {camera.lastUpdated}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {visibleCameras < filteredCameras.length && (
        <div className="flex justify-center">
          <Button onClick={loadMore} variant="outline" className="w-full max-w-xs">
            Load More
          </Button>
        </div>
      )}
    </div>
  )
}
