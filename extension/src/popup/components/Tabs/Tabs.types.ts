export interface Tab {
  id: string;
  option: string;
}

export interface TabsProps<T extends Tab[]> {
  className?: string;
  defaultTab?: ArrayElement<T>;
  tabs: T;
  onChange: (tab: ArrayElement<T>) => void;
}
