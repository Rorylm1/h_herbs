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

# Milestone 4: Learn + Contact
_(tasks to be detailed when M3 is complete)_

---

# Milestone 5: Client Account Area
_(tasks to be detailed when M4 is complete)_

---

# Milestone 6: Practitioner Portal
_(tasks to be detailed when M5 is complete)_

---

# Milestone 7: Database, Auth & Image Storage (Post-V1)

## Database
- [ ] Choose and set up hosted Postgres (Vercel Postgres / Supabase / Neon)
- [ ] Install and configure ORM (Prisma or Drizzle)
- [ ] Design database schema — practitioners, products, articles, bookings, prescriptions, orders, users
- [ ] Seed database with existing dummy data

## Authentication
- [ ] Install and configure Auth.js (NextAuth.js)
- [ ] Implement real login/signup (email/password and/or Google sign-in)
- [ ] Add role-based access control (client vs practitioner)
- [ ] Replace simulated auth toggle with real auth state

## Image Storage
- [ ] Set up image storage service (Cloudinary / Vercel Blob / S3)
- [ ] Build image upload flow for practitioner photos, product images, article images
- [ ] Migrate existing Unsplash placeholder images to storage

## Data Migration
- [ ] Replace all TypeScript data file imports with database queries
- [ ] Verify all existing pages work identically with database-backed data

## Git & Deploy
- [ ] Git commit + push (Vercel auto-deploys)
- [ ] Configure production database and env vars on Vercel

---

# Milestone 8: Google Calendar OAuth Integration (Post-V1)

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
