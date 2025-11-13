import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(amount: number, currency = "SLL"): string {
  if (currency === "SLL") {
    // Format Sierra Leonean Leones
    return `Le ${amount.toLocaleString()}`
  }
  return `${currency} ${amount.toLocaleString()}`
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString("en-SL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}
