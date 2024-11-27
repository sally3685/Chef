'use client';
import itemsArray from '../items';
import { useParams } from 'next/navigation';

export default function Information() {
  const params = useParams();
  const { recipyId } = params;
  let rec;

  if (recipyId) {
    rec = recipyId[0]; // Assuming recipyId is an array
  } else {
    return null; // Return null if no recipyId is found
  }

  const recipy = itemsArray[parseInt(rec) - 1];

  // Check if recipy exists to avoid accessing properties of undefined
  if (!recipy) {
    return <div>Recipe not found</div>;
  }

  return (
    <div className="gap-4 flex-col p-6 h-full flex justify-center items-center">
      <h2 className="text-xl sm:text-2xl text-center dark:text-[#f3d34a] text-white font-bold">
        معلومات مهمة
      </h2>
      <div className="space-y-4 w-[90%] p-2">
        <div className="flex justify-between">
          <div className="flex justify-center gap-2">
            <img
              src="https://kitchen.sayidaty.net/assets/frontend/img/icons/group-users.png"
              alt=""
            />
            <h3>وقت التحضير </h3>
          </div>
          <h3>
            {recipy.timeForCooking.time} {recipy.timeForCooking.type}
          </h3>
        </div>
        <div className="flex justify-between">
          <div className="flex justify-center gap-2">
            <img
              src="https://kitchen.sayidaty.net/assets/frontend/img/icons/group-users.png"
              alt=""
            />
            <h3>يكفي ل</h3>
          </div>
          <h3>{recipy.service} أشخاص </h3>
        </div>
        <div className="flex justify-between">
          <div className="flex justify-center gap-2">
            <img
              src="https://kitchen.sayidaty.net/assets/frontend/img/icons/group-users.png"
              alt=""
            />
            <h3> نوع الطبق </h3>
          </div>
          <h3>{recipy.type}</h3>
        </div>
      </div>
    </div>
  );
}
