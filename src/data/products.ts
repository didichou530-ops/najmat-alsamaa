import { Product } from '../types';

export const LUXURY_PRODUCTS: Product[] = [
  {
    id: 'prod-luminous-silk-foundation',
    name: "L'Éclat Luminous Silk Foundation",
    nameFr: "Fond de Teint Soyeux L'Éclat",
    nameAr: "كريم أساس الإشراقة الحريرية الفاخر",
    tagline: 'Weightless medium buildable coverage with skin-barrier hydration and natural satin glow.',
    taglineFr: 'Couvrance modulable, fini satiné naturel infusé d\'actifs hydratants.',
    taglineAr: 'تغطية متوسطة قابلة للبناء، إشراقة ساتانية طبيعية غنية بمركبات العناية بالبشرة.',
    category: 'makeup',
    priceDZD: 4800,
    priceUSD: 36,
    rating: 4.9,
    reviewCount: 384,
    badge: 'bestseller',
    skinTypes: ['combination', 'dry', 'normal', 'sensitive', 'oily'],
    concerns: ['texture', 'brightening', 'pores'],
    isVegan: true,
    isParabenFree: true,
    isCrueltyFree: true,
    volume: '30 ml / 1.0 fl. oz.',
    stockCount: 42,
    batchNumber: 'NS-24A08',
    expirationDate: '2027-08-30',
    bgGradient: 'from-[#F7ECE4] to-[#EBD5C8]',
    accentColor: '#C87D65',
    description: 'An editorial cult-favorite foundation crafted to deliver second-skin perfection. Infused with micro-micronized mineral pigments, 4% Niacinamide, and botanical hyaluronic acid, it blurs imperfections while allowing natural radiance to shine through without cakeyness or creasing.',
    descriptionFr: 'Un fond de teint culte haute couture conçu pour un effet seconde peau parfait. Formulé avec des pigments minéraux ultra-fins, 4% de Niacinamide et de l\'acide hyaluronique botanique.',
    descriptionAr: 'كريم أساس أيقوني صُمم ليمنحك بشرة مثالية كطبقة ثانية. غني بأصباغ معدنية نقية، 4% نياسيناميد وحمض الهيالورونيك لتوحيد لون البشرة وإخفاء العيوب مع ترطيب عميق يدوم 18 ساعة.',
    ingredients: [
      'Aqua (Water)', 'Dimethicone', 'Niacinamide (4%)', 'Glycerin', 'Caprylic/Capric Triglyceride',
      'Sodium Hyaluronate', 'Rosa Damascena Flower Water', 'Camellia Sinensis Leaf Extract',
      'Tocopheryl Acetate (Vitamin E)', 'Silica', 'Mica', 'Polyglyceryl-4 Isostearate',
      'Ethylhexylglycerin', 'Phenoxyethanol', 'Iron Oxides (CI 77491, CI 77492, CI 77499)',
      'Titanium Dioxide (CI 77891)'
    ],
    keyActives: [
      {
        name: '4% Pure Niacinamide',
        nameAr: '4% نياسيناميد نقي',
        concentration: '4%',
        benefit: 'Refines visible pore size and strengthens lipid barrier resilience throughout the day.',
        benefitAr: 'يقلل مظهر المسام الواسعة ويعزز حاجز البشرة الواقي طوال اليوم.'
      },
      {
        name: 'Multi-Depth Botanical Hyaluronic Acid',
        nameAr: 'حمض الهيالورونيك متعدد الأوزان',
        concentration: '1.5%',
        benefit: 'Locks in 24-hour hydration, preventing product from settling into fine expression lines.',
        benefitAr: 'يحافظ على رطوبة البشرة لمدة 24 ساعة ويمنع تكتل المكياج في الخطوط التعبيرية.'
      },
      {
        name: 'Damask Rose Petal Extract',
        nameAr: 'مستخلص بتلات الورد الدمشقي',
        benefit: 'Calms redness, restores natural suppleness, and imparts an authentic sensory glow.',
        benefitAr: 'يهدئ الاحمرار ويعيد الحيوية والنضارة الطبيعية للبشرة المتعبة.'
      }
    ],
    howToUse: [
      {
        step: 1,
        title: 'Prep & Prime',
        titleAr: 'التحضير والترطيب',
        desc: 'Dispense 1-2 drops onto cleansed, hydrated skin using clean fingertips or a damp velvet sponge.',
        descAr: 'ضعي قطرة إلى قطرتين على بشرة نظيفة ومرطبة باستخدام أطراف الأصابع أو إسفنجة مبللة.'
      },
      {
        step: 2,
        title: 'Center to Outward Blend',
        titleAr: 'التوزيع من المركز للخارج',
        desc: 'Work from the center of the face outward (cheeks, bridge of nose, chin) for seamless blending.',
        descAr: 'ادمجي من منتصف الوجه (الخدين، الأنف، الذقن) نحو الأطراف للحصول على مظهر متجانس.'
      },
      {
        step: 3,
        title: 'Layer if Desired',
        titleAr: 'تثبيت وتغطية إضافية',
        desc: 'Pat an additional micro-drop onto areas requiring extra coverage; sets into soft luminous velvet.',
        descAr: 'ربتي قطرة إضافية خفيفة على المناطق التي تحتاج لتغطية مركزة بدون أي ثقل.'
      }
    ],
    shades: [
      {
        id: '100-porcelain',
        name: '100 Alabaster Silk',
        nameFr: '100 Soie Albâtre',
        nameAr: '100 حرير مرمر',
        hex: '#F9EBE0',
        undertone: 'neutral',
        toneLevel: 'fair',
        description: 'Very fair skin with balanced neutral beige undertone'
      },
      {
        id: '120-vanilla',
        name: '120 Vanilla Cashmere',
        nameFr: '120 Cachemire Vanille',
        nameAr: '120 كشمير الفانيليا',
        hex: '#F4DECD',
        undertone: 'cool',
        toneLevel: 'fair',
        description: 'Fair skin with delicate soft rose petal undertone'
      },
      {
        id: '140-light-sand',
        name: '140 Light Warm Sand',
        nameFr: '140 Sable Doré Clair',
        nameAr: '140 رمل دافئ فاتح',
        hex: '#ECC8B0',
        undertone: 'warm',
        toneLevel: 'light',
        description: 'Light complexion with subtle golden undertone'
      },
      {
        id: '200-almond-buff',
        name: '200 Almond Buff',
        nameFr: '200 Éclat Amande',
        nameAr: '200 لوزي طبيعي',
        hex: '#DFB69A',
        undertone: 'neutral',
        toneLevel: 'medium',
        description: 'Medium complexion with balanced olive/neutral undertones'
      },
      {
        id: '240-golden-honey',
        name: '240 Golden Honey',
        nameFr: '240 Miel Chaud',
        nameAr: '240 عسلي ذهبي دافئ',
        hex: '#D7A783',
        undertone: 'warm',
        toneLevel: 'medium',
        description: 'Medium sun-kissed skin with rich golden peach warmth'
      },
      {
        id: '280-desert-olive',
        name: '280 Mediterranean Olive',
        nameFr: '280 Olive Méditerranéenne',
        nameAr: '280 زيتوني متوسط',
        hex: '#C79A73',
        undertone: 'olive',
        toneLevel: 'medium',
        description: 'Olive/tan North African skin tones with golden-green clarity'
      },
      {
        id: '320-warm-caramel',
        name: '320 Amber Caramel',
        nameFr: '320 Caramel Ambré',
        nameAr: '320 كراميل عنبري',
        hex: '#B9825A',
        undertone: 'warm',
        toneLevel: 'tan',
        description: 'Deep tan complexion with rich golden amber undertone'
      },
      {
        id: '360-spiced-bronze',
        name: '360 Spiced Bronze',
        nameFr: '360 Bronze Épicé',
        nameAr: '360 برونزي دافئ',
        hex: '#A46B46',
        undertone: 'warm',
        toneLevel: 'tan',
        description: 'Deep tan to rich skin with glowing warm terracotta notes'
      },
      {
        id: '400-espresso-suede',
        name: '400 Espresso Suede',
        nameFr: '400 Suède Expresso',
        nameAr: '400 إسبريسو مخملي',
        hex: '#7A472E',
        undertone: 'neutral',
        toneLevel: 'deep',
        description: 'Deep complexion with balanced neutral rich undertone'
      },
      {
        id: '440-rich-cocoa',
        name: '440 Royal Cocoa',
        nameFr: '440 Cacao Royal',
        nameAr: '440 كاكاو ملكي',
        hex: '#5A301E',
        undertone: 'cool',
        toneLevel: 'deep',
        description: 'Very deep rich skin with cool red undertone'
      }
    ],
    beforeAfter: {
      beforeLabel: 'Day 0: Uneven Tone & Redness',
      afterLabel: 'With 1 Drop: Seamless Velvet Blur',
      beforeDesc: 'Visible redness around nose and cheeks, dull texture, open pores.',
      afterDesc: 'Instant satin filter finish, pores minimized, natural dewy glow.',
      durationWeeks: 2
    },
    routineBundleIds: ['prod-cellular-serum', 'prod-cloud-cleanser', 'prod-barrier-cream'],
    reviews: [
      {
        id: 'rev-1',
        author: 'Nour El Houda M.',
        rating: 5,
        date: '2026-09-14',
        skinType: 'combination',
        ageGroup: '25-34',
        shadeUsed: '280 Mediterranean Olive',
        title: 'Finally an olive shade that doesn’t turn orange!',
        comment: 'Finding the right shade in Algeria is always difficult. Shade 280 matches my Mediterranean olive undertone perfectly. Lasts all day through Algiers heat without breaking down.',
        verifiedPurchase: true,
        helpfulCount: 42
      },
      {
        id: 'rev-2',
        author: 'Inès B.',
        rating: 5,
        date: '2026-09-28',
        skinType: 'dry',
        ageGroup: '25-34',
        shadeUsed: '140 Light Warm Sand',
        title: 'Glass skin in a bottle with real hydration',
        comment: 'Feels more like a luxury skincare serum than foundation. The COD delivery arrived in Oran in 48 hours in gorgeous signature packaging.',
        verifiedPurchase: true,
        helpfulCount: 29
      },
      {
        id: 'rev-3',
        author: 'Amina K.',
        rating: 5,
        date: '2026-10-04',
        skinType: 'sensitive',
        ageGroup: '35-44',
        shadeUsed: '240 Golden Honey',
        title: 'No irritation or breakouts, pure luxury',
        comment: 'My skin usually reacts poorly to fragrance or heavy silicones. This feels light, breathable, and so soothing with the rose water and niacinamide.',
        verifiedPurchase: true,
        helpfulCount: 18
      }
    ]
  },
  {
    id: 'prod-cellular-serum',
    name: 'Cellular Youth Nectar Serum',
    nameFr: 'Sérum Nectar Cellulaire Jeunesse',
    nameAr: 'سيروم رحيق الخلايا الشبابي المركز',
    tagline: '24K bio-gold peptides, pure botanical hyaluronic acid, and Damascus rose extract.',
    taglineFr: 'Peptides d\'or 24K, acide hyaluronique pur et rose de Damas pour une fermeté éclatante.',
    taglineAr: 'ببتيدات الذهب عيار 24، حمض الهيالورونيك النقي وورد دمشق لشد البشرة والنضارة الفورية.',
    category: 'skincare',
    priceDZD: 5400,
    priceUSD: 40,
    rating: 5.0,
    reviewCount: 256,
    badge: 'bestseller',
    skinTypes: ['dry', 'normal', 'combination', 'sensitive', 'oily'],
    concerns: ['anti-aging', 'hydration', 'brightening'],
    isVegan: true,
    isParabenFree: true,
    isCrueltyFree: true,
    volume: '30 ml / 1.0 fl. oz.',
    stockCount: 28,
    batchNumber: 'NS-24S12',
    expirationDate: '2027-11-15',
    bgGradient: 'from-[#F9EFE4] to-[#DFBF9F]',
    accentColor: '#D4AF37',
    description: 'An elixir of high-potency cellular regeneration. Suspended with colloidal 24K bio-gold particles and biomimetic collagen-boosting peptides, this serum rapidly absorbs to plump dehydration lines and illuminate dull fatigued skin with lasting vitality.',
    descriptionFr: 'Un élixir de régénération cellulaire haute performance. Enrichi en peptides raffermissants et or colloïdal 24K pour repulper et illuminer intensément la peau.',
    descriptionAr: 'إكسير استثنائي لتجديد خلايا البشرة. مدعم بجزيئات الذهب عيار 24 وببتيدات الكولاجين لتحفيز مرونة الجلد ومقاومة علامات التقدم بالسن ومنح إشراقة حريرية.',
    ingredients: [
      'Rosa Damascena Flower Water', 'Aqua (Water)', 'Glycerin', 'Niacinamide (5%)',
      'Palmitoyl Tripeptide-1', 'Palmitoyl Tetrapeptide-7', 'Colloidal Gold (24K)',
      'Sodium Hyaluronate (Multi-Molecular)', 'Resveratrol', 'Centella Asiatica Leaf Extract',
      'Camellia Sinensis Extract', 'Xanthan Gum', 'Phenoxyethanol', 'Ethylhexylglycerin'
    ],
    keyActives: [
      {
        name: 'Collagen-3 Tripeptide Complex',
        nameAr: 'مركب ثلاثي الببتيد المعزز للكولاجين',
        concentration: '3%',
        benefit: 'Boosts natural skin collagen synthesis by +148% in clinical test panels.',
        benefitAr: 'يعزز إنتاج الكولاجين الطبيعي في البشرة بنسبة +148% في الدراسات السريرية.'
      },
      {
        name: 'Colloidal 24K Bio-Gold',
        nameAr: 'ذهب عيار 24 الغرواني الحيوي',
        benefit: 'Accelerates micro-circulation and neutralizes oxidative free-radical damage.',
        benefitAr: 'ينشط الدورة الدموية الدقيقة ويحمي الخلايا من الإجهاد التأكسدي والشوارد الحرة.'
      },
      {
        name: 'Pure Resveratrol Antioxidant',
        nameAr: 'مضاد الأكسدة ريسفيراترول النقي',
        benefit: 'Evens tone discoloration and restores resilient skin elasticity.',
        benefitAr: 'يوحد تدرجات البشرة ويمنحها مرونة ونضارة مشدودة.'
      }
    ],
    howToUse: [
      {
        step: 1,
        title: 'Morning & Night Warmth',
        titleAr: 'تدفئة القطرات',
        desc: 'Warm 3 to 4 golden drops between the palms of your hands.',
        descAr: 'ضعي 3 إلى 4 قطرات ذهبية بين راحتي يديكِ ودفئيها بلطف.'
      },
      {
        step: 2,
        title: 'Press & Lift',
        titleAr: 'الضغط والرفع اللطيف',
        desc: 'Gently press into neck, jawline, and face using uplifting lymphatic motions.',
        descAr: 'اضغطي برفق على الرقبة وخط الفك والوجه بحركات تصاعدية لتعزيز التصريف اللمفاوي.'
      },
      {
        step: 3,
        title: 'Follow with Cream',
        titleAr: 'تثبيت بالمرطب',
        desc: 'Seal in hydration with Crème Velours Barrier Cream while skin is freshly damp.',
        descAr: 'ثبتي الرطوبة باستخدام كريم الحماية المخملي بينما البشرة لا تزال ندية.'
      }
    ],
    beforeAfter: {
      beforeLabel: 'Baseline: Fine Lines & Loss of Firmness',
      afterLabel: 'After 21 Days: Plump & Radiant',
      beforeDesc: 'Dry patches, prominent laugh lines, lackluster complexion.',
      afterDesc: '+64% measurable bounce, smoothed expression lines, visible luminosity.',
      durationWeeks: 3
    },
    routineBundleIds: ['prod-luminous-silk-foundation', 'prod-barrier-cream'],
    reviews: [
      {
        id: 'rev-c1',
        author: 'Dr. Sarah L.',
        rating: 5,
        date: '2026-09-18',
        skinType: 'dry',
        ageGroup: '35-44',
        title: 'Truly on par with luxury French Parisian brands',
        comment: 'As a dermatologist, I analyze formulations critically. The multi-peptide complex and pure rose water base are remarkable. Absorbs instantly with zero stickiness.',
        verifiedPurchase: true,
        helpfulCount: 51
      },
      {
        id: 'rev-c2',
        author: 'Yasmine H.',
        rating: 5,
        date: '2026-10-09',
        skinType: 'combination',
        ageGroup: '25-34',
        title: 'My skin looks lit from within',
        comment: 'Got it via Yalidine COD in Constantine. The bottle feels heavy and luxurious, and two drops give the most natural glass skin finish.',
        verifiedPurchase: true,
        helpfulCount: 34
      }
    ]
  },
  {
    id: 'prod-barrier-cream',
    name: 'Crème Velours Barrier Cream',
    nameFr: 'Crème Barrière Velours Apaisante',
    nameAr: 'كريم بلسم فيلور لحماية وتجديد حاجز البشرة',
    tagline: '5 Bio-identical ceramides, Madecassoside, and soothing squalane whipped balm.',
    taglineFr: '5 Céramides bio-identiques, Madécassoside et squalane pour restaurer le film hydrolipidique.',
    taglineAr: '5 سيراميدات مطابقة للجلد، ماديكاسوسايد والسكوالان لترميم الحاجز الواقي وتهدئة البشرة.',
    category: 'skincare',
    priceDZD: 4200,
    priceUSD: 32,
    rating: 4.8,
    reviewCount: 198,
    badge: 'new',
    skinTypes: ['dry', 'sensitive', 'combination', 'normal'],
    concerns: ['hydration', 'acne', 'texture'],
    isVegan: true,
    isParabenFree: true,
    isCrueltyFree: true,
    volume: '50 ml / 1.7 oz.',
    stockCount: 35,
    batchNumber: 'NS-24B02',
    expirationDate: '2027-10-10',
    bgGradient: 'from-[#F3EBE6] to-[#E7D6CB]',
    accentColor: '#9C6644',
    description: 'A comforting, velvety cushion balm designed to restore compromised moisture barriers. Formulated with 5 essential skin-identical ceramides, plant-derived squalane, and organic colloidal oat to provide long-lasting comfort without clogging pores.',
    descriptionFr: 'Un baume soyeux ultra-réconfortant pour réparer les barrières cutanées sensibilisées. Infusé de 5 céramides essentiels et de squalane végétal.',
    descriptionAr: 'بلسم مخملي فائق النعومة صُمم لترميم حاجز الرطوبة المتضرر. مدعم بـ 5 سيراميدات أساسية وسكوالان نباتي لتهدئة التهيج والجفاف دون سد المسام.',
    ingredients: [
      'Aqua (Water)', 'Caprylic/Capric Triglyceride', 'Squalane (Olive)', 'Glycerin',
      'Cetearyl Olivate', 'Sorbitan Olivate', 'Ceramide NP', 'Ceramide AP', 'Ceramide EOP',
      'Phytosphingosine', 'Cholesterol', 'Madecassoside (Centella Asiatica)',
      'Butyrospermum Parkii (Shea) Butter', 'Avena Sativa (Oat) Kernel Extract',
      'Allantoin', 'Carbomer', 'Phenoxyethanol'
    ],
    keyActives: [
      {
        name: '5 Essential Ceramide Complex (NP/AP/EOP)',
        nameAr: 'مجمع السيراميدات الخمسة الأساسية',
        benefit: 'Rebuilds intracellular lipid mortar to stop moisture loss and prevent external irritation.',
        benefitAr: 'يعيد بناء الطبقة الدهنية بين الخلايا لمنع فقدان الماء وحماية البشرة من العوامل الخارجية.'
      },
      {
        name: 'Concentrated Madecassoside',
        nameAr: 'ماديكاسوسايد عالي النقاوة',
        benefit: 'Clinically calms redness, post-acne sensitivity, and burning sensations within 15 minutes.',
        benefitAr: 'يهدئ الاحمرار والتهيج الناتج عن الحبوب أو التقشير في غضون 15 دقيقة.'
      }
    ],
    howToUse: [
      {
        step: 1,
        title: 'Scoop & Melt',
        titleAr: 'أخذ الكمية وتدفئتها',
        desc: 'Take a dime-sized amount with the included spatula and warm between fingertips.',
        descAr: 'خذي كمية بحجم حبة البازلاء باستخدام الملعقة المرفقة ودفئيها بأطراف الأصابع.'
      },
      {
        step: 2,
        title: 'Smooth & Cocoon',
        titleAr: 'التدليك والتغطية',
        desc: 'Smooth gently over face and neck until it melts from rich cream into a silky protective veil.',
        descAr: 'مرري بلطف على الوجه والرقبة حتى يتحول القوام المخملي إلى غشاء حريري واقٍ.'
      }
    ],
    routineBundleIds: ['prod-cellular-serum', 'prod-cloud-cleanser'],
    reviews: [
      {
        id: 'rev-b1',
        author: 'Leila T.',
        rating: 5,
        date: '2026-09-22',
        skinType: 'sensitive',
        ageGroup: '18-24',
        title: 'Saved my damaged barrier after retinol peeling',
        comment: 'My skin was burning from over-exfoliation. This cream soothed it on contact without stinging. Highly recommend!',
        verifiedPurchase: true,
        helpfulCount: 22
      }
    ]
  },
  {
    id: 'prod-dew-resurfacing-essence',
    name: 'Glow Dew AHA/BHA Resurfacing Essence',
    nameFr: 'Essence Peeling Doux AHA/BHA Glow Dew',
    nameAr: 'إسنس التقشير اللطيف والنضارة بأحماض ألفا وبيتا هيدروكسي',
    tagline: '7% gentle lactic acid, willow bark BHA, and fermented galactomyces.',
    taglineFr: '7% acide lactique doux, extrait de saule et ferments galactomyces pour un teint lisse et uniforme.',
    taglineAr: '7% حمض اللاكتيك اللطيف وخلاصة لحاء الصفصاف لتنقية المسام وتجديد خلايا البشرة.',
    category: 'skincare',
    priceDZD: 3800,
    priceUSD: 28,
    rating: 4.7,
    reviewCount: 165,
    badge: 'new',
    skinTypes: ['oily', 'combination', 'normal'],
    concerns: ['acne', 'pores', 'brightening', 'texture'],
    isVegan: true,
    isParabenFree: true,
    isCrueltyFree: true,
    volume: '120 ml / 4.0 fl. oz.',
    stockCount: 19,
    batchNumber: 'NS-24E05',
    expirationDate: '2027-09-12',
    bgGradient: 'from-[#FBE9E7] to-[#E3CEC5]',
    accentColor: '#C87D65',
    description: 'A transformative liquid treatment that gently dissolves dead surface cells while infusing skin with soothing botanical waters. Unclogs congested pores, softens rough patches, and creates the ideal smooth canvas for makeup.',
    descriptionFr: 'Un soin liquide exfoliant doux qui élimine les cellules mortes et resserre les pores visibles tout en hydratant.',
    descriptionAr: 'مستحضر سائل فاخر يذيب خلايا الجلد الميتة بلطف وينقي المسام المسدودة بفضل حمض اللاكتيك المخمر ومستخلص الشاي الأخضر.',
    ingredients: [
      'Aqua (Water)', 'Lactic Acid (7%)', 'Salix Alba (Willow Bark) Extract',
      'Galactomyces Ferment Filtrate', 'Hamamelis Virginiana Water', 'Glycerin',
      'Sodium Hydroxide', 'Panthenol (Pro-Vitamin B5)', 'Allantoin', 'Citric Acid'
    ],
    keyActives: [
      {
        name: '7% Bio-Fermented Lactic Acid',
        nameAr: '7% حمض اللاكتيك المخمر طبيعياً',
        benefit: 'Gently loosens cellular glue without stinging or drying out the surface.',
        benefitAr: 'يقشر بلطف دون أن يسبب أي وخز أو جفاف للسطح.'
      },
      {
        name: 'Natural Willow Bark BHA',
        nameAr: 'مستخلص لحاء الصفصاف الطبيعي BHA',
        benefit: 'Penetrates oil-rich pores to clear blackheads and prevent congestion.',
        benefitAr: 'يتغلغل داخل المسام الدهنية لإزالة الرؤوس السوداء ومنع انسدادها.'
      }
    ],
    howToUse: [
      {
        step: 1,
        title: 'Night Application',
        titleAr: 'الاستخدام المسائي',
        desc: 'Sweep 3-4 drops across clean face and neck with a soft cotton pad or press with palms.',
        descAr: 'مرري 3-4 قطرات على وجه ورقبة نظيفة باستخدام قطعة قطنية أو اضغطي براحة اليد.'
      }
    ],
    routineBundleIds: ['prod-cellular-serum', 'prod-barrier-cream'],
    reviews: []
  },
  {
    id: 'prod-cloud-cleanser',
    name: 'Botanical Cloud Balancing Cleanser',
    nameFr: 'Gelée Démaquillante Nuage Botanique',
    nameAr: 'جل منظف ومزيل مكياج السحابة النباتية',
    tagline: 'Low-pH gel-to-milk cleanser with green tea, squalane, and chamomile.',
    taglineFr: 'Nettoyant doux gel-en-lait au thé vert, squalane et camomille pour éliminer le maquillage waterproof.',
    taglineAr: 'منظف يتحول من جل إلى حليب ناعم، يزيل المكياج المقاوم للماء دون تجفيف البشرة.',
    category: 'skincare',
    priceDZD: 3200,
    priceUSD: 24,
    rating: 4.9,
    reviewCount: 310,
    badge: 'bestseller',
    skinTypes: ['sensitive', 'dry', 'oily', 'combination', 'normal'],
    concerns: ['hydration', 'pores', 'acne'],
    isVegan: true,
    isParabenFree: true,
    isCrueltyFree: true,
    volume: '150 ml / 5.1 fl. oz.',
    stockCount: 50,
    batchNumber: 'NS-24K01',
    expirationDate: '2027-12-01',
    bgGradient: 'from-[#EFF5EE] to-[#D5E3D2]',
    accentColor: '#5E7A60',
    description: 'A transformative gel that melts waterproof makeup and environmental pollutants, turning into a soothing milk upon water contact. Leaves skin balanced, supple, and never tight.',
    descriptionFr: 'Une gelée transformatrice qui dissout maquillage et impuretés en se métamorphosant en un lait velouté.',
    descriptionAr: 'جل منظف مبتكر يذيب أصعب أنواع المكياج والشوائب ويتحول لحليب ناعم عند ملامسة الماء، ليترك بشرتك ناعمة ومرنة تماماً.',
    ingredients: [
      'Aqua (Water)', 'Glycerin', 'Sodium Cocoyl Isethionate', 'Squalane',
      'Camellia Sinensis (Green Tea) Leaf Water', 'Chamomilla Recutita Extract',
      'Coco-Glucoside', 'Glyceryl Oleate', 'Citric Acid', 'Phenoxyethanol'
    ],
    keyActives: [
      {
        name: 'Olive-Derived Squalane',
        nameAr: 'سكوالان نباتي مستخلص من الزيتون',
        benefit: 'Dissolves stubborn long-wear foundation while replenishing essential lipids.',
        benefitAr: 'يذيب كريم الأساس المقاوم للماء بسهولة مع الحفاظ على الزيوت الطبيعية.'
      }
    ],
    howToUse: [
      {
        step: 1,
        title: 'Massage on Dry Skin',
        titleAr: 'التدليك على بشرة جافة',
        desc: 'Massage 1-2 pumps onto dry face in circular motions to melt away makeup.',
        descAr: 'دلكي ضخة أو ضختين على بشرة جافة بحركات دائرية لإذابة كل بقايا المكياج.'
      },
      {
        step: 2,
        title: 'Emulsify & Rinse',
        titleAr: 'إضافة الماء والشطف',
        desc: 'Add warm water to transform into a milky emulsion, then rinse cleanly.',
        descAr: 'أضيفي قطرات من الماء الفاتر ليتحول إلى حليب لطيف، ثم اشطفي بالماء.'
      }
    ],
    routineBundleIds: ['prod-luminous-silk-foundation', 'prod-cellular-serum'],
    reviews: []
  },
  {
    id: 'prod-iconic-radiance-trio',
    name: 'The Iconic Radiance Routine Trio',
    nameFr: 'Trio Culte Éclat & Jeunesse',
    nameAr: 'مجموعة الإشراقة الثلاثية الأيقونية الكاملة',
    tagline: 'Complete 3-step ritual: Cloud Cleanser + Cellular Serum + Barrier Cream with 15% VIP bundle discount.',
    taglineFr: 'Rituel complet en 3 étapes : Nettoyant + Sérum Nectar + Crème Barrière avec 15% de réduction.',
    taglineAr: 'روتين متكامل من 3 خطوات: منظف السحابة + سيروم الخلايا + كريم الحماية بخصم خاص 15%.',
    category: 'bundles',
    priceDZD: 10800, // Regular sum: 3200 + 5400 + 4200 = 12800 -> 10800 (~15% off)
    priceUSD: 80,
    rating: 5.0,
    reviewCount: 412,
    badge: 'bestseller',
    skinTypes: ['dry', 'combination', 'normal', 'sensitive', 'oily'],
    concerns: ['anti-aging', 'hydration', 'brightening', 'pores'],
    isVegan: true,
    isParabenFree: true,
    isCrueltyFree: true,
    volume: '3 Full-Size Luxury Products',
    stockCount: 22,
    batchNumber: 'NS-24TRIO',
    expirationDate: '2027-11-20',
    bgGradient: 'from-[#FAF0E6] to-[#E3C6AF]',
    accentColor: '#C87D65',
    description: 'The definitive daily luxury skincare ritual. Clinically balanced to gently cleanse without stripping, flood skin with multi-peptides and 24K gold, and seal in 24-hour hydration with bio-identical ceramides.',
    descriptionFr: 'Le rituel de beauté signature complet pour révéler l\'éclat naturel de votre peau chaque matin et soir.',
    descriptionAr: 'الروتين الفاخر الأكثر طلباً للعناية الكاملة: تنظيف موازن، تغذية فائقة بببتيدات الذهب، وحماية مستمرة بسيراميدات الترطيب الفائق.',
    ingredients: ['See individual full-size product packaging for comprehensive lists.'],
    keyActives: [
      {
        name: 'Comprehensive Synergistic Actives',
        nameAr: 'مركبات نشطة متكاملة ومتناغمة',
        benefit: 'Peptides + Niacinamide + 5 Ceramides work synergistically to smooth, firm, and hydrate.',
        benefitAr: 'ببتيدات + نياسيناميد + 5 سيراميدات تعمل معاً لتنعيم، شد وترطيب البشرة بعمق.'
      }
    ],
    howToUse: [
      {
        step: 1,
        title: 'Step 1: Cloud Cleanser',
        titleAr: 'الخطوة 1: منظف السحابة',
        desc: 'Melt impurities and prep the canvas with the low-pH botanical gel-to-milk.',
        descAr: 'نظفي ونقي المسام بلطف وحضري البشرة لامتصاص العناصر المغذية.'
      },
      {
        step: 2,
        title: 'Step 2: Cellular Serum',
        titleAr: 'الخطوة 2: سيروم الخلايا',
        desc: 'Infuse 3 golden drops of peptide nectar to awaken firmness and radiance.',
        descAr: 'وزعي 3 قطرات ذهبية لتغذية البشرة بعمق وتحفيز الكولاجين.'
      },
      {
        step: 3,
        title: 'Step 3: Crème Velours',
        titleAr: 'الخطوة 3: كريم فيلور',
        desc: 'Lock in moisture and protect skin barrier with the ceramide cushion balm.',
        descAr: 'ثبتي الرطوبة واحمي الحاجز الواقي بالكريم المخملي لنعومة تدوم طويلاً.'
      }
    ],
    routineBundleIds: ['prod-luminous-silk-foundation'],
    reviews: [
      {
        id: 'rev-trio-1',
        author: 'Rania D.',
        rating: 5,
        date: '2026-10-12',
        skinType: 'combination',
        ageGroup: '25-34',
        title: 'Best beauty purchase I have ever made in Algeria',
        comment: 'The bundle packaging looks like something out of a luxury boutique in Paris. My skin hasn’t felt this smooth or looked this glowing in years.',
        verifiedPurchase: true,
        helpfulCount: 48
      }
    ]
  },
  {
    id: 'prod-velvet-lip-tint',
    name: 'Velvet Lip Soufflé Tint',
    nameFr: 'Soufflé Lèvres Velours Mat',
    nameAr: 'سوفليه الشفاه المخملي المات فائق النعومة',
    tagline: 'Weightless whipped lip tint with hyaluronic spheres and Moroccan pomegranate oil.',
    taglineFr: 'Teinte lèvres aérienne au fini flouté velouté infusée d\'huile de grenade et d\'acide hyaluronique.',
    taglineAr: 'حمرة شفاه هوائية بلمسة مخملية مموهة، غنية بحمض الهيالورونيك وزيت الرمان المرطب.',
    category: 'makeup',
    priceDZD: 2600,
    priceUSD: 20,
    rating: 4.9,
    reviewCount: 184,
    badge: 'new',
    skinTypes: ['dry', 'normal', 'sensitive', 'combination', 'oily'],
    concerns: ['hydration', 'texture'],
    isVegan: true,
    isParabenFree: true,
    isCrueltyFree: true,
    volume: '6.5 ml / 0.22 fl. oz.',
    stockCount: 30,
    batchNumber: 'NS-24L09',
    expirationDate: '2027-10-25',
    bgGradient: 'from-[#F5D8CE] to-[#DE9F8F]',
    accentColor: '#9E3D48',
    description: 'A cloud-like whipped matte lip cream that delivers rich, diffused color with a soft-focus velvet finish. Never dries or flakes lips thanks to cold-pressed botanical oils and plumping hyaluronic spheres.',
    descriptionFr: 'Une texture soufflée ultra-légère qui enrobe les lèvres d\'un voile mat velouté sans aucun dessèchement.',
    descriptionAr: 'تركيبة سوفليه خفيفة كالغيوم تمنح الشفاه لوناً ناعماً ومات مخملياً لا يجف أبداً، مع ترطيب فائق يدوم طوال اليوم.',
    ingredients: [
      'Dimethicone', 'Punica Granatum (Pomegranate) Seed Oil', 'Squalane',
      'Sodium Hyaluronate', 'Tocopherol (Vitamin E)', 'Silica Silylate',
      'Fragrance (Parfum Naturel)', 'Red 7 Lake (CI 15850)', 'Iron Oxides (CI 77491, CI 77499)'
    ],
    keyActives: [
      {
        name: 'Plumping Hyaluronic Filling Spheres',
        nameAr: 'كريات الهيالورونيك الممتلئة',
        benefit: 'Fills fine lip crevices for a visibly smoother, pouty contour.',
        benefitAr: 'يملأ خطوط الشفاه الدقيقة لمظهر ممتلئ وأكثر جاذبية.'
      }
    ],
    howToUse: [
      {
        step: 1,
        title: 'Glide & Diffuse',
        titleAr: 'التمرير والدمج',
        desc: 'Glide applicator from center outwards, then tap gently with ring finger for a Parisian blotted effect.',
        descAr: 'مرري الفرشاة من المركز نحو الأطراف، ثم ربتي بإصبعك للحصول على تأثير الشفاه المدمجة الباريسية.'
      }
    ],
    shades: [
      {
        id: 'lip-rose-nude',
        name: '01 Rose Poudré',
        nameFr: '01 Rose Poudré',
        nameAr: '01 وردي بودري ناعم',
        hex: '#C4776D',
        undertone: 'neutral',
        toneLevel: 'fair',
        description: 'Soft dusty petal nude for everyday sophistication'
      },
      {
        id: 'lip-terracotta',
        name: '02 Sahara Terracotta',
        nameFr: '02 Terre Cuite Sahara',
        nameAr: '02 تراب الصحراء الدافئ',
        hex: '#B85D43',
        undertone: 'warm',
        toneLevel: 'medium',
        description: 'Warm burnt clay with cinnamon undertones'
      },
      {
        id: 'lip-berry-noir',
        name: '03 Royal Berry',
        nameFr: '03 Baie Royale',
        nameAr: '03 توت ملكي ساحر',
        hex: '#7A2841',
        undertone: 'cool',
        toneLevel: 'deep',
        description: 'Deep sensual berry with rich ruby undertones'
      },
      {
        id: 'lip-caramel-nude',
        name: '04 Warm Caramel Kiss',
        nameFr: '04 Baiser Caramel Chaud',
        nameAr: '04 كراميل دافئ غني',
        hex: '#A06145',
        undertone: 'warm',
        toneLevel: 'medium',
        description: 'Toffee neutral nude perfect for olive and warm skin'
      }
    ],
    routineBundleIds: ['prod-luminous-silk-foundation'],
    reviews: []
  },
  {
    id: 'prod-sensory-body-oil',
    name: 'Oud & Damask Rose Sensory Dry Oil',
    nameFr: 'Huile Sèche Sensorielle Oud & Rose de Damas',
    nameAr: 'زيت جاف معطر بخشب العود وورد دمشق الفاخر',
    tagline: 'Multi-use golden shimmer dry oil with Moroccan argan and night-blooming jasmine.',
    taglineFr: 'Huile sèche sublimatrice corps et cheveux aux notes enivrantes de bois d\'oud et pétales de rose.',
    taglineAr: 'زيت جاف فاخر للجسم والشعر يمنح لمعاناً ساتانياً ناعماً مع عطر العود والورد الآسر.',
    category: 'fragrance',
    priceDZD: 4500,
    priceUSD: 34,
    rating: 5.0,
    reviewCount: 142,
    badge: 'limited',
    skinTypes: ['dry', 'normal', 'combination', 'sensitive', 'oily'],
    concerns: ['hydration', 'brightening'],
    isVegan: true,
    isParabenFree: true,
    isCrueltyFree: true,
    volume: '100 ml / 3.4 fl. oz.',
    stockCount: 16,
    batchNumber: 'NS-24O07',
    expirationDate: '2027-08-15',
    bgGradient: 'from-[#F5EADB] to-[#D6B58F]',
    accentColor: '#9C6F3B',
    description: 'A multi-sensory dry oil infused with precious agarwood (oud), organic Damascus rose Otto, and cold-pressed Moroccan argan oil. Envelops body, décolletage, and hair tips in a non-greasy satin sheen with an intoxicating, long-lasting scent trail.',
    descriptionFr: 'Une huile sèche soyeuse aux effluves orientales prestigieuses qui satine la peau et illumine les pointes des cheveux sans fini gras.',
    descriptionAr: 'زيت جاف راقٍ متعدد الاستخدامات بعبير العود الأصيل وورد دمشق وزيت الأركان المغربي النقي، يغمر الجسم والشعر بلمسة حريرية غير دهنية تدوم لساعات.',
    ingredients: [
      'Argania Spinosa (Argan) Kernel Oil', 'Caprylic/Capric Triglyceride',
      'Simmondsia Chinensis (Jojoba) Seed Oil', 'Rosa Damascena Flower Oil',
      'Aquilaria Agallocha (Oud) Wood Extract', 'Jasminum Officinale Extract',
      'Tocopherol (Vitamin E)', 'Mica (Golden Shimmer)'
    ],
    keyActives: [
      {
        name: 'Cold-Pressed Moroccan Argan Oil',
        nameAr: 'زيت الأركان المغربي المعصور على البارد',
        benefit: 'Rich in fatty acids and Vitamin E to soften rough dry skin and tame frizz.',
        benefitAr: 'غني بالأحماض الدهنية وفيتامين E لتنعيم البشرة الجافة وتغذية أطراف الشعر.'
      }
    ],
    howToUse: [
      {
        step: 1,
        title: 'Post-Shower Warmth',
        titleAr: 'بعد الاستحمام',
        desc: 'Spritz onto damp skin or warm in hands and smooth along legs, collarbones, and hair ends.',
        descAr: 'رشي على بشرة ندية بعد الاستحمام أو دفئيه في يديك ومرريه على الذراعين والرقبة والشعر.'
      }
    ],
    routineBundleIds: ['prod-barrier-cream'],
    reviews: []
  }
];
