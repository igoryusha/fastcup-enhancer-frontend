import { ReactNode } from 'react';

export const enum SectionItemType {}

export interface SectionProps {
  className?: string;
  title: ReactNode;
  children: ReactNode;
}

export interface SectionGroupProps {
  className?: string;
  children: ReactNode;
}

interface BaseSectionItemProps {
  className?: string;
  title?: ReactNode;
  description?: ReactNode;
}

interface TextSectionItemProps extends BaseSectionItemProps {
  as: 'text';
}

interface LinkSectionItemProps extends BaseSectionItemProps {
  as: 'link';
  href: string;
}

interface ControlSectionItemProps extends BaseSectionItemProps {
  as: 'control';
  control: ReactNode;
}

export type SectionItemProps =
  | TextSectionItemProps
  | LinkSectionItemProps
  | ControlSectionItemProps;
