import { ReactNode } from 'react';

type TagProps = React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;

export interface LinkProps extends TagProps {
  className?: string;
  children: ReactNode;
}
