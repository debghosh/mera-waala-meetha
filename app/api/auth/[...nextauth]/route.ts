import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaClient } from '@prisma/client'
import bcryptjs from 'bcryptjs'

const prisma = new PrismaClient()

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          // Find user in database
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email
            },
            select: {
              id: true,
              name: true,
              email: true,
              password: true,
              role: true
            }
          })

          if (!user) {
            return null
          }

          // Verify password
          const isPasswordValid = await bcryptjs.compare(
            credentials.password,
            user.password
          )

          if (!isPasswordValid) {
            return null
          }

          // Return user object (without password)
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role
          }

        } catch (error) {
          console.error('Auth error:', error)
          return null
        } finally {
          await prisma.$disconnect()
        }
      }
    })
  ],
  session: { 
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/login"
  },
  callbacks: {
    // Include role in JWT token
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    // Include role in session
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub
        session.user.role = token.role as string
      }
      return session
    }
  }
})

export { handler as GET, handler as POST }