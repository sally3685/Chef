import { Metadata } from 'next';
import itemsArray from './items';
type Props = {
  params: {
    typeId: string;
    recipyId: string;
  };
};
export const generateMetadata = async ({ params }: Props) => {
  const { recipyId } = await params;
  return {
    title: `${itemsArray[parseInt(recipyId) - 1].title}`,
  };
};
export default async function Meta({ params }: Props) {
  return <></>;
}
