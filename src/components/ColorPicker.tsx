import { Box, IconInput, ui, UnstyledButton } from "@adamjanicki/ui";
import { useState } from "react";

type Props = {
  color: string;
  onColorChange: (color: string) => void;
};

const COLORS = [
  "000000",
  "f4f4f4",
  "999999",
  "e7040e",
  "ffb701",
  "ffd701",
  "19a975",
  "357ede",
  "a463f1",
  "d5008e",
  "ff725c",
  "9eebcf",
  "96ccff",
  "ffdfdf",
] as const;

const hexColorRegex = /^([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/;

type ColorInfo = {
  hex: string;
  dark: boolean;
};

function getColorInfo(hex: string): ColorInfo {
  if (!hexColorRegex.test(hex)) {
    return {
      hex: "000000",
      dark: true,
    };
  }

  hex = hex.length === 3 ? hex.replace(/(.)/g, "$1$1") : hex;
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return {
    hex,
    dark: luminance < 0.6,
  };
}

export default function ColorPicker({ color, onColorChange }: Props) {
  const [inputValue, setInputValue] = useState(color);
  const { hex, dark } = getColorInfo(inputValue);

  const handleColorChange = (hex: string) => {
    setInputValue(hex);
    onColorChange(hex);
  };

  return (
    <Box
      vfx={{
        axis: "y",
        gap: "s",
        align: "center",
        border: true,
        shadow: "subtle",
        radius: "rounded",
        overflow: "hidden",
      }}
    >
      <Box
        vfx={{ radius: "subtle", padding: "l", width: "full" }}
        style={{ backgroundColor: `#${hex}` }}
      >
        <ui.p
          vfx={{ fontWeight: 6, textAlign: "center" }}
          style={{ color: dark ? "white" : "black" }}
        >
          #{hex.toLowerCase()}
        </ui.p>
      </Box>
      <Box
        vfx={{ axis: "x", wrap: true, gap: "xs", justify: "center" }}
        style={{ width: 200 }}
      >
        {COLORS.map((swatch) => (
          <UnstyledButton
            key={swatch}
            onClick={() => handleColorChange(swatch)}
            vfx={{ radius: "subtle" }}
            style={{
              width: 24,
              height: 24,
              backgroundColor: `#${swatch}`,
            }}
            aria-label={`Select ${swatch}`}
          />
        ))}
      </Box>
      <IconInput
        vfx={{ axis: "x", align: "center", marginX: "s", marginBottom: "s" }}
        startIcon={
          <ui.span vfx={{ color: "muted", paddingLeft: "s" }}>#</ui.span>
        }
        inputProps={{
          value: inputValue,
          onChange: (e) => {
            const newColor = e.target.value;
            setInputValue(newColor);
            onColorChange(getColorInfo(newColor).hex);
          },
          placeholder: "000000",
          maxLength: 6,
        }}
      />
    </Box>
  );
}
