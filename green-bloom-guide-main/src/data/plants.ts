export type PollutionLevel = 'low' | 'medium' | 'high';
export type SpaceType = 'roadside' | 'home' | 'office' | 'balcony' | 'open-ground';
export type PlantingType = 'soil' | 'pot';
export type Location = 'indoor' | 'outdoor';
export type SunlightLevel = 'low' | 'partial' | 'full';
export type AreaSize = 'very-small' | 'small' | 'medium' | 'large';

export interface Plant {
  id: string;
  name: string;
  scientificName: string;
  emoji: string;
  description: string;
  airPurifying: boolean;
  pollutionTolerance: PollutionLevel[];
  spaceTypes: SpaceType[];
  plantingTypes: PlantingType[];
  locations: Location[];
  sunlight: SunlightLevel[];
  wateringFrequency: string;
  difficulty: 'easy' | 'moderate' | 'hard';
  benefits: string[];
  avoidWhen?: string[];
  soilMix?: string;
  survivalRate: number; // percentage
  areaSizes: AreaSize[]; // which area sizes this plant fits
}

export interface SoilRecommendation {
  name: string;
  emoji: string;
  description: string;
  ingredients: string[];
  bestFor: SpaceType[];
}

export const plants: Plant[] = [
  {
    id: '1',
    name: 'Snake Plant',
    scientificName: 'Sansevieria trifasciata',
    emoji: '🌿',
    description: 'One of the best air-purifying plants. Converts CO2 to oxygen at night, perfect for bedrooms.',
    airPurifying: true,
    pollutionTolerance: ['low', 'medium', 'high'],
    spaceTypes: ['home', 'office', 'balcony'],
    plantingTypes: ['soil', 'pot'],
    locations: ['indoor', 'outdoor'],
    sunlight: ['low', 'partial'],
    wateringFrequency: 'Every 2-3 weeks',
    difficulty: 'easy',
    benefits: ['Removes formaldehyde', 'Produces oxygen at night', 'Very low maintenance'],
    soilMix: 'Well-draining mix with sand and perlite',
    survivalRate: 95,
    areaSizes: ['very-small', 'small', 'medium'],
  },
  {
    id: '2',
    name: 'Peace Lily',
    scientificName: 'Spathiphyllum',
    emoji: '🌸',
    description: 'Beautiful flowering plant that excels at removing indoor air pollutants like benzene and ammonia.',
    airPurifying: true,
    pollutionTolerance: ['low', 'medium'],
    spaceTypes: ['home', 'office'],
    plantingTypes: ['pot'],
    locations: ['indoor'],
    sunlight: ['low', 'partial'],
    wateringFrequency: 'Weekly',
    difficulty: 'easy',
    benefits: ['Removes benzene & ammonia', 'Beautiful white flowers', 'Increases humidity'],
    avoidWhen: ['Direct sunlight areas', 'Homes with pets'],
    soilMix: 'Rich potting mix with compost',
    survivalRate: 85,
    areaSizes: ['very-small', 'small', 'medium'],
  },
  {
    id: '3',
    name: 'Aloe Vera',
    scientificName: 'Aloe barbadensis',
    emoji: '🌵',
    description: 'Medicinal succulent that purifies air and provides healing gel. Thrives in sunny spots.',
    airPurifying: true,
    pollutionTolerance: ['low', 'medium'],
    spaceTypes: ['home', 'balcony', 'office'],
    plantingTypes: ['pot'],
    locations: ['indoor', 'outdoor'],
    sunlight: ['partial', 'full'],
    wateringFrequency: 'Every 2-3 weeks',
    difficulty: 'easy',
    benefits: ['Medicinal gel', 'Removes formaldehyde', 'Low water needs'],
    avoidWhen: ['Very cold climates', 'Overwatering prone areas'],
    soilMix: 'Sandy, well-draining cactus mix',
    survivalRate: 90,
    areaSizes: ['very-small', 'small', 'medium'],
  },
  {
    id: '4',
    name: 'Neem Tree',
    scientificName: 'Azadirachta indica',
    emoji: '🌳',
    description: 'The ultimate pollution fighter. Absorbs CO2, SO2, and produces oxygen abundantly.',
    airPurifying: true,
    pollutionTolerance: ['low', 'medium', 'high'],
    spaceTypes: ['roadside', 'open-ground'],
    plantingTypes: ['soil'],
    locations: ['outdoor'],
    sunlight: ['full'],
    wateringFrequency: 'Weekly when young',
    difficulty: 'moderate',
    benefits: ['Absorbs CO2 & SO2', 'Natural pesticide', 'Medicinal properties', 'Shade provider'],
    soilMix: 'Deep soil with compost and vermicompost',
    survivalRate: 80,
    areaSizes: ['large'],
  },
  {
    id: '5',
    name: 'Money Plant',
    scientificName: 'Epipremnum aureum',
    emoji: '💚',
    description: 'Fast-growing vine that removes indoor pollutants. Grows in water or soil.',
    airPurifying: true,
    pollutionTolerance: ['low', 'medium', 'high'],
    spaceTypes: ['home', 'office', 'balcony'],
    plantingTypes: ['soil', 'pot'],
    locations: ['indoor', 'outdoor'],
    sunlight: ['low', 'partial'],
    wateringFrequency: 'Weekly',
    difficulty: 'easy',
    benefits: ['Removes CO & benzene', 'Grows in water', 'Fast growing'],
    soilMix: 'Regular potting mix with perlite',
    survivalRate: 95,
    areaSizes: ['very-small', 'small', 'medium'],
  },
  {
    id: '6',
    name: 'Areca Palm',
    scientificName: 'Dypsis lutescens',
    emoji: '🌴',
    description: 'Natural humidifier and air purifier. Adds a tropical touch to any space.',
    airPurifying: true,
    pollutionTolerance: ['low', 'medium'],
    spaceTypes: ['home', 'office'],
    plantingTypes: ['pot'],
    locations: ['indoor'],
    sunlight: ['partial', 'full'],
    wateringFrequency: 'Twice a week',
    difficulty: 'moderate',
    benefits: ['Natural humidifier', 'Removes toluene & xylene', 'Decorative'],
    avoidWhen: ['Low light areas', 'Cold drafty rooms'],
    soilMix: 'Rich potting mix with compost and sand',
    survivalRate: 75,
    areaSizes: ['small', 'medium'],
  },
  {
    id: '7',
    name: 'Peepal Tree',
    scientificName: 'Ficus religiosa',
    emoji: '🌲',
    description: 'Sacred tree known for 24-hour oxygen production. Excellent pollution absorber for open areas.',
    airPurifying: true,
    pollutionTolerance: ['low', 'medium', 'high'],
    spaceTypes: ['roadside', 'open-ground'],
    plantingTypes: ['soil'],
    locations: ['outdoor'],
    sunlight: ['full'],
    wateringFrequency: 'Weekly when young',
    difficulty: 'moderate',
    benefits: ['24-hour oxygen production', 'Absorbs pollutants', 'Long-lasting shade tree'],
    soilMix: 'Deep loamy soil with biochar',
    survivalRate: 85,
    areaSizes: ['large'],
  },
  {
    id: '8',
    name: 'Spider Plant',
    scientificName: 'Chlorophytum comosum',
    emoji: '🕷️',
    description: 'Hardy plant that removes carbon monoxide and xylene. Great for beginners.',
    airPurifying: true,
    pollutionTolerance: ['low', 'medium', 'high'],
    spaceTypes: ['home', 'office', 'balcony'],
    plantingTypes: ['pot'],
    locations: ['indoor', 'outdoor'],
    sunlight: ['low', 'partial', 'full'],
    wateringFrequency: 'Weekly',
    difficulty: 'easy',
    benefits: ['Removes CO & xylene', 'Pet-safe', 'Produces baby plants'],
    soilMix: 'Well-draining potting mix',
    survivalRate: 92,
    areaSizes: ['very-small', 'small', 'medium'],
  },
  {
    id: '9',
    name: 'Tulsi (Holy Basil)',
    scientificName: 'Ocimum tenuiflorum',
    emoji: '🌿',
    description: 'Sacred medicinal plant that purifies air and repels mosquitoes. Thrives in Indian climates.',
    airPurifying: true,
    pollutionTolerance: ['low', 'medium', 'high'],
    spaceTypes: ['home', 'balcony', 'open-ground'],
    plantingTypes: ['soil', 'pot'],
    locations: ['outdoor'],
    sunlight: ['partial', 'full'],
    wateringFrequency: 'Daily in summer',
    difficulty: 'easy',
    benefits: ['Medicinal properties', 'Repels mosquitoes', 'Releases oxygen 20hrs/day'],
    soilMix: 'Loamy soil with compost and neem khali',
    survivalRate: 88,
    areaSizes: ['small', 'medium', 'large'],
  },
  {
    id: '10',
    name: 'Rubber Plant',
    scientificName: 'Ficus elastica',
    emoji: '🌿',
    description: 'Large-leafed beauty that removes formaldehyde. Makes a bold indoor statement.',
    airPurifying: true,
    pollutionTolerance: ['low', 'medium'],
    spaceTypes: ['home', 'office'],
    plantingTypes: ['pot'],
    locations: ['indoor'],
    sunlight: ['partial'],
    wateringFrequency: 'Every 1-2 weeks',
    difficulty: 'easy',
    benefits: ['Removes formaldehyde', 'Large decorative leaves', 'Easy to maintain'],
    avoidWhen: ['Homes with curious pets'],
    soilMix: 'Well-draining potting mix with perlite',
    survivalRate: 88,
    areaSizes: ['small', 'medium'],
  },
  {
    id: '11',
    name: 'Bamboo Palm',
    scientificName: 'Chamaedorea seifrizii',
    emoji: '🎋',
    description: 'Elegant palm that removes benzene and trichloroethylene. Perfect for office spaces.',
    airPurifying: true,
    pollutionTolerance: ['low', 'medium'],
    spaceTypes: ['home', 'office'],
    plantingTypes: ['pot'],
    locations: ['indoor'],
    sunlight: ['low', 'partial'],
    wateringFrequency: 'Twice a week',
    difficulty: 'moderate',
    benefits: ['Removes benzene', 'Natural humidifier', 'Pet-friendly'],
    soilMix: 'Rich potting mix with peat and perlite',
    survivalRate: 78,
    areaSizes: ['small', 'medium'],
  },
  {
    id: '12',
    name: 'Indian Jasmine',
    scientificName: 'Jasminum sambac',
    emoji: '🌼',
    description: 'Fragrant flowering plant that improves air quality and promotes relaxation.',
    airPurifying: true,
    pollutionTolerance: ['low', 'medium'],
    spaceTypes: ['balcony', 'open-ground', 'home'],
    plantingTypes: ['soil', 'pot'],
    locations: ['outdoor'],
    sunlight: ['partial', 'full'],
    wateringFrequency: 'Daily in summer',
    difficulty: 'moderate',
    benefits: ['Beautiful fragrance', 'Reduces stress', 'Attracts pollinators'],
    soilMix: 'Rich loamy soil with compost and vermicompost',
    survivalRate: 82,
    areaSizes: ['small', 'medium', 'large'],
  },
];

export const soilRecommendations: SoilRecommendation[] = [
  {
    name: 'Urban Pollution Fighter Mix',
    emoji: '🏙️',
    description: 'Specially formulated for plants in polluted urban environments.',
    ingredients: ['Garden soil', 'Compost', 'Biochar', 'Neem khali', 'Perlite'],
    bestFor: ['roadside', 'open-ground'],
  },
  {
    name: 'Indoor Purifier Mix',
    emoji: '🏠',
    description: 'Light, well-draining mix for indoor air-purifying plants.',
    ingredients: ['Potting soil', 'Vermicompost', 'Perlite', 'Coco peat'],
    bestFor: ['home', 'office'],
  },
  {
    name: 'Balcony Garden Mix',
    emoji: '🌺',
    description: 'Nutrient-rich mix perfect for container gardening on balconies.',
    ingredients: ['Potting mix', 'Compost', 'Neem khali', 'Sand', 'Bone meal'],
    bestFor: ['balcony'],
  },
];

export interface CommunityTip {
  id: string;
  author: string;
  avatar: string;
  location: string;
  tip: string;
  plantName: string;
  likes: number;
  date: string;
}

export const communityTips: CommunityTip[] = [
  {
    id: '1',
    author: 'Priya Sharma',
    avatar: '🧑‍🌾',
    location: 'Delhi, India',
    tip: 'Adding neem khali to my Snake Plants in Delhi helped them survive the winter smog season beautifully!',
    plantName: 'Snake Plant',
    likes: 24,
    date: '2 days ago',
  },
  {
    id: '2',
    author: 'Rahul Verma',
    avatar: '👨‍🔬',
    location: 'Mumbai, India',
    tip: 'Money plants near my window grew 2x faster when I added biochar to the soil. Great for removing toxins!',
    plantName: 'Money Plant',
    likes: 18,
    date: '1 week ago',
  },
  {
    id: '3',
    author: 'Anita Patel',
    avatar: '🌱',
    location: 'Bangalore, India',
    tip: 'Tulsi on my balcony keeps mosquitoes away AND purifies the air. I water it every morning with rice water.',
    plantName: 'Tulsi',
    likes: 31,
    date: '3 days ago',
  },
];
