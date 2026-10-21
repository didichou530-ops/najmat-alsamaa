import { WilayaInfo } from '../types';

export const WILAYAS_LIST: WilayaInfo[] = [
  {
    code: '16',
    name: '16 - Alger (Algiers)',
    nameAr: '16 - الجزائر العاصمة',
    homeDeliveryFee: 400,
    deskDeliveryFee: 250,
    communes: [
      'Sidi M\'Hamed', 'Bab El Oued', 'Hydra', 'El Biar', 'Kouba', 'Ben Aknoun',
      'Bir Mourad Raïs', 'Rouiba', 'Dar El Beïda', 'Cheraga', 'Dely Ibrahim',
      'Zeralda', 'Bordj El Kiffan', 'Hussein Dey', 'Bachedjerrah'
    ]
  },
  {
    code: '31',
    name: '31 - Oran',
    nameAr: '31 - وهران',
    homeDeliveryFee: 550,
    deskDeliveryFee: 350,
    communes: [
      'Oran Centre', 'Es Senia', 'Bir El Djir', 'Ain El Turk', 'Arzew',
      'Bethioua', 'Boutlelis', 'Gdyel', 'Mers El Kebir'
    ]
  },
  {
    code: '09',
    name: '09 - Blida',
    nameAr: '09 - البليدة',
    homeDeliveryFee: 450,
    deskDeliveryFee: 300,
    communes: ['Blida', 'Boufarik', 'Ouled Yaich', 'Mouzaia', 'El Affroun', 'Meftah', 'Bougara']
  },
  {
    code: '25',
    name: '25 - Constantine',
    nameAr: '25 - قسنطينة',
    homeDeliveryFee: 600,
    deskDeliveryFee: 400,
    communes: ['Constantine', 'El Khroub', 'Ain Smara', 'Hamma Bouziane', 'Didouche Mourad', 'Zighoud Youcef']
  },
  {
    code: '19',
    name: '19 - Sétif',
    nameAr: '19 - سطيف',
    homeDeliveryFee: 600,
    deskDeliveryFee: 400,
    communes: ['Sétif', 'El Eulma', 'Ain Oulmene', 'Ain Arnat', 'Bougaa', 'Ain Azel']
  },
  {
    code: '23',
    name: '23 - Annaba',
    nameAr: '23 - عنابة',
    homeDeliveryFee: 650,
    deskDeliveryFee: 450,
    communes: ['Annaba', 'El Bouni', 'Sidi Amar', 'Berrahal', 'El Hadjar', 'Ain El Berda']
  },
  {
    code: '15',
    name: '15 - Tizi Ouzou',
    nameAr: '15 - تيزي وزو',
    homeDeliveryFee: 550,
    deskDeliveryFee: 350,
    communes: ['Tizi Ouzou', 'Draa Ben Khedda', 'Azazga', 'Tigzirt', 'Boghni', 'Larbaa Nath Irathen']
  },
  {
    code: '06',
    name: '06 - Béjaïa',
    nameAr: '06 - بجاية',
    homeDeliveryFee: 600,
    deskDeliveryFee: 400,
    communes: ['Béjaïa', 'Amizour', 'Akbou', 'El Kseur', 'Sidi Aïch', 'Tichy', 'Aokas']
  },
  {
    code: '13',
    name: '13 - Tlemcen',
    nameAr: '13 - تلمسان',
    homeDeliveryFee: 650,
    deskDeliveryFee: 450,
    communes: ['Tlemcen', 'Mansourah', 'Maghnia', 'Chetouane', 'Remchi', 'Ghazaouet', 'Sebdou']
  },
  {
    code: '35',
    name: '35 - Boumerdès',
    nameAr: '35 - بومرداس',
    homeDeliveryFee: 450,
    deskDeliveryFee: 300,
    communes: ['Boumerdès', 'Khemis El Khechna', 'Boudouaou', 'Dellys', 'Zemmouri', 'Thenia']
  },
  {
    code: '42',
    name: '42 - Tipaza',
    nameAr: '42 - تيبازة',
    homeDeliveryFee: 500,
    deskDeliveryFee: 350,
    communes: ['Tipaza', 'Kolea', 'Bou Ismail', 'Hadjout', 'Cherchell', 'Fouka', 'Ahmar El Ain']
  },
  {
    code: '07',
    name: '07 - Biskra',
    nameAr: '07 - بسكرة',
    homeDeliveryFee: 750,
    deskDeliveryFee: 500,
    communes: ['Biskra', 'Tolga', 'Sidi Okba', 'Ouled Djellal', 'Zerit El Oued', 'Chetma']
  },
  {
    code: '30',
    name: '30 - Ouargla / Hassi Messaoud',
    nameAr: '30 - ورقلة / حاسي مسعود',
    homeDeliveryFee: 900,
    deskDeliveryFee: 600,
    communes: ['Ouargla', 'Hassi Messaoud', 'Rouissat', 'N\'Goussa', 'El Hadjira', 'Sidi Khouiled']
  },
  {
    code: '47',
    name: '47 - Ghardaïa',
    nameAr: '47 - غرداية',
    homeDeliveryFee: 850,
    deskDeliveryFee: 550,
    communes: ['Ghardaïa', 'El Atteuf', 'Bounoura', 'Metlili', 'Berriane', 'El Guerrara', 'Dahmous']
  }
];

export const FREE_SAMPLES_LIST = [
  {
    id: 'sample-1',
    name: 'Rose Dew Water Infusion Cream',
    nameFr: 'Crème Infusion Eau de Rose',
    nameAr: 'كريم ماء الورد المرطب الفائق',
    category: 'Skincare',
    volume: '3 ml',
    colorHex: '#F5D0C5',
    description: 'Ultra-lightweight soothing hydration with Damask rose water.'
  },
  {
    id: 'sample-2',
    name: '24K Golden Peptide Elixir',
    nameFr: 'Élixir Peptides & Or 24K',
    nameAr: 'إكسير الببتيدات والذهب عيار 24',
    category: 'Serum',
    volume: '2 ml',
    colorHex: '#E2BD6D',
    description: 'Concentrated firming youth booster with multi-peptides.'
  },
  {
    id: 'sample-3',
    name: 'Ceramide Cloud Balancing Cleanser',
    nameFr: 'Gelée Nettoyante Nuage Céramides',
    nameAr: 'منظف سحابي موازن مع السيراميد',
    category: 'Cleanser',
    volume: '5 ml',
    colorHex: '#E8EFEA',
    description: 'Gentle low-pH barrier-protecting soothing gel.'
  },
  {
    id: 'sample-4',
    name: 'Velvet Silk Cushion Foundation Tint',
    nameFr: 'Échantillon Fond de Teint Velours',
    nameAr: 'عينة كريم أساس حريري مخملي',
    category: 'Makeup',
    volume: '2 ml',
    colorHex: '#D4A373',
    description: 'Medium buildable coverage swatch trio (Fair, Medium, Tan).'
  }
];
