import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "react-tooltip";

type Props = {
  icon: IconDefinition;
  onClick: () => void;
  label: string;
  className?: string;
  style?: React.CSSProperties;
  selected?: boolean;
};

const IconButton = ({
  icon,
  onClick,
  label,
  className,
  style,
  selected,
}: Props) => {
  return (
    <>
      <button
        data-tooltip-id={label}
        data-tooltip-content={label}
        onClick={onClick}
        aria-label={label}
        style={{
          border: "none",
          cursor: "pointer",
          background: "none",
          backgroundColor: selected ? "#e0e0e0" : "transparent",
          borderRadius: "4px",
          padding: "0.25rem",
        }}
        className="ma1 dim-button"
      >
        <FontAwesomeIcon
          icon={icon}
          className={className}
          size="lg"
          style={style}
        />
      </button>
      <Tooltip id={label} />
    </>
  );
};

export default IconButton;
