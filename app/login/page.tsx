import { LoginForm } from "@/components/login-form"
import Link from "next/link"

export const metadata = {
  title: "Login - Salone Makit",
  description: "Login to your Salone Makit account",
}

export default function LoginPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-poppins mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Login to your Salone Makit account</p>
        </div>

        <LoginForm />

        <p className="text-center mt-6 text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link href="/signup" className="text-primary hover:underline font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
