import { LucideIcon } from 'lucide-react';

export type NavigationType = {
  name: string;
  description: string;
  icon: LucideIcon;
};

export type Offer = {
  name: string;
  description: string;
  image: string;
  price?: string;
  type: string;
  featured?: boolean;
  highlight?: 'rose';
  tag?: string;
};

export type SectionContentBase = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type SectionContentWithTypes = SectionContentBase & {
  types: NavigationType[];
  offers: Offer[];
};

export type SectionContentWithItems = SectionContentBase & {
  items: Array<{
    name: string;
    description: string;
    image?: string;
  }>;
};

export type SectionContent = SectionContentWithTypes | SectionContentWithItems;

export type NavigationSection = keyof typeof import('../data/navigationData').sectionContent;

export interface NavigationMenuProps {
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
  mobileBreakpoint?: number;
}
