"use client"

import { useState } from "react"
import { Clock, MapPin, Navigation } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"

export function RoutePlannerContent() {
  const [routeDetails, setRouteDetails] = useState(null)

  const handleGetRoute = () => {
    // Simulate API call with mock data
    setRouteDetails({
      distance: "18.5 km",
      duration: "42 min",
      routes: [
        {
          id: 1,
          name: "Via MG Road",
          duration: "42 min",
          distance: "18.5 km",
          traffic: "Heavy",
        },
        {
          id: 2,
          name: "Via Outer Ring Road",
          duration: "48 min",
          distance: "22.3 km",
          traffic: "Moderate",
        },
        {
          id: 3,
          name: "Via Airport Road",
          duration: "55 min",
          distance: "24.1 km",
          traffic: "Light",
        },
      ],
    })
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <Card className="overflow-hidden rounded-2xl bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Route Map</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="flex-1 space-y-2">
                  <Label htmlFor="source">Source</Label>
                  <div className="relative">
                    <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input id="source" placeholder="Koramangala, Bengaluru" className="pl-8" />
                  </div>
                </div>
                <div className="flex-1 space-y-2">
                  <Label htmlFor="destination">Destination</Label>
                  <div className="relative">
                    <Navigation className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input id="destination" placeholder="Whitefield, Bengaluru" className="pl-8" />
                  </div>
                </div>
              </div>
              <Button onClick={handleGetRoute} className="bg-cyan-500 hover:bg-cyan-400">
                Get Route
              </Button>
            </div>

            <div className="mt-6 aspect-[16/9] rounded-xl bg-muted/30 p-2">
              <div className="flex h-full items-center justify-center rounded bg-muted/50">
                <p className="text-center text-muted-foreground">
                  Map will be displayed here
                  <br />
                  <span className="text-sm">(Google Maps or Mapbox integration)</span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card className="overflow-hidden rounded-2xl bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Route Details</CardTitle>
          </CardHeader>
          <CardContent>
            {routeDetails ? (
              <div className="space-y-6">
                <div className="rounded-lg bg-muted/30 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Best Route</p>
                      <h3 className="text-xl font-semibold">Via MG Road</h3>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-500">
                      <Navigation className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Distance</p>
                      <p className="font-medium">{routeDetails.distance}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">ETA</p>
                      <p className="font-medium">{routeDetails.duration}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="mb-3 font-medium">Alternative Routes</h4>
                  <RadioGroup defaultValue="1">
                    {routeDetails.routes.map((route) => (
                      <div
                        key={route.id}
                        className="rounded-lg border border-border/50 p-3 transition-all duration-200 hover:border-cyan-500/30"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value={route.id.toString()} id={`route-${route.id}`} />
                          <Label
                            htmlFor={`route-${route.id}`}
                            className="flex flex-1 cursor-pointer items-center justify-between"
                          >
                            <span>{route.name}</span>
                            <span className="text-sm text-muted-foreground">{route.duration}</span>
                          </Label>
                        </div>
                        <div className="mt-2 pl-6 text-sm text-muted-foreground">
                          {route.distance} • {route.traffic} traffic
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <Separator />

                <div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <h4 className="font-medium">Best Time to Leave</h4>
                  </div>
                  <div className="mt-2 rounded-lg bg-muted/30 p-3">
                    <p className="text-sm">
                      Leave <span className="font-medium text-cyan-400">now</span> or at{" "}
                      <span className="font-medium text-cyan-400">7:30 PM</span> to avoid peak traffic
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-[400px] items-center justify-center text-center text-muted-foreground">
                <p>
                  Enter source and destination
                  <br />
                  to view route details
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
