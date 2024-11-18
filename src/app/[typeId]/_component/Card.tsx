import React, { CSSProperties, ReactNode } from 'react';
import styles from '../../../_styles/card.module.css';

type CardProps = {
  children: ReactNode;
  style?: CSSProperties;
};
export default function Card({ children, style }: CardProps) {
  return (
    <div className={styles.card} style={style}>
      {children}
    </div>
  );
}
