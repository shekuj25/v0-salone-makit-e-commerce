import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Mail } from "lucide-react"

export const metadata = {
  title: "Check Your Email - Salone Makit",
  description: "Confirm your email to complete registration",
}

export default function SignupSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Mail className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Check Your Email</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              We've sent you a confirmation email. Please click the link in the email to activate your Salone Makit
              account.
            </p>
            <p className="text-sm text-muted-foreground">
              Didn't receive the email? Check your spam folder or contact support at{" "}
              <a href="mailto:shekujkamara95@gmail.com" className="text-primary hover:underline">
                shekujkamara95@gmail.com
              </a>
            </p>
            <Button asChild size="lg" className="w-full mt-6">
              <Link href="/login">Back to Login</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
