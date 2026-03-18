import { ButtonHTMLAttributes, forwardRef } from "react";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
type ButtonVariant = "primary" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string; // renders as <a> when provided
  fullWidth?: boolean;
}

// ─────────────────────────────────────────────
// Size map
// ─────────────────────────────────────────────
const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-5 py-2 text-sm",
  md: "px-8 py-3 text-base",
  lg: "px-10 py-4 text-lg",
};

// ─────────────────────────────────────────────
// Variant map — matches Figma exactly:
//   outline  →  transparent bg, white border+text  (LEARN MORE)
//   primary  →  gold bg (#D5A310), black text       (JOIN NOW)
// ─────────────────────────────────────────────
const variantClasses: Record<ButtonVariant, string> = {
  outline:
    "bg-transparent border border-white text-white hover:border-[var(--gold)] hover:text-[var(--gold)]",
  primary:
    "bg-[var(--gold)] border border-[var(--gold)] text-[var(--black)] hover:bg-[var(--btn-primary-hover)] hover:border-[var(--btn-primary-hover)]",
};

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      href,
      fullWidth = false,
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    const base = [
      // Font — Oswald, uppercase, tracked
      "font-primary font-semibold uppercase tracking-widest",
      // Layout
      "inline-flex items-center justify-center gap-2",
      // Shape — slightly rounded to match Figma pill-ish look
      "rounded-sm",
      // Transition
      "transition-all duration-200 ease-in-out",
      // Cursor
      "cursor-pointer select-none",
      // Focus ring
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--black)]",
      // Disabled
      "disabled:opacity-50 disabled:cursor-not-allowed",
      // Width
      fullWidth ? "w-full" : "",
      // Variant + size
      variantClasses[variant],
      sizeClasses[size],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    // Render as anchor if href provided
    if (href) {
      return (
        <a href={href} className={base}>
          {children}
        </a>
      );
    }

    return (
      <button ref={ref} className={base} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;

// ─────────────────────────────────────────────
// Named export for convenience
// ─────────────────────────────────────────────
export type { ButtonProps, ButtonVariant, ButtonSize };