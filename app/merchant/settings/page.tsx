"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Upload, FileCheck } from "lucide-react"
import { useRouter } from "next/navigation"

export default function MerchantSettingsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [documents, setDocuments] = useState<any[]>([])
  const [formData, setFormData] = useState({
    businessName: "",
    businessDescription: "",
    businessPhone: "",
    businessEmail: "",
  })

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const supabase = createClient()
        const {
          data: { user: authUser },
        } = await supabase.auth.getUser()

        if (!authUser) {
          router.push("/login")
          return
        }

        const { data: userData } = await supabase.from("users").select("*").eq("id", authUser.id).single()

        if (userData?.role !== "merchant") {
          router.push("/")
          return
        }

        setUser(userData)
        setFormData({
          businessName: userData.full_name,
          businessDescription: userData.description || "",
          businessPhone: userData.phone || "",
          businessEmail: userData.email || "",
        })

        // Fetch merchant documents
        const { data: docs } = await supabase.from("merchant_documents").select("*").eq("merchant_id", authUser.id)

        setDocuments(docs || [])
      } catch (error) {
        console.error("[v0] Error fetching settings:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSettings()
  }, [router])

  const handleDocumentUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const supabase = createClient()
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser()

      if (!authUser) return

      // In production, upload to Supabase Storage or Vercel Blob
      toast({
        title: "Document Upload",
        description: `File '${file.name}' ready for upload. In production, this would be saved to cloud storage.`,
      })

      console.log("[v0] Document upload:", {
        filename: file.name,
        size: file.size,
        type: file.type,
        merchant_id: authUser.id,
      })
    } catch (error) {
      console.error("[v0] Upload error:", error)
      toast({
        title: "Upload Failed",
        description: "Could not upload document",
        variant: "destructive",
      })
    }
  }

  const handleSaveSettings = async () => {
    try {
      const supabase = createClient()
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser()

      if (!authUser) return

      const { error } = await supabase
        .from("users")
        .update({
          full_name: formData.businessName,
          phone: formData.businessPhone,
        })
        .eq("id", authUser.id)

      if (error) throw error

      toast({
        title: "Settings Updated",
        description: "Your merchant settings have been saved",
      })
    } catch (error: any) {
      console.error("[v0] Error saving settings:", error)
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-poppins mb-2">Merchant Settings</h1>
        <p className="text-muted-foreground">Manage your merchant profile and documents</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Business Information */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Business Information</CardTitle>
            <CardDescription>Update your merchant profile details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="businessName">Business Name</Label>
              <Input
                id="businessName"
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                placeholder="Your business name"
              />
            </div>

            <div>
              <Label htmlFor="businessEmail">Business Email</Label>
              <Input
                id="businessEmail"
                type="email"
                value={formData.businessEmail}
                disabled
                placeholder="your.business@example.com"
              />
            </div>

            <div>
              <Label htmlFor="businessPhone">Business Phone</Label>
              <Input
                id="businessPhone"
                type="tel"
                value={formData.businessPhone}
                onChange={(e) => setFormData({ ...formData, businessPhone: e.target.value })}
                placeholder="+232 XX XXX XXX"
              />
            </div>

            <div>
              <Label htmlFor="businessDescription">Business Description</Label>
              <Textarea
                id="businessDescription"
                value={formData.businessDescription}
                onChange={(e) => setFormData({ ...formData, businessDescription: e.target.value })}
                placeholder="Tell customers about your business..."
                rows={4}
              />
            </div>

            <Button onClick={handleSaveSettings} size="lg">
              Save Settings
            </Button>
          </CardContent>
        </Card>

        {/* Merchant ID */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Your Merchant ID</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded-lg border">
              <p className="text-sm text-muted-foreground mb-2">Unique Identifier</p>
              <p className="font-mono font-bold break-all text-primary">{user?.id}</p>
              <p className="text-xs text-muted-foreground mt-3">
                Use this ID for all transactions and communications with admin
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Legal Documents */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Legal Documents</CardTitle>
          <CardDescription>Upload business registration, tax ID, and other required documents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { id: "business-registration", name: "Business Registration Certificate", icon: "📋" },
                { id: "tax-id", name: "Tax ID / NIN", icon: "🆔" },
                { id: "bank-account", name: "Bank Account Details", icon: "🏦" },
                { id: "id-verification", name: "ID Verification", icon: "✓" },
              ].map((doc) => {
                const uploaded = documents.find((d) => d.document_type === doc.id)
                return (
                  <div key={doc.id} className="border rounded-lg p-4 hover:bg-muted/50 transition">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{doc.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm">{doc.name}</p>
                        {uploaded ? (
                          <div className="flex items-center gap-1 mt-2 text-green-600">
                            <FileCheck className="h-4 w-4" />
                            <span className="text-xs">Uploaded</span>
                          </div>
                        ) : (
                          <label className="cursor-pointer">
                            <input
                              type="file"
                              className="hidden"
                              onChange={handleDocumentUpload}
                              accept=".pdf,.jpg,.jpeg,.png"
                            />
                            <span className="text-xs text-primary hover:underline flex items-center gap-1 mt-2">
                              <Upload className="h-3 w-3" />
                              Upload File
                            </span>
                          </label>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> All documents must be verified by our admin team before you can sell on the
                platform. This typically takes 1-2 business days.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
