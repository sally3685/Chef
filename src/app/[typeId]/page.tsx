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
      title: `Not found 404`,
    };
  } else {
    return {
      title: typeIdawaited,
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
