import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcryptjs from 'bcryptjs'
import { z } from 'zod'

const prisma = new PrismaClient()

// Validation schema using Zod (already in your dependencies)
const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate input data
    const validationResult = registerSchema.safeParse(body)
    
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Validation failed', 
          details: validationResult.error.flatten().fieldErrors 
        },
        { status: 400 }
      )
    }

    const { name, email, password } = validationResult.data

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      )
    }

    // Hash password (12 rounds is secure and performant)
    const hashedPassword = await bcryptjs.hash(password, 12)

    // Create user in database
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 'CUSTOMER' // Default role for customer registration
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true
        // Never return password, even hashed
      }
    })

    return NextResponse.json(
      { 
        message: 'User created successfully', 
        user 
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}