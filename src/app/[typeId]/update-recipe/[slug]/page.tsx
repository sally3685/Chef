'use client';
import { useAnimation } from '@/helpers/useAnimation';
import React, { useEffect, useState } from 'react';
import { PopoverPicker } from '../../_component/PopoverPicker';
import { postRecipy, updateRecipe } from '@/data-access/recipies';
import { useUser } from '@clerk/nextjs';
import { getOneRecipy } from '@/data-access/recipies';
import { TimeForCooking, Ingredients } from '@prisma/client';
import Image from 'next/image';
import Loading from '../../loading';
import gsap from 'gsap';
import { useParams } from 'next/navigation';
import { deleteUTFiles } from '@/data-access/recipies';
import { SubmitButton } from '../../_component/Button';
import ErrorPage from '../../error';
import { useRouter } from 'next/navigation';
const explaination = [
  'اذكر اسم واضح مشوق يعبر عن الوصفة',
  'معلومات إضافية مثل : وصفة مميزة لصيف دافئ ',
  'اكتب خطوات الوصفة في كل مرة تريد اضافة خطوة انقر على اضافة خطوة',
  'كم شخصا تكفي هذه الوصفة',
  'حدد الوقت اللازم لتحضير الوصفة  من خلال تحديد الرقم والواحدة (إما ثانية إو دقيقة إو ساعة)',
  'حدد زينة الوصفة التي تظهر للمتابع',
  'نوع الوصفة مثل نباتي أو مشروب بارد أو ساخن أو وصفة غير نباتية',
  'اضافة صورة اقصى حجم 4MB',
  '🥰🥰🥰 شكرا لمشاركتك ',
  'إبدأ بإضافة بيانات الوصفة المناسبة',
  'اختر التصنيف المناسب لتظهر وصفتك بالمكان المناسب',
];
export default function UpdateRecipy() {
  type reci = {
    title: string;
    slug: string;
    additional: string | null;
    src: string;
    steps: string[];
    service: number | null;
    decorePhoto: string;
    type: string;
    color: string;
    rate: number;
    classification: string;
    authorId: string;
    timeForCooking: TimeForCooking | null;
    ingredients: Ingredients[];
  };
  const [recipe, setRecipe] = React.useState<reci>();

  const [deletedPhoto, setDeletedPhoto] = React.useState(0);
  const [refresh, setRefresh] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [isFetchLoad, setFetchLoad] = useState(false);
  useEffect(() => {
    // setItemsArray([]);
    const fetchData = async () => {
      setFetchLoad(true);
      const slug1 = decodeURIComponent(params.slug as string);
      const a = await getOneRecipy(slug1);
      if (a.status === 500) setError(a.message as string);
      else setRecipe(a.recipy as reci);
      setFetchLoad(false);
      // setItemsArray(a);
    };

    fetchData();
    setError(null);
  }, [refresh]);
  useAnimation(() => {
    if (typeof document !== 'undefined') {
      const items = document.querySelectorAll('.enterAnimations');
      let ctx = gsap.context(() => {
        const tl = gsap.timeline();
        tl.fromTo(
          items,
          {
            y: -50,
            opacity: 0,
          },
          {
            y: 0,
            stagger: 0.2,
            ease: 'back.out',
            opacity: 1,
            position: 'relative',
          }
        );
      });

      titleRef?.current?.focus();
      return () => ctx.revert();
    }
  }, [isFetchLoad]);
  const deletePhoto = async () => {
    setFetchLoad(true);
    const url = recipe?.src.split('/').pop();
    const a = await deleteUTFiles(url as string);
    if (a.status === 500) setError(a.message as string);
    else {
      alert('تم حذف الصورة');
      setDeletedPhoto(1);
    }
    setFetchLoad(false);
  };
  const { isLoaded, user } = useUser();
  const params = useParams();
  const [submit, setSubmit] = React.useState(false);
  const [title, setTitle] = React.useState<string>();
  const [type, setType] = React.useState<string>();
  const [color, setColor] = React.useState('#aabbcc');
  const [service, setService] = React.useState<number>(1);
  const [timeForCookingNumber, setTimeForCookingNumber] =
    React.useState<number>(5);
  const [timeUnit, setTimeUnit] = React.useState('دقيقة');
  const [decore, setDecore] = React.useState('mint1.png');
  const [additional, setAdditional] = React.useState<string>();
  const titleRef = React.useRef<HTMLInputElement>(null);
  const [titleFocus, setTitleFocus] = React.useState(true);
  const [additionalFocus, setAdditionalFocus] = React.useState(false);
  const [stepFocus, setStepFocus] = React.useState(false);
  const [serviceFocus, setServiceFocus] = React.useState(false);
  const [timeForCookingNumberFocus, setTimeForCookingNumberFocus] =
    React.useState(false);
  const [timeForCookingUnitFocus, setTimeForCookingUnitFocus] =
    React.useState(false);
  const [decoreFocus, setdecoreFocus] = React.useState(false);
  const [typeFocus, setTypeFocus] = React.useState(false);
  const [classificationFocus, setClassificationFocus] = React.useState(false);
  const [steps, setSteps] = React.useState(['']);
  const [openSteps, setOpenSteps] = React.useState(true);
  const [photoFocus, setPhotoFocus] = React.useState(false);
  const [explain] = React.useState(explaination);
  const [classification, setClassification] = React.useState('غداء');
  React.useEffect(() => {
    setTitle(recipe?.title as string);
    setType(recipe?.type as string);
    setColor(recipe?.color as string);
    setService(recipe?.service as number);
    setTimeForCookingNumber(recipe?.timeForCooking?.time as number);
    setTimeUnit(recipe?.timeForCooking?.unit as string);
    setDecore(recipe?.decorePhoto as string);
    setAdditional(recipe?.additional as string);
    setSteps(recipe?.steps as string[]);
    setClassification(recipe?.classification as string);

    titleRef?.current?.focus();
  }, [recipe]);
  const router = useRouter();
  const addStep = () => {
    setSteps([...steps, '']);
  };
  const removeStep = (index: any) => {
    const updatedSteps = [...steps];
    updatedSteps.splice(index, 1);
    setSteps(updatedSteps);
  };
  React.useEffect(() => {
    titleRef?.current?.focus();
  }, []);
  React.useEffect(() => {
    if (isLoaded) {
      titleRef?.current?.focus();
    }
  }, [isLoaded]);
  const recipyId = params.slug as string;
  const slug = decodeURIComponent(recipyId as string);
  let url = slug.replaceAll('-', ' ');
  url = url.replace(/[0-9]/g, '');
  return (
    <>
      {!isFetchLoad && error ? (
        <ErrorPage
          error={new Error(error)}
          reset={() => {
            setRefresh(!refresh);
            setSubmit(false);
            router.refresh();
          }}
        ></ErrorPage>
      ) : isFetchLoad || !isLoaded ? (
        <Loading></Loading>
      ) : (
        <main
          className="w-full flex gap-10 justify-center 
          items-center
       mx-auto p-2  max-w-7xl section-min-height  lg:flex-row-reverse flex-col"
        >
          <>
            <div className="text-sm lg:text-lg flex lg:flex-col top-[87px] z-[1] bg-[#f5f5f4] dark:bg-[#151517] dark:lg:bg-[#00000000] w-[100%] justify-evenly items-center self-start sticky lg:top-[10rem] left-0 lg:w-[30%]  h-[30%] shadow-[0_0_11px_4px_#f3d34a] border-[#f3d34a] rounded p-4">
              <p aria-label="h1" className="text-[#f3d34a] mb-1 font-bold">
                معلومات مساعدة
              </p>
              <p
                id={
                  titleFocus
                    ? 'titlenotes'
                    : additionalFocus
                    ? 'additionalnotes'
                    : stepFocus
                    ? 'stepnotes'
                    : serviceFocus
                    ? 'servicenote'
                    : timeForCookingNumberFocus || timeForCookingUnitFocus
                    ? 'timeforcookingnotes'
                    : typeFocus
                    ? 'typenote'
                    : decoreFocus
                    ? 'decorenote'
                    : photoFocus
                    ? 'photonote'
                    : submit
                    ? 'submitnote'
                    : classificationFocus
                    ? 'classnote'
                    : 'photonote'
                }
              >
                {titleFocus
                  ? explain[0]
                  : additionalFocus
                  ? explain[1]
                  : stepFocus
                  ? explain[2]
                  : serviceFocus
                  ? explain[3]
                  : timeForCookingNumberFocus || timeForCookingUnitFocus
                  ? explain[4]
                  : typeFocus
                  ? explain[6]
                  : decoreFocus
                  ? explain[5]
                  : photoFocus
                  ? explain[7]
                  : submit
                  ? explain[8]
                  : classificationFocus
                  ? explain[10]
                  : explain[9]}
              </p>
            </div>

            <div className="lg:w-1/2 w-[90%] mt-4 mb-4">
              <h1 className="enterAnimations relative text-2xl lg:text-3xl font-medium mb-4 text-center">
                تعديل وصفة <span className="text-orange-400">{url}</span>
              </h1>
              {submit && (
                <p
                  aria-label="h1"
                  className="text-lg lg:text-xl my-1 font-bold w-full text-center  text-[#f3a738]"
                >
                  يتم معالجة الطلب الرجاء الانتظار ...
                </p>
              )}
              <form
                className="flex flex-col justify-center items-center space-y-8 w-full  "
                action={async (formData: FormData) => {
                  formData.delete('steps');
                  steps.map((element) => {
                    formData.append('steps', element);
                  });

                  const res = await updateRecipe(formData);
                  if (res.status === 500) throw new Error(res.message);
                  else {
                    alert('تم تعديل الوصفة');
                    setSubmit(false);
                    setRefresh(!refresh);
                  }
                }}
              >
                <div className="enterAnimations  flex relative  flex-col space-y-2 items-start  w-full">
                  <label
                    htmlFor="title"
                    className="flex space-x-3 justify-center items-center text-lg"
                  >
                    اسم الوصفة
                  </label>

                  <input
                    ref={titleRef}
                    className="w-full !rounded text-[#151517] dark:bg-white bg-[#edb91f69]  p-2 focus:outline-orange-500 focus:outline-2 outline-none"
                    id="title"
                    type="title"
                    placeholder="متبل الشمندر على الطريقة السورية"
                    name="title"
                    value={title ? title : ''}
                    required
                    aria-describedby="titlenotes"
                    onChange={(e) => setTitle(e.target.value)}
                    onFocus={() => setTitleFocus(true)}
                    onBlur={() => setTitleFocus(false)}
                  />
                </div>
                <div className="enterAnimations  flex relative  flex-col space-y-2 items-start  w-full">
                  <label
                    htmlFor="classification"
                    className="flex space-x-3 justify-center items-center text-lg"
                  >
                    تصنيف الوصفة
                  </label>
                  <select
                    id="classification"
                    value={classification || (params.typeId as string)}
                    required
                    name="classification"
                    onChange={(e) => setClassification(e.target.value)}
                    onFocus={() => setClassificationFocus(true)}
                    onBlur={() => setClassificationFocus(false)}
                    aria-describedby="classnote"
                    className="w-full !rounded text-[#151517] bg-white p-2 focus:outline-orange-500 focus:outline-2 outline-none"
                  >
                    <option value="lunch">غداء</option>
                    <option value="breakfast">فطور</option>
                    <option value="sweets">حلويات</option>
                    <option value="drink">شراب</option>
                  </select>
                </div>
                <div className="enterAnimations flex relative  flex-col space-y-2 items-start  w-full">
                  <label
                    htmlFor="additional"
                    className="flex space-x-3 justify-center items-center text-lg"
                  >
                    معلومات اضافية
                  </label>
                  <input
                    className="w-full !rounded text-[#151517] dark:bg-white bg-[#edb91f69] p-2 focus:outline-orange-500 focus:outline-2 outline-none"
                    id="additional"
                    placeholder="يقدم بارد"
                    type="text"
                    name="additional"
                    value={additional ? additional : ''}
                    aria-describedby="additionalnotes"
                    onChange={(e) => setAdditional(e.target.value)}
                    onFocus={() => setAdditionalFocus(true)}
                    onBlur={() => setAdditionalFocus(false)}
                  />
                </div>

                <div
                  className={`shadow-[0_0_11px_4px_#f3a738] border-[#f3a738]  rounded p-4 enterAnimations flex relative flex-col space-y-2 items-start w-full dark:bg-[#00000000] bg-[#ce8538]`}
                >
                  <label
                    htmlFor="steps"
                    className="flex space-x-3 justify-center items-center text-lg mb-4"
                  >
                    خطوات الوصفة
                  </label>
                  {openSteps
                    ? steps?.map((step, key) => (
                        <div
                          key={key}
                          className="flex w-full gap-4 items-center justify-center space-x-3"
                        >
                          <textarea
                            className="w-[90%] !rounded text-[#151517] bg-white p-2 focus:outline-orange-500 focus:outline-2 outline-none"
                            // type="text"
                            name="steps"
                            value={step ? step : ''}
                            required
                            onChange={(e) => {
                              const updatedSteps = [...steps];
                              updatedSteps[key] = e.target.value;
                              setSteps(updatedSteps);
                            }}
                            onFocus={() => setStepFocus(true)}
                            onBlur={() => setStepFocus(false)}
                            aria-describedby="stepnotes"
                          />
                          <div
                            aria-label="button"
                            className="cursor-pointer dark:bg-[#f3a738] bg-[#b25518] w-[15%] text-base text-[#151517] rounded p-1 text-center h-full"
                            onClick={() => removeStep(0)}
                          >
                            إزالة خطوة
                          </div>
                        </div>
                      ))
                    : steps?.length > 0 && (
                        <div
                          key={0}
                          className="flex w-full gap-4 items-center justify-center space-x-3"
                        >
                          <textarea
                            className="w-[90%] !rounded text-[#151517] bg-white p-2 focus:outline-orange-500 focus:outline-2 outline-none"
                            // type="text"
                            name="steps"
                            required
                            value={steps[0] ? steps[0] : ''}
                            onChange={(e) => {
                              const updatedSteps = [...steps];
                              updatedSteps[0] = e.target.value;
                              setSteps(updatedSteps);
                            }}
                            onFocus={() => setStepFocus(true)}
                            onBlur={() => setStepFocus(false)}
                          />
                          <div
                            aria-label="button"
                            className="cursor-pointer dark:bg-[#f3a738] bg-[#b25518] w-[15%] text-base text-[#151517] rounded p-1 text-center h-full"
                            onClick={() => removeStep(0)}
                          >
                            إزالة خطوة
                          </div>
                        </div>
                      )}
                  <div
                    aria-label="button"
                    className="cursor-pointer dark:bg-[#f3a738] bg-[#b25518] w-[20%] text-base text-[#151517] rounded p-1 text-center h-full"
                    onClick={addStep}
                  >
                    إضافة خطوة
                  </div>

                  <div
                    aria-label="button"
                    className="w-full h-4 text-center cursor-pointer text-[#0000008f] dark:text-[#dbdadab5]"
                    onClick={() => {
                      setOpenSteps(!openSteps);
                    }}
                  >
                    {openSteps ? 'رؤية محتوى أقل' : 'رؤية محتوى أكثر'}
                  </div>
                </div>

                <div className="enterAnimations flex relative  flex-col space-y-2 items-start  w-full">
                  <label
                    htmlFor="service"
                    className="flex space-x-3 justify-center items-center text-lg"
                  >
                    عدد الأشخاص
                  </label>
                  <input
                    className="w-full !rounded text-[#151517] dark:bg-white bg-[#edb91f69] p-2 focus:outline-orange-500 focus:outline-2 outline-none"
                    id="service"
                    type="number"
                    min="1"
                    name="service"
                    required
                    value={service ? service : 1}
                    onChange={(e) => {
                      const inputValue = parseInt(e.target.value);
                      if (!isNaN(inputValue)) {
                        setService(inputValue);
                      } else {
                        setService(1);
                      }
                    }}
                    onFocus={() => setServiceFocus(true)}
                    onBlur={() => setServiceFocus(false)}
                    aria-describedby="servicenote"
                  />
                </div>
                <div className="enterAnimations flex relative  flex-col space-y-2 items-start  w-full">
                  <label
                    htmlFor="timeForCooking"
                    className="flex space-x-3 justify-center items-center text-lg"
                  >
                    وقت الطبخ
                  </label>
                  <div className="flex gap-4 w-full">
                    <input
                      className="w-1/2 !rounded text-[#151517] dark:bg-white bg-[#edb91f69] p-2 focus:outline-orange-500 focus:outline-2 outline-none"
                      id="timeForCooking"
                      type="number"
                      min={0}
                      required
                      name="timeForCookingNumber"
                      value={timeForCookingNumber ? timeForCookingNumber : 0}
                      onChange={(e) => {
                        const inputValue = parseInt(e.target.value);
                        if (!isNaN(inputValue)) {
                          setTimeForCookingNumber(inputValue);
                        } else {
                          setTimeForCookingNumber(0);
                        }
                      }}
                      onFocus={() => setTimeForCookingNumberFocus(true)}
                      onBlur={() => setTimeForCookingNumberFocus(false)}
                      aria-describedby="timeforcookingnotes"
                    />

                    <select
                      id="timeForCooking"
                      name="timeForCookingUnit"
                      value={timeUnit ? timeUnit : 'دقيقة'}
                      required
                      onChange={(e) => setTimeUnit(e.target.value)}
                      onFocus={() => setTimeForCookingUnitFocus(true)}
                      onBlur={() => setTimeForCookingUnitFocus(false)}
                      aria-describedby="timeforcookingnotes"
                      className="w-1/2 !rounded text-[#151517] bg-white p-2 focus:outline-orange-500 focus:outline-2 outline-none"
                    >
                      <option value="ثانية">ثانية</option>
                      <option value="دقيقة">دقيقة</option>
                      <option value="ساعة">ساعة</option>
                    </select>
                  </div>
                </div>
                <div className=" flex flex-col justify-evenly gap-4 items-start p-4 rounded shadow-[0_0_11px_4px_#eea243] border-[#eea243] w-full dark:bg-[#00000000] bg-[#b25518]">
                  <label
                    htmlFor="decore"
                    className="flex space-x-3 justify-center items-center text-lg mb-4"
                  >
                    الزينة
                  </label>
                  <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full">
                    <div className="enterAnimations flex relative  flex-col space-y-2 items-start  w-full">
                      <label
                        htmlFor="decore"
                        className="flex space-x-3 justify-center items-center text-lg"
                      >
                        صور الزينة حول الطبق
                      </label>
                      <select
                        value={decore ? decore : 'mint1.png'}
                        name="decore"
                        onChange={(e) => setDecore(e.target.value)}
                        onFocus={() => setdecoreFocus(true)}
                        onBlur={() => setdecoreFocus(false)}
                        aria-describedby="decorenote"
                        className="w-full !rounded text-[#151517] bg-white p-2 focus:outline-orange-500 focus:outline-2 outline-none"
                      >
                        <option value="mint1.png">ورق نعناع</option>
                        <option value="iceCube.svg">مكعبات ثلج</option>
                        <option value="coffeeBean.svg">حبات بن </option>
                      </select>
                    </div>
                    <div className="enterAnimations flex relative  flex-col space-y-2 items-start  w-full">
                      <label
                        htmlFor="color"
                        className="flex space-x-3 justify-center items-center text-lg"
                      >
                        اختر لون خلفية الوصفة
                      </label>
                      <PopoverPicker color={color} onChange={setColor} />

                      <input
                        name="slug"
                        value={decodeURIComponent(params.slug as string)}
                        hidden
                        onChange={() => {
                          return decodeURIComponent(params.slug as string);
                        }}
                      />
                      <input
                        name="color"
                        value={color ? color : '#aabbcc'}
                        hidden
                        onChange={() => {
                          return color;
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="enterAnimations flex relative  flex-col space-y-2 items-start  w-full">
                  <label
                    htmlFor="type"
                    className="flex space-x-3 justify-center items-center text-lg"
                  >
                    نوع الطبق/المشروب
                  </label>
                  <input
                    className="w-full !rounded text-[#151517] dark:bg-white bg-[#edb91f69] p-2 focus:outline-orange-500 focus:outline-2 outline-none"
                    id="type"
                    type="text"
                    placeholder="نباتي"
                    name="type"
                    value={type ? type : ''}
                    required
                    onChange={(e) => setType(e.target.value)}
                    onFocus={() => setTypeFocus(true)}
                    onBlur={() => setTypeFocus(false)}
                    aria-describedby="typenote"
                  />
                </div>
                <div className="enterAnimations flex relative  flex-col items-start space-y-2 p-4 rounded shadow-[0_0_11px_4px_#f3d34a] border-[#f3d34a] dark:bg-[#00000000] bg-[#d3b577] w-full">
                  <div className="w-full ">
                    {deletedPhoto === 0 && recipe && recipe.src ? (
                      <>
                        <label
                          htmlFor="photoUrl"
                          className="flex space-x-3 justify-center items-center text-lg mb-4"
                        >
                          اضغط على الصورة لحذفها
                        </label>
                        <input
                          name="filesText"
                          type="text"
                          value={recipe?.src}
                          hidden
                          onChange={() => {
                            return recipe?.src;
                          }}
                        />
                        <div onClick={deletePhoto} className="cursor-pointer">
                          <Image
                            className={`w-[50%] h-[50%]`}
                            src={recipe ? recipe.src : ''}
                            alt={recipe ? recipe.title : ''}
                            unoptimized
                            width="251"
                            height="543"
                          ></Image>
                        </div>
                      </>
                    ) : (
                      <>
                        <label
                          htmlFor="photoUrl"
                          className="flex space-x-3 justify-center items-center text-lg mb-4"
                        >
                          اضف صورة
                        </label>
                        <input
                          name="files"
                          type="file"
                          required
                          onFocus={() => setPhotoFocus(true)}
                          onBlur={() => setPhotoFocus(false)}
                          aria-describedby="photonote"
                        />
                      </>
                    )}
                  </div>
                </div>
                <SubmitButton setSubmit={setSubmit}></SubmitButton>
              </form>
            </div>
          </>
        </main>
      )}
    </>
  );
}
