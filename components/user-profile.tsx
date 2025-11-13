"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { User, MapPin, Phone, Mail, Globe } from "lucide-react"
import Link from "next/link"

const districts = [
  "Western Area",
  "Bo",
  "Kenema",
  "Makeni",
  "Freetown",
  "Kailahun",
  "Moyamba",
  "Bonthe",
  "Port Loko",
  "Kono",
]

export function UserProfile() {
  const { toast } = useToast()
  const [user, setUser] = useState<any>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    district: "",
    language: "en",
  })

  useEffect(() => {
    // Load user from localStorage
    const savedUser = localStorage.getItem("salone-makit-user")
    if (savedUser) {
      const userData = JSON.parse(savedUser)
      setUser(userData)
      setFormData({
        name: userData.name || "",
        email: userData.email || "",
        phone: userData.phone || "",
        district: userData.district || "",
        language: userData.language || "en",
      })
    }
  }, [])

  const handleSave = () => {
    const updatedUser = {
      ...user,
      ...formData,
    }
    localStorage.setItem("salone-makit-user", JSON.stringify(updatedUser))
    setUser(updatedUser)
    setIsEditing(false)
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully",
    })
  }

  if (!user) {
    return (
      <Card>
        <CardContent className="pt-6 text-center">
          <p className="text-muted-foreground mb-4">Please login to view your profile</p>
          <Button asChild>
            <Link href="/login">Login</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Profile Overview */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Profile Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-12 w-12 text-primary" />
            </div>
          </div>
          <div className="text-center">
            <h3 className="font-bold text-lg">{user.name}</h3>
            <p className="text-sm text-muted-foreground">{user.email}</p>
            <Badge className="mt-2" variant={user.role === "merchant" ? "secondary" : "outline"}>
              {user.role}
            </Badge>
          </div>

          {user.role === "merchant" && (
            <Button asChild variant="outline" className="w-full bg-transparent">
              <Link href="/merchant">Go to Merchant Dashboard</Link>
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Profile Details */}
      <Card className="lg:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Account Details</CardTitle>
          <Button variant="outline" onClick={() => (isEditing ? handleSave() : setIsEditing(true))}>
            {isEditing ? "Save Changes" : "Edit Profile"}
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {isEditing ? (
            <>
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                  placeholder="+232 XX XXX XXX"
                />
              </div>

              <div>
                <Label htmlFor="district">District</Label>
                <Select
                  value={formData.district}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, district: value }))}
                >
                  <SelectTrigger id="district">
                    <SelectValue placeholder="Select your district" />
                  </SelectTrigger>
                  <SelectContent>
                    {districts.map((district) => (
                      <SelectItem key={district} value={district}>
                        {district}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="language">Language Preference</Label>
                <Select
                  value={formData.language}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, language: value }))}
                >
                  <SelectTrigger id="language">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="krio">Krio</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <User className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Full Name</p>
                  <p className="font-medium">{user.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Email Address</p>
                  <p className="font-medium">{user.email}</p>
                </div>
              </div>

              {user.phone && (
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Phone Number</p>
                    <p className="font-medium">{user.phone}</p>
                  </div>
                </div>
              )}

              {user.district && (
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">District</p>
                    <p className="font-medium">{user.district}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <Globe className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Language</p>
                  <p className="font-medium">{user.language === "en" ? "English" : "Krio"}</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
