import { Box } from "@adamjanicki/ui";
import { BlockPicker } from "react-color";

type Props = {
  color: string;
  onColorChange: (color: string) => void;
};

const COLORS = [
  "#000000",
  "#F4F4F4",
  "#999999",
  "#E7040E",
  "#FFB701",
  "#FFD701",
  "#19A975",
  "#357EDE",
  "#A463F1",
  "#D5008E",
  "#FF725C",
  "#FBF1A9",
  "#9EEBCF",
  "#96CCFF",
  "#FFDFDF",
] as const;

export default function ColorPicker({ color, onColorChange }: Props) {
  return (
    <Box vfx={{ radius: "rounded" }}>
      <BlockPicker
        triangle="hide"
        color={color}
        onChange={({ hex }) => onColorChange(hex)}
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
    </Box>
  );
}
