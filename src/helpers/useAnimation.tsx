import { useLayoutEffect, useEffect } from 'react';
export const useAnimation =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;
