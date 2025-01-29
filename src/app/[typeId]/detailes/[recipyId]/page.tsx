export const generateMetadata = async ({
  typeId,
  recipyId,
  children,
}: {
  typeId: string | undefined;
  recipyId: string | undefined;
  children: React.ReactNode;
}) => {
  const recipyIdawaited = await recipyId;
  const slug = decodeURIComponent(recipyIdawaited as string);
  let url = slug.replaceAll('-', ' ');
  url = url.replace(/[0-9]/g, '');
  return {
    title: `${url}`,
  };
};
export default async function Meta() {
  return <></>;
}
