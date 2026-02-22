# Milestone 1: Foundation + Homepage ✅

## Setup
- [x] Initialise Next.js project (App Router, TypeScript, Tailwind, ESLint)
- [x] Install Google Fonts (Cormorant Garamond + Lato) via `next/font`
- [x] Configure Tailwind theme: custom colours, fonts, spacing tokens, shadows, border-radius
- [x] Create base layout (`app/layout.tsx`) with font loading and global styles
- [x] Set up dummy data files (`data/practitioners.ts`, `data/products.ts`, `data/articles.ts`, `data/testimonials.ts`)

## Layout Components
- [x] Build `SiteHeader` — logo, desktop nav, mobile hamburger, cart icon, account icon
- [x] Build `MobileNav` — slide-out drawer with nav links
- [x] Build `SiteFooter` — logo, nav, contact info, ANP badge, Instagram, newsletter form, copyright

## Homepage Sections
- [x] Build `HeroBanner` component — background image/gradient, heading, subheading, CTA
- [x] Build homepage hero section with Hector's brand messaging
- [x] Build `PathwayCard` component — icon + heading + description + CTA
- [x] Build pathway cards section (Book / Shop / Learn)
- [x] Build `PractitionerCard` component
- [x] Build featured practitioners section (3 cards)
- [x] Build `TestimonialCarousel` component
- [x] Build testimonials section
- [x] Build `ArticleCard` component
- [x] Build latest articles section (3 cards)
- [x] Build newsletter CTA section
- [x] Build decorative botanical section dividers

## Polish & Responsive
- [x] Mobile responsive pass on all homepage sections
- [x] Hover states, transitions, micro-interactions
- [x] Placeholder pages for nav links (`/herbalists`, `/shop`, `/learn`, `/contact`, `/book`)
- [x] Favicon and page metadata

## Git & Deploy
- [x] `git init` + initial commit
- [x] Create GitHub repo + push
- [x] Deploy to Vercel — live at https://h-herbs.vercel.app/

---

# Milestone 2: Practitioners ✅

## Data
- [x] Add `instagram` handles and `certifications` (professional body memberships, insurance, DBS) to all 5 practitioners
- [x] Separate qualifications (education) from certifications (trust signals)

## Components
- [x] Build `PractitionerHero` — large profile header with photo, name, title, specialities, Instagram link, booking CTA
- [x] Build `ServicesTable` — pricing cards for consultation types (name, duration, price, description, book CTA)
- [x] Build `ReviewCard` — star rating, client quote, name, date
- [x] Build `AvailabilityPreview` — mock weekly calendar showing open/unavailable time slots
- [x] Build `CertificationsBadges` — shield icons with abbreviation, full name, year

## Pages
- [x] Build `/herbalists` directory page — hero banner, grid of all 5 practitioners, "not sure who to book?" CTA
- [x] Build `/herbalists/[slug]` profile hub page — hero, bio, qualifications & certifications, services & pricing, availability, reviews, articles by practitioner, sticky bottom booking CTA

## Cross-Links & Polish
- [x] Practitioner profiles link to their authored articles
- [x] Practitioner profiles link to booking flow (`/book?practitioner=[slug]`)
- [x] Homepage practitioner cards link through to full profiles
- [x] Mobile responsive across all new pages/components
- [x] Dynamic metadata (page title/description per practitioner)

## Git & Deploy
- [x] Git commit + push (Vercel auto-deploys)

---

# Milestone 3: Booking Flow + Herb Shop + Integrations ✅

## Booking Flow
- [x] Build `BookingStepper` component — visual step indicator (1 of 5)
- [x] Build booking page step 1: Select practitioner (pre-filled if coming from profile)
- [x] Build booking page step 2: Select service type
- [x] Build booking page step 3: Pick date & time (mock calendar with real upcoming dates)
- [x] Build booking page step 4: Your details (name, email, phone, notes form)
- [x] Build booking page step 5: Confirmation page with "Add to Google Calendar" links

## Google Calendar Integration (Phase 1)
- [x] Build `AddToCalendarLink` component — generates Google Calendar event URL from booking details
- [x] Add calendar links to booking confirmation (for both client and practitioner)

## Herb Shop
- [x] Build `/shop` page — product grid with filter sidebar (category, concern tags)
- [x] Build `ProductCard` component
- [x] Build `/shop/[slug]` product detail page — image, description, ingredients, usage, pricing, "Recommended by" badge, related products
- [x] Build `FilterSidebar` component
- [x] Build `AddToBasketButton` component (client component for server-rendered detail page)

## Cart & Stripe Checkout
- [x] Set up cart state (React Context + `CartProvider` + `useCart` hook)
- [x] Build `Providers` wrapper component for layout
- [x] Build `/cart` page — line items, quantities, subtotal, "Proceed to Checkout" button
- [x] Build `CartLineItem` component
- [x] Cart icon in header shows live item count (hidden when 0)
- [x] Install `stripe` and `@stripe/stripe-js` packages
- [x] Create `/api/checkout` API route — creates Stripe Checkout Session with cart items
- [x] Build `/checkout/success` page — post-payment confirmation
- [ ] Set up Stripe test mode env vars (`STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`) — needs Stripe account
- [x] Wire up cart → Stripe Checkout → success page flow (graceful error if Stripe not configured)

## Git & Deploy
- [x] Git commit + push (Vercel auto-deploys)
- [ ] Add Stripe env vars to Vercel project settings — needs Stripe account

---

# Milestone 4: Learn + Contact ✅

## Learn Hub Page
- [x] Build `LearnContent` client component — category filter tabs, article grid, hero section
- [x] Update `/learn` page — replace ComingSoon with metadata + LearnContent

## Article Detail Page
- [x] Build `/learn/[slug]` page — SSG with `generateStaticParams`, dynamic metadata
- [x] Build article hero — featured image with gradient overlay, breadcrumb, category badge, title, author, date
- [x] Build article content renderer — handles `##` headings, `###` subheadings, `**bold**`, paragraphs
- [x] Build author practitioner card — photo, name, title, link to `/herbalists/[slug]`
- [x] Build related articles section — same category, max 3, reuses ArticleCard

## Contact Page
- [x] Build `ContactContent` client component — form + contact info + map
- [x] Update `/contact` page — replace ComingSoon with metadata + ContactContent
- [x] Build contact form — name, email, phone, subject dropdown, message, mock submission with success state
- [x] Build contact details card — address, email link, Instagram link
- [x] Build Google Maps embed — iframe for 12 Warrington Crescent
- [x] Build opening hours card

## Cross-Links & Polish
- [x] Verify homepage article cards link to working `/learn/[slug]` pages
- [x] Verify practitioner "Articles by" sections link to working article pages
- [x] Verify article author cards link to correct practitioner profiles
- [x] Mobile responsive pass on all new pages

## Git & Deploy
- [x] Git commit + push (Vercel auto-deploys)

---

# Milestone 5: Client Account Area ✅

## Authentication System (Simulated)
- [x] Build `AuthContext` — simulated auth with three roles (logged-out, client, practitioner), localStorage persistence
- [x] Build `AuthProvider` — wraps app with auth state, provides login/logout/cycleRole helpers
- [x] Build `AuthToggle` — floating dev toggle (bottom-right corner) to cycle between auth states
- [x] Update `Providers` component — add `AuthProvider` and `AuthToggle` to provider stack
- [x] Build `useAuth` custom hook — typed access to auth state from any component

## Login Page
- [x] Build `LoginContent` component — mock login form with role selector (Client / Practitioner)
- [x] Build `/login` page with metadata
- [x] Role selector buttons (Client / Practitioner) with visual active state
- [x] Email and password fields (mock — no validation required)
- [x] "Already signed in" state with redirect to dashboard
- [x] Botanical design treatment (patterns, borders, watermark, dandelion logo)

## Account Dashboard
- [x] Build `AccountDashboard` component — overview page with welcome message, quick stats, summary cards
- [x] Build `AccountSidebar` component — navigation for account area (desktop sidebar + mobile tab bar)
- [x] Build `/account` page with metadata
- [x] Quick stats: upcoming bookings count, prescriptions count, orders count
- [x] Next booking summary card with practitioner name and date
- [x] Latest prescription summary card
- [x] Recent order summary card with status badge
- [x] Auth guard — redirects to sign-in prompt if not logged in as client
- [x] Sign Out button in page hero

## Bookings Page
- [x] Build `BookingsContent` component — filterable list of bookings
- [x] Build `BookingCard` component — booking card with practitioner, service, date/time, status
- [x] Build `/account/bookings` page
- [x] Filter tabs: Upcoming, Past, All (with counts)
- [x] Empty state with "Book a Consultation" CTA

## Prescriptions Pages
- [x] Build `PrescriptionsContent` component — list of prescriptions sorted by date
- [x] Build `PrescriptionCard` component — summary card with condition, practitioner, herb count
- [x] Build `/account/prescriptions` page
- [x] Info banner explaining "Order These Herbs" feature
- [x] Build `PrescriptionDetail` component — full prescription view with herbs table, dosages, practitioner notes
- [x] Build `/account/prescriptions/[id]` page with `generateStaticParams` and dynamic metadata
- [x] Herbs table: herb name, form, dosage, duration, shop link with price
- [x] Practitioner card with photo and link to profile
- [x] "Order These Herbs" CTA — adds all available shop products to cart via CartContext
- [x] Breadcrumb navigation

## Orders Page
- [x] Build `OrdersContent` component — order history with stats
- [x] Build `OrderCard` component — order card with items, total, status badge, tracking number
- [x] Build `/account/orders` page
- [x] Quick stats: total orders, delivered count, total spent
- [x] Status badges (processing, shipped, delivered) with colour coding

## Mock Data
- [x] Create `data/bookings.ts` — 5 mock bookings with helper functions (getUpcomingBookings, getPastBookings)
- [x] Create `data/orders.ts` — 4 mock orders with helper functions (getOrdersSorted, getOrdersByStatus)
- [x] Create `data/prescriptions.ts` — 3 mock prescriptions with herb items linked to shop products

## Header & Cross-Links
- [x] Update `SiteHeader` — show user name and avatar when logged in, link to account/practitioner portal
- [x] Mobile nav shows account link when logged in
- [x] All account pages include AccountSidebar with active state highlighting

## Git & Deploy
- [ ] Git commit + push (Vercel auto-deploys)

---

# Milestone 6: Practitioner Portal + Database ✅

## Database Infrastructure (Supabase + Prisma)
- [x] Install `prisma`, `@prisma/client`, `@prisma/adapter-pg`, `pg`, `@supabase/supabase-js`
- [x] Configure `prisma.config.ts` with Supabase Postgres connection
- [x] Design full database schema (`prisma/schema.prisma`) — Practitioner, Product, Article, Testimonial, Booking, Order, Prescription, Availability, SiteImage
- [x] Run `prisma db push` — create tables in Supabase
- [x] Write seed script (`prisma/seed.ts`) — populate with existing dummy data
- [x] Run seed — all data migrated to database
- [x] Create Prisma client singleton (`src/lib/prisma.ts`) with PG adapter
- [x] Create Supabase client utility (`src/lib/supabase.ts`)
- [x] Add `.env.example` with required env var template
- [x] Add `db:push`, `db:seed`, `db:generate`, `db:studio` scripts to package.json

## Migrate Public Pages to Database
- [x] Migrate `/shop`, `/shop/[slug]` — query Product table
- [x] Migrate `/herbalists`, `/herbalists/[slug]` — query Practitioner table
- [x] Migrate `/learn`, `/learn/[slug]` — query Article table
- [x] Migrate homepage sections (featured practitioners, latest articles, testimonials)
- [x] Migrate `/account/*` pages — query Booking, Order, Prescription tables
- [x] Remove static data files after migration verified

## Practitioner Portal — Layout & Navigation
- [x] Build `PractitionerSidebar` navigation component
- [x] Create portal layout with auth guard (`isPractitioner` check)

## Practitioner Portal — Shop Management
- [x] Build `/practitioner/shop` — product list with search/filter, edit/delete actions
- [x] Build `/practitioner/shop/new` — create product form
- [x] Build `/practitioner/shop/[slug]/edit` — edit product form
- [x] Build `/api/products` CRUD API routes
- [x] Build `ProductForm` and `ShopManagement` components
- [x] Build delete confirmation modal

## Practitioner Portal — Profile Editor
- [x] Build `/practitioner/profile` — edit bio, qualifications, specialities, services, photo
- [x] Build `/api/practitioners/[slug]` update API route

## Practitioner Portal — Article Management
- [x] Build `/practitioner/articles` — article list with draft/published badges
- [x] Build `/practitioner/articles/new` — article editor
- [x] Build `/practitioner/articles/[slug]/edit` — edit article
- [x] Build `/api/articles` CRUD API routes
- [x] Publish/unpublish toggle, delete with confirmation

## Practitioner Portal — Availability Management
- [x] Build `/practitioner/availability` — weekly calendar grid
- [x] Toggle days on/off, set start/end times
- [x] Build `/api/availability` CRUD API route

## Practitioner Portal — Appointments
- [x] Build `/practitioner/appointments` — list with filter tabs (upcoming/past/all)
- [x] Status management (confirm, complete, cancel)
- [x] Build `/api/appointments/[id]` status update route

## Practitioner Portal — Testimonial Management
- [x] Build `/practitioner/testimonials` — list, add, edit, delete testimonials
- [x] Build `/api/testimonials` CRUD API routes

## Practitioner Portal — Site Images
- [x] Build `/practitioner/images` — media library (URL-based management)
- [x] Build `/api/site-images` CRUD API routes

## Practitioner Portal — Dashboard
- [x] Build `/practitioner` dashboard — quick stats, recent activity, quick-action buttons
- [x] Build `/api/practitioner/dashboard` stats route

## Refactoring & Cleanup
- [x] Create shared types file (`src/types/index.ts`) — consolidate types from static data files
- [x] Update all component imports to use `@/types` instead of `@/data/*`
- [x] Standardize API error handling (`src/lib/api-helpers.ts`)
- [x] Fix BookingFlow to accept practitioners as prop instead of static import
- [x] Delete all static data files (`src/data/*.ts`)
- [x] Add `force-dynamic` to all database-backed pages
- [x] Fix Vercel deploy (postinstall prisma generate, session pooler, pool size)

## Git & Deploy
- [x] Git commit + push (Vercel auto-deploys)
- [x] Add Supabase env vars to Vercel project settings
- [x] Configure session pooler connection for serverless

## Deferred to Future Milestone
- Image upload via Supabase Storage (buckets, `ImageUpload` component, `/api/upload` route)
- Forms currently use URL fields for images; file upload to be added later

---

# Visual Design Enhancement ✅
_(Completed out of order before M6 — botanical SVGs, dandelion branding, organic transitions throughout the site.)_

---

# Milestone 7: Real Authentication

## Prisma Schema Updates
- [ ] Add `User` model (id, email, passwordHash, name, role, practitionerSlug?)
- [ ] Add `Account`, `Session`, `VerificationToken` models (Auth.js standard)
- [ ] Run `prisma db push` to create new tables

## Auth.js Setup
- [ ] Install `next-auth@5` (Auth.js v5) and `@auth/prisma-adapter`
- [ ] Create `auth.ts` config — Prisma adapter, credentials provider
- [ ] Create `/api/auth/[...nextauth]` route handler
- [ ] Set up `AUTH_SECRET` env var (local + Vercel)
- [ ] Add bcrypt for password hashing

## Signup & Login Pages
- [ ] Build `/signup` page — name, email, password, role selector (client/practitioner)
- [ ] Build new `/login` page — replace mock login with real email/password form
- [ ] Handle form validation and error messages
- [ ] Redirect to dashboard after successful login

## Replace Simulated Auth
- [ ] Replace `AuthContext` with Auth.js session provider
- [ ] Update `useAuth` hook to use `useSession()` from Auth.js
- [ ] Update `SiteHeader` to show real user name and avatar
- [ ] Update all `isPractitioner` / `isClient` checks to use real session role
- [ ] Remove `AuthToggle` dev component
- [ ] Remove `AuthProvider` from `Providers.tsx`

## Route Protection
- [ ] Add Next.js middleware (`middleware.ts`) for auth checks
- [ ] Protect `/practitioner/*` routes — redirect to login if not practitioner
- [ ] Protect `/account/*` routes — redirect to login if not logged in
- [ ] Protect API routes — return 401 for unauthenticated requests

## Seed Admin User
- [ ] Create seed for default practitioner user (Hector) with hashed password
- [ ] Link practitioner user to existing Practitioner record via slug

## Git & Deploy
- [ ] Git commit + push (Vercel auto-deploys)
- [ ] Add `AUTH_SECRET` env var to Vercel

---

# Milestone 8: Google Calendar OAuth Integration

## Google Cloud Setup
- [ ] Create Google Cloud project and enable Calendar API
- [ ] Configure OAuth2 consent screen and credentials
- [ ] Set up environment variables for Google OAuth

## OAuth Flow
- [ ] Build "Connect Google Calendar" button in practitioner portal
- [ ] Implement OAuth callback route — exchange code for tokens, store in database
- [ ] Handle token refresh (access tokens expire)
- [ ] Build "Disconnect Calendar" option

## Calendar Sync
- [ ] Auto-create Google Calendar events on booking confirmation
- [ ] Pull real free/busy data for practitioner availability page
- [ ] Handle edge cases (calendar disconnected, token expired, API errors)

## Git & Deploy
- [ ] Git commit + push (Vercel auto-deploys)
- [ ] Configure Google OAuth env vars on Vercel
