import { useLayoutEffect, useEffect } from 'react';
export const useAnimation =
  typeof document !== 'undefined' ? useLayoutEffect : useEffect;
