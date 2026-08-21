const withWeight = (items, weightGrams) => items.map((item) => ({ ...item, weightGrams }));

export const CLOUD_PICKLES_DB = withWeight([
  { id: 'avakaya-mango', name: 'Aavakaaya — Mango (Plain)', nameTe: 'ఆవకాయ', desc: 'The pride of Andhra—firm green mango block recipes.', price: 800, unit: 'KG', emoji: '🥭' },
  { id: 'pulihara-avakaya', name: 'Tamarind Aavakaaya', nameTe: 'పులిహోర ఆవకాయ', desc: 'Fusion of green mango blocks and tamarind pulihara reductions.', price: 800, unit: 'KG', emoji: '🍛' },
  { id: 'menthikaya', name: 'Fenugreek flavored Aavakaaya', nameTe: 'మెంతికాయ', desc: 'Traditional mango chunks hit with fenugreek powder.', price: 800, unit: 'KG', emoji: '🌿' },
  { id: 'bellam-avakaya', name: 'Sweetened Aavakaaya', nameTe: 'బెల్లం ఆవకాయ', desc: 'Sweet-sour recipe blending molten jaggery matrices.', price: 800, unit: 'KG', emoji: '🍯' },
  { id: 'maggai', name: 'Maagaaya (Tender mango)', nameTe: 'మాగాయ', desc: 'Sun-dried shredded mango strips with rich methi layers.', price: 800, unit: 'KG', emoji: '🥭' },
  { id: 'allam', name: 'Ginger', nameTe: 'అల్లం', desc: 'Zesty ginger root sweetened with country jaggery blocks.', price: 800, unit: 'KG', emoji: '🫚' },
  { id: 'usirikaya', name: 'Amla', nameTe: 'ఉసిరికాయ', desc: 'Whole vitamin-rich amla berries saturated in cold oils.', price: 800, unit: 'KG', emoji: '🟢' },
  { id: 'debbakaya', name: 'Citron', nameTe: 'దబ్బకాయ', desc: 'Premium wild citron peel blocks with therapeutic properties.', price: 800, unit: 'KG', emoji: '🍊' },
  { id: 'gongura-pachadi', name: 'Gongura (Roselle leaf)', nameTe: 'గోంగూర పచ్చడి', desc: 'Sorrel leaves wilted and ground with cold-pressed oils.', price: 800, unit: 'KG', emoji: '🌱' },
  { id: 'gongura-pandu', name: 'Gongura red chilli', nameTe: 'గోంగూర పండుమిర్చి', desc: 'Tangy sorrel leaves combined with hot ripe red chilis.', price: 800, unit: 'KG', emoji: '🌿' },
  { id: 'kakarakaya', name: 'Bitter gourd', nameTe: 'కాకరకాయ', desc: 'Bitter gourd wheels flash-fried and tossed in dark masalas.', price: 800, unit: 'KG', emoji: '🥒' },
  { id: 'nimmakaya', name: 'Lemon', nameTe: 'నిమ్మకాయ', desc: 'Classic salt-cured sour lemon wedges offering a perfect punch.', price: 800, unit: 'KG', emoji: '🍋' },
  { id: 'dosa-avakaya', name: 'Yellow cucumber', nameTe: 'దోసఆవకాయ', desc: 'Crisp cucumber blocks in custom mustard-chili marinades.', price: 800, unit: 'KG', emoji: '🥒' },
  { id: 'pandu-mirchi', name: 'Red chilli', nameTe: 'పండుమిర్చి', desc: 'Fiery crimson paste made from freshly crushed winter chilis.', price: 800, unit: 'KG', emoji: '🔴' },
  { id: 'chintakaya-pandu', name: 'Tamarind red chilli', nameTe: 'చింతకాయ పండుమిర్చి', desc: 'Raw stone-ground tamarind pulp with ripe red chilis.', price: 800, unit: 'KG', emoji: '🍂' },
  { id: 'tomato-pickle', name: 'Tomato', nameTe: 'టొమాటో', desc: 'Slow-cooked local tomatoes and ground mustard.', price: 800, unit: 'KG', emoji: '🍅' },
], 1000);

export const CLOUD_PODIS_DB = withWeight([
  { id: 'kandi-podi', name: 'Toor dal podi', nameTe: 'కంది పొడి', desc: 'Roasted yellow split-pigeon peas, ground to mix with hot ghee rice.', price: 180, unit: '200g', emoji: '🌾' },
  { id: 'karvepak-podi', name: 'Curryleaf podi', nameTe: 'కరివేపాకు పొడి', desc: 'Aromatic green blend made from crisp curry leaves and cumin seeds.', price: 180, unit: '200g', emoji: '🌿' },
  { id: 'palli-podi', name: 'Peanut podi', nameTe: 'పల్లీల పొడి', desc: 'Savory peanut meal stone-churned with roasted garlic cloves.', price: 180, unit: '200g', emoji: '🥜' },
  { id: 'chutney-podi', name: 'Chutney podi', nameTe: 'చట్నీ పొడి', desc: 'Roasted dal formulation designed to make instant dipping sides with water.', price: 180, unit: '200g', emoji: '🥣' },
  { id: 'idly-karam-podi', name: 'Idly kaaram', nameTe: 'ఇడ్లీ పొడి', desc: 'The iconic spicy gun powder blend packed with black gram layers.', price: 180, unit: '200g', emoji: '🔥' },
  { id: 'nuvulla-podi', name: 'Sesame podi', nameTe: 'నువ్వుల పొడి', desc: 'Nutty roasted seasoning powder processed from white sesame crops.', price: 180, unit: '200g', emoji: '✨' },
  { id: 'kobbari-karam-podi', name: 'Dry coconut masala podi', nameTe: 'కొబ్బరికారం', desc: 'Freshly dehydrated coconut shreds crushed with hot red chilies.', price: 180, unit: '200g', emoji: '🥥' },
  { id: 'sambar-podi', name: 'Saambaar podi', nameTe: 'సాంబార్ పొడి', desc: 'Traditional spice layout using coriander seeds and dry chilis.', price: 180, unit: '200g', emoji: '🍲' },
  { id: 'rasam-podi', name: 'Rasam podi', nameTe: 'రసం పొడి', desc: 'Black peppercorn and heavy cumin infusion built for hot soup bases.', price: 180, unit: '200g', emoji: '🥣' },
  { id: 'vangheebath-podi', name: 'Vaangeebath podi', nameTe: 'వాంగీబాత్ పొడి', desc: 'Rich recipe flavored with light cloves, perfect for brinjal rice.', price: 180, unit: '200g', emoji: '🍆' },
  { id: 'bisibelabath-podi', name: 'Bisibelabath podi', nameTe: 'బిసిబేళబాత్ పొడి', desc: 'Aromatic spice blend for authentic bisi bele bath rice.', price: 180, unit: '200g', emoji: '🍛' },
], 200);

export const CLOUD_FRYUMS_DB = withWeight([
  { id: 'gummadi-vadiyalu', name: 'Ash gourd fryums', nameTe: 'గుమ్మడి వడియాలు', desc: 'Traditional hand-dropped ash gourd chunks with pulse batters.', price: 300, unit: '200g', emoji: '☀️' },
  { id: 'sago-papads', name: 'Sago', nameTe: 'సగ్గుబియ్యం వడియాలు', desc: 'Translucent tapioca pearl discs sun-cured on high terrace layouts.', price: 140, unit: '200g', emoji: '⚪' },
  { id: 'tomato-papads', name: 'Tomato flavoured', nameTe: 'టొమాటొ వడియాలు', desc: 'Dehydrated tomato pulp processed cleanly into crispy wafers.', price: 140, unit: '200g', emoji: '🍅' },
  { id: 'urid-fryums', name: 'Urid dal fryums', nameTe: 'వక్క / కూర వడియాలు', desc: 'High-protein split black gram drops whipped and solar dried.', price: 300, unit: '200g', emoji: '🧄' },
  { id: 'rice-papads', name: 'Rice papads — Plain', nameTe: 'బియ్యం వడియాలు', desc: 'Pristine white crackers prepared utilizing filtered rice starch cooks.', price: 120, unit: '200g', emoji: '🍚' },
  { id: 'muruku-fryums', name: 'Rice papads — Muruku shaped', nameTe: 'బియ్యం వడియాలు', desc: 'Coiled loop spirals extruded using hand brass presses.', price: 140, unit: '200g', emoji: '🌀' },
  { id: 'challa-mirapa', name: 'Curd chillies', nameTe: 'చల్ల మిరపకాయలు', desc: 'Traditional curd-soaked, salt-cured green chilis sun-baked down.', price: 300, unit: '200g', emoji: '🌶️' },
], 200);

export const ALL_PRODUCTS = [...CLOUD_PICKLES_DB, ...CLOUD_PODIS_DB, ...CLOUD_FRYUMS_DB];

export const WHATSAPP_DESK_NUMBERS = {
  Domestic: { wa: '917989350068', display: '+91 7989350068' },
  International: { wa: '6591169217', display: '+65 9116 9217' },
};

export const HERO_SLIDES = [
  { id: 1, src: '/Pickles1-banner.jpg', alt: 'Pickle Jaadi - Traditional Andhra Pickles Collection', href: null },
  { id: 2, src: '/Pickles-banner.jpg', alt: 'Artisanal Andhra Pickles (Pachadi)', href: '#pickles' },
  { id: 3, src: '/Podi-banner.jpg', alt: 'Authentic Podis Collection', href: '#powders' },
  { id: 4, src: '/Fryums-banner.jpg', alt: 'Sun-Dried Fryums and Papads', href: '#fryums' },
];

export const TESTIMONIALS = [
  { quote: "The Dosa-Avakaya tastes exactly like my grandma's preparations. Delivery to California was fast and clean.", author: 'Lakshmi K., USA NRI' },
  { quote: 'Exceptional Kandi Podi. The aroma of perfectly roasted dals is beautiful. Professional leakproof scaling.', author: 'Rajesh V., Bengaluru' },
  { quote: 'Challa Mirapakayallu are crisp and sun-dried perfectly. Excellent accompaniment for curd rice.', author: 'Sarada M., Hyderabad' },
];
