# Hector's Herbs — V1 Prototype Spec

> **Approach:** Simple clear navigation (A-style) with rich practitioner hub pages (B-style) and a hybrid homepage. Prototype with real integrations where it matters (Stripe payments, Google Calendar) and dummy data elsewhere.

---

## 1. Page List

### Public Pages

| Route | Page | Description |
|-------|------|-------------|
| `/` | **Home** | Hero brand statement + pathway cards ("Book a Consultation", "Browse Our Herbs", "Learn") + featured practitioners (3 cards) + testimonials carousel + latest articles (3 cards) + newsletter CTA |
| `/herbalists` | **Our Herbalists** | Directory grid of all practitioners. Each card: photo, name, title, specialities, short tagline, "View Profile" CTA |
| `/herbalists/[slug]` | **Practitioner Profile** | **The hub page.** Full bio, qualifications, philosophy, specialities, services & pricing table, availability snapshot (mock calendar), client reviews, articles by this practitioner, "Book with [Name]" sticky CTA |
| `/book` | **Book a Consultation** | Step 1: Select practitioner (if not pre-selected) → Step 2: Select service type → Step 3: Pick date & time (mock calendar) → Step 4: Your details (mock form) → Step 5: Confirmation with "Add to Google Calendar" link for both client and practitioner. Visual stepper at top. |
| `/shop` | **Herb Shop** | Product grid with sidebar filters: category (Tinctures, Teas, Capsules, Dried Herbs), concern tags. Each card: product image, name, short description, price, "Add to Basket" |
| `/shop/[slug]` | **Product Detail** | Hero image, full description, ingredients, how to use, dosage, price, "Add to Basket", "Recommended by [Practitioner]" badge where applicable, related products |
| `/learn` | **Learn** | Article grid with category filter tabs (Herbal Medicine, Nutrition, Holistic Living, Seasonal Wellness). Each card: featured image, title, author (practitioner), category tag, excerpt |
| `/learn/[slug]` | **Article** | Full article with hero image, author practitioner card (links to their profile), related articles at bottom |
| `/contact` | **Contact** | Contact form (mock), Google Maps embed (12 Warrington Crescent), address, email, phone, Instagram link |

### Client Area (Simulated — toggle between "logged in" and "logged out" states via a simple UI toggle, no real auth)

| Route | Page | Description |
|-------|------|-------------|
| `/account` | **My Account** | Dashboard: upcoming bookings, recent prescriptions, order history summaries, saved practitioner |
| `/account/bookings` | **My Bookings** | List of upcoming and past bookings with status badges |
| `/account/prescriptions` | **My Prescriptions** | List of prescriptions from consultations |
| `/account/prescriptions/[id]` | **Prescription Detail** | Herbs prescribed, dosage instructions, practitioner notes, "Order These Herbs" CTA linking to pre-filled cart |
| `/account/orders` | **My Orders** | Order history with status tracking |

### Practitioner Portal (Simulated — separate login toggle for practitioner role, no real auth)

| Route | Page | Description |
|-------|------|-------------|
| `/practitioner` | **Practitioner Dashboard** | Overview: upcoming appointments, recent prescriptions written, quick stats (clients seen this week, pending reviews) |
| `/practitioner/availability` | **Manage Availability** | Weekly calendar grid where practitioner sets available time slots. Toggle days on/off, set start/end times per day. All mock/visual. |
| `/practitioner/appointments` | **My Appointments** | List of upcoming and past client appointments with status (confirmed, completed, cancelled) |
| `/practitioner/prescriptions` | **Prescriptions Written** | List of prescriptions created, with client name, date, and status |
| `/practitioner/prescriptions/new` | **Write Prescription** | Form to create a new prescription: select client, add herbs with dosage/duration, add notes. Mock submit. |
| `/practitioner/profile` | **Edit My Profile** | Edit own bio, qualifications, specialities, approach text, profile photo. Preview how it looks on the public site. |
| `/practitioner/articles` | **My Articles** | List of articles authored, with draft/published status |
| `/practitioner/articles/new` | **Write Article** | Simple article editor: title, category, content (textarea/markdown), featured image. Mock save/publish. |

### Utility Pages

| Route | Page | Description |
|-------|------|-------------|
| `/cart` | **Cart** | Line items, quantities, subtotal, "Proceed to Checkout" button that creates a Stripe Checkout Session and redirects to Stripe's hosted payment page |
| `/checkout/success` | **Checkout Success** | Post-payment confirmation page. Stripe redirects here after successful payment. Shows order summary and confirmation message. |
| `/login` | **Login** | Mock login form with role selector: "Client" or "Practitioner". Clicking "Sign In" toggles to the appropriate logged-in state. |

---

## 2. Component Breakdown

### Layout Components
- `SiteHeader` — Logo, main nav links, cart icon (with count badge), account icon. Mobile: hamburger menu with slide-out drawer.
- `SiteFooter` — Logo, nav links, contact info, ANP badge, Instagram link, newsletter signup, copyright.
- `MobileNav` — Slide-out drawer for mobile navigation.

### Shared / Reusable Components
- `HeroBanner` — Full-width hero with background image/gradient, heading, subheading, CTA button(s). Used on Home, Herbalists, Shop, Learn.
- `PathwayCard` — Icon/illustration + heading + short description + CTA link. Used on homepage.
- `PractitionerCard` — Photo, name, title, specialities, tagline, CTA. Used on herbalists grid and homepage.
- `ProductCard` — Image, name, short desc, price, "Add to Basket". Used on shop grid.
- `ArticleCard` — Image, title, author, category tag, excerpt. Used on learn grid and homepage.
- `TestimonialCarousel` — Rotating client quotes with name, condition treated.
- `SectionHeading` — Consistent heading + optional subheading + decorative botanical divider.
- `BookingStepper` — Visual step indicator for booking flow (Step 1 of 5, etc.).
- `FilterSidebar` — Checkbox/tag filters for shop and learn pages.
- `ReviewCard` — Star rating, quote, client name. Used on practitioner profiles.
- `PrescriptionCard` — Summary card for prescription list view.
- `Badge` — Small label component (e.g., "ANP Certified", "New", category tags).
- `Button` — Primary, secondary, outline variants.
- `AuthToggle` — Dev/prototype toggle to simulate states: logged-out, client logged-in, practitioner logged-in. Floating in corner, visually distinct from the real UI.

### Botanical / Decorative SVG Components
- `DandelionLogo` — SVG brand icon (full and icon variants). Dandelion head with dispersing seeds, hand-drawn style. Used in header, footer, watermarks throughout.
- `BotanicalDivider` — Decorative section divider with central dandelion motif flanked by herb sprigs. Replaces simple leaf divider. Variants: simple, elaborate.
- `BotanicalBorder` — Corner botanical illustration (L-shaped leaf cluster) for framing cards and sections. Mirrored via CSS transform for all four corners.
- `BotanicalPattern` — Repeatable SVG tile pattern (small leaves, dots, seed shapes) for subtle background textures on hero sections, footer, and feature areas.
- `OrganicDivider` — Full-width organic wave/vine shapes for section transitions. Variants: wave, leaf-vine, seeds.
- `HerbIllustration` — Individual botanical illustrations of key herbs (chamomile, elderberry, nettle, dandelion, lavender, echinacea) for decorative use.
- `QuoteLeaf` — Decorative quotation mark combined with botanical accent for testimonials.
- `DandelionWatermark` — Low-opacity positioned dandelion motif for background depth behind content sections.
- `VideoPlaceholder` — Homepage video section with poster image, play button overlay, and botanical framing.
- `LatinName` — Typography utility for rendering Latin botanical names in consistent italic serif style.

### Page-Specific Components
- `PractitionerHero` — Large profile header with photo, name, title, key stats.
- `ServicesTable` — Pricing table for consultation types on practitioner profile.
- `AvailabilityPreview` — Mock weekly calendar showing available slots.
- `BookingForm` — Multi-step form for the booking flow.
- `CartLineItem` — Single item row in the cart.
- `DashboardSummaryCard` — Summary card for account dashboard (upcoming booking, latest prescription, etc.).
- `MapEmbed` — Google Maps iframe for contact page.

### Practitioner Portal Components
- `PractitionerSidebar` — Side navigation for practitioner portal (Dashboard, Availability, Appointments, Prescriptions, Articles, My Profile).
- `AvailabilityEditor` — Weekly calendar grid to set available slots (toggle days, set times).
- `AppointmentList` — List of appointments with status badges and client info.
- `PrescriptionForm` — Form to write a new prescription (select client, add herbs, dosage, notes).
- `ArticleEditor` — Simple article form (title, category, content textarea, image upload placeholder).
- `ProfileEditor` — Form to edit practitioner's own bio, qualifications, specialities, photo.

---

## 3. Design System

### Colour Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `sage-50` | `#f0f7f5` | Page backgrounds, light fills |
| `sage-100` | `#dceee9` | Card backgrounds, hover states |
| `sage-200` | `#b8e0d6` | Primary brand colour, accents, borders |
| `sage-300` | `#8ecdbf` | Active states, highlights |
| `forest-700` | `#2d5a47` | Primary buttons, headings, strong text |
| `forest-800` | `#1e3f32` | Dark sections (footer, hero overlays) |
| `forest-900` | `#142b22` | Darkest backgrounds |
| `earth-100` | `#faf6f1` | Warm off-white backgrounds (alternating sections) |
| `earth-200` | `#f0e6d8` | Warm accents, card backgrounds |
| `earth-400` | `#c4a882` | Gold/warm accents, star ratings |
| `cream` | `#fdfcf9` | Default page background |
| `charcoal` | `#2c2c2c` | Body text |
| `muted` | `#6b7280` | Secondary text, captions |

### Typography

| Element | Font | Weight | Size (desktop) | Notes |
|---------|------|--------|-----------------|-------|
| H1 | Cormorant Garamond (serif) | 600 | 48px / 3rem | Page titles, hero headings |
| H2 | Cormorant Garamond (serif) | 600 | 36px / 2.25rem | Section headings |
| H3 | Cormorant Garamond (serif) | 500 | 24px / 1.5rem | Card titles, sub-sections |
| H4 | Cormorant Garamond (serif) | 500 | 20px / 1.25rem | Small headings |
| Body | Lato (sans-serif) | 400 | 16px / 1rem | Primary body text |
| Body Small | Lato (sans-serif) | 400 | 14px / 0.875rem | Captions, metadata |
| Button | Lato (sans-serif) | 600 | 14px / 0.875rem | Uppercase tracking-wide |
| Nav Link | Lato (sans-serif) | 500 | 15px / 0.9375rem | Header navigation |

Both fonts are free from Google Fonts. Cormorant Garamond gives the elegant, apothecary serif feel. Lato is clean and highly readable.

### Spacing Scale
Base unit: 4px. Tokens: `xs: 4px`, `sm: 8px`, `md: 16px`, `lg: 24px`, `xl: 32px`, `2xl: 48px`, `3xl: 64px`, `4xl: 96px`.

### Border Radius
- `sm`: 4px (badges, small elements)
- `md`: 8px (cards, buttons)
- `lg`: 16px (large cards, modals)
- `full`: 9999px (avatars, pills)

### Shadows
- `card`: `0 1px 3px rgba(0,0,0,0.08)` — subtle card elevation
- `hover`: `0 4px 12px rgba(0,0,0,0.1)` — card hover lift
- `modal`: `0 8px 30px rgba(0,0,0,0.15)` — modals/dropdowns

### Decorative Elements
- **Dandelion Logo** — Hand-drawn SVG dandelion with dispersing seeds. Primary brand icon in header/footer, recurring as watermarks and decorative motifs throughout the site.
- **Botanical Dividers** — Hand-drawn herb sprig compositions replacing simple leaf dividers. Two variants: simple (centre motif + lines) and elaborate (full botanical composition).
- **Botanical Borders** — Corner L-shaped botanical illustrations for framing cards, hero sections, and feature areas.
- **Botanical Patterns** — Repeatable tile patterns with small botanical motifs (leaves, dots, seeds) for subtle background textures.
- **Organic Section Transitions** — Full-width wave and vine shapes replacing hard horizontal lines between page sections.
- **Herb Illustrations** — Individual botanical illustrations of key herbs (chamomile, elderberry, nettle, dandelion, lavender, echinacea) for decorative use.
- **Latin Names** — Botanical names rendered consistently in italic serif (Cormorant Garamond italic) throughout the site, e.g. *Matricaria recutita*, *Sambucus nigra*.
- **Watermarks** — Very low-opacity dandelion motifs placed behind content sections for depth.
- **Brand Quotes** — Hippocrates ("Let food be thy medicine…") and Thoreau ("In wildness is the preservation of the world") used as textual accents.
- Soft gradient overlays on imagery (forest-900 to transparent)

---

## 4. Dummy Data Structure

### Practitioners (5 total)

```typescript
type Practitioner = {
  slug: string;
  name: string;
  title: string;           // e.g., "Naturopathic Herbalist"
  photo: string;            // placeholder image URL
  specialities: string[];   // e.g., ["Digestive Health", "Stress & Anxiety"]
  tagline: string;          // one-liner for card view
  bio: string;              // 2-3 paragraphs for profile page
  qualifications: string[]; // e.g., ["BSc Herbal Medicine", "ANP Member"]
  approach: string;         // paragraph on their philosophy
  services: Service[];
  reviews: Review[];
  articleSlugs: string[];   // articles authored by this practitioner
};

type Service = {
  name: string;             // e.g., "Initial Consultation"
  duration: string;         // e.g., "60 minutes"
  price: number;            // in GBP
  description: string;
};

type Review = {
  clientName: string;
  rating: number;           // 1-5
  text: string;
  date: string;
};
```

**Practitioners:**
1. **Hector** — Founder. Naturopathic Herbalist. Specialities: Digestive Health, Chronic Fatigue, Immune Support. Services: Initial Consultation (60min, £95), Follow-Up (30min, £55), Herbal Review (45min, £70).
2. **Amara Osei** — Herbalist & Nutritionist. Specialities: Women's Health, Hormonal Balance, Fertility.
3. **Thomas Whitfield** — Medical Herbalist. Specialities: Respiratory Health, Allergies, Skin Conditions.
4. **Priya Sharma** — Naturopath. Specialities: Stress & Anxiety, Sleep Disorders, Mental Wellbeing.
5. **Elena Vasquez** — Herbalist. Specialities: Pain Management, Musculoskeletal Health, Sports Recovery.

### Herbs / Products (12 total)

```typescript
type Product = {
  slug: string;
  name: string;
  category: "Tinctures" | "Teas" | "Capsules" | "Dried Herbs";
  concerns: string[];       // e.g., ["Sleep", "Anxiety"]
  price: number;            // in GBP
  image: string;
  shortDescription: string;
  fullDescription: string;
  ingredients: string;
  usage: string;
  recommendedBy?: string;   // practitioner slug
};
```

**Sample products:**
1. Chamomile & Lavender Tea Blend — Teas, £12.50, Sleep / Relaxation
2. Echinacea Tincture — Tinctures, £18.00, Immune Support
3. Ashwagandha Capsules — Capsules, £22.00, Stress / Energy
4. Valerian Root Tincture — Tinctures, £16.50, Sleep
5. Turmeric & Black Pepper Capsules — Capsules, £19.00, Inflammation / Pain
6. Peppermint & Fennel Tea — Teas, £11.00, Digestion
7. Milk Thistle Tincture — Tinctures, £17.00, Liver Support / Detox
8. Elderberry Syrup — Tinctures, £15.00, Immune Support / Cold & Flu
9. Dried Nettle Leaf — Dried Herbs, £8.50, Allergies / Iron Support
10. Lemon Balm & Passionflower Tea — Teas, £13.00, Anxiety / Calm
11. Rhodiola Capsules — Capsules, £24.00, Energy / Fatigue
12. Hawthorn Berry Tincture — Tinctures, £18.50, Heart Health / Circulation

### Articles (6 total)

```typescript
type Article = {
  slug: string;
  title: string;
  author: string;           // practitioner slug
  category: "Herbal Medicine" | "Nutrition" | "Holistic Living" | "Seasonal Wellness";
  featuredImage: string;
  excerpt: string;
  content: string;          // markdown
  publishedDate: string;
};
```

**Sample articles:**
1. "Understanding Adaptogens: Nature's Stress Response" — Hector, Herbal Medicine
2. "A Seasonal Guide to Immune Health" — Thomas, Seasonal Wellness
3. "Gut Health: The Foundation of Wellbeing" — Hector, Nutrition
4. "Herbs for Hormonal Balance at Every Life Stage" — Amara, Herbal Medicine
5. "The Art of Herbal Tea Blending at Home" — Elena, Holistic Living
6. "Sleep Hygiene: Beyond Counting Sheep" — Priya, Holistic Living

### Prescriptions (2 sample)

```typescript
type Prescription = {
  id: string;
  practitioner: string;     // practitioner slug
  date: string;
  condition: string;
  notes: string;
  items: {
    herb: string;           // product slug or name
    form: string;           // e.g., "Tincture"
    dosage: string;         // e.g., "5ml twice daily"
    duration: string;       // e.g., "4 weeks"
  }[];
};
```

---

## 5. Integrations

### Stripe (Shop Payments)

**What:** Real payment processing for the herb shop using Stripe Checkout in test mode.

**How it works:**
1. Client clicks "Proceed to Checkout" on the cart page
2. A Next.js API route (`/api/checkout`) creates a Stripe Checkout Session with the cart line items (using inline `price_data` — no need to pre-create products in Stripe)
3. Client is redirected to Stripe's hosted checkout page (Stripe handles card form, validation, 3D Secure)
4. On successful payment → Stripe redirects to `/checkout/success`
5. On cancel → Stripe redirects back to `/cart`

**Technical requirements:**
- `stripe` npm package (server-side SDK)
- `@stripe/stripe-js` package (client-side, for redirect to Checkout)
- Stripe account with test mode API keys
- Environment variables: `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- API route: `app/api/checkout/route.ts`
- Success page: `app/checkout/success/page.tsx`

**Test mode:** Stripe provides test card numbers (e.g., `4242 4242 4242 4242`, any future expiry, any CVC) so the full checkout flow works end-to-end without real payments. Ideal for prototyping and demos.

**Architecture note:** This introduces the app's first server-side code via Next.js Route Handlers, which run as serverless functions on Vercel.

### Google Calendar (Bookings)

**What:** Calendar integration so practitioners and clients can track consultation appointments.

**Phase 1 — "Add to Google Calendar" links (Milestone 3):**
- When a booking is confirmed, the confirmation page displays "Add to Google Calendar" buttons
- Generates a `calendar.google.com/calendar/event?action=TEMPLATE&...` URL pre-filled with: practitioner name, service type, date/time, client name, and booking details
- Both client and practitioner can click to add the event to their personal Google Calendar
- Zero API complexity — pure URL construction, no API keys or OAuth needed
- Immediate value from day one

**Phase 2 — Google Calendar API (Milestone 8):**
- Practitioners connect their personal Google Calendar via OAuth in the practitioner portal
- When a booking is confirmed, an event is automatically created in the practitioner's calendar
- Availability page pulls real free/busy data from their connected calendar
- Requires: Google Cloud project, OAuth2 consent screen, API routes, token storage (database), refresh token handling
- Depends on Milestone 8 (database) for storing OAuth tokens

**Rationale for two phases:** Phase 1 delivers real calendar functionality with zero infrastructure overhead — perfect for the V1 prototype. Phase 2 requires a database for OAuth token storage (Milestone 8), which is the natural transition point from prototype to production application.

---

## 6. Milestones

### Milestone 1: Foundation + Homepage
- Next.js project setup (App Router, TypeScript, Tailwind)
- Design system configured (colours, fonts, spacing in Tailwind config)
- `SiteHeader` and `SiteFooter` components
- Homepage fully built (hero, pathway cards, featured practitioners, testimonials, latest articles, newsletter CTA)
- Mobile responsive
- Git init, commit, push to GitHub. Deploy to Vercel.
- **Testable:** Navigate to `/` and see a polished, complete homepage with working navigation links (pointing to placeholder pages). Live on Vercel.

### Milestone 2: Practitioners
- Herbalists directory page (`/herbalists`)
- Practitioner profile hub page (`/herbalists/[slug]`)
- `PractitionerCard`, `PractitionerHero`, `ServicesTable`, `ReviewCard`, `AvailabilityPreview` components
- All 5 practitioners with full dummy data
- Git commit + push. Vercel auto-deploys.
- **Testable:** Browse practitioners, click into each profile, see full details. Links to booking flow exist but lead to placeholder.

### Milestone 3: Booking Flow + Herb Shop + Integrations
- Multi-step booking flow (`/book`) with visual stepper
- Booking confirmation includes "Add to Google Calendar" links (Phase 1 integration)
- Shop grid page (`/shop`) with filter sidebar
- Product detail page (`/shop/[slug]`)
- Cart page (`/cart`) with Stripe Checkout integration (test mode)
- Checkout success page (`/checkout/success`)
- Stripe API route (`/api/checkout`) — first server-side code
- Cart state via React Context, cart icon shows live count in header
- 12 products with full dummy data
- Git commit + push. Vercel auto-deploys.
- **Testable:** Complete a full mock booking and see "Add to Google Calendar" link on confirmation. Browse shop, add items to cart, proceed to checkout via Stripe (use test card `4242 4242 4242 4242`), see success page. Real end-to-end e-commerce flow.

### Milestone 4: Learn + Contact
- Learn hub page (`/learn`) with category tabs
- Article page (`/learn/[slug]`)
- Contact page with form and map
- 6 articles with full dummy content
- Cross-links working (article author → practitioner profile)
- Git commit + push. Vercel auto-deploys.
- **Testable:** Browse articles by category, read full articles, click through to author profiles. Submit contact form (mock).

### Milestone 5: Client Account Area
- Auth toggle component (simulate logged-in state: client or practitioner role)
- Account dashboard (`/account`)
- Bookings, prescriptions, orders sub-pages
- Prescription detail with "Order These Herbs" flow
- Login page with role selector (Client / Practitioner)
- Git commit + push. Vercel auto-deploys.
- **Testable:** Toggle to client logged-in state, view dashboard, browse bookings/prescriptions/orders. Click "Order These Herbs" on a prescription to see items added to cart.

### Milestone 6: Practitioner Portal
- Practitioner dashboard (`/practitioner`)
- Availability management page with weekly calendar editor
- Appointments list page
- Prescription writing form
- Profile editor (edit own bio, qualifications, photo)
- Article editor (write/edit articles)
- Practitioner sidebar navigation
- Git commit + push. Vercel auto-deploys.
- **Testable:** Toggle to practitioner logged-in state. View practitioner dashboard, manage availability (toggle slots), browse appointments, write a prescription, edit profile, create an article draft. All visual/mock.

### Milestone 7: Visual Design Enhancement
A visual-only pass across the entire site based on Hector's feedback. No routing, data models, or page structure changes — just richer botanical visuals.

- **SVG Assets:** Create dandelion logo, botanical dividers, border accents, repeatable patterns, organic section transitions, individual herb illustrations.
- **New Components:** `DandelionWatermark`, `VideoPlaceholder`, `LatinName`, and all botanical SVG components in `src/components/svg/`.
- **Layout:** Dandelion icon added to `SiteHeader` and `SiteFooter` logos. Footer gains botanical pattern background and watermark. `SectionHeading` upgraded to `BotanicalDivider`.
- **Homepage:** Richer `HeroBanner` with botanical overlays. New video placeholder section. Organic wave transitions between sections. Testimonials with botanical framing. Newsletter CTA with pattern background and brand quote.
- **Practitioners:** Botanical accents on `PractitionerCard`, `PractitionerHero`, directory and profile pages. Organic dividers between profile sections.
- **Shop:** `latinName` field added to `Product` type. Latin names displayed on `ProductCard` and product detail pages. Unique Unsplash product images. Botanical framing on product detail.
- **Booking & Cart:** Organic vine connectors in `BookingStepper`. Botanical accents on booking confirmation and checkout success. Dandelion watermark on empty cart state.
- **Typography:** Latin botanical names in italic serif throughout (via `LatinName` component). Brand quotes from Hippocrates and Thoreau.
- **Inspiration:** Pukka Herbs (pukkaherbs.com) — rich hand-drawn botanical illustrations integrated into the brand identity. Hector's current site (hectorsherbs.com) — herb photography with Latin names (*Arctium lappa*, *Calendula officinalis*, etc.), ANP badge, naturopathic principles.
- Git commit + push. Vercel auto-deploys.
- **Testable:** All existing pages work identically but now feature botanical illustrations, dandelion branding throughout, organic section transitions, Latin names on products, and a video placeholder on the homepage. Visual richness without structural changes.

### Milestone 8: Database, Auth & Image Storage (Post-V1)
The transition from prototype to real application. This is the infrastructure foundation that everything beyond V1 depends on.

- **Database:** Set up hosted Postgres (Vercel Postgres, Supabase, or Neon) with Prisma or Drizzle ORM
- **Schema:** Migrate all dummy data into database tables — practitioners, products, articles, bookings, prescriptions, orders, users
- **Auth:** Replace simulated auth toggle with real authentication via Auth.js (NextAuth.js) — email/password and/or Google sign-in, with role-based access (client vs practitioner)
- **Image storage:** Set up Cloudinary, Vercel Blob, or AWS S3 for uploaded images (practitioner photos, product images, article featured images). `next/image` continues to handle frontend optimisation.
- **Data migration:** Seed the database with existing dummy data so the transition is seamless
- **API layer:** Replace direct TypeScript data imports with database queries (server components can query directly, client components via API routes)
- Git commit + push. Vercel auto-deploys.
- **Testable:** All existing pages work identically but are now backed by real database queries. Real login/signup works. Images can be uploaded and persisted. Data survives page refreshes and deploys.

### Milestone 9: Google Calendar OAuth Integration (Post-V1)
Full Google Calendar integration for practitioners. Requires Milestone 8 (database for token storage).

- Set up Google Cloud project with Calendar API enabled and OAuth2 consent screen
- Build OAuth flow: practitioner clicks "Connect Google Calendar" → Google consent screen → callback stores tokens in database
- On booking confirmation: automatically create a Google Calendar event in the practitioner's connected calendar (no click needed)
- Practitioner availability page pulls real free/busy data from their connected Google Calendar
- Handle token refresh (access tokens expire, refresh tokens are long-lived)
- Manage disconnection: practitioner can unlink their calendar
- Git commit + push. Vercel auto-deploys.
- **Testable:** Practitioner connects their Google Calendar in the portal. Client makes a booking. Event appears automatically in the practitioner's Google Calendar. Availability page shows real data.

### Future Considerations
- **Stripe Webhooks:** Listen for payment events (e.g., successful payment, refund) to update order status in real-time. Requires Milestone 8 database.
- **Email Notifications:** Send booking confirmations and order receipts via email (e.g., Resend, SendGrid).
- **Search:** Full-text search across products, articles, and practitioners.
- **Analytics:** Track popular products, busiest practitioners, conversion rates.
