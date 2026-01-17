import { Box } from "@adamjanicki/ui";
import type { Pixel as PixelType } from "src/types";

type Props = {
  pixel: PixelType;
  size: number | string;
  onColorChange: (force?: boolean) => void;
  row: number;
  col: number;
};

const EMPTY_COLOR_MAP = {
  0: "#F4F4F4",
  1: "#ccc",
} as const;

const Pixel = ({ pixel, onColorChange, size, row, col }: Props) => (
  <Box
    onMouseEnter={() => onColorChange()}
    onMouseDown={() => onColorChange(true)}
    style={{
      width: size,
      height: size,
      backgroundColor:
        pixel.color || EMPTY_COLOR_MAP[(row + col) % 2 === 0 ? 0 : 1],
    }}
  />
);
export default Pixel;
