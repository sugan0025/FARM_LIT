# FARM_LIT — Fresh. Natural. Everyday.

Production-grade B2C grocery e-commerce platform built for speed, security, technical SEO, and cross-device cart persistence.

---

## 1. Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS with custom natural harvest design tokens (`farm-50`–`farm-950`, `harvest-50`–`harvest-700`, `earth-50`–`earth-900`)
- **Database & ORM**: PostgreSQL via Supabase (`rmhgilgjypkkrcpsrdwg`) & Prisma ORM v5
- **Authentication**: Secure HTTP-only cookies, password hashing with `bcryptjs` (salt rounds: 10), and encrypted JWT sessions via `jose`
- **Validation**: Zod schema validation across all API routes, server actions, and frontend forms
- **Icons**: Lucide React
- **Image Optimization**: Next/Image with responsive `sizes`, WebP/AVIF formats, and LCP priority loading
- **Testing**: Vitest for unit/integration/security suites; Playwright for cross-device end-to-end testing

---

## 2. Architecture & Folder Structure

```
FARM_LIT/
├── prisma/
│   ├── schema.prisma              # Database schema (User, Product, Category, Cart, CartItem, Order, etc.)
│   └── seed.js                    # Seeding script for categories, products, coupons & admin accounts
├── public/                        # Static assets, logos, and robots.txt
├── src/
│   ├── app/
│   │   ├── (auth)/                # Login & Registration flows
│   │   ├── (legal)/               # Privacy, Terms, Refund & Shipping policies
│   │   ├── (shop)/
│   │   │   ├── shop/              # Product listing with faceted search & sorting
│   │   │   ├── shop/[slug]/       # Product detail with JSON-LD & image gallery
│   │   │   ├── categories/[slug]/ # Category listing & breadcrumbs
│   │   │   ├── search/            # Keyword search results
│   │   │   ├── offers/            # Special discounts & coupon codes
│   │   │   ├── cart/              # Full shopping cart page
│   │   │   └── checkout/          # 2-column checkout & order confirmation
│   │   ├── about/                 # Brand origin & ethical farming mission
│   │   ├── community/             # Recipes, farming guides, seasonal produce calendar
│   │   ├── contact/               # Validated contact form & logistics addresses
│   │   ├── account/               # Customer dashboard, orders, profile
│   │   ├── admin/                 # Role-protected operations dashboard (stock, orders, UTMs)
│   │   ├── api/
│   │   │   ├── auth/              # login, register, me, logout
│   │   │   ├── cart/              # cart persistence & cross-device merge
│   │   │   ├── checkout/          # server-side price recheck & stock decrement
│   │   │   ├── coupons/validate/  # coupon validation & min order verification
│   │   │   ├── newsletter/        # newsletter subscription with rate limiting
│   │   │   └── contact/           # contact form submission with rate limiting
│   │   ├── layout.tsx             # Root layout with schemas, UTM listener, Header & Footer
│   │   ├── page.tsx               # Homepage with 10 structured sections
│   │   ├── sitemap.ts             # Dynamic XML sitemap generator
│   │   ├── robots.ts              # Dynamic robots.txt
│   │   ├── not-found.tsx          # 404 page
│   │   ├── error.tsx              # Error boundary without leaking stack traces
│   │   └── globals.css            # Base Tailwind and design tokens
│   ├── components/
│   │   ├── cart/CartDrawer.tsx    # Slide-over cart drawer with live subtotal and free shipping banner
│   │   ├── home/                  # Hero, Categories, ValueProps, Offers, Community, DemoReviews
│   │   ├── layout/Header.tsx      # Sticky navbar with search, account dropdown, and cart badge
│   │   ├── layout/Footer.tsx      # Footer navigation, policies, newsletter & contact details
│   │   ├── seo/JsonLd.tsx         # Google-compliant JSON-LD structured data injector
│   │   ├── shop/ProductCard.tsx   # Responsive card with discount badges, unit, rating, and Add-to-Cart
│   │   ├── shop/QuickViewModal.tsx# Interactive product modal preview
│   │   └── ui/UTMListener.tsx     # Client-side first & last-touch campaign capture
│   ├── context/
│   │   ├── AuthContext.tsx        # User authentication & session state
│   │   └── CartContext.tsx        # Centralized cart with guest storage & server sync
│   ├── lib/
│   │   ├── analytics.ts           # Privacy-first event tracking (zero PII)
│   │   ├── auth.ts                # Password hashing and session JWT logic
│   │   ├── cart-calculations.ts   # Pure calculation engine for discounts and delivery thresholds
│   │   ├── db.ts                  # Prisma database client with resilient catalog fallback
│   │   ├── products-data.ts       # Authentic farm-fresh catalog seed data
│   │   ├── rate-limit.ts          # Sliding window rate limiter for endpoints
│   │   ├── supabase.ts            # Supabase client (Project ID: rmhgilgjypkkrcpsrdwg)
│   │   ├── utm.ts                 # First-touch & last-touch UTM attribution engine
│   │   └── validations/           # Zod schemas for auth, checkout, cart, contact
│   └── tests/                     # Unit, integration, and security test suites
├── e2e/                           # Playwright end-to-end tests
├── tailwind.config.ts
├── next.config.mjs
└── package.json
```

---

## 3. Cart Persistence & Cross-Device Synchronization

1. **Guest Mode**:
   - Items stored in `localStorage` under `farmlit_guest_cart_v1`.
   - Prices are always treated as untrusted metadata on the client.
2. **Authenticated Mode**:
   - Carts are persisted to the database in `Cart` and `CartItem` models.
   - Access from multiple devices restores identical items and server-validated prices.
3. **Merge Conflict Strategy**:
   - When a guest logs in with active items in their browser, a client event triggers `/api/cart/sync`.
   - The server inspects existing items in the user's database cart and merges quantities (`Math.min(stockQuantity, existingQty + guestQty)`).
   - Once merged, the guest local storage key is purged.

---

## 4. UTM Tracking & Analytics Attribution

- **Parameters Tracked**: `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`.
- **First-Touch Attribution**: Captured on visitor's initial visit, stored in persistent non-overwriting storage/cookies.
- **Last-Touch Attribution**: Captured and updated on subsequent campaign visits.
- **Order Association**: When an order is placed, both first-touch and last-touch parameters are saved with the order record in `CampaignAttribution`.
- **Privacy Assurance**: Telemetry excludes passwords, payment details, and full customer PII.

---

## 5. Cybersecurity & Defensive Controls

1. **XSS Protection**: Default React auto-escaping. No raw `dangerouslySetInnerHTML` on user input. UTM query strings are sanitized.
2. **SQL Injection Defense**: Parameterized Prisma ORM queries and strict Zod validation prevent SQL injection.
3. **Price & Cart Manipulation**: Client price payloads are strictly ignored. The server looks up ground-truth prices in the database and recalculates subtotals, discounts, and delivery fees.
4. **Rate Limiting**: Sliding-window rate limiter prevents credential stuffing and request flooding on `/api/auth/login`, `/api/auth/register`, `/api/newsletter`, `/api/contact`, and `/api/checkout`.
5. **HTTP Security Headers**: Configured in `next.config.mjs` including `HSTS`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, and `Permissions-Policy`.

---

## 6. Environment Variables

Create a `.env` file in the project root:

```ini
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Supabase Project
NEXT_PUBLIC_SUPABASE_URL=https://rmhgilgjypkkrcpsrdwg.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.demo_anon_key_for_dev_mode
SUPABASE_SERVICE_ROLE_KEY=demo_service_role_key

# PostgreSQL Connection via Supabase
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.rmhgilgjypkkrcpsrdwg.supabase.co:5432/postgres"
DIRECT_URL="postgresql://postgres:[YOUR-PASSWORD]@db.rmhgilgjypkkrcpsrdwg.supabase.co:5432/postgres"

# Authentication Secrets
JWT_SECRET=super_secret_farm_lit_jwt_security_token_2026_xyz987
SESSION_SECRET=session_encryption_farm_lit_long_random_string_auth

# Rate Limiting
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=100
```

---

## 7. Running the Project

```bash
# 1. Install dependencies
npm install

# 2. Generate Prisma client
npx prisma generate

# 3. Seed initial categories and products
npm run db:seed

# 4. Run development server
npm run dev

# 5. Run test suites
npm run test

# 6. Production build
npm run build
```
