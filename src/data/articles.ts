/*
  DUMMY DATA — Articles / Learn content

  6 articles across 4 categories, each authored by a practitioner.
  Content is shortened for the prototype — in production these
  would be full-length blog posts.
*/

export type Article = {
  slug: string;
  title: string;
  author: string;
  category: "Herbal Medicine" | "Nutrition" | "Holistic Living" | "Seasonal Wellness";
  featuredImage: string;
  excerpt: string;
  content: string;
  publishedDate: string;
};

export const articles: Article[] = [
  {
    slug: "understanding-adaptogens",
    title: "Understanding Adaptogens: Nature's Stress Response",
    author: "hector",
    category: "Herbal Medicine",
    featuredImage: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=800&h=500&fit=crop",
    excerpt: "Adaptogens are a unique class of herbs that help your body resist and recover from stress. Learn how they work and which ones might be right for you.",
    content: "Adaptogens are a remarkable class of herbs that have been used for centuries in traditional medicine systems around the world. The term 'adaptogen' was coined in 1947 by Russian scientist Nikolai Lazarev, who defined them as substances that increase the body's ability to resist and adapt to stress.\n\nWhat makes adaptogens unique is their ability to modulate the stress response. Unlike stimulants that push the body harder, or sedatives that suppress the stress response, adaptogens help the body find its own balance — what herbalists call homeostasis.\n\n## How Do Adaptogens Work?\n\nAdaptogens primarily work through the hypothalamic-pituitary-adrenal (HPA) axis, the body's central stress response system. When we experience stress, the HPA axis triggers a cascade of hormones including cortisol, our primary stress hormone.\n\nAdaptogenic herbs help regulate this cascade, preventing the extremes of both excess cortisol production (leading to anxiety, insomnia, and weight gain) and cortisol depletion (leading to fatigue, brain fog, and immune suppression).\n\n## Key Adaptogens to Know\n\n**Ashwagandha** (Withania somnifera) — Perhaps the most well-studied adaptogen, ashwagandha excels at reducing cortisol levels and supporting calm energy.\n\n**Rhodiola** (Rhodiola rosea) — The 'golden root' is particularly effective for mental clarity, physical endurance, and combating fatigue.\n\n**Holy Basil** (Ocimum sanctum) — Known as Tulsi in Ayurveda, this gentle adaptogen supports both physical and emotional stress resilience.\n\n**Reishi** (Ganoderma lucidum) — This medicinal mushroom is a powerful immune modulator and nervous system tonic.\n\nIf you're interested in incorporating adaptogens into your wellness routine, I'd recommend booking a consultation so we can identify the best herbs for your specific needs.",
    publishedDate: "2024-11-15",
  },
  {
    slug: "seasonal-immune-health",
    title: "A Seasonal Guide to Immune Health",
    author: "thomas-whitfield",
    category: "Seasonal Wellness",
    featuredImage: "https://images.unsplash.com/photo-1457530378978-8bac673b8062?w=800&h=500&fit=crop",
    excerpt: "Your immune system has different needs throughout the year. Here's how to support it naturally with herbs and lifestyle practices for each season.",
    content: "Our immune system is not a static entity — it responds and adapts to the changing seasons, environmental challenges, and our lifestyle choices. Understanding these seasonal patterns allows us to provide targeted support when our bodies need it most.\n\n## Autumn: Building the Foundation\n\nAs temperatures drop and we spend more time indoors, autumn is the time to strengthen your immune foundations. Key herbs for this season include:\n\n- **Echinacea** — Start a 2-week course to prime your immune response\n- **Elderberry** — Begin daily elderberry syrup as a preventative tonic\n- **Astragalus** — This deep immune tonic is best started before illness strikes\n\n## Winter: Active Defence\n\nWinter is when we face the most immune challenges. Keep these herbs close:\n\n- **Elderberry syrup** — Continue daily for ongoing protection\n- **Thyme** — A powerful respiratory antimicrobial, perfect as a tea at the first sign of a cough\n- **Garlic** — Nature's antibiotic. Eat raw cloves or take fermented black garlic daily\n\n## Spring: Cleanse and Renew\n\nSpring brings new growth — and for many, allergies. Support your body's transition:\n\n- **Nettle leaf** — A natural antihistamine, perfect as a daily tea or overnight infusion\n- **Cleavers** — A gentle lymphatic cleanser that supports your body's spring detox\n\n## Summer: Maintain and Protect\n\nSummer is usually our healthiest season, but don't neglect your immune system:\n\n- **Calendula** — Supports skin health and immune function\n- **Lemon balm** — Antiviral properties plus calming benefits for summer relaxation\n\nRemember, the best immune support is a foundation of good sleep, regular movement, and a nutrient-dense diet. Herbs enhance what healthy habits build.",
    publishedDate: "2024-10-01",
  },
  {
    slug: "gut-health-foundation",
    title: "Gut Health: The Foundation of Wellbeing",
    author: "hector",
    category: "Nutrition",
    featuredImage: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=500&fit=crop",
    excerpt: "The health of your digestive system influences everything from your immune response to your mood. Discover how herbs and nutrition can transform your gut health.",
    content: "If there's one thing I've learned in my years of practice, it's that the gut is truly the foundation of health. The ancient healing traditions understood this intuitively — Hippocrates said 'all disease begins in the gut' over 2,000 years ago, and modern science is increasingly confirming his wisdom.\n\n## The Gut-Everything Connection\n\nYour digestive system is home to approximately 70% of your immune tissue and produces around 90% of your body's serotonin (the 'happy hormone'). It's also the primary site where you absorb the nutrients that fuel every cell in your body.\n\nWhen gut health is compromised — whether through poor diet, stress, medications, or infection — the effects ripple outward to affect virtually every system.\n\n## Key Herbs for Digestive Health\n\n**Peppermint** — Relaxes smooth muscle in the digestive tract, easing cramping, bloating, and IBS symptoms.\n\n**Fennel** — A wonderful carminative that helps dispel gas and ease digestive discomfort.\n\n**Marshmallow root** — Rich in mucilage, this herb coats and soothes irritated digestive membranes.\n\n**Chamomile** — A gentle anti-inflammatory and antispasmodic, perfect for stress-related digestive issues.\n\n**Ginger** — Stimulates digestive secretions, eases nausea, and has powerful anti-inflammatory properties.\n\n## Practical Steps for Better Gut Health\n\n1. **Eat slowly and mindfully** — Digestion begins in the mouth\n2. **Include bitter foods** — Rocket, dandelion greens, and artichoke stimulate digestive secretions\n3. **Fermented foods daily** — Sauerkraut, kimchi, kefir, and live yoghurt feed beneficial bacteria\n4. **Manage stress** — The gut-brain axis means stress directly impacts digestion\n5. **Stay hydrated** — Water is essential for healthy digestive function\n\nIf you're struggling with digestive issues, I'd love to help. A personalised herbal protocol can address the root causes and restore your gut to optimal function.",
    publishedDate: "2024-09-20",
  },
  {
    slug: "herbs-hormonal-balance",
    title: "Herbs for Hormonal Balance at Every Life Stage",
    author: "amara-osei",
    category: "Herbal Medicine",
    featuredImage: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=500&fit=crop",
    excerpt: "From first periods to menopause and beyond, herbal medicine offers gentle yet effective support for women's hormonal health at every stage.",
    content: "Women's hormonal health is a dynamic, ever-changing landscape. From the onset of menstruation through the reproductive years, perimenopause, and beyond, our hormonal needs shift and evolve. Herbal medicine offers beautifully tailored support for each of these transitions.\n\n## The Menstrual Years\n\nFor younger women establishing their cycles, gentle hormone-balancing herbs can make a profound difference:\n\n**Vitex (Agnus castus)** — The premier herb for menstrual irregularities, PMS, and hormonal acne. Works by supporting the pituitary gland.\n\n**Raspberry leaf** — A uterine tonic that supports healthy menstrual function and can ease period cramps.\n\n**Dong quai** — Known as 'female ginseng' in Chinese medicine, this herb nourishes the blood and supports regular cycles.\n\n## The Fertility Journey\n\nWhen conception is the goal, herbs can create optimal conditions:\n\n**Shatavari** — An Ayurvedic herb that nourishes the reproductive system and supports healthy follicle development.\n\n**Red clover** — Rich in isoflavones that support oestrogen balance and uterine health.\n\n## Perimenopause and Menopause\n\nThe transition years bring unique challenges — hot flushes, sleep disruption, mood changes. Herbs offer gentle relief:\n\n**Black cohosh** — Well-researched for reducing hot flushes and night sweats.\n\n**Sage** — A traditional remedy for excessive sweating and hot flushes.\n\n**St John's wort** — Supports mood and can help with the emotional aspects of menopause.\n\nAt every stage, I believe in listening to your body and working with its wisdom. If you'd like personalised hormonal support, I'd be honoured to work with you.",
    publishedDate: "2024-08-15",
  },
  {
    slug: "herbal-tea-blending",
    title: "The Art of Herbal Tea Blending at Home",
    author: "elena-vasquez",
    category: "Holistic Living",
    featuredImage: "https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?w=800&h=500&fit=crop",
    excerpt: "Learn the fundamentals of creating your own herbal tea blends at home — from choosing your base herbs to achieving the perfect flavour balance.",
    content: "There's something deeply satisfying about creating your own herbal tea blends. It connects you to a tradition that spans thousands of years, and it allows you to craft teas that are perfectly suited to your taste and health needs.\n\n## The Three Layers of a Good Blend\n\nEvery great herbal tea blend has three layers:\n\n### 1. The Base (60-70% of blend)\nThis is the main herb that defines the blend's character and purpose. Choose based on the effect you want:\n- **Calming:** Chamomile, lemon balm, or passionflower\n- **Energising:** Peppermint, rosemary, or green tea\n- **Nourishing:** Nettle leaf, oat straw, or rooibos\n\n### 2. The Support (20-30% of blend)\nThese herbs complement and enhance the base:\n- Add **lavender** to a chamomile base for deeper relaxation\n- Add **ginger** to a peppermint base for digestive warmth\n- Add **rose petals** to any blend for a touch of luxury\n\n### 3. The Accent (5-10% of blend)\nA small amount of something special that makes the blend unique:\n- **Cinnamon bark** for warmth\n- **Liquorice root** for natural sweetness\n- **Dried citrus peel** for brightness\n\n## Three Starter Blends to Try\n\n**Evening Calm:** 3 parts chamomile, 1 part lavender, pinch of liquorice root\n\n**Morning Vitality:** 3 parts peppermint, 1 part rosemary, pinch of lemon peel\n\n**Nourishing Daily:** 3 parts nettle leaf, 1 part oat straw, pinch of rose petals\n\nExperiment, taste as you go, and don't be afraid to adjust. The art of blending is learned through practice — and enjoyed with every cup.",
    publishedDate: "2024-07-10",
  },
  {
    slug: "sleep-hygiene",
    title: "Sleep Hygiene: Beyond Counting Sheep",
    author: "priya-sharma",
    category: "Holistic Living",
    featuredImage: "https://images.unsplash.com/photo-1495197359483-d092478c170a?w=800&h=500&fit=crop",
    excerpt: "Good sleep is the foundation of health, yet millions struggle with it. Explore natural strategies and herbs that can transform your relationship with rest.",
    content: "Sleep is not a luxury — it's a biological necessity. During sleep, your body repairs tissues, consolidates memories, regulates hormones, and clears metabolic waste from the brain. Yet in our always-on culture, quality sleep has become increasingly elusive.\n\n## Understanding Your Sleep Architecture\n\nHealthy sleep cycles through several stages, each serving a different purpose. Light sleep transitions to deep sleep (where physical restoration occurs) and REM sleep (where memory consolidation and emotional processing happen). A full cycle takes about 90 minutes, and we need 4-6 cycles per night.\n\n## The Herbal Sleep Kit\n\n**Valerian root** — The most potent herbal sedative. Works best as a tincture taken 30-60 minutes before bed.\n\n**Passionflower** — Particularly effective for the racing mind that won't switch off. Increases GABA in the brain.\n\n**Chamomile** — Gentle enough for nightly use. A cup of chamomile tea signals to your body that it's time to wind down.\n\n**Lavender** — The aroma alone activates the parasympathetic nervous system. Use as a pillow spray or in a pre-bed bath.\n\n**Ashwagandha** — For those whose sleep issues stem from chronic stress and elevated cortisol.\n\n## Sleep Hygiene Fundamentals\n\n1. **Consistent schedule** — Go to bed and wake up at the same time daily, even on weekends\n2. **Light management** — Bright light in the morning, dim light in the evening, no screens 1 hour before bed\n3. **Temperature** — Cool bedroom (16-18°C) with warm covers\n4. **Evening ritual** — Create a 30-60 minute wind-down routine: herbal tea, gentle stretching, reading\n5. **Limit stimulants** — No caffeine after midday, limit alcohol (it disrupts sleep architecture)\n\nIf you're struggling with sleep, I'd love to help you create a personalised protocol. Sometimes a few targeted changes — the right herbs combined with the right habits — can transform your nights and, by extension, your days.",
    publishedDate: "2024-06-22",
  },
];
