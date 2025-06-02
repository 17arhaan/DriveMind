"use client"

import { AlertCircle, ArrowDown, ArrowUp, Camera, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const trafficData = [
  { time: "00:00", congestion: 20, vehicles: 150 },
  { time: "03:00", congestion: 15, vehicles: 100 },
  { time: "06:00", congestion: 40, vehicles: 300 },
  { time: "09:00", congestion: 80, vehicles: 600 },
  { time: "12:00", congestion: 65, vehicles: 500 },
  { time: "15:00", congestion: 70, vehicles: 550 },
  { time: "18:00", congestion: 85, vehicles: 700 },
  { time: "21:00", congestion: 45, vehicles: 350 },
]

const alerts = [
  {
    id: 1,
    type: "Accident",
    location: "MG Road & Brigade Road Junction",
    time: "10 minutes ago",
    severity: "high",
  },
  {
    id: 2,
    type: "Congestion",
    location: "Silk Board Junction",
    time: "25 minutes ago",
    severity: "medium",
  },
  {
    id: 3,
    type: "Weather",
    location: "Outer Ring Road",
    time: "1 hour ago",
    severity: "low",
  },
]

export function DashboardContent() {
  return (
    <div className="grid gap-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="overflow-hidden rounded-2xl bg-card/80 backdrop-blur-sm transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Travel Time Reduction</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="text-2xl font-bold">18%</div>
              <div className="ml-2 flex items-center text-sm text-green-500">
                <ArrowUp className="mr-1 h-4 w-4" />
                2.1%
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Compared to last week</p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden rounded-2xl bg-card/80 backdrop-blur-sm transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Cameras</CardTitle>
            <Camera className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="text-2xl font-bold">24</div>
              <div className="ml-2 flex items-center text-sm text-red-500">
                <ArrowDown className="mr-1 h-4 w-4" />3
              </div>
            </div>
            <p className="text-xs text-muted-foreground">3 cameras offline</p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden rounded-2xl bg-card/80 backdrop-blur-sm transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Congestion Score</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="text-2xl font-bold">72%</div>
              <div className="ml-2 flex items-center text-sm text-red-500">
                <ArrowUp className="mr-1 h-4 w-4" />
                5%
              </div>
            </div>
            <p className="text-xs text-muted-foreground">High traffic in central areas</p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden rounded-2xl bg-card/80 backdrop-blur-sm transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Route Efficiency</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="text-2xl font-bold">85%</div>
              <div className="ml-2 flex items-center text-sm text-green-500">
                <ArrowUp className="mr-1 h-4 w-4" />
                3.2%
              </div>
            </div>
            <p className="text-xs text-muted-foreground">AI optimization active</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="overflow-hidden rounded-2xl bg-card/80 backdrop-blur-sm transition-all duration-200 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]">
          <CardHeader>
            <CardTitle>Traffic Congestion (24h)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trafficData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="time" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1F1B24",
                      borderColor: "#333",
                      borderRadius: "0.5rem",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="congestion"
                    name="Congestion %"
                    stroke="#06B6D4"
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden rounded-2xl bg-card/80 backdrop-blur-sm transition-all duration-200 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]">
          <CardHeader>
            <CardTitle>Vehicle Count (24h)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trafficData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="time" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1F1B24",
                      borderColor: "#333",
                      borderRadius: "0.5rem",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="vehicles" name="Vehicle Count" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="overflow-hidden rounded-2xl bg-card/80 backdrop-blur-sm transition-all duration-200 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]">
        <CardHeader>
          <CardTitle>Latest Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className="flex items-center rounded-xl border border-border/50 bg-card/50 p-4 transition-all duration-200 hover:border-cyan-500/30"
              >
                <div
                  className={`mr-4 h-3 w-3 rounded-full ${
                    alert.severity === "high"
                      ? "bg-red-500"
                      : alert.severity === "medium"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                  }`}
                />
                <div className="flex-1">
                  <h4 className="font-medium">{alert.type}</h4>
                  <p className="text-sm text-muted-foreground">{alert.location}</p>
                </div>
                <div className="text-sm text-muted-foreground">{alert.time}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
