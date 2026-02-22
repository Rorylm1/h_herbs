import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DIRECT_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  // ─── PRACTITIONERS ──────────────────────────────────────
  const practitionersData = [
    {
      slug: "hector",
      name: "Hector",
      title: "Naturopathic Herbalist & Founder",
      photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face",
      instagram: "hectorsherbs",
      specialities: ["Digestive Health", "Chronic Fatigue", "Immune Support"],
      tagline: "Getting to the root cause of your symptoms through traditional herbal wisdom",
      bio: "As the founder of Hector's Herbs, I've dedicated my career to understanding the intricate connections between plants and human health. With over a decade of experience in naturopathic herbalism, I believe that the body has an innate ability to heal when given the right support.\n\nMy approach combines traditional herbal knowledge with modern nutritional science. I take the time to understand each client's unique health picture, looking beyond symptoms to find the underlying causes of imbalance.\n\nI'm particularly passionate about digestive health, as I believe a healthy gut is the foundation of overall wellbeing. Whether you're dealing with chronic fatigue, immune challenges, or digestive discomfort, I'm here to guide you on your path back to vitality.",
      qualifications: [
        "BSc (Hons) Herbal Medicine, University of Westminster",
        "Diploma in Naturopathic Nutrition",
      ],
      certifications: [
        { body: "Association of Naturopathic Practitioners", abbreviation: "ANP", type: "Registered Member", year: 2014 },
        { body: "Complementary & Natural Healthcare Council", abbreviation: "CNHC", type: "Registered Practitioner", year: 2015 },
        { body: "Professional Indemnity Insurance", abbreviation: "PLI", type: "Fully Insured" },
        { body: "Disclosure and Barring Service", abbreviation: "DBS", type: "Enhanced Check" },
      ],
      approach: "I take a holistic, root-cause approach to health. Rather than simply addressing symptoms, I work with you to understand the underlying factors affecting your wellbeing. Together, we'll create a personalised herbal protocol tailored to your specific needs.",
      services: [
        { name: "Initial Consultation", duration: "60 minutes", price: 95, description: "A comprehensive first session where we review your health history, current concerns, and lifestyle. You'll leave with a personalised herbal prescription and wellness plan." },
        { name: "Follow-Up Consultation", duration: "30 minutes", price: 55, description: "A check-in to assess your progress, adjust your herbal prescription if needed, and address any new concerns." },
        { name: "Herbal Review", duration: "45 minutes", price: 70, description: "An in-depth review of your current herbal protocol with adjustments based on your progress and evolving needs." },
      ],
    },
    {
      slug: "amara-osei",
      name: "Amara Osei",
      title: "Herbalist & Nutritionist",
      photo: "https://images.unsplash.com/photo-1594824476967-48c8b964ac31?w=400&h=400&fit=crop&crop=face",
      instagram: "amara.herbs",
      specialities: ["Women's Health", "Hormonal Balance", "Fertility"],
      tagline: "Supporting women's health naturally through every stage of life",
      bio: "I'm passionate about empowering women to take control of their health using the wisdom of herbal medicine. My practice focuses on the unique hormonal landscape of women's bodies, from menstrual health and fertility to menopause and beyond.\n\nWith a background in both herbalism and clinical nutrition, I take an integrative approach that addresses the whole person. I believe that when we work with the body's natural rhythms, profound healing becomes possible.\n\nEvery woman's journey is different, and I pride myself on creating truly personalised protocols that honour your individual needs and goals.",
      qualifications: [
        "BSc Herbal Medicine, Middlesex University",
        "Diploma in Nutritional Therapy",
      ],
      certifications: [
        { body: "Association of Naturopathic Practitioners", abbreviation: "ANP", type: "Registered Member", year: 2017 },
        { body: "British Association for Nutrition & Lifestyle Medicine", abbreviation: "BANT", type: "Registered Nutritionist", year: 2018 },
        { body: "Professional Indemnity Insurance", abbreviation: "PLI", type: "Fully Insured" },
      ],
      approach: "My practice is centred on women's health and hormonal wellbeing. I combine herbal medicine with nutritional therapy to create comprehensive protocols that support your body's natural balance.",
      services: [
        { name: "Initial Consultation", duration: "60 minutes", price: 90, description: "A detailed first session covering your hormonal health history, menstrual patterns, lifestyle factors, and health goals." },
        { name: "Follow-Up Consultation", duration: "30 minutes", price: 50, description: "A progress review to fine-tune your herbal and nutritional protocol." },
        { name: "Fertility Support Package", duration: "90 minutes", price: 120, description: "A comprehensive fertility-focused consultation with detailed herbal and nutritional planning for conception support." },
      ],
    },
    {
      slug: "thomas-whitfield",
      name: "Thomas Whitfield",
      title: "Medical Herbalist",
      photo: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face",
      instagram: "thomas.herbalist",
      specialities: ["Respiratory Health", "Allergies", "Skin Conditions"],
      tagline: "Evidence-based herbal medicine for respiratory and skin health",
      bio: "With a strong foundation in both traditional herbalism and modern phytotherapy research, I specialise in conditions affecting the respiratory system and skin. These two systems are deeply connected, and I find that addressing one often brings improvements in the other.\n\nMy approach is evidence-based, drawing on the latest research in herbal medicine while respecting the centuries of traditional knowledge that underpin our practice. I believe in transparency and education — I want my clients to understand not just what they're taking, but why.\n\nWhether you're dealing with chronic allergies, eczema, asthma, or other respiratory or skin concerns, I'm here to help you find natural, effective solutions.",
      qualifications: [
        "MSc Herbal Medicine, University of East London",
        "BSc Biomedical Science",
      ],
      certifications: [
        { body: "National Institute of Medical Herbalists", abbreviation: "NIMH", type: "Fellow Member", year: 2013 },
        { body: "Association of Naturopathic Practitioners", abbreviation: "ANP", type: "Registered Member", year: 2014 },
        { body: "Complementary & Natural Healthcare Council", abbreviation: "CNHC", type: "Registered Practitioner", year: 2014 },
        { body: "Professional Indemnity Insurance", abbreviation: "PLI", type: "Fully Insured" },
        { body: "Disclosure and Barring Service", abbreviation: "DBS", type: "Enhanced Check" },
      ],
      approach: "I combine traditional herbal wisdom with current scientific research. My protocols are evidence-based, carefully formulated, and clearly explained so you understand every step of your healing journey.",
      services: [
        { name: "Initial Consultation", duration: "60 minutes", price: 95, description: "A thorough assessment of your respiratory or skin health, including environmental factors, triggers, and a detailed health history." },
        { name: "Follow-Up Consultation", duration: "30 minutes", price: 55, description: "Review your progress and adjust your protocol as needed." },
      ],
    },
    {
      slug: "priya-sharma",
      name: "Priya Sharma",
      title: "Naturopath",
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face",
      instagram: "priya.naturopath",
      specialities: ["Stress & Anxiety", "Sleep Disorders", "Mental Wellbeing"],
      tagline: "Calming the mind and restoring balance through nature's remedies",
      bio: "In our fast-paced modern world, stress and sleep issues have become epidemic. My practice is dedicated to helping people find calm, restore their natural sleep patterns, and build resilience against the pressures of daily life.\n\nI draw on a wide range of naturopathic tools — from adaptogenic herbs and nervine tonics to breathing techniques and lifestyle medicine. I believe that true mental wellbeing comes from addressing the physical, emotional, and environmental factors that affect our nervous system.\n\nMy consulting room is a calm, safe space where you can share your concerns openly. Together, we'll build a plan that helps you not just cope, but truly thrive.",
      qualifications: [
        "Diploma in Naturopathic Medicine, College of Naturopathic Medicine",
        "Certificate in Mindfulness-Based Stress Reduction",
      ],
      certifications: [
        { body: "Association of Naturopathic Practitioners", abbreviation: "ANP", type: "Registered Member", year: 2019 },
        { body: "General Naturopathic Council", abbreviation: "GNC", type: "Registered Naturopath", year: 2019 },
        { body: "Professional Indemnity Insurance", abbreviation: "PLI", type: "Fully Insured" },
      ],
      approach: "I specialise in nervous system health, using calming herbs, adaptogens, and lifestyle strategies to help you manage stress, improve sleep, and find your natural equilibrium.",
      services: [
        { name: "Initial Consultation", duration: "60 minutes", price: 85, description: "An in-depth exploration of your stress patterns, sleep history, and mental wellbeing, followed by a personalised protocol." },
        { name: "Follow-Up Consultation", duration: "30 minutes", price: 50, description: "Check in on your progress and refine your herbal and lifestyle plan." },
        { name: "Stress Reset Session", duration: "75 minutes", price: 100, description: "An extended session combining herbal consultation with guided relaxation techniques and breathwork." },
      ],
    },
    {
      slug: "elena-vasquez",
      name: "Elena Vasquez",
      title: "Herbalist",
      photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
      instagram: "elena.herbalhealing",
      specialities: ["Pain Management", "Musculoskeletal Health", "Sports Recovery"],
      tagline: "Natural solutions for pain, movement, and physical recovery",
      bio: "Movement is life, and when pain or injury limits our ability to move freely, it affects every aspect of our wellbeing. My practice focuses on helping people manage pain naturally, recover from injuries, and maintain musculoskeletal health through herbal medicine.\n\nBefore training as a herbalist, I worked as a sports massage therapist, which gave me a deep understanding of the musculoskeletal system. I bring this physical knowledge to my herbal practice, creating protocols that address both the internal and external aspects of pain and recovery.\n\nWhether you're an athlete looking to optimise recovery, someone dealing with chronic pain, or simply wanting to move more freely, I can help you find natural, effective solutions.",
      qualifications: [
        "BSc (Hons) Herbal Medicine, Lincoln University",
        "Diploma in Sports Massage Therapy",
      ],
      certifications: [
        { body: "Association of Naturopathic Practitioners", abbreviation: "ANP", type: "Registered Member", year: 2020 },
        { body: "Sports Massage Association", abbreviation: "SMA", type: "Full Member", year: 2016 },
        { body: "Professional Indemnity Insurance", abbreviation: "PLI", type: "Fully Insured" },
        { body: "Disclosure and Barring Service", abbreviation: "DBS", type: "Enhanced Check" },
      ],
      approach: "I combine internal herbal medicine with topical preparations and practical movement advice. My protocols address pain at its source, supporting the body's natural healing processes.",
      services: [
        { name: "Initial Consultation", duration: "60 minutes", price: 90, description: "A full assessment of your pain patterns, movement history, and physical health, followed by a tailored herbal protocol." },
        { name: "Follow-Up Consultation", duration: "30 minutes", price: 50, description: "Progress review and protocol adjustments based on your recovery." },
        { name: "Sports Recovery Package", duration: "45 minutes", price: 75, description: "Focused consultation for athletes — herbal support for training recovery, injury prevention, and performance." },
      ],
    },
  ];

  for (const p of practitionersData) {
    await prisma.practitioner.upsert({
      where: { slug: p.slug },
      update: p,
      create: p,
    });
  }
  console.log(`  ✓ ${practitionersData.length} practitioners`);

  // ─── PRODUCTS ───────────────────────────────────────────
  const productsData = [
    { slug: "chamomile-lavender-tea", name: "Chamomile & Lavender Tea Blend", latinName: "Matricaria chamomilla, Lavandula angustifolia", category: "Teas", concerns: ["Sleep", "Relaxation"], price: 12.5, image: "https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?w=600&h=600&fit=crop", shortDescription: "A soothing bedtime blend to calm the mind and promote restful sleep.", fullDescription: "Our signature Chamomile & Lavender blend combines two of nature's most beloved calming herbs. Chamomile (Matricaria chamomilla) has been used for centuries as a gentle nervine and digestive soother, while lavender (Lavandula angustifolia) brings its renowned relaxing aroma and mild sedative properties. Together, they create a beautifully fragrant cup that's perfect for your evening wind-down ritual.", ingredients: "Organic chamomile flowers, organic lavender buds", usage: "Steep 1-2 teaspoons in freshly boiled water for 5-7 minutes. Enjoy 30 minutes before bedtime.", recommendedBy: "priya-sharma" },
    { slug: "echinacea-tincture", name: "Echinacea Tincture", latinName: "Echinacea purpurea", category: "Tinctures", concerns: ["Immune Support"], price: 18.0, image: "https://images.unsplash.com/photo-1471943311424-646960669fbc?w=600&h=600&fit=crop", shortDescription: "A potent immune-boosting tincture made from organic Echinacea purpurea.", fullDescription: "Our Echinacea tincture is crafted from the whole flowering plant of Echinacea purpurea, harvested at peak potency. Echinacea is one of the most well-researched herbs for immune support, known for its ability to stimulate the body's natural defence mechanisms. This tincture is ideal for use at the first signs of seasonal challenges or as part of a daily immune-support routine.", ingredients: "Echinacea purpurea (whole plant), organic grain alcohol, spring water", usage: "Take 2.5ml (half a teaspoon) in a little water, 3 times daily. At the onset of symptoms, dose can be increased to every 2 hours for the first day.", recommendedBy: "hector" },
    { slug: "ashwagandha-capsules", name: "Ashwagandha Capsules", latinName: "Withania somnifera", category: "Capsules", concerns: ["Stress", "Energy"], price: 22.0, image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&h=600&fit=crop", shortDescription: "Adaptogenic support for stress resilience and sustained energy.", fullDescription: "Ashwagandha (Withania somnifera) is one of the most prized adaptogens in Ayurvedic medicine. Our capsules contain high-quality KSM-66 ashwagandha root extract, standardised for active withanolides. This remarkable herb helps the body adapt to stress while supporting healthy energy levels, cognitive function, and overall vitality without the jittery effects of stimulants.", ingredients: "KSM-66 Ashwagandha root extract (600mg), vegetable cellulose capsule", usage: "Take 1 capsule twice daily with food. Best taken consistently for 4-8 weeks for full adaptogenic benefits.", recommendedBy: "priya-sharma" },
    { slug: "valerian-root-tincture", name: "Valerian Root Tincture", latinName: "Valeriana officinalis", category: "Tinctures", concerns: ["Sleep"], price: 16.5, image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&h=600&fit=crop", shortDescription: "A powerful sleep aid from nature's strongest sedative herb.", fullDescription: "Valerian root (Valeriana officinalis) has been used since ancient Greek and Roman times as a natural sleep remedy. Our tincture is made from sustainably harvested valerian root, carefully extracted to preserve its full spectrum of active compounds including valerenic acid. It works by supporting GABA activity in the brain, promoting a natural, deep sleep without morning grogginess.", ingredients: "Valerian root (Valeriana officinalis), organic grain alcohol, spring water", usage: "Take 2.5-5ml in warm water 30-60 minutes before bedtime. Can be combined with our Chamomile & Lavender tea for enhanced effect.", recommendedBy: null },
    { slug: "turmeric-black-pepper-capsules", name: "Turmeric & Black Pepper Capsules", latinName: "Curcuma longa, Piper nigrum", category: "Capsules", concerns: ["Inflammation", "Pain"], price: 19.0, image: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=600&h=600&fit=crop", shortDescription: "Anti-inflammatory support with enhanced bioavailability.", fullDescription: "Our Turmeric & Black Pepper capsules combine high-strength turmeric root extract (standardised to 95% curcuminoids) with black pepper extract (piperine) to enhance absorption by up to 2000%. Curcumin, the active compound in turmeric, is one of nature's most potent anti-inflammatory agents, supporting joint health, digestive comfort, and overall wellbeing.", ingredients: "Turmeric root extract (500mg, 95% curcuminoids), black pepper extract (10mg, 95% piperine), vegetable cellulose capsule", usage: "Take 1 capsule twice daily with food.", recommendedBy: "elena-vasquez" },
    { slug: "peppermint-fennel-tea", name: "Peppermint & Fennel Tea", latinName: "Mentha piperita, Foeniculum vulgare", category: "Teas", concerns: ["Digestion"], price: 11.0, image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=600&h=600&fit=crop", shortDescription: "A refreshing digestive blend to ease bloating and discomfort.", fullDescription: "This classic digestive duo brings together peppermint (Mentha piperita) and fennel seed (Foeniculum vulgare) for a refreshing, carminative tea. Peppermint relaxes the smooth muscles of the digestive tract while fennel helps dispel gas and ease bloating. Together, they make the perfect after-meal brew or a gentle daily digestive tonic.", ingredients: "Organic peppermint leaves, organic fennel seeds", usage: "Steep 1-2 teaspoons in freshly boiled water for 5-10 minutes. Best enjoyed after meals.", recommendedBy: "hector" },
    { slug: "milk-thistle-tincture", name: "Milk Thistle Tincture", latinName: "Silybum marianum", category: "Tinctures", concerns: ["Liver Support", "Detox"], price: 17.0, image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&h=600&fit=crop", shortDescription: "Premium liver support from nature's most renowned hepatoprotective herb.", fullDescription: "Milk thistle (Silybum marianum) has been used for over 2,000 years to protect and support liver health. Our tincture is made from organic milk thistle seeds, rich in the active complex silymarin. This powerful antioxidant helps protect liver cells from damage, supports the liver's natural detoxification processes, and may aid in liver cell regeneration.", ingredients: "Milk thistle seed (Silybum marianum), organic grain alcohol, spring water", usage: "Take 2.5ml in a little water, 2-3 times daily before meals.", recommendedBy: null },
    { slug: "elderberry-syrup", name: "Elderberry Syrup", latinName: "Sambucus nigra", category: "Tinctures", concerns: ["Immune Support", "Cold & Flu"], price: 15.0, image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=600&fit=crop", shortDescription: "Delicious immune support rich in antioxidants and vitamin C.", fullDescription: "Our Elderberry Syrup is a family-friendly immune tonic made from organic elderberries (Sambucus nigra), raw honey, and warming spices. Elderberries are rich in anthocyanins and vitamin C, with a long tradition of use during the cold and flu season. The addition of ginger, cinnamon, and clove adds warming properties and extra antimicrobial benefits.", ingredients: "Organic elderberries, raw honey, fresh ginger root, cinnamon bark, whole cloves, spring water", usage: "Adults: 1 tablespoon daily for prevention, or 1 tablespoon every 3 hours during acute illness. Children (2+): 1 teaspoon daily.", recommendedBy: "thomas-whitfield" },
    { slug: "dried-nettle-leaf", name: "Dried Nettle Leaf", latinName: "Urtica dioica", category: "Dried Herbs", concerns: ["Allergies", "Iron Support"], price: 8.5, image: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=600&h=600&fit=crop", shortDescription: "A mineral-rich superfood herb for allergy support and nourishment.", fullDescription: "Stinging nettle leaf (Urtica dioica) is one of the most nutritious herbs available, packed with iron, calcium, magnesium, and vitamins A, C, and K. Traditionally used for hay fever and allergic rhinitis, nettle leaf is also a wonderful daily nourishing tonic. Our dried nettle is sustainably harvested and gently dried to preserve its rich mineral content and vivid green colour.", ingredients: "100% organic dried nettle leaf (Urtica dioica)", usage: "Steep 1-2 tablespoons in boiling water for 10-15 minutes for a nourishing tea. For maximum mineral extraction, make an overnight infusion: steep 30g in 1 litre of boiling water for 4-8 hours.", recommendedBy: "thomas-whitfield" },
    { slug: "lemon-balm-passionflower-tea", name: "Lemon Balm & Passionflower Tea", latinName: "Melissa officinalis, Passiflora incarnata", category: "Teas", concerns: ["Anxiety", "Calm"], price: 13.0, image: "https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?w=600&h=600&fit=crop", shortDescription: "A gentle anxiolytic blend for daytime calm without drowsiness.", fullDescription: "This carefully crafted blend pairs lemon balm (Melissa officinalis) with passionflower (Passiflora incarnata) for gentle anxiety relief that won't make you sleepy. Lemon balm, a member of the mint family, brings a bright, lemony flavour along with its calming and mood-lifting properties. Passionflower adds deeper nervous system support, helping to quiet a racing mind.", ingredients: "Organic lemon balm leaves, organic passionflower herb", usage: "Steep 1-2 teaspoons in freshly boiled water for 5-7 minutes. Can be enjoyed throughout the day.", recommendedBy: "priya-sharma" },
    { slug: "rhodiola-capsules", name: "Rhodiola Capsules", latinName: "Rhodiola rosea", category: "Capsules", concerns: ["Energy", "Fatigue"], price: 24.0, image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&h=600&fit=crop", shortDescription: "Arctic adaptogen for mental clarity and physical endurance.", fullDescription: "Rhodiola rosea, the 'golden root', thrives in the harsh conditions of the Arctic and high mountains. This remarkable adaptogen has been used for centuries in Scandinavian and Russian traditional medicine to combat fatigue, enhance mental performance, and build physical endurance. Our capsules contain standardised Rhodiola extract with optimal levels of rosavins and salidroside.", ingredients: "Rhodiola rosea root extract (400mg, standardised to 3% rosavins, 1% salidroside), vegetable cellulose capsule", usage: "Take 1 capsule in the morning with breakfast. For demanding periods, a second capsule can be taken at lunch. Avoid taking after 2pm as it may affect sleep.", recommendedBy: "hector" },
    { slug: "hawthorn-berry-tincture", name: "Hawthorn Berry Tincture", latinName: "Crataegus monogyna", category: "Tinctures", concerns: ["Heart Health", "Circulation"], price: 18.5, image: "https://images.unsplash.com/photo-1471943311424-646960669fbc?w=600&h=600&fit=crop", shortDescription: "Traditional heart tonic for cardiovascular and circulatory support.", fullDescription: "Hawthorn (Crataegus monogyna) has been revered as a heart herb throughout European herbal traditions. Our tincture is made from the berries, flowers, and leaves of the hawthorn tree, capturing the full spectrum of flavonoids, procyanidins, and triterpene acids. Hawthorn supports healthy blood pressure, strengthens the heart muscle, and improves peripheral circulation.", ingredients: "Hawthorn berries, flowers, and leaves (Crataegus monogyna), organic grain alcohol, spring water", usage: "Take 2.5ml in a little water, 2-3 times daily. Best used as a long-term tonic — allow 8-12 weeks for full cardiovascular benefits.", recommendedBy: null },
  ];

  for (const p of productsData) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: p,
      create: p,
    });
  }
  console.log(`  ✓ ${productsData.length} products`);

  // ─── ARTICLES ───────────────────────────────────────────
  const articlesData = [
    { slug: "understanding-adaptogens", title: "Understanding Adaptogens: Nature's Stress Response", authorSlug: "hector", category: "Herbal Medicine", featuredImage: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=800&h=500&fit=crop", excerpt: "Adaptogens are a unique class of herbs that help your body resist and recover from stress. Learn how they work and which ones might be right for you.", content: "Adaptogens are a remarkable class of herbs that have been used for centuries in traditional medicine systems around the world. The term 'adaptogen' was coined in 1947 by Russian scientist Nikolai Lazarev, who defined them as substances that increase the body's ability to resist and adapt to stress.\n\nWhat makes adaptogens unique is their ability to modulate the stress response. Unlike stimulants that push the body harder, or sedatives that suppress the stress response, adaptogens help the body find its own balance — what herbalists call homeostasis.\n\n## How Do Adaptogens Work?\n\nAdaptogens primarily work through the hypothalamic-pituitary-adrenal (HPA) axis, the body's central stress response system. When we experience stress, the HPA axis triggers a cascade of hormones including cortisol, our primary stress hormone.\n\nAdaptogenic herbs help regulate this cascade, preventing the extremes of both excess cortisol production (leading to anxiety, insomnia, and weight gain) and cortisol depletion (leading to fatigue, brain fog, and immune suppression).\n\n## Key Adaptogens to Know\n\n**Ashwagandha** (Withania somnifera) — Perhaps the most well-studied adaptogen, ashwagandha excels at reducing cortisol levels and supporting calm energy.\n\n**Rhodiola** (Rhodiola rosea) — The 'golden root' is particularly effective for mental clarity, physical endurance, and combating fatigue.\n\n**Holy Basil** (Ocimum sanctum) — Known as Tulsi in Ayurveda, this gentle adaptogen supports both physical and emotional stress resilience.\n\n**Reishi** (Ganoderma lucidum) — This medicinal mushroom is a powerful immune modulator and nervous system tonic.\n\nIf you're interested in incorporating adaptogens into your wellness routine, I'd recommend booking a consultation so we can identify the best herbs for your specific needs.", publishedDate: new Date("2024-11-15"), status: "published" },
    { slug: "seasonal-immune-health", title: "A Seasonal Guide to Immune Health", authorSlug: "thomas-whitfield", category: "Seasonal Wellness", featuredImage: "https://images.unsplash.com/photo-1457530378978-8bac673b8062?w=800&h=500&fit=crop", excerpt: "Your immune system has different needs throughout the year. Here's how to support it naturally with herbs and lifestyle practices for each season.", content: "Our immune system is not a static entity — it responds and adapts to the changing seasons, environmental challenges, and our lifestyle choices. Understanding these seasonal patterns allows us to provide targeted support when our bodies need it most.\n\n## Autumn: Building the Foundation\n\nAs temperatures drop and we spend more time indoors, autumn is the time to strengthen your immune foundations. Key herbs for this season include:\n\n- **Echinacea** — Start a 2-week course to prime your immune response\n- **Elderberry** — Begin daily elderberry syrup as a preventative tonic\n- **Astragalus** — This deep immune tonic is best started before illness strikes\n\n## Winter: Active Defence\n\nWinter is when we face the most immune challenges. Keep these herbs close:\n\n- **Elderberry syrup** — Continue daily for ongoing protection\n- **Thyme** — A powerful respiratory antimicrobial, perfect as a tea at the first sign of a cough\n- **Garlic** — Nature's antibiotic. Eat raw cloves or take fermented black garlic daily\n\n## Spring: Cleanse and Renew\n\nSpring brings new growth — and for many, allergies. Support your body's transition:\n\n- **Nettle leaf** — A natural antihistamine, perfect as a daily tea or overnight infusion\n- **Cleavers** — A gentle lymphatic cleanser that supports your body's spring detox\n\n## Summer: Maintain and Protect\n\nSummer is usually our healthiest season, but don't neglect your immune system:\n\n- **Calendula** — Supports skin health and immune function\n- **Lemon balm** — Antiviral properties plus calming benefits for summer relaxation\n\nRemember, the best immune support is a foundation of good sleep, regular movement, and a nutrient-dense diet. Herbs enhance what healthy habits build.", publishedDate: new Date("2024-10-01"), status: "published" },
    { slug: "gut-health-foundation", title: "Gut Health: The Foundation of Wellbeing", authorSlug: "hector", category: "Nutrition", featuredImage: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=500&fit=crop", excerpt: "The health of your digestive system influences everything from your immune response to your mood. Discover how herbs and nutrition can transform your gut health.", content: "If there's one thing I've learned in my years of practice, it's that the gut is truly the foundation of health. The ancient healing traditions understood this intuitively — Hippocrates said 'all disease begins in the gut' over 2,000 years ago, and modern science is increasingly confirming his wisdom.\n\n## The Gut-Everything Connection\n\nYour digestive system is home to approximately 70% of your immune tissue and produces around 90% of your body's serotonin (the 'happy hormone'). It's also the primary site where you absorb the nutrients that fuel every cell in your body.\n\nWhen gut health is compromised — whether through poor diet, stress, medications, or infection — the effects ripple outward to affect virtually every system.\n\n## Key Herbs for Digestive Health\n\n**Peppermint** — Relaxes smooth muscle in the digestive tract, easing cramping, bloating, and IBS symptoms.\n\n**Fennel** — A wonderful carminative that helps dispel gas and ease digestive discomfort.\n\n**Marshmallow root** — Rich in mucilage, this herb coats and soothes irritated digestive membranes.\n\n**Chamomile** — A gentle anti-inflammatory and antispasmodic, perfect for stress-related digestive issues.\n\n**Ginger** — Stimulates digestive secretions, eases nausea, and has powerful anti-inflammatory properties.\n\n## Practical Steps for Better Gut Health\n\n1. **Eat slowly and mindfully** — Digestion begins in the mouth\n2. **Include bitter foods** — Rocket, dandelion greens, and artichoke stimulate digestive secretions\n3. **Fermented foods daily** — Sauerkraut, kimchi, kefir, and live yoghurt feed beneficial bacteria\n4. **Manage stress** — The gut-brain axis means stress directly impacts digestion\n5. **Stay hydrated** — Water is essential for healthy digestive function\n\nIf you're struggling with digestive issues, I'd love to help. A personalised herbal protocol can address the root causes and restore your gut to optimal function.", publishedDate: new Date("2024-09-20"), status: "published" },
    { slug: "herbs-hormonal-balance", title: "Herbs for Hormonal Balance at Every Life Stage", authorSlug: "amara-osei", category: "Herbal Medicine", featuredImage: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=500&fit=crop", excerpt: "From first periods to menopause and beyond, herbal medicine offers gentle yet effective support for women's hormonal health at every stage.", content: "Women's hormonal health is a dynamic, ever-changing landscape. From the onset of menstruation through the reproductive years, perimenopause, and beyond, our hormonal needs shift and evolve. Herbal medicine offers beautifully tailored support for each of these transitions.\n\n## The Menstrual Years\n\nFor younger women establishing their cycles, gentle hormone-balancing herbs can make a profound difference:\n\n**Vitex (Agnus castus)** — The premier herb for menstrual irregularities, PMS, and hormonal acne. Works by supporting the pituitary gland.\n\n**Raspberry leaf** — A uterine tonic that supports healthy menstrual function and can ease period cramps.\n\n**Dong quai** — Known as 'female ginseng' in Chinese medicine, this herb nourishes the blood and supports regular cycles.\n\n## The Fertility Journey\n\nWhen conception is the goal, herbs can create optimal conditions:\n\n**Shatavari** — An Ayurvedic herb that nourishes the reproductive system and supports healthy follicle development.\n\n**Red clover** — Rich in isoflavones that support oestrogen balance and uterine health.\n\n## Perimenopause and Menopause\n\nThe transition years bring unique challenges — hot flushes, sleep disruption, mood changes. Herbs offer gentle relief:\n\n**Black cohosh** — Well-researched for reducing hot flushes and night sweats.\n\n**Sage** — A traditional remedy for excessive sweating and hot flushes.\n\n**St John's wort** — Supports mood and can help with the emotional aspects of menopause.\n\nAt every stage, I believe in listening to your body and working with its wisdom. If you'd like personalised hormonal support, I'd be honoured to work with you.", publishedDate: new Date("2024-08-15"), status: "published" },
    { slug: "herbal-tea-blending", title: "The Art of Herbal Tea Blending at Home", authorSlug: "elena-vasquez", category: "Holistic Living", featuredImage: "https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?w=800&h=500&fit=crop", excerpt: "Learn the fundamentals of creating your own herbal tea blends at home — from choosing your base herbs to achieving the perfect flavour balance.", content: "There's something deeply satisfying about creating your own herbal tea blends. It connects you to a tradition that spans thousands of years, and it allows you to craft teas that are perfectly suited to your taste and health needs.\n\n## The Three Layers of a Good Blend\n\nEvery great herbal tea blend has three layers:\n\n### 1. The Base (60-70% of blend)\nThis is the main herb that defines the blend's character and purpose. Choose based on the effect you want:\n- **Calming:** Chamomile, lemon balm, or passionflower\n- **Energising:** Peppermint, rosemary, or green tea\n- **Nourishing:** Nettle leaf, oat straw, or rooibos\n\n### 2. The Support (20-30% of blend)\nThese herbs complement and enhance the base:\n- Add **lavender** to a chamomile base for deeper relaxation\n- Add **ginger** to a peppermint base for digestive warmth\n- Add **rose petals** to any blend for a touch of luxury\n\n### 3. The Accent (5-10% of blend)\nA small amount of something special that makes the blend unique:\n- **Cinnamon bark** for warmth\n- **Liquorice root** for natural sweetness\n- **Dried citrus peel** for brightness\n\n## Three Starter Blends to Try\n\n**Evening Calm:** 3 parts chamomile, 1 part lavender, pinch of liquorice root\n\n**Morning Vitality:** 3 parts peppermint, 1 part rosemary, pinch of lemon peel\n\n**Nourishing Daily:** 3 parts nettle leaf, 1 part oat straw, pinch of rose petals\n\nExperiment, taste as you go, and don't be afraid to adjust. The art of blending is learned through practice — and enjoyed with every cup.", publishedDate: new Date("2024-07-10"), status: "published" },
    { slug: "sleep-hygiene", title: "Sleep Hygiene: Beyond Counting Sheep", authorSlug: "priya-sharma", category: "Holistic Living", featuredImage: "https://images.unsplash.com/photo-1495197359483-d092478c170a?w=800&h=500&fit=crop", excerpt: "Good sleep is the foundation of health, yet millions struggle with it. Explore natural strategies and herbs that can transform your relationship with rest.", content: "Sleep is not a luxury — it's a biological necessity. During sleep, your body repairs tissues, consolidates memories, regulates hormones, and clears metabolic waste from the brain. Yet in our always-on culture, quality sleep has become increasingly elusive.\n\n## Understanding Your Sleep Architecture\n\nHealthy sleep cycles through several stages, each serving a different purpose. Light sleep transitions to deep sleep (where physical restoration occurs) and REM sleep (where memory consolidation and emotional processing happen). A full cycle takes about 90 minutes, and we need 4-6 cycles per night.\n\n## The Herbal Sleep Kit\n\n**Valerian root** — The most potent herbal sedative. Works best as a tincture taken 30-60 minutes before bed.\n\n**Passionflower** — Particularly effective for the racing mind that won't switch off. Increases GABA in the brain.\n\n**Chamomile** — Gentle enough for nightly use. A cup of chamomile tea signals to your body that it's time to wind down.\n\n**Lavender** — The aroma alone activates the parasympathetic nervous system. Use as a pillow spray or in a pre-bed bath.\n\n**Ashwagandha** — For those whose sleep issues stem from chronic stress and elevated cortisol.\n\n## Sleep Hygiene Fundamentals\n\n1. **Consistent schedule** — Go to bed and wake up at the same time daily, even on weekends\n2. **Light management** — Bright light in the morning, dim light in the evening, no screens 1 hour before bed\n3. **Temperature** — Cool bedroom (16-18°C) with warm covers\n4. **Evening ritual** — Create a 30-60 minute wind-down routine: herbal tea, gentle stretching, reading\n5. **Limit stimulants** — No caffeine after midday, limit alcohol (it disrupts sleep architecture)\n\nIf you're struggling with sleep, I'd love to help you create a personalised protocol. Sometimes a few targeted changes — the right herbs combined with the right habits — can transform your nights and, by extension, your days.", publishedDate: new Date("2024-06-22"), status: "published" },
  ];

  for (const a of articlesData) {
    await prisma.article.upsert({
      where: { slug: a.slug },
      update: a,
      create: a,
    });
  }
  console.log(`  ✓ ${articlesData.length} articles`);

  // ─── TESTIMONIALS ───────────────────────────────────────
  const testimonialsData = [
    { clientName: "Sarah M.", text: "After years of digestive issues, Hector's herbal protocol completely transformed my health. Within weeks I felt like a new person. I can't recommend Hector's Herbs enough.", condition: "Digestive Health", practitionerSlug: "hector" },
    { clientName: "Emma T.", text: "Amara supported me through my fertility journey with such care and expertise. Her herbal protocols and nutritional guidance helped me feel empowered and hopeful during a difficult time.", condition: "Fertility Support", practitionerSlug: "amara-osei" },
    { clientName: "Michael H.", text: "I'd tried everything for my insomnia — Priya's herbal protocol finally gave me the deep, restorative sleep I'd been missing for years. Her holistic approach changed my life.", condition: "Sleep & Anxiety", practitionerSlug: "priya-sharma" },
    { clientName: "Daniel F.", text: "Thomas helped me manage my chronic eczema when conventional treatments had plateaued. His scientific yet holistic approach was exactly what I needed.", condition: "Skin Health", practitionerSlug: "thomas-whitfield" },
    { clientName: "Chris B.", text: "Elena's herbal protocol for my chronic back pain has been far more effective than the painkillers I was relying on. I'm moving freely again and I wish I'd found her sooner.", condition: "Pain Management", practitionerSlug: "elena-vasquez" },
  ];

  for (const t of testimonialsData) {
    await prisma.testimonial.create({ data: t });
  }
  console.log(`  ✓ ${testimonialsData.length} testimonials`);

  // ─── BOOKINGS ───────────────────────────────────────────
  const bookingsData = [
    { id: "bk-001", practitionerSlug: "hector", service: "Initial Consultation", date: "2026-02-20", time: "10:00", status: "upcoming", notes: "Would like to discuss ongoing digestive issues and fatigue." },
    { id: "bk-002", practitionerSlug: "priya-sharma", service: "Follow-Up Consultation", date: "2026-03-05", time: "14:30", status: "upcoming", notes: "Review progress after 4 weeks on the anxiety protocol." },
    { id: "bk-003", practitionerSlug: "hector", service: "Initial Consultation", date: "2026-01-15", time: "11:00", status: "completed", notes: "First visit to discuss stress and sleep issues." },
    { id: "bk-004", practitionerSlug: "hector", service: "Follow-Up Consultation", date: "2026-01-29", time: "09:30", status: "completed", notes: null },
    { id: "bk-005", practitionerSlug: "amara-osei", service: "Initial Consultation", date: "2026-01-08", time: "15:00", status: "cancelled", notes: "Had to reschedule due to illness." },
  ];

  for (const b of bookingsData) {
    await prisma.booking.upsert({
      where: { id: b.id },
      update: b,
      create: b,
    });
  }
  console.log(`  ✓ ${bookingsData.length} bookings`);

  // ─── ORDERS ─────────────────────────────────────────────
  const ordersData = [
    { id: "ord-2026-001", date: "2026-02-01", status: "processing", items: [{ productSlug: "ashwagandha-capsules", name: "Ashwagandha Capsules", quantity: 2, price: 22.0 }, { productSlug: "chamomile-lavender-tea", name: "Chamomile & Lavender Tea Blend", quantity: 1, price: 12.5 }], total: 56.5, trackingNumber: null },
    { id: "ord-2026-002", date: "2026-01-20", status: "shipped", items: [{ productSlug: "milk-thistle-tincture", name: "Milk Thistle Tincture", quantity: 1, price: 17.0 }, { productSlug: "peppermint-fennel-tea", name: "Peppermint & Fennel Tea", quantity: 2, price: 11.0 }], total: 39.0, trackingNumber: "RM123456789GB" },
    { id: "ord-2025-047", date: "2025-12-15", status: "delivered", items: [{ productSlug: "echinacea-tincture", name: "Echinacea Tincture", quantity: 1, price: 18.0 }, { productSlug: "elderberry-syrup", name: "Elderberry Syrup", quantity: 1, price: 15.0 }, { productSlug: "dried-nettle-leaf", name: "Dried Nettle Leaf", quantity: 1, price: 8.5 }], total: 41.5, trackingNumber: "RM987654321GB" },
    { id: "ord-2025-039", date: "2025-11-28", status: "delivered", items: [{ productSlug: "valerian-root-tincture", name: "Valerian Root Tincture", quantity: 1, price: 16.5 }], total: 16.5, trackingNumber: "RM456789123GB" },
  ];

  for (const o of ordersData) {
    await prisma.order.upsert({
      where: { id: o.id },
      update: o,
      create: o,
    });
  }
  console.log(`  ✓ ${ordersData.length} orders`);

  // ─── PRESCRIPTIONS ─────────────────────────────────────
  const prescriptionsData = [
    { id: "rx-001", practitionerSlug: "hector", date: "2026-01-15", condition: "Stress & Sleep Support", notes: "Start with the ashwagandha in the morning and chamomile tea before bed. If sleep doesn't improve after 2 weeks, we can add valerian. Reduce caffeine intake where possible and try to maintain a consistent bedtime. We'll review progress at your follow-up appointment.", items: [{ herb: "Ashwagandha", productSlug: "ashwagandha-capsules", form: "Capsules", dosage: "1 capsule twice daily with food", duration: "8 weeks" }, { herb: "Chamomile & Lavender", productSlug: "chamomile-lavender-tea", form: "Tea", dosage: "1 cup 30 minutes before bed", duration: "Ongoing" }, { herb: "Lemon Balm & Passionflower", productSlug: "lemon-balm-passionflower-tea", form: "Tea", dosage: "1 cup in the afternoon if feeling anxious", duration: "As needed" }] },
    { id: "rx-002", practitionerSlug: "hector", date: "2026-01-29", condition: "Digestive Support", notes: "The peppermint tea should help with bloating after meals. Take the milk thistle consistently for liver support — this is especially important given your history. Avoid eating large meals late in the evening and try to chew food thoroughly.", items: [{ herb: "Peppermint & Fennel", productSlug: "peppermint-fennel-tea", form: "Tea", dosage: "1 cup after meals", duration: "4 weeks" }, { herb: "Milk Thistle", productSlug: "milk-thistle-tincture", form: "Tincture", dosage: "5ml in water, twice daily before meals", duration: "6 weeks" }, { herb: "Slippery Elm", form: "Powder", dosage: "1 teaspoon mixed in warm water, morning", duration: "4 weeks" }] },
    { id: "rx-003", practitionerSlug: "priya-sharma", date: "2025-12-10", condition: "Anxiety & Nervous Tension", notes: "This protocol focuses on calming the nervous system and building resilience. The rhodiola will help with energy without being stimulating. Practice the breathing exercises we discussed and try to spend some time outdoors each day.", items: [{ herb: "Ashwagandha", productSlug: "ashwagandha-capsules", form: "Capsules", dosage: "1 capsule twice daily", duration: "12 weeks" }, { herb: "Rhodiola", productSlug: "rhodiola-capsules", form: "Capsules", dosage: "1 capsule in the morning", duration: "8 weeks" }, { herb: "Valerian", productSlug: "valerian-root-tincture", form: "Tincture", dosage: "2.5ml before bed if sleep is disturbed", duration: "As needed" }] },
  ];

  for (const rx of prescriptionsData) {
    await prisma.prescription.upsert({
      where: { id: rx.id },
      update: rx,
      create: rx,
    });
  }
  console.log(`  ✓ ${prescriptionsData.length} prescriptions`);

  // ─── AVAILABILITY ───────────────────────────────────────
  const availabilityData = [
    { practitionerSlug: "hector", dayOfWeek: 1, startTime: "09:00", endTime: "17:00", isAvailable: true },
    { practitionerSlug: "hector", dayOfWeek: 2, startTime: "09:00", endTime: "17:00", isAvailable: true },
    { practitionerSlug: "hector", dayOfWeek: 3, startTime: "09:00", endTime: "13:00", isAvailable: true },
    { practitionerSlug: "hector", dayOfWeek: 4, startTime: "09:00", endTime: "17:00", isAvailable: true },
    { practitionerSlug: "hector", dayOfWeek: 5, startTime: "09:00", endTime: "15:00", isAvailable: true },
    { practitionerSlug: "priya-sharma", dayOfWeek: 1, startTime: "10:00", endTime: "18:00", isAvailable: true },
    { practitionerSlug: "priya-sharma", dayOfWeek: 3, startTime: "10:00", endTime: "18:00", isAvailable: true },
    { practitionerSlug: "priya-sharma", dayOfWeek: 5, startTime: "10:00", endTime: "16:00", isAvailable: true },
    { practitionerSlug: "amara-osei", dayOfWeek: 2, startTime: "09:00", endTime: "17:00", isAvailable: true },
    { practitionerSlug: "amara-osei", dayOfWeek: 4, startTime: "09:00", endTime: "17:00", isAvailable: true },
    { practitionerSlug: "thomas-whitfield", dayOfWeek: 1, startTime: "08:30", endTime: "16:30", isAvailable: true },
    { practitionerSlug: "thomas-whitfield", dayOfWeek: 2, startTime: "08:30", endTime: "16:30", isAvailable: true },
    { practitionerSlug: "thomas-whitfield", dayOfWeek: 3, startTime: "08:30", endTime: "16:30", isAvailable: true },
    { practitionerSlug: "elena-vasquez", dayOfWeek: 1, startTime: "09:00", endTime: "18:00", isAvailable: true },
    { practitionerSlug: "elena-vasquez", dayOfWeek: 3, startTime: "09:00", endTime: "18:00", isAvailable: true },
    { practitionerSlug: "elena-vasquez", dayOfWeek: 4, startTime: "09:00", endTime: "14:00", isAvailable: true },
  ];

  for (const a of availabilityData) {
    await prisma.availability.upsert({
      where: { practitionerSlug_dayOfWeek: { practitionerSlug: a.practitionerSlug, dayOfWeek: a.dayOfWeek } },
      update: a,
      create: a,
    });
  }
  console.log(`  ✓ ${availabilityData.length} availability slots`);

  // ─── SITE IMAGES ────────────────────────────────────────
  const siteImagesData = [
    { key: "homepage-hero", url: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=1600&h=900&fit=crop", alt: "Fresh herbs and botanical ingredients", label: "Homepage Hero" },
    { key: "shop-hero", url: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=1600&h=900&fit=crop", alt: "Herbal tinctures and remedies", label: "Shop Page Hero" },
    { key: "herbalists-hero", url: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1600&h=900&fit=crop", alt: "Natural herbs and plants", label: "Herbalists Page Hero" },
    { key: "learn-hero", url: "https://images.unsplash.com/photo-1457530378978-8bac673b8062?w=1600&h=900&fit=crop", alt: "Herbal medicine education", label: "Learn Page Hero" },
    { key: "contact-hero", url: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1600&h=900&fit=crop", alt: "Hector's Herbs clinic", label: "Contact Page Hero" },
  ];

  for (const si of siteImagesData) {
    await prisma.siteImage.upsert({
      where: { key: si.key },
      update: si,
      create: si,
    });
  }
  console.log(`  ✓ ${siteImagesData.length} site images`);

  console.log("\nSeeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
