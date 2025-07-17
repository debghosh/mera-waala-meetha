'use client'

import { useState } from 'react'
import { signIn, getSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false
      })

      if (result?.error) {
        setError('Invalid email or password')
      } else {
        const session = await getSession()
        
        // Redirect based on user role
        if (session?.user?.role === 'VENDOR') {
          router.push('/dashboard/vendor')
        } else {
          router.push('/dashboard')
        }
      }
    } catch (error) {
      setError('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '2rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Background Elements */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '5%',
        width: '200px',
        height: '200px',
        background: 'linear-gradient(45deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
        borderRadius: '50%',
        animation: 'float 8s ease-in-out infinite'
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '5%',
        width: '150px',
        height: '150px',
        background: 'linear-gradient(45deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
        borderRadius: '50%',
        animation: 'float 6s ease-in-out infinite reverse'
      }}></div>

      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        padding: '3rem',
        borderRadius: '24px',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '450px',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            background: 'linear-gradient(135deg, #ff6b35, #f7931e)',
            width: '50px',
            height: '50px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            margin: '0 auto 1rem',
            boxShadow: '0 8px 20px rgba(255, 107, 53, 0.3)'
          }}>
            🍯
          </div>
          <h1 style={{ 
            fontSize: '1.75rem', 
            fontWeight: '700', 
            marginBottom: '0.5rem',
            background: 'linear-gradient(135deg, #1a202c, #2d3748)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Welcome Back!
          </h1>
          <p style={{ 
            color: '#64748b',
            fontSize: '0.95rem',
            fontWeight: '500'
          }}>
            Sign in to your Mera Wala Meetha account
          </p>
        </div>
        
        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ 
              display: 'block', 
              fontSize: '0.8rem', 
              fontWeight: '600', 
              marginBottom: '0.5rem',
              color: '#374151'
            }}>
              📧 Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your@email.com"
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                border: '2px solid transparent',
                borderRadius: '12px',
                fontSize: '0.875rem',
                backgroundColor: '#f8fafc',
                transition: 'all 0.3s ease',
                outline: 'none'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#ff6b35'
                e.currentTarget.style.backgroundColor = 'white'
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255, 107, 53, 0.1)'
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'transparent'
                e.currentTarget.style.backgroundColor = '#f8fafc'
                e.currentTarget.style.boxShadow = 'none'
              }}
            />
          </div>
          
          {/* Password Field */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ 
              display: 'block', 
              fontSize: '0.8rem', 
              fontWeight: '600', 
              marginBottom: '0.5rem',
              color: '#374151'
            }}>
              🔒 Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                border: '2px solid transparent',
                borderRadius: '12px',
                fontSize: '0.875rem',
                backgroundColor: '#f8fafc',
                transition: 'all 0.3s ease',
                outline: 'none'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#ff6b35'
                e.currentTarget.style.backgroundColor = 'white'
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255, 107, 53, 0.1)'
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'transparent'
                e.currentTarget.style.backgroundColor = '#f8fafc'
                e.currentTarget.style.boxShadow = 'none'
              }}
            />
          </div>
          
          {/* Error Message */}
          {error && (
            <div style={{ 
              marginBottom: '1.5rem', 
              padding: '1rem 1.25rem', 
              background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(220, 38, 38, 0.05))',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              borderRadius: '16px',
              color: '#dc2626',
              fontSize: '0.875rem',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span>⚠️</span>
              {error}
            </div>
          )}
          
          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '1.25rem',
              background: loading 
                ? 'linear-gradient(135deg, #94a3b8, #64748b)' 
                : 'linear-gradient(135deg, #ff6b35, #f7931e)',
              color: 'white',
              border: 'none',
              borderRadius: '16px',
              fontSize: '1.1rem',
              fontWeight: '700',
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: loading 
                ? '0 4px 6px rgba(148, 163, 184, 0.3)' 
                : '0 10px 25px rgba(255, 107, 53, 0.4)',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem'
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(255, 107, 53, 0.5)'
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(255, 107, 53, 0.4)'
              }
            }}
          >
            {loading ? (
              <>
                <div style={{
                  width: '20px',
                  height: '20px',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  borderTop: '2px solid white',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}></div>
                Signing in...
              </>
            ) : (
              <>
                <span>🚀</span>
                Sign In
              </>
            )}
          </button>
        </form>
        
        {/* Sign Up Link */}
        <div style={{ 
          marginTop: '2rem', 
          textAlign: 'center',
          fontSize: '0.875rem'
        }}>
          <span style={{ color: '#64748b' }}>Don't have an account? </span>
          <Link 
            href="/register" 
            style={{ 
              color: '#ff6b35', 
              textDecoration: 'none',
              fontWeight: '600',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.textDecoration = 'underline'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.textDecoration = 'none'
            }}
          >
            Create one here →
          </Link>
        </div>

        {/* Demo Credentials */}
        <div style={{
          marginTop: '2rem',
          padding: '1rem',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          borderRadius: '12px',
          border: '1px solid rgba(16, 185, 129, 0.2)'
        }}>
          <div style={{
            fontSize: '0.75rem',
            fontWeight: '600',
            color: '#047857',
            marginBottom: '0.5rem'
          }}>
            🧪 Demo Credentials:
          </div>
          <div style={{
            fontSize: '0.75rem',
            color: '#047857'
          }}>
            Email: test@test.com<br />
            Password: password
          </div>
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  )
}