import { AppLayout } from "@/components/app-layout"
import { UsersContent } from "@/components/users-content"

export default function UsersPage() {
  return (
    <AppLayout title="User Profiles">
      <UsersContent />
    </AppLayout>
  )
}
