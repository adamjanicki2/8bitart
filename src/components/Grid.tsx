import { Box } from "@adamjanicki/ui";
import Pixel from "src/components/Pixel";
import type { Grid as GridType } from "src/types";

type Props = {
  grid: GridType;
  pixelSize: number | string;
  onColorChange: (row: number, col: number, force?: boolean) => void;
};

export default function Grid({ grid, onColorChange, pixelSize }: Props) {
  return (
    <Box vfx={{ axis: "y", border: true, borderColor: "primary" }}>
      {grid.map((row, i) => (
        <Box vfx={{ axis: "x" }} key={i}>
          {row.map((pixel, j) => (
            <Pixel
              key={j}
              row={i}
              col={j}
              pixel={pixel}
              onColorChange={(force?: boolean) => onColorChange(i, j, force)}
              size={pixelSize}
            />
          ))}
        </Box>
      ))}
    </Box>
  );
}
