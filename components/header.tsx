"use client"

import Link from "next/link"
import { ShoppingCart, Menu, User, LogOut, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-provider"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  const { items } = useCart()
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const supabase = createClient()

    // Get initial user
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-1 font-poppins font-bold text-xl hover:opacity-80 transition-opacity"
        >
          <span className="text-[#0072CE]">Salone</span>
          <span className="text-[#1EB53A]">Makit</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/products"
            className="text-sm font-medium text-foreground/80 hover:text-[#0072CE] transition-colors"
          >
            Products
          </Link>
          <Link
            href="/categories"
            className="text-sm font-medium text-foreground/80 hover:text-[#1EB53A] transition-colors"
          >
            Categories
          </Link>
          <Link
            href="/merchants"
            className="text-sm font-medium text-foreground/80 hover:text-[#F0B429] transition-colors"
          >
            Become a Merchant
          </Link>
          <Link href="/help" className="text-sm font-medium text-foreground/80 hover:text-[#0072CE] transition-colors">
            Help
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hidden md:flex hover:bg-[#0072CE]/10 hover:text-[#0072CE]"
                >
                  <User className="h-5 w-5" />
                  <span className="sr-only">Account</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5 text-sm">
                  <p className="font-medium">{user.user_metadata?.full_name || user.email}</p>
                  <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/account" className="cursor-pointer">
                    My Account
                  </Link>
                </DropdownMenuItem>
                {user.user_metadata?.role === "merchant" && (
                  <DropdownMenuItem asChild>
                    <Link href="/merchant" className="cursor-pointer">
                      Merchant Dashboard
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="hidden md:flex hover:bg-[#0072CE]/10 hover:text-[#0072CE]"
            >
              <Link href="/login">
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </Link>
            </Button>
          )}

          <Button variant="ghost" size="icon" asChild className="relative hover:bg-[#1EB53A]/10 hover:text-[#1EB53A]">
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-[#1EB53A] text-white border-2 border-background shadow-sm">
                  {cartCount}
                </Badge>
              )}
              <span className="sr-only">Cart ({cartCount} items)</span>
            </Link>
          </Button>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="hover:bg-[#0072CE]/10">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-1 font-poppins font-bold text-xl mb-8">
                  <span className="text-[#0072CE]">Salone</span>
                  <span className="text-[#1EB53A]">Makit</span>
                </div>

                <nav className="flex flex-col gap-6">
                  <Link
                    href="/products"
                    className="text-lg font-medium hover:text-[#0072CE] transition-colors flex items-center gap-2"
                  >
                    <div className="h-1 w-1 rounded-full bg-[#0072CE]"></div>
                    Products
                  </Link>
                  <Link
                    href="/categories"
                    className="text-lg font-medium hover:text-[#1EB53A] transition-colors flex items-center gap-2"
                  >
                    <div className="h-1 w-1 rounded-full bg-[#1EB53A]"></div>
                    Categories
                  </Link>
                  <Link
                    href="/merchants"
                    className="text-lg font-medium hover:text-[#F0B429] transition-colors flex items-center gap-2"
                  >
                    <div className="h-1 w-1 rounded-full bg-[#F0B429]"></div>
                    Become a Merchant
                  </Link>
                  <Link
                    href="/help"
                    className="text-lg font-medium hover:text-[#0072CE] transition-colors flex items-center gap-2"
                  >
                    <div className="h-1 w-1 rounded-full bg-[#0072CE]"></div>
                    Help Center
                  </Link>

                  {user ? (
                    <>
                      <Link
                        href="/account"
                        className="text-lg font-medium hover:text-[#1EB53A] transition-colors flex items-center gap-2"
                      >
                        <div className="h-1 w-1 rounded-full bg-[#1EB53A]"></div>
                        My Account
                      </Link>
                      {user.user_metadata?.role === "merchant" && (
                        <Link
                          href="/merchant"
                          className="text-lg font-medium hover:text-[#F0B429] transition-colors flex items-center gap-2"
                        >
                          <div className="h-1 w-1 rounded-full bg-[#F0B429]"></div>
                          Merchant Dashboard
                        </Link>
                      )}
                      <button
                        onClick={handleSignOut}
                        className="text-lg font-medium hover:text-red-600 transition-colors flex items-center gap-2 text-left"
                      >
                        <div className="h-1 w-1 rounded-full bg-red-600"></div>
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <Link
                      href="/login"
                      className="text-lg font-medium hover:text-[#0072CE] transition-colors flex items-center gap-2"
                    >
                      <div className="h-1 w-1 rounded-full bg-[#0072CE]"></div>
                      Login / Sign Up
                    </Link>
                  )}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
