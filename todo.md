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

# Milestone 6: Practitioner Portal + Database
_(tasks to be detailed when M5 is complete)_

---

# Milestone 7: Visual Design Enhancement ✅

## SVG Assets (src/components/svg/)
- [x] Create `DandelionLogo` SVG component (full + icon variants)
- [x] Create `BotanicalDivider` SVG component (simple + elaborate variants)
- [x] Create `BotanicalBorder` SVG component (4 corner positions via CSS transform)
- [x] Create `BotanicalPattern` SVG component (repeatable tile background)
- [x] Create `OrganicDivider` SVG component (wave, leaf-vine, seeds variants)
- [x] Create `HerbIllustration` SVG component (chamomile, elderberry, nettle, dandelion, lavender, echinacea)
- [x] Create `QuoteLeaf` SVG component (quote mark with botanical accent)

## New Shared Components
- [x] Build `DandelionWatermark` — positioned low-opacity background motif
- [x] Build `VideoPlaceholder` — homepage video section with poster image and play button
- [x] Build `LatinName` — italic serif typography utility for Latin botanical names

## CSS Theme Additions
- [x] Add botanical colour tokens and utility classes to `globals.css`

## Layout Enhancements
- [x] Update `SiteHeader` — add dandelion icon next to text logo
- [x] Update `SiteFooter` — add dandelion icon, botanical pattern background, watermark, Hippocrates quote
- [x] Update `SectionHeading` — replace simple leaf divider with `BotanicalDivider`

## Homepage Enhancements
- [x] Update `HeroBanner` — richer botanical pattern overlay, corner borders, watermark, organic transition
- [x] Add `VideoPlaceholder` section to homepage (between pathways and practitioners)
- [x] Add `OrganicDivider` transitions between homepage sections
- [x] Update `TestimonialCarousel` — `QuoteLeaf`, botanical borders, background treatment
- [x] Update `PathwayCard` — botanical corner accents
- [x] Update newsletter CTA — botanical pattern, watermark, Thoreau quote

## Practitioner Enhancements
- [x] Update `PractitionerCard` — botanical corner accent on photo
- [x] Update `PractitionerHero` — botanical pattern background, border accents, watermark
- [x] Update `/herbalists` directory page — enriched hero, organic divider, watermark
- [x] Update `/herbalists/[slug]` profile page — organic dividers between sections
- [x] Update `ReviewCard` — botanical corner accent, `QuoteLeaf`

## Shop Enhancements
- [x] Add `latinName` field to `Product` type and populate for all 12 products
- [x] Update product Unsplash image URLs (unique per product)
- [x] Update `ProductCard` — display Latin name, botanical accent
- [x] Update `/shop/[slug]` product detail page — Latin name display, botanical borders
- [x] Update `ShopContent` — enriched hero, watermark, organic divider

## Booking & Remaining Pages
- [x] Update `BookingStepper` — organic vine connectors, leaf accents
- [x] Update `BookingFlow` Step 5 — watermark, botanical borders on confirmation
- [x] Update `/checkout/success` — watermark, botanical accents
- [x] Update cart page — watermark on empty state, botanical accents on checkout card
- [x] Update `ArticleCard` — botanical corner accent
- [x] Update `ComingSoon` — dandelion logo replacing leaf, botanical pattern

## Git & Deploy
- [x] Git commit + push (Vercel auto-deploys)

---

# Milestone 8: Database, Auth & Image Storage (Post-V1)

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

# Milestone 9: Google Calendar OAuth Integration (Post-V1)

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
