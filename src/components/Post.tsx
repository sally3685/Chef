import { postRecipy } from '@/data-access/recipies';

import { StaticImageData } from 'next/image';
import b1 from '@/app/assets/images/items/breakfast1.png';
import mint1 from '@/app/assets/images/items/mint1.png';
import mint2 from '@/app/assets/images/items/mint2.png';
import viniger from '@/app/assets/images/ingrediemtsOne/viniger.jpg';
// type StaticImageData = {
//   src: string;
//   height: number;
//   width: number;
//   blurDataURL: string; blurWidth: number; blurHeight: number;
// };

const recipeData = {
  title: 'توست بالفطر والبيض للرجيم',
  additional: [],
  src: b1,
  steps: [
    'تُغسل حبَّات الفطر، وتُقطَّع بحجم متساو.',
    'تُذوب الزبدة في مقلاة، ويُضاف فرم الفطر، مع التقليب لنحو ثلاث دقائق، وذلك على حرارة متوسِّطة.',
    'يُضاف الثوم وأوراق الكايل إلى المقلاة مع الفطر والملح والفلفل، وتُقلَّب المكوِّنات، ويُسكب الماء. تُقلَّب المكوِّنات مجدَّدًا، وتبقى على النار، حتَّى يذبل الكايل.',
    ' في قدر صغيرة حاوية الماء المغلي، تُضاف ركوة تحتوي البيضة، وتُخفَّف الحرارة، وذلك حتَّى تطهى البيضة. يُصبُّ الخل على البيضة بعدها، مع تحريك البيضة بصورة دائريَّة. ثمَّ، تُكسر البيضة من منتصفها، وتُطهى لثلاث أو أربع دقائق إضافيَّة.',
    'طريقة التقديم: يُحمَّص الخبز، ويوضع في طبق التقديم، ويوزَّع الفطر والكايل عليه، وعلى الوجه تُضاف البيضة. وينثر الفلفل الأسود.',
  ],
  service: 4,
  timeForCooking: {
    time: 30,
    type: 'دقيقة',
  },
  type: 'نباتي',
  color: '#ad7646',
};
const caloriesArray = {
  // id: '9',
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
};
//   {
//     // id: '10',
//     name: 'خبز التوست',
//     additional: [],
//     // src: toast,
//     amount: {
//       number: 1,
//       unit: 'حبة',
//     },
//     calory: 64,
//     totalFat: {
//       number: 0.9,
//       unit: 'غرام',
//     },
//     cholesterol: {
//       number: 0.2,
//       unit: 'ميلي غرام',
//     },
//     sodium: {
//       number: 118,
//       unit: 'ميلي غرام',
//     },
//     totalCarbohydrates: {
//       number: 12,
//       unit: 'غرام',
//     },
//     protin: {
//       number: 2,
//       unit: 'غرام',
//     },
//     vitaminD: {
//       number: 0,
//       unit: 'mcg',
//     },
//     calcium: {
//       number: 26,
//       unit: 'ميلي غرام',
//     },
//     iron: {
//       number: 0.7,
//       unit: 'ميلي غرام',
//     },
//     potassium: {
//       number: 28.8,
//       unit: 'ميلي غرام',
//     },
//     caffeine: {
//       number: 0,
//       unit: 'ميلي غرام',
//     },
//   },
// ];

export default async function Post() {
  // const rec = await postRecipy(recipeData, caloriesArray);
  // console.log(rec);
}
