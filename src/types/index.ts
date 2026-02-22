// Shared type definitions for Hector's Herbs.
// These mirror the shapes returned by Prisma queries
// (with JSON columns cast to typed objects).

// ── Product ──

export type Product = {
  slug: string;
  name: string;
  category: "Tinctures" | "Teas" | "Capsules" | "Dried Herbs";
  concerns: string[];
  price: number;
  image: string;
  shortDescription: string;
  fullDescription: string;
  ingredients: string;
  usage: string;
  recommendedBy?: string | null;
  latinName?: string | null;
};

// ── Practitioner ──

export type Certification = {
  body: string;
  abbreviation: string;
  type: string;
  year?: number;
};

export type Service = {
  name: string;
  duration: string;
  price: number;
  description: string;
};

export type Review = {
  id: string;
  clientName: string;
  text: string;
  condition: string;
  rating: number;
  date: string;
};

export type Practitioner = {
  slug: string;
  name: string;
  title: string;
  photo: string;
  instagram: string;
  specialities: string[];
  tagline: string;
  bio: string;
  qualifications: string[];
  certifications: Certification[];
  approach: string;
  services: Service[];
  reviews?: Review[];
};

// ── Booking ──

export type Booking = {
  id: string;
  practitionerSlug: string;
  clientName: string;
  service: string;
  date: string;
  time: string;
  status: "upcoming" | "completed" | "cancelled";
  notes?: string | null;
};

// ── Order ──

export type OrderItem = {
  name: string;
  quantity: number;
  price: number;
};

export type Order = {
  id: string;
  date: string;
  items: OrderItem[];
  total: number;
  status: "processing" | "shipped" | "delivered";
  tracking?: string | null;
};

// ── Prescription ──

export type PrescriptionHerb = {
  name: string;
  slug?: string;
  dosage: string;
  frequency: string;
  duration: string;
};

export type Prescription = {
  id: string;
  practitionerSlug: string;
  clientName: string;
  date: string;
  condition: string;
  notes: string;
  herbs: PrescriptionHerb[];
  status: "active" | "completed" | "expired";
};

// ── Article ──

export type ArticleCardData = {
  slug: string;
  title: string;
  author: string;
  authorName?: string;
  category: string;
  featuredImage: string;
  excerpt: string;
  content: string;
  publishedDate: string | Date;
};
