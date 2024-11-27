'use client';
import { Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import React from 'react';

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted)
    return (
      <Image
        src="/logo.svg"
        width={36}
        height={360}
        sizes="36x36"
        alt="Loading Light/Dark Toggle"
        priority={false}
        title="Loading Light/Dark Toggle"
      />
    );
  if (resolvedTheme === 'dark') {
    return <Sun onClick={() => setTheme('light')} />;
  }
  if (resolvedTheme === 'light') {
    return <Moon onClick={() => setTheme('dark')} />;
  }
};

export default ThemeSwitch;
