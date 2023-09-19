import type { GridSize, Grid } from "src/types";

export const initPixels = (gridSize: GridSize): Grid => {
  const pixels: Grid = [];
  for (let i = 0; i < gridSize; i++) {
    pixels[i] = [];
    for (let j = 0; j < gridSize; j++) {
      pixels[i][j] = { color: null };
    }
  }
  return pixels;
};

export const fillGrid = (grid: Grid, color: string): Grid =>
  grid.map((row) =>
    row.map((pixel) => ({ ...pixel, color: pixel.color ?? color }))
  );

export const getScreenSize = () => ({
  width: window.innerWidth,
  height: window.innerHeight,
});
const hexToRgba = (hex: string) => {
  const bigint = parseInt(hex.slice(1), 16);
  if (isNaN(bigint)) return [0, 0, 0, 255];
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return [r, g, b, 255];
};

export const downloadImage = (grid: Grid) => {
  const size = grid.length;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const imageData = ctx.createImageData(size, size);
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const color = grid[i][j].color;
      const rgba = color ? hexToRgba(color) : [0, 0, 0, 0];
      imageData.data.set(rgba, (i * size + j) * 4);
    }
  }
  ctx.putImageData(imageData, 0, 0);
  const link = document.createElement("a");
  link.href = canvas.toDataURL("image/png");
  link.download = "8bitart.png";
  link.click();
};
