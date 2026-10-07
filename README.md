<!-- ═══════════════════════════════════════════════════════════════════════════════════ -->
<!-- ░░░  FARM_LIT — FRESH. NATURAL. EVERYDAY. B2C GROCERY E-COMMERCE  ░░░░░░░░░░░░░░░░░░ -->
<!-- ═══════════════════════════════════════════════════════════════════════════════════ -->

<!-- ╔═══════════════════════════════╗ -->
<!-- ║   ANIMATED GRADIENT HEADER    ║ -->
<!-- ╚═══════════════════════════════╝ -->
<div align="center">

<img src="https://cdn.jsdelivr.net/gh/sugan0025/FARM_LIT@main/assets/header-banner.svg" width="100%" alt="FARM_LIT Animated Header" />

<br><br>

<!-- Animated Typing SVG (Single-line, no text overflow) -->
<a href="https://readme-typing-svg.demolab.com">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=19&duration=3000&pause=1000&color=22c55e&center=true&vCenter=true&repeat=true&width=750&height=45&lines=Fresh.+Natural.+Everyday.+%E2%80%A2+Next.js+14+App+Router;Cross-Device+Cart+Persistence+%E2%80%A2+Supabase+%26+Prisma+ORM;First+%26+Last-Touch+UTM+Attribution+Engine+%E2%80%A2+Zero+PII;Sathyamangalam+Farm-Fresh+Delivery+%E2%80%A2+Sub-900ms+SSG" alt="Typing SVG" />
</a>

<br><br>

<!-- Badges Row 1: Deployment & Core Stack -->
<a href="https://nextjs.org/">
  <img src="https://img.shields.io/badge/Next.js_14-App_Router-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js 14" />
</a>
&nbsp;
<a href="https://www.typescriptlang.org/">
  <img src="https://img.shields.io/badge/TypeScript-Strict_Mode-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
</a>
&nbsp;
<a href="https://supabase.com/">
  <img src="https://img.shields.io/badge/Database-Supabase_PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase PostgreSQL" />
</a>
&nbsp;
<a href="https://www.prisma.io/">
  <img src="https://img.shields.io/badge/ORM-Prisma_v5-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma ORM" />
</a>

<br><br>

<!-- Badges Row 2: Optimization, Security & Marketing -->
<img src="https://img.shields.io/badge/Styling-Tailwind_Harvest_Tokens-16A34A?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
&nbsp;
<img src="https://img.shields.io/badge/Attribution-1st_%26_Last_Touch_UTM-EAB308?style=for-the-badge&logo=google-analytics&logoColor=black" alt="UTM Attribution" />
&nbsp;
<img src="https://img.shields.io/badge/Testing-Vitest_%2B_Playwright-22C55E?style=for-the-badge&logo=playwright&logoColor=white" alt="Testing" />
&nbsp;
<img src="https://img.shields.io/badge/Delivery-Sathyamangalam_Express-FF5722?style=for-the-badge" alt="Local Delivery" />

<br><br>

<p align="center">
  <b>A production-grade, direct-to-consumer grocery e-commerce storefront engineered for speed, cybersecurity, cross-device cart persistence, and first-party campaign attribution across Western Tamil Nadu.</b>
</p>

[🌿 Overview](#-executive-overview--problem-statement) • [🏛️ Architecture](#️-system-architecture) • [🛒 Cart Persistence](#-cart-persistence--cross-device-sync) • [📈 UTM Attribution](#-utm-attribution--marketing-intelligence) • [🛡️ Security](#️-cybersecurity--defensive-controls) • [🗂️ Directory Map](#️-project-architecture--directory-map) • [🚀 Local Setup](#-local-setup--development)

</div>

<!-- Animated Glowing Divider -->
<img src="https://cdn.jsdelivr.net/gh/sugan0025/FARM_LIT@main/assets/rainbow-divider.svg" width="100%">

<!-- ╔═══════════════════════════════╗ -->
<!-- ║       EXECUTIVE SUMMARY       ║ -->
<!-- ╚═══════════════════════════════╝ -->

<h2>📌 Executive Overview &amp; Problem Statement</h2>

**FARM_LIT** is an ethical, farm-to-table organic grocery platform serving **Sathyamangalam, Erode, and Coimbatore** in Tamil Nadu. Traditional grocery portals suffer from cart abandonment caused by session loss across mobile and desktop, zero visibility into ad spend ROAS, and insecure client-side price trust.

**FARM_LIT** was engineered to resolve these challenges through an enterprise-grade architecture:

```yaml
Platform Name       : FARM_LIT — Fresh. Natural. Everyday.
Target Region       : Sathyamangalam • Erode • Gobichettipalayam • Coimbatore
Core Capabilities   : Cross-Device Cart Sync • Multi-Touch UTM Attribution • Centered Cart Modal
Engineering Stack   : Next.js 14 App Router • TypeScript • Supabase PostgreSQL • Prisma ORM v5
Security & Defense  : HttpOnly JWT Sessions • Zod Schema Guards • Sliding-Window Rate Limiter
Speed Profile       : Sub-900ms Static Generation (SSG) • Next/Image WebP/AVIF Compression
Testing Matrix      : Unit & Security Suites (Vitest) • Cross-Device E2E (Playwright)
```

<!-- Animated Glowing Divider -->
<img src="https://cdn.jsdelivr.net/gh/sugan0025/FARM_LIT@main/assets/rainbow-divider.svg" width="100%">

<!-- ╔═══════════════════════════════╗ -->
<!-- ║      SYSTEM ARCHITECTURE      ║ -->
<!-- ╚═══════════════════════════════╝ -->

<h2>🏛️ System Architecture</h2>

<div align="center">
  <img src="https://cdn.jsdelivr.net/gh/sugan0025/FARM_LIT@main/assets/architecture-diagram.svg" width="100%" alt="FARM_LIT Real-Time System Architecture" />
</div>

<br>

| Architectural Pillar | Core Technology | Engineering Responsibility |
|---|---|---|
| **🛍️ Frontend &amp; UX** | Next.js 14 App Router, Tailwind CSS | Slide-over cart drawer, centered rolling-style modal, faceted search, Next/Image AVIF pipeline |
| **🛡️ Security &amp; Auth** | HttpOnly JWT, `bcryptjs`, Zod | Cryptographic session tokens, strict schema verification, sliding-window endpoint protection |
| **💾 Database &amp; Cart** | Supabase PostgreSQL, Prisma ORM v5 | Guest-to-user cart reconciler, atomic inventory decrement, dynamic discount coupon engine |
| **📈 Attribution &amp; SEO** | Custom UTM Capture Engine, JSON-LD | Multi-touch campaign attribution, Google rich snippet microdata, local organic search optimization |

<!-- Animated Glowing Divider -->
<img src="https://cdn.jsdelivr.net/gh/sugan0025/FARM_LIT@main/assets/rainbow-divider.svg" width="100%">

<!-- ╔═══════════════════════════════╗ -->
<!-- ║   CART PERSISTENCE ENGINE     ║ -->
<!-- ╚═══════════════════════════════╝ -->

<h2>🛒 Cart Persistence &amp; Cross-Device Sync</h2>

Cart drop-off is mitigated via a multi-tier persistence pipeline:

1. **Guest Browsing Mode**:
   - Items buffered in client `localStorage` (`farmlit_guest_cart_v1`).
   - Client payloads are treated as untrusted; prices are never sourced from client storage.
2. **Authenticated Cloud Mode**:
   - Confirmed carts sync directly to PostgreSQL via Prisma ORM models (`Cart` & `CartItem`).
   - Logging in from any device instantly restores items and current server-verified stock.
3. **Seamless Merge Strategy**:
   - When a guest authenticates with items already in their browser, `/api/cart/sync` triggers.
   - The server inspects database items and merges quantities: `Math.min(stockQuantity, existingQty + guestQty)`.
   - Guest local storage is automatically purged upon successful reconciliation.

<!-- Animated Glowing Divider -->
<img src="https://cdn.jsdelivr.net/gh/sugan0025/FARM_LIT@main/assets/rainbow-divider.svg" width="100%">

<!-- ╔═══════════════════════════════╗ -->
<!-- ║    UTM ATTRIBUTION & CRO      ║ -->
<!-- ╚═══════════════════════════════╝ -->

<h2>📈 UTM Attribution &amp; Marketing Intelligence</h2>

A custom privacy-first attribution listener captures and attributes customer acquisition channels without third-party tracker bloat:

* **Tracked Parameters**: `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`.
* **First-Touch Attribution**: Captured on initial landing, persisted in non-overwriting storage to record original discovery source.
* **Last-Touch Attribution**: Updated on subsequent visits to record conversion driver.
* **Order Correlation**: When an order executes, both first-touch and last-touch metrics persist to `CampaignAttribution`.
* **Zero PII Leakage**: Telemetry strictly tracks acquisition metadata, excluding personal customer data.

<!-- Animated Glowing Divider -->
<img src="https://cdn.jsdelivr.net/gh/sugan0025/FARM_LIT@main/assets/rainbow-divider.svg" width="100%">

<!-- ╔═══════════════════════════════╗ -->
<!-- ║     SECURITY & DEFENSE        ║ -->
<!-- ╚═══════════════════════════════╝ -->

<h2>🛡️ Cybersecurity &amp; Defensive Controls</h2>

1. **Server-Side Price Integrity**: Client prices are completely ignored during checkout. The backend fetches ground-truth unit prices directly from PostgreSQL and recomputes subtotals, coupons, and delivery thresholds.
2. **SQL Injection Defense**: Parameterized queries via Prisma ORM combined with strict Zod type coercion prevent SQL injection.
3. **Sliding-Window Rate Limiting**: In-memory rate limiter defends `/api/auth/login`, `/api/auth/register`, `/api/checkout`, and `/api/contact` against brute force and credential stuffing.
4. **Hardened HTTP Headers**: Configured in `next.config.mjs` including `HSTS`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, and strict `Referrer-Policy`.

<!-- Animated Glowing Divider -->
<img src="https://cdn.jsdelivr.net/gh/sugan0025/FARM_LIT@main/assets/rainbow-divider.svg" width="100%">

<!-- ╔═══════════════════════════════╗ -->
<!-- ║    PROJECT DIRECTORY MAP      ║ -->
<!-- ╚═══════════════════════════════╝ -->

<h2>🗂️ Project Architecture &amp; Directory Map</h2>

```
FARM_LIT/
├── 📂 assets/                              # High-resolution vector diagrams & UI assets
│   ├── 🎨 header-banner.svg                # Natural emerald glowing header banner
│   ├── 🏛️ architecture-diagram.svg         # 4-stage end-to-end system architecture
│   └── 🌈 rainbow-divider.svg              # Animated organic gradient divider
│
├── 📂 prisma/
│   ├── schema.prisma                       # Models: User, Product, Category, Cart, Order, UTM
│   └── seed.js                             # Seed script for organic catalog, coupons & admin accounts
│
├── 📂 public/                              # Optimized WebP assets, favicons, and manifest
│
├── 📂 src/
│   ├── 📂 app/                             # Next.js 14 App Router
│   │   ├── (auth)/                         # Login & Registration route groups
│   │   ├── (shop)/                         # Shop, category browse, search, cart & checkout
│   │   ├── about/                          # Brand origin & ethical farming mission
│   │   ├── community/                      # Farm recipes, harvest calendar & guides
│   │   ├── contact/                        # Validated contact form & logistics addresses
│   │   ├── admin/                          # Role-protected operations dashboard
│   │   └── api/                            # Auth, cart sync, checkout, coupons, rate limiting
│   │
│   ├── 📂 components/                      # Modular UI Architecture
│   │   ├── cart/CartDrawer.tsx             # Slide-over cart drawer with free delivery progress
│   │   ├── home/                           # Hero, Categories, ValueProps, Deals, Community
│   │   ├── layout/                         # Sticky Header, search, footer navigation
│   │   ├── seo/JsonLd.tsx                  # Google JSON-LD structured data injector
│   │   ├── shop/                           # ProductCard, QuickViewModal, FilterDrawer
│   │   └── ui/UTMListener.tsx              # First-touch & last-touch campaign listener
│   │
│   └── 📂 lib/                             # Core Logic & Utilities
│       ├── analytics.ts                    # Privacy-first event telemetry
│       ├── auth.ts                         # Bcrypt password hashing & JWT session logic
│       ├── cart-calculations.ts            # Discount & delivery threshold calculation engine
│       ├── db.ts                           # Prisma database client singleton
│       ├── rate-limit.ts                   # Sliding-window endpoint protection
│       └── validations/                    # Zod schemas for checkout, auth, contact
│
├── 📂 e2e/                                 # Playwright cross-device test suites
└── 📂 tests/                               # Vitest unit, integration & security test suites
```

<!-- Animated Glowing Divider -->
<img src="https://cdn.jsdelivr.net/gh/sugan0025/FARM_LIT@main/assets/rainbow-divider.svg" width="100%">

<!-- ╔═══════════════════════════════╗ -->
<!-- ║     LOCAL SETUP GUIDE         ║ -->
<!-- ╚═══════════════════════════════╝ -->

<h2>🚀 Local Setup &amp; Development</h2>

### 1. Clone & Install
```bash
git clone https://github.com/sugan0025/FARM_LIT.git
cd FARM_LIT
npm install
```

### 2. Configure Environment Variables
Create `.env` based on `.env.example`:

| Variable | Description | Required | Default |
|---|---|:---:|---|
| `NEXT_PUBLIC_APP_URL` | Application root URL | Yes | `http://localhost:3000` |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Yes | `https://rmhgilgjypkkrcpsrdwg.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public client anon key | Yes | — |
| `DATABASE_URL` | PostgreSQL connection string | Yes | Supabase connection pooler |
| `JWT_SECRET` | Session JWT signing secret | Yes | Cryptographic secret |
| `RATE_LIMIT_MAX_REQUESTS` | Sliding window rate limit threshold | No | `100` |

### 3. Run Database Migrations & Seeds
```bash
npx prisma generate
npx prisma db push
node prisma/seed.js
```

### 4. Execute Test Suites
```bash
npm run test        # Runs Vitest unit & integration test suites
npm run test:e2e    # Runs Playwright cross-device end-to-end tests
```

### 5. Launch Development Server
```bash
npm run dev
# Live on http://localhost:3000
```

<!-- Animated Glowing Divider -->
<img src="https://cdn.jsdelivr.net/gh/sugan0025/FARM_LIT@main/assets/rainbow-divider.svg" width="100%">

<!-- ╔═══════════════════════════════╗ -->
<!-- ║    AUTHOR & CREDITS           ║ -->
<!-- ╚═══════════════════════════════╝ -->

<h2>👨‍💻 Author &amp; Credits</h2>

```yaml
Architect           : Suganesan S (Sugan)
GitHub Profile      : https://github.com/sugan0025
Platform            : FARM_LIT — Fresh. Natural. Everyday.
Target Region       : Sathyamangalam, Tamil Nadu, India
```

<div align="center">

<a href="https://github.com/sugan0025/FARM_LIT">
  <img src="https://img.shields.io/badge/🌿_Experience_FARM_LIT-16A34A?style=for-the-badge&logoColor=white" />
</a>
&nbsp;
<a href="https://github.com/sugan0025">
  <img src="https://img.shields.io/badge/GitHub-sugan0025-181717?style=for-the-badge&logo=github&logoColor=white" />
</a>

<br><br>

<b>FARM_LIT</b> • Handcrafted with love in Sathyamangalam, Tamil Nadu • 100% Direct Farm-to-Table Experience

</div>
