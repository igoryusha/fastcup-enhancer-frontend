declare module '*.css';
declare module '*.svg';
declare module '*.json';

type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;
