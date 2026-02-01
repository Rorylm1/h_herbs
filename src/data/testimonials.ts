/*
  DUMMY DATA — Testimonials for the homepage carousel.
  These are separate from practitioner-specific reviews.
*/

export type Testimonial = {
  clientName: string;
  text: string;
  condition: string;
  practitioner: string;
};

export const testimonials: Testimonial[] = [
  {
    clientName: "Sarah M.",
    text: "After years of digestive issues, Hector's herbal protocol completely transformed my health. Within weeks I felt like a new person. I can't recommend Hector's Herbs enough.",
    condition: "Digestive Health",
    practitioner: "Hector",
  },
  {
    clientName: "Emma T.",
    text: "Amara supported me through my fertility journey with such care and expertise. Her herbal protocols and nutritional guidance helped me feel empowered and hopeful during a difficult time.",
    condition: "Fertility Support",
    practitioner: "Amara Osei",
  },
  {
    clientName: "Michael H.",
    text: "I'd tried everything for my insomnia — Priya's herbal protocol finally gave me the deep, restorative sleep I'd been missing for years. Her holistic approach changed my life.",
    condition: "Sleep & Anxiety",
    practitioner: "Priya Sharma",
  },
  {
    clientName: "Daniel F.",
    text: "Thomas helped me manage my chronic eczema when conventional treatments had plateaued. His scientific yet holistic approach was exactly what I needed.",
    condition: "Skin Health",
    practitioner: "Thomas Whitfield",
  },
  {
    clientName: "Chris B.",
    text: "Elena's herbal protocol for my chronic back pain has been far more effective than the painkillers I was relying on. I'm moving freely again and I wish I'd found her sooner.",
    condition: "Pain Management",
    practitioner: "Elena Vasquez",
  },
];
