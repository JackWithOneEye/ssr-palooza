import React, { DOMAttributes } from "react";

type PrimaryButtonProps = DOMAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

export default function PrimaryButton({
  children,
  ...rest
}: PrimaryButtonProps) {
  return (
    <button
      className="rounded-sm px-4 py-2 bg-sky-500 hover:bg-sky-600"
      {...rest}
    >
      {children}
    </button>
  );
}
