"use client";

function generate(count: number) {
  console.log("hek");
  return Math.floor(Math.random() * count);
}
export default function Throw() {
  const y = generate(2);
  console.log(y);
  if (y === 1) {
    throw new Error("حدث خطأ في تحميل المحتوى");
  }
  return <></>;
}
