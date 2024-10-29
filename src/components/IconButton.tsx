import React, { forwardRef, Ref } from "react";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "@adamjanicki/ui-extended";
import { Badge, IconButton as UIButton } from "@adamjanicki/ui";

type Props = {
  icon: IconDefinition;
  onClick: () => void;
  label: string;
  className?: string;
  style?: React.CSSProperties;
  selected?: boolean;
};

const IconButton = forwardRef<HTMLButtonElement, Props>(
  (
    { icon, onClick, label, className, style, selected }: Props,
    ref: Ref<HTMLButtonElement>
  ) => {
    return (
      <Tooltip tooltipContent={<Badge type="static">{label}</Badge>}>
        <UIButton
          ref={ref}
          onClick={onClick}
          style={{
            border: "none",
            cursor: "pointer",
            background: "none",
            backgroundColor: selected ? "#e0e0e0" : "transparent",
            borderRadius: "4px",
            padding: "0.25rem",
          }}
          className={`ma1 dim-button ${className || ""}`}
          aria-label={label}
          icon={<FontAwesomeIcon icon={icon} size="lg" style={style} />}
        />
      </Tooltip>
    );
  }
);

export default IconButton;
