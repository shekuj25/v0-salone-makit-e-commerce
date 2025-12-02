// Mock authentication system for testing without Supabase
// This allows the platform to work fully before Supabase is configured

export interface MockUser {
  id: string
  email: string
  password: string
  fullName: string
  phone?: string
  district: string
  role: "buyer" | "merchant" | "admin"
  createdAt: Date
}

export interface MockAuthSession {
  user: MockUser
  token: string
  expiresAt: Date
}

const MOCK_USERS_KEY = "salone-makit-users"
const MOCK_SESSION_KEY = "salone-makit-session"

const DEMO_ACCOUNTS = [
  {
    id: "admin_demo",
    email: "admin@salone.com",
    password: "admin123",
    fullName: "Admin User",
    phone: "+232 76 000000",
    district: "Western Area",
    role: "admin" as const,
    createdAt: new Date(),
  },
  {
    id: "merchant_demo",
    email: "merchant@salone.com",
    password: "merchant123",
    fullName: "Merchant Demo",
    phone: "+232 78 111111",
    district: "Bo",
    role: "merchant" as const,
    createdAt: new Date(),
  },
  {
    id: "buyer_demo",
    email: "buyer@salone.com",
    password: "buyer123",
    fullName: "Buyer Demo",
    phone: "+232 79 222222",
    district: "Freetown",
    role: "buyer" as const,
    createdAt: new Date(),
  },
]

// Get all users from localStorage
function getAllUsers(): MockUser[] {
  if (typeof window === "undefined") return []
  const users = localStorage.getItem(MOCK_USERS_KEY)
  const storedUsers = users ? JSON.parse(users) : []

  // Initialize demo accounts if not already in localStorage
  if (storedUsers.length === 0) {
    localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(DEMO_ACCOUNTS))
    return DEMO_ACCOUNTS
  }

  return storedUsers
}

// Save users to localStorage
function saveUsers(users: MockUser[]): void {
  if (typeof window === "undefined") return
  localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users))
}

// Generate a mock token
function generateToken(): string {
  return "mock_" + Math.random().toString(36).substr(2, 9) + "_" + Date.now()
}

export const mockAuth = {
  // Sign up a new user
  signUp: async (email: string, password: string, userData: Partial<MockUser>) => {
    const users = getAllUsers()

    // Check if user already exists
    if (users.some((u) => u.email === email)) {
      throw new Error("User already registered")
    }

    const newUser: MockUser = {
      id: "user_" + Math.random().toString(36).substr(2, 9),
      email,
      password,
      fullName: userData.fullName || "User",
      phone: userData.phone,
      district: userData.district || "",
      role: userData.role || "buyer",
      createdAt: new Date(),
    }

    users.push(newUser)
    saveUsers(users)

    // Create session
    const token = generateToken()
    const session: MockAuthSession = {
      user: newUser,
      token,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    }

    if (typeof window !== "undefined") {
      localStorage.setItem(MOCK_SESSION_KEY, JSON.stringify(session))
      document.cookie = `sb-access-token=${token}; path=/; max-age=${24 * 60 * 60}`
    }

    return { data: { user: newUser, session }, error: null }
  },

  // Sign in user
  signIn: async (email: string, password: string) => {
    const users = getAllUsers()
    const user = users.find((u) => u.email === email)

    if (!user || user.password !== password) {
      throw new Error("Invalid email or password")
    }

    // Create session
    const token = generateToken()
    const session: MockAuthSession = {
      user,
      token,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    }

    if (typeof window !== "undefined") {
      localStorage.setItem(MOCK_SESSION_KEY, JSON.stringify(session))
      document.cookie = `sb-access-token=${token}; path=/; max-age=${24 * 60 * 60}`
    }

    return { data: { user, session }, error: null }
  },

  // Get current session
  getSession: async () => {
    if (typeof window === "undefined") return { data: { session: null }, error: null }

    const sessionStr = localStorage.getItem(MOCK_SESSION_KEY)
    if (!sessionStr) return { data: { session: null }, error: null }

    const session: MockAuthSession = JSON.parse(sessionStr)

    // Check if expired
    if (new Date() > session.expiresAt) {
      localStorage.removeItem(MOCK_SESSION_KEY)
      document.cookie = "sb-access-token=; path=/; max-age=0"
      return { data: { session: null }, error: null }
    }

    return { data: { session }, error: null }
  },

  // Get current user
  getUser: async () => {
    const { data } = await mockAuth.getSession()
    return { data: { user: data?.session?.user || null }, error: null }
  },

  // Sign out
  signOut: async () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(MOCK_SESSION_KEY)
      document.cookie = "sb-access-token=; path=/; max-age=0"
    }
    return { error: null }
  },

  // Update user profile
  updateProfile: async (updates: Partial<MockUser>) => {
    const { data: sessionData } = await mockAuth.getSession()
    if (!sessionData?.session) throw new Error("No active session")

    const users = getAllUsers()
    const userIndex = users.findIndex((u) => u.id === sessionData.session.user.id)

    if (userIndex === -1) throw new Error("User not found")

    const updatedUser = { ...users[userIndex], ...updates }
    users[userIndex] = updatedUser

    saveUsers(users)

    // Update session
    const session: MockAuthSession = JSON.parse(localStorage.getItem(MOCK_SESSION_KEY) || "{}")
    session.user = updatedUser
    localStorage.setItem(MOCK_SESSION_KEY, JSON.stringify(session))

    return { data: { user: updatedUser }, error: null }
  },
}
