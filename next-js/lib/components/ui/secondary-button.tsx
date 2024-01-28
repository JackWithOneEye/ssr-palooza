import React, { ButtonHTMLAttributes } from "react";

type SecondaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

export default function SecondaryButton({
  children,
  ...rest
}: SecondaryButtonProps) {
  return (
    <button
      className="rounded-sm px-4 py-2 text-sky-500 border border-sky-500 hover:text-sky-600 hover:border-sky-600"
      {...rest}
    >
      {children}
    </button>
  );
}
