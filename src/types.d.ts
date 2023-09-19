type Pixel = {
  color: string | null;
};

type Grid = Pixel[][];

type GridSize = 16 | 32 | 64;

export type { Pixel, Grid, GridSize };
