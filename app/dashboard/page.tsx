'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'

export default function CustomerDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return // Still loading

    if (!session) {
      router.push('/login')
      return
    }
  }, [session, status, router])

  if (status === 'loading') {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f9fafb'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #f97316',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem'
          }}></div>
          <p style={{ color: '#6b7280' }}>Loading...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null // Will redirect
  }

  const handleSignOut = () => {
    signOut({ callbackUrl: '/login' })
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      {/* Header */}
      <header style={{
        backgroundColor: 'white',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '1rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h1 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#f97316',
              margin: 0
            }}>
              Mera Wala Meetha
            </h1>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link
              href="/products"
              style={{
                color: '#6b7280',
                textDecoration: 'none',
                fontSize: '0.875rem',
                fontWeight: '500'
              }}
            >
              Browse Products
            </Link>
            <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>
              Welcome, {session.user?.name}
            </span>
            <button
              onClick={handleSignOut}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#f97316',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '0.875rem',
                cursor: 'pointer'
              }}
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        {/* Welcome Section */}
        <div style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          marginBottom: '2rem'
        }}>
          <h2 style={{
            fontSize: '1.875rem',
            fontWeight: 'bold',
            marginBottom: '0.5rem',
            color: '#1f2937'
          }}>
            Welcome to Your Sweet Dashboard! 🍬
          </h2>
          <p style={{
            color: '#6b7280',
            fontSize: '1.1rem',
            marginBottom: '1.5rem'
          }}>
            Discover authentic South Asian sweets for your special occasions
          </p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1rem',
            marginTop: '1.5rem'
          }}>
            {/* User Info Card */}
            <div style={{
              padding: '1.5rem',
              backgroundColor: '#fef3e2',
              borderRadius: '8px',
              border: '1px solid #fed7aa'
            }}>
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: '600',
                marginBottom: '0.5rem',
                color: '#ea580c'
              }}>
                Your Account
              </h3>
              <p style={{ color: '#9a3412', fontSize: '0.875rem', margin: '0.25rem 0' }}>
                <strong>Name:</strong> {session.user?.name}
              </p>
              <p style={{ color: '#9a3412', fontSize: '0.875rem', margin: '0.25rem 0' }}>
                <strong>Email:</strong> {session.user?.email}
              </p>
              <p style={{ color: '#9a3412', fontSize: '0.875rem', margin: '0.25rem 0' }}>
                <strong>Role:</strong> {session.user?.role}
              </p>
            </div>

            {/* Quick Actions */}
            <div style={{
              padding: '1.5rem',
              backgroundColor: '#f0fdf4',
              borderRadius: '8px',
              border: '1px solid #bbf7d0'
            }}>
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: '600',
                marginBottom: '1rem',
                color: '#15803d'
              }}>
                Quick Actions
              </h3>
              <Link
                href="/products"
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '0.75rem',
                  backgroundColor: '#16a34a',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '6px',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  textAlign: 'center',
                  marginBottom: '0.5rem'
                }}
              >
                Browse Products
              </Link>
              <button style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: 'transparent',
                color: '#15803d',
                border: '1px solid #15803d',
                borderRadius: '6px',
                fontSize: '0.875rem',
                fontWeight: '500',
                cursor: 'pointer'
              }}>
                View Orders
              </button>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem'
        }}>
          {/* Browse Products Card */}
          <div style={{
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🛍️</div>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              marginBottom: '0.5rem',
              color: '#1f2937'
            }}>
              Browse Sweet Collections
            </h3>
            <p style={{
              color: '#6b7280',
              fontSize: '0.875rem',
              marginBottom: '1rem'
            }}>
              Discover traditional sweets from verified vendors across South Asia
            </p>
            <Link
              href="/products"
              style={{
                display: 'inline-block',
                padding: '0.75rem 1.5rem',
                backgroundColor: '#f97316',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '6px',
                fontSize: '0.875rem',
                fontWeight: '500'
              }}
            >
              Start Shopping
            </Link>
          </div>

          {/* Orders Card */}
          <div style={{
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📦</div>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              marginBottom: '0.5rem',
              color: '#1f2937'
            }}>
              Your Orders
            </h3>
            <p style={{
              color: '#6b7280',
              fontSize: '0.875rem',
              marginBottom: '1rem'
            }}>
              Track your bulk orders and delivery status
            </p>
            <button style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#6b7280',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '0.875rem',
              fontWeight: '500',
              cursor: 'pointer'
            }}>
              View Orders
            </button>
          </div>

          {/* Special Occasions Card */}
          <div style={{
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🎉</div>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              marginBottom: '0.5rem',
              color: '#1f2937'
            }}>
              Special Occasions
            </h3>
            <p style={{
              color: '#6b7280',
              fontSize: '0.875rem',
              marginBottom: '1rem'
            }}>
              Wedding, festivals, and celebration packages
            </p>
            <button style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#8b5cf6',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '0.875rem',
              fontWeight: '500',
              cursor: 'pointer'
            }}>
              Plan Event
            </button>
          </div>

          {/* New Product Categories Preview */}
          <div style={{
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🏷️</div>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              marginBottom: '0.5rem',
              color: '#1f2937'
            }}>
              Product Categories
            </h3>
            <p style={{
              color: '#6b7280',
              fontSize: '0.875rem',
              marginBottom: '1rem'
            }}>
              Laddu, Barfi, Halwa, Rasgulla, Gulab Jamun & more
            </p>
            <Link
              href="/products?category=LADDU"
              style={{
                display: 'inline-block',
                padding: '0.75rem 1.5rem',
                backgroundColor: '#06b6d4',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '6px',
                fontSize: '0.875rem',
                fontWeight: '500'
              }}
            >
              Explore Categories
            </Link>
          </div>

          {/* Featured Vendors */}
          <div style={{
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>👨‍🍳</div>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              marginBottom: '0.5rem',
              color: '#1f2937'
            }}>
              Featured Vendors
            </h3>
            <p style={{
              color: '#6b7280',
              fontSize: '0.875rem',
              marginBottom: '1rem'
            }}>
              Sharma Sweet House, Kolkata Mishti Bhandar, Punjab Sweet Corner
            </p>
            <Link
              href="/products"
              style={{
                display: 'inline-block',
                padding: '0.75rem 1.5rem',
                backgroundColor: '#84cc16',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '6px',
                fontSize: '0.875rem',
                fontWeight: '500'
              }}
            >
              View All Vendors
            </Link>
          </div>

          {/* Search Shortcut */}
          <div style={{
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🔍</div>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              marginBottom: '0.5rem',
              color: '#1f2937'
            }}>
              Quick Search
            </h3>
            <p style={{
              color: '#6b7280',
              fontSize: '0.875rem',
              marginBottom: '1rem'
            }}>
              Find your favorite sweets quickly
            </p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Link
                href="/products?search=laddu"
                style={{
                  padding: '0.5rem 0.75rem',
                  backgroundColor: '#fef3e2',
                  color: '#ea580c',
                  textDecoration: 'none',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  fontWeight: '500'
                }}
              >
                Laddu
              </Link>
              <Link
                href="/products?search=barfi"
                style={{
                  padding: '0.5rem 0.75rem',
                  backgroundColor: '#fef3e2',
                  color: '#ea580c',
                  textDecoration: 'none',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  fontWeight: '500'
                }}
              >
                Barfi
              </Link>
              <Link
                href="/products?search=halwa"
                style={{
                  padding: '0.5rem 0.75rem',
                  backgroundColor: '#fef3e2',
                  color: '#ea580c',
                  textDecoration: 'none',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  fontWeight: '500'
                }}
              >
                Halwa
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* CSS for loading spinner */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}