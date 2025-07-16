'use client'

import { useState, useEffect } from 'react'
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
  params: {
    id: string
  }
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { data: session } = useSession()
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchProduct()
  }, [params.id])

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/products/${params.id}`)
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
    alert(`Added ${quantity}kg of ${product?.name} to cart!\n\nTotal: ${formatPrice(getTotalPrice())}\n\n(Cart functionality coming soon!)`)
  }

  if (loading) {
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
          <p style={{ color: '#6b7280' }}>Loading product details...</p>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f9fafb'
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '3rem',
          borderRadius: '8px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>😕</div>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: '#1f2937',
            marginBottom: '0.5rem'
          }}>
            Product Not Found
          </h2>
          <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
            {error || 'The product you are looking for does not exist.'}
          </p>
          <Link
            href="/products"
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#f97316',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '6px',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}
          >
            Browse All Products
          </Link>
        </div>
      </div>
    )
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
          <Link href="/products" style={{ textDecoration: 'none' }}>
            <h1 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#f97316',
              margin: 0
            }}>
              Mera Wala Meetha
            </h1>
          </Link>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link
              href="/products"
              style={{
                color: '#6b7280',
                textDecoration: 'none',
                fontSize: '0.875rem'
              }}
            >
              ← Back to Products
            </Link>
            {session && (
              <Link 
                href="/dashboard"
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#f97316',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '6px',
                  fontSize: '0.875rem'
                }}
              >
                Dashboard
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(300px, 1fr) 1fr',
          gap: '3rem',
          alignItems: 'start'
        }}>
          {/* Product Image */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden'
          }}>
            <div style={{
              height: '400px',
              backgroundColor: '#f3f4f6',
              backgroundImage: product.imageUrl ? `url(${product.imageUrl})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {!product.imageUrl && (
                <div style={{ fontSize: '5rem' }}>🍯</div>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <div style={{
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '8px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              marginBottom: '1.5rem'
            }}>
              {/* Category Badge */}
              <div style={{ marginBottom: '1rem' }}>
                <span style={{
                  backgroundColor: '#fef3e2',
                  color: '#ea580c',
                  padding: '0.5rem 1rem',
                  borderRadius: '6px',
                  fontSize: '0.875rem',
                  fontWeight: '500'
                }}>
                  {formatCategory(product.category)}
                </span>
              </div>

              {/* Product Name */}
              <h1 style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                color: '#1f2937',
                marginBottom: '1rem'
              }}>
                {product.name}
              </h1>

              {/* Price */}
              <div style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '0.5rem',
                marginBottom: '1.5rem'
              }}>
                <span style={{
                  fontSize: '3rem',
                  fontWeight: 'bold',
                  color: '#f97316'
                }}>
                  {formatPrice(product.price)}
                </span>
                <span style={{
                  fontSize: '1.25rem',
                  color: '#6b7280'
                }}>
                  per kg
                </span>
              </div>

              {/* Description */}
              <p style={{
                color: '#4b5563',
                fontSize: '1.1rem',
                lineHeight: '1.6',
                marginBottom: '2rem'
              }}>
                {product.description}
              </p>

              {/* Order Limits */}
              <div style={{
                backgroundColor: '#fef3e2',
                padding: '1rem',
                borderRadius: '6px',
                marginBottom: '2rem'
              }}>
                <h3 style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: '#ea580c',
                  marginBottom: '0.5rem'
                }}>
                  Order Information
                </h3>
                <p style={{
                  color: '#9a3412',
                  fontSize: '0.875rem',
                  margin: 0
                }}>
                  Minimum order: {product.minOrderKg}kg
                  {product.maxOrderKg && ` • Maximum order: ${product.maxOrderKg}kg`}
                </p>
              </div>

              {/* Quantity Selector */}
              <div style={{ marginBottom: '2rem' }}>
                <label style={{
                  display: 'block',
                  fontSize: '1rem',
                  fontWeight: '600',
                  marginBottom: '0.5rem',
                  color: '#374151'
                }}>
                  Quantity (kg)
                </label>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem'
                }}>
                  <button
                    onClick={() => handleQuantityChange(quantity - 0.5)}
                    style={{
                      width: '40px',
                      height: '40px',
                      backgroundColor: '#f3f4f6',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '1.25rem',
                      cursor: 'pointer'
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
                      width: '80px',
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      textAlign: 'center',
                      fontSize: '1rem'
                    }}
                  />
                  <button
                    onClick={() => handleQuantityChange(quantity + 0.5)}
                    style={{
                      width: '40px',
                      height: '40px',
                      backgroundColor: '#f3f4f6',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '1.25rem',
                      cursor: 'pointer'
                    }}
                  >
                    +
                  </button>
                  <div style={{
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    color: '#f97316'
                  }}>
                    Total: {formatPrice(getTotalPrice())}
                  </div>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                style={{
                  width: '100%',
                  padding: '1rem',
                  backgroundColor: '#f97316',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  marginBottom: '1rem'
                }}
              >
                Add to Cart
              </button>

              {!session && (
                <p style={{
                  color: '#6b7280',
                  fontSize: '0.875rem',
                  textAlign: 'center'
                }}>
                  <Link href="/login" style={{ color: '#f97316' }}>Sign in</Link> to place orders
                </p>
              )}
            </div>

            {/* Vendor & Details */}
            <div style={{
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '8px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
            }}>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: '1rem'
              }}>
                Product Details
              </h3>

              <div style={{
                display: 'grid',
                gap: '0.75rem'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between'
                }}>
                  <span style={{ color: '#6b7280' }}>Vendor:</span>
                  <span style={{ fontWeight: '500' }}>{product.vendorName}</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between'
                }}>
                  <span style={{ color: '#6b7280' }}>Location:</span>
                  <span style={{ fontWeight: '500' }}>{product.city}, {product.state}</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between'
                }}>
                  <span style={{ color: '#6b7280' }}>Category:</span>
                  <span style={{ fontWeight: '500' }}>{formatCategory(product.category)}</span>
                </div>
                {product.occasions.length > 0 && (
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}>
                    <span style={{ color: '#6b7280' }}>Perfect for:</span>
                    <span style={{ fontWeight: '500' }}>{formatOccasions(product.occasions)}</span>
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