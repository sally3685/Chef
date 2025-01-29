'use client';
import React, {
  Dispatch,
  ChangeEvent,
  useCallback,
  useRef,
  useState,
  SetStateAction,
} from 'react';
import { HexColorPicker } from 'react-colorful';

import useClickOutside from './useClickOutside';
import styles from '@/app/assets/css/colors.module.css';
export const PopoverPicker = ({
  color,
  onChange,
}: {
  color: string;
  onChange: Dispatch<SetStateAction<string>>;
}) => {
  const popover = useRef(null);
  const [isOpen, toggle] = useState(false);

  const close = useCallback(() => toggle(false), []);
  useClickOutside(popover, close);

  return (
    <div className={styles.picker}>
      <div
        className={styles.swatch}
        style={{ backgroundColor: color }}
        onClick={() => toggle(true)}
      />

      {isOpen && (
        <div className={styles.popover} ref={popover}>
          <HexColorPicker color={color} onChange={onChange} />
        </div>
      )}
    </div>
  );
};
