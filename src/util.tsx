import type { GridSize, Pixel } from "src/types";

const EMPTY_COLOR_MAP = {
  0: "#F4F4F4",
  1: "#ccc",
} as const;

export const initPixels = (gridSize: GridSize) => {
  const pixels: Pixel[][] = [];
  for (let i = 0; i < gridSize; i++) {
    pixels[i] = [];
    for (let j = 0; j < gridSize; j++) {
      const sameParity = (i + j) % 2 === 0;
      pixels[i][j] = { color: EMPTY_COLOR_MAP[sameParity ? 1 : 0] };
    }
  }
  return pixels;
};

export const getScreenSize = () => ({
  width: window.innerWidth,
  height: window.innerHeight,
});
