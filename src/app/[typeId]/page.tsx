import { Suspense } from 'react';
import Home from './_component/content';
import Features from './_component/Features';
import Menu from './_component/Menu';
import Loading from './loading';
const food = [
  {
    id: '1',
    title: 'lunch',
  },
  {
    id: '2',
    title: 'breakfast',
  },
  {
    id: '3',
    title: 'sweet',
  },
  {
    id: '4',
    title: 'drinks',
  },
];
interface Props {
  params: Promise<{ typeId: string }>;
}
export const generateMetadata = async (props: Props) => {
  const params = await props.params;
  let typeIdawaited = params.typeId;

  if (
    typeIdawaited !== 'lunch' &&
    typeIdawaited !== 'breakfast' &&
    typeIdawaited !== 'sweet' &&
    typeIdawaited !== 'drinks'
  ) {
    return {
      title: `صفحة غير موجودة`,
    };
  } else {
    return {
      title:
        typeIdawaited === 'lunch'
          ? 'أشهى وصفات الغداء'
          : typeIdawaited === 'breakfast'
          ? 'أشهى وصفات الفطور'
          : typeIdawaited === 'sweet'
          ? 'أشهى وصفات الحلويات'
          : 'أشهى وصفات المشروبات',
      description:
        'استمتع بتصفح مجموعتنا المميزة من وصفات الطعام الشهية على صفحة الطبخ. تعرف على وصفات لأطباق مختلفة من المطابخ العالمية مثل الأطباق الشرقية والغربية. اكتشف وصفات جديدة ومبتكرة تناسب جميع الأذواق والمناسبات. استعد وجبات شهية بطرق سهلة ومبسطة. تصفح الآن للحصول على إلهام لاستعداد وجبات طعام شهية ومميزة.',
    };
  }
};

export default async function Meta(props: Props) {
  const params = await props.params;
  let typeIdawaited = params.typeId;
  return (
    <>
      {/* <Throw></Throw> */}
      {/* 
      <Home></Home>
      <Features></Features> */}
      <Suspense fallback={<Loading></Loading>}>
        <Menu typeId={typeIdawaited as string}></Menu>
      </Suspense>
    </>
  );
}
