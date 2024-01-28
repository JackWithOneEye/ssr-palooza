import { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "warning";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  variant: Variant;
};

const styles: Record<Variant, string> = {
  ["primary"]: "bg-sky-500 hover:bg-sky-600",
  ["secondary"]:
    "border border-sky-500 text-sky-500 hover:text-sky-600 hover:border-sky-600",
  ["warning"]:
    "border border-red-400 text-red-400 hover:border-red-500 hover:text-red-500",
};

export default function Button({
  children,
  className,
  variant,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={
        styles[variant] +
        ` ${className ?? ""} ` +
        "rounded-sm px-4 py-2 disabled:opacity-50 disabled:pointer-events-none"
      }
      {...rest}
    >
      {children}
    </button>
  );
}
