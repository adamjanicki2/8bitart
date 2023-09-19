import {
  faBucket,
  faDownload,
  faEraser,
  faPen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import ColorPicker from "src/components/ColorPicker";
import Grid from "src/components/Grid";
import IconButton from "src/components/IconButton";
import SizeSelector from "src/components/SizeSelector";
import type { GridSize, Pixel } from "src/types";
import { downloadImage, fillGrid, getScreenSize, initPixels } from "src/util";

const DEFAULT_COLOR = "#000000";
const DEFAULT_GRID_SIZE = 16;

const Controller = () => {
  const [mode, setMode] = useState<"draw" | "fill" | "erase">("draw");
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
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex flex-column items-center pa2">
      <h1 className="f2 mv1">8-Bit Art</h1>
      <div className="flex flex-wrap justify-center">
        <div className="flex flex-column mh3 items-center">
          <div className="flex items-center">
            <SizeSelector
              gridSize={gridSize}
              setGridSize={(gridSize) => {
                setGridSize(gridSize);
                setGrid(initPixels(gridSize));
              }}
            />
          </div>
          <ColorPicker
            color={color}
            onColorChange={(color) => {
              setColor(color);
              mode === "erase" && setMode("draw");
            }}
          />
          <div className="flex items-center">
            <IconButton
              icon={faPen}
              onClick={() => setMode("draw")}
              label="Draw"
              selected={mode === "draw"}
            />
            <IconButton
              icon={faEraser}
              onClick={() => setMode("erase")}
              label="Erase"
              selected={mode === "erase"}
            />
            <IconButton
              icon={faBucket}
              onClick={() => setMode("fill")}
              label="Fill"
              selected={mode === "fill"}
            />
            <IconButton
              icon={faTrash}
              onClick={() => setGrid(initPixels(gridSize))}
              label="Clear"
            />
            <IconButton
              icon={faDownload}
              onClick={() => downloadImage(grid)}
              label="Download"
            />
          </div>
        </div>
        <Grid
          grid={grid}
          pixelSize={Math.floor(
            (Math.min(screenSize.width, screenSize.height) * 0.8) / gridSize
          )}
          onColorChange={(row, col, force) => {
            if (mode !== "fill" && (draw || force)) {
              grid[row][col].color = mode === "draw" ? color : null;
              setGrid([...grid]);
            }
          }}
          onBucketFill={() => {
            if (mode === "fill") {
              setGrid(fillGrid(grid, color));
              setMode("draw");
            }
          }}
        />
      </div>
    </div>
  );
};

export default Controller;
