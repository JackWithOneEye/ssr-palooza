import { Slot, component$, type ButtonHTMLAttributes } from "@builder.io/qwik";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "primary" | "secondary" | "warning";
}

export const Button = component$<ButtonProps>(({ variant, ...rest }) => {
  return (
    <button
      class={{
        "bg-blue-500 hover:bg-blue-600": variant === "primary",
        "border border-blue-500 text-blue-500 hover:border-blue-600 hover:text-blue-600":
          variant === "secondary",
        "border border-rose-400 text-rose-400 hover:border-rose-500 hover:text-rose-500":
          variant === "warning",
        "rounded-sm px-4 py-2 disabled:pointer-events-none disabled:opacity-50":
          true,
      }}
      {...rest}
    >
      <Slot />
    </button>
  );
});
