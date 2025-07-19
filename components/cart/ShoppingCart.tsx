'use client';

import React from 'react';
import { useCartStore } from '@/lib/stores/cartStore';

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({ isOpen, onClose }) => {
  const {
    items,
    totalItems,
    totalPrice,
    updateQuantity,
    removeItem,
    clearCart
  } = useCartStore();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price);
  };

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    const item = items.find(item => item.productId === productId);
    if (item) {
      const minQty = item.minOrderKg;
      const maxQty = item.maxOrderKg || 999;
      const quantity = Math.max(minQty, Math.min(maxQty, newQuantity));
      updateQuantity(productId, quantity);
    }
  };

  const proceedToCheckout = () => {
    // Navigate to checkout page
    window.location.href = '/checkout';
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(4px)',
          zIndex: 1000
        }}
        onClick={onClose}
      />
      
      {/* Cart Sidebar */}
      <div style={{
        position: 'fixed',
        right: 0,
        top: 0,
        height: '100vh',
        width: '100%',
        maxWidth: '450px',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderLeft: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        zIndex: 1001,
        display: 'flex',
        flexDirection: 'column'
      }}>
        
        {/* Header */}
        <div style={{
          padding: '2rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
          background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.1), rgba(247, 147, 30, 0.05))'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1rem'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              <div style={{
                fontSize: '1.5rem'
              }}>🛒</div>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#1f2937',
                margin: 0
              }}>
                Sweet Cart
              </h2>
            </div>
            <button
              onClick={onClose}
              style={{
                width: '40px',
                height: '40px',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                border: '1px solid rgba(255, 107, 53, 0.2)',
                borderRadius: '12px',
                cursor: 'pointer',
                fontSize: '1.25rem',
                color: '#64748b',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 107, 53, 0.1)'
                e.currentTarget.style.color = '#ff6b35'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.8)'
                e.currentTarget.style.color = '#64748b'
              }}
            >
              ✕
            </button>
          </div>
          
          {totalItems > 0 && (
            <div style={{
              backgroundColor: 'rgba(255, 107, 53, 0.1)',
              padding: '0.75rem 1rem',
              borderRadius: '50px',
              border: '1px solid rgba(255, 107, 53, 0.2)',
              textAlign: 'center',
              color: '#ff6b35',
              fontWeight: '600',
              fontSize: '0.875rem'
            }}>
              {totalItems} delicious item{totalItems !== 1 ? 's' : ''} in cart
            </div>
          )}
        </div>

        {/* Cart Items */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: items.length === 0 ? '0' : '1rem'
        }}>
          {items.length === 0 ? (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              textAlign: 'center',
              padding: '2rem'
            }}>
              <div style={{
                fontSize: '4rem',
                marginBottom: '1rem',
                opacity: 0.5
              }}>
                🛒
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '0.5rem'
              }}>
                Your cart is empty
              </h3>
              <p style={{
                color: '#64748b',
                marginBottom: '2rem',
                lineHeight: '1.5'
              }}>
                Add some delicious sweets to get started on your sweet journey!
              </p>
              <button
                onClick={onClose}
                style={{
                  padding: '1rem 2rem',
                  background: 'linear-gradient(135deg, #ff6b35, #f7931e)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  boxShadow: '0 10px 25px rgba(255, 107, 53, 0.4)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(255, 107, 53, 0.5)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(255, 107, 53, 0.4)'
                }}
              >
                Continue Shopping 🍯
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {items.map((item) => (
                <div key={item.id} style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '20px',
                  padding: '1.5rem',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                }}>
                  <div style={{
                    display: 'flex',
                    gap: '1rem',
                    marginBottom: '1rem'
                  }}>
                    
                    {/* Product Image */}
                    <div style={{
                      width: '60px',
                      height: '60px',
                      backgroundColor: 'rgba(255, 107, 53, 0.1)',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      border: '1px solid rgba(255, 107, 53, 0.2)'
                    }}>
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: '8px'
                          }}
                        />
                      ) : (
                        <div style={{ fontSize: '1.5rem' }}>🍯</div>
                      )}
                    </div>

                    {/* Product Details */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h4 style={{
                        fontSize: '1rem',
                        fontWeight: '600',
                        color: '#1f2937',
                        marginBottom: '0.25rem',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>
                        {item.name}
                      </h4>
                      <p style={{
                        fontSize: '0.75rem',
                        color: '#64748b',
                        marginBottom: '0.25rem'
                      }}>
                        by {item.vendorName}
                      </p>
                      <p style={{
                        fontSize: '0.75rem',
                        color: '#64748b',
                        marginBottom: '0.5rem'
                      }}>
                        📍 {item.city}, {item.state}
                      </p>
                      <div style={{
                        fontSize: '0.875rem',
                        fontWeight: '700',
                        color: '#ff6b35'
                      }}>
                        {formatPrice(item.price)}/kg
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item.productId)}
                      style={{
                        width: '32px',
                        height: '32px',
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid rgba(239, 68, 68, 0.2)',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '0.75rem',
                        color: '#ef4444',
                        transition: 'all 0.3s ease',
                        flexShrink: 0
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.2)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)'
                      }}
                      title="Remove item"
                    >
                      🗑️
                    </button>
                  </div>

                  {/* Quantity Controls */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: '#f8fafc',
                    padding: '1rem',
                    borderRadius: '12px'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem'
                    }}>
                      <button
                        onClick={() => handleQuantityChange(item.productId, item.quantity - 0.5)}
                        disabled={item.quantity <= item.minOrderKg}
                        style={{
                          width: '32px',
                          height: '32px',
                          backgroundColor: 'white',
                          border: '1px solid #e2e8f0',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontSize: '1rem',
                          fontWeight: 'bold',
                          color: '#64748b',
                          opacity: item.quantity <= item.minOrderKg ? 0.5 : 1,
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          if (!e.currentTarget.disabled) {
                            e.currentTarget.style.borderColor = '#ff6b35'
                            e.currentTarget.style.color = '#ff6b35'
                          }
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = '#e2e8f0'
                          e.currentTarget.style.color = '#64748b'
                        }}
                      >
                        -
                      </button>
                      
                      <div style={{
                        backgroundColor: 'white',
                        padding: '0.5rem 0.75rem',
                        borderRadius: '8px',
                        border: '1px solid #e2e8f0',
                        textAlign: 'center',
                        minWidth: '60px'
                      }}>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => {
                            const value = parseFloat(e.target.value) || item.minOrderKg;
                            handleQuantityChange(item.productId, value);
                          }}
                          min={item.minOrderKg}
                          max={item.maxOrderKg || 999}
                          step="0.5"
                          style={{
                            width: '100%',
                            textAlign: 'center',
                            border: 0,
                            outline: 'none',
                            fontSize: '0.875rem',
                            fontWeight: '600',
                            backgroundColor: 'transparent'
                          }}
                        />
                        <div style={{
                          fontSize: '0.625rem',
                          color: '#64748b',
                          fontWeight: '500'
                        }}>
                          kg
                        </div>
                      </div>
                      
                      <button
                        onClick={() => handleQuantityChange(item.productId, item.quantity + 0.5)}
                        disabled={item.maxOrderKg ? item.quantity >= item.maxOrderKg : false}
                        style={{
                          width: '32px',
                          height: '32px',
                          backgroundColor: 'white',
                          border: '1px solid #e2e8f0',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontSize: '1rem',
                          fontWeight: 'bold',
                          color: '#64748b',
                          opacity: (item.maxOrderKg && item.quantity >= item.maxOrderKg) ? 0.5 : 1,
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          if (!e.currentTarget.disabled) {
                            e.currentTarget.style.borderColor = '#ff6b35'
                            e.currentTarget.style.color = '#ff6b35'
                          }
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = '#e2e8f0'
                          e.currentTarget.style.color = '#64748b'
                        }}
                      >
                        +
                      </button>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{
                        fontSize: '1rem',
                        fontWeight: '700',
                        color: '#1f2937'
                      }}>
                        {formatPrice(item.price * item.quantity)}
                      </div>
                      <div style={{
                        fontSize: '0.625rem',
                        color: '#64748b'
                      }}>
                        Min: {item.minOrderKg}kg
                        {item.maxOrderKg && ` • Max: ${item.maxOrderKg}kg`}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Clear Cart Button */}
              {items.length > 0 && (
                <button
                  onClick={clearCart}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    color: '#ef4444',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.2)',
                    borderRadius: '12px',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.2)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)'
                  }}
                >
                  🗑️ Clear All Items
                </button>
              )}
            </div>
          )}
        </div>

        {/* Footer / Checkout */}
        {items.length > 0 && (
          <div style={{
            padding: '2rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.2)',
            background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.05), rgba(247, 147, 30, 0.02))'
          }}>
            
            {/* Order Summary */}
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              padding: '1.5rem',
              borderRadius: '16px',
              marginBottom: '1.5rem',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.5rem'
              }}>
                <span style={{
                  fontSize: '0.875rem',
                  color: '#64748b',
                  fontWeight: '500'
                }}>
                  Subtotal ({totalItems} items)
                </span>
                <span style={{
                  fontSize: '0.875rem',
                  color: '#1f2937',
                  fontWeight: '600'
                }}>
                  {formatPrice(totalPrice)}
                </span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '0.75rem',
                color: '#64748b'
              }}>
                <span>Delivery charges</span>
                <span>Calculated at checkout</span>
              </div>
              <div style={{
                borderTop: '1px solid rgba(255, 255, 255, 0.5)',
                paddingTop: '0.75rem',
                marginTop: '0.75rem'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{
                    fontSize: '1.125rem',
                    fontWeight: '700',
                    color: '#1f2937'
                  }}>
                    Total
                  </span>
                  <span style={{
                    fontSize: '1.25rem',
                    fontWeight: '800',
                    background: 'linear-gradient(135deg, #ff6b35, #f7931e)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>
                    {formatPrice(totalPrice)}
                  </span>
                </div>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={proceedToCheckout}
              style={{
                width: '100%',
                padding: '1.25rem',
                background: 'linear-gradient(135deg, #ff6b35, #f7931e)',
                color: 'white',
                border: 'none',
                borderRadius: '16px',
                fontSize: '1.125rem',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: '0 10px 25px rgba(255, 107, 53, 0.4)',
                transition: 'all 0.3s ease',
                marginBottom: '0.75rem'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(255, 107, 53, 0.5)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(255, 107, 53, 0.4)'
              }}
            >
              Proceed to Checkout 🛒
            </button>

            {/* Continue Shopping */}
            <button
              onClick={onClose}
              style={{
                width: '100%',
                padding: '0.875rem',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                color: '#64748b',
                border: '1px solid rgba(255, 255, 255, 0.5)',
                borderRadius: '12px',
                fontSize: '0.875rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 107, 53, 0.1)'
                e.currentTarget.style.color = '#ff6b35'
                e.currentTarget.style.borderColor = 'rgba(255, 107, 53, 0.2)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.8)'
                e.currentTarget.style.color = '#64748b'
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)'
              }}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ShoppingCart;