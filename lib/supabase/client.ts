import { createBrowserClient } from "@supabase/ssr"
import { mockAuth } from "@/lib/mock-auth"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const usingMockAuth = !supabaseUrl || !supabaseAnonKey

if (usingMockAuth) {
  console.info(
    "[v0] Using mock authentication. To enable real Supabase authentication, set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.",
  )
}

export function createClient() {
  if (usingMockAuth) {
    return {
      auth: {
        signUp: async (options: any) => {
          try {
            const result = await mockAuth.signUp(options.email, options.password, options.options?.data || {})
            return result
          } catch (error: any) {
            return { data: null, error: { message: error.message } }
          }
        },
        signInWithPassword: async (options: any) => {
          try {
            const result = await mockAuth.signIn(options.email, options.password)
            return result
          } catch (error: any) {
            return { data: null, error: { message: error.message } }
          }
        },
        getUser: mockAuth.getUser,
        getSession: mockAuth.getSession,
        signOut: mockAuth.signOut,
      },
      from: () => ({
        insert: async () => ({ data: null, error: null }),
        select: async () => ({ data: [], error: null }),
        update: async () => ({ data: null, error: null }),
        delete: async () => ({ data: null, error: null }),
      }),
    } as any
  }

  // Use real Supabase client if env vars are set
  return createBrowserClient(supabaseUrl!, supabaseAnonKey!)
}
