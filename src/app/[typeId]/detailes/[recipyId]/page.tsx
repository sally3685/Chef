interface Props {
  params: Promise<{ recipyId: string }>;
}
export const generateMetadata = async (props: Props) => {
  const params = await props.params;
  let recipyIdawaited = params.recipyId;

  const slug = decodeURIComponent(recipyIdawaited as string);
  let url = slug.replaceAll('-', ' ');
  url = url.replace(/[0-9]/g, '');
  return {
    title: `${url}`,
    description: `اكتشف أفضل وصفة لـ [${url}] مع جميع التفاصيل التي تحتاج إليها! تعرف على تقييمات الناس وتعليقاتهم عليه. اكتشف قيمة السعرات الحرارية ونوع الطبق، بالإضافة إلى قائمة المكونات اللازمة وكل تلك التفاصيل الهامة التي تبحث عنها لتحضير هذه الوجبة الشهية. توجه الآن إلى هذه الصفحة لتجربة تحضير هذا الطبق اللذيذ بطريقة سهلة ومميزة`,
  };
};
export default async function Meta() {
  return <></>;
}
