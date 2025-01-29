export default function Layout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div className="min-h-full w-full m-0 p-0 flex justify-center items-center flex-col mt-[19px] pt-[5%] relative">
      {modal}
      {children}
    </div>
  );
}
