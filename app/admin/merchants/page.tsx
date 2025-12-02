import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default async function AdminMerchantsPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    redirect("/login")
  }

  const { data: userData } = await supabase.from("users").select("role").eq("id", user.id).single()

  if (userData?.role !== "admin") {
    redirect("/")
  }

  const { data: merchants } = await supabase
    .from("users")
    .select(
      `
      id,
      full_name,
      email,
      phone,
      district,
      created_at,
      products (
        count
      )
    `,
    )
    .eq("role", "merchant")
    .order("created_at", { ascending: false })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Link href="/admin/dashboard">
              <Button variant="ghost" className="mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-blue-900">Merchant Management</h1>
            <p className="text-gray-600">Manage all merchants on the platform</p>
          </div>
        </div>

        {/* Merchants Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Merchants</CardTitle>
            <CardDescription>Total: {merchants?.length || 0} merchants</CardDescription>
          </CardHeader>
          <CardContent>
            {merchants && merchants.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Business Name</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Phone</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">District</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Products</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Joined</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {merchants.map((merchant: any) => (
                      <tr key={merchant.id} className="border-b hover:bg-blue-50 transition">
                        <td className="py-3 px-4 text-gray-900">{merchant.full_name}</td>
                        <td className="py-3 px-4 text-gray-600">{merchant.email}</td>
                        <td className="py-3 px-4 text-gray-600">{merchant.phone || "N/A"}</td>
                        <td className="py-3 px-4 text-gray-600">{merchant.district || "N/A"}</td>
                        <td className="py-3 px-4 text-gray-600">{merchant.products?.[0]?.count || 0}</td>
                        <td className="py-3 px-4 text-gray-600">
                          {new Date(merchant.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          <Button size="sm" variant="outline" className="text-blue-600 bg-transparent">
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600">No merchants found</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
