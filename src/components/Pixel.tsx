import { Box } from "@adamjanicki/ui";
import type { Pixel as PixelType } from "src/types";

type Props = {
  pixel: PixelType;
  size: number | string;
  onColorChange: (force?: boolean) => void;
  row: number;
  col: number;
};

const EMPTY_COLOR_MAP: Record<number, string> = {
  0: "#F4F4F4",
  1: "#ccc",
};

export default function Pixel({ pixel, row, col, onColorChange, size }: Props) {
  return (
    <Box
      onMouseEnter={() => onColorChange()}
      onMouseDown={() => onColorChange(true)}
      style={{
        width: size,
        height: size,
        backgroundColor: pixel.color
          ? `#${pixel.color}`
          : EMPTY_COLOR_MAP[(row + col) & 1],
      }}
    />
  );
}
