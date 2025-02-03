export default function NotFound() {
  return (
    <main className="relative mx-auto p-4 w-full  max-w-7xl   flex flex-col justify-center items-center h-[236px] gap-10">
      <section>
        <div
          style={{ backgroundSize: '100%' }}
          className="bg-[url(/tomato.svg)] bg-center bg-no-repeat w-[100px] h-[100px] relative sm:scale-100 scale-75"
        >
          <div
            style={{ backgroundSize: '100%' }}
            className="bg-[url(/sad.svg)] bg-center bg-no-repeat w-[70px] h-[70px] absolute top-[37px] left-[10px]"
          ></div>
        </div>
      </section>
      <section className="sm:text-lg md:text-xl text-sm flex flex-col justify-center items-center  gap-10 ">
        <h1>تعذر ايجاد الصفحة</h1>
      </section>
    </main>
  );
}
