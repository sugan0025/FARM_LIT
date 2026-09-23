-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PAID', 'FAILED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "DiscountType" AS ENUM ('PERCENTAGE', 'FIXED');

-- CreateEnum
CREATE TYPE "TouchType" AS ENUM ('FIRST_TOUCH', 'LAST_TOUCH');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "phone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "shortDescription" TEXT,
    "categoryId" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "compareAtPrice" DOUBLE PRECISION,
    "discountPercentage" INTEGER NOT NULL DEFAULT 0,
    "SKU" TEXT NOT NULL,
    "stockQuantity" INTEGER NOT NULL DEFAULT 0,
    "unit" TEXT NOT NULL DEFAULT 'kg',
    "images" TEXT NOT NULL,
    "altText" TEXT,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 5.0,
    "reviewCount" INTEGER NOT NULL DEFAULT 0,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "origin" TEXT DEFAULT 'Local Farms',
    "shelfLife" TEXT DEFAULT '3-5 Days',
    "storageNotes" TEXT DEFAULT 'Keep refrigerated below 4┬░C',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cart" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "sessionToken" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CartItem" (
    "id" TEXT NOT NULL,
    "cartId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CartItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "country" TEXT NOT NULL DEFAULT 'India',
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "orderNumber" TEXT NOT NULL,
    "userId" TEXT,
    "customerName" TEXT NOT NULL,
    "customerEmail" TEXT NOT NULL,
    "customerPhone" TEXT NOT NULL,
    "shippingAddressId" TEXT,
    "deliveryStreet" TEXT NOT NULL,
    "deliveryCity" TEXT NOT NULL,
    "deliveryState" TEXT NOT NULL,
    "deliveryPostalCode" TEXT NOT NULL,
    "deliveryCountry" TEXT NOT NULL DEFAULT 'India',
    "subtotal" DOUBLE PRECISION NOT NULL,
    "discount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "deliveryCharge" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "total" DOUBLE PRECISION NOT NULL,
    "status" "OrderStatus" NOT NULL DEFAULT 'PENDING',
    "paymentMethod" TEXT NOT NULL DEFAULT 'COD',
    "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "productName" TEXT NOT NULL,
    "productPrice" DOUBLE PRECISION NOT NULL,
    "unit" TEXT NOT NULL DEFAULT 'kg',
    "quantity" INTEGER NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "userId" TEXT,
    "userName" TEXT NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 5,
    "comment" TEXT NOT NULL,
    "isDemo" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Coupon" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "discountType" "DiscountType" NOT NULL DEFAULT 'PERCENTAGE',
    "discountValue" DOUBLE PRECISION NOT NULL,
    "minOrderValue" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "maxDiscount" DOUBLE PRECISION,
    "expiresAt" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Coupon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NewsletterSubscriber" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "subscribedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "NewsletterSubscriber_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CampaignAttribution" (
    "id" TEXT NOT NULL,
    "orderId" TEXT,
    "sessionToken" TEXT,
    "utmSource" TEXT,
    "utmMedium" TEXT,
    "utmCampaign" TEXT,
    "utmTerm" TEXT,
    "utmContent" TEXT,
    "touchType" "TouchType" NOT NULL DEFAULT 'FIRST_TOUCH',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CampaignAttribution_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");

-- CreateIndex
CREATE INDEX "Category_slug_idx" ON "Category"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Product_SKU_key" ON "Product"("SKU");

-- CreateIndex
CREATE INDEX "Product_categoryId_idx" ON "Product"("categoryId");

-- CreateIndex
CREATE INDEX "Product_slug_idx" ON "Product"("slug");

-- CreateIndex
CREATE INDEX "Product_isFeatured_idx" ON "Product"("isFeatured");

-- CreateIndex
CREATE INDEX "Product_isActive_idx" ON "Product"("isActive");

-- CreateIndex
CREATE UNIQUE INDEX "Cart_userId_key" ON "Cart"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Cart_sessionToken_key" ON "Cart"("sessionToken");

-- CreateIndex
CREATE INDEX "Cart_userId_idx" ON "Cart"("userId");

-- CreateIndex
CREATE INDEX "Cart_sessionToken_idx" ON "Cart"("sessionToken");

-- CreateIndex
CREATE INDEX "CartItem_cartId_idx" ON "CartItem"("cartId");

-- CreateIndex
CREATE INDEX "CartItem_productId_idx" ON "CartItem"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "CartItem_cartId_productId_key" ON "CartItem"("cartId", "productId");

-- CreateIndex
CREATE INDEX "Address_userId_idx" ON "Address"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Order_orderNumber_key" ON "Order"("orderNumber");

-- CreateIndex
CREATE INDEX "Order_userId_idx" ON "Order"("userId");

-- CreateIndex
CREATE INDEX "Order_orderNumber_idx" ON "Order"("orderNumber");

-- CreateIndex
CREATE INDEX "Order_status_idx" ON "Order"("status");

-- CreateIndex
CREATE INDEX "Order_createdAt_idx" ON "Order"("createdAt");

-- CreateIndex
CREATE INDEX "OrderItem_orderId_idx" ON "OrderItem"("orderId");

-- CreateIndex
CREATE INDEX "OrderItem_productId_idx" ON "OrderItem"("productId");

-- CreateIndex
CREATE INDEX "Review_productId_idx" ON "Review"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "Coupon_code_key" ON "Coupon"("code");

-- CreateIndex
CREATE INDEX "Coupon_code_idx" ON "Coupon"("code");

-- CreateIndex
CREATE INDEX "Coupon_isActive_idx" ON "Coupon"("isActive");

-- CreateIndex
CREATE UNIQUE INDEX "NewsletterSubscriber_email_key" ON "NewsletterSubscriber"("email");

-- CreateIndex
CREATE INDEX "NewsletterSubscriber_email_idx" ON "NewsletterSubscriber"("email");

-- CreateIndex
CREATE INDEX "CampaignAttribution_orderId_idx" ON "CampaignAttribution"("orderId");

-- CreateIndex
CREATE INDEX "CampaignAttribution_sessionToken_idx" ON "CampaignAttribution"("sessionToken");

-- CreateIndex
CREATE INDEX "CampaignAttribution_utmCampaign_idx" ON "CampaignAttribution"("utmCampaign");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_shippingAddressId_fkey" FOREIGN KEY ("shippingAddressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CampaignAttribution" ADD CONSTRAINT "CampaignAttribution_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;



-- ==========================================
-- INITIAL SEED DATA FOR SUPABASE (FARM_LIT)
-- ==========================================

-- 1. Demo User Accounts (Password: FarmLit2026!)
INSERT INTO "User" ("id", "name", "email", "passwordHash", "role", "updatedAt") VALUES
('usr-demo', 'Ramesh Farmer', 'demo@farmlit.com', '$2a$10$I0xCx2PAas/uzDOcA/NdiONEHWY/iu28IOXjlGqYE3Ubr/Y1xw8HK', 'USER', NOW()),
('usr-admin', 'FarmLit Administrator', 'admin@farmlit.com', '$2a$10$I0xCx2PAas/uzDOcA/NdiONEHWY/iu28IOXjlGqYE3Ubr/Y1xw8HK', 'ADMIN', NOW())
ON CONFLICT ("id") DO NOTHING;

-- 2. Categories
INSERT INTO "Category" ("id", "name", "slug", "description", "image", "order", "updatedAt") VALUES
('cat-veg', 'Vegetables', 'vegetables', 'Farm-harvested fresh greens, root vegetables, and daily staples picked at peak crispness.', '/images/categories/vegetables.webp', 1, NOW()),
('cat-fruits', 'Fruits', 'fruits', 'Naturally ripened, sun-kissed fruits bursting with vitamins, sweetness, and hydration.', '/images/categories/fruits.webp', 2, NOW()),
('cat-grains', 'Grains & Staples', 'grains-staples', 'Unpolished pulses, stone-ground flours, and heirloom rice varieties from trusted growers.', '/images/categories/grains.webp', 3, NOW()),
('cat-essentials', 'Grocery Essentials', 'grocery-essentials', 'Pure cold-pressed oils, artisanal raw honey, dairy essentials, and natural kitchen seasonings.', '/images/categories/essentials.webp', 4, NOW())
ON CONFLICT ("id") DO NOTHING;

-- 3. Products with Local WebP Images
INSERT INTO "Product" ("id", "name", "slug", "description", "shortDescription", "categoryId", "price", "compareAtPrice", "discountPercentage", "SKU", "stockQuantity", "unit", "images", "altText", "rating", "reviewCount", "isFeatured", "isActive", "updatedAt") VALUES
('prod-spinach', 'Crisp Baby Spinach (Palak)', 'crisp-baby-spinach', 'Hydroponically washed and freshly harvested baby spinach with tender stems. Rich in iron, dietary fibre, and antioxidants. Ideal for wholesome smoothies, soups, and traditional curries.', 'Farm-fresh tender baby spinach leaves, hydro-cleaned and chemical-free.', 'cat-veg', 45, 55, 18, 'VEG-SPIN-01', 45, '250g', '["/images/products/spinach.webp"]', 'Fresh green organic baby spinach leaves in a natural basket', 4.8, 38, true, true, NOW()),
('prod-tomato', 'Vine-Ripened Hybrid Tomatoes', 'vine-ripened-hybrid-tomatoes', 'Plump, firm, and naturally vine-ripened red tomatoes. Perfectly balanced tartness and sweetness, packed with lycopene and vitamin C for your daily culinary curries and salads.', 'Naturally ripened, firm red tomatoes loaded with rich natural juice.', 'cat-veg', 42, 50, 16, 'VEG-TOM-02', 120, 'kg', '["/images/products/tomatoes.webp"]', 'Fresh red vine-ripened tomatoes', 4.7, 52, true, true, NOW()),
('prod-carrots', 'Crunchy Orange Carrots', 'crunchy-orange-carrots', 'Sweet, soil-cleaned organic carrots with maximum crunch and sweetness. An excellent natural source of beta-carotene and essential vitamins.', 'Sweet and crunchy farm-harvested carrots, rich in Vitamin A.', 'cat-veg', 55, 65, 15, 'VEG-CAR-03', 65, '500g', '["/images/products/carrots.webp"]', 'Fresh organic carrots on rustic wooden surface', 4.9, 41, false, true, NOW()),
('prod-potatoes', 'Mountain Russet Potatoes', 'mountain-russet-potatoes', 'Naturally cured, dirt-dusted farm potatoes. Great texture with high starch density, ideal for boiling, roasting, or curries without getting soggy.', 'Versatile kitchen staple potatoes grown in mineral-rich soil.', 'cat-veg', 38, 45, 15, 'VEG-POT-04', 150, 'kg', '["/images/products/potatoes.webp"]', 'Freshly harvested earthy potatoes', 4.6, 29, false, true, NOW()),
('prod-capsicum', 'Crisp Green Bell Pepper (Capsicum)', 'crisp-green-bell-pepper', 'Thick-walled, crisp green capsicum packed with zesty freshness. Excellent for stir-fries, fajitas, pizza toppings, and stuffed roast delicacies.', 'Thick-walled crunchy bell peppers full of aroma and vitamin C.', 'cat-veg', 48, 60, 20, 'VEG-CAP-05', 40, '500g', '["/images/products/capsicum.webp"]', 'Vibrant fresh green bell peppers', 4.8, 19, true, true, NOW()),
('prod-broccoli', 'Tender Florets Green Broccoli', 'tender-florets-green-broccoli', 'Dense, tightly beaded dark green broccoli florets. Grown without synthetic pesticides, providing rich antioxidants, sulforaphane, and dietary fibre.', 'Pesticide-free dense broccoli crowns harvested at sunrise.', 'cat-veg', 85, 110, 22, 'VEG-BROC-06', 30, 'piece', '["/images/products/broccoli.webp"]', 'Fresh green broccoli head with tight beads', 4.9, 44, true, true, NOW()),
('prod-apple', 'Himachal Royal Gala Crisp Apples', 'himachal-royal-gala-crisp-apples', 'Naturally sweet, crisp, and aromatic Royal Gala apples directly sourced from high-altitude Himachal orchards. Wax-free, juicy, and naturally polished.', 'High-altitude wax-free sweet and juicy apples from Himachal.', 'cat-fruits', 180, 220, 18, 'FRU-APP-01', 60, 'kg', '["/images/products/apples.webp"]', 'Crisp red Royal Gala apples in orchard sunlight', 4.9, 88, true, true, NOW()),
('prod-banana', 'Ripe Robusta Mountain Bananas', 'ripe-robusta-mountain-bananas', 'Ethylene-free naturally ripened Robusta bananas. High in potassium, energy, and prebiotic dietary fibres. Uniform golden peel and creamy sweet bite.', 'Naturally tree-ripened bananas with creamy sweet pulp.', 'cat-fruits', 55, 65, 15, 'FRU-BAN-02', 80, 'pack', '["/images/products/bananas.webp"]', 'Golden ripe bananas bunch', 4.8, 65, true, true, NOW()),
('prod-orange', 'Nagpur Sweet Juicy Oranges', 'nagpur-sweet-juicy-oranges', 'Renowned Nagpur mandarin oranges bursting with zesty citrus juice. Thin peeled and easy to segment, providing 100% of your daily Vitamin C in two fruits.', 'Hand-picked Nagpur citrus oranges loaded with refreshing juice.', 'cat-fruits', 95, 120, 20, 'FRU-ORA-03', 50, 'kg', '["/images/products/oranges.webp"]', 'Vibrant sweet Nagpur oranges with citrus leaves', 4.7, 33, false, true, NOW()),
('prod-pomegranate', 'Ruby Red Bhagwa Pomegranates', 'ruby-red-bhagwa-pomegranates', 'Grade-A Bhagwa cultivar pomegranates filled with deep red, soft-seeded arils. Unbeatable sweetness and packed with heart-healthy polyphenols.', 'Deep red, soft-seeded sweet pomegranate arils rich in antioxidants.', 'cat-fruits', 165, 195, 15, 'FRU-POM-04', 35, 'kg', '["/images/products/pomegranate.webp"]', 'Fresh sliced pomegranate showing ruby arils', 4.9, 47, true, true, NOW()),
('prod-basmati', 'Aged Royal Basmati Rice (Extra Long)', 'aged-royal-basmati-rice', 'Authentic 2-year naturally aged Himalayan basmati rice. Slender, pearlescent grains that elongate to more than double their length upon cooking without sticking.', 'Naturally aged extra-long aromatic basmati rice.', 'cat-grains', 145, 175, 17, 'GRN-BAS-01', 75, 'kg', '["/images/products/basmati-rice.webp"]', 'Slender grains of aromatic raw basmati rice in wooden bowl', 4.9, 92, true, true, NOW()),
('prod-atta', 'Chakki-Fresh Sharbati Whole Wheat Atta', 'sharbati-whole-wheat-atta', 'Slow cold-milled traditional stone chakki whole wheat flour. 100% whole grain with bran and germ intact, producing soft, puffed rotis that stay fluffy for hours.', '100% stone-ground Sharbati wheat flour with bran intact.', 'cat-grains', 68, 80, 15, 'GRN-ATT-02', 110, 'kg', '["/images/products/atta.webp"]', 'Stone ground whole wheat flour in ceramic bowl', 4.8, 64, false, true, NOW()),
('prod-toor-dal', 'Unpolished Organic Toor Dal (Arhar)', 'unpolished-organic-toor-dal', 'Premium unpolished toor dal processed without synthetic oils, water, or coloring agents. Retains natural yellow hue, aroma, and high plant-based protein content.', 'Natural oil-free unpolished yellow toor dal with high protein.', 'cat-grains', 160, 185, 13, 'GRN-TOOR-03', 55, 'kg', '["/images/products/toor-dal.webp"]', 'Organic golden toor dal pulses', 4.8, 39, true, true, NOW()),
('prod-mustard-oil', 'Wood-Pressed Kacchi Ghani Mustard Oil', 'wood-pressed-mustard-oil', 'Extracted using traditional wooden expellers (kolhu) below 38°C to retain natural pungency, essential fatty acids, and high smoke point for authentic Indian cooking.', 'Raw, unrefined cold-pressed mustard oil with natural pungency.', 'cat-grains', 215, 250, 14, 'GRN-MUST-04', 40, 'litre', '["/images/products/mustard-oil.webp"]', 'Golden cold pressed edible oil in glass bottle', 4.9, 51, false, true, NOW()),
('prod-honey', '100% Pure Raw Wildflower Forest Honey', 'raw-wildflower-forest-honey', 'Unpasteurized and unprocessed raw honey harvested by tribal beekeepers from pristine forest flora. Naturally contains bee pollen, beneficial enzymes, and rich amber warmth.', 'Raw, unfiltered forest honey with active enzymes and natural pollen.', 'cat-essentials', 320, 390, 18, 'ESS-HON-01', 35, '500g', '["/images/products/honey.webp"]', 'Raw organic golden honey drizzling from wooden dipper', 5, 77, true, true, NOW()),
('prod-ghee', 'Bilona A2 Desi Cow Cultured Ghee', 'bilona-a2-desi-cow-cultured-ghee', 'Handcrafted using the ancient Ayurvedic Bilona method from curd of free-grazing indigenous Gir cows. Granular golden texture, nutty aroma, and rich in butyric acid.', 'Traditional bilona-churned golden ghee made from pure A2 curd.', 'cat-essentials', 680, 790, 14, 'ESS-GHEE-02', 28, '500g', '["/images/products/ghee.webp"]', 'Pure golden desi ghee in traditional glass jar', 5, 84, true, true, NOW()),
('prod-salt', 'Himalayan Mineral Pink Rock Salt (Fine)', 'himalayan-mineral-pink-rock-salt', 'Unrefined, chemical-free pink rock salt hand-mined from primordial beds. Contains 84 trace minerals including calcium, magnesium, and potassium for clean savory flavor.', 'Pure mineral-rich unrefined pink salt containing 84 trace elements.', 'cat-essentials', 65, 85, 23, 'ESS-SALT-03', 90, 'kg', '["/images/products/pink-salt.webp"]', 'Pure pink Himalayan rock salt crystals', 4.9, 36, false, true, NOW()),
('prod-eggs', 'Pasture-Raised Free-Range Brown Eggs', 'pasture-raised-free-range-brown-eggs', 'Fresh farm eggs laid by hens free to forage naturally on lush pastures and sunlight. Deep orange yolks rich in Omega-3 and natural Vitamin D. Antibiotic and hormone free.', 'Antibiotic-free pasture raised brown eggs with vibrant orange yolks.', 'cat-essentials', 115, 130, 11, 'ESS-EGG-04', 40, 'pack', '["/images/products/eggs.webp"]', 'Farm fresh brown eggs in eco-friendly carton', 4.9, 49, true, true, NOW())
ON CONFLICT ("id") DO NOTHING;

-- 4. Coupons
INSERT INTO "Coupon" ("id", "code", "description", "discountType", "discountValue", "minOrderValue", "maxDiscount", "isActive", "updatedAt") VALUES
('coup-farm10', 'FARMFRESH10', '10% discount on entire cart above ₹399 (Max ₹100)', 'PERCENTAGE', 10, 399, 100, true, NOW()),
('coup-freeship', 'FREESHIP', 'Free doorstep express delivery on any order above ₹299', 'FIXED', 40, 299, 40, true, NOW())
ON CONFLICT ("id") DO NOTHING;

