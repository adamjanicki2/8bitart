type Props = {
  color: string;
  onColorChange: (color: string) => void;
};

const COLORS = [
  "red",
  "green",
  "blue",
  "yellow",
  "cyan",
  "magenta",
  "black",
  "white",
] as const;

const ColorPicker = ({ color, onColorChange }: Props) => {
  return (
    <div className="flex items-center flex-wrap mv2 mb3">
      {COLORS.map((c) => (
        <div
          className="pointer"
          key={c}
          style={{
            width: 32,
            height: 32,
            backgroundColor: c,
            border: color === c ? "3px solid black" : "none",
          }}
          onClick={() => onColorChange(c)}
        />
      ))}
    </div>
  );
};

export default ColorPicker;
