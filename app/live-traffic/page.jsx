import { AppLayout } from "@/components/app-layout"
import { LiveTrafficContent } from "@/components/live-traffic-content"

export default function LiveTrafficPage() {
  return (
    <AppLayout title="Live Traffic">
      <LiveTrafficContent />
    </AppLayout>
  )
}
