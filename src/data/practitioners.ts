/*
  DUMMY DATA — Practitioners

  Each practitioner has a slug (URL-friendly ID), profile info,
  services with pricing, and client reviews. In a real app this
  would come from a database; here it's just a TypeScript array.
*/

export type Service = {
  name: string;
  duration: string;
  price: number;
  description: string;
};

export type Review = {
  clientName: string;
  rating: number;
  text: string;
  date: string;
};

export type Practitioner = {
  slug: string;
  name: string;
  title: string;
  photo: string;
  specialities: string[];
  tagline: string;
  bio: string;
  qualifications: string[];
  approach: string;
  services: Service[];
  reviews: Review[];
  articleSlugs: string[];
};

export const practitioners: Practitioner[] = [
  {
    slug: "hector",
    name: "Hector",
    title: "Naturopathic Herbalist & Founder",
    photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face",
    specialities: ["Digestive Health", "Chronic Fatigue", "Immune Support"],
    tagline: "Getting to the root cause of your symptoms through traditional herbal wisdom",
    bio: "As the founder of Hector's Herbs, I've dedicated my career to understanding the intricate connections between plants and human health. With over a decade of experience in naturopathic herbalism, I believe that the body has an innate ability to heal when given the right support.\n\nMy approach combines traditional herbal knowledge with modern nutritional science. I take the time to understand each client's unique health picture, looking beyond symptoms to find the underlying causes of imbalance.\n\nI'm particularly passionate about digestive health, as I believe a healthy gut is the foundation of overall wellbeing. Whether you're dealing with chronic fatigue, immune challenges, or digestive discomfort, I'm here to guide you on your path back to vitality.",
    qualifications: [
      "BSc (Hons) Herbal Medicine, University of Westminster",
      "Member, Association of Naturopathic Practitioners (ANP)",
      "Diploma in Naturopathic Nutrition",
    ],
    approach:
      "I take a holistic, root-cause approach to health. Rather than simply addressing symptoms, I work with you to understand the underlying factors affecting your wellbeing. Together, we'll create a personalised herbal protocol tailored to your specific needs.",
    services: [
      {
        name: "Initial Consultation",
        duration: "60 minutes",
        price: 95,
        description:
          "A comprehensive first session where we review your health history, current concerns, and lifestyle. You'll leave with a personalised herbal prescription and wellness plan.",
      },
      {
        name: "Follow-Up Consultation",
        duration: "30 minutes",
        price: 55,
        description:
          "A check-in to assess your progress, adjust your herbal prescription if needed, and address any new concerns.",
      },
      {
        name: "Herbal Review",
        duration: "45 minutes",
        price: 70,
        description:
          "An in-depth review of your current herbal protocol with adjustments based on your progress and evolving needs.",
      },
    ],
    reviews: [
      {
        clientName: "Sarah M.",
        rating: 5,
        text: "Hector completely transformed my digestive health. After years of discomfort, his herbal protocol made a remarkable difference within just a few weeks.",
        date: "2024-11-15",
      },
      {
        clientName: "James K.",
        rating: 5,
        text: "I was sceptical about herbal medicine, but Hector's thorough approach and deep knowledge won me over. My energy levels have never been better.",
        date: "2024-10-22",
      },
      {
        clientName: "Olivia R.",
        rating: 4,
        text: "Very knowledgeable and caring practitioner. The consultation was thorough and I felt truly listened to. Highly recommend.",
        date: "2024-09-18",
      },
    ],
    articleSlugs: ["understanding-adaptogens", "gut-health-foundation"],
  },
  {
    slug: "amara-osei",
    name: "Amara Osei",
    title: "Herbalist & Nutritionist",
    photo: "https://images.unsplash.com/photo-1594824476967-48c8b964ac31?w=400&h=400&fit=crop&crop=face",
    specialities: ["Women's Health", "Hormonal Balance", "Fertility"],
    tagline: "Supporting women's health naturally through every stage of life",
    bio: "I'm passionate about empowering women to take control of their health using the wisdom of herbal medicine. My practice focuses on the unique hormonal landscape of women's bodies, from menstrual health and fertility to menopause and beyond.\n\nWith a background in both herbalism and clinical nutrition, I take an integrative approach that addresses the whole person. I believe that when we work with the body's natural rhythms, profound healing becomes possible.\n\nEvery woman's journey is different, and I pride myself on creating truly personalised protocols that honour your individual needs and goals.",
    qualifications: [
      "BSc Herbal Medicine, Middlesex University",
      "Diploma in Nutritional Therapy",
      "Member, Association of Naturopathic Practitioners (ANP)",
    ],
    approach:
      "My practice is centred on women's health and hormonal wellbeing. I combine herbal medicine with nutritional therapy to create comprehensive protocols that support your body's natural balance.",
    services: [
      {
        name: "Initial Consultation",
        duration: "60 minutes",
        price: 90,
        description:
          "A detailed first session covering your hormonal health history, menstrual patterns, lifestyle factors, and health goals.",
      },
      {
        name: "Follow-Up Consultation",
        duration: "30 minutes",
        price: 50,
        description:
          "A progress review to fine-tune your herbal and nutritional protocol.",
      },
      {
        name: "Fertility Support Package",
        duration: "90 minutes",
        price: 120,
        description:
          "A comprehensive fertility-focused consultation with detailed herbal and nutritional planning for conception support.",
      },
    ],
    reviews: [
      {
        clientName: "Emma T.",
        rating: 5,
        text: "Amara's support through my fertility journey was invaluable. Her herbal protocols and nutritional guidance helped me feel empowered and hopeful.",
        date: "2024-12-01",
      },
      {
        clientName: "Priyanka D.",
        rating: 5,
        text: "Finally someone who understands hormonal health! Amara's approach is gentle, thorough, and incredibly effective.",
        date: "2024-11-08",
      },
    ],
    articleSlugs: ["herbs-hormonal-balance"],
  },
  {
    slug: "thomas-whitfield",
    name: "Thomas Whitfield",
    title: "Medical Herbalist",
    photo: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face",
    specialities: ["Respiratory Health", "Allergies", "Skin Conditions"],
    tagline: "Evidence-based herbal medicine for respiratory and skin health",
    bio: "With a strong foundation in both traditional herbalism and modern phytotherapy research, I specialise in conditions affecting the respiratory system and skin. These two systems are deeply connected, and I find that addressing one often brings improvements in the other.\n\nMy approach is evidence-based, drawing on the latest research in herbal medicine while respecting the centuries of traditional knowledge that underpin our practice. I believe in transparency and education — I want my clients to understand not just what they're taking, but why.\n\nWhether you're dealing with chronic allergies, eczema, asthma, or other respiratory or skin concerns, I'm here to help you find natural, effective solutions.",
    qualifications: [
      "MSc Herbal Medicine, University of East London",
      "BSc Biomedical Science",
      "Member, National Institute of Medical Herbalists (NIMH)",
      "Member, Association of Naturopathic Practitioners (ANP)",
    ],
    approach:
      "I combine traditional herbal wisdom with current scientific research. My protocols are evidence-based, carefully formulated, and clearly explained so you understand every step of your healing journey.",
    services: [
      {
        name: "Initial Consultation",
        duration: "60 minutes",
        price: 95,
        description:
          "A thorough assessment of your respiratory or skin health, including environmental factors, triggers, and a detailed health history.",
      },
      {
        name: "Follow-Up Consultation",
        duration: "30 minutes",
        price: 55,
        description:
          "Review your progress and adjust your protocol as needed.",
      },
    ],
    reviews: [
      {
        clientName: "Daniel F.",
        rating: 5,
        text: "Thomas helped me manage my chronic eczema when nothing else worked. His approach is scientific yet holistic — exactly what I needed.",
        date: "2024-10-30",
      },
      {
        clientName: "Lucy W.",
        rating: 4,
        text: "Very thorough and knowledgeable. Thomas took the time to explain everything and his herbal protocol for my hay fever has been a game-changer.",
        date: "2024-08-15",
      },
    ],
    articleSlugs: ["seasonal-immune-health"],
  },
  {
    slug: "priya-sharma",
    name: "Priya Sharma",
    title: "Naturopath",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face",
    specialities: ["Stress & Anxiety", "Sleep Disorders", "Mental Wellbeing"],
    tagline: "Calming the mind and restoring balance through nature's remedies",
    bio: "In our fast-paced modern world, stress and sleep issues have become epidemic. My practice is dedicated to helping people find calm, restore their natural sleep patterns, and build resilience against the pressures of daily life.\n\nI draw on a wide range of naturopathic tools — from adaptogenic herbs and nervine tonics to breathing techniques and lifestyle medicine. I believe that true mental wellbeing comes from addressing the physical, emotional, and environmental factors that affect our nervous system.\n\nMy consulting room is a calm, safe space where you can share your concerns openly. Together, we'll build a plan that helps you not just cope, but truly thrive.",
    qualifications: [
      "Diploma in Naturopathic Medicine, College of Naturopathic Medicine",
      "Certificate in Mindfulness-Based Stress Reduction",
      "Member, Association of Naturopathic Practitioners (ANP)",
    ],
    approach:
      "I specialise in nervous system health, using calming herbs, adaptogens, and lifestyle strategies to help you manage stress, improve sleep, and find your natural equilibrium.",
    services: [
      {
        name: "Initial Consultation",
        duration: "60 minutes",
        price: 85,
        description:
          "An in-depth exploration of your stress patterns, sleep history, and mental wellbeing, followed by a personalised protocol.",
      },
      {
        name: "Follow-Up Consultation",
        duration: "30 minutes",
        price: 50,
        description:
          "Check in on your progress and refine your herbal and lifestyle plan.",
      },
      {
        name: "Stress Reset Session",
        duration: "75 minutes",
        price: 100,
        description:
          "An extended session combining herbal consultation with guided relaxation techniques and breathwork.",
      },
    ],
    reviews: [
      {
        clientName: "Michael H.",
        rating: 5,
        text: "Priya's calming presence alone is therapeutic. Her herbal protocol for my insomnia has been life-changing — I'm sleeping through the night for the first time in years.",
        date: "2024-11-20",
      },
      {
        clientName: "Anna C.",
        rating: 5,
        text: "I came to Priya overwhelmed with anxiety. Her holistic approach — herbs, breathing techniques, and practical lifestyle changes — has made a world of difference.",
        date: "2024-09-05",
      },
    ],
    articleSlugs: ["sleep-hygiene"],
  },
  {
    slug: "elena-vasquez",
    name: "Elena Vasquez",
    title: "Herbalist",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
    specialities: [
      "Pain Management",
      "Musculoskeletal Health",
      "Sports Recovery",
    ],
    tagline: "Natural solutions for pain, movement, and physical recovery",
    bio: "Movement is life, and when pain or injury limits our ability to move freely, it affects every aspect of our wellbeing. My practice focuses on helping people manage pain naturally, recover from injuries, and maintain musculoskeletal health through herbal medicine.\n\nBefore training as a herbalist, I worked as a sports massage therapist, which gave me a deep understanding of the musculoskeletal system. I bring this physical knowledge to my herbal practice, creating protocols that address both the internal and external aspects of pain and recovery.\n\nWhether you're an athlete looking to optimise recovery, someone dealing with chronic pain, or simply wanting to move more freely, I can help you find natural, effective solutions.",
    qualifications: [
      "BSc (Hons) Herbal Medicine, Lincoln University",
      "Diploma in Sports Massage Therapy",
      "Member, Association of Naturopathic Practitioners (ANP)",
    ],
    approach:
      "I combine internal herbal medicine with topical preparations and practical movement advice. My protocols address pain at its source, supporting the body's natural healing processes.",
    services: [
      {
        name: "Initial Consultation",
        duration: "60 minutes",
        price: 90,
        description:
          "A full assessment of your pain patterns, movement history, and physical health, followed by a tailored herbal protocol.",
      },
      {
        name: "Follow-Up Consultation",
        duration: "30 minutes",
        price: 50,
        description:
          "Progress review and protocol adjustments based on your recovery.",
      },
      {
        name: "Sports Recovery Package",
        duration: "45 minutes",
        price: 75,
        description:
          "Focused consultation for athletes — herbal support for training recovery, injury prevention, and performance.",
      },
    ],
    reviews: [
      {
        clientName: "Chris B.",
        rating: 5,
        text: "Elena's herbal protocol for my chronic back pain has been far more effective than the painkillers I was relying on. I wish I'd found her sooner.",
        date: "2024-12-10",
      },
      {
        clientName: "Sophie L.",
        rating: 4,
        text: "As a runner, recovery is everything. Elena's sports protocol has noticeably improved my recovery times and reduced joint inflammation.",
        date: "2024-10-12",
      },
    ],
    articleSlugs: ["herbal-tea-blending"],
  },
];
