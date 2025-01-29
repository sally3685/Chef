'use client';

import { Dispatch, SetStateAction, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
interface SubmitButtonProps {
  setSubmit: Dispatch<SetStateAction<boolean>>;
}
export function SubmitButton({ setSubmit }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  useEffect(() => {
    if (pending === true) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth', // For smooth scrolling effect
      });
      setSubmit(true);
    } else setSubmit(false);
  }, [pending]);
  return (
    <button
      type="submit"
      // onClick={() => {
      //   setSubmitting(true);
      // }}
      disabled={pending}
      className={`w-1/2 m-auto rounded p-2 focus:outline-orange-500 focus:outline-2 outline-none  
                ${
                  pending == true
                    ? 'bg-stone-400 cursor-not-allowed'
                    : 'bg-orange-400 cursor-pointer'
                }
                '
          `}
    >
      ارسال
    </button>
  );
}
