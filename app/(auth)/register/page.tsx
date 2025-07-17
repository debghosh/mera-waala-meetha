'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [success, setSuccess] = useState('')
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrors({})
    setSuccess('')

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        if (data.details) {
          // Handle validation errors from Zod
          const fieldErrors: Record<string, string> = {}
          Object.keys(data.details).forEach(field => {
            fieldErrors[field] = data.details[field][0] // First error message
          })
          setErrors(fieldErrors)
        } else {
          setErrors({ general: data.error || 'Registration failed' })
        }
        return
      }

      // Success!
      setSuccess('🎉 Account created successfully! Redirecting to login...')
      
      // Clear form
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      })

      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push('/login')
      }, 2000)

    } catch (error) {
      setErrors({ general: 'Something went wrong. Please try again.' })
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
        top: '15%',
        left: '10%',
        width: '180px',
        height: '180px',
        background: 'linear-gradient(45deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
        borderRadius: '50%',
        animation: 'float 10s ease-in-out infinite'
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '15%',
        right: '10%',
        width: '120px',
        height: '120px',
        background: 'linear-gradient(45deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
        borderRadius: '50%',
        animation: 'float 7s ease-in-out infinite reverse'
      }}></div>
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '5%',
        width: '60px',
        height: '60px',
        background: 'linear-gradient(45deg, rgba(255, 107, 53, 0.2), rgba(247, 147, 30, 0.1))',
        borderRadius: '50%',
        animation: 'float 12s ease-in-out infinite'
      }}></div>

      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        padding: '3rem',
        borderRadius: '24px',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '500px',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            background: 'linear-gradient(135deg, #10b981, #059669)',
            width: '50px',
            height: '50px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            margin: '0 auto 1rem',
            boxShadow: '0 8px 20px rgba(16, 185, 129, 0.3)'
          }}>
            🆕
          </div>
          <h1 style={{ 
            fontSize: '1.75rem', 
            fontWeight: '700', 
            marginBottom: '0.5rem',
            background: 'linear-gradient(135deg, #1a202c, #2d3748)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Join the Family!
          </h1>
          <p style={{ 
            color: '#64748b',
            fontSize: '0.95rem',
            fontWeight: '500'
          }}>
            Create your Mera Wala Meetha account
          </p>
        </div>
        
        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ 
              display: 'block', 
              fontSize: '0.8rem', 
              fontWeight: '600', 
              marginBottom: '0.5rem',
              color: '#374151'
            }}>
              👤 Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your full name"
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                border: `2px solid ${errors.name ? '#ef4444' : 'transparent'}`,
                borderRadius: '12px',
                fontSize: '0.875rem',
                backgroundColor: errors.name ? '#fef2f2' : '#f8fafc',
                transition: 'all 0.3s ease',
                outline: 'none'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = errors.name ? '#ef4444' : '#10b981'
                e.currentTarget.style.backgroundColor = 'white'
                e.currentTarget.style.boxShadow = `0 0 0 3px ${errors.name ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)'}`
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = errors.name ? '#ef4444' : 'transparent'
                e.currentTarget.style.backgroundColor = errors.name ? '#fef2f2' : '#f8fafc'
                e.currentTarget.style.boxShadow = 'none'
              }}
            />
            {errors.name && (
              <p style={{ 
                color: '#ef4444', 
                fontSize: '0.7rem', 
                marginTop: '0.4rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}>
                <span>⚠️</span>
                {errors.name}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ 
              display: 'block', 
              fontSize: '0.875rem', 
              fontWeight: '600', 
              marginBottom: '0.75rem',
              color: '#374151'
            }}>
              📧 Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="your@email.com"
              style={{
                width: '100%',
                padding: '1rem 1.25rem',
                border: `2px solid ${errors.email ? '#ef4444' : 'transparent'}`,
                borderRadius: '16px',
                fontSize: '1rem',
                backgroundColor: errors.email ? '#fef2f2' : '#f8fafc',
                transition: 'all 0.3s ease',
                outline: 'none'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = errors.email ? '#ef4444' : '#10b981'
                e.currentTarget.style.backgroundColor = 'white'
                e.currentTarget.style.boxShadow = `0 0 0 3px ${errors.email ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)'}`
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = errors.email ? '#ef4444' : 'transparent'
                e.currentTarget.style.backgroundColor = errors.email ? '#fef2f2' : '#f8fafc'
                e.currentTarget.style.boxShadow = 'none'
              }}
            />
            {errors.email && (
              <p style={{ 
                color: '#ef4444', 
                fontSize: '0.75rem', 
                marginTop: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}>
                <span>⚠️</span>
                {errors.email}
              </p>
            )}
          </div>
          
          {/* Password Field */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ 
              display: 'block', 
              fontSize: '0.875rem', 
              fontWeight: '600', 
              marginBottom: '0.75rem',
              color: '#374151'
            }}>
              🔒 Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Create a strong password"
              style={{
                width: '100%',
                padding: '1rem 1.25rem',
                border: `2px solid ${errors.password ? '#ef4444' : 'transparent'}`,
                borderRadius: '16px',
                fontSize: '1rem',
                backgroundColor: errors.password ? '#fef2f2' : '#f8fafc',
                transition: 'all 0.3s ease',
                outline: 'none'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = errors.password ? '#ef4444' : '#10b981'
                e.currentTarget.style.backgroundColor = 'white'
                e.currentTarget.style.boxShadow = `0 0 0 3px ${errors.password ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)'}`
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = errors.password ? '#ef4444' : 'transparent'
                e.currentTarget.style.backgroundColor = errors.password ? '#fef2f2' : '#f8fafc'
                e.currentTarget.style.boxShadow = 'none'
              }}
            />
            {errors.password && (
              <p style={{ 
                color: '#ef4444', 
                fontSize: '0.75rem', 
                marginTop: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}>
                <span>⚠️</span>
                {errors.password}
              </p>
            )}
            <p style={{ 
              color: '#64748b', 
              fontSize: '0.75rem', 
              marginTop: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}>
              <span>💡</span>
              Minimum 6 characters
            </p>
          </div>

          {/* Confirm Password Field */}
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ 
              display: 'block', 
              fontSize: '0.875rem', 
              fontWeight: '600', 
              marginBottom: '0.75rem',
              color: '#374151'
            }}>
              🔐 Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Repeat your password"
              style={{
                width: '100%',
                padding: '1rem 1.25rem',
                border: `2px solid ${errors.confirmPassword ? '#ef4444' : 'transparent'}`,
                borderRadius: '16px',
                fontSize: '1rem',
                backgroundColor: errors.confirmPassword ? '#fef2f2' : '#f8fafc',
                transition: 'all 0.3s ease',
                outline: 'none'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = errors.confirmPassword ? '#ef4444' : '#10b981'
                e.currentTarget.style.backgroundColor = 'white'
                e.currentTarget.style.boxShadow = `0 0 0 3px ${errors.confirmPassword ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)'}`
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = errors.confirmPassword ? '#ef4444' : 'transparent'
                e.currentTarget.style.backgroundColor = errors.confirmPassword ? '#fef2f2' : '#f8fafc'
                e.currentTarget.style.boxShadow = 'none'
              }}
            />
            {errors.confirmPassword && (
              <p style={{ 
                color: '#ef4444', 
                fontSize: '0.75rem', 
                marginTop: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}>
                <span>⚠️</span>
                {errors.confirmPassword}
              </p>
            )}
          </div>
          
          {/* General Error */}
          {errors.general && (
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
              {errors.general}
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div style={{ 
              marginBottom: '1.5rem', 
              padding: '1rem 1.25rem', 
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.05))',
              border: '1px solid rgba(16, 185, 129, 0.2)',
              borderRadius: '16px',
              color: '#047857',
              fontSize: '0.875rem',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span>✅</span>
              {success}
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
                : 'linear-gradient(135deg, #10b981, #059669)',
              color: 'white',
              border: 'none',
              borderRadius: '16px',
              fontSize: '1.1rem',
              fontWeight: '700',
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: loading 
                ? '0 4px 6px rgba(148, 163, 184, 0.3)' 
                : '0 10px 25px rgba(16, 185, 129, 0.4)',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem'
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(16, 185, 129, 0.5)'
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(16, 185, 129, 0.4)'
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
                Creating account...
              </>
            ) : (
              <>
                <span>🎉</span>
                Create Account
              </>
            )}
          </button>
        </form>
        
        {/* Sign In Link */}
        <div style={{ 
          marginTop: '2rem', 
          textAlign: 'center',
          fontSize: '0.875rem'
        }}>
          <span style={{ color: '#64748b' }}>Already have an account? </span>
          <Link 
            href="/login" 
            style={{ 
              color: '#10b981', 
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
            Sign in here →
          </Link>
        </div>

        {/* Benefits Section */}
        <div style={{
          marginTop: '2rem',
          padding: '1.5rem',
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(124, 58, 237, 0.05))',
          borderRadius: '16px',
          border: '1px solid rgba(139, 92, 246, 0.2)'
        }}>
          <div style={{
            fontSize: '0.875rem',
            fontWeight: '600',
            color: '#5b21b6',
            marginBottom: '0.75rem'
          }}>
            🎁 Join and enjoy:
          </div>
          <div style={{
            fontSize: '0.75rem',
            color: '#5b21b6',
            lineHeight: '1.5'
          }}>
            • Access to premium sweet collections<br />
            • Bulk order discounts for events<br />
            • Track orders and delivery status<br />
            • Exclusive festival season offers
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