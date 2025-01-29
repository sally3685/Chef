'use client';
import React, { useEffect } from 'react';
import { PopoverPicker } from '../_component/PopoverPicker';
import { postRecipy } from '@/data-access/recipies';
import { useUser } from '@clerk/nextjs';
import Loading from '@/app/[typeId]/loading';
import { SubmitButton } from '../_component/Button';
import { useParams } from 'next/navigation';
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
export default function AddRecipy() {
  const params = useParams();
  const { isLoaded, user } = useUser();
  const [submit, setSubmit] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [type, setType] = React.useState('');
  const [color, setColor] = React.useState('#aabbcc');
  const [service, setService] = React.useState<number>(1);
  const [timeForCookingNumber, setTimeForCookingNumber] =
    React.useState<number>(5);
  const [timeUnit, setTimeUnit] = React.useState('minute');
  const [decore, setDecore] = React.useState('mint1');
  const [additional, setAdditional] = React.useState('');
  const titleRef = React.useRef<HTMLInputElement>(null);
  const [titleFocus, setTitleFocus] = React.useState(true);
  const [additionalFocus, setAdditionalFocus] = React.useState(false);
  const [stepFocus, setStepFocus] = React.useState(false);
  const [serviceFocus, setServiceFocus] = React.useState(false);
  const [photoFocus, setPhotoFocus] = React.useState(false);
  const [timeForCookingNumberFocus, setTimeForCookingNumberFocus] =
    React.useState(false);
  const [timeForCookingUnitFocus, setTimeForCookingUnitFocus] =
    React.useState(false);
  const [decoreFocus, setdecoreFocus] = React.useState(false);
  const [typeFocus, setTypeFocus] = React.useState(false);
  const classification = params.typeId as string;
  const [steps, setSteps] = React.useState(['']);
  const [openSteps, setOpenSteps] = React.useState(true);
  const [user1, setUser1] = React.useState('');
  const [explain] = React.useState(explaination);

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
    if (isLoaded) setUser1(user?.id!);
  }, [isLoaded]);

  return (
    <>
      {/* flex gap-10 justify-center items-center mx-auto p-4  max-w-7xl section-min-height  lg:flex-row-reverse flex-col */}
      {isLoaded ? (
        <main
          className="w-full flex gap-10 justify-center 
          items-center
       mx-auto p-2  max-w-7xl section-min-height  lg:flex-row-reverse flex-col"
        >
          <>
            <>
              {/* top: 5rem;
    background: #151517;
    width: 100%;
    z-index: 1; */}
              <div className="text-sm lg:text-lg flex lg:flex-col top-[87px] z-[1] bg-[#151517] lg:bg-none w-[100%] justify-evenly items-center self-start sticky lg:top-[10rem] left-0 lg:w-[30%]  h-[30%] shadow-[0_0_11px_4px_#f3d34a] border-[#f3d34a] rounded p-4">
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
                    : explain[9]}
                </p>
              </div>

              <div className="lg:w-1/2 w-[90%] mt-4 mb-4">
                <h1 className="enterAnimation relative text-3xl font-medium mb-4 text-center">
                  إضافة وصفة
                </h1>
                {submit && (
                  <p
                    aria-label="h1"
                    className="text-xl my-1 font-bold w-full text-center  text-[#f3a738]"
                  >
                    يتم معالجة الطلب الرجاء الانتظار ...
                  </p>
                )}
                <form
                  className="flex flex-col justify-center items-center space-y-8 w-full  "
                  // action={postRecipy}
                  action={async (formData: FormData) => {
                    const res = await postRecipy(formData);
                    if (res.status === 500) throw new Error(res.message);
                    else {
                      alert('تم اضافة الوصفة');
                    }
                    // router.push(`/${formData.get('classification') as string}`);
                  }}
                >
                  <div className="enterAnimation  flex relative  flex-col space-y-2 items-start  w-full">
                    <label
                      htmlFor="title"
                      className="flex space-x-3 justify-center items-center text-lg"
                    >
                      اسم الوصفة
                    </label>

                    <input
                      ref={titleRef}
                      className="w-full !rounded text-[#151517] bg-white p-2 focus:outline-orange-500 focus:outline-2 outline-none"
                      id="title"
                      type="title"
                      placeholder="متبل الشمندر على الطريقة السورية"
                      name="title"
                      value={title}
                      required
                      aria-describedby="titlenotes"
                      onChange={(e) => setTitle(e.target.value)}
                      onFocus={() => setTitleFocus(true)}
                      onBlur={() => setTitleFocus(false)}
                    />
                  </div>
                  <input
                    name="classification"
                    value={classification}
                    hidden
                    onChange={() => {
                      return classification;
                    }}
                  />

                  <div className="enterAnimation flex relative  flex-col space-y-2 items-start  w-full">
                    <label
                      htmlFor="additional"
                      className="flex space-x-3 justify-center items-center text-lg"
                    >
                      معلومات اضافية
                    </label>
                    <input
                      className="w-full !rounded text-[#151517] bg-white p-2 focus:outline-orange-500 focus:outline-2 outline-none"
                      id="additional"
                      placeholder="يقدم بارد"
                      type="text"
                      name="additional"
                      value={additional}
                      aria-describedby="additionalnotes"
                      onChange={(e) => setAdditional(e.target.value)}
                      onFocus={() => setAdditionalFocus(true)}
                      onBlur={() => setAdditionalFocus(false)}
                    />
                  </div>

                  <div
                    className={`shadow-[0_0_11px_4px_#f3a738] border-[#f3a738] bg-opacity-55 rounded p-4 enterAnimation flex relative flex-col space-y-2 items-start w-full`}
                  >
                    <label
                      htmlFor="steps"
                      className="flex space-x-3 justify-center items-center text-lg mb-4"
                    >
                      خطوات الوصفة
                    </label>
                    {openSteps
                      ? steps.map((step, key) => (
                          <div
                            key={key}
                            className="flex w-full gap-4 items-center justify-center space-x-3"
                          >
                            <textarea
                              className="w-[90%] !rounded text-[#151517] bg-white p-2 focus:outline-orange-500 focus:outline-2 outline-none"
                              // type="text"
                              name="steps"
                              value={step}
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
                              className="cursor-pointer bg-[#f3a738] w-[15%] text-base text-[#151517] rounded p-1 text-center h-full"
                              onClick={() => removeStep(0)}
                            >
                              إزالة خطوة
                            </div>
                          </div>
                        ))
                      : steps.length > 0 && (
                          <div
                            key={0}
                            className="flex w-full gap-4 items-center justify-center space-x-3"
                          >
                            <textarea
                              className="w-[90%] !rounded text-[#151517] bg-white p-2 focus:outline-orange-500 focus:outline-2 outline-none"
                              // type="text"
                              name="steps"
                              required
                              value={steps[0]}
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
                              className="cursor-pointer bg-[#f3a738] w-[15%] text-base text-[#151517] rounded p-1 text-center h-full"
                              onClick={() => removeStep(0)}
                            >
                              إزالة خطوة
                            </div>
                          </div>
                        )}
                    <div
                      aria-label="button"
                      className="cursor-pointer bg-[#f3a738] w-[20%] text-base text-[#151517] rounded p-1 text-center h-full"
                      onClick={addStep}
                    >
                      إضافة خطوة
                    </div>

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

                  <div className="enterAnimation flex relative  flex-col space-y-2 items-start  w-full">
                    <label
                      htmlFor="service"
                      className="flex space-x-3 justify-center items-center text-lg"
                    >
                      عدد الأشخاص
                    </label>
                    <input
                      className="w-full !rounded text-[#151517] bg-white p-2 focus:outline-orange-500 focus:outline-2 outline-none"
                      id="service"
                      type="number"
                      min="1"
                      name="service"
                      value={service}
                      onChange={(e) => setService(parseInt(e.target.value))}
                      onFocus={() => setServiceFocus(true)}
                      onBlur={() => setServiceFocus(false)}
                      aria-describedby="servicenote"
                    />
                  </div>
                  <div className="enterAnimation flex relative  flex-col space-y-2 items-start  w-full">
                    <label
                      htmlFor="timeForCooking"
                      className="flex space-x-3 justify-center items-center text-lg"
                    >
                      وقت الطبخ
                    </label>
                    <div className="flex gap-4 w-full">
                      <input
                        className="w-1/2 !rounded text-[#151517] bg-white p-2 focus:outline-orange-500 focus:outline-2 outline-none"
                        id="timeForCooking"
                        type="number"
                        min={5}
                        name="timeForCookingNumber"
                        value={timeForCookingNumber}
                        required
                        onChange={(e) =>
                          setTimeForCookingNumber(parseInt(e.target.value))
                        }
                        onFocus={() => setTimeForCookingNumberFocus(true)}
                        onBlur={() => setTimeForCookingNumberFocus(false)}
                        aria-describedby="timeforcookingnotes"
                      />

                      <select
                        id="timeForCooking"
                        name="timeForCookingUnit"
                        required
                        value={timeUnit}
                        onChange={(e) => setTimeUnit(e.target.value)}
                        onFocus={() => setTimeForCookingUnitFocus(true)}
                        onBlur={() => setTimeForCookingUnitFocus(false)}
                        aria-describedby="timeforcookingnotes"
                        className="w-1/2 !rounded text-[#151517] bg-white p-2 focus:outline-orange-500 focus:outline-2 outline-none"
                      >
                        <option value="second">ثانية</option>
                        <option value="minute">دقيقة</option>
                        <option value="hour">ساعة</option>
                      </select>
                    </div>
                  </div>
                  <div className=" flex flex-col justify-evenly gap-4 items-start p-4 rounded shadow-[0_0_11px_4px_#eea243] border-[#eea243] w-full">
                    <label
                      htmlFor="decore"
                      className="flex space-x-3 justify-center items-center text-lg mb-4"
                    >
                      الزينة
                    </label>
                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full">
                      <div className="enterAnimation flex relative  flex-col space-y-2 items-start  w-full">
                        <label
                          htmlFor="decore"
                          className="flex space-x-3 justify-center items-center text-lg"
                        >
                          صور الزينة حول الطبق
                        </label>
                        <select
                          value={decore}
                          required
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
                      <div className="enterAnimation flex relative  flex-col space-y-2 items-start  w-full">
                        <label
                          htmlFor="color"
                          className="flex space-x-3 justify-center items-center text-lg"
                        >
                          اختر لون خلفية الوصفة
                        </label>
                        <PopoverPicker color={color} onChange={setColor} />
                        <input
                          name="color"
                          value={color}
                          hidden
                          onChange={() => {
                            return color;
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="enterAnimation flex relative  flex-col space-y-2 items-start  w-full">
                    <label
                      htmlFor="type"
                      className="flex space-x-3 justify-center items-center text-lg"
                    >
                      نوع الطبق/المشروب
                    </label>
                    <input
                      className="w-full !rounded text-[#151517] bg-white p-2 focus:outline-orange-500 focus:outline-2 outline-none"
                      id="type"
                      type="text"
                      placeholder="نباتي"
                      name="type"
                      value={type}
                      required
                      onChange={(e) => setType(e.target.value)}
                      onFocus={() => setTypeFocus(true)}
                      onBlur={() => setTypeFocus(false)}
                      aria-describedby="typenote"
                    />
                  </div>
                  <div className="enterAnimation flex relative  flex-col items-start space-y-2 p-4 rounded shadow-[0_0_11px_4px_#f3d34a] border-[#f3d34a] w-full">
                    <label
                      htmlFor="Form"
                      className="flex space-x-3 justify-center items-center text-lg mb-4"
                    >
                      اضف صورة
                    </label>
                    <div className="w-full ">
                      <input
                        name="files"
                        required
                        type="file"
                        onFocus={() => setPhotoFocus(true)}
                        onBlur={() => setPhotoFocus(false)}
                        aria-describedby="photonote"
                      />
                    </div>
                  </div>
                  <SubmitButton setSubmit={setSubmit}></SubmitButton>
                </form>
              </div>
            </>
          </>
        </main>
      ) : (
        <Loading></Loading>
      )}
    </>
  );
}
