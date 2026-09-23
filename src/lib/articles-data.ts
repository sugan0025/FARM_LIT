export interface ArticleSection {
  heading: string;
  content: string;
}

export interface CommunityArticle {
  id: string;
  slug: string;
  title: string;
  category: 'Healthy Recipes' | 'Farming Tips' | 'Seasonal Produce' | 'Sustainability Stories';
  snippet: string;
  readTime: string;
  date: string;
  image: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  intro: string;
  sections: ArticleSection[];
  keyTakeaways: string[];
  recipeDetails?: {
    prepTime: string;
    cookTime: string;
    servings: string;
    ingredients: string[];
    steps: string[];
  };
  relatedProductSlug?: string;
}

export const COMMUNITY_ARTICLES: CommunityArticle[] = [
  {
    id: 'art-1',
    slug: 'crispy-palak-dal-cheela',
    category: 'Healthy Recipes',
    title: 'Crispy Palak & Dal Cheela with Fresh Mint Dip',
    snippet:
      'A high-protein wholesome breakfast recipe highlighting hydro-washed baby spinach and stone-ground yellow lentils. Ready in under 15 minutes.',
    readTime: '4 min read',
    date: 'Sept 18, 2026',
    image: '/images/products/spinach.webp',
    author: {
      name: 'Chef Anita Raman',
      role: 'Farm_lit Culinary & Nutrition Lead',
    },
    intro:
      'When you harvest spinach fresh from the moist soils of the Bhavani River Basin, its leaves hold a gentle natural sweetness and an emerald snap that store-bought greens simply lose. This savory lentil and palak pancake (cheela) is packed with plant iron, folate, and dietary fiber.',
    sections: [
      {
        heading: 'Why Fresh Local Spinach Makes All the Difference',
        content:
          'Commercial supermarket spinach often spends 4 to 6 days in refrigerated transport, during which up to 47% of its delicate vitamin C oxidizes. Because Farm_lit spinach is harvested in the morning and delivered without artificial gas preservation, the chlorophyll remains intact and crisp.',
      },
      {
        heading: 'Nutritionist Note: Combining Iron with Vitamin C',
        content:
          'Non-heme iron found in leafy vegetables requires an acidic pairing for optimal gut absorption. That is why this recipe pairs finely chopped fresh palak with a squeeze of fresh lemon juice and stone-ground cumin, which triples your bioavailable iron uptake.',
      },
    ],
    recipeDetails: {
      prepTime: '10 Mins',
      cookTime: '8 Mins',
      servings: '3 Servings (6 Cheelas)',
      ingredients: [
        '250g Farm_lit Crisp Baby Spinach (finely chopped)',
        '1 Cup Yellow Moong Dal (soaked for 2 hours and ground)',
        '1 Green Chilli & 1-inch Ginger (crushed)',
        '1/2 tsp Cumin seeds & a pinch of Hing (asafoetida)',
        '1 tbsp Pure Desi Cow Ghee for pan roasting',
        'Rock salt to taste & fresh lemon wedge for finishing',
      ],
      steps: [
        'Soak moong dal for 2 hours, then blend into a smooth pouring batter with minimal water, ginger, and green chilli.',
        'Fold in the finely chopped crisp baby spinach, cumin seeds, rock salt, and hing into the batter.',
        'Heat a cast-iron skillet over medium flame and brush lightly with A2 cow ghee.',
        'Pour a ladle of batter, spreading outward in gentle circular motions until even.',
        'Cook for 2-3 minutes until golden and crispy along the edges, then flip and brown the other side.',
        'Serve piping hot with fresh mint coriander chutney and lemon juice.',
      ],
    },
    keyTakeaways: [
      'High protein, zero refined flour (maida), 100% gluten-free breakfast.',
      'Maximizes bioavailable plant iron when paired with citrus lemon.',
      'Cast-iron cooking in desi ghee imparts authentic rustic aroma.',
    ],
    relatedProductSlug: 'crisp-baby-spinach-palak',
  },
  {
    id: 'art-2',
    slug: 'organic-neem-pest-prevention',
    category: 'Farming Tips',
    title: 'How Our Farmers Prevent Pests Using Organic Neem Sprays',
    snippet:
      'Learn how traditional Companion Planting protects tomatoes and bell peppers without artificial synthetic chemicals or wax coatings.',
    readTime: '5 min read',
    date: 'Sept 14, 2026',
    image: '/images/products/tomatoes.webp',
    author: {
      name: 'Dr. Senthil Murugan',
      role: 'Organic Agroecology Consultant, Sathyamangalam',
    },
    intro:
      'In conventional commercial farming, tomatoes and capsicums receive up to 14 synthetic pesticide sprays per harvest cycle to prevent fruit borers and whiteflies. In our farming cooperative around Sathyamangalam, our growers use 4,000-year-old botanical knowledge: cold-pressed neem kernel oil and marigold companion rows.',
    sections: [
      {
        heading: 'The Science of Azadirachtin',
        content:
          'Neem seeds contain Azadirachtin, a biological compound that interrupts the hormonal growth cycle of harmful chewing insects without harming pollinating honeybees or earthworms. Sprayed at dawn, it naturally breaks down under sunlight within 48 hours, leaving zero harmful synthetic residue on the fruit skin.',
      },
      {
        heading: 'Companion Planting: The Living Shield',
        content:
          'Between every three rows of hybrid tomatoes, our farmers plant a border of bright yellow African Marigolds. Marigold roots release alpha-terthienyl, an organic terpene that repels parasitic nematodes in the soil, while attracting beneficial ladybugs that eat aphids.',
      },
    ],
    keyTakeaways: [
      'Zero synthetic organophosphates or neurotoxic pesticides.',
      'Protects natural pollinators like local honeybees and butterflies.',
      'Produces clean, flavorful produce safe for children straight from the rinse.',
    ],
    relatedProductSlug: 'vine-ripened-hybrid-tomatoes',
  },
  {
    id: 'art-3',
    slug: 'autumn-harvest-calendar',
    category: 'Seasonal Produce',
    title: 'The Autumn Harvest Calendar: What to Eat This Month',
    snippet:
      'Why consuming regional produce according to seasonal cycles improves gut immunity, supports local flora, and maximizes micronutrient absorption.',
    readTime: '3 min read',
    date: 'Sept 10, 2026',
    image: '/images/categories/fruits.webp',
    author: {
      name: 'Vasanth Rajan',
      role: 'Grower Relations & Seasonal Sourcing',
    },
    intro:
      'Nature orchestrates nutrient availability precisely when our bodies need it most. As monsoon winds recede and early autumn sets in across the Western Ghats and Tamil Nadu plains, certain crops reach their peak nutritional potency.',
    sections: [
      {
        heading: 'Peak Season Picks for Autumn',
        content:
          'This month marks the golden harvest of mountain bananas from Sirumugai, crisp sweet Nagpur oranges, and polyhouse bell peppers from Thalavadi. Root vegetables like sweet carrots and russet potatoes are cured and ready for warming evening stews.',
      },
      {
        heading: 'Why Eating Seasonally Boosts Gut Immunity',
        content:
          'Out-of-season produce is forced to grow using synthetic stimulants or stored in gas chambers for months. In contrast, in-season produce develops natural antioxidant defense compounds (polyphenols) that nourish healthy human gut bacteria.',
      },
    ],
    keyTakeaways: [
      'In-season produce contains up to 3x higher micronutrient density.',
      'Saves energy and cold storage carbon emissions.',
      'Taste is sweeter, aromatics are richer, and prices are most affordable.',
    ],
    relatedProductSlug: 'nagpur-sweet-juicy-oranges',
  },
  {
    id: 'art-4',
    slug: 'zero-plastic-sustainable-packaging',
    category: 'Sustainability Stories',
    title: 'Zero Plastic: Our Biodegradable Jute & Cornstarch Packaging',
    snippet:
      'How Farm_lit replaced single-use plastic crate liners with compostable plant materials to divert 4 tons of landfill waste this quarter.',
    readTime: '6 min read',
    date: 'Sept 05, 2026',
    image: '/images/categories/grains.webp',
    author: {
      name: 'Priya Sundaram',
      role: 'Sustainability & Zero-Waste Advocate',
    },
    intro:
      'It makes little sense to eat organic, natural produce wrapped in petrol-chemical plastic cling wrap that suffocates the living produce and pollutes our waterways. Here is how Farm_lit re-engineered delivery packaging from root to leaf.',
    sections: [
      {
        heading: 'Breathable Jute Bags for Root Vegetables',
        content:
          'Potatoes, onions, and grains are packed in unbleached, woven natural jute fibers. Jute allows optimal humidity circulation, preventing fungal condensation while remaining 100% backyard compostable within 90 days.',
      },
      {
        heading: 'Cornstarch & Cassava Fresh-Packs for Leafy Greens',
        content:
          'Delicate baby greens require moisture retention to avoid wilting. Instead of LDPE polyethylene bags, we use certified PLA compostable films made from fermented corn and cassava starch. You can bury them directly in your home planter box or wet compost bin.',
      },
    ],
    keyTakeaways: [
      'Over 4 tons of single-use plastic diverted from landfills this quarter.',
      '100% backyard compostable vegetable pouches.',
      'Zero microplastic contamination on fresh edible skins.',
    ],
    relatedProductSlug: 'aged-royal-basmati-rice',
  },
  {
    id: 'art-5',
    slug: 'traditional-bilona-ghee-roasted-roots',
    category: 'Healthy Recipes',
    title: 'Traditional Bilona Ghee Roasted Root Vegetables',
    snippet:
      'Toss mountain russet potatoes, sweet carrots, and bell peppers in pure A2 bilona cow ghee with rock salt and crushed rosemary for a wholesome supper.',
    readTime: '5 min read',
    date: 'Aug 29, 2026',
    image: '/images/products/ghee.webp',
    author: {
      name: 'Chef Anita Raman',
      role: 'Farm_lit Culinary & Nutrition Lead',
    },
    intro:
      'A great vegetable dish requires very little fuss when the raw produce has natural sweetness and the cooking fat is cultured A2 bilona ghee. Roasting root vegetables at medium heat caramelizes their natural sugars while the ghee imparts a nutty, golden crust.',
    sections: [
      {
        heading: 'The High Smoke Point Advantage of Cultured Ghee',
        content:
          'Unlike refined vegetable seed oils that break down into free radicals at roasting temperatures, pure cultured cow ghee has a high smoke point of 250°C (482°F). Its short-chain fatty acids (like butyric acid) support gut lining integrity and metabolic health.',
      },
    ],
    recipeDetails: {
      prepTime: '12 Mins',
      cookTime: '25 Mins',
      servings: '4 Servings',
      ingredients: [
        '300g Farm_lit Mountain Russet Potatoes (cubed)',
        '250g Crunchy Orange Carrots (sliced into thick batons)',
        '1 Green Bell Pepper (cut into bite-sized chunks)',
        '2.5 tbsp Bilona A2 Desi Cow Cultured Ghee (melted)',
        '1 tsp Himalayan Pink Rock Salt',
        '1/2 tsp Coarsely cracked black peppercorns',
        '1 sprig fresh rosemary or crushed dried oregano',
      ],
      steps: [
        'Preheat your oven or air fryer to 200°C (390°F).',
        'In a large mixing bowl, toss the cubed potatoes and carrots with melted bilona ghee, pink rock salt, and cracked pepper.',
        'Spread the seasoned vegetables across a parchment-lined baking tray in a single layer.',
        'Roast for 15 minutes, then add the bell pepper chunks and herbs, tossing gently.',
        'Return to heat for another 10 minutes until potatoes have crisp golden edges and carrots are tender.',
        'Garnish with fresh coriander or lemon zest and serve as a nourishing dinner side.',
      ],
    },
    keyTakeaways: [
      'Nutrient-dense side dish rich in fat-soluble vitamins A, D, and E.',
      'Natural caramelization without added sugars or artificial sauces.',
      'Wholesome comfort food made entirely from farm produce.',
    ],
    relatedProductSlug: 'bilona-a2-desi-cow-cultured-ghee',
  },
  {
    id: 'art-6',
    slug: 'why-wax-free-apples-stay-crisp',
    category: 'Farming Tips',
    title: 'Why Wax-Free Apples Breathe Better and Stay Truly Crisp',
    snippet:
      'Commercial supermarket apples are coated with petroleum-derived shellac. Here is why our Himachal orchard growers refuse wax treatments.',
    readTime: '4 min read',
    date: 'Aug 21, 2026',
    image: '/images/products/apples.webp',
    author: {
      name: 'Kavitha Natarajan',
      role: 'Quality & Post-Harvest Assurance',
    },
    intro:
      'Take a standard supermarket apple and scratch the peel with a butter knife: you will often scrape off a white waxy powder. That is food-grade petroleum wax or shellac sprayed to create artificial mirror shine and trap moisture for long warehouse storage.',
    sections: [
      {
        heading: 'How Waxing Suffocates the Apple',
        content:
          'An apple is a living botanical organism that breathes through microscopic pores in its peel (lenticels). When sealed under heavy wax, anaerobic fermentation occurs inside the fruit, causing that mealy, spongy texture and loss of crisp snap.',
      },
      {
        heading: 'The Natural Ursolic Acid Bloom',
        content:
          'Farm_lit Royal Gala apples are hand-wiped with soft muslin cloth and packed in ventilated crates. You eat the natural peel with its native ursolic acid bloom, providing authentic crunch and maximum dietary fiber.',
      },
    ],
    keyTakeaways: [
      '100% chemical wax-free and petroleum-free.',
      'Preserves crisp cellular snap and authentic tart-sweet aroma.',
      'Safe to eat with peel intact for maximum antioxidant quercetin intake.',
    ],
    relatedProductSlug: 'himachal-royal-gala-crisp-apples',
  },
];
