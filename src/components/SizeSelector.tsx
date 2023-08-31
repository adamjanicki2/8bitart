import type { GridSize } from "src/types";

type Props = {
  gridSize: GridSize;
  setGridSize: (gridSize: GridSize) => void;
};

const GRID_SIZE_OPTIONS: readonly GridSize[] = [16, 32, 64];

const SizeSelector = ({ gridSize, setGridSize }: Props) => {
  return (
    <select
      className="mv1 pa1 br2 fw5"
      value={gridSize}
      onChange={(e) => setGridSize(parseInt(e.target.value) as GridSize)}
    >
      {GRID_SIZE_OPTIONS.map((size) => (
        <option key={size} value={size}>
          {size} x {size}
        </option>
      ))}
    </select>
  );
};

export default SizeSelector;
