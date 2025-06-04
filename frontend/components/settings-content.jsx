"use client"

import { useState } from "react"
import { Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

export function SettingsContent() {
  const [settings, setSettings] = useState({
    rlModelEnabled: true,
    darkMode: true,
    audioDetection: true,
    mapView: "satellite",
    refreshInterval: "15s",
    notifications: true,
    locationSharing: true,
    dataCollection: true,
  })

  const [isSaving, setIsSaving] = useState(false)

  const handleSwitchChange = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleSelectChange = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="overflow-hidden rounded-2xl bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>AI & Route Optimization</CardTitle>
          <CardDescription>Configure AI model and route optimization settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="rl-model">RL Model Enabled</Label>
              <p className="text-sm text-muted-foreground">Enable reinforcement learning for route optimization</p>
            </div>
            <Switch
              id="rl-model"
              checked={settings.rlModelEnabled}
              onCheckedChange={(checked) => handleSwitchChange("rlModelEnabled", checked)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="audio-detection">Audio Detection</Label>
              <p className="text-sm text-muted-foreground">Detect sirens, horns, and traffic sounds</p>
            </div>
            <Switch
              id="audio-detection"
              checked={settings.audioDetection}
              onCheckedChange={(checked) => handleSwitchChange("audioDetection", checked)}
            />
          </div>

          <Separator />

          <div className="space-y-2">
            <Label htmlFor="map-view">Map View</Label>
            <Select value={settings.mapView} onValueChange={(value) => handleSelectChange("mapView", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="satellite">Satellite</SelectItem>
                <SelectItem value="road">Road</SelectItem>
                <SelectItem value="hybrid">Hybrid</SelectItem>
                <SelectItem value="terrain">Terrain</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="refresh-interval">Data Refresh Interval</Label>
            <Select
              value={settings.refreshInterval}
              onValueChange={(value) => handleSelectChange("refreshInterval", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5s">5 seconds</SelectItem>
                <SelectItem value="15s">15 seconds</SelectItem>
                <SelectItem value="30s">30 seconds</SelectItem>
                <SelectItem value="1m">1 minute</SelectItem>
                <SelectItem value="5m">5 minutes</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden rounded-2xl bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Privacy & Notifications</CardTitle>
          <CardDescription>Manage your privacy settings and notification preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="dark-mode">Dark Mode</Label>
              <p className="text-sm text-muted-foreground">Use dark theme for better visibility</p>
            </div>
            <Switch
              id="dark-mode"
              checked={settings.darkMode}
              onCheckedChange={(checked) => handleSwitchChange("darkMode", checked)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="notifications">Push Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive traffic alerts and route updates</p>
            </div>
            <Switch
              id="notifications"
              checked={settings.notifications}
              onCheckedChange={(checked) => handleSwitchChange("notifications", checked)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="location-sharing">Location Sharing</Label>
              <p className="text-sm text-muted-foreground">Share location data for traffic optimization</p>
            </div>
            <Switch
              id="location-sharing"
              checked={settings.locationSharing}
              onCheckedChange={(checked) => handleSwitchChange("locationSharing", checked)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="data-collection">Anonymous Data Collection</Label>
              <p className="text-sm text-muted-foreground">Help improve AI models with anonymous usage data</p>
            </div>
            <Switch
              id="data-collection"
              checked={settings.dataCollection}
              onCheckedChange={(checked) => handleSwitchChange("dataCollection", checked)}
            />
          </div>
        </CardContent>
      </Card>

      <div className="lg:col-span-2">
        <Card className="overflow-hidden rounded-2xl bg-card/80 backdrop-blur-sm">
          <CardContent className="pt-6">
            <Button onClick={handleSave} disabled={isSaving} className="w-full bg-cyan-500 hover:bg-cyan-400">
              <Save className="mr-2 h-4 w-4" />
              {isSaving ? "Saving..." : "Save Settings"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
