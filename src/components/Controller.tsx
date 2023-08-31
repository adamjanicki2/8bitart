import { useState, useEffect } from "react";
import ColorPicker from "src/components/ColorPicker";
import Grid from "src/components/Grid";
import SizeSelector from "src/components/SizeSelector";
import type { GridSize, Pixel } from "src/types";
import { getScreenSize, initPixels } from "src/util";

const DEFAULT_COLOR = "black";
const DEFAULT_GRID_SIZE = 16;

const Controller = () => {
  const [draw, setDraw] = useState(false);
  const [color, setColor] = useState(DEFAULT_COLOR);
  const [gridSize, setGridSize] = useState<GridSize>(DEFAULT_GRID_SIZE);
  const [grid, setGrid] = useState<Pixel[][]>(() => initPixels(gridSize));
  const [screenSize, setScreenSize] = useState(getScreenSize);

  useEffect(() => {
    setDraw(false);
    const handleMouseDown = () => setDraw(true);
    const handleMouseUp = () => setDraw(false);
    const handleResize = () => setScreenSize(getScreenSize());
    window.addEventListener("touchstart", handleMouseDown);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("touchend", handleMouseUp);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("touchstart", handleMouseDown);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("touchend", handleMouseUp);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex flex-column items-center pa2">
      <h1 className="f2 mv1">8-Bit Art</h1>
      <SizeSelector
        gridSize={gridSize}
        setGridSize={(gridSize) => {
          setGridSize(gridSize);
          setGrid(initPixels(gridSize));
        }}
      />
      <ColorPicker color={color} onColorChange={setColor} />
      <Grid
        grid={grid}
        pixelSize={Math.floor(
          (Math.min(screenSize.width, screenSize.height) * 0.8) / gridSize
        )}
        onColorChange={(row, col, force) => {
          if (draw || force) {
            grid[row][col].color = color;
            setGrid([...grid]);
          }
        }}
      />
    </div>
  );
};

export default Controller;
