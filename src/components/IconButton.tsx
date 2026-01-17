import { IconButton as UIIconButton, Tooltip } from "@adamjanicki/ui";

type Props = Pick<
  React.ComponentProps<typeof UIIconButton>,
  "onClick" | "icon" | "style"
> & {
  label: string;
  selected?: boolean;
};

export default function IconButton({ selected, label, ...props }: Props) {
  return (
    <Tooltip
      offset={2}
      vfx={{ fontSize: "s", padding: "xs", fontWeight: 6 }}
      anchor={
        <UIIconButton
          {...props}
          vfx={{
            padding: "xs",
            radius: "subtle",
            hover: "dim",
            backgroundColor: selected ? "muted" : undefined,
          }}
          aria-label={label}
          size="m"
        />
      }
    >
      {label}
    </Tooltip>
  );
}
