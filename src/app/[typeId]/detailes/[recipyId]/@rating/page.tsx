'use client';
export default function Rating() {
  const ratio = '60%';
  const rate = [
    { name: 'Rami', icon: '/profile.jfif' },
    { name: 'Sami', icon: '/profile.jfif' },
    { name: 'Amin', icon: '/profile.jfif' },
  ];
  return (
    <>
      <div className="flex flex-col gap-4 dark:text-white justify-center items-center text-black text-xl sm:text-2xl text-center font-bold">
        <h2>تقييم المستخدمين</h2>
        <div className="w-full border border-t-2 border-b-2 border-l-2 border-r-2 dark:border-[#f1d9a7] dark:shadow-[0_0_4px_1px_#f1d9a7] shadow-[0_0_4px_1px_#black] border-black h-4">
          <div className={`bg-[#f99e1e] w-[${ratio}] h-full`}></div>
        </div>
      </div>
    </>
  );
}
