/// <reference types="vite/client" />

export type Pixel = {
  color: string | null;
};

export type Grid = Pixel[][];

export const gridSizes = [16, 32, 64] as const;
export type GridSize = (typeof gridSizes)[number];
