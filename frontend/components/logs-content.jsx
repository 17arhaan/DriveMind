"use client"

import { useState } from "react"
import { Calendar, ChevronDown, FileAudio, FileVideo, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock log data
const logs = [
  {
    id: "LOG001",
    timestamp: "2023-06-01 08:45:23",
    location: "MG Road & Brigade Road Junction",
    audioEvent: "Siren Detected",
    hasVideo: true,
    eventType: "emergency",
  },
  {
    id: "LOG002",
    timestamp: "2023-06-01 09:12:05",
    location: "Silk Board Junction",
    audioEvent: "Horn Cluster",
    hasVideo: true,
    eventType: "congestion",
  },
  {
    id: "LOG003",
    timestamp: "2023-06-01 10:30:17",
    location: "Whitefield Main Road",
    audioEvent: "Vehicle Collision",
    hasVideo: true,
    eventType: "accident",
  },
  {
    id: "LOG004",
    timestamp: "2023-06-01 11:45:32",
    location: "Electronic City Flyover",
    audioEvent: "Normal Traffic",
    hasVideo: false,
    eventType: "normal",
  },
  {
    id: "LOG005",
    timestamp: "2023-06-01 13:20:45",
    location: "Hebbal Flyover",
    audioEvent: "Heavy Rain",
    hasVideo: true,
    eventType: "weather",
  },
  {
    id: "LOG006",
    timestamp: "2023-06-01 14:15:10",
    location: "Marathahalli Bridge",
    audioEvent: "Traffic Jam",
    hasVideo: true,
    eventType: "congestion",
  },
  {
    id: "LOG007",
    timestamp: "2023-06-01 15:40:22",
    location: "Koramangala Inner Ring Road",
    audioEvent: "Ambulance Siren",
    hasVideo: true,
    eventType: "emergency",
  },
  {
    id: "LOG008",
    timestamp: "2023-06-01 16:55:38",
    location: "Indiranagar 100ft Road",
    audioEvent: "Normal Traffic",
    hasVideo: false,
    eventType: "normal",
  },
]

export function LogsContent() {
  const [filter, setFilter] = useState("all")
  const [expandedLog, setExpandedLog] = useState(null)

  const filteredLogs = logs.filter((log) => {
    if (filter === "all") return true
    return log.eventType === filter
  })

  const toggleExpand = (id) => {
    setExpandedLog(expandedLog === id ? null : id)
  }

  return (
    <Card className="overflow-hidden rounded-2xl bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <CardTitle>Audio & Video Event Logs</CardTitle>
          <div className="flex flex-wrap gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Date Range
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80" align="end">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Select date range</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="grid gap-1">
                        <Label htmlFor="from">From</Label>
                        <Input id="from" type="date" />
                      </div>
                      <div className="grid gap-1">
                        <Label htmlFor="to">To</Label>
                        <Input id="to" type="date" />
                      </div>
                    </div>
                  </div>
                  <Button>Apply</Button>
                </div>
              </PopoverContent>
            </Popover>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by event</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={filter} onValueChange={setFilter}>
                  <DropdownMenuRadioItem value="all">All Events</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="emergency">Emergency</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="accident">Accident</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="congestion">Congestion</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="weather">Weather</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="normal">Normal</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-xl border border-border/50">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead className="w-[180px]">Timestamp</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Audio Event</TableHead>
                <TableHead className="w-[100px]">Media</TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <>
                  <TableRow
                    key={log.id}
                    className="cursor-pointer transition-colors hover:bg-muted/50"
                    onClick={() => toggleExpand(log.id)}
                  >
                    <TableCell className="font-medium">{log.id}</TableCell>
                    <TableCell>{log.timestamp}</TableCell>
                    <TableCell>{log.location}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span
                          className={`h-2 w-2 rounded-full ${
                            log.eventType === "emergency"
                              ? "bg-red-500"
                              : log.eventType === "accident"
                                ? "bg-orange-500"
                                : log.eventType === "congestion"
                                  ? "bg-yellow-500"
                                  : log.eventType === "weather"
                                    ? "bg-blue-500"
                                    : "bg-green-500"
                          }`}
                        />
                        {log.audioEvent}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <FileAudio className="h-4 w-4 text-cyan-400" />
                        {log.hasVideo && <FileVideo className="h-4 w-4 text-violet-400" />}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleExpand(log.id)
                        }}
                      >
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${expandedLog === log.id ? "rotate-180" : ""}`}
                        />
                        <span className="sr-only">Toggle</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                  {expandedLog === log.id && (
                    <TableRow>
                      <TableCell colSpan={6} className="p-0">
                        <div className="grid gap-4 bg-muted/30 p-4 sm:grid-cols-2">
                          <div className="space-y-4">
                            <div>
                              <h4 className="mb-2 font-medium">Audio Playback</h4>
                              <div className="flex items-center gap-2 rounded-lg bg-muted/50 p-3">
                                <FileAudio className="h-5 w-5 text-cyan-400" />
                                <div className="h-1 flex-1 rounded-full bg-muted">
                                  <div className="h-1 w-1/3 rounded-full bg-cyan-500" />
                                </div>
                                <span className="text-xs text-muted-foreground">0:12 / 0:35</span>
                              </div>
                            </div>
                            <div>
                              <h4 className="mb-2 font-medium">Event Details</h4>
                              <div className="rounded-lg bg-muted/50 p-3 text-sm">
                                <div className="grid grid-cols-2 gap-2">
                                  <div>
                                    <p className="text-muted-foreground">Event Type</p>
                                    <p className="capitalize">{log.eventType}</p>
                                  </div>
                                  <div>
                                    <p className="text-muted-foreground">Confidence</p>
                                    <p>92%</p>
                                  </div>
                                  <div>
                                    <p className="text-muted-foreground">Duration</p>
                                    <p>35 seconds</p>
                                  </div>
                                  <div>
                                    <p className="text-muted-foreground">Camera ID</p>
                                    <p>CAM{log.id.slice(-3)}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {log.hasVideo && (
                            <div>
                              <h4 className="mb-2 font-medium">Video Snapshot</h4>
                              <div className="aspect-video rounded-lg bg-muted/50 p-2">
                                <div className="flex h-full items-center justify-center rounded bg-muted/70">
                                  <FileVideo className="h-8 w-8 text-muted-foreground" />
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
