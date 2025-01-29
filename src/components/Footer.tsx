'use client';
import React from 'react';

export default function Footer() {
  return (
    <div className="h-[100px] bg-[#151517] flex flex-col gap-2 justify-center items-center">
      <p>هذا الموقع تدريبي</p>
      <hr />
      <p>
        صنع من قبل{' '}
        <a
          href={'/SallyIsmail.pdf'}
          download="sallyIsmailResume.pdf"
          target="_blank"
        >
          <button className="hover:text-[#907d38]">
            المهندسة سالي اسماعيل😊{' '}
          </button>
        </a>
      </p>
    </div>
  );
}
