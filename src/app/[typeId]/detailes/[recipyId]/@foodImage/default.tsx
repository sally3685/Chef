'use client';
import React from 'react';
import Image from 'next/image';
import itemsArray from '@/app/[typeId]/detailes/[recipyId]/items';
import { useParams } from 'next/navigation';

const Foodimage = () => {
  const params = useParams();
  console.log('ddddddddddddddddd');
  console.log(params);
  const { recipyId } = params;
  let rec;
  if (recipyId) {
    rec = recipyId[0];
    // else rec=recipyId;
  } else return null;
  // const { recipyId } = await params;{ params }: { params: Props }
  return (
    <Image
      src={itemsArray[parseInt(rec) - 1].src}
      alt={itemsArray[parseInt(rec) - 1].title}
      className="w-full h-full "
    ></Image>
  );
};

export default Foodimage;
