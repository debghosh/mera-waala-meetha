'use client'

import { useState, useEffect, use } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  imageUrl: string
  minOrderKg: number
  maxOrderKg: number
  vendorName: string
  vendorId: string
  city: string
  state: string
  occasions: string[]
  createdAt: string
}

interface ProductDetailPageProps {
  params: Promise<{
    id: string
  }>
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const resolvedParams = use(params)
  const { data: session } = useSession()
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchProduct()
  }, [resolvedParams.id])

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/products/${resolvedParams.id}`)
      if (response.ok) {
        const data = await response.json()
        setProduct(data)
        setQuantity(data.minOrderKg)
      } else {
        setError('Product not found')
      }
    } catch (error) {
      console.error('Error fetching product:', error)
      setError('Failed to load product')
    } finally {
      setLoading(false)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price)
  }

  const formatCategory = (category: string) => {
    return category.split('_').map(word => 
      word.charAt(0) + word.slice(1).toLowerCase()
    ).join(' ')
  }

  const formatOccasions = (occasions: string[]) => {
    return occasions.map(occasion => 
      occasion.split('_').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      ).join(' ')
    ).join(', ')
  }

  const getTotalPrice = () => {
    return product ? product.price * quantity : 0
  }

  const handleQuantityChange = (newQuantity: number) => {
    if (!product) return
    
    if (newQuantity < product.minOrderKg) {
      setQuantity(product.minOrderKg)
    } else if (product.maxOrderKg && newQuantity > product.maxOrderKg) {
      setQuantity(product.maxOrderKg)
    } else {
      setQuantity(newQuantity)
    }
  }

  const handleAddToCart = () => {
    if (!session) {
      router.push('/login')
      return
    }
    
    // TODO: Implement cart functionality
    alert(`✨ Added ${quantity}kg of ${product?.name} to your cart!\n\n🛒 Total: ${formatPrice(getTotalPrice())}\n\n(Cart functionality coming soon!)`)
  }

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          padding: '3rem',
          borderRadius: '24px',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            border: '4px solid #f3f4f6',
            borderTop: '4px solid #ff6b35',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1.5rem'
          }}></div>
          <p style={{ 
            color: '#374151',
            fontSize: '1.1rem',
            fontWeight: '500'
          }}>
            Loading sweet details...
          </p>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          padding: '4rem',
          borderRadius: '24px',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
          maxWidth: '500px'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>😕</div>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: '700',
            color: '#1f2937',
            marginBottom: '1rem'
          }}>
            Sweet Not Found
          </h2>
          <p style={{ 
            color: '#64748b', 
            marginBottom: '2rem',
            fontSize: '1.1rem'
          }}>
            {error || 'The delicious treat you are looking for does not exist.'}
          </p>
          <Link
            href="/products"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '1rem 2rem',
              background: 'linear-gradient(135deg, #ff6b35, #f7931e)',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '50px',
              fontSize: '1rem',
              fontWeight: '600',
              boxShadow: '0 10px 25px rgba(255, 107, 53, 0.4)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)'
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(255, 107, 53, 0.5)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(255, 107, 53, 0.4)'
            }}
          >
            🛍️ Browse All Sweets
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
      position: 'relative'
    }}>
      {/* Floating Header */}
      <header style={{
        position: 'sticky',
        top: '1rem',
        zIndex: 50,
        margin: '1rem 2rem 0',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderRadius: '20px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '1.5rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Link href="/products" style={{ textDecoration: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                background: 'linear-gradient(135deg, #ff6b35, #f7931e)',
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.25rem'
              }}>
                🍯
              </div>
              <h1 style={{
                fontSize: '1.25rem',
                fontWeight: '700',
                background: 'linear-gradient(135deg, #ff6b35, #f7931e)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                margin: 0
              }}>
                Mera Wala Meetha
              </h1>
            </div>
          </Link>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link
              href="/products"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: '#64748b',
                textDecoration: 'none',
                fontSize: '0.875rem',
                fontWeight: '600',
                padding: '0.5rem 1rem',
                borderRadius: '50px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 107, 53, 0.1)'
                e.currentTarget.style.color = '#ff6b35'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.color = '#64748b'
              }}
            >
              ← Back to Collection
            </Link>
            {session && (
              <Link 
                href="/dashboard"
                style={{
                  padding: '0.75rem 1.5rem',
                  background: 'linear-gradient(135deg, #ff6b35, #f7931e)',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '50px',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  boxShadow: '0 10px 15px -3px rgba(255, 107, 53, 0.3)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(255, 107, 53, 0.4)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(255, 107, 53, 0.3)'
                }}
              >
                Dashboard
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '3rem 2rem 4rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(400px, 1fr) 1fr',
          gap: '4rem',
          alignItems: 'start'
        }}>
          {/* Product Image */}
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            position: 'sticky',
            top: '8rem'
          }}>
            <div style={{
              height: '500px',
              background: product.imageUrl 
                ? `linear-gradient(45deg, rgba(255, 107, 53, 0.1), rgba(247, 147, 30, 0.1)), url(${product.imageUrl})`
                : 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}>
              {!product.imageUrl && (
                <div style={{ 
                  fontSize: '6rem',
                  filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.1))'
                }}>
                  🍯
                </div>
              )}
              
              {/* Category Badge */}
              <div style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                padding: '0.75rem 1.5rem',
                borderRadius: '50px',
                fontSize: '0.875rem',
                fontWeight: '700',
                color: '#ff6b35',
                border: '1px solid rgba(255, 107, 53, 0.2)',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}>
                {formatCategory(product.category)}
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div>
            {/* Product Header */}
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              padding: '3rem',
              borderRadius: '24px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)',
              marginBottom: '2rem',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              {/* Product Name */}
              <h1 style={{
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '1rem',
                lineHeight: '1.2'
              }}>
                {product.name}
              </h1>

              {/* Price */}
              <div style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '0.75rem',
                marginBottom: '1.5rem',
                padding: '1rem',
                background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.1), rgba(247, 147, 30, 0.05))',
                borderRadius: '16px',
                border: '1px solid rgba(255, 107, 53, 0.2)'
              }}>
                <span style={{
                  fontSize: '2rem',
                  fontWeight: '800',
                  background: 'linear-gradient(135deg, #ff6b35, #f7931e)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  {formatPrice(product.price)}
                </span>
                <span style={{
                  fontSize: '1rem',
                  color: '#64748b',
                  fontWeight: '600'
                }}>
                  per kg
                </span>
              </div>

              {/* Description */}
              <p style={{
                color: '#4b5563',
                fontSize: '1rem',
                lineHeight: '1.6',
                marginBottom: '1.5rem'
              }}>
                {product.description}
              </p>

              {/* Order Information */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.05))',
                padding: '1.5rem',
                borderRadius: '20px',
                marginBottom: '2rem',
                border: '1px solid rgba(16, 185, 129, 0.2)'
              }}>
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: '700',
                  color: '#047857',
                  marginBottom: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  📋 Order Information
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '1rem',
                  fontSize: '0.875rem'
                }}>
                  <div>
                    <span style={{ color: '#047857', fontWeight: '600' }}>Minimum Order:</span>
                    <div style={{ color: '#1f2937', fontWeight: '700', fontSize: '1rem' }}>
                      {product.minOrderKg}kg
                    </div>
                  </div>
                  {product.maxOrderKg && (
                    <div>
                      <span style={{ color: '#047857', fontWeight: '600' }}>Maximum Order:</span>
                      <div style={{ color: '#1f2937', fontWeight: '700', fontSize: '1rem' }}>
                        {product.maxOrderKg}kg
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              padding: '3rem',
              borderRadius: '24px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)',
              marginBottom: '2rem',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              {/* Quantity Selector */}
              <div style={{ marginBottom: '2rem' }}>
                <label style={{
                  display: 'block',
                  fontSize: '1.125rem',
                  fontWeight: '700',
                  marginBottom: '1rem',
                  color: '#1f2937'
                }}>
                  ⚖️ Select Quantity (kg)
                </label>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem',
                  backgroundColor: '#f8fafc',
                  borderRadius: '20px'
                }}>
                  <button
                    onClick={() => handleQuantityChange(quantity - 0.5)}
                    style={{
                      width: '50px',
                      height: '50px',
                      backgroundColor: 'white',
                      border: '2px solid #e2e8f0',
                      borderRadius: '12px',
                      fontSize: '1.5rem',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      color: '#64748b',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#ff6b35'
                      e.currentTarget.style.color = '#ff6b35'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#e2e8f0'
                      e.currentTarget.style.color = '#64748b'
                    }}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(Number(e.target.value))}
                    min={product.minOrderKg}
                    max={product.maxOrderKg}
                    step="0.5"
                    style={{
                      width: '100px',
                      padding: '1rem',
                      border: '2px solid #e2e8f0',
                      borderRadius: '12px',
                      textAlign: 'center',
                      fontSize: '1.25rem',
                      fontWeight: '700',
                      backgroundColor: 'white',
                      outline: 'none'
                    }}
                  />
                  <button
                    onClick={() => handleQuantityChange(quantity + 0.5)}
                    style={{
                      width: '50px',
                      height: '50px',
                      backgroundColor: 'white',
                      border: '2px solid #e2e8f0',
                      borderRadius: '12px',
                      fontSize: '1.5rem',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      color: '#64748b',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#ff6b35'
                      e.currentTarget.style.color = '#ff6b35'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#e2e8f0'
                      e.currentTarget.style.color = '#64748b'
                    }}
                  >
                    +
                  </button>
                  <div style={{
                    marginLeft: 'auto',
                    textAlign: 'right'
                  }}>
                    <div style={{
                      fontSize: '0.875rem',
                      color: '#64748b',
                      fontWeight: '600'
                    }}>
                      Total Amount
                    </div>
                    <div style={{
                      fontSize: '2rem',
                      fontWeight: '900',
                      background: 'linear-gradient(135deg, #ff6b35, #f7931e)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}>
                      {formatPrice(getTotalPrice())}
                    </div>
                  </div>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                style={{
                  width: '100%',
                  padding: '1.5rem',
                  background: 'linear-gradient(135deg, #ff6b35, #f7931e)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '20px',
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  boxShadow: '0 10px 25px rgba(255, 107, 53, 0.4)',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.75rem'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)'
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(255, 107, 53, 0.5)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(255, 107, 53, 0.4)'
                }}
              >
                <span style={{ fontSize: '1.5rem' }}>🛒</span>
                Add to Cart
              </button>

              {!session && (
                <p style={{
                  color: '#64748b',
                  fontSize: '0.875rem',
                  textAlign: 'center',
                  marginTop: '1rem',
                  padding: '1rem',
                  backgroundColor: 'rgba(255, 107, 53, 0.1)',
                  borderRadius: '12px'
                }}>
                  <Link href="/login" style={{ color: '#ff6b35', fontWeight: '600' }}>
                    Sign in
                  </Link> to place orders and track deliveries
                </p>
              )}
            </div>

            {/* Vendor & Details */}
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              padding: '3rem',
              borderRadius: '24px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '2rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                📍 Product Details
              </h3>

              <div style={{
                display: 'grid',
                gap: '1.5rem'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1rem',
                  backgroundColor: '#f8fafc',
                  borderRadius: '12px'
                }}>
                  <span style={{ color: '#64748b', fontWeight: '600' }}>👨‍🍳 Artisan:</span>
                  <span style={{ fontWeight: '700', color: '#1f2937' }}>{product.vendorName}</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1rem',
                  backgroundColor: '#f8fafc',
                  borderRadius: '12px'
                }}>
                  <span style={{ color: '#64748b', fontWeight: '600' }}>📍 Location:</span>
                  <span style={{ fontWeight: '700', color: '#1f2937' }}>{product.city}, {product.state}</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1rem',
                  backgroundColor: '#f8fafc',
                  borderRadius: '12px'
                }}>
                  <span style={{ color: '#64748b', fontWeight: '600' }}>🏷️ Category:</span>
                  <span style={{ fontWeight: '700', color: '#1f2937' }}>{formatCategory(product.category)}</span>
                </div>
                {product.occasions.length > 0 && (
                  <div style={{
                    padding: '1rem',
                    backgroundColor: '#f8fafc',
                    borderRadius: '12px'
                  }}>
                    <div style={{ color: '#64748b', fontWeight: '600', marginBottom: '0.5rem' }}>
                      🎉 Perfect for:
                    </div>
                    <div style={{ fontWeight: '700', color: '#1f2937' }}>
                      {formatOccasions(product.occasions)}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}