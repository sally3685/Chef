import { StaticImageData } from 'next/image';
import mashroom from '@/app/assets/images/ingrediemtsOne/mashroom.jpg';
import butter from '@/app/assets/images/ingrediemtsOne/butter.jpg';
import salt from '@/app/assets/images/ingrediemtsOne/salt.jpg';
import bp from '@/app/assets/images/ingrediemtsOne/bp.jpg';
import egg from '@/app/assets/images/ingrediemtsOne/egg.jpg';
import garlic from '@/app/assets/images/ingrediemtsOne/garlic.jpg';
import toast from '@/app/assets/images/ingrediemtsOne/toast.jpg';
import water from '@/app/assets/images/ingrediemtsOne/water.jpg';
import viniger from '@/app/assets/images/ingrediemtsOne/viniger.jpg';

import kale from '@/app/assets/images/ingrediemtsOne/kale.jpg';

export type FoodArray = {
  id: string;
  name: string;
  additional: Array<string>;
  src: StaticImageData;
  amount: {
    number: number;
    unit: string;
  };
  calory: number;
  totalFat: {
    number: number;
    unit: string;
  };
  cholesterol: {
    number: number;
    unit: string;
  };
  sodium: {
    number: number;
    unit: string;
  };
  totalCarbohydrates: {
    number: number;
    unit: string;
  };
  protin: {
    number: number;
    unit: string;
  };
  vitaminD: {
    number: number;
    unit: string;
  };
  calcium: {
    number: number;
    unit: string;
  };
  iron: {
    number: number;
    unit: string;
  };
  potassium: {
    number: number;
    unit: string;
  };
  caffeine: {
    number: number;
    unit: string;
  };
};
const caloriesArray: FoodArray[] = [
  {
    id: '1',
    name: 'الفطر',
    additional: ['طازج'],
    src: mashroom,
    amount: {
      number: 100,
      unit: 'غرام',
    },
    calory: 28,
    totalFat: {
      number: 0.5,
      unit: 'غرام',
    },
    cholesterol: {
      number: 0,
      unit: 'ميلي غرام',
    },
    sodium: {
      number: 2,
      unit: 'ميلي غرام',
    },
    totalCarbohydrates: {
      number: 5.3,
      unit: 'غرام',
    },
    protin: {
      number: 2.2,
      unit: 'غرام',
    },
    vitaminD: {
      number: 0.2,
      unit: 'mcg',
    },
    calcium: {
      number: 6,
      unit: 'ميلي غرام',
    },
    iron: {
      number: 1.7,
      unit: 'ميلي غرام',
    },
    potassium: {
      number: 356,
      unit: 'ميلي غرام',
    },
    caffeine: {
      number: 0,
      unit: 'ميلي غرام',
    },
  },
  {
    id: '2',
    name: 'الزبدة',
    additional: [],
    src: butter,
    amount: {
      number: 30,
      unit: 'غرام',
    },
    calory: 215,
    totalFat: {
      number: 24,
      unit: 'غرام',
    },
    cholesterol: {
      number: 65,
      unit: 'ميلي غرام',
    },
    sodium: {
      number: 193,
      unit: 'ميلي غرام',
    },
    totalCarbohydrates: {
      number: 0,
      unit: 'غرام',
    },
    protin: {
      number: 0.3,
      unit: 'غرام',
    },
    vitaminD: {
      number: 0,
      unit: 'mcg',
    },
    calcium: {
      number: 7.2,
      unit: 'ميلي غرام',
    },
    iron: {
      number: 0,
      unit: 'ميلي غرام',
    },
    potassium: {
      number: 7.2,
      unit: 'ميلي غرام',
    },
    caffeine: {
      number: 0,
      unit: 'ميلي غرام',
    },
  },
  {
    id: '3',
    name: 'ثوم',
    additional: [],
    src: garlic,
    amount: {
      number: 1,
      unit: 'فص',
    },
    calory: 4.5,
    totalFat: {
      number: 0,
      unit: 'غرام',
    },
    cholesterol: {
      number: 0,
      unit: 'ميلي غرام',
    },
    sodium: {
      number: 0.5,
      unit: 'ميلي غرام',
    },
    totalCarbohydrates: {
      number: 1,
      unit: 'غرام',
    },
    protin: {
      number: 0.2,
      unit: 'غرام',
    },
    vitaminD: {
      number: 0,
      unit: 'mcg',
    },
    calcium: {
      number: 5.4,
      unit: 'ميلي غرام',
    },
    iron: {
      number: 0,
      unit: 'ميلي غرام',
    },
    potassium: {
      number: 12,
      unit: 'ميلي غرام',
    },
    caffeine: {
      number: 0,
      unit: 'ميلي غرام',
    },
  },
  {
    id: '4',
    name: 'أوراق الكيل',
    additional: ['منظفة'],
    src: kale,
    amount: {
      number: 1,
      unit: 'قبضة',
    },
    calory: 36,
    totalFat: {
      number: 0.5,
      unit: 'غرام',
    },
    cholesterol: {
      number: 0,
      unit: 'ميلي غرام',
    },
    sodium: {
      number: 30,
      unit: 'ميلي غرام',
    },
    totalCarbohydrates: {
      number: 1,
      unit: 'غرام',
    },
    protin: {
      number: 2.5,
      unit: 'غرام',
    },
    vitaminD: {
      number: 0,
      unit: 'mcg',
    },
    calcium: {
      number: 94,
      unit: 'ميلي غرام',
    },
    iron: {
      number: 1.2,
      unit: 'ميلي غرام',
    },
    potassium: {
      number: 296.4,
      unit: 'ميلي غرام',
    },
    caffeine: {
      number: 0,
      unit: 'ميلي غرام',
    },
  },
  {
    id: '5',
    name: 'ماء',
    additional: [],
    src: water,
    amount: {
      number: 1,
      unit: 'ملعقة كبيرة',
    },
    calory: 0,
    totalFat: {
      number: 0,
      unit: 'غرام',
    },
    cholesterol: {
      number: 0,
      unit: 'ميلي غرام',
    },
    sodium: {
      number: 4.8,
      unit: 'ميلي غرام',
    },
    totalCarbohydrates: {
      number: 0,
      unit: 'غرام',
    },
    protin: {
      number: 0,
      unit: 'غرام',
    },
    vitaminD: {
      number: 0,
      unit: 'mcg',
    },
    calcium: {
      number: 3.6,
      unit: 'ميلي غرام',
    },
    iron: {
      number: 0,
      unit: 'ميلي غرام',
    },
    potassium: {
      number: 0,
      unit: 'ميلي غرام',
    },
    caffeine: {
      number: 0,
      unit: 'ميلي غرام',
    },
  },
  {
    id: '6',
    name: 'ملح',
    additional: [],
    src: salt,
    amount: {
      number: 0.5,
      unit: 'ملعقة صغيرة',
    },
    calory: 0,
    totalFat: {
      number: 0,
      unit: 'غرام',
    },
    cholesterol: {
      number: 0,
      unit: 'ميلي غرام',
    },
    sodium: {
      number: 1162,
      unit: 'ميلي غرام',
    },
    totalCarbohydrates: {
      number: 0,
      unit: 'غرام',
    },
    protin: {
      number: 0,
      unit: 'غرام',
    },
    vitaminD: {
      number: 0,
      unit: 'mcg',
    },
    calcium: {
      number: 0.7,
      unit: 'ميلي غرام',
    },
    iron: {
      number: 0,
      unit: 'ميلي غرام',
    },
    potassium: {
      number: 0.2,
      unit: 'ميلي غرام',
    },
    caffeine: {
      number: 0,
      unit: 'ميلي غرام',
    },
  },
  {
    id: '7',
    name: 'فلفل أسود',
    additional: [],
    src: bp,
    amount: {
      number: 0.5,
      unit: 'ملعقة صغيرة',
    },
    calory: 0,
    totalFat: {
      number: 0,
      unit: 'غرام',
    },
    cholesterol: {
      number: 0,
      unit: 'ميلي غرام',
    },
    sodium: {
      number: 1162,
      unit: 'ميلي غرام',
    },
    totalCarbohydrates: {
      number: 0,
      unit: 'غرام',
    },
    protin: {
      number: 0,
      unit: 'غرام',
    },
    vitaminD: {
      number: 0,
      unit: 'mcg',
    },
    calcium: {
      number: 0.7,
      unit: 'ميلي غرام',
    },
    iron: {
      number: 0,
      unit: 'ميلي غرام',
    },
    potassium: {
      number: 0.2,
      unit: 'ميلي غرام',
    },
    caffeine: {
      number: 0,
      unit: 'ميلي غرام',
    },
  },
  {
    id: '8',
    name: 'بيض',
    additional: ['طازج'],
    src: egg,
    amount: {
      number: 1,
      unit: 'piece',
    },
    calory: 72,
    totalFat: {
      number: 4.8,
      unit: 'غرام',
    },
    cholesterol: {
      number: 186,
      unit: 'ميلي غرام',
    },
    sodium: {
      number: 71,
      unit: 'ميلي غرام',
    },
    totalCarbohydrates: {
      number: 0.4,
      unit: 'غرام',
    },
    protin: {
      number: 6.3,
      unit: 'غرام',
    },
    vitaminD: {
      number: 1,
      unit: 'mcg',
    },
    calcium: {
      number: 28,
      unit: 'ميلي غرام',
    },
    iron: {
      number: 0.9,
      unit: 'ميلي غرام',
    },
    potassium: {
      number: 69,
      unit: 'ميلي غرام',
    },
    caffeine: {
      number: 0,
      unit: 'ميلي غرام',
    },
  },
  {
    id: '9',
    name: 'الخل',
    additional: [],
    src: viniger,
    amount: {
      number: 0.5,
      unit: 'ملعقة صغيرة',
    },
    calory: 1.4,
    totalFat: {
      number: 0,
      unit: 'غرام',
    },
    cholesterol: {
      number: 0,
      unit: 'ميلي غرام',
    },
    sodium: {
      number: 0.2,
      unit: 'ميلي غرام',
    },
    totalCarbohydrates: {
      number: 0,
      unit: 'غرام',
    },
    protin: {
      number: 0,
      unit: 'غرام',
    },
    vitaminD: {
      number: 0,
      unit: 'mcg',
    },
    calcium: {
      number: 0.4,
      unit: 'ميلي غرام',
    },
    iron: {
      number: 0,
      unit: 'ميلي غرام',
    },
    potassium: {
      number: 0.1,
      unit: 'ميلي غرام',
    },
    caffeine: {
      number: 0,
      unit: 'ميلي غرام',
    },
  },
  {
    id: '10',
    name: 'خبز التوست',
    additional: [],
    src: toast,
    amount: {
      number: 1,
      unit: 'حبة',
    },
    calory: 64,
    totalFat: {
      number: 0.9,
      unit: 'غرام',
    },
    cholesterol: {
      number: 0.2,
      unit: 'ميلي غرام',
    },
    sodium: {
      number: 118,
      unit: 'ميلي غرام',
    },
    totalCarbohydrates: {
      number: 12,
      unit: 'غرام',
    },
    protin: {
      number: 2,
      unit: 'غرام',
    },
    vitaminD: {
      number: 0,
      unit: 'mcg',
    },
    calcium: {
      number: 26,
      unit: 'ميلي غرام',
    },
    iron: {
      number: 0.7,
      unit: 'ميلي غرام',
    },
    potassium: {
      number: 28.8,
      unit: 'ميلي غرام',
    },
    caffeine: {
      number: 0,
      unit: 'ميلي غرام',
    },
  },
];
export default caloriesArray;
