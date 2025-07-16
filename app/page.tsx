export default function HomePage() {
  return (
    <div style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '20px',
      textAlign: 'center' as const
    }}>
      <div style={{
        background: 'linear-gradient(135deg, #fef3e2 0%, #fed7a1 100%)',
        borderRadius: '12px',
        padding: '3rem 2rem',
        margin: '2rem 0',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '700',
          marginBottom: '1rem',
          color: '#111827'
        }}>
          Welcome to Mera Wala Meetha
        </h1>
        <p style={{
          fontSize: '1.25rem',
          marginBottom: '2rem',
          color: '#6b7280'
        }}>
          Authentic South Asian Sweets Marketplace
        </p>
        <div style={{
          fontSize: '1.125rem',
          color: '#374151'
        }}>
          <span style={{ fontSize: '2rem', margin: '0 0.5rem' }}>🍯</span>
          Coming Soon - Charlotte&apos;s Premier Sweet Marketplace
          <span style={{ fontSize: '2rem', margin: '0 0.5rem' }}>🧁</span>
        </div>
        <div style={{ marginTop: '2rem', fontSize: '0.9rem', color: '#9ca3af' }}>
          🚀 Your marketplace foundation is ready!
        </div>
      </div>
    </div>
  )
}