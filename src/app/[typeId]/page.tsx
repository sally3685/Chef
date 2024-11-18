import Home from './_component/content';
import { Metadata } from 'next';
import Throw from './_component/Throw';
import Menu from './_component/Menu';
import Link from 'next/link';
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
    typeId: string;
  };
};
export const generateMetadata = async ({ params }: Props) => {
  const { typeId } = await params;
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
export default async function Meta({ params }: Props) {
  return (
    <>
      {/* <Throw></Throw> */}

      <Home params={await params}></Home>

      <Menu></Menu>
    </>
  );
}
