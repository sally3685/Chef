'use client';
import React, { useEffect, useState } from 'react';
import { useAnimation } from '@/helpers/useAnimation';
import { useUser } from '@clerk/nextjs';
import Loading from '@/app/[typeId]/loading';
import { SubmitButton } from '@/app/[typeId]/_component/Button';
import { useParams } from 'next/navigation';
import { Ingredients } from '@prisma/client';
import { ArrowBigRightIcon, ArrowBigLeftIcon } from 'lucide-react';
import { deleteUTFiles, postIngredient } from '@/data-access/ingredients';
import { GetIngredient } from '@/data-access/ingredients';
import { deleteAllIngredient } from '@/data-access/ingredients';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import ErrorPage from '../../error';
const explaination = [
  'اذكر اسم واضح مشوق يعبر عن الوصفة',
  'معلومات إضافية مثل : وصفة مميزة لصيف دافئ ',
  ' ادخل رقم بالكمية المطلوبة من المكون',
  ' ادخل الواحدة المناسبة للكمية المطلوبة من المكون',
  'اضافة صورة اقصى حجم 4MB',
  'إبدأ بإضافة بيانات الوصفة المناسبة',
  'إضافة مكون جديد للوصفة ولكن الحفظ يكون بالضغط على إرسال',
  'إزالة المكون المحدد الان',
  '🥰🥰🥰 شكرا لمشاركتك ',
  'السعرات الحرارية الخاصة بالكمية الخاصة بهذا المكون',
  'كمية الدسم الخاصة بالكمية الخاصة بهذا المكون',
  'الواحدة الخاصة بكمية الدسم الخاصة بالكمية الخاصة بهذا المكون',

  'كمية الكولسترول الخاصة بالكمية الخاصة بهذا المكون',
  'الواحدة الخاصة بكمية الكولسترول الخاصة بالكمية الخاصة بهذا المكون',
  'كمية الصوديوم الخاصة بالكمية الخاصة بهذا المكون',
  'الواحدة الخاصة بكمية الصوديوم الخاصة بالكمية الخاصة بهذا المكون',
  'كمية الكربوهيدرات الكلية الخاصة بالكمية الخاصة بهذا المكون',
  'الواحدة الخاصة بكمية الكربوهيدرات الكلية الخاصة بالكمية الخاصة بهذا المكون',
  'كمية البروتين الخاصة بالكمية الخاصة بهذا المكون',
  'الواحدة الخاصة بكمية البروتين الخاصة بالكمية الخاصة بهذا المكون',
  'كمية فيتامين دال الخاصة بالكمية الخاصة بهذا المكون',
  'الواحدة الخاصة بكمية فيتامين دال الخاصة بالكمية الخاصة بهذا المكون',
  'كمية الكالسيوم الخاصة بالكمية الخاصة بهذا المكون',
  'الواحدة الخاصة بكمية الكالسيوم الخاصة بالكمية الخاصة بهذا المكون',
  'كمية الحديد الخاصة بالكمية الخاصة بهذا المكون',
  'الواحدة الخاصة بكمية الحديد الخاصة بالكمية الخاصة بهذا المكون',
  'كمية البوتاسيوم الخاصة بالكمية الخاصة بهذا المكون',
  'الواحدة الخاصة بكمية البوتاسيوم الخاصة بالكمية الخاصة بهذا المكون',
  'كمية الكافئين الخاصة بالكمية الخاصة بهذا المكون',
  'الواحدة الخاصة بكمية الكافئين الخاصة بالكمية الخاصة بهذا المكون',
];
export default function UpdateIngredient() {
  const params = useParams();
  const { isLoaded, user } = useUser();
  const [submit, setSubmit] = React.useState(false);
  const [loa, setloa] = React.useState(false);
  const [del, setDel] = React.useState(false);
  const titleRef = React.useRef<HTMLInputElement>(null);
  const [titleFocus, setTitleFocus] = React.useState(true);
  const [openSteps, setOpenSteps] = React.useState(false);
  const [additionalFocus, setAdditionalFocus] = React.useState(false);
  const [amountNumberFocus, setAmountNumberFocus] = React.useState(false);
  const [totalFatNumberFocus, setTotalFatNumberFocus] = React.useState(false);
  const [totalFatUnitFocus, setTotalFatUnitFocus] = React.useState(false);

  const [colestrolNumberFocus, setColestrolNumberFocus] = React.useState(false);
  const [colestrolUnitFocus, setColestrolUnitFocus] = React.useState(false);

  const [sodiumNumberFocus, setSodiumNumberFocus] = React.useState(false);
  const [sodiumUnitFocus, setSodiumUnitFocus] = React.useState(false);

  const [totalCarbohydratesNumberFocus, setTotalCarbohydratesNumberFocus] =
    React.useState(false);
  const [totalCarbohydratesUnitFocus, setTotalCarbohydratesUnitFocus] =
    React.useState(false);

  const [proteinNumberFocus, setProteinNumberFocus] = React.useState(false);
  const [proteinUnitFocus, setProteinUnitFocus] = React.useState(false);

  const [vitaminDNumberFocus, setVitaminDNumberFocus] = React.useState(false);
  const [vitaminDUnitFocus, setVitaminDUnitFocus] = React.useState(false);

  const [calciumNumberFocus, setCalciumNumberFocus] = React.useState(false);
  const [calciumDUnitFocus, setCalciumDUnitFocus] = React.useState(false);

  const [ironNumberFocus, setIronNumberFocus] = React.useState(false);
  const [ironDUnitFocus, setIronDUnitFocus] = React.useState(false);

  const [potassiumNumberFocus, setPotassiumNumberFocus] = React.useState(false);
  const [potassiumUnitFocus, setpotassiumUnitFocus] = React.useState(false);

  const [caffeineNumberFocus, setCaffeineNumberFocus] = React.useState(false);
  const [caffeineUnitFocus, setCaffeineUnitFocus] = React.useState(false);

  const [amountUnitFocus, setAmountUnitFocus] = React.useState(false);
  const [photoFocus, setPhotoFocus] = React.useState(false);
  const [addFocus, setAddFocus] = React.useState(false);
  const [removeFocus, setRemoveFocus] = React.useState(false);
  const [removeFocusAll, setRemoveFocusAll] = React.useState(false);
  const [caloryFocus, setCaloryFocus] = React.useState(false);
  const recipyId = params.slug as string;
  const slug = decodeURIComponent(recipyId as string);
  const slugSent = slug;
  const [indexIngredient, setIndexIngredient] = React.useState(0);
  let url = slug.replaceAll('-', ' ');
  url = url.replace(/[0-9]/g, '');
  const classification = params.typeId;
  const [user1, setUser1] = React.useState('');
  const [explain] = React.useState(explaination);
  const [filesForm, setFilesForm] = React.useState<File[] | undefined[]>([
    undefined,
  ]);
  const [photoUploadedName, setPhotoUploadedName] = React.useState<string[]>([
    '',
  ]);
  const [refresh, setRefresh] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [isFetchLoad, setFetchLoad] = useState(false);
  useEffect(() => {
    // setItemsArray([]);
    const fetchData = async () => {
      setFetchLoad(true);
      const a = await GetIngredient(slugSent);
      if (a.status === 500) setError(a.message as string);
      else if ((a?.res?.ingredients?.length as number) > 0) {
        setIngredient(a?.res?.ingredients as Ingredients[]);
      }
      setFetchLoad(false);
    };

    fetchData();
    setError(null);
  }, [refresh]);

  useEffect(() => {
    if (del === true) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth', // For smooth scrolling effect
      });
    }
  }, [del]);

  const [ingredient, setIngredient] = React.useState<Ingredients[]>([
    {
      name: '',
      additional: '',
      amount: {
        number: 0,
        unit: '',
      },
      calory: 0,
      totalFat: {
        number: 0,
        unit: '',
      },
      cholesterol: {
        number: 0,
        unit: '',
      },
      sodium: {
        number: 0,
        unit: '',
      },
      totalCarbohydrates: {
        number: 0,
        unit: '',
      },
      protein: {
        number: 0,
        unit: '',
      },
      vitaminD: {
        number: 0,
        unit: '',
      },
      calcium: {
        number: 0,
        unit: '',
      },
      iron: {
        number: 0,
        unit: '',
      },
      potassium: {
        number: 0,
        unit: '',
      },
      caffeine: {
        number: 0,
        unit: '',
      },
    },
  ] as Ingredients[]);
  const addIngredient = () => {
    setIngredient([
      ...ingredient,
      {
        name: '',
        additional: '',
        amount: {
          number: 0,
          unit: '',
        },
        calory: 0,
        totalFat: {
          number: 0,
          unit: '',
        },
        cholesterol: {
          number: 0,
          unit: '',
        },
        sodium: {
          number: 0,
          unit: '',
        },
        totalCarbohydrates: {
          number: 0,
          unit: '',
        },
        protein: {
          number: 0,
          unit: '',
        },
        vitaminD: {
          number: 0,
          unit: '',
        },
        calcium: {
          number: 0,
          unit: '',
        },
        iron: {
          number: 0,
          unit: '',
        },
        potassium: {
          number: 0,
          unit: '',
        },
        caffeine: {
          number: 0,
          unit: '',
        },
      },
    ] as Ingredients[]);
    setFilesForm([...filesForm, undefined] as File[] | undefined[]);
    setPhotoUploadedName([...photoUploadedName, ''] as string[]);
  };
  const removeIngredient = (index: any) => {
    const updatedIngredient = [...ingredient];
    updatedIngredient.splice(index, 1);
    setIngredient(updatedIngredient);

    const updatedFiles = [...filesForm];
    updatedFiles.splice(index, 1);
    setFilesForm(updatedFiles as File[] | undefined[]);

    const updatedn = [...photoUploadedName];
    updatedn.splice(index, 1);
    setPhotoUploadedName(photoUploadedName as string[]);
  };

  React.useEffect(() => {
    titleRef?.current?.focus();
  }, []);

  React.useEffect(() => {
    if (isLoaded) setUser1(user?.id!);
  }, [isLoaded]);
  const [deletedPhoto, setDeletedPhoto] = React.useState(0);

  useAnimation(() => {
    if (document) {
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
  const router = useRouter();
  const deletePhoto = async (src: string) => {
    try {
      setDeletedPhoto(1);
      setIngredient((prev) => {
        const a = prev;
        a[indexIngredient].src = null;
        return a;
      });
    } catch {
    } finally {
      const url = src.split('/').pop();
      const res = await deleteUTFiles(url as string, ingredient, slugSent);
      if (res.status === 500) {
        setError(res.message);
      } else {
        setDeletedPhoto(0);
        alert('تم حذف الصورة');
      }
    }
  };
  return (
    <>
      {!isFetchLoad && error ? (
        <ErrorPage
          error={new Error(error)}
          reset={() => {
            setRefresh(!refresh);
            router.refresh();
          }}
        ></ErrorPage>
      ) : !isFetchLoad && ingredient ? (
        <main
          className="w-full flex gap-10 justify-center 
          items-center
       mx-auto p-2  max-w-7xl section-min-height  lg:flex-row-reverse flex-col"
        >
          <>
            <div className="text-sm lg:text-lg flex lg:flex-col top-[87px] z-[1] bg-[#f5f5f4] dark:bg-[#151517] dark:lg:bg-[#00000000] w-[100%] justify-evenly items-center self-start sticky lg:top-[10rem] left-0 lg:w-[30%]  h-[30%] shadow-[0_0_11px_4px_#f3d34a] border-[#f3d34a] rounded p-4">
              <p aria-label="h1" className="text-[#f3d34a]  mb-1 font-bold">
                معلومات مساعدة
              </p>
              <p
                id={
                  titleFocus
                    ? 'titlenotes'
                    : additionalFocus
                    ? 'additionalnotes'
                    : amountNumberFocus
                    ? 'stepnotes'
                    : amountUnitFocus
                    ? 'servicenote'
                    : photoFocus
                    ? 'photonote'
                    : submit || removeFocusAll
                    ? 'submitnote'
                    : addFocus
                    ? 'addnote'
                    : removeFocus
                    ? 'removenote'
                    : caloryFocus
                    ? 'calorynotes'
                    : totalFatNumberFocus
                    ? 'totalfatnumbrtnotes'
                    : totalFatUnitFocus
                    ? 'totalfatUnitnotes'
                    : colestrolNumberFocus
                    ? 'colestrolnumbrtnotes'
                    : colestrolUnitFocus
                    ? 'colestrolUnitnotes'
                    : sodiumNumberFocus
                    ? 'sodiumnumbrtnotes'
                    : sodiumUnitFocus
                    ? 'sodiumUnitnotes'
                    : totalCarbohydratesNumberFocus
                    ? 'talCarbohydratesnumbrtnotes'
                    : totalCarbohydratesUnitFocus
                    ? 'talCarbohydratesUnitnotes'
                    : proteinNumberFocus
                    ? 'proteinnumbrtnotes'
                    : proteinUnitFocus
                    ? 'proteinUnitnotes'
                    : vitaminDNumberFocus
                    ? 'vitaminDnumbrtnotes'
                    : vitaminDUnitFocus
                    ? 'vitaminDUnitnotes'
                    : calciumNumberFocus
                    ? 'calciumnumbrtnotes'
                    : calciumDUnitFocus
                    ? 'calciumUnitnotes'
                    : ironNumberFocus
                    ? 'ironnumbrtnotes'
                    : ironDUnitFocus
                    ? 'ironUnitnotes'
                    : potassiumNumberFocus
                    ? 'potassiumnumbrtnotes'
                    : potassiumUnitFocus
                    ? 'potassiumUnitnotes'
                    : caffeineNumberFocus
                    ? 'caffeineNumber'
                    : caffeineUnitFocus
                    ? 'caffeineUnitnotes'
                    : 'photonote'
                }
              >
                {titleFocus
                  ? explain[0]
                  : additionalFocus
                  ? explain[1]
                  : amountNumberFocus
                  ? explain[2]
                  : amountUnitFocus
                  ? explain[3]
                  : photoFocus
                  ? explain[4]
                  : submit || removeFocusAll
                  ? explain[8]
                  : addFocus
                  ? explain[6]
                  : removeFocus
                  ? explain[7]
                  : caloryFocus
                  ? explain[9]
                  : totalFatNumberFocus
                  ? explain[10]
                  : totalFatUnitFocus
                  ? explain[11]
                  : colestrolNumberFocus
                  ? explain[12]
                  : colestrolUnitFocus
                  ? explain[13]
                  : sodiumNumberFocus
                  ? explain[14]
                  : sodiumUnitFocus
                  ? explain[15]
                  : totalCarbohydratesNumberFocus
                  ? explain[16]
                  : totalCarbohydratesUnitFocus
                  ? explain[17]
                  : proteinNumberFocus
                  ? explain[18]
                  : proteinUnitFocus
                  ? explain[19]
                  : vitaminDNumberFocus
                  ? explain[20]
                  : vitaminDUnitFocus
                  ? explain[21]
                  : calciumNumberFocus
                  ? explain[22]
                  : calciumDUnitFocus
                  ? explain[23]
                  : ironNumberFocus
                  ? explain[24]
                  : ironDUnitFocus
                  ? explain[25]
                  : explain[5]}
              </p>
            </div>

            <div className="lg:w-1/2 w-[90%] mt-4 my-4">
              <h1 className="enterAnimations relative text-2xl lg:text-3xl font-medium mb-6 text-center">
                تعديل مكونات لوصفة{' '}
                <span className="text-orange-400">{url}</span>
              </h1>
              <div className="enterAnimations flex flex-col">
                <h2 className="mb-2">المكونات المضافة : </h2>
                <div className="flex ">
                  {ingredient.map((item, index) => (
                    <h3 key={index}>
                      <span
                        className={`${
                          index === indexIngredient ? 'text-orange-400 ' : ''
                        } hover:text-orange-400 cursor-pointer`}
                        onClick={() => {
                          setIndexIngredient(index);
                        }}
                      >
                        {item.name}
                      </span>
                      <span className="mx-1">{'-'}</span>
                    </h3>
                  ))}
                </div>
              </div>
              {submit && (
                <p
                  aria-label="h1"
                  className="text-lg lg:text-xl my-1 font-bold w-full text-center  text-[#f3a738]"
                >
                  يتم معالجة الطلب الرجاء الانتظار ...
                </p>
              )}
              {del && (
                <p
                  aria-label="h1"
                  className="text-lg lg:text-xl my-1 font-bold w-full text-center  text-[#f3a738]"
                >
                  يتم معالجة الطلب الرجاء الانتظار ...
                </p>
              )}
              <div className="enterAnimations flex w-full justify-between my-4">
                <div
                  aria-disabled={indexIngredient === 0}
                  className={`${
                    indexIngredient === 0
                      ? 'cursor-not-allowed'
                      : 'cursor-pointer'
                  } hover:text-orange-400`}
                  onClick={() => {
                    if (indexIngredient !== 0) {
                      setIndexIngredient((prev) => prev - 1);

                      titleRef?.current?.focus();
                    }
                  }}
                >
                  <ArrowBigRightIcon />
                </div>

                <h3 className="text-sm">
                  تحكم بالأسهم أو اضغط على المكون للوصول اليه
                </h3>
                <div
                  className={`${
                    indexIngredient === ingredient.length - 1
                      ? 'cursor-not-allowed'
                      : 'cursor-pointer'
                  } hover:text-orange-400`}
                  aria-disabled={indexIngredient === ingredient.length - 1}
                  onClick={() => {
                    if (indexIngredient !== ingredient.length - 1) {
                      setIndexIngredient((prev) => prev + 1);

                      titleRef?.current?.focus();
                    }
                  }}
                >
                  <ArrowBigLeftIcon />
                </div>
              </div>

              <form
                className="flex flex-col justify-center items-center space-y-8 w-full  "
                // action={postRecipy}
                action={async (formData: FormData) => {
                  const res = await postIngredient(
                    ingredient,
                    filesForm,
                    formData
                  );
                  if (res.status === 500) throw new Error(res.message);
                  else {
                    alert('تم تعديل المكونات');
                    setSubmit(false);
                    setRefresh(!refresh);
                  }
                  // await postRecipy(formData);
                  // router.push(`/${formData.get('classification') as string}`);
                }}
              >
                <input
                  name="slug"
                  value={slugSent}
                  hidden
                  onChange={() => {
                    return slugSent;
                  }}
                />
                <input
                  name="classification"
                  value={classification}
                  hidden
                  onChange={() => {
                    return classification;
                  }}
                />
                <div className="enterAnimations  flex relative  flex-col space-y-2 items-start  w-full">
                  <label
                    htmlFor="title"
                    className="flex space-x-3 justify-center items-center  text-lg"
                  >
                    اسم المكون
                  </label>

                  <input
                    ref={titleRef}
                    className="w-full !rounded text-[#151517] dark:bg-white bg-[#edb91f69] p-2 focus:outline-orange-500 focus:outline-2 outline-none"
                    id="title"
                    type="title"
                    placeholder="متبل الشمندر على الطريقة السورية"
                    name="title"
                    value={ingredient[indexIngredient].name}
                    required
                    aria-describedby="titlenotes"
                    onChange={(e) =>
                      setIngredient((prev) => {
                        const a = [...prev];
                        a[indexIngredient].name = e.target.value;
                        return a;
                      })
                    }
                    onFocus={() => setTitleFocus(true)}
                    onBlur={() => setTitleFocus(false)}
                  />
                </div>
                <div className="enterAnimations flex relative  flex-col space-y-2 items-start  w-full">
                  <label
                    htmlFor="additional"
                    className="flex space-x-3 justify-center items-center  text-lg"
                  >
                    معلومات اضافية
                  </label>
                  <input
                    className="w-full !rounded text-[#151517] dark:bg-white bg-[#edb91f69] p-2 focus:outline-orange-500 focus:outline-2 outline-none"
                    id="additional"
                    placeholder="يقدم بارد"
                    type="text"
                    name="additional"
                    value={ingredient[indexIngredient].additional as string}
                    aria-describedby="additionalnotes"
                    onChange={(e) =>
                      setIngredient((prev) => {
                        const a = [...prev];
                        a[indexIngredient].additional = e.target.value;
                        return a;
                      })
                    }
                    onFocus={() => setAdditionalFocus(true)}
                    onBlur={() => setAdditionalFocus(false)}
                  />
                </div>
                <div className="enterAnimations flex relative  flex-col space-y-2 items-start  w-full">
                  <label
                    htmlFor="amount"
                    className="flex space-x-3 justify-center items-center  text-lg"
                  >
                    الكمية
                  </label>
                  <div className="flex gap-4 w-full">
                    <input
                      className="w-1/2 !rounded text-[#151517] dark:bg-white bg-[#edb91f69] p-2 focus:outline-orange-500 focus:outline-2 outline-none"
                      type="number"
                      step="0.01"
                      min={0.0}
                      name="amountNumber"
                      value={
                        ingredient[indexIngredient].amount.number as number
                      }
                      required
                      onChange={(e) =>
                        setIngredient((prev) => {
                          const a = [...prev];
                          const inputValue = parseFloat(e.target.value);
                          if (!isNaN(inputValue)) {
                            a[indexIngredient].amount.number = inputValue;
                          } else {
                            a[indexIngredient].amount.number = 0.0;
                          }

                          return a;
                        })
                      }
                      onFocus={() => setAmountNumberFocus(true)}
                      onBlur={() => setAmountNumberFocus(false)}
                      aria-describedby="amountNumbernotes"
                    />
                    <input
                      className="w-1/2 !rounded text-[#151517] dark:bg-white bg-[#edb91f69] p-2 focus:outline-orange-500 focus:outline-2 outline-none"
                      type="text"
                      name="amountUnit"
                      placeholder="غرام"
                      value={ingredient[indexIngredient].amount.unit as string}
                      required
                      onChange={(e) =>
                        setIngredient((prev) => {
                          const a = [...prev];
                          a[indexIngredient].amount.unit = e.target.value;
                          return a;
                        })
                      }
                      onFocus={() => setAmountUnitFocus(true)}
                      onBlur={() => setAmountUnitFocus(false)}
                      aria-describedby="amountUnitnotes"
                    />
                  </div>
                </div>
                <div className="enterAnimations flex relative  flex-col items-start space-y-2 p-4 rounded shadow-[0_0_11px_4px_#f3d34a] border-[#f3d34a] dark:bg-[#00000000] bg-[#ce8538] w-full">
                  <label
                    htmlFor="Form"
                    className="flex space-x-3 justify-center items-center  text-lg mb-4"
                  >
                    اضف صورة
                  </label>
                  <div className="w-full flex relative justify-center items-center gap-4">
                    {ingredient[indexIngredient].src && deletedPhoto === 0 ? (
                      <>
                        <label
                          htmlFor="fileInput"
                          className="p-2 cursor-pointer bg-yellow-200 text-black rounded"
                          onClick={() => {
                            deletePhoto(
                              ingredient[indexIngredient].src as string
                            );
                          }}
                        >
                          اختر غير الصورة
                        </label>
                        {ingredient[indexIngredient].src && (
                          <img
                            className="w-[100px]"
                            src={ingredient[indexIngredient].src as string}
                            alt={'صورة المكون 💛'}
                          ></img>
                        )}
                      </>
                    ) : deletedPhoto === 1 ? (
                      <div>يتم حذف الصورة انتظر قليلا ..</div>
                    ) : (
                      <>
                        <label
                          htmlFor="fileInput"
                          className="p-2 cursor-pointer bg-yellow-200 text-black rounded"
                        >
                          اختر الصورة
                        </label>
                        <div className="relative">
                          {photoUploadedName[indexIngredient]?.slice(12)}
                        </div>
                        <input
                          id="fileInput"
                          name="files"
                          type="file"
                          value={''}
                          style={{
                            display: 'none',
                          }}
                          onChange={(e) => {
                            setFilesForm((prev) => {
                              const file = e.target.files;
                              const a = prev;
                              const f = file?.[0];
                              a[indexIngredient] = f;
                              return a;
                            });
                            setPhotoUploadedName((r) => {
                              const g = [...r];
                              g[indexIngredient] = e.target.value;
                              return g;
                            });
                          }}
                          onFocus={() => setPhotoFocus(true)}
                          onBlur={() => setPhotoFocus(false)}
                          aria-describedby="photonote"
                        />
                      </>
                    )}
                  </div>
                </div>
                <div
                  className={`shadow-[0_0_11px_4px_#f3a738] border-[#f3a738] dark:bg-[#00000000] bg-[#b25518]  text-white rounded p-4 enterAnimations flex relative flex-col space-y-2 items-start w-full`}
                >
                  <label
                    htmlFor="calory"
                    className="flex space-x-3 justify-center items-center  text-lg mb-4"
                  >
                    معلومات مهمة عن المكون
                  </label>
                  {!openSteps ? (
                    <>
                      <div className=" flex relative  flex-col space-y-2 items-start  w-full">
                        <label
                          htmlFor="calory"
                          className="flex space-x-3 justify-center items-center  text-lg"
                        >
                          السعرات الحرارية
                        </label>
                        <input
                          className="w-1/2 !rounded text-[#151517] bg-white p-2 focus:outline-orange-500 focus:outline-2 outline-none"
                          type="number"
                          min={0}
                          name="calory"
                          value={ingredient[indexIngredient].calory as number}
                          onChange={(e) =>
                            setIngredient((prev) => {
                              const a = [...prev];
                              a[indexIngredient].calory = parseInt(
                                e.target.value
                              );
                              return a;
                            })
                          }
                          onFocus={() => setCaloryFocus(true)}
                          onBlur={() => setCaloryFocus(false)}
                          aria-describedby="calorynotes"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className=" flex relative  flex-col space-y-2 items-start  w-full">
                        <label
                          htmlFor="calory"
                          className="flex space-x-3 justify-center items-center  text-lg"
                        >
                          السعرات الحرارية
                        </label>
                        <input
                          className="w-1/2 !rounded text-[#151517] bg-white p-2 focus:outline-orange-500 focus:outline-2 outline-none"
                          type="number"
                          min={0}
                          name="calory"
                          value={ingredient[indexIngredient].calory as number}
                          onChange={(e) =>
                            setIngredient((prev) => {
                              const a = [...prev];
                              a[indexIngredient].calory = parseInt(
                                e.target.value
                              );
                              return a;
                            })
                          }
                          onFocus={() => setCaloryFocus(true)}
                          onBlur={() => setCaloryFocus(false)}
                          aria-describedby="calorynotes"
                        />
                      </div>
                      <div className=" flex relative  flex-col space-y-2 items-start  w-full">
                        <label
                          htmlFor="totalfat"
                          className="flex space-x-3 justify-center items-center  text-lg"
                        >
                          كمية الدسم
                        </label>
                        <div className="flex gap-4 w-full">
                          <input
                            className="w-1/2 !rounded text-[#151517] bg-white p-2 focus:outline-orange-500 focus:outline-2 outline-none"
                            type="number"
                            min={0}
                            name="totalFatNumber"
                            value={
                              ingredient[indexIngredient].totalFat
                                .number as number
                            }
                            onChange={(e) =>
                              setIngredient((prev) => {
                                const a = [...prev];
                                a[indexIngredient].totalFat.number = parseInt(
                                  e.target.value
                                );
                                return a;
                              })
                            }
                            onFocus={() => setTotalFatNumberFocus(true)}
                            onBlur={() => setTotalFatNumberFocus(false)}
                            aria-describedby="totalfatnumbrtnotes"
                          />
                          <input
                            className="w-1/2 !rounded text-[#151517] bg-white p-2 focus:outline-orange-500 focus:outline-2 outline-none"
                            type="text"
                            name="totalFatUnit"
                            placeholder="غرام"
                            value={
                              ingredient[indexIngredient].totalFat
                                .unit as string
                            }
                            onChange={(e) =>
                              setIngredient((prev) => {
                                const a = [...prev];
                                a[indexIngredient].totalFat.unit =
                                  e.target.value;
                                return a;
                              })
                            }
                            onFocus={() => setTotalFatUnitFocus(true)}
                            onBlur={() => setTotalFatUnitFocus(false)}
                            aria-describedby="totalfatUnitnotes"
                          />
                        </div>
                      </div>

                      <div className=" flex relative  flex-col space-y-2 items-start  w-full">
                        <label
                          htmlFor="colerstrol"
                          className="flex space-x-3 justify-center items-center  text-lg"
                        >
                          كمية الكوليسترول
                        </label>
                        <div className="flex gap-4 w-full">
                          <input
                            className="w-1/2 !rounded text-[#151517] bg-white p-2 focus:outline-orange-500 focus:outline-2 outline-none"
                            type="number"
                            min={0}
                            name="colestrol"
                            value={
                              ingredient[indexIngredient].cholesterol
                                .number as number
                            }
                            onChange={(e) =>
                              setIngredient((prev) => {
                                const a = [...prev];
                                a[indexIngredient].cholesterol.number =
                                  parseInt(e.target.value);
                                return a;
                              })
                            }
                            onFocus={() => setColestrolNumberFocus(true)}
                            onBlur={() => setColestrolNumberFocus(false)}
                            aria-describedby="colestrolnumbrtnotes"
                          />
                          <input
                            className="w-1/2 !rounded text-[#151517] bg-white p-2 focus:outline-orange-500 focus:outline-2 outline-none"
                            type="text"
                            name="colestrolUnit"
                            placeholder="غرام"
                            value={
                              ingredient[indexIngredient].cholesterol
                                .unit as string
                            }
                            onChange={(e) =>
                              setIngredient((prev) => {
                                const a = [...prev];
                                a[indexIngredient].cholesterol.unit =
                                  e.target.value;
                                return a;
                              })
                            }
                            onFocus={() => setColestrolUnitFocus(true)}
                            onBlur={() => setColestrolUnitFocus(false)}
                            aria-describedby="colestrolUnitnotes"
                          />
                        </div>
                      </div>

                      <div className=" flex relative  flex-col space-y-2 items-start  w-full">
                        <label
                          htmlFor="colerstrol"
                          className="flex space-x-3 justify-center items-center  text-lg"
                        >
                          كمية الصوديوم
                        </label>
                        <div className="flex gap-4 w-full">
                          <input
                            className="w-1/2 !rounded text-[#151517] bg-white p-2 focus:outline-orange-500 focus:outline-2 outline-none"
                            type="number"
                            min={0}
                            name="sodium"
                            value={
                              ingredient[indexIngredient].sodium
                                .number as number
                            }
                            onChange={(e) =>
                              setIngredient((prev) => {
                                const a = [...prev];
                                a[indexIngredient].sodium.number = parseInt(
                                  e.target.value
                                );
                                return a;
                              })
                            }
                            onFocus={() => setSodiumNumberFocus(true)}
                            onBlur={() => setSodiumNumberFocus(false)}
                            aria-describedby="sodiumnumbrtnotes"
                          />
                          <input
                            className="w-1/2 !rounded text-[#151517] bg-white p-2 focus:outline-orange-500 focus:outline-2 outline-none"
                            type="text"
                            name="sodiumUnit"
                            placeholder="غرام"
                            value={
                              ingredient[indexIngredient].sodium.unit as string
                            }
                            onChange={(e) =>
                              setIngredient((prev) => {
                                const a = [...prev];
                                a[indexIngredient].sodium.unit = e.target.value;
                                return a;
                              })
                            }
                            onFocus={() => setSodiumUnitFocus(true)}
                            onBlur={() => setSodiumUnitFocus(false)}
                            aria-describedby="sodiumUnitnotes"
                          />
                        </div>
                      </div>

                      <div className=" flex relative  flex-col space-y-2 items-start  w-full">
                        <label
                          htmlFor="totalCarbohydrates"
                          className="flex space-x-3 justify-center items-center  text-lg"
                        >
                          كمية الكربوهيدرات الكلية
                        </label>
                        <div className="flex gap-4 w-full">
                          <input
                            className="w-1/2 !rounded text-[#151517] bg-white p-2 focus:outline-orange-500 focus:outline-2 outline-none"
                            type="number"
                            min={0}
                            name="totalCarbohydrates"
                            value={
                              ingredient[indexIngredient].totalCarbohydrates
                                .number as number
                            }
                            onChange={(e) =>
                              setIngredient((prev) => {
                                const a = [...prev];
                                a[indexIngredient].totalCarbohydrates.number =
                                  parseInt(e.target.value);
                                return a;
                              })
                            }
                            onFocus={() =>
                              setTotalCarbohydratesNumberFocus(true)
                            }
                            onBlur={() =>
                              setTotalCarbohydratesNumberFocus(false)
                            }
                            aria-describedby="totalCarbohydratesnumbrtnotes"
                          />
                          <input
                            className="w-1/2 !rounded text-[#151517] bg-white p-2 focus:outline-orange-500 focus:outline-2 outline-none"
                            type="text"
                            name="totalCarbohydratesUnit"
                            placeholder="غرام"
                            value={
                              ingredient[indexIngredient].totalCarbohydrates
                                .unit as string
                            }
                            onChange={(e) =>
                              setIngredient((prev) => {
                                const a = [...prev];
                                a[indexIngredient].totalCarbohydrates.unit =
                                  e.target.value;
                                return a;
                              })
                            }
                            onFocus={() => setTotalCarbohydratesUnitFocus(true)}
                            onBlur={() => setTotalCarbohydratesUnitFocus(false)}
                            aria-describedby="totalCarbohydratesUnitnotes"
                          />
                        </div>
                      </div>

                      <div className=" flex relative  flex-col space-y-2 items-start  w-full">
                        <label
                          htmlFor="protein"
                          className="flex space-x-3 justify-center items-center  text-lg"
                        >
                          كمية البروتين
                        </label>
                        <div className="flex gap-4 w-full">
                          <input
                            className="w-1/2 !rounded text-[#151517] bg-white p-2 focus:outline-orange-500 focus:outline-2 outline-none"
                            type="number"
                            min={0}
                            name="protein"
                            value={
                              ingredient[indexIngredient].protein
                                .number as number
                            }
                            onChange={(e) =>
                              setIngredient((prev) => {
                                const a = [...prev];
                                a[indexIngredient].protein.number = parseInt(
                                  e.target.value
                                );
                                return a;
                              })
                            }
                            onFocus={() => setProteinNumberFocus(true)}
                            onBlur={() => setProteinNumberFocus(false)}
                            aria-describedby="proteinnumbrtnotes"
                          />
                          <input
                            className="w-1/2 !rounded text-[#151517] bg-white p-2 focus:outline-orange-500 focus:outline-2 outline-none"
                            type="text"
                            name="protienUnit"
                            placeholder="غرام"
                            value={
                              ingredient[indexIngredient].protein.unit as string
                            }
                            onChange={(e) =>
                              setIngredient((prev) => {
                                const a = [...prev];
                                a[indexIngredient].protein.unit =
                                  e.target.value;
                                return a;
                              })
                            }
                            onFocus={() => setProteinUnitFocus(true)}
                            onBlur={() => setProteinUnitFocus(false)}
                            aria-describedby="proteinUnitnotes"
                          />
                        </div>
                      </div>

                      <div className=" flex relative  flex-col space-y-2 items-start  w-full">
                        <label
                          htmlFor="vitaminD"
                          className="flex space-x-3 justify-center items-center  text-lg"
                        >
                          كمية فيتامين دال
                        </label>
                        <div className="flex gap-4 w-full">
                          <input
                            className="w-1/2 !rounded text-[#151517] bg-white p-2 focus:outline-orange-500 focus:outline-2 outline-none"
                            type="number"
                            min={0}
                            name="vitaminD"
                            value={
                              ingredient[indexIngredient].vitaminD
                                .number as number
                            }
                            onChange={(e) =>
                              setIngredient((prev) => {
                                const a = [...prev];
                                a[indexIngredient].vitaminD.number = parseInt(
                                  e.target.value
                                );
                                return a;
                              })
                            }
                            onFocus={() => setVitaminDNumberFocus(true)}
                            onBlur={() => setVitaminDNumberFocus(false)}
                            aria-describedby="vitaminDnumbrtnotes"
                          />
                          <input
                            className="w-1/2 !rounded text-[#151517] bg-white p-2 focus:outline-orange-500 focus:outline-2 outline-none"
                            type="text"
                            name="vitaminDUnit"
                            placeholder="غرام"
                            value={
                              ingredient[indexIngredient].vitaminD
                                .unit as string
                            }
                            onChange={(e) =>
                              setIngredient((prev) => {
                                const a = [...prev];
                                a[indexIngredient].vitaminD.unit =
                                  e.target.value;
                                return a;
                              })
                            }
                            onFocus={() => setVitaminDUnitFocus(true)}
                            onBlur={() => setVitaminDUnitFocus(false)}
                            aria-describedby="vitaminDUnitnotes"
                          />
                        </div>
                      </div>

                      <div className=" flex relative  flex-col space-y-2 items-start  w-full">
                        <label
                          htmlFor="calcium"
                          className="flex space-x-3 justify-center items-center  text-lg"
                        >
                          كمية الكالسيوم
                        </label>
                        <div className="flex gap-4 w-full">
                          <input
                            className="w-1/2 !rounded text-[#151517] bg-white p-2 focus:outline-orange-500 focus:outline-2 outline-none"
                            type="number"
                            min={0}
                            name="calcium"
                            value={
                              ingredient[indexIngredient].calcium
                                .number as number
                            }
                            onChange={(e) =>
                              setIngredient((prev) => {
                                const a = [...prev];
                                a[indexIngredient].calcium.number = parseInt(
                                  e.target.value
                                );
                                return a;
                              })
                            }
                            onFocus={() => setCalciumNumberFocus(true)}
                            onBlur={() => setCalciumNumberFocus(false)}
                            aria-describedby="calciumnumbrtnotes"
                          />
                          <input
                            className="w-1/2 !rounded text-[#151517] bg-white p-2 focus:outline-orange-500 focus:outline-2 outline-none"
                            type="text"
                            name="calciumUnit"
                            placeholder="غرام"
                            value={
                              ingredient[indexIngredient].calcium.unit as string
                            }
                            onChange={(e) =>
                              setIngredient((prev) => {
                                const a = [...prev];
                                a[indexIngredient].calcium.unit =
                                  e.target.value;
                                return a;
                              })
                            }
                            onFocus={() => setCalciumDUnitFocus(true)}
                            onBlur={() => setCalciumDUnitFocus(false)}
                            aria-describedby="calciumUnitnotes"
                          />
                        </div>
                      </div>

                      <div className=" flex relative  flex-col space-y-2 items-start  w-full">
                        <label
                          htmlFor="iron"
                          className="flex space-x-3 justify-center items-center  text-lg"
                        >
                          كمية الحديد
                        </label>
                        <div className="flex gap-4 w-full">
                          <input
                            className="w-1/2 !rounded text-[#151517] bg-white p-2 focus:outline-orange-500 focus:outline-2 outline-none"
                            type="number"
                            min={0}
                            name="iron"
                            value={
                              ingredient[indexIngredient].iron.number as number
                            }
                            onChange={(e) =>
                              setIngredient((prev) => {
                                const a = [...prev];
                                a[indexIngredient].iron.number = parseInt(
                                  e.target.value
                                );
                                return a;
                              })
                            }
                            onFocus={() => setIronNumberFocus(true)}
                            onBlur={() => setIronNumberFocus(false)}
                            aria-describedby="ironumbrtnotes"
                          />
                          <input
                            className="w-1/2 !rounded text-[#151517] bg-white p-2 focus:outline-orange-500 focus:outline-2 outline-none"
                            type="text"
                            name="ironUnit"
                            placeholder="غرام"
                            value={
                              ingredient[indexIngredient].iron.unit as string
                            }
                            onChange={(e) =>
                              setIngredient((prev) => {
                                const a = [...prev];
                                a[indexIngredient].iron.unit = e.target.value;
                                return a;
                              })
                            }
                            onFocus={() => setIronDUnitFocus(true)}
                            onBlur={() => setIronDUnitFocus(false)}
                            aria-describedby="ironUnitnotes"
                          />
                        </div>
                      </div>

                      <div className=" flex relative  flex-col space-y-2 items-start  w-full">
                        <label
                          htmlFor="potassium"
                          className="flex space-x-3 justify-center items-center  text-lg"
                        >
                          كمية البوتاسيوم
                        </label>
                        <div className="flex gap-4 w-full">
                          <input
                            className="w-1/2 !rounded text-[#151517] bg-white p-2 focus:outline-orange-500 focus:outline-2 outline-none"
                            type="number"
                            min={0}
                            name="potassiumNumber"
                            value={
                              ingredient[indexIngredient].potassium
                                .number as number
                            }
                            onChange={(e) =>
                              setIngredient((prev) => {
                                const a = [...prev];
                                a[indexIngredient].potassium.number = parseInt(
                                  e.target.value
                                );
                                return a;
                              })
                            }
                            onFocus={() => setPotassiumNumberFocus(true)}
                            onBlur={() => setPotassiumNumberFocus(false)}
                            aria-describedby="potassiumnumbrtnotes"
                          />
                          <input
                            className="w-1/2 !rounded text-[#151517] bg-white p-2 focus:outline-orange-500 focus:outline-2 outline-none"
                            type="text"
                            name="potassiumUnit"
                            placeholder="غرام"
                            value={
                              ingredient[indexIngredient].potassium
                                .unit as string
                            }
                            onChange={(e) =>
                              setIngredient((prev) => {
                                const a = [...prev];
                                a[indexIngredient].potassium.unit =
                                  e.target.value;
                                return a;
                              })
                            }
                            onFocus={() => setpotassiumUnitFocus(true)}
                            onBlur={() => setpotassiumUnitFocus(false)}
                            aria-describedby="potassiumUnitnotes"
                          />
                        </div>
                      </div>

                      <div className=" flex relative  flex-col space-y-2 items-start  w-full">
                        <label
                          htmlFor="caffeine"
                          className="flex space-x-3 justify-center items-center  text-lg"
                        >
                          كمية الكافئيين
                        </label>
                        <div className="flex gap-4 w-full">
                          <input
                            className="w-1/2 !rounded text-[#151517] bg-white p-2 focus:outline-orange-500 focus:outline-2 outline-none"
                            type="number"
                            min={0}
                            name="caffeineNumber"
                            value={
                              ingredient[indexIngredient].caffeine
                                .number as number
                            }
                            onChange={(e) =>
                              setIngredient((prev) => {
                                const a = [...prev];
                                a[indexIngredient].caffeine.number = parseInt(
                                  e.target.value
                                );
                                return a;
                              })
                            }
                            onFocus={() => setCaffeineNumberFocus(true)}
                            onBlur={() => setCaffeineNumberFocus(false)}
                            aria-describedby="caffeinenumbrtnotes"
                          />
                          <input
                            className="w-full lg:w-1/2 !rounded text-[#151517] bg-white p-2 focus:outline-orange-500 focus:outline-2 outline-none"
                            type="text"
                            name="caffeineUnit"
                            placeholder="غرام"
                            value={
                              ingredient[indexIngredient].caffeine
                                .unit as string
                            }
                            onChange={(e) =>
                              setIngredient((prev) => {
                                const a = [...prev];
                                a[indexIngredient].caffeine.unit =
                                  e.target.value;
                                return a;
                              })
                            }
                            onFocus={() => setCaffeineUnitFocus(true)}
                            onBlur={() => setCaffeineUnitFocus(false)}
                            aria-describedby="caffeineUnitnotes"
                          />
                        </div>
                      </div>
                    </>
                  )}
                  <div
                    aria-label="button"
                    className="w-full h-4 text-center cursor-pointer text-[#dbdadab5]"
                    onClick={() => {
                      setOpenSteps(!openSteps);
                    }}
                  >
                    {openSteps ? 'رؤية محتوى أقل' : 'رؤية محتوى أكثر'}
                  </div>
                </div>

                <div
                  className={`text-center w-full lg:w-1/2 m-auto rounded p-2 focus:outline-orange-500 focus:outline-2 outline-none  
                 bg-orange-400 cursor-pointer`}
                  onClick={() => {
                    setIndexIngredient((prev) => prev + 1);
                    addIngredient();

                    titleRef?.current?.focus();
                  }}
                  aria-label="button"
                  onFocus={() => setAddFocus(true)}
                  onBlur={() => setAddFocus(false)}
                  tabIndex={0}
                  aria-describedby="addnote"
                >
                  إضافة مكون اخر
                </div>
                <div
                  className={`text-center
                     w-full lg:w-1/2 m-auto rounded p-2 cursor-pointer bg-orange-400 focus:outline-orange-500 focus:outline-2 outline-none`}
                  onClick={() => {
                    if (indexIngredient !== 0) {
                      setIndexIngredient((prev) => prev - 1);
                      removeIngredient(indexIngredient);

                      titleRef?.current?.focus();
                    } else if (ingredient.length > 1) {
                      removeIngredient(indexIngredient);

                      titleRef?.current?.focus();
                    } else if (ingredient.length === 1) {
                      setIndexIngredient(0);
                      setIngredient([
                        {
                          name: '',
                          additional: '',
                          amount: {
                            number: 0,
                            unit: '',
                          },
                          calory: 0,
                          totalFat: {
                            number: 0,
                            unit: '',
                          },
                          cholesterol: {
                            number: 0,
                            unit: '',
                          },
                          sodium: {
                            number: 0,
                            unit: '',
                          },
                          totalCarbohydrates: {
                            number: 0,
                            unit: '',
                          },
                          protein: {
                            number: 0,
                            unit: '',
                          },
                          vitaminD: {
                            number: 0,
                            unit: '',
                          },
                          calcium: {
                            number: 0,
                            unit: '',
                          },
                          iron: {
                            number: 0,
                            unit: '',
                          },
                          potassium: {
                            number: 0,
                            unit: '',
                          },
                          caffeine: {
                            number: 0,
                            unit: '',
                          },
                        },
                      ] as Ingredients[]);
                      setPhotoUploadedName(['']);
                      setFilesForm([undefined]);
                    }
                  }}
                  aria-label="button"
                  onFocus={() => setRemoveFocus(true)}
                  onBlur={() => setRemoveFocus(false)}
                  tabIndex={0}
                  aria-describedby="removenote"
                >
                  حذف هذا المكون
                </div>

                <div
                  aria-disabled={del}
                  style={
                    submit
                      ? { display: 'none' }
                      : { display: 'flex', justifyContent: 'center' }
                  }
                  className={`w-full lg:w-1/2 m-auto rounded p-2 focus:outline-orange-500 text-center focus:outline-2 outline-none  
                               ${
                                 del === true
                                   ? 'bg-stone-400 cursor-not-allowed'
                                   : 'bg-orange-400 cursor-pointer'
                               }
                               '
                         `}
                  onClick={async () => {
                    setDel(true);
                    const res = await deleteAllIngredient(
                      slugSent,
                      params.typeId as string
                    );
                    if (res?.status === 500) setError(res.message);
                    else {
                      setDel(false);
                      alert('تم حذف المكونات');
                    }
                  }}
                  aria-label="button"
                  onFocus={() => setRemoveFocusAll(true)}
                  onBlur={() => setRemoveFocusAll(false)}
                  tabIndex={0}
                  aria-describedby="removenote"
                >
                  حذف كل المكونات
                </div>
                <hr className={` w-full bg-white`} />
                <div
                  style={del ? { display: 'none' } : { display: 'flex' }}
                  className="w-full flex justify-center items-center"
                >
                  <SubmitButton setSubmit={setSubmit}></SubmitButton>
                </div>
              </form>
            </div>
          </>
        </main>
      ) : (
        <Loading></Loading>
      )}
    </>
  );
}
