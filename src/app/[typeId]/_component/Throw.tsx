'use client';

function generate(count: number) {
  return Math.floor(Math.random() * count);
}
export default function Throw() {
  const y = generate(2);

  if (y === 1) {
    throw new Error('حدث خطأ في تحميل المحتوى');
  }
  return <></>;
}
