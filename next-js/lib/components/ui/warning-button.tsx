import React, { DOMAttributes } from "react";

type WarningButtonProps = DOMAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  className?: string;
};

export default function WarningButton({
  children,
  className = "",
  ...rest
}: WarningButtonProps) {
  return (
    <button
      className={
        className +
        " rounded-sm px-4 py-2 border border-red-400 text-red-400 hover:border-red-500 hover:text-red-500"
      }
      {...rest}
    >
      {children}
    </button>
  );
}
