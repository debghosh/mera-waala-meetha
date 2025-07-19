'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useCartStore } from '@/lib/stores/cartStore'
import CartIcon from '@/components/cart/CartIcon'

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
  city: string
  state: string
  occasions: string[]
}

const CATEGORIES = [
  { value: '', label: 'All Categories', emoji: '🍯' },
  { value: 'LADDU', label: 'Laddu', emoji: '🟡' },
  { value: 'BARFI', label: 'Barfi', emoji: '⬜' },
  { value: 'HALWA', label: 'Halwa', emoji: '🟠' },
  { value: 'RASGULLA', label: 'Rasgulla', emoji: '⚪' },
  { value: 'GULAB_JAMUN', label: 'Gulab Jamun', emoji: '🟤' },
  { value: 'SANDESH', label: 'Sandesh', emoji: '🤍' },
  { value: 'KHEER', label: 'Kheer', emoji: '🥛' },
  { value: 'JALEBI', label: 'Jalebi', emoji: '🟡' },
  { value: 'MISHTI', label: 'Mishti', emoji: '💛' },
  { value: 'SEASONAL', label: 'Seasonal', emoji: '🎃' }
]

export default function ProductsPage() {
  const { data: session } = useSession()
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    filterProducts()
  }, [products, searchTerm, selectedCategory, priceRange])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products')
      if (response.ok) {
        const data = await response.json()
        setProducts(data)
      }
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterProducts = () => {
    let filtered = products

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.vendorName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }

    filtered = filtered.filter(product =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    )

    setFilteredProducts(filtered)
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
          borderRadius: '20px',
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
            Loading sweet treasures...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
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
          <Link href="/dashboard" style={{ textDecoration: 'none' }}>
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
          
          {session && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <CartIcon />                                                {/* ADD THIS LINE */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: 'rgba(255, 107, 53, 0.1)',
                padding: '0.5rem 1rem',
                borderRadius: '50px',
                border: '1px solid rgba(255, 107, 53, 0.2)'
              }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  backgroundColor: '#10b981',
                  borderRadius: '50%'
                }}></div>
                <span style={{ 
                  color: '#374151', 
                  fontSize: '0.875rem',
                  fontWeight: '500'
                }}>
                  {session.user?.name}
                </span>
              </div>
              <Link href="/dashboard">Dashboard</Link>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <div style={{
        padding: '2rem 2rem 1rem',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
          fontWeight: '700',
          background: 'linear-gradient(135deg, #1a202c, #2d3748)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '0.5rem',
          lineHeight: '1.2'
        }}>
          Authentic Sweet Collection 🍬
        </h1>
        <p style={{
          fontSize: '0.95rem',
          color: '#4a5568',
          maxWidth: '500px',
          margin: '0 auto',
          fontWeight: '500'
        }}>
          Discover handcrafted South Asian sweets from master artisans
        </p>
      </div>

      {/* Main Content */}
      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem 4rem' }}>
        {/* Floating Filters */}
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          padding: '1.5rem',
          borderRadius: '16px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          marginBottom: '2rem',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem',
            alignItems: 'end'
          }}>
            {/* Search */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.8rem',
                fontWeight: '600',
                marginBottom: '0.5rem',
                color: '#1f2937'
              }}>
                🔍 Search Products
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name, description, or vendor..."
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    border: '2px solid transparent',
                    borderRadius: '12px',
                    fontSize: '0.8rem',
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
            </div>

            {/* Category Filter */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.8rem',
                fontWeight: '600',
                marginBottom: '0.5rem',
                color: '#1f2937'
              }}>
                🏷️ Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: '2px solid transparent',
                  borderRadius: '12px',
                  fontSize: '0.8rem',
                  backgroundColor: '#f8fafc',
                  cursor: 'pointer',
                  outline: 'none'
                }}
              >
                {CATEGORIES.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.emoji} {category.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.8rem',
                fontWeight: '600',
                marginBottom: '0.5rem',
                color: '#1f2937'
              }}>
                💰 Price Range (₹{priceRange[0]} - ₹{priceRange[1]})
              </label>
              <div style={{ 
                display: 'flex', 
                gap: '1rem',
                alignItems: 'center',
                backgroundColor: '#f8fafc',
                padding: '1rem',
                borderRadius: '16px'
              }}>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                  style={{ 
                    flex: 1,
                    height: '6px',
                    backgroundColor: '#e2e8f0',
                    borderRadius: '3px',
                    outline: 'none'
                  }}
                />
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  style={{ 
                    flex: 1,
                    height: '6px',
                    backgroundColor: '#e2e8f0',
                    borderRadius: '3px',
                    outline: 'none'
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div style={{ 
          marginBottom: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <p style={{ 
            color: '#64748b', 
            fontSize: '0.875rem',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            padding: '0.5rem 1rem',
            borderRadius: '50px',
            fontWeight: '500'
          }}>
            Showing {filteredProducts.length} of {products.length} delicious treats
          </p>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            padding: '4rem 2rem',
            borderRadius: '24px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>🔍</div>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#1f2937',
              marginBottom: '0.75rem'
            }}>
              No sweet treasures found
            </h3>
            <p style={{ color: '#64748b', fontSize: '1rem' }}>
              Try adjusting your search or filter criteria to discover more delights
            </p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '2rem'
          }}>
            {filteredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                style={{ textDecoration: 'none' }}
              >
                <div style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '24px',
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                  overflow: 'hidden',
                  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  cursor: 'pointer',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)'
                  e.currentTarget.style.boxShadow = '0 32px 64px rgba(0, 0, 0, 0.15)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)'
                  e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                }}
                >
                  {/* Product Image with Gradient Overlay */}
                  <div style={{
                    height: '240px',
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
                        fontSize: '4rem',
                        filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))'
                      }}>
                        🍯
                      </div>
                    )}
                    
                    {/* Category Badge */}
                    <div style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem',
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(10px)',
                      padding: '0.5rem 1rem',
                      borderRadius: '50px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      color: '#ff6b35',
                      border: '1px solid rgba(255, 107, 53, 0.2)'
                    }}>
                      {formatCategory(product.category)}
                    </div>
                  </div>

                  {/* Product Info */}
                  <div style={{ padding: '2rem' }}>
                    <h3 style={{
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      color: '#1f2937',
                      marginBottom: '0.5rem',
                      lineHeight: '1.3'
                    }}>
                      {product.name}
                    </h3>

                    <p style={{
                      color: '#64748b',
                      fontSize: '0.8rem',
                      marginBottom: '1rem',
                      lineHeight: '1.5',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {product.description}
                    </p>

                    {/* Price Section */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '1rem',
                      padding: '0.75rem',
                      backgroundColor: 'rgba(255, 107, 53, 0.05)',
                      borderRadius: '12px'
                    }}>
                      <div>
                        <div style={{
                          fontSize: '1.25rem',
                          fontWeight: '700',
                          background: 'linear-gradient(135deg, #ff6b35, #f7931e)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent'
                        }}>
                          {formatPrice(product.price)}
                        </div>
                        <div style={{
                          fontSize: '0.7rem',
                          color: '#64748b',
                          fontWeight: '500'
                        }}>
                          per kg
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{
                          fontSize: '0.7rem',
                          color: '#64748b',
                          fontWeight: '500'
                        }}>
                          Min. {product.minOrderKg}kg
                        </div>
                        {product.maxOrderKg && (
                          <div style={{
                            fontSize: '0.7rem',
                            color: '#64748b',
                            fontWeight: '500'
                          }}>
                            Max. {product.maxOrderKg}kg
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Vendor Info */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '0.75rem',
                      color: '#64748b'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        padding: '0.2rem 0.5rem',
                        borderRadius: '50px'
                      }}>
                        <span>📍</span>
                        <span style={{ fontWeight: '500' }}>
                          {product.city}, {product.state}
                        </span>
                      </div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        backgroundColor: 'rgba(139, 92, 246, 0.1)',
                        padding: '0.2rem 0.5rem',
                        borderRadius: '50px'
                      }}>
                        <span>👨‍🍳</span>
                        <span style={{ fontWeight: '500' }}>
                          {product.vendorName}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #ff6b35, #f7931e);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #e55a2b, #d1811a);
        }
      `}</style>
    </div>
  )
}