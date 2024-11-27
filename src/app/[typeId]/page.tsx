import Home from './_component/content';
import Menu from './_component/Menu';
const food = [
  {
    id: '1',
    title: 'أشهى وصفات الغداء',
    vid: '/v1.mp4',
  },
  {
    id: '2',
    title: 'أشهى وصفات الفطور',
    vid: '/v4.mp4',
  },
  {
    id: '3',
    title: 'أشهى وصفات الحلويات',
    vid: '/v5.mp4',
  },
  {
    id: '4',
    title: 'أشهى وصفات مشروبات',
    vid: '/v3.mp4',
  },
];

type Props = {
  params: {
    typeId: string | undefined;
  };
};
export const generateMetadata = async ({ params }: Props) => {
  let { typeId } = await params;
  if (!typeId) {
    typeId = '1';
  }
  if (isNaN(parseInt(typeId) - 1) || parseInt(typeId) - 1 >= food.length) {
    return {
      title: `Not found 404`,
    };
  } else {
    return {
      title: `${food[parseInt(typeId) - 1].title}`,
    };
  }
};
export default async function Meta() {
  return (
    <>
      {/* <Throw></Throw> */}

      <Home></Home>

      <Menu></Menu>
    </>
  );
}
