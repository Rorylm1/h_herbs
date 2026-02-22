/*
  DUMMY DATA — Client Prescriptions

  Prescriptions are herbal protocols created by practitioners after
  consultations. Each prescription lists the herbs, dosages, and
  duration, plus practitioner notes.

  The productSlug field links to shop products where available,
  enabling the "Order These Herbs" feature.
*/

export type PrescriptionItem = {
  herb: string;           // Display name of the herb
  productSlug?: string;   // Links to shop product if we stock it
  form: string;           // Tincture, Tea, Capsules, etc.
  dosage: string;         // e.g., "5ml twice daily"
  duration: string;       // e.g., "4 weeks"
};

export type Prescription = {
  id: string;
  practitionerSlug: string;
  date: string;           // ISO date string
  condition: string;      // What the prescription is addressing
  notes: string;          // Practitioner's guidance notes
  items: PrescriptionItem[];
};

export const prescriptions: Prescription[] = [
  {
    id: "rx-001",
    practitionerSlug: "hector",
    date: "2026-01-15",
    condition: "Stress & Sleep Support",
    notes: "Start with the ashwagandha in the morning and chamomile tea before bed. If sleep doesn't improve after 2 weeks, we can add valerian. Reduce caffeine intake where possible and try to maintain a consistent bedtime. We'll review progress at your follow-up appointment.",
    items: [
      {
        herb: "Ashwagandha",
        productSlug: "ashwagandha-capsules",
        form: "Capsules",
        dosage: "1 capsule twice daily with food",
        duration: "8 weeks",
      },
      {
        herb: "Chamomile & Lavender",
        productSlug: "chamomile-lavender-tea",
        form: "Tea",
        dosage: "1 cup 30 minutes before bed",
        duration: "Ongoing",
      },
      {
        herb: "Lemon Balm & Passionflower",
        productSlug: "lemon-balm-passionflower-tea",
        form: "Tea",
        dosage: "1 cup in the afternoon if feeling anxious",
        duration: "As needed",
      },
    ],
  },
  {
    id: "rx-002",
    practitionerSlug: "hector",
    date: "2026-01-29",
    condition: "Digestive Support",
    notes: "The peppermint tea should help with bloating after meals. Take the milk thistle consistently for liver support — this is especially important given your history. Avoid eating large meals late in the evening and try to chew food thoroughly.",
    items: [
      {
        herb: "Peppermint & Fennel",
        productSlug: "peppermint-fennel-tea",
        form: "Tea",
        dosage: "1 cup after meals",
        duration: "4 weeks",
      },
      {
        herb: "Milk Thistle",
        productSlug: "milk-thistle-tincture",
        form: "Tincture",
        dosage: "5ml in water, twice daily before meals",
        duration: "6 weeks",
      },
      {
        herb: "Slippery Elm",
        form: "Powder",
        dosage: "1 teaspoon mixed in warm water, morning",
        duration: "4 weeks",
      },
    ],
  },
  {
    id: "rx-003",
    practitionerSlug: "priya-sharma",
    date: "2025-12-10",
    condition: "Anxiety & Nervous Tension",
    notes: "This protocol focuses on calming the nervous system and building resilience. The rhodiola will help with energy without being stimulating. Practice the breathing exercises we discussed and try to spend some time outdoors each day.",
    items: [
      {
        herb: "Ashwagandha",
        productSlug: "ashwagandha-capsules",
        form: "Capsules",
        dosage: "1 capsule twice daily",
        duration: "12 weeks",
      },
      {
        herb: "Rhodiola",
        productSlug: "rhodiola-capsules",
        form: "Capsules",
        dosage: "1 capsule in the morning",
        duration: "8 weeks",
      },
      {
        herb: "Valerian",
        productSlug: "valerian-root-tincture",
        form: "Tincture",
        dosage: "2.5ml before bed if sleep is disturbed",
        duration: "As needed",
      },
    ],
  },
];

/*
  Helper to get a prescription by ID.
*/
export function getPrescriptionById(id: string): Prescription | undefined {
  return prescriptions.find((p) => p.id === id);
}

/*
  Get all prescriptions sorted by date (most recent first).
*/
export function getPrescriptionsSorted(): Prescription[] {
  return [...prescriptions].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}
