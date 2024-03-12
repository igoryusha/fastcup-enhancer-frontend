import { ReactNode } from 'react';

export interface TextProps {
  children: ReactNode;
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'p';
  className?: string;
  weight?: 'normal' | 'bold';
  color?: 'primary' | 'secondary';
  size?: 'm' | 'l';
}
