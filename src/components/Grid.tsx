import type { Grid as GridType } from "src/types";
import Pixel from "src/components/Pixel";

type Props = {
  grid: GridType;
  pixelSize: number | string;
  onColorChange: (row: number, col: number, force?: boolean) => void;
};

const Grid = ({ grid, onColorChange, pixelSize }: Props) => {
  return (
    <div className="flex flex-column grid-border">
      {grid.map((row, i) => (
        <div className="flex" key={i}>
          {row.map((pixel, j) => (
            <Pixel
              key={j}
              pixel={pixel}
              onColorChange={(force?: boolean) => onColorChange(i, j, force)}
              size={pixelSize}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Grid;
