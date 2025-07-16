import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          include: { vendorProfile: true }
        })
        
        if (!user || !user.password) return null
        
        const isValid = await bcrypt.compare(credentials.password, user.password)
        if (!isValid) return null
        
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          vendorId: user.vendorProfile?.id
        }
      }
    })
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.vendorId = user.vendorId
      }
      return token
    },
    async session({ session, token }) {
      session.user.role = token.role as string
      session.user.vendorId = token.vendorId as string
      return session
    }
  },
  pages: {
    signIn: "/login",
  }
})