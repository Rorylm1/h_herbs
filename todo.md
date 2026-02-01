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

# Milestone 3: Booking Flow + Herb Shop

## Booking Flow
- [ ] Build `BookingStepper` component — visual step indicator (1 of 5)
- [ ] Build booking page step 1: Select practitioner (pre-filled if coming from profile)
- [ ] Build booking page step 2: Select service type
- [ ] Build booking page step 3: Pick date & time (mock calendar)
- [ ] Build booking page step 4: Your details (mock form)
- [ ] Build booking page step 5: Confirmation page

## Herb Shop
- [ ] Build `/shop` page — product grid with filter sidebar (category, concern tags)
- [ ] Build `ProductCard` component
- [ ] Build `/shop/[slug]` product detail page — image, description, ingredients, usage, pricing, "Recommended by" badge
- [ ] Build `FilterSidebar` component

## Cart
- [ ] Set up cart state (React Context)
- [ ] Build `/cart` page — line items, quantities, subtotal, mock checkout
- [ ] Build `CartLineItem` component
- [ ] Cart icon in header shows live item count

## Git & Deploy
- [ ] Git commit + push (Vercel auto-deploys)
