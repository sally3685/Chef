import Menu from './_component/Menu';
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
      <Menu typeId={typeIdawaited as string}></Menu>
    </>
  );
}
