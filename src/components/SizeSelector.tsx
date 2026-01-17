import { Select } from "@adamjanicki/ui";
import { type GridSize, gridSizes } from "src/types";

type Props = {
  gridSize: GridSize;
  setGridSize: (gridSize: GridSize) => void;
};

export default function SizeSelector({ gridSize, setGridSize }: Props) {
  return (
    <Select
      options={gridSizes.map(String)}
      getOptionLabel={(size) => `${size} x ${size}`}
      value={gridSize}
      onChange={(e) => setGridSize(parseInt(e.target.value) as GridSize)}
    />
  );
}
