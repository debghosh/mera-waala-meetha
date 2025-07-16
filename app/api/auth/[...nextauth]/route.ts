import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Simple test authentication
        if (credentials?.email === "test@test.com" && credentials?.password === "password") {
          return {
            id: "1",
            email: "test@test.com",
            name: "Test User",
            role: "CUSTOMER"
          }
        }
        return null
      }
    })
  ],
  session: { strategy: "jwt" }
  // Removed the pages config so NextAuth uses default pages
})

export { handler as GET, handler as POST }