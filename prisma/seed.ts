import { PrismaClient, ProductCategory, UserRole } from '@prisma/client'
import bcryptjs from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting to seed database...')

  // Create vendor users
  const vendor1 = await prisma.user.upsert({
    where: { email: 'sharma.sweets@gmail.com' },
    update: {},
    create: {
      email: 'sharma.sweets@gmail.com',
      name: 'Sharma Sweet House',
      password: await bcryptjs.hash('vendor123', 12),
      role: UserRole.VENDOR
    }
  })

  const vendor2 = await prisma.user.upsert({
    where: { email: 'bengali.mishti@gmail.com' },
    update: {},
    create: {
      email: 'bengali.mishti@gmail.com',
      name: 'Kolkata Mishti Bhandar',
      password: await bcryptjs.hash('vendor123', 12),
      role: UserRole.VENDOR
    }
  })

  const vendor3 = await prisma.user.upsert({
    where: { email: 'punjab.sweets@gmail.com' },
    update: {},
    create: {
      email: 'punjab.sweets@gmail.com',
      name: 'Punjab Sweet Corner',
      password: await bcryptjs.hash('vendor123', 12),
      role: UserRole.VENDOR
    }
  })

  // Sample products
  const products = [
    // Laddu varieties
    {
      name: 'Besan Laddu',
      description: 'Traditional gram flour laddus made with pure ghee, cardamom, and dry fruits. Perfect for festivals and celebrations.',
      price: 450,
      category: ProductCategory.LADDU,
      minOrderKg: 1,
      maxOrderKg: 25,
      vendorId: vendor1.id,
      vendorName: vendor1.name,
      city: 'Delhi',
      state: 'Delhi',
      occasions: ['wedding', 'festival', 'religious'],
      imageUrl: 'https://images.unsplash.com/photo-1606471190009-85f571c4956e?w=400'
    },
    {
      name: 'Motichoor Laddu',
      description: 'Delicate pearl-sized gram flour balls bound with sugar syrup. A wedding favorite across North India.',
      price: 520,
      category: ProductCategory.LADDU,
      minOrderKg: 2,
      maxOrderKg: 30,
      vendorId: vendor1.id,
      vendorName: vendor1.name,
      city: 'Delhi',
      state: 'Delhi',
      occasions: ['wedding', 'engagement', 'festival'],
      imageUrl: 'https://images.unsplash.com/photo-1565805509314-e398ec8b33b6?w=400'
    },
    {
      name: 'Coconut Laddu',
      description: 'Fresh coconut laddus with condensed milk and cardamom. Light, fragrant, and irresistible.',
      price: 380,
      category: ProductCategory.LADDU,
      minOrderKg: 1,
      maxOrderKg: 20,
      vendorId: vendor3.id,
      vendorName: vendor3.name,
      city: 'Amritsar',
      state: 'Punjab',
      occasions: ['birthday', 'festival', 'celebration'],
      imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400'
    },

    // Barfi varieties
    {
      name: 'Kaju Barfi',
      description: 'Premium cashew barfi made with the finest cashews and silver leaf. The king of Indian sweets.',
      price: 850,
      category: ProductCategory.BARFI,
      minOrderKg: 1,
      maxOrderKg: 15,
      vendorId: vendor1.id,
      vendorName: vendor1.name,
      city: 'Delhi',
      state: 'Delhi',
      occasions: ['wedding', 'anniversary', 'corporate'],
      imageUrl: 'https://images.unsplash.com/photo-1633113089758-3a81e9eb2a5d?w=400'
    },
    {
      name: 'Kova Barfi',
      description: 'Rich milk barfi with the authentic taste of slow-cooked khoya. Melts in your mouth.',
      price: 420,
      category: ProductCategory.BARFI,
      minOrderKg: 1,
      maxOrderKg: 20,
      vendorId: vendor3.id,
      vendorName: vendor3.name,
      city: 'Amritsar',
      state: 'Punjab',
      occasions: ['festival', 'celebration', 'gift'],
      imageUrl: 'https://images.unsplash.com/photo-1626132647523-66e234def6d0?w=400'
    },

    // Bengali sweets
    {
      name: 'Rasgulla',
      description: 'Authentic Bengali rasgullas soaked in light sugar syrup. Soft, spongy, and traditionally made.',
      price: 320,
      category: ProductCategory.RASGULLA,
      minOrderKg: 1,
      maxOrderKg: 20,
      vendorId: vendor2.id,
      vendorName: vendor2.name,
      city: 'Kolkata',
      state: 'West Bengal',
      occasions: ['durga_puja', 'birthday', 'celebration'],
      imageUrl: 'https://images.unsplash.com/photo-1599947832554-c4d5c54a564a?w=400'
    },
    {
      name: 'Sandesh',
      description: 'Delicate cottage cheese sweet with cardamom. A Bengali classic that represents pure indulgence.',
      price: 480,
      category: ProductCategory.SANDESH,
      minOrderKg: 1,
      maxOrderKg: 15,
      vendorId: vendor2.id,
      vendorName: vendor2.name,
      city: 'Kolkata',
      state: 'West Bengal',
      occasions: ['durga_puja', 'kali_puja', 'celebration'],
      imageUrl: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=400'
    },

    // Gulab Jamun
    {
      name: 'Gulab Jamun',
      description: 'Classic deep-fried milk solid dumplings in rose-flavored sugar syrup. The most loved Indian sweet.',
      price: 380,
      category: ProductCategory.GULAB_JAMUN,
      minOrderKg: 1,
      maxOrderKg: 25,
      vendorId: vendor1.id,
      vendorName: vendor1.name,
      city: 'Delhi',
      state: 'Delhi',
      occasions: ['wedding', 'birthday', 'festival', 'celebration'],
      imageUrl: 'https://images.unsplash.com/photo-1558471048-b5ec2df2528c?w=400'
    },

    // Halwa varieties
    {
      name: 'Gajar Halwa',
      description: 'Rich carrot halwa slow-cooked with milk, ghee, and dry fruits. Perfect winter dessert.',
      price: 420,
      category: ProductCategory.HALWA,
      minOrderKg: 1,
      maxOrderKg: 20,
      vendorId: vendor3.id,
      vendorName: vendor3.name,
      city: 'Amritsar',
      state: 'Punjab',
      occasions: ['winter_festival', 'celebration', 'gift'],
      imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400'
    },
    {
      name: 'Sooji Halwa',
      description: 'Semolina halwa with ghee, sugar, and cardamom. Simple yet divine taste.',
      price: 280,
      category: ProductCategory.HALWA,
      minOrderKg: 1,
      maxOrderKg: 20,
      vendorId: vendor1.id,
      vendorName: vendor1.name,
      city: 'Delhi',
      state: 'Delhi',
      occasions: ['religious', 'prasad', 'celebration'],
      imageUrl: 'https://images.unsplash.com/photo-1565805509308-9dbabadc1b5d?w=400'
    },

    // Jalebi
    {
      name: 'Jalebi',
      description: 'Crispy spiral-shaped sweets soaked in saffron syrup. Fresh, hot, and irresistibly crunchy.',
      price: 350,
      category: ProductCategory.JALEBI,
      minOrderKg: 1,
      maxOrderKg: 15,
      vendorId: vendor3.id,
      vendorName: vendor3.name,
      city: 'Amritsar',
      state: 'Punjab',
      occasions: ['festival', 'celebration', 'morning_special'],
      imageUrl: 'https://images.unsplash.com/photo-1599290587853-b071a6fe4c14?w=400'
    },

    // Kheer
    {
      name: 'Rice Kheer',
      description: 'Creamy rice pudding with milk, cardamom, and garnished with almonds and pistachios.',
      price: 180,
      category: ProductCategory.KHEER,
      minOrderKg: 1,
      maxOrderKg: 25,
      vendorId: vendor2.id,
      vendorName: vendor2.name,
      city: 'Kolkata',
      state: 'West Bengal',
      occasions: ['religious', 'festival', 'celebration'],
      imageUrl: 'https://images.unsplash.com/photo-1583222332003-a2f01dfb79c0?w=400'
    }
  ]

  // Create products
  for (const product of products) {
    await prisma.product.upsert({
      where: { 
        id: `${product.vendorId}-${product.name.toLowerCase().replace(/\s+/g, '-')}` 
      },
      update: {},
      create: {
        id: `${product.vendorId}-${product.name.toLowerCase().replace(/\s+/g, '-')}`,
        ...product
      }
    })
  }

  console.log('✅ Database seeded successfully!')
  console.log(`Created ${products.length} products from 3 vendors`)
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })