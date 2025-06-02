"use client"

import { Brain, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function RouteOptimizerContent() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="overflow-hidden rounded-2xl bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>AI/RL-Enhanced Route Selection</CardTitle>
          <CardDescription>
            Our reinforcement learning model optimizes routes beyond traditional navigation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-xl bg-muted/30 p-4 text-sm">
            <p className="mb-4">
              DriveMind uses advanced reinforcement learning algorithms to optimize routes based on:
            </p>
            <ul className="ml-5 list-disc space-y-2">
              <li>Real-time traffic conditions from camera feeds</li>
              <li>Historical traffic patterns by time and day</li>
              <li>Weather conditions and their impact on road safety</li>
              <li>Road quality and construction information</li>
              <li>Special events and their traffic implications</li>
            </ul>
            <p className="mt-4">
              The system continuously learns from feedback to improve route recommendations over time.
            </p>
          </div>

          <div className="mt-6 flex items-center justify-between rounded-xl bg-violet-500/10 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-500/20">
                <Brain className="h-5 w-5 text-violet-400" />
              </div>
              <div>
                <h4 className="font-medium">Travel Efficiency Score</h4>
                <p className="text-sm text-muted-foreground">Based on current model performance</p>
              </div>
            </div>
            <div className="text-2xl font-bold text-violet-400">0.85</div>
          </div>

          <Button disabled className="mt-6 w-full bg-cyan-500 hover:bg-cyan-400">
            <RefreshCw className="mr-2 h-4 w-4" />
            Re-optimize Routes
          </Button>
        </CardContent>
      </Card>

      <Card className="overflow-hidden rounded-2xl bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Route Comparison</CardTitle>
          <CardDescription>DriveMind vs. Traditional Navigation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="aspect-video rounded-xl bg-muted/30 p-2">
            <div className="relative flex h-full items-center justify-center rounded bg-muted/50">
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-center text-muted-foreground">
                  Route comparison visualization
                  <br />
                  <span className="text-sm">(Map with overlaid routes)</span>
                </p>
              </div>
              <div className="absolute bottom-4 right-4 flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-cyan-500" />
                  <span className="text-xs">DriveMind Route</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-gray-400" />
                  <span className="text-xs">Standard Route</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-muted/30 p-4">
              <h4 className="font-medium text-cyan-400">DriveMind Route</h4>
              <div className="mt-2 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Distance</span>
                  <span>19.2 km</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Estimated Time</span>
                  <span>32 min</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Traffic Lights</span>
                  <span>8</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Congestion Level</span>
                  <span>Low</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-muted/30 p-4">
              <h4 className="font-medium text-gray-400">Standard Route</h4>
              <div className="mt-2 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Distance</span>
                  <span>17.5 km</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Estimated Time</span>
                  <span>45 min</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Traffic Lights</span>
                  <span>14</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Congestion Level</span>
                  <span>High</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-xl bg-green-500/10 p-4 text-center">
            <p className="text-sm">
              <span className="font-medium text-green-400">13 minutes saved</span> with DriveMind's AI-optimized route
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
