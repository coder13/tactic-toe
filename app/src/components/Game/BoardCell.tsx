import classNames from "classnames";
import { Background_Colors, Text_Colors } from "./colors";
import { useMediaQuery } from "usehooks-ts";

interface BoardCellProps {
  value?: string;
  color?: string;
  selectable?: boolean;
  onValueChange?: (value: string) => void;
  onCellSelect?: () => void;
  borders: {
    bottom: boolean;
    top: boolean;
    left: boolean;
    right: boolean;
  };
  playerColor: string;
}

export function BoardCell({
  value,
  color,
  playerColor,
  selectable = true,
  onValueChange,
  onCellSelect,
}: BoardCellProps) {
  const matches = useMediaQuery("(any-pointer: none)");

  console.log(30, matches);

  return (
    <div
      className={classNames(
        "bg-inherit col-span-1 row-span-1 h-16 w-16 flex justify-center items-center text-4x border-gray-400",
        {
          "hover:bg-red-500": selectable && playerColor === "red",
          "hover:bg-sky-500": selectable && playerColor === "blue",
          // "rounded-b-md": !borders.bottom,
          // "rounded-t-md": !borders.top,
          // "rounded-l-md": !borders.left,
          // "rounded-r-md": !borders.right,
        }
      )}
      style={{
        ...(color && {
          backgroundColor: color
            ? Background_Colors[color as keyof typeof Background_Colors]
            : "black",
          color: color
            ? Text_Colors[color as keyof typeof Text_Colors]
            : "black",
          border: "none",
        }),
      }}
    >
      <input
        type="tel"
        disabled={!selectable || !!value || color === "black"}
        className="w-full h-full text-2xl text-center bg-inherit focus:outline-none rounded-md"
        maxLength={1}
        value={value || ""}
        onClick={() => onCellSelect?.()}
        onChange={(e) => onValueChange?.(e.target.value.slice(-1))}
        readOnly={!matches}
        onKeyDown={(e) => {
          onValueChange?.(e.key);
        }}
      />
    </div>
  );
}
