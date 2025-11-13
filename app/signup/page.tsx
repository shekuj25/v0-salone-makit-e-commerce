import { SignupForm } from "@/components/signup-form"
import Link from "next/link"

export const metadata = {
  title: "Sign Up - Salone Makit",
  description: "Create your Salone Makit account",
}

export default function SignupPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-poppins mb-2">Create Account</h1>
          <p className="text-muted-foreground">Join Salone Makit today</p>
        </div>

        <SignupForm />

        <p className="text-center mt-6 text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}
