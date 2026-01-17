import { Box, Popover, ui, UnstyledButton } from "@adamjanicki/ui";
import { download, edit, trash, xCircle } from "@adamjanicki/ui/icons";
import { IconType } from "@adamjanicki/ui/types/icon";
import { useEffect, useState } from "react";
import ColorPicker from "src/components/ColorPicker";
import Grid from "src/components/Grid";
import IconButton from "src/components/IconButton";
import SizeSelector from "src/components/SizeSelector";
import type { GridSize, Pixel } from "src/types";
import {
  downloadImageAsPng,
  downloadImageAsSvg,
  fillGrid,
  getScreenSize,
  initPixels,
} from "src/util";

const DEFAULT_COLOR = "#000000";
const DEFAULT_GRID_SIZE = 16;

const fillIcon = "M0 0H16V16H0Z" as IconType;

const Controller = () => {
  const [mode, setMode] = useState<"draw" | "fill" | "erase">("draw");
  const [draw, setDraw] = useState(false);
  const [color, setColor] = useState(DEFAULT_COLOR);
  const [gridSize, setGridSize] = useState<GridSize>(DEFAULT_GRID_SIZE);
  const [grid, setGrid] = useState<Pixel[][]>(() => initPixels(gridSize));
  const [screenSize, setScreenSize] = useState(getScreenSize);
  const [open, setOpen] = useState(false);

  useEffect(() => {
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
    <Box vfx={{ axis: "y", align: "center", padding: "s" }}>
      <ui.h1 vfx={{ marginY: "xs" }}>8-Bit Art</ui.h1>
      <Box vfx={{ axis: "x", wrap: true, justify: "center", gap: "l" }}>
        <Box vfx={{ axis: "y", align: "center", gap: "s" }}>
          <Box vfx={{ axis: "x", align: "center" }}>
            <SizeSelector
              gridSize={gridSize}
              setGridSize={(gridSize) => {
                setGridSize(gridSize);
                setGrid(initPixels(gridSize));
              }}
            />
          </Box>
          <ColorPicker
            color={color}
            onColorChange={(color) => {
              setColor(color);
              if (mode === "erase") setMode("draw");
            }}
          />
          <Box vfx={{ axis: "x", align: "center", gap: "xs" }}>
            <IconButton
              icon={edit}
              onClick={() => setMode("draw")}
              label="Draw"
              selected={mode === "draw"}
            />
            <IconButton
              icon={xCircle}
              onClick={() => setMode("erase")}
              label="Erase"
              selected={mode === "erase"}
            />
            <IconButton
              icon={fillIcon}
              onClick={() => setMode("fill")}
              label="Fill"
              selected={mode === "fill"}
            />
            <IconButton
              icon={trash}
              onClick={() => setGrid(initPixels(gridSize))}
              label="Clear"
            />
            <Popover
              offset={2}
              vfx={{ axis: "y", padding: "xs" }}
              open={open}
              onClose={() => setOpen(false)}
              anchor={
                <IconButton
                  icon={download}
                  label="Download"
                  selected={false}
                  onClick={() => setOpen((open) => !open)}
                />
              }
            >
              <UnstyledButton
                vfx={{ padding: "s", radius: "rounded", hover: "shade" }}
                onClick={() => downloadImageAsPng(grid)}
              >
                Download as .png
              </UnstyledButton>
              <UnstyledButton
                vfx={{ padding: "s", radius: "rounded", hover: "shade" }}
                onClick={() => downloadImageAsSvg(grid)}
              >
                Download as .svg
              </UnstyledButton>
            </Popover>
          </Box>
        </Box>
        <Grid
          grid={grid}
          pixelSize={Math.floor(
            (Math.min(screenSize.width, screenSize.height) * 0.8) / gridSize
          )}
          onColorChange={(row, col, force) =>
            setGrid((grid) => {
              if (mode !== "fill" && (draw || force)) {
                grid[row][col].color = mode === "draw" ? color : null;
              }
              return grid;
            })
          }
          onBucketFill={() => {
            if (mode === "fill") {
              setGrid((grid) => fillGrid(grid, color));
              setMode("draw");
            }
          }}
        />
      </Box>
    </Box>
  );
};

export default Controller;
