import { BlockPicker } from "react-color";

type Props = {
  color: string;
  onColorChange: (color: string) => void;
};

const COLORS = [
  "#000000",
  "#F4F4F4",
  // gray
  "#999999",
  // red
  "#E7040E",
  // gold
  "#FFB701",
  // yellow
  "#FFD701",
  // green
  "#19A975",
  // blue
  "#357EDE",
  // purple
  "#A463F1",
  // pink
  "#D5008E",
  // light colors
  "#FF725C",
  "#FBF1A9",
  "#9EEBCF",
  "#96CCFF",
  "#FFDFDF",
] as const;

const ColorPicker = ({ color, onColorChange }: Props) => {
  return (
    <div style={{ borderRadius: "4px", border: "1px solid rgba(0,0,0,0.25)" }}>
      <BlockPicker
        triangle="hide"
        color={color}
        onChange={(c) => onColorChange(c.hex)}
        colors={[...COLORS]}
        styles={{
          default: {
            card: {
              boxShadow: "none",
            },
            head: {
              borderRadius: "3px 3px 0 0",
            },
          },
        }}
      />
    </div>
  );
};

export default ColorPicker;
