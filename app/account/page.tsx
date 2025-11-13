import { UserProfile } from "@/components/user-profile"

export const metadata = {
  title: "My Account - Salone Makit",
  description: "Manage your account settings and preferences",
}

export default function AccountPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold font-poppins mb-8 text-balance">My Account</h1>
      <UserProfile />
    </div>
  )
}
