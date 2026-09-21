const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

const categories = [
  {
    id: 'cat-veg',
    name: 'Vegetables',
    slug: 'vegetables',
    description: 'Farm-harvested fresh greens, root vegetables, and daily staples picked at peak crispness.',
    image: '/images/categories/vegetables.webp',
    order: 1,
  },
  {
    id: 'cat-fruits',
    name: 'Fruits',
    slug: 'fruits',
    description: 'Naturally ripened, sun-kissed fruits bursting with vitamins, sweetness, and hydration.',
    image: '/images/categories/fruits.webp',
    order: 2,
  },
  {
    id: 'cat-grains',
    name: 'Grains & Staples',
    slug: 'grains-staples',
    description: 'Unpolished pulses, stone-ground flours, and heirloom rice varieties from trusted growers.',
    image: '/images/categories/grains.webp',
    order: 3,
  },
  {
    id: 'cat-essentials',
    name: 'Grocery Essentials',
    slug: 'grocery-essentials',
    description: 'Pure cold-pressed oils, artisanal raw honey, dairy essentials, and natural kitchen seasonings.',
    image: '/images/categories/essentials.webp',
    order: 4,
  },
];

const products = [
  {
    id: 'prod-spinach',
    name: 'Crisp Baby Spinach (Palak)',
    slug: 'crisp-baby-spinach',
    description: 'Hydroponically washed and freshly harvested baby spinach with tender stems. Rich in iron, dietary fibre, and antioxidants. Ideal for wholesome smoothies, soups, and traditional curries.',
    shortDescription: 'Farm-fresh tender baby spinach leaves, hydro-cleaned and chemical-free.',
    categoryId: 'cat-veg',
    price: 45,
    compareAtPrice: 55,
    discountPercentage: 18,
    SKU: 'VEG-SPIN-01',
    stockQuantity: 45,
    unit: '250g',
    images: JSON.stringify([
      '/images/products/spinach.webp',
    ]),
    altText: 'Fresh green organic baby spinach leaves',
    rating: 4.8,
    reviewCount: 38,
    isFeatured: true,
    isActive: true,
    origin: 'Sahyadri Organic Cluster, Maharashtra',
    shelfLife: '3-4 Days in refrigerator',
    storageNotes: 'Keep in breathable ziplock bag inside crisper drawer',
  },
  {
    id: 'prod-tomato',
    name: 'Vine-Ripened Hybrid Tomatoes',
    slug: 'vine-ripened-hybrid-tomatoes',
    description: 'Plump, firm, and naturally vine-ripened red tomatoes. Perfectly balanced tartness and sweetness, packed with lycopene and vitamin C.',
    shortDescription: 'Naturally ripened, firm red tomatoes loaded with rich natural juice.',
    categoryId: 'cat-veg',
    price: 42,
    compareAtPrice: 50,
    discountPercentage: 16,
    SKU: 'VEG-TOM-02',
    stockQuantity: 120,
    unit: 'kg',
    images: JSON.stringify([
      '/images/products/tomatoes.webp',
    ]),
    altText: 'Fresh red vine-ripened tomatoes',
    rating: 4.7,
    reviewCount: 52,
    isFeatured: true,
    isActive: true,
    origin: 'Nashik Valley Farms',
    shelfLife: '5-7 Days',
    storageNotes: 'Store at cool room temperature',
  },
  {
    id: 'prod-apple',
    name: 'Himachal Royal Gala Crisp Apples',
    slug: 'himachal-royal-gala-crisp-apples',
    description: 'Naturally sweet, crisp, and aromatic Royal Gala apples directly sourced from high-altitude Himachal orchards. Wax-free, juicy, and naturally polished.',
    shortDescription: 'High-altitude wax-free sweet and juicy apples from Himachal.',
    categoryId: 'cat-fruits',
    price: 180,
    compareAtPrice: 220,
    discountPercentage: 18,
    SKU: 'FRU-APP-01',
    stockQuantity: 60,
    unit: 'kg',
    images: JSON.stringify([
      '/images/products/apples.webp',
    ]),
    altText: 'Crisp red Royal Gala apples in orchard sunlight',
    rating: 4.9,
    reviewCount: 88,
    isFeatured: true,
    isActive: true,
    origin: 'Kotgarh Valley, Himachal Pradesh',
    shelfLife: '10-14 Days',
    storageNotes: 'Refrigerate to preserve juiciness and crisp snap',
  },
  {
    id: 'prod-basmati',
    name: 'Aged Royal Basmati Rice (Extra Long)',
    slug: 'aged-royal-basmati-rice',
    description: 'Authentic 2-year naturally aged Himalayan basmati rice. Slender, pearlescent grains that elongate to more than double their length upon cooking without sticking.',
    shortDescription: 'Naturally aged extra-long aromatic basmati rice.',
    categoryId: 'cat-grains',
    price: 145,
    compareAtPrice: 175,
    discountPercentage: 17,
    SKU: 'GRN-BAS-01',
    stockQuantity: 75,
    unit: 'kg',
    images: JSON.stringify([
      '/images/products/basmati-rice.webp',
    ]),
    altText: 'Slender grains of aromatic raw basmati rice in wooden bowl',
    rating: 4.9,
    reviewCount: 92,
    isFeatured: true,
    isActive: true,
    origin: 'Foothills of Dehradun',
    shelfLife: '12 Months',
    storageNotes: 'Store in airtight container in dry pantry',
  },
  {
    id: 'prod-honey',
    name: '100% Pure Raw Wildflower Forest Honey',
    slug: 'raw-wildflower-forest-honey',
    description: 'Unpasteurized and unprocessed raw honey harvested by tribal beekeepers from pristine forest flora. Naturally contains bee pollen, beneficial enzymes, and rich amber warmth.',
    shortDescription: 'Raw, unfiltered forest honey with active enzymes and natural pollen.',
    categoryId: 'cat-essentials',
    price: 320,
    compareAtPrice: 390,
    discountPercentage: 18,
    SKU: 'ESS-HON-01',
    stockQuantity: 35,
    unit: '500g',
    images: JSON.stringify([
      '/images/products/honey.webp',
    ]),
    altText: 'Raw organic golden honey drizzling from wooden dipper',
    rating: 5.0,
    reviewCount: 77,
    isFeatured: true,
    isActive: true,
    origin: 'Nilgiri Biosphere Reserve',
    shelfLife: '24 Months',
    storageNotes: 'Store at room temperature',
  },
];

const coupons = [
  {
    code: 'FARMFRESH10',
    description: '10% off on your entire grocery order (Min order ₹399)',
    discountType: 'PERCENTAGE',
    discountValue: 10,
    minOrderValue: 399,
    maxDiscount: 100,
    isActive: true,
  },
  {
    code: 'FREESHIP',
    description: 'Flat ₹40 delivery discount on orders above ₹299',
    discountType: 'FIXED',
    discountValue: 40,
    minOrderValue: 299,
    maxDiscount: 40,
    isActive: true,
  },
];

async function main() {
  console.log('Seeding Farm_lit Database...');

  // Create demo admin and customer users
  const passwordHash = await bcrypt.hash('FarmLit2026!', 10);

  await prisma.user.upsert({
    where: { email: 'admin@farmlit.com' },
    update: {},
    create: {
      name: 'Farm_lit Admin',
      email: 'admin@farmlit.com',
      passwordHash,
      role: 'ADMIN',
      phone: '+91 8000456789',
    },
  });

  await prisma.user.upsert({
    where: { email: 'customer@farmlit.com' },
    update: {},
    create: {
      name: 'Priya Sundaram',
      email: 'customer@farmlit.com',
      passwordHash,
      role: 'USER',
      phone: '+91 9876543210',
    },
  });

  // Seed categories
  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    });
  }

  // Seed products
  for (const prod of products) {
    await prisma.product.upsert({
      where: { slug: prod.slug },
      update: prod,
      create: prod,
    });
  }

  // Seed coupons
  for (const coup of coupons) {
    await prisma.coupon.upsert({
      where: { code: coup.code },
      update: coup,
      create: coup,
    });
  }

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Seeding error:', e.message);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
