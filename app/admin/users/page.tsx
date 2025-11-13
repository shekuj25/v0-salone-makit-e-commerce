import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export const metadata = {
  title: "Manage Users - Admin Panel",
  description: "View and manage platform users",
}

const mockUsers = [
  {
    id: "1",
    name: "Aminata Kamara",
    email: "aminata@example.com",
    role: "buyer",
    district: "Western Area",
    status: "active",
  },
  { id: "2", name: "Ibrahim Sesay", email: "ibrahim@example.com", role: "merchant", district: "Bo", status: "active" },
  {
    id: "3",
    name: "Fatmata Koroma",
    email: "fatmata@example.com",
    role: "buyer",
    district: "Kenema",
    status: "active",
  },
  {
    id: "4",
    name: "Mohamed Bangura",
    email: "mohamed@example.com",
    role: "merchant",
    district: "Makeni",
    status: "active",
  },
]

export default function AdminUsersPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-poppins mb-2">Manage Users</h1>
        <p className="text-muted-foreground">View and manage all platform users</p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search users..." className="pl-9" />
        </div>
      </div>

      {/* Users List */}
      <Card>
        <CardHeader>
          <CardTitle>All Users ({mockUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h3 className="font-semibold">{user.name}</h3>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant={user.role === "merchant" ? "secondary" : "outline"}>{user.role}</Badge>
                    <Badge variant="outline">{user.district}</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={user.status === "active" ? "secondary" : "destructive"}>{user.status}</Badge>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
