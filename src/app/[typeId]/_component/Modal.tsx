import React from 'react';
export default function Modal({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full top-0 left-0 fixed flex justify-center items-center bg-zinc-950 bg-opacity-70 z-[100]">
      {children}
    </div>
  );
}
