'use client';

import React, { useState } from 'react';
import { useCartStore } from '@/lib/stores/cartStore';
import ShoppingCart from './ShoppingCart';

const CartIcon = () => {
  const { totalItems, totalPrice } = useCartStore();
  const [showCart, setShowCart] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price);
  };

  const handleCartClick = () => {
    setShowCart(true);
  };

  const handleCloseCart = () => {
    setShowCart(false);
  };

  return (
    <>
      {/* Cart Icon Button */}
      <button
        onClick={handleCartClick}
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '0.75rem 1rem',
          backgroundColor: totalItems > 0 ? 'rgba(255, 107, 53, 0.1)' : 'rgba(255, 255, 255, 0.8)',
          border: `1px solid ${totalItems > 0 ? 'rgba(255, 107, 53, 0.2)' : 'rgba(255, 255, 255, 0.2)'}`,
          borderRadius: '50px',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          backdropFilter: 'blur(10px)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 107, 53, 0.15)'
          e.currentTarget.style.borderColor = 'rgba(255, 107, 53, 0.3)'
          e.currentTarget.style.transform = 'translateY(-1px)'
          e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 107, 53, 0.2)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = totalItems > 0 ? 'rgba(255, 107, 53, 0.1)' : 'rgba(255, 255, 255, 0.8)'
          e.currentTarget.style.borderColor = totalItems > 0 ? 'rgba(255, 107, 53, 0.2)' : 'rgba(255, 255, 255, 0.2)'
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = 'none'
        }}
        aria-label="Shopping Cart"
      >
        {/* Cart Icon */}
        <div style={{ 
          position: 'relative',
          fontSize: '1.25rem'
        }}>
          🛒
          
          {/* Cart Item Count Badge */}
          {totalItems > 0 && (
            <span style={{
              position: 'absolute',
              top: '-8px',
              right: '-8px',
              backgroundColor: '#ff6b35',
              color: 'white',
              fontSize: '0.625rem',
              fontWeight: '700',
              borderRadius: '50%',
              width: '18px',
              height: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid white',
              boxShadow: '0 2px 8px rgba(255, 107, 53, 0.4)'
            }}>
              {totalItems > 99 ? '99+' : totalItems}
            </span>
          )}
        </div>

        {/* Cart Total (Desktop) */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          fontSize: '0.75rem'
        }}>
          <span style={{
            color: '#64748b',
            fontWeight: '500',
            lineHeight: '1'
          }}>
            {totalItems > 0 ? 'Cart' : 'Your Cart'}
          </span>
          {totalItems > 0 && (
            <span style={{
              fontWeight: '700',
              background: 'linear-gradient(135deg, #ff6b35, #f7931e)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: '1'
            }}>
              {formatPrice(totalPrice)}
            </span>
          )}
          {totalItems === 0 && (
            <span style={{
              color: '#94a3b8',
              fontWeight: '500',
              lineHeight: '1'
            }}>
              Empty
            </span>
          )}
        </div>
      </button>

      {/* Shopping Cart Sidebar */}
      <ShoppingCart 
        isOpen={showCart} 
        onClose={handleCloseCart} 
      />
    </>
  );
};

export default CartIcon;