"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { createClient } from "@/lib/supabase/client"
import { Loader2 } from "lucide-react"

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

export function SignupForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    district: "",
    role: "buyer",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.fullName || !formData.email || !formData.password || !formData.district) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    const supabase = createClient()

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || window.location.origin,
          data: {
            full_name: formData.fullName,
            phone: formData.phone,
            district: formData.district,
            role: formData.role,
          },
        },
      })

      if (authError) throw authError

      // Note: We only do this if email confirmation is disabled
      // Otherwise, wait for email confirmation before creating profile
      if (authData.user && authData.session) {
        const { error: profileError } = await supabase.from("users").insert({
          id: authData.user.id,
          email: formData.email,
          full_name: formData.fullName,
          phone: formData.phone || null,
          district: formData.district,
          role: formData.role,
        })

        if (profileError) {
          console.error("[v0] Profile creation error:", profileError)
          // Don't throw - profile might already exist from trigger
        }
      }

      toast({
        title: "Account Created!",
        description: authData.session ? "Welcome to Salone Makit" : "Please check your email to confirm your account",
      })

      if (authData.session) {
        router.push("/")
        router.refresh()
      } else {
        router.push("/signup-success")
      }
    } catch (error: any) {
      toast({
        title: "Signup Failed",
        description: error.message || "Could not create account",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              id="fullName"
              value={formData.fullName}
              onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
              placeholder="Enter your full name"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
              placeholder="your.email@example.com"
              required
              disabled={isLoading}
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
              disabled={isLoading}
            />
          </div>

          <div>
            <Label htmlFor="district">District *</Label>
            <Select
              value={formData.district}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, district: value }))}
              required
              disabled={isLoading}
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
            <Label htmlFor="role">Account Type *</Label>
            <Select
              value={formData.role}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, role: value }))}
              required
              disabled={isLoading}
            >
              <SelectTrigger id="role">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="buyer">Buyer</SelectItem>
                <SelectItem value="merchant">Merchant</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="password">Password *</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
              placeholder="Create a strong password"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <Label htmlFor="confirmPassword">Confirm Password *</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
              placeholder="Re-enter your password"
              required
              disabled={isLoading}
            />
          </div>

          <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
