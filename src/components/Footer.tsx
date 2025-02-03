'use client';
import React from 'react';

export default function Footer() {
  return (
    <footer className="min-h-[100px] bg-[#d3b577] dark:bg-[#151517] flex justify-evenly items-center md:flex-row flex-col gap-2">
      <section className="h-full flex gap-2 justify-center items-center flex-col ">
        <p>هذا الموقع تدريبي</p>
        <hr />
        <p>
          صنع من قبل{' '}
          <a
            href={'/SallyIsmail.pdf'}
            download="sallyIsmailResume.pdf"
            target="https://uploadthing.com/dashboard/sally3685-personal-team/qb1kwi9db3/files"
          >
            <button className="hover:text-[#907d38] ">
              المهندسة سالي اسماعيل😊{' '}
            </button>
          </a>
        </p>
      </section>
      <div className="md:h-[90px] md:w-[2px] h-[2px] w-[90px] bg-[#ffffff36]"></div>
      <section className="h-full flex gap-2 justify-center items-center flex-col ">
        <h2>الأدوات المستخدمة ⭐</h2>
        <ul className="flex flex-wrap gap-2">
          <li>uploadthing</li>
          <li>clerk</li>
          <li>Nextjs15</li>
          <li>Mongodb</li>
          <li>Prisma</li>
          <li>Gsap</li>
        </ul>
      </section>
    </footer>
  );
}
