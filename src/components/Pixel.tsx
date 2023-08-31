import type { Pixel as PixelType } from "src/types";

type Props = {
  pixel: PixelType;
  size: number | string;
  onColorChange: (force?: boolean) => void;
};

const Pixel = ({ pixel, onColorChange, size }: Props) => (
  <div
    onMouseEnter={() => onColorChange()}
    onTouchMove={() => onColorChange()}
    onClick={() => onColorChange(true)}
    style={{
      width: size,
      height: size,
      backgroundColor: pixel.color,
    }}
  />
);
export default Pixel;
